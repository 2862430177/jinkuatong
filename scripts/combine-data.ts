/* 合并脚本（2026-09-02，一次性）：把 build-companies-data.ts 生成的中间文本转换为正式 TS 数据文件
 * 输出：
 *  1. src/data/companies-extra.ts   —— 160 家新企业（extraCompanies，无类型标注避免循环依赖）
 *  2. scripts/data/registry-extra.ts —— 待集成池追加条目（registryExtras 数组）
 *  3. scripts/data/belt-additions.json —— 各产业带应追加的 companySlugs（供合并 industrial-belts.ts）
 * 用法：npx tsx scripts/combine-data.ts
 */
import { readFileSync, writeFileSync } from "node:fs";

// ---- 1. companies-extra.ts ----
const batch = readFileSync("scripts/data/companies-batch.txt", "utf-8").trim();
const header = `// 企业扩展数据（2026-09-02 批量集成，脚本 scripts/build-companies-data.ts 生成，勿手工编辑）
// 说明：4 大类 × 每类 Top50 = 200 家集成目标。本文件为新增 160 家（真实归类 2 家 + 产业名占位 158 家），
// 全部 verifyStatus: pending（待核验/待认领）。真实名录（官方备案 1963 家）到位后按 docs/todo-list.md A1 流程替换。
// 未标注类型：避免与 companies.ts 形成 import 循环（companies.ts 展开本数组到 Company[] 数组）。
export const extraCompanies = [
${batch}
];
`;
writeFileSync("src/data/companies-extra.ts", header, "utf-8");
console.log("1) 已生成 src/data/companies-extra.ts");

// ---- 2. registry 待集成池追加条目 ----
const raw = readFileSync("scripts/data/registry-extra.txt", "utf-8")
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

/** 从 source 推断区位 */
function regionOf(source: string, fallback = "山西"): string {
  const m = source.match(/^区县-(.+)$/);
  if (m) return m[1];
  if (source.includes("不锈钢园区") || source.includes("太原")) return "太原";
  if (source.includes("长治")) return "长治";
  if (source.includes("晋城")) return "晋城";
  if (source.includes("大同")) return "大同";
  return fallback;
}

// 排除已被 companies 真实归类的企业名（companies-batch 中不含"·"分隔符的条目为真实企业名）
const realNames = new Set(
  [...readFileSync("scripts/data/companies-batch.txt", "utf-8").matchAll(/name: "([^"]+)"/g)]
    .map((m) => m[1])
    .filter((n) => !n.includes("·")),
);
// registry-extra.txt 只含企业名，重新读 industry-companies.json 获取 source
const industry = JSON.parse(readFileSync("scripts/data/industry-companies.json", "utf-8")) as {
  companies: { name: string; source: string }[];
};
const srcByName = new Map(industry.companies.map((c) => [c.name, c.source]));

const entries = raw
  .filter((name) => !realNames.has(name))
  .map((name, i) => {
    const source = srcByName.get(name) ?? "名录集";
    const region = regionOf(source);
    return `  {
    id: "r-1${String(i + 1).padStart(3, "0")}",
    name: "${name}",
    region: "${region}",
    source: "${source}",
  },`;
  });

const regHeader = `// 待集成池追加条目（2026-09-02 生成，勿手工编辑；由 scripts/combine-data.ts 生成）
// 说明：名录集（gongshang.mingluji.com）多分类抓取未归入产业带的企业，作为"待集成"真实线索池。
// 口径：与 companies.ts 集成企业（200 家）不同，本池条目不生成独立站效果页，仅名录列表展示。
export const registryExtras = [
${entries.join("\n")}
];
`;
writeFileSync("scripts/data/registry-extra.ts", regHeader, "utf-8");
console.log(`2) 已生成 scripts/data/registry-extra.ts（${entries.length} 条）`);

// ---- 3. 产业带 companySlugs 追加建议 ----
const extraSource = readFileSync("src/data/companies-extra.ts", "utf-8");
const additions: Record<string, string[]> = {};
for (const m of extraSource.matchAll(/beltSlug: "([^"]+)"/g)) {
  additions[m[1]] ??= [];
}
// 提取每个 slug（beltSlug 出现时对应的 slug 在上一项）
const slugBeltPairs: [string, string][] = [];
const slugRe = /slug: "([^"]+)"/g;
const beltRe = /beltSlug: "([^"]+)"/g;
const slugMatches = [...extraSource.matchAll(/slug: "([^"]+)"/g)];
const beltMatches = [...extraSource.matchAll(/beltSlug: "([^"]+)"/g)];
// slug 与 beltSlug 交替出现（{slug}...{beltSlug}...），按出现顺序配对
for (let i = 0; i < slugMatches.length && i < beltMatches.length; i++) {
  slugBeltPairs.push([slugMatches[i][1], beltMatches[i][1]]);
}
const beltAdditions: Record<string, string[]> = {};
for (const [slug, belt] of slugBeltPairs) (beltAdditions[belt] ??= []).push(slug);
writeFileSync("scripts/data/belt-additions.json", JSON.stringify(beltAdditions, null, 2), "utf-8");
console.log(`3) 已生成 scripts/data/belt-additions.json（${Object.keys(beltAdditions).length} 个产业带）`);
