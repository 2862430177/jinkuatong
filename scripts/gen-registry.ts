/* 名录池生成脚本（一次性）：
 * 从 scripts/data/mingluji-companies.json 读取抓取的名录企业，
 * 清洗地区 → 生成 src/data/registry.ts（名录池数据层，供 /registry 页展示）。
 * 说明：公开渠道（名录集 2026-09-02 抓取）可获得的山西"跨境/进出口"企业完整名单共 50 家，
 * 与系统已收录的 40 家产业带企业无重叠；其余备案企业（约 1873 家）需官方名录到位后追加。
 * 用法：npx tsx scripts/gen-registry.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { companies } from "../src/data/companies";

const raw = JSON.parse(readFileSync("scripts/data/mingluji-companies.json", "utf-8")) as {
  companies: { name: string; region: string; contact?: string; source: string }[];
};

/** 山西地级市白名单 */
const CITY_WHITELIST = [
  "太原",
  "大同",
  "运城",
  "临汾",
  "晋城",
  "长治",
  "晋中",
  "忻州",
  "朔州",
  "吕梁",
  "阳泉",
];
/** 山西县级市白名单（地址中可能出现"晋中市介休市…"这类二级市） */
const COUNTY_CITY_WHITELIST = ["介休", "永济", "河津", "原平", "侯马", "霍州", "古交", "高平", "潞城"];

/** 从地址字符串提取 市（·区）两级：形如"山西省太原市万柏林区…" → "太原·万柏林区"；
 * 含县级市的优先取县级市（如"晋中市介休市…" → "介休"）。无市信息返回"山西"。 */
function cleanRegion(addr: string): string {
  if (!addr) return "山西";
  if (addr.includes("综改示范区")) return "太原·综改示范区";
  const stripped = addr.replace(/^山西省/, ""); // 先剥离省前缀，避免误捕获
  // 县级市优先（地址里通常写作"XX市介休市"）
  for (const cc of COUNTY_CITY_WHITELIST) {
    if (stripped.includes(cc + "市")) return cc;
  }
  // 地级市
  let city = "";
  let idx = -1;
  for (const k of CITY_WHITELIST) {
    const i = stripped.indexOf(k + "市");
    if (i >= 0 && (idx < 0 || i < idx)) {
      idx = i;
      city = k;
    }
  }
  if (!city) return "山西";
  const rest = stripped.slice(idx + city.length + 1);
  const dm = rest.match(/^([\u4e00-\u9fa5]{2,4}区)/); // 市后紧跟的区
  const district = dm && !dm[1].includes("社") ? dm[1] : "";
  return city + (district ? `·${district}` : "");
}

/** 已收录企业名集合（用于排除重叠） */
const inSystem = new Set(companies.map((c) => c.name));

const seen = new Set<string>();
const entries = raw.companies
  .filter((c) => !inSystem.has(c.name))
  .filter((c) => {
    if (seen.has(c.name)) return false;
    seen.add(c.name);
    return true;
  })
  .map((c, i) => ({
    id: `r-${String(i + 1).padStart(3, "0")}`,
    name: c.name,
    region: cleanRegion(c.region || ""),
    contact: c.contact,
    source: c.source,
  }));

const header = `// 名录池数据（2026-09-02 生成，公开渠道抓取）
// 说明：
// - 来源：名录集（gongshang.mingluji.com）"跨境电商公司名录"(25 家) + "进出口公司名录"(25 家)，共 50 家。
// - 口径：工商注册名称含"跨境/进出口"字样的山西企业，非海关备案口径；数据可靠性需人工复核。
// - 定位：作为"待认领线索池"展示，不做独立站效果页（避免静态导出页数爆炸）。
// - 扩展：官方备案名录（Excel/CSV）到位后，可在本文件追加条目并同步更新 /registry 页。
// 生成：npx tsx scripts/gen-registry.ts（勿手工编辑本文件头部结构）

export interface RegistryEntry {
  id: string;
  /** 企业名 */
  name: string;
  /** 区位（市·区） */
  region: string;
  /** 联系人（如有） */
  contact?: string;
  /** 数据来源分类 */
  source: string;
}

export const registryEntries: RegistryEntry[] = [
`;

const body = entries
  .map(
    (e) =>
      `  {\n    id: "${e.id}",\n    name: "${e.name}",\n    region: "${e.region}",${e.contact ? `\n    contact: "${e.contact}",` : ""}\n    source: "${e.source}",\n  },`,
  )
  .join("\n");

const footer = `];

/** 按关键词检索名录（企业名 / 区位 / 来源） */
export function searchRegistry(keyword: string): RegistryEntry[] {
  const kw = keyword.trim().toLowerCase();
  if (!kw) return registryEntries;
  return registryEntries.filter((e) =>
    [e.name, e.region, e.source, e.contact ?? ""].join(" ").toLowerCase().includes(kw),
  );
}
`;

writeFileSync("src/data/registry.ts", header + body + footer, "utf-8");
console.log(`名录池已生成：${entries.length} 家 → src/data/registry.ts`);
