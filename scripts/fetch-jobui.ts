/* 职友集山西跨境电商/外贸公司名录抓取（一次性）：
 * 页面仅前 15 家可见（其余需登录），抓取可见部分并入名录池。
 * 输出：scripts/data/jobui-companies.json
 */
import { writeFileSync, mkdirSync } from "node:fs";

const URLS = [
  "https://www.jobui.com/rank/company/view/shanxisheng/kuajingdianshang/",
  "https://www.jobui.com/rank/company/view/shanxisheng/waimao/",
];

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

interface Row {
  name: string;
  source: string;
  region: string;
}

async function fetchOne(url: string, source: string): Promise<Row[]> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const html = await res.text();
  if (!res.ok) {
    console.log(`${source} HTTP ${res.status}`);
    return [];
  }
  // 企业名通常为 <h3> 或 strong/a 包裹；先按公司链接特征抓取
  const candidates = [
    ...html.matchAll(/<a[^>]*href="[^"]*\/company\/[^"]*"[^>]*>([^<]{2,60})<\/a>/g),
  ].map((m) => m[1].trim());
  const names = [...new Set(candidates)].filter(
    (n) => n.length >= 4 && !/^(更多|首页|登录|注册|公司|下一页|上一页)$/.test(n),
  );
  console.log(`${source}: 提取 ${names.length} 个候选`);
  return names.slice(0, 20).map((name) => ({ name, source, region: "山西" }));
}

async function main() {
  const all: Row[] = [];
  for (const u of URLS) {
    const src = u.includes("kuajingdianshang") ? "职友集-跨境电商" : "职友集-外贸";
    all.push(...(await fetchOne(u, src)));
  }
  const outDir = "scripts/data";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/jobui-companies.json`, JSON.stringify(all, null, 2), "utf-8");
  console.log(`写入 ${all.length} 条 → scripts/data/jobui-companies.json`);
}

main().catch((e) => {
  console.error("ERR", e);
  process.exit(1);
});
