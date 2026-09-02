// 抓取已核验真实企业官网的公开展示邮箱（方案B 覆盖名单用）：
// - 范围：companies.ts 中 verifyStatus==="verified" 且含 http(s) 渠道的企业；
// - 只收录「页面实际公开展示」的邮箱（mailto: 或正文邮箱），不猜测 sales@域名 之类；
// - 先抓首页；首页未发现邮箱时，再尝试常见联系页路径（每站最多 EXTRA_PAGE_LIMIT 个）。
// 输出 scripts/data/company-emails.json 供人工审核后录入 src/data/verified-emails.ts。
// 运行：npx tsx scripts/fetch-company-emails.ts
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { companies } from "../src/data/companies";

const TIMEOUT_MS = 12_000;
const CONCURRENCY = 4;
const EXTRA_PAGE_LIMIT = 3;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

interface FoundEmail {
  email: string;
  /** 来源：mailto 链接 / 正文纯文本 / 被混淆（如 [at] 形式按正文收集） */
  via: "mailto" | "text";
  /** 邮箱所在页面 */
  page: string;
  /** 邮箱前后文本片段，供人工判断是否为真实业务联系邮箱 */
  ctx: string;
}

interface SiteResult {
  url: string;
  /** 引用该 URL 的全部 verified 企业 slug（同一集团官网可能被多家引用） */
  slugs: string[];
  status: number;
  ok: boolean;
  error?: string;
  title?: string;
  emails: FoundEmail[];
}

