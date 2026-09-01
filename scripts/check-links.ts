// URL 存活巡检脚本（todo F4 / 需求 §11 风险对策）：
// 检查数据中全部渠道链接有效性（HEAD 请求），输出失效/异常链接清单。
// 运行：npm run check-links（依赖 tsx 运行 TS）；可挂入定时任务定期巡检。
import { companies } from "../src/data/companies";

const TIMEOUT_MS = 10_000;

/** WAF 防护例外名单：站点真实存活但启用反爬（如雷池 WAF 拦截无浏览器指纹请求），
 * 需人工复核后登记；巡检时跳过避免误报（2026-09-02 核验：semisic.cn 为烁科晶体官网，浏览器访问正常）。 */
const WAF_EXCEPTIONS = new Set(["http://www.semisic.cn/", "http://www.semisic.net/", "https://www.semisic.cn/"]);

/** 对单个 URL 发起存活检查，返回状态描述。
 *  部分服务器（含多数国内建站）拒绝 HEAD（405/403）或对 HEAD 不响应，
 *  因此 HEAD 失败时自动回退 GET 再判定，避免误报（如 zunyiceramic.com 曾因此误剔除）。 */
async function check(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal });
      if (res.ok) return "OK";
      // HEAD 返回非 2xx（如 405/403），回退 GET 确认站点是否真实存活
      const resGet = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
      return resGet.ok ? "OK" : `HTTP ${res.status} → GET ${resGet.status}`;
    } catch {
      // HEAD 网络层异常（连接被拒/超时/方法不支持），回退 GET 再判定
      const res = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
      return res.ok ? "OK" : `HTTP ${res.status}`;
    }
  } catch (err) {
    return `ERR ${err instanceof Error ? err.message : String(err)}`;
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  // 收集去重后的全部渠道链接
  const urlSet = new Set<string>();
  for (const c of companies) {
    for (const ch of c.channels) urlSet.add(ch.url);
  }
  const urls = [...urlSet];

  console.log(`\n开始巡检 ${urls.length} 个渠道链接（超时 ${TIMEOUT_MS / 1000}s）…\n`);

  // 并发检查（限流 10 并发）；WAF 例外站点跳过直接记 OK
  const results: { url: string; status: string }[] = [];
  const queue = urls.filter((u) => !WAF_EXCEPTIONS.has(u));
  for (const u of urls) {
    if (WAF_EXCEPTIONS.has(u)) results.push({ url: u, status: "OK" });
  }
  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift()!;
      results.push({ url, status: await check(url) });
    }
  }
  await Promise.all(Array.from({ length: 10 }, () => worker()));

  const failed = results.filter((r) => r.status !== "OK");
  const okCount = results.length - failed.length;

  console.log(`✅ 正常 ${okCount} · ❌ 异常 ${failed.length}`);
  if (failed.length > 0) {
    console.log("\n异常链接清单：");
    failed.forEach((r) => console.log(`  [${r.status}] ${r.url}`));
    process.exitCode = 1;
  } else {
    console.log("全部链接存活。");
  }
}

main();
