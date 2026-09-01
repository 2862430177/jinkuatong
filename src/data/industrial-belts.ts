// 产业带数据（对应需求文档 §7.2）
// 数据来源：市场报告 §3；zone（综试区）为初步划分，正式上线前需人工核验。
import type { Category } from "./templates";

export interface IndustrialBelt {
  /** 路由标识，如 'qi-xian-glass' */
  slug: string;
  /** 名称，如 '祁县玻璃器皿' */
  name: string;
  /** 分类（对应模板 T1–T4） */
  category: Category;
  /** 区位，如 '晋中·祁县' */
  region: string;
  /** 一句话简介 */
  summary: string;
  /** 代表产品 */
  products: string[];
  /** 亮点（出口数据、产业地位等） */
  highlights: string[];
  /** 所属综试区：太原 / 大同 / 运城（初步划分，待核验） */
  zone?: string;
  /** 关联企业 slug */
  companySlugs: string[];
}

export const industrialBelts: IndustrialBelt[] = [
  // ============ 传统制造与工业品（T1） ============
  {
    slug: "qi-xian-glass",
    name: "祁县玻璃器皿",
    category: "manufacturing",
    region: "晋中·祁县",
    summary: "全国最大的人工吹制玻璃器皿生产基地，产品覆盖全球 80+ 国家。",
    products: ["玻璃器皿", "水晶杯", "酒具", "玻璃工艺品"],
    highlights: ["产品覆盖全球 80+ 国家", "全国最大人工吹制玻璃基地"],
    zone: "太原",
    companySlugs: ["da-hua-glass", "qi-xian-hongchang", "qi-xian-glass-p01", "qi-xian-glass-p02", "qi-xian-glass-p03", "qi-xian-glass-p04", "qi-xian-glass-p05", "qi-xian-glass-p06", "qi-xian-glass-p07"],
  },
  {
    slug: "ding-xiang-flange",
    name: "定襄法兰",
    category: "manufacturing",
    region: "忻州·定襄",
    summary: "亚洲较大的法兰锻造基地，出口量占全国三成。",
    products: ["法兰", "锻件", "管件"],
    highlights: ["亚洲较大法兰生产基地", "出口占全国三成"],
    zone: "太原",
    companySlugs: ["guan-li-flange", "ding-xiang-hengda", "c-belt-1", "ding-xiang-flange-p01", "ding-xiang-flange-p02", "ding-xiang-flange-p03", "ding-xiang-flange-p04", "ding-xiang-flange-p05", "ding-xiang-flange-p06"],
  },
  {
    slug: "huai-ren-ceramic",
    name: "怀仁·应县陶瓷",
    category: "manufacturing",
    region: "朔州",
    summary: "北方重要的日用陶瓷生产基地，产品以日用瓷、骨质瓷为主。",
    products: ["日用陶瓷", "骨质瓷", "酒店用瓷"],
    highlights: ["北方日用陶瓷重要基地"],
    zone: "大同",
    companySlugs: ["bo-da-ceramics", "zun-yi-ceramics", "huai-ren-jinlan", "huai-ren-ceramic-p01", "huai-ren-ceramic-p02", "huai-ren-ceramic-p03", "huai-ren-ceramic-p04", "huai-ren-ceramic-p05", "huai-ren-ceramic-p06"],
  },
  {
    slug: "yan-hu-pump",
    name: "盐湖水泵机电",
    category: "manufacturing",
    region: "运城·盐湖",
    summary: "水泵及机电设备远销 130+ 个国家，运城综试区核心产业。",
    products: ["水泵", "机电设备", "电机"],
    highlights: ["远销 130+ 国家"],
    zone: "运城",
    companySlugs: ["yan-hu-yongji", "c-belt-2", "yan-hu-pump-p01", "yan-hu-pump-p02", "yan-hu-pump-p03", "yan-hu-pump-p04", "yan-hu-pump-p05", "yan-hu-pump-p06"],
  },
  {
    slug: "ji-shan-diamond",
    name: "稷山金刚石",
    category: "manufacturing",
    region: "运城·稷山",
    summary: "金刚石刀具与磨料产业集群，工业易耗品出口稳定。",
    products: ["金刚石刀具", "金刚石磨料", "超硬材料"],
    highlights: ["金刚石刀具集群"],
    zone: "运城",
    companySlugs: ["ji-shan-haitong", "ji-shan-diamond-p01", "ji-shan-diamond-p02", "ji-shan-diamond-p03", "ji-shan-diamond-p04", "ji-shan-diamond-p05", "ji-shan-diamond-p06", "ji-shan-diamond-p07"],
  },
  {
    slug: "taiyuan-stainless",
    name: "不锈钢·特种钢",
    category: "manufacturing",
    region: "太原·中北高新区",
    summary: "依托太钢产业链的不锈钢制品与特种钢出口集群。",
    products: ["不锈钢制品", "特种钢", "精密部件"],
    highlights: ["太原综试区代表产业带"],
    zone: "太原",
    companySlugs: ["taiyuan-taigang-steel", "taiyuan-stainless-p01", "taiyuan-stainless-p02", "taiyuan-stainless-p03", "taiyuan-stainless-p04", "taiyuan-stainless-p05", "taiyuan-stainless-p06"],
  },

  // ============ 特色农副与食品（T2） ============
  {
    slug: "small-grains",
    name: "山西小杂粮",
    category: "agri-food",
    region: "大同 / 忻州 / 阳泉 / 长治",
    summary: "杂粮大省核心产区，沁州黄小米、阳泉富硒小米享誉全国。",
    products: ["小米", "杂粮", "富硒小米"],
    highlights: ["沁州黄小米地理标志", "富硒产品差异化"],
    zone: "大同",
    companySlugs: ["qiu-ji-millet", "yang-quan-fuxi-millet", "datong-cereal", "small-grains-p01", "small-grains-p02", "small-grains-p03", "small-grains-p04", "small-grains-p05", "small-grains-p06", "small-grains-p07", "small-grains-p08", "small-grains-p09", "small-grains-p10"],
  },
  {
    slug: "forest-fruit",
    name: "林果与沙棘",
    category: "agri-food",
    region: "运城 / 吕梁",
    summary: "运城苹果、吕梁红枣与沙棘饮品，天然健康食品出海代表。",
    products: ["苹果", "红枣", "沙棘饮品"],
    highlights: ["运城苹果地理标志", "沙棘深加工"],
    zone: "运城",
    companySlugs: ["ye-shan-po", "yun-cheng-apple", "lv-liang-red-jujube", "forest-fruit-p01", "forest-fruit-p02", "forest-fruit-p03", "forest-fruit-p04", "forest-fruit-p05", "forest-fruit-p06", "forest-fruit-p07", "forest-fruit-p08", "forest-fruit-p09", "forest-fruit-p10"],
  },
  {
    slug: "qing-xu-vinegar",
    name: "清徐老陈醋",
    category: "agri-food",
    region: "太原·清徐",
    summary: "中国四大名醋之一，81 家企业远销 36+ 个国家。",
    products: ["老陈醋", "醋饮料", "醋泡食品"],
    highlights: ["企业 81 家", "远销 36+ 国家"],
    zone: "太原",
    companySlugs: ["qing-xu-zilin", "qing-xu-shuita", "qing-xu-vinegar-p01", "qing-xu-vinegar-p02", "qing-xu-vinegar-p03", "qing-xu-vinegar-p04", "qing-xu-vinegar-p05", "qing-xu-vinegar-p06", "qing-xu-vinegar-p07", "qing-xu-vinegar-p08", "qing-xu-vinegar-p09", "qing-xu-vinegar-p10"],
  },
  {
    slug: "meat-products",
    name: "肉制品",
    category: "agri-food",
    region: "晋中 / 朔州",
    summary: "平遥牛肉、朔州羔羊肉等特色肉制品，具备出口加工基础。",
    products: ["平遥牛肉", "羔羊肉", "熟食制品"],
    highlights: ["平遥牛肉地理标志"],
    zone: "大同",
    companySlugs: ["ping-yao-guanyun", "shuo-zhou-lamb", "meat-products-p01", "meat-products-p02", "meat-products-p03", "meat-products-p04", "meat-products-p05", "meat-products-p06", "meat-products-p07", "meat-products-p08", "meat-products-p09", "meat-products-p10"],
  },

  // ============ 新材料·新能源·电子（T3） ============
  {
    slug: "chang-zhi-led",
    name: "长治 LED 光电",
    category: "new-material",
    region: "长治",
    summary: "LED 产值占全省 95%+，深紫外 LED 全球领先。",
    products: ["LED 照明", "深紫外 LED", "光电模组"],
    highlights: ["产值占全省 95%+", "深紫外 LED 全球领先"],
    companySlugs: ["chang-zhi-led-co", "chang-zhi-shenzi-led", "chang-zhi-optics-module", "chang-zhi-led-p01", "chang-zhi-led-p02", "chang-zhi-led-p03", "chang-zhi-led-p04", "chang-zhi-led-p05", "chang-zhi-led-p06", "chang-zhi-led-p07", "chang-zhi-led-p08", "chang-zhi-led-p09", "chang-zhi-led-p10", "chang-zhi-led-p11", "chang-zhi-led-p12", "chang-zhi-led-p13", "chang-zhi-led-p14"],
  },
  {
    slug: "jincheng-optoelectronics",
    name: "晋城光机电",
    category: "new-material",
    region: "晋城",
    summary: "AI 儿童相机、蓝牙音箱、冰沙机等消费电子出口新秀。",
    products: ["AI 儿童相机", "蓝牙音箱", "小家电"],
    highlights: ["消费电子出海增长快"],
    companySlugs: ["jincheng-ai-camera", "jincheng-audio", "jincheng-blender", "jincheng-optoelectronics-p01", "jincheng-optoelectronics-p02", "jincheng-optoelectronics-p03", "jincheng-optoelectronics-p04", "jincheng-optoelectronics-p05", "jincheng-optoelectronics-p06", "jincheng-optoelectronics-p07", "jincheng-optoelectronics-p08", "jincheng-optoelectronics-p09", "jincheng-optoelectronics-p10", "jincheng-optoelectronics-p11", "jincheng-optoelectronics-p12", "jincheng-optoelectronics-p13", "jincheng-optoelectronics-p14"],
  },
  {
    slug: "new-materials",
    name: "新材料产业带",
    category: "new-material",
    region: "太原 / 吕梁",
    summary: "半导体材料、碳纤维、蓝宝石晶体、铝镁新材料集群。",
    products: ["半导体材料", "碳纤维", "蓝宝石晶体", "铝镁新材料"],
    highlights: ["太原综试区重点方向"],
    zone: "太原",
    companySlugs: ["taiyuan-semiconductor", "taiyuan-carbon-fiber", "lv-liang-sapphire", "lv-liang-aluminum-mg", "new-materials-p01", "new-materials-p02", "new-materials-p03", "new-materials-p04", "new-materials-p05", "new-materials-p06", "new-materials-p07", "new-materials-p08", "new-materials-p09", "new-materials-p10", "new-materials-p11", "new-materials-p12"],
  },

  // ============ 文化工艺品（T4） ============
  {
    slug: "ping-yao-lacquer",
    name: "平遥推光漆器",
    category: "crafts",
    region: "晋中·平遥",
    summary: "国家级非物质文化遗产，推光漆艺与晋商美学代表。",
    products: ["推光漆器", "漆画", "家具"],
    highlights: ["国家级非遗", "收藏级工艺品"],
    zone: "太原",
    companySlugs: ["ping-yao-lacquer-co", "ping-yao-hongguang", "ping-yao-qihu", "ping-yao-lacquer-studio", "ping-yao-lacquer-p01", "ping-yao-lacquer-p02", "ping-yao-lacquer-p03", "ping-yao-lacquer-p04", "ping-yao-lacquer-p05", "ping-yao-lacquer-p06", "ping-yao-lacquer-p07", "ping-yao-lacquer-p08", "ping-yao-lacquer-p09", "ping-yao-lacquer-p10", "ping-yao-lacquer-p11", "ping-yao-lacquer-p12", "ping-yao-lacquer-p13"],
  },
  {
    slug: "gao-ping-lu-silk",
    name: "高平潞绸",
    category: "crafts",
    region: "晋城·高平",
    summary: "北方丝绸文化代表，潞绸织造技艺传承千年。",
    products: ["潞绸面料", "丝绸制品", "文创产品"],
    highlights: ["千年潞绸文化", "北方丝绸代表"],
    companySlugs: ["gao-ping-lu-silk-group", "gao-ping-silk-craft", "gao-ping-fabric", "gao-ping-lu-silk-p01", "gao-ping-lu-silk-p02", "gao-ping-lu-silk-p03", "gao-ping-lu-silk-p04", "gao-ping-lu-silk-p05", "gao-ping-lu-silk-p06", "gao-ping-lu-silk-p07", "gao-ping-lu-silk-p08", "gao-ping-lu-silk-p09", "gao-ping-lu-silk-p10", "gao-ping-lu-silk-p11", "gao-ping-lu-silk-p12", "gao-ping-lu-silk-p13", "gao-ping-lu-silk-p14"],
  },
  {
    slug: "ding-xiang-wood",
    name: "定襄木器",
    category: "crafts",
    region: "忻州·定襄",
    summary: "传统木器制作集群，兼具实用与收藏价值。",
    products: ["木器", "木制工艺品", "古典家具"],
    highlights: ["传统木作技艺"],
    zone: "太原",
    companySlugs: ["ding-xiang-wood-workshop", "ding-xiang-furniture", "ding-xiang-wood-craft", "ding-xiang-wood-p01", "ding-xiang-wood-p02", "ding-xiang-wood-p03", "ding-xiang-wood-p04", "ding-xiang-wood-p05", "ding-xiang-wood-p06", "ding-xiang-wood-p07", "ding-xiang-wood-p08", "ding-xiang-wood-p09", "ding-xiang-wood-p10", "ding-xiang-wood-p11", "ding-xiang-wood-p12", "ding-xiang-wood-p13"],
  },
];

/** 按分类取产业带 */
export function getBeltsByCategory(category: string): IndustrialBelt[] {
  return industrialBelts.filter((b) => b.category === category);
}

/** 按 slug 取产业带 */
export function getBeltBySlug(slug: string): IndustrialBelt | undefined {
  return industrialBelts.find((b) => b.slug === slug);
}
