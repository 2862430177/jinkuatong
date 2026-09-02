// 询盘自动发送接口（方案B 完整版：Cloudflare Pages Function）
// 部署形态：Next 静态导出产物在 out/，本目录 functions/ 由 Cloudflare Pages 构建时自动打包为 Worker，
//           与静态资源一并部署（无需后端服务器）。
// 交互：客户端 InquiryForm 提交 → POST /api/inquiry（JSON）→ 本函数按企业 slug 路由收件人：
//   - 企业有已核验邮箱（src/data/verified-emails.ts 名单）→ 自动直发该企业销售邮箱；
//   - 无核验邮箱 → 自动发送至默认兜底收件人（晋跨通平台客服邮箱，人工对接转发）。
// 发信通道（2026-09-02 支持双 Provider，SendGrid 当前默认，Resend 保留可随时切回）：
//   Provider 选择：环境变量 MAIL_PROVIDER = "sendgrid" | "resend"；
//   未显式配置时自动探测：存在 SENDGRID_API_KEY 用 SendGrid，否则存在 RESEND_API_KEY 用 Resend。
//   1) SendGrid（无需验证域名）：需在 Cloudflare Pages → Settings → Environment variables 配置
//        SENDGRID_API_KEY       （SendGrid 控制台 → Settings → API Keys，权限勾 Send Mail）
//        SENDGRID_FROM          （已验证的 Single Sender 邮箱：SendGrid → Settings → Sender Authentication
//                                 添加 Single Sender 后点击验证邮件中的链接即可，支持 gmail/qq 等公共邮箱）
//        SENDGRID_FROM_NAME     （可选，发件人展示名，默认 "JinKuaTong"）
//   2) Resend（需验证自定义域名）：配置 RESEND_API_KEY = re_xxx 与 RESEND_FROM = "晋跨通 <inquiry@已核验域名>"，
//        无验证域名时仅能发给账号注册邮箱（测试模式），故线上直发客户请用 SendGrid 或先验证域名。
// 收件人路由开关（A 过渡模式 → B 正式模式）：
//   ROUTE_ALL_TO = 管理员邮箱（如 2862430177@qq.com）：所有询盘统一发至管理员，运营人工对接转发；
//   移除该变量后恢复自动路由：有核验邮箱的企业直达，其余发 FALLBACK_INQUIRY_EMAIL 兜底。
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

/** 可用发信通道（统一抽象：无论哪个 Provider 均以 fetch 调用其 REST API） */
type MailChannel =
  | { provider: "sendgrid"; apiKey: string; fromEmail: string; fromName: string }
  | { provider: "resend"; apiKey: string; from: string };

/** JSON 响应工具 */
function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

/** 单一职责：依据环境变量解析当前可用的发信通道；均未配置（或配置不完整）时返回 null */
function resolveChannel(env: RouteContext["env"]): MailChannel | null {
  const explicit = env.MAIL_PROVIDER;
  // 显式指定 resend，或未指定且仅存在 Resend 配置时 → 走 Resend
  if (explicit === "resend" || (!explicit && !env.SENDGRID_API_KEY && env.RESEND_API_KEY)) {
    if (!env.RESEND_API_KEY || !env.RESEND_FROM) return null;
    return { provider: "resend", apiKey: env.RESEND_API_KEY, from: env.RESEND_FROM };
  }
  // 默认（含 MAIL_PROVIDER=sendgrid）→ 走 SendGrid
  if (!env.SENDGRID_API_KEY || !env.SENDGRID_FROM) return null;
  return {
    provider: "sendgrid",
    apiKey: env.SENDGRID_API_KEY,
    fromEmail: env.SENDGRID_FROM,
    fromName: env.SENDGRID_FROM_NAME?.trim() || "JinKuaTong",
  };
}

/** 收件人路由（单一职责：A 过渡模式下全部发管理员邮箱；否则按 slug 返回已核验企业邮箱或默认兜底） */
function resolveRecipient(slug: string | undefined, env: RouteContext["env"]): string {
  // A 过渡模式：ROUTE_ALL_TO 非空时所有询盘统一进管理员邮箱，人工对接转发企业；
  // B 正式模式就绪后移除该环境变量即恢复「直达已核验企业邮箱 + 兜底」，无需改代码。
  if (env.ROUTE_ALL_TO?.trim()) return env.ROUTE_ALL_TO.trim();
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

/** 发信结果：失败时附带上游 HTTP 状态与响应片段，便于 DEBUG_MAIL=1 时线上排查 */
type SendResult = { ok: true } | { ok: false; status: number; upstream?: string };

/** 读取上游失败响应前 400 字符（不发回敏感字段，仅为诊断线索） */
async function readUpstreamError(res: Response): Promise<string> {
  return (await res.text().catch(() => "")).slice(0, 400);
}

/** 经 SendGrid v3 Mail Send 发送（免域名：已验证 Single Sender 即可对任意收件人发信） */
async function sendViaSendGrid(
  c: { apiKey: string; fromEmail: string; fromName: string },
  to: string,
  replyTo: string,
  subject: string,
  text: string
): Promise<SendResult> {
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${c.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: c.fromEmail, name: c.fromName },
      reply_to: { email: replyTo },
      subject,
      content: [{ type: "text/plain", value: text }],
    }),
  });
  if (res.ok) return { ok: true };
  return { ok: false, status: res.status, upstream: await readUpstreamError(res) };
}

/** 经 Resend /emails 发送（需账号内已核验的发送域名） */
async function sendViaResend(
  c: { apiKey: string; from: string },
  to: string,
  replyTo: string,
  subject: string,
  text: string
): Promise<SendResult> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${c.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: c.from, to: [to], reply_to: [replyTo], subject, text }),
  });
  if (res.ok) return { ok: true };
  return { ok: false, status: res.status, upstream: await readUpstreamError(res) };
}

export const onRequestPost: (ctx: RouteContext) => Promise<Response> = async (ctx) => {
  const { request, env } = ctx;

  let payload: InquiryPayload;
  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return json({ ok: false, error: "INVALID_BODY" }, 400);
  }

  // 未配置任何可用发信通道时返回可读错误，前端引导买家改用邮件联系（避免静默丢询盘）
  const channel = resolveChannel(env);
  if (!channel) {
    return json({ ok: false, error: "SERVER_NOT_CONFIGURED" }, 503);
  }

  const bad = validate(payload);
  if (bad) return json({ ok: false, error: bad }, 400);

  const to = resolveRecipient(payload.slug, env);
  const { subject, text } = buildMail({
    ...payload,
    name: payload.name!.trim(),
    email: payload.email!.trim(),
    message: payload.message!.trim(),
  });

  // 按所选 Provider 分发发信（email 已经 validate() 校验非空，此处用 ! 断言避免 string|undefined 报错）
  const sent =
    channel.provider === "sendgrid"
      ? await sendViaSendGrid(channel, to, payload.email!, subject, text)
      : await sendViaResend(channel, to, payload.email!, subject, text);
  if (!sent.ok) {
    // 不透传上游错误细节，统一返回 502，前端给兜底引导（排查可用上游记录）
    return json({ ok: false, error: "SEND_FAILED" }, 502);
  }
  return json({ ok: true }, 200);
};
