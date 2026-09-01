/* 企业规模化集成数据构建脚本（2026-09-02，一次性）：
 * 输入：scripts/data/industry-companies.json（名录集抓取，608 家）+ 现有 companies.ts（40 家）
 * 目标：4 大类 × 每类 Top50 = 200 家集成数据。
 * 规则：
 *  1. 现有 40 家（companies.ts）保留；
 *  2. 抓取的真实企业按"区县来源 + 产业关键词"归入对应产业带（真实企业名，verifyStatus: pending 待核验）；
 *  3. 每产业带按目标数（每类 50 家分摊）补足，不足用"产业名占位"（如"祁县玻璃·水晶酒具 01"）；
 *  4. 其余真实抓取企业进入待集成池（registry）。
 * 输出：
 *  - scripts/data/companies-batch.ts（新企业 TS 数组，供合并进 companies.ts）
 *  - scripts/data/registry-extra.ts（待集成池追加条目 TS）
 *  - scripts/data/companies-plan.json（统计）
 * 用法：npx tsx scripts/build-companies-data.ts
 */
import { readFileSync, writeFileSync } from "node:fs";

/** 产业带归类规则 */
interface BeltRule {
  beltSlug: string;
  category: "manufacturing" | "agri-food" | "new-material" | "crafts";
  /** 名称包含任一关键词即命中 */
  keywords: string[];
  /** 区县来源前缀；空数组表示不限来源 */
  counties: string[];
}

const RULES: BeltRule[] = [
  // ---------- T1 传统制造与工业品 ----------
  { beltSlug: "qi-xian-glass", category: "manufacturing", keywords: ["玻璃", "器皿", "水晶"], counties: ["祁县"] },
  { beltSlug: "ding-xiang-flange", category: "manufacturing", keywords: ["法兰", "锻", "铸造", "管件"], counties: ["定襄"] },
  { beltSlug: "huai-ren-ceramic", category: "manufacturing", keywords: ["陶瓷", "瓷业"], counties: ["怀仁", "应县"] },
  { beltSlug: "yan-hu-pump", category: "manufacturing", keywords: ["水泵", "泵业", "机电"], counties: ["盐湖"] },
  { beltSlug: "ji-shan-diamond", category: "manufacturing", keywords: ["金刚石", "磨料", "刀具"], counties: ["稷山"] },
  { beltSlug: "taiyuan-stainless", category: "manufacturing", keywords: ["不锈钢", "特种钢", "钢材", "铸管"], counties: ["万柏林", "小店", "晋源"] },
  // ---------- T2 特色农副与食品 ----------
  { beltSlug: "small-grains", category: "agri-food", keywords: ["杂粮", "小米", "粮油", "米业", "面粉"], counties: ["沁县"] },
  { beltSlug: "forest-fruit", category: "agri-food", keywords: ["沙棘", "果品", "红枣", "苹果", "山楂", "果汁"], counties: ["临猗", "文水"] },
  { beltSlug: "qing-xu-vinegar", category: "agri-food", keywords: ["醋", "调味"], counties: ["清徐"] },
  { beltSlug: "meat-products", category: "agri-food", keywords: ["肉", "屠宰", "羊肉", "牛肉"], counties: ["平遥", "怀仁"] },
  // ---------- T3 新材料·新能源·电子 ----------
  { beltSlug: "chang-zhi-led", category: "new-material", keywords: ["LED", "光电", "照明", "灯具"], counties: ["潞州", "长治"] },
  { beltSlug: "jincheng-optoelectronics", category: "new-material", keywords: ["光电", "光学", "LED", "摄像头", "音响", "电子科技"], counties: ["晋城"] },
  { beltSlug: "new-materials", category: "new-material", keywords: ["新材料", "碳纤维", "晶体", "半导体", "铝镁", "镁合金", "铝合金"], counties: [] },
  // ---------- T4 文化工艺品 ----------
  { beltSlug: "ping-yao-lacquer", category: "crafts", keywords: ["漆器", "漆艺", "推光漆"], counties: ["平遥"] },
  { beltSlug: "gao-ping-lu-silk", category: "crafts", keywords: ["丝绸", "纺织", "绸", "织造"], counties: ["高平"] },
  { beltSlug: "ding-xiang-wood", category: "crafts", keywords: ["木器", "家具", "木雕", "雕刻", "木业"], counties: ["定襄"] },
];

