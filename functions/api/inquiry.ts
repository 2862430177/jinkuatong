// 询盘自动发送接口（方案B 完整版：Cloudflare Pages Function）
// 部署形态：Next 静态导出产物在 out/，本目录 functions/ 由 Cloudflare Pages 构建时自动打包为 Worker，
//           与静态资源一并部署（无需后端服务器）。
// 交互：客户端 InquiryForm 提交 → POST /api/inquiry（JSON）→ 本函数按企业 slug 路由收件人：
//   - 企业有已核验邮箱（src/data/verified-emails.ts 名单）→ 自动直发该企业销售邮箱；
//   - 无核验邮箱 → 自动发送至默认兜底收件人（晋跨通平台客服邮箱，人工对接转发）。
// 发信走 Resend REST API，需在 Cloudflare Pages → Settings → Environment variables 配置：
//   RESEND_API_KEY = re_xxx           （Resend 控制台 → API Keys 生成）
//   RESEND_FROM    = "晋跨通 <inquiry@你的已核验域名>" （Resend → Domains 已验证的发送地址，不支持 gmail/qq 等公共邮箱）
// 邮件附带询盘来源（INQUIRY_SOURCE_URL）与企业信息，便于企业识别线索来自晋跨通；reply-to 设为买家邮箱，企业可直接回复。
import { FALLBACK_INQUIRY_EMAIL, INQUIRY_SOURCE_URL, VERIFIED_COMPANY_EMAILS } from "../../src/data/verified-emails";

interface InquiryPayload {
  /** 企业 slug（见 src/data/companies.ts），用于路由收件人 */
  slug?: string;
  /** 买家姓名 */
  name?: string;
  /** 买家邮箱（作为 reply-to，企业可一键回复） */
  email?: string;
  /** 买家所在公司（选填） */
  company?: string;
  /** 企业展示名（仅用于邮件内线索说明） */
  companyName?: string;
  /** 企业所在地（仅用于邮件内线索说明） */
  companyLocation?: string;
  /** 询盘内容 */
  message?: string;
}

interface RouteContext {
  request: Request;
  env: Record<string, string | undefined>;
}

/** JSON 响应工具 */
function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

/** 收件人路由（单一职责：按 slug 返回已核验企业邮箱或默认兜底） */
function resolveRecipient(slug: string | undefined): string {
  return (slug && VERIFIED_COMPANY_EMAILS[slug]) || FALLBACK_INQUIRY_EMAIL;
}

/** 构造询盘邮件 subject/text（纯文本，兼容所有邮件客户端；随附来源与企业信息） */
function buildMail(p: InquiryPayload): { subject: string; text: string } {
  const buyerCompany = (p.company ?? "").trim();
  const subject = `Inquiry from ${p.name}${buyerCompany ? ` (${buyerCompany})` : ""}`;
  const profile = [p.companyName, p.companyLocation].filter(Boolean).join(" · ");
  const text = [
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Company: ${buyerCompany}`,
    "",
    `Message:\n${p.message}`,
    "",
    "--",
    `Inquiry source: ${INQUIRY_SOURCE_URL}`,
    profile ? `Company profile: ${profile}` : "",
  ]
    .filter((line) => line !== "")
    .join("\n");
  return { subject, text };
}

/** 校验提交内容（与前端同口径，服务端为最终校验） */
function validate(p: InquiryPayload): string | null {
  if (!p.name?.trim() || !p.email?.trim() || !p.message?.trim()) return "REQUIRED_FIELD";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return "INVALID_EMAIL";
  return null;
}

export const onRequestPost: (ctx: RouteContext) => Promise<Response> = async (ctx) => {
  const { request, env } = ctx;
  // 环境未配置 Resend 时返回可读错误，前端引导买家改用邮件联系（避免静默丢询盘）
  const apiKey = env.RESEND_API_KEY;
  const from = env.RESEND_FROM;
  if (!apiKey || !from) {
    return json({ ok: false, error: "SERVER_NOT_CONFIGURED" }, 503);
  }

  let payload: InquiryPayload;
  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return json({ ok: false, error: "INVALID_BODY" }, 400);
  }
  const bad = validate(payload);
  if (bad) return json({ ok: false, error: bad }, 400);

  const to = resolveRecipient(payload.slug);
  const { subject, text } = buildMail({
    ...payload,
    name: payload.name!.trim(),
    email: payload.email!.trim(),
    message: payload.message!.trim(),
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], reply_to: [payload.email], subject, text }),
  });
  if (!res.ok) {
    // 透传非敏感错误码，便于排查（不发信失败时也返回 502，前端给兜底引导）
    return json({ ok: false, error: "SEND_FAILED" }, 502);
  }
  return json({ ok: true }, 200);
};
