// 名录池数据（待集成池，2026-09-02 扩展，公开渠道抓取）
// 说明：
// - 基础条目：名录集"跨境电商公司名录"(25 家) + "进出口公司名录"(25 家)，共 50 家。
// - 2026-09-02 规模化扩展（scripts/fetch-industry.ts 抓取名录集 33 个工厂/专题/开发区/区县分类，
//   scripts/combine-data.ts 生成）：追加 220 条未归入产业带企业的真实名录（registry-extra.ts），
//   与 companies.ts"已集成 200 家"对应，共同构成"全省备案企业 1963 家"的可浏览数据面。
// - 口径：工商注册真实企业名，非海关备案口径；数据可靠性需人工复核。
// - 定位：作为"待集成池 / 待认领线索池"展示，不做独立站效果页（避免静态导出页数爆炸）。
// - 扩展：官方备案名录（Excel/CSV）到位后，可在本文件追加条目并同步更新 /registry 页。
// 生成：scripts/gen-registry.ts + scripts/combine-data.ts（勿手工编辑生成区结构）
import { registryExtras } from "./registry-extra";

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
  {
    id: "r-001",
    name: "山西锦星跨境电子商务有限公司",
    region: "太原·万柏林区",
    contact: "秦苗苗",
    source: "跨境电商公司名录",
  },
  {
    id: "r-002",
    name: "吕梁市锦上阳跨境电商有限公司",
    region: "吕梁·离石区",
    contact: "冯娜娜",
    source: "跨境电商公司名录",
  },
  {
    id: "r-003",
    name: "晋中市隅见跨境电商有限公司",
    region: "介休",
    contact: "南晓坤",
    source: "跨境电商公司名录",
  },
  {
    id: "r-004",
    name: "华远陆港（大同）跨境电商有限公司",
    region: "山西",
    contact: "齐汉良",
    source: "跨境电商公司名录",
  },
  {
    id: "r-005",
    name: "太原市晋源区英磊跨境电商有限公司",
    region: "太原·晋源区",
    contact: "赵江磊",
    source: "跨境电商公司名录",
  },
  {
    id: "r-006",
    name: "山西转型综合改革示范区唐槐产业园驼铃跨境电商商行（个体工商户）",
    region: "山西",
    contact: "杨晶艳",
    source: "跨境电商公司名录",
  },
  {
    id: "r-007",
    name: "山西锦隆跨境电子商务有限公司",
    region: "太原·迎泽区",
    contact: "孟繁耀",
    source: "跨境电商公司名录",
  },
  {
    id: "r-008",
    name: "大同聿信跨境电商有限公司",
    region: "大同·平城区",
    contact: "常浩",
    source: "跨境电商公司名录",
  },
  {
    id: "r-009",
    name: "晋中市太谷区加瑞跨境电商有限公司",
    region: "晋中·太谷区",
    contact: "郭家瑞",
    source: "跨境电商公司名录",
  },
  {
    id: "r-010",
    name: "山西纪琳跨境电商有限公司",
    region: "太原·尖草坪区",
    contact: "李纪玲",
    source: "跨境电商公司名录",
  },
  {
    id: "r-011",
    name: "山西晟鑫达跨境电子商务有限公司",
    region: "太原·小店区",
    contact: "高扬飞",
    source: "跨境电商公司名录",
  },
  {
    id: "r-012",
    name: "太原市鑫薪昕跨境电商有限公司",
    region: "太原·万柏林区",
    contact: "闫慧慧",
    source: "跨境电商公司名录",
  },
  {
    id: "r-013",
    name: "太原市尖草坪区楠哥跨境电商室（个人独资）",
    region: "太原·尖草坪区",
    contact: "王海青",
    source: "跨境电商公司名录",
  },
  {
    id: "r-014",
    name: "太原璟行跨境电商有限公司",
    region: "山西",
    contact: "刘垚杉",
    source: "跨境电商公司名录",
  },
  {
    id: "r-015",
    name: "晋城市城区伊豆跨境电商有限责任公司",
    region: "晋城",
    contact: "陈睿真",
    source: "跨境电商公司名录",
  },
  {
    id: "r-016",
    name: "太原弘峤跨境电子商务有限公司",
    region: "山西",
    contact: "马旭艳",
    source: "跨境电商公司名录",
  },
  {
    id: "r-017",
    name: "大同中投跨境电子商务有限公司",
    region: "大同·开发区",
    contact: "付晓彬",
    source: "跨境电商公司名录",
  },
  {
    id: "r-018",
    name: "山西节点跨境电子商务有限公司",
    region: "太原·小店区",
    contact: "王建香",
    source: "跨境电商公司名录",
  },
  {
    id: "r-019",
    name: "山西联顺跨境电子商务有限公司",
    region: "太原·小店区",
    contact: "刘杰洪",
    source: "跨境电商公司名录",
  },
  {
    id: "r-020",
    name: "山西朗煊跨境电子商务有限公司",
    region: "太原·杏花岭区",
    contact: "董莉",
    source: "跨境电商公司名录",
  },
  {
    id: "r-021",
    name: "晋城市兆瀚跨境电商有限公司",
    region: "晋城",
    contact: "李帅",
    source: "跨境电商公司名录",
  },
  {
    id: "r-022",
    name: "原平市三云跨境电商有限公司",
    region: "原平",
    contact: "武三梅",
    source: "跨境电商公司名录",
  },
  {
    id: "r-023",
    name: "吕梁市离石区知柚跨境电商工作室（个体工商户）",
    region: "吕梁·离石区",
    contact: "闵东苹",
    source: "跨境电商公司名录",
  },
  {
    id: "r-024",
    name: "山西有顶天跨境电商有限公司",
    region: "太原·小店区",
    contact: "林金平",
    source: "跨境电商公司名录",
  },
  {
    id: "r-025",
    name: "晋中峰汇跨境电商有限公司",
    region: "晋中·榆次区",
    contact: "张金龙",
    source: "跨境电商公司名录",
  },
  {
    id: "r-026",
    name: "山西晋酒集团进出口贸易有限公司",
    region: "太原·杏花岭区",
    contact: "武燕玲",
    source: "进出口公司名录",
  },
  {
    id: "r-027",
    name: "山西果汇达进出口贸易有限公司",
    region: "山西",
    contact: "郑伟民",
    source: "进出口公司名录",
  },
  {
    id: "r-028",
    name: "山西长城微光器材股份有限公司进出口分公司",
    region: "山西",
    contact: "申健",
    source: "进出口公司名录",
  },
  {
    id: "r-029",
    name: "晋城市世野尚品进出口贸易有限公司",
    region: "晋城",
    contact: "上官智伟",
    source: "进出口公司名录",
  },
  {
    id: "r-030",
    name: "大同万世宝进出口有限公司",
    region: "大同·开发区",
    contact: "吕祥龙",
    source: "进出口公司名录",
  },
  {
    id: "r-031",
    name: "大同英特进出口贸易有限公司",
    region: "大同·开发区",
    contact: "杨文英",
    source: "进出口公司名录",
  },
  {
    id: "r-032",
    name: "山西南鱼进出口贸易有限公司",
    region: "太原·迎泽区",
    contact: "张瑜",
    source: "进出口公司名录",
  },
  {
    id: "r-033",
    name: "山西中设进出口有限公司",
    region: "太原·杏花岭区",
    contact: "张晨光",
    source: "进出口公司名录",
  },
  {
    id: "r-034",
    name: "山西蒙锐进出口贸易有限公司",
    region: "吕梁·离石区",
    contact: "AMOAKO_RICHMOND_ODURO",
    source: "进出口公司名录",
  },
  {
    id: "r-035",
    name: "河南宗卓进出口贸易有限公司晋中分公司",
    region: "晋中·榆次区",
    contact: "孙乾",
    source: "进出口公司名录",
  },
  {
    id: "r-036",
    name: "大同市宏涛进出口贸易有限责任公司",
    region: "大同",
    contact: "张宏",
    source: "进出口公司名录",
  },
  {
    id: "r-037",
    name: "山西蔺源进出口贸易有限公司",
    region: "山西",
    contact: "张保清",
    source: "进出口公司名录",
  },
  {
    id: "r-038",
    name: "山西途豆国际进出口贸易有限公司",
    region: "山西",
    contact: "曹兴盛",
    source: "进出口公司名录",
  },
  {
    id: "r-039",
    name: "山西佳禾果品进出口贸易有限公司",
    region: "运城",
    contact: "杜庚师",
    source: "进出口公司名录",
  },
  {
    id: "r-040",
    name: "永济市乘利进出口贸易部（个人独资）",
    region: "永济",
    contact: "李智岭",
    source: "进出口公司名录",
  },
  {
    id: "r-041",
    name: "临汾市尧都区玉红鞋帽进出口经营部（个体工商户）",
    region: "临汾·尧都区",
    contact: "杨红",
    source: "进出口公司名录",
  },
  {
    id: "r-042",
    name: "山西联沃进出口贸易有限公司",
    region: "太原·迎泽区",
    contact: "安改萍",
    source: "进出口公司名录",
  },
  {
    id: "r-043",
    name: "山西鑫钜龙进出口贸易有限公司",
    region: "太原·小店区",
    contact: "陆春贤",
    source: "进出口公司名录",
  },
  {
    id: "r-044",
    name: "山西桦烨进出口贸易有限公司",
    region: "山西",
    contact: "司桂英",
    source: "进出口公司名录",
  },
  {
    id: "r-045",
    name: "晋城市浩运通进出口贸易有限公司",
    region: "晋城",
    contact: "张志浩",
    source: "进出口公司名录",
  },
  {
    id: "r-046",
    name: "山西金莲花进出口贸易有限公司",
    region: "山西",
    contact: "任海龙",
    source: "进出口公司名录",
  },
  {
    id: "r-047",
    name: "易途国际实业集团进出口（山西）有限公司",
    region: "山西",
    contact: "孙常旭",
    source: "进出口公司名录",
  },
  {
    id: "r-048",
    name: "山西省万普达进出口有限责任公司",
    region: "山西",
    contact: "高瑞平",
    source: "进出口公司名录",
  },
  {
    id: "r-049",
    name: "晋城市勤必达进出口有限公司",
    region: "山西",
    contact: "刘秀玲",
    source: "进出口公司名录",
  },
  {
    id: "r-050",
    name: "河津市鑫升进出口贸易有限公司",
    region: "山西",
    contact: "杨延萍",
    source: "进出口公司名录",
  },
  // ============ 2026-09-02 待集成池扩展（scripts/combine-data.ts 生成） ============
  ...registryExtras,
];

/** 按关键词检索名录（企业名 / 区位 / 来源） */
export function searchRegistry(keyword: string): RegistryEntry[] {
  const kw = keyword.trim().toLowerCase();
  if (!kw) return registryEntries;
  return registryEntries.filter((e) =>
    [e.name, e.region, e.source, e.contact ?? ""].join(" ").toLowerCase().includes(kw),
  );
}