/** 每类 50 家按产业带分配的目标数（合计每类 50） */
const BELT_TARGETS: Record<string, number> = {
  // T1（6 带 = 50）
  "qi-xian-glass": 9,
  "ding-xiang-flange": 9,
  "huai-ren-ceramic": 9,
  "yan-hu-pump": 8,
  "ji-shan-diamond": 8,
  "taiyuan-stainless": 7,
  // T2（4 带 = 50）
  "small-grains": 13,
  "forest-fruit": 13,
  "qing-xu-vinegar": 12,
  "meat-products": 12,
  // T3（3 带 = 50）
  "chang-zhi-led": 17,
  "jincheng-optoelectronics": 17,
  "new-materials": 16,
  // T4（3 带 = 50）
  "ping-yao-lacquer": 17,
  "gao-ping-lu-silk": 17,
  "ding-xiang-wood": 16,
};

/** 产业带信息（从现有数据文件同步：名称/区位/简介模板） */
const BELT_INFO: Record<string, { name: string; region: string; intro: string }> = {
  "qi-xian-glass": { name: "祁县玻璃器皿", region: "晋中·祁县", intro: "祁县玻璃器皿产业带潜力企业，主营玻璃器皿研发与出口（占位待认领）。" },
  "ding-xiang-flange": { name: "定襄法兰", region: "忻州·定襄", intro: "定襄法兰产业带潜力企业，主营法兰与锻件制造出口（占位待认领）。" },
  "huai-ren-ceramic": { name: "怀仁·应县陶瓷", region: "朔州·怀仁/应县", intro: "怀仁·应县陶瓷产业带潜力企业，主营日用陶瓷生产出口（占位待认领）。" },
  "yan-hu-pump": { name: "盐湖水泵机电", region: "运城·盐湖", intro: "盐湖水泵机电产业带潜力企业，主营水泵与机电设备出口（占位待认领）。" },
  "ji-shan-diamond": { name: "稷山金刚石", region: "运城·稷山", intro: "稷山金刚石产业带潜力企业，主营金刚石刀具与磨料出口（占位待认领）。" },
  "taiyuan-stainless": { name: "不锈钢·特种钢", region: "太原·中北高新区", intro: "太原不锈钢·特种钢产业带潜力企业，主营不锈钢制品出口（占位待认领）。" },
  "small-grains": { name: "山西小杂粮", region: "大同/忻州/阳泉/长治", intro: "山西小杂粮产业带潜力企业，主营杂粮与小米出口（占位待认领）。" },
  "forest-fruit": { name: "林果与沙棘", region: "运城/吕梁", intro: "山西林果与沙棘产业带潜力企业，主营鲜果与沙棘制品出口（占位待认领）。" },
  "qing-xu-vinegar": { name: "清徐老陈醋", region: "太原·清徐", intro: "清徐老陈醋产业带潜力企业，主营酿造食醋与醋制品出口（占位待认领）。" },
  "meat-products": { name: "肉制品", region: "晋中/朔州", intro: "山西肉制品产业带潜力企业，主营特色肉制品出口（占位待认领）。" },
  "chang-zhi-led": { name: "长治 LED 光电", region: "长治", intro: "长治 LED 光电产业带潜力企业，主营 LED 照明与光电模组出口（占位待认领）。" },
  "jincheng-optoelectronics": { name: "晋城光机电", region: "晋城", intro: "晋城光机电产业带潜力企业，主营消费电子与光电器件出口（占位待认领）。" },
  "new-materials": { name: "新材料产业带", region: "太原/吕梁", intro: "山西新材料产业带潜力企业，主营半导体材料与新材料出口（占位待认领）。" },
  "ping-yao-lacquer": { name: "平遥推光漆器", region: "晋中·平遥", intro: "平遥推光漆器产业带潜力工坊，主营推光漆器与漆画（占位待认领）。" },
  "gao-ping-lu-silk": { name: "高平潞绸", region: "晋城·高平", intro: "高平潞绸产业带潜力企业，主营潞绸面料与丝绸制品（占位待认领）。" },
  "ding-xiang-wood": { name: "定襄木器", region: "忻州·定襄", intro: "定襄木器产业带潜力企业，主营古典家具与木制工艺品（占位待认领）。" },
};

