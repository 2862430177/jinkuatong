/* 名录集抓取脚本（一次性数据接入用）：
 * 抓取名录集山西站相关分类（跨境电商公司 / 进出口公司）全部分页，
 * 解析企业名 + 地区 + 联系人，去重合并落盘为 JSON。
 * 输出：scripts/data/mingluji-companies.json
 * 用法：npx tsx scripts/fetch-mingluji.ts
 */
import { writeFileSync, mkdirSync } from "node:fs";

const CATEGORIES = ["跨境电商公司名录", "进出口公司名录"];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

interface Row {
  name: string;
  /** 来源分类 */
  source: string;
  /** 地区（从链接 title 中提取省市区），缺省留空 */
  region: string;
  /** 联系人（如有） */
  contact?: string;
}

/** 从一页 HTML 解析企业条目：按 views-row 起始位置切块 */
function parseRows(html: string, source: string): Row[] {
  const rows: Row[] = [];
  const starts = [...html.matchAll(/<div class='views-row/g)].map((m) => m.index!);
  for (let i = 0; i < starts.length; i++) {
    const end = i + 1 < starts.length ? starts[i + 1] : html.length;
    const block = html.slice(starts[i], end);
    const name = block.match(/<h2[^>]*>\s*<a[^>]*>\s*([\s\S]*?)\s*<\/a>/);
    if (!name) continue;
    const raw = name[1].replace(/<[^>]+>/g, "").trim();
    if (!raw) continue;
    // 地区：取 title 形如 "山西省XX市..." 的地址信息
    const regionMatch =
      block.match(/title=['"](山西省[^'"<>]{2,60})['"]/) ||
      block.match(/title=['"](太原市[^'"<>]{2,40})['"]/) ||
      block.match(/title=['"](大同市[^'"<>]{2,40})['"]/) ||
      block.match(/title=['"](运城市[^'"<>]{2,40})['"]/);
    const contact = block.match(/<a href='\/shanxi\/faren\/[^']*'>([^<]+)<\/a>/);
    rows.push({
      name: raw,
      source,
      region: regionMatch ? regionMatch[1].trim() : "",
      contact: contact ? contact[1].trim() : undefined,
    });
  }
  return rows;
}

async function fetchCategory(cat: string): Promise<Row[]> {
  const all: Row[] = [];
  let page = 1;
  const base = `https://gongshang.mingluji.com/shanxi/${encodeURIComponent(cat)}`;
  console.log(`\n抓取分类：${cat}`);
  for (;;) {
    const url = page === 1 ? base : `${base}?page=${page}`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const html = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status} at ${cat} page ${page}`);
    const rows = parseRows(html, cat);
    all.push(...rows);
    console.log(`  page ${page}: +${rows.length}（累计 ${all.length}）`);
    const next = html.match(/class='pager-next[^']*'>\s*<a href='([^']+)'>\s*下一页/);
    if (!next || page > 500) break;
    const m = next[1].match(/page=(\d+)/);
    page = m ? Number(m[1]) : page + 1;
    await new Promise((r) => setTimeout(r, 350));
  }
  return all;
}

async function main() {
  const all: Row[] = [];
  for (const cat of CATEGORIES) {
    all.push(...(await fetchCategory(cat)));
  }

  // 去重（按名称；同名的取首个来源）
  const seen = new Set<string>();
  const dedup = all.filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  });

  const outDir = "scripts/data";
  mkdirSync(outDir, { recursive: true });
  const outPath = `${outDir}/mingluji-companies.json`;
  writeFileSync(outPath, JSON.stringify({ total: dedup.length, companies: dedup }, null, 2), "utf-8");
  console.log(`\n完成：原始 ${all.length} 条，去重后 ${dedup.length} 家，写入 ${outPath}`);
}

main().catch((e) => {
  console.error("抓取失败：", e);
  process.exit(1);
});