/** 按 charset 正确解码 HTML（国内企业站多为 GBK/GB2312，fetch.text() 会乱码） */
function decode(buf: ArrayBuffer, contentType: string): string {
  const probe = new TextDecoder("utf-8").decode(buf.slice(0, 2048));
  const m = probe.match(/charset\s*=\s*["']?([\w-]+)/i);
  const charset = m?.[1] ?? contentType.match(/charset=([\w-]+)/i)?.[1] ?? "utf-8";
  try {
    return new TextDecoder(charset).decode(buf);
  } catch {
    return new TextDecoder("utf-8").decode(buf);
  }
}

async function fetchHtml(url: string): Promise<{ status: number; html: string; finalUrl: string } | { status: number; error: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow", signal: controller.signal });
    const contentType = res.headers.get("content-type") ?? "";
    if (!res.ok) return { status: res.status, error: `HTTP ${res.status}` };
    const buf = await res.arrayBuffer();
    return { status: res.status, html: decode(buf, contentType), finalUrl: res.url };
  } catch (err) {
    return { status: 0, error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}

/** 从单页 HTML 提取邮箱列表（mailto 优先标注） */
function extractEmails(html: string, page: string): FoundEmail[] {
  const out: FoundEmail[] = [];
  const push = (email: string, via: "mailto" | "text", start: number) => {
    const v = email.trim().toLowerCase();
    // 过滤资源文件名与占位/示例伪邮箱
    if (!/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(v)) return;
    if (/\.(png|jpg|jpeg|gif|svg|webp|css|js|pdf|doc|zip)$/.test(v)) return;
    if (/@(2x|3x|example|sentry|wixpress|yoursite|yourdomain|domainname)/.test(v)) return;
    if (/^(test|admin|webmaster|root|info)\+\S+$/.test(v)) return;
    if (out.some((f) => f.email === v)) return;
    const ctx = html.slice(Math.max(0, start - 60), start + v.length + 60).replace(/[\s\r\n]+/g, " ");
    out.push({ email: v, via, page, ctx });
  };
  // 1) mailto: 链接
  for (const m of html.matchAll(/mailto:\s*([^"'?>\s]+)/gi)) {
    push(m[1].replace(/^\/+/, ""), "mailto", m.index ?? 0);
  }
  // 2) 正文纯文本邮箱
  for (const m of html.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/g)) {
    push(m[0], "text", m.index ?? 0);
  }
  return out;
}

/** 常见联系/关于页候选路径（首页无邮箱时才按序尝试） */
const EXTRA_PATHS = [
  "/contact.html",
  "/contact/",
  "/contact-us",
  "/contact",
  "/lianxi.html",
  "/lxwm.html",
  "/aboutus.html",
  "/about.html",
  "/about/",
  "/gywm.html",
];

/** 从首页 HTML 中发现「联系/关于」站内链接（模板站导航路径各异，固定路径经常失效） */
function extractContactLinks(html: string, baseUrl: string): string[] {
  const base = new URL(baseUrl);
  const norm = (h: string) => h.replace(/^www\./, "");
  const links: string[] = [];
  const seen = new Set<string>();
  for (const m of html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = m[1];
    if (/^(javascript:|#|mailto:|tel:)/i.test(href)) continue;
    let abs: URL;
    try {
      abs = new URL(href, base.origin);
    } catch {
      continue;
    }
    if (norm(abs.hostname) !== norm(base.hostname)) continue; // 仅同域
    const text = m[2].replace(/<[^>]+>/g, "");
    const hay = `${abs.pathname} ${text}`.toLowerCase();
    const isContact =
      /(contact|联系|lianxi|lxwm|about|关于|gywm|message|guestbook|留言|feedback|feedback)/i.test(hay) &&
      !/\.(png|jpg|jpeg|gif|svg|webp|css|js|pdf|doc|xls|zip)$/.test(abs.pathname) &&
      !/login|register|sitemap|rss|xml|news-|news\//.test(hay);
    if (isContact && !seen.has(abs.href)) {
      seen.add(abs.href);
      links.push(abs.href);
    }
  }
  return links.slice(0, EXTRA_PAGE_LIMIT);
}

function buildBase(url: string): string {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.host}`;
  } catch {
    return url;
  }
}

/** 抓取一个企业官网（首页 + 必要时联系页），返回该站点发现的邮箱 */
async function probeSite(url: string, slugs: string[]): Promise<SiteResult> {
  const base = buildBase(url);
  const seed: SiteResult = { url, slugs, status: 0, ok: false, emails: [] };
  const pagesToTry = [url];
  const tried: string[] = [];
  const found = new Map<string, FoundEmail>();

  const pushFound = (list: FoundEmail[]) => {
    for (const f of list) if (!found.has(f.email)) found.set(f.email, f);
  };

  let title = "";
  let idx = 0;
  while (idx < pagesToTry.length && pagesToTry.length <= 1 + EXTRA_PAGE_LIMIT) {
    const page = pagesToTry[idx++];
    tried.push(page);
    const r = await fetchHtml(page);
    if ("error" in r || !("html" in r)) {
      if (idx === 1) seed.status = r.status;
      continue;
    }
    if (idx === 1) {
      seed.status = r.status;
      seed.ok = true;
    }
    const m = r.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (m) title = m[1].trim();
    const emails = extractEmails(r.html, page);
    pushFound(emails);
    // 首页已发现邮箱则不再翻页；否则补抓「联系/关于」站内链接（优先）与常见路径
    if (idx === 1) {
      if (emails.length === 0) {
        for (const link of extractContactLinks(r.html, page)) {
          if (!tried.includes(link) && !pagesToTry.includes(link)) pagesToTry.push(link);
        }
      }
      const lower = r.html.toLowerCase();
      const looksContact = /<a[^>]+href=["']tel:/i.test(lower) || /联系|contact/i.test(lower);
      if (emails.length === 0 && looksContact) {
        for (const p of EXTRA_PATHS) {
          if (pagesToTry.length > 1 + EXTRA_PAGE_LIMIT) break;
          const u = base + p;
          if (!tried.includes(u) && !pagesToTry.includes(u)) pagesToTry.push(u);
        }
      }
    }
    if (pagesToTry.length > 1 + EXTRA_PAGE_LIMIT) pagesToTry.length = 1 + EXTRA_PAGE_LIMIT;
  }

  seed.title = title;
  seed.emails = [...found.values()];
  return seed;
}

async function main() {
  // 可选白名单：仅抓取指定 slug（逗号分隔，用于定点补抓无邮箱站点；tsx 下命令行参数不可用，用环境变量 ONLY_SLUGS）
  const only = (process.env.ONLY_SLUGS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  // 收集 verified 且含 http 渠道的企业；同一 URL 聚合其全部 slug
  const urlSlugs = new Map<string, string[]>();
  for (const c of companies) {
    if (c.verifyStatus !== "verified") continue;
    if (only.length && !only.includes(c.slug)) continue;
    for (const ch of c.channels) {
      if (!/^https?:\/\//.test(ch.url)) continue;
      const list = urlSlugs.get(ch.url) ?? [];
      if (!list.includes(c.slug)) list.push(c.slug);
      urlSlugs.set(ch.url, list);
    }
  }
  const urls = [...urlSlugs.keys()];
  console.log(`\n开始抓取 ${urls.length} 个官网 URL（超时 ${TIMEOUT_MS / 1000}s，并发 ${CONCURRENCY}）…\n`);

  const results: SiteResult[] = [];
  const queue = [...urls];
  async function worker() {
    while (queue.length > 0) {
      const u = queue.shift()!;
      const r = await probeSite(u, urlSlugs.get(u)!);
      results.push(r);
      const flag = r.ok ? "OK" : `ERR ${r.error ?? ""}`;
      console.log(
        `  [${flag}] ${u} | emails:${r.emails.map((e) => e.email).join(", ") || "无"} | title:${(r.title ?? "").slice(0, 30)}`,
      );
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  const dir = join(process.cwd(), "scripts/data");
  mkdirSync(dir, { recursive: true });
  const out = join(dir, "company-emails.json");
  writeFileSync(out, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\n✅ 完成 ${results.filter((r) => r.ok).length}/${results.length}，结果已写入 ${out}`);
  console.log("提示：请人工审核 emails 上下文后，将可信邮箱录入 src/data/verified-emails.ts。");
}

main();