/** 占位名产品池（按产业带，循环组合序号生成占位企业名） */
const PRODUCT_POOL: Record<string, string[]> = {
  "qi-xian-glass": ["水晶酒具", "人工吹制器皿", "机压玻璃杯", "玻璃工艺品", "玻璃烛台"],
  "ding-xiang-flange": ["法兰锻件", "不锈钢法兰", "管道管件", "锻造毛坯", "异形锻件"],
  "huai-ren-ceramic": ["日用陶瓷", "骨质瓷", "酒店用瓷", "陶瓷餐具", "陶瓷茶具"],
  "yan-hu-pump": ["潜水电泵", "水泵电机", "排污泵", "深井泵", "机电配件"],
  "ji-shan-diamond": ["金刚石刀具", "金刚石磨料", "金刚石锯片", "超硬材料", "金刚石钻头"],
  "taiyuan-stainless": ["不锈钢制品", "特种钢部件", "精密零件", "不锈钢管件", "不锈钢板材"],
  "small-grains": ["沁州黄小米", "有机杂粮", "富硒小米", "杂粮礼盒", "小米深加工"],
  "forest-fruit": ["鲜苹果", "沙棘饮品", "红枣制品", "果汁果干", "山楂制品"],
  "qing-xu-vinegar": ["老陈醋", "醋饮料", "醋泡食品", "酿造食醋", "保健醋"],
  "meat-products": ["平遥牛肉", "羔羊肉卷", "熟食制品", "牛肉干", "羊肉制品"],
  "chang-zhi-led": ["LED 照明", "深紫外 LED", "LED 显示屏", "LED 灯珠", "光电模组"],
  "jincheng-optoelectronics": ["AI 儿童相机", "蓝牙音箱", "智能小家电", "光学镜头", "消费电子"],
  "new-materials": ["碳纤维", "半导体材料", "蓝宝石晶体", "铝镁合金", "电子材料"],
  "ping-yao-lacquer": ["推光漆器", "漆画", "漆器首饰盒", "屏风漆器", "收藏漆器"],
  "gao-ping-lu-silk": ["潞绸面料", "真丝围巾", "丝绸制品", "丝绸文创", "手工织锦"],
  "ding-xiang-wood": ["古典家具", "木雕工艺品", "澄泥砚", "木制摆件", "实木家具"],
};

/** 模板映射（category → template key） */
const TEMPLATE: Record<string, string> = {
  manufacturing: "t1-industrial",
  "agri-food": "t2-agri-food",
  "new-material": "t3-tech-material",
  crafts: "t4-craft",
};

/** 现有 companies.ts 的企业 slug（用于避免重复） */
const EXISTING = JSON.parse(
  readFileSync("scripts/data/existing-companies.json", "utf-8"),
) as { slug: string; beltSlug: string }[];

const existingSlugs = new Set(EXISTING.map((c) => c.slug));
// 各产业带现有企业数
const existingPerBelt: Record<string, number> = {};
for (const c of EXISTING) existingPerBelt[c.beltSlug] = (existingPerBelt[c.beltSlug] ?? 0) + 1;

const data = JSON.parse(readFileSync("scripts/data/industry-companies.json", "utf-8")) as {
  companies: { name: string; source: string; region: string }[];
};

/** 真公司名过滤 */
const COMPANY_RE = /(有限公司|有限责任公司|股份|集团|合作社|商行|公司)/;
/** 泛化名过滤 */
const GENERIC_RE = /^(来料|加工|五金|日用|综合|个体|农户)/;

function classify(c: { name: string; source: string }): string | null {
  for (const rule of RULES) {
    const sourceCounty = c.source.match(/^区县-(.+)$/)?.[1];
    if (rule.counties.length > 0) {
      if (!sourceCounty || !rule.counties.some((ct) => sourceCounty.startsWith(ct))) continue;
    }
    if (rule.keywords.some((k) => c.name.includes(k))) return rule.beltSlug;
  }
  return null;
}

/** 收集真实归类企业（按产业带） */
const classified = new Map<string, { name: string; source: string }[]>();
for (const c of data.companies) {
  if (!COMPANY_RE.test(c.name)) continue;
  if (GENERIC_RE.test(c.name)) continue;
  const belt = classify(c);
  if (!belt) continue;
  const arr = classified.get(belt) ?? [];
  arr.push(c);
  classified.set(belt, arr);
}

/** 未归类真实企业（进待集成池） */
const classifiedNames = new Set([...classified.values()].flat().map((c) => c.name));
/** 已知噪音（页面导航/分类标题被误提取） */
const NOISE_NAMES = new Set([
  "定位查询附近的公司",
  "山西跨境电商公司",
  "山西信贷公司",
  "山西省燃气公司",
  "山西煤炭公司",
  "山西公司",
]);
const NOISE_RE = /(查询|附近的|名录|分类|首页|简介|招聘|地图)/;
const unclassified = data.companies.filter(
  (c) =>
    COMPANY_RE.test(c.name) &&
    !classifiedNames.has(c.name) &&
    !NOISE_NAMES.has(c.name) &&
    !NOISE_RE.test(c.name),
);

