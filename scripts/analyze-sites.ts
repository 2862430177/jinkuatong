// 已有独立站企业深度分析脚本（todo B4 → D3）：
// 抓取 companies.ts 中全部渠道首页 HTML，提取技术栈 / SEO / 转化要素 / 语言 / 服务器头，
// 输出 scripts/data/site-analysis.json 供 docs/D3-optimization.md 编制使用。
// 运行：npx tsx scripts/analyze-sites.ts
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { companies } from "../src/data/companies";

const TIMEOUT_MS = 12_000;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

interface SiteAnalysis {
  url: string;
  finalUrl: string;
  status: number;
  ok: boolean;
  error?: string;
  bytes: number;
  server: Record<string, string | undefined>;
  stack: string[];
  title?: string;
  titleLen: number;
  metaDescription: boolean;
  viewport: boolean;
  h1Count: number;
  jsonLd: number;
  canonical: boolean;
  robotsMeta: string;
  htmlLang?: string;
  hasChinese: boolean;
  hasEnglish: boolean;
  hasForm: boolean;
  formAction: string;
  mailto: number;
  whatsapp: boolean;
  paypal: boolean;
  telLinks: number;
  emailCount: number;
  social: string[];
  b2b: string[];
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

/** 从首页 HTML 提取分析指标（单一职责：纯分析，不改动任何数据） */
function analyze(html: string, url: string): SiteAnalysis {
  const lower = html.toLowerCase();
  const src = (m: RegExpMatchArray | null) => (m ? m[1] : undefined);

  // 技术栈特征（仅统计有把握的特征，识别不到即视为纯静态/老旧站，本身即结论）
  const stackChecks: Array<[string, RegExp]> = [
    ["WordPress", /wp-content|wp-includes|wordpress/i],
    ["织梦(DedeCMS)", /dedecms|dede58/i],
    ["帝国CMS", /ecms\.js|empirecms/i],
    ["Next.js", /__next_data__|_next\/static/i],
    ["Nuxt.js", /__nuxt__/i],
    ["Vue", /vue(\.min)?\.js/i],
    ["jQuery", /jquery(\.min)?\.js/i],
    ["Bootstrap", /bootstrap(\.min)?\.(css|js)/i],
    ["layui", /layui/i],
    ["Wix", /wixstatic\.com|wix\.com/i],
    ["凡科建站", /fkw\.com|凡科/i],
    ["51sole 店铺", /51sole\.com/i],
  ];
  const stack = stackChecks.filter(([, re]) => re.test(lower)).map(([name]) => name);

  const title = src(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i))?.trim();
  const robots = src(html.match(/<meta[^>]+name=["']robots["'][^>]*>/i));

  // 转化要素
  const mailto = (lower.match(/mailto:/g) ?? []).length;
  const telLinks = (lower.match(/<a[^>]+href=["']tel:/g) ?? []).length;
  const formAction = src(html.match(/<form[^>]*action=["']([^"']*)["']/i)) ?? "";
  const emailSet = new Set<string>();
  for (const e of html.matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g)) {
    const v = e[0].toLowerCase();
    // 排除样式/图片占位常见伪邮箱与资源文件名
    if (/\.(png|jpg|jpeg|gif|svg|css|js|webp)$/.test(v)) continue;
    if (/@(2x|3x|media|example|sentry|wixpress)/.test(v)) continue;
    emailSet.add(v);
  }
  // 海外社媒 / B2B 平台链接识别（模式集中定义，避免类型推断为 (string|RegExp)[]）
  const SOCIAL_PATTERNS: Array<[string, RegExp]> = [
    ["Facebook", /facebook\.com/i],
    ["Instagram", /instagram\.com/i],
    ["LinkedIn", /linkedin\.com/i],
    ["YouTube", /youtube\.com/i],
    ["X/Twitter", /twitter\.com|t\.co\//i],
  ];
  const B2B_PATTERNS: Array<[string, RegExp]> = [
    ["Alibaba", /alibaba\.com/i],
    ["1688", /1688\.com/i],
    ["Made-in-China", /made-in-china\.com/i],
    ["Global Sources", /globalsources\.com/i],
  ];
  const socialDetect = SOCIAL_PATTERNS.filter(([, re]) => re.test(lower)).map(([name]) => name);
  const b2bDetect = B2B_PATTERNS.filter(([, re]) => re.test(lower)).map(([name]) => name);

  return {
    url,
    finalUrl: url,
    status: 0,
    ok: true,
    bytes: html.length,
    server: {},
    stack,
    title,
    titleLen: title?.length ?? 0,
    metaDescription: /<meta[^>]+name=["']description["']/i.test(lower),
    viewport: /<meta[^>]+name=["']viewport["']/i.test(lower),
    h1Count: (lower.match(/<h1[^>]*>/g) ?? []).length,
    jsonLd: (lower.match(/application\/ld\+json/g) ?? []).length,
    canonical: /rel=["']canonical["']/i.test(lower),
    robotsMeta: robots ?? "",
    htmlLang: src(lower.match(/<html[^>]+lang=["']([a-z-]+)["']/i)),
    hasChinese: (html.match(/[\u4e00-\u9fff]/g) ?? []).length > 10,
    hasEnglish: (html.match(/[a-zA-Z]/g) ?? []).length > 200,
    hasForm: /<form/i.test(lower),
    formAction,
    mailto,
    whatsapp: /wa\.me|api\.whatsapp\.com/i.test(lower),
    paypal: /paypal/i.test(lower),
    telLinks,
    emailCount: emailSet.size,
    social: socialDetect,
    b2b: b2bDetect,
  };
}

/** 抓取单个 URL（跟随重定向，记录服务器响应头） */
async function fetchSite(url: string): Promise<SiteAnalysis> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const base: SiteAnalysis = {
    url,
    finalUrl: url,
    status: 0,
    ok: false,
    bytes: 0,
    server: {},
    stack: [],
    titleLen: 0,
    metaDescription: false,
    viewport: false,
    h1Count: 0,
    jsonLd: 0,
    canonical: false,
    robotsMeta: "",
    hasChinese: false,
    hasEnglish: false,
    hasForm: false,
    formAction: "",
    mailto: 0,
    whatsapp: false,
    paypal: false,
    telLinks: 0,
    emailCount: 0,
    social: [],
    b2b: [],
  };
  try {
    const res = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow", signal: controller.signal });
    base.status = res.status;
    base.finalUrl = res.url;
    const contentType = res.headers.get("content-type") ?? "";
    base.server = {
      server: res.headers.get("server") ?? undefined,
      via: res.headers.get("via") ?? undefined,
      "x-powered-by": res.headers.get("x-powered-by") ?? undefined,
      "cf-ray": res.headers.get("cf-ray") ?? undefined,
      "content-type": contentType || undefined,
    };
    if (!res.ok) {
      base.error = `HTTP ${res.status}`;
      return base;
    }
    const buf = await res.arrayBuffer();
    const html = decode(buf, contentType);
    return { ...base, ...analyze(html, url) };
  } catch (err) {
    base.error = err instanceof Error ? err.message : String(err);
    return base;
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  // 收集去重后的全部渠道链接（含 http/https）
  const urlSet = new Set<string>();
  for (const c of companies) for (const ch of c.channels) urlSet.add(ch.url);
  const urls = [...urlSet];

  console.log(`\n开始深度分析 ${urls.length} 个渠道站点（超时 ${TIMEOUT_MS / 1000}s，并发 6）…\n`);

  const results: SiteAnalysis[] = [];
  const queue = [...urls];
  async function worker() {
    while (queue.length > 0) {
      const u = queue.shift()!;
      const r = await fetchSite(u);
      results.push(r);
      const flag = r.ok ? "OK" : `ERR ${r.error}`;
      console.log(`  [${flag}] ${u} → ${r.finalUrl} | ${r.stack.join("/") || "无识别框架"} | title:${r.titleLen}`);
    }
  }
  await Promise.all(Array.from({ length: 6 }, () => worker()));

  const ok = results.filter((r) => r.ok);
  const dir = join(process.cwd(), "scripts/data");
  mkdirSync(dir, { recursive: true });
  const out = join(dir, "site-analysis.json");
  writeFileSync(out, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\n✅ 成功 ${ok.length}/${results.length}，结果已写入 ${out}`);
  if (ok.length < results.length) {
    console.log("抓取失败清单：");
    results.filter((r) => !r.ok).forEach((r) => console.log(`  [${r.error}] ${r.url}`));
  }
}

main();
