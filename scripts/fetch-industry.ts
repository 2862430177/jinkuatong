/* 名录集产业带批量抓取脚本（一次性数据接入用，2026-09-02）：
 * 抓取名录集山西站多分类（工厂 / 专题 / 开发区 / 区县）企业名，供：
 *   1. 按产业关键词归类进 companies.ts（4 大类 × 50 = 200 家集成目标）；
 *   2. 其余真实企业进入 registry.ts 待集成池（对应"约 1900 家待集成"）。
 * 输出：scripts/data/industry-companies.json
 * 用法：npx tsx scripts/fetch-industry.ts
 * 说明：抓取为公开工商名录数据；仅供平台内部线索池使用，正式展示前需人工复核。
 */
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

/** 抓取目标：{ path: 站内路径, source: 来源标注 } */
const TARGETS: { path: string; source: string }[] = [
  // ---- 工厂分类 ----
  { path: "/shanxi/gongchang/机械厂", source: "工厂名录-机械厂" },
  { path: "/shanxi/gongchang/制品厂", source: "工厂名录-制品厂" },
  { path: "/shanxi/gongchang/建材厂", source: "工厂名录-建材厂" },
  { path: "/shanxi/gongchang/石材厂", source: "工厂名录-石材厂" },
  { path: "/shanxi/gongchang/门窗厂", source: "工厂名录-门窗厂" },
  { path: "/shanxi/gongchang/化工厂", source: "工厂名录-化工厂" },
  { path: "/shanxi/gongchang/食品厂", source: "工厂名录-食品厂" },
  { path: "/shanxi/gongchang/酒厂", source: "工厂名录-酒厂" },
  { path: "/shanxi/gongchang/养殖厂", source: "工厂名录-养殖厂" },
  { path: "/shanxi/gongchang/饲料厂", source: "工厂名录-饲料厂" },
  { path: "/shanxi/gongchang/纺织厂", source: "工厂名录-纺织厂" },
  { path: "/shanxi/gongchang/家具厂", source: "工厂名录-家具厂" },
  { path: "/shanxi/gongchang/包装厂", source: "工厂名录-包装厂" },
  { path: "/shanxi/gongchang/塑料厂", source: "工厂名录-塑料厂" },
  // ---- 行业专题 ----
  { path: "/shanxi/机械企业名录", source: "行业专题-机械企业" },
  { path: "/shanxi/电商企业名录", source: "行业专题-电商企业" },
  { path: "/shanxi/光伏公司名录", source: "行业专题-光伏企业" },
  { path: "/shanxi/新能源汽车公司名录", source: "行业专题-新能源汽车" },
  { path: "/shanxi/大数据公司名录", source: "行业专题-大数据" },
  { path: "/shanxi/煤炭公司名录", source: "行业专题-煤炭" },
  // ---- 开发区（园区企业） ----
  { path: "/shanxi/太原不锈钢产业园区", source: "开发区-太原不锈钢园区" },
  { path: "/shanxi/太原经济技术开发区", source: "开发区-太原经开区" },
  { path: "/shanxi/太原高新技术产业开发区", source: "开发区-太原高新区" },
  { path: "/shanxi/山西长治高新技术产业园区", source: "开发区-长治高新区" },
  { path: "/shanxi/山西晋城经济开发区", source: "开发区-晋城经开区" },
  { path: "/shanxi/山西大同经济开发区", source: "开发区-大同经开区" },
  // ---- 产业带核心区县（区县分类 URL 需带"县/市/区"后缀） ----
  { path: "/shanxi/county/祁县", source: "区县-祁县" },
  { path: "/shanxi/county/定襄县", source: "区县-定襄" },
  { path: "/shanxi/county/怀仁市", source: "区县-怀仁" },
  { path: "/shanxi/county/应县", source: "区县-应县" },
  { path: "/shanxi/county/盐湖区", source: "区县-盐湖" },
  { path: "/shanxi/county/稷山县", source: "区县-稷山" },
  { path: "/shanxi/county/清徐县", source: "区县-清徐" },
  { path: "/shanxi/county/平遥县", source: "区县-平遥" },
  { path: "/shanxi/county/沁县", source: "区县-沁县" },
  { path: "/shanxi/county/高平市", source: "区县-高平" },
  { path: "/shanxi/county/文水县", source: "区县-文水" },
  { path: "/shanxi/county/临猗县", source: "区县-临猗" },
  { path: "/shanxi/county/兴县", source: "区县-兴县" },
  { path: "/shanxi/county/长治县", source: "区县-长治" },
  { path: "/shanxi/county/潞州区", source: "区县-潞州" },
  { path: "/shanxi/county/晋源区", source: "区县-晋源" },
  { path: "/shanxi/county/小店区", source: "区县-小店" },
  { path: "/shanxi/county/万柏林区", source: "区县-万柏林" },
];