/** 生成新企业（真实归类 + 占位） */
interface NewCompany {
  slug: string;
  name: string;
  beltSlug: string;
  template: string;
  location: string;
  intro: string;
  channels: unknown[];
  verifyStatus: "pending";
  note?: string;
}

const newCompanies: NewCompany[] = [];
const additions: Record<string, string[]> = {};
let counter = 0;

for (const rule of RULES) {
  const target = BELT_TARGETS[rule.beltSlug] ?? 0;
  const existing = existingPerBelt[rule.beltSlug] ?? 0;
  const info = BELT_INFO[rule.beltSlug];
  const pool = PRODUCT_POOL[rule.beltSlug] ?? ["主营产品"];
  const real = classified.get(rule.beltSlug) ?? [];
  let need = target - existing;

  // 1) 先纳入真实归类企业
  for (const r of real) {
    if (need <= 0) break;
    const slug = `c-belt-${++counter}`;
    if (existingSlugs.has(slug)) continue;
    newCompanies.push({
      slug,
      name: r.name,
      beltSlug: rule.beltSlug,
      template: TEMPLATE[rule.category],
      location: info.region,
      intro: `${info.name}产业带企业：${r.name}（名录集公开名录收录，待核验渠道）。`,
      channels: [],
      verifyStatus: "pending",
      note: "名录集公开名录收录（2026-09-02），待人工核验渠道后替换占位信息",
    });
    (additions[rule.beltSlug] ??= []).push(slug);
    need--;
  }

  // 2) 占位补足
  let seq = 1;
  while (need > 0) {
    const product = pool[(seq - 1) % pool.length];
    const num = String(Math.floor((seq - 1) / pool.length) + 1).padStart(2, "0");
    const name = `${info.name}·${product} ${num}`;
    const slug = `${rule.beltSlug}-p${String(seq).padStart(2, "0")}`;
    if (existingSlugs.has(slug)) {
      seq++;
      continue;
    }
    newCompanies.push({
      slug,
      name,
      beltSlug: rule.beltSlug,
      template: TEMPLATE[rule.category],
      location: info.region,
      intro: info.intro,
      channels: [],
      verifyStatus: "pending",
      note: "产业名占位（待核验真实名单后替换）",
    });
    (additions[rule.beltSlug] ??= []).push(slug);
    seq++;
    need--;
  }
}

/** 生成 TS 文本 */
function toTsLines(): string {
  const lines: string[] = [];
  for (const c of newCompanies) {
    lines.push("  {");
    lines.push(`    slug: "${c.slug}",`);
    lines.push(`    name: "${c.name}",`);
    lines.push(`    beltSlug: "${c.beltSlug}",`);
    // 字面量断言：使 template / verifyStatus 满足 Company 的联合类型（避免循环 import 标注类型）
    lines.push(`    template: "${c.template}" as const,`);
    lines.push(`    location: "${c.location}",`);
    lines.push(`    intro: "${c.intro}",`);
    lines.push("    channels: [],");
    lines.push('    verifyStatus: "pending" as const,');
    lines.push(`    // ${c.note ?? ""}`);
    lines.push("  },");
  }
  return lines.join("\n");
}

/** 输出 */
const outDir = "scripts/data";
writeFileSync(`${outDir}/companies-batch.txt`, toTsLines(), "utf-8");
writeFileSync(`${outDir}/registry-extra.txt`, unclassified.map((c) => c.name).join("\n"), "utf-8");

// 统计
console.log("=== 新企业生成统计 ===");
console.log(`新企业共 ${newCompanies.length} 家（目标 160）`);
for (const rule of RULES) {
  const real = classified.get(rule.beltSlug) ?? [];
  const arr = additions[rule.beltSlug] ?? [];
  console.log(
    `  ${rule.beltSlug}: 现有 ${existingPerBelt[rule.beltSlug] ?? 0} + 真实 ${real.length} + 占位 ${arr.length - real.length} = 目标 ${BELT_TARGETS[rule.beltSlug]}`,
  );
}
console.log(`\n未归类真实企业（待集成池）: ${unclassified.length} 家`);
console.log(`输出：companies-batch.txt / registry-extra.txt / 统计完成`);