interface Row {
  name: string;
  source: string;
  region: string;
}

/** 从一页 HTML 解析企业条目：优先 views-row 结构（兼容单/双引号），回退通用公司名匹配 */
function parseRows(html: string, source: string): Row[] {
  const rows: Row[] = [];
  // 1) views-row 切块（单双引号兼容）
  const starts = [
    ...html.matchAll(/<div class=['"]views-row/g),
  ].map((m) => m.index!);
  if (starts.length > 0) {
    for (let i = 0; i < starts.length; i++) {
      const end = i + 1 < starts.length ? starts[i + 1] : html.length;
      const block = html.slice(starts[i], end);
      const name = block.match(/<h2[^>]*>\s*<a[^>]*>\s*([\s\S]*?)\s*<\/a>/);
      if (!name) continue;
      const raw = name[1].replace(/<[^>]+>/g, "").trim();
      if (!raw) continue;
      const regionMatch = block.match(/title=['"](山西省[^'"<>]{2,80})['"]/);
      rows.push({ name: raw, source, region: regionMatch ? regionMatch[1].trim() : "" });
    }
    return rows;
  }
  // 2) 通用回退：h2/a 包裹的公司名（含"有限公司/厂/合作社"等）
  const nameRegex =
    />([\u4e00-\u9fa5A-Za-z0-9（）()·【】&]{4,80}?(?:有限公司|有限责任公司|股份公司|合作社|工厂|厂|商行|工作室|公司|集团))</g;
  for (const m of html.matchAll(nameRegex)) {
    const raw = m[1].replace(/&[a-z]+;/g, "").trim();
    if (raw.length < 4) continue;
    rows.push({ name: raw, source, region: "" });
  }
  // 去重（保留首个）
  const seen = new Set<string>();
  return rows.filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  });
}

async function fetchTarget(target: { path: string; source: string }): Promise<Row[]> {
  const all: Row[] = [];
  let page = 1;
  const base = `https://gongshang.mingluji.com${target.path}`;
  for (;;) {
    const url = page === 1 ? base : `${base}?page=${page}`;
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      const html = await res.text();
      if (!res.ok) {
        console.log(`  ${target.source} HTTP ${res.status}（跳过）`);
        break;
      }
      const rows = parseRows(html, target.source);
      all.push(...rows);
      // 下一页检测（兼容单/双引号与不同分页文案）
      const next =
        html.match(/class=['"]pager-next['"][^>]*>\s*<a href=['"]([^'"]+)['"]>\s*下一页/) ||
        html.match(/class=['"]pager-next['"][^>]*>\s*<a href=['"]([^'"]+)['"]/);
      if (!next || page >= 20) break;
      const m = next[1].match(/page=(\d+)/);
      page = m ? Number(m[1]) : page + 1;
      await new Promise((r) => setTimeout(r, 300));
    } catch (e) {
      console.log(`  ${target.source} page ${page} 抓取失败：${String(e).slice(0, 120)}`);
      break;
    }
  }
  console.log(`  ${target.source}: 累计 ${all.length} 条`);
  return all;
}

async function main() {
  // 可选：--county-only 只抓取区县分类（避免重复抓取其他分类）
  const countyOnly = process.argv.includes("--county-only");
  const targets = countyOnly ? TARGETS.filter((t) => t.source.startsWith("区县-")) : TARGETS;
  console.log(`抓取目标 ${targets.length} 个${countyOnly ? "（仅区县）" : ""}`);
  const all: Row[] = [];
  for (const t of targets) {
    console.log(`\n抓取：${t.source}`);
    all.push(...(await fetchTarget(t)));
  }
  // 与已有 JSON 合并（industry-companies.json 存在则增量追加）
  let prev: Row[] = [];
  try {
    const prevData = JSON.parse(readFileSync("scripts/data/industry-companies.json", "utf-8")) as {
      companies: Row[];
    };
    prev = prevData.companies;
  } catch {
    /* 首次运行无旧数据 */
  }
  // 去重（按企业名；同名保留首个来源）
  const seen = new Set<string>();
  const dedup = [...prev, ...all].filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  });
  const outDir = "scripts/data";
  mkdirSync(outDir, { recursive: true });
  const outPath = `${outDir}/industry-companies.json`;
  writeFileSync(outPath, JSON.stringify({ total: dedup.length, companies: dedup }, null, 2), "utf-8");
  console.log(`\n完成：原始 ${all.length} 条（累计含旧数据 ${dedup.length} 家），写入 ${outPath}`);
}

main().catch((e) => {
  console.error("抓取失败：", e);
  process.exit(1);
});
