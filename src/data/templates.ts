// 模板定义（对应需求文档 §4 / §7.1）
// 每类企业的独立站采用适用该类企业特色的模板，并符合海外用户使用习惯。

/** 四大类企业类别（与产业带 category 一致） */
export type Category = "manufacturing" | "agri-food" | "new-material" | "crafts";

/** 模板标识：T1 工业制造 / T2 农副食品 / T3 科技新材料 / T4 文化工艺 */
export type TemplateKey =
  | "t1-industrial"
  | "t2-agri-food"
  | "t3-tech-material"
  | "t4-craft";

/** 模板差异化风格，用于驱动 Tailwind 样式变体 */
export type TemplateStyle = "cool" | "warm" | "modern" | "elegant";

export interface TemplateMeta {
  key: TemplateKey;
  /** 模板名，如 "工业制造模板" */
  name: string;
  /** 对应企业类别 */
  category: Category;
  /** 目标人群 */
  audience: string;
  /** 模板定位 */
  positioning: string;
  /** 设计规范描述 */
  designSpec: string;
  /** 核心板块清单 */
  keySections: string[];
  /** 差异化风格 */
  style: TemplateStyle;
  /** 海外用户使用习惯要点 */
  overseasHabits: string[];
}

/** 模板注册表：4 套模板元信息 */
export const templates: Record<TemplateKey, TemplateMeta> = {
  "t1-industrial": {
    key: "t1-industrial",
    name: "工业制造模板",
    category: "manufacturing",
    audience: "海外 B2B 采购商 / 工程商",
    positioning: "工厂实力 + 产品规格 + 询盘转化",
    designSpec: "冷峻金属感：深青 + 钢灰，信息密度高、结构清晰",
    keySections: ["公司实力", "产品中心", "认证墙", "全球客户", "询盘表单"],
    style: "cool",
    overseasHabits: [
      "B2B 买家看重资质、产能、MOQ、交期与认证",
      "规格表与 PDF 文档可下载",
      "Email / WhatsApp 直达询盘",
    ],
  },
  "t2-agri-food": {
    key: "t2-agri-food",
    name: "农副食品模板",
    category: "agri-food",
    audience: "海外进口商 / D2C 消费者",
    positioning: "产地故事 + 安全认证 + 健康理念",
    designSpec: "温暖自然：米白 + 大地色，图片食欲感强",
    keySections: ["产品故事", "产品系列", "安全认证", "品牌故事", "订阅/询盘"],
    style: "warm",
    overseasHabits: [
      "强调天然、有机、可追溯与健康",
      "产地溯源与食品安全认证（有机/HACCP/FDA）",
      "Instagram / Facebook 内容营销联动",
    ],
  },
  "t3-tech-material": {
    key: "t3-tech-material",
    name: "科技新材料模板",
    category: "new-material",
    audience: "海外技术采购 / 工程师",
    positioning: "技术参数 + 应用场景 + 研发能力",
    designSpec: "简洁现代：深蓝 + 亮青，参数表格化、数据驱动",
    keySections: ["技术参数", "应用场景", "研发能力", "文档下载", "样品申请"],
    style: "modern",
    overseasHabits: [
      "工程师主导采购，重视规格数据与测试报告",
      "Datasheet / 白皮书可下载",
      "样片 / 样品申请入口",
    ],
  },
  "t4-craft": {
    key: "t4-craft",
    name: "文化工艺模板",
    category: "crafts",
    audience: "海外收藏家 / 礼品渠道",
    positioning: "文化叙事 + 工艺美学 + 收藏价值",
    designSpec: "雅致留白：墨色 + 金色点缀，慢视觉高级感",
    keySections: ["工艺过程", "产品图鉴", "文化价值", "限量与定制", "收藏咨询"],
    style: "elegant",
    overseasHabits: [
      "重视文化叙事、艺术价值与收藏场景",
      "高质感实拍与细节放大",
      "限量、定制与礼品包装服务",
    ],
  },
};

/** 类别 → 默认模板映射 */
export const categoryToTemplate: Record<Category, TemplateKey> = {
  manufacturing: "t1-industrial",
  "agri-food": "t2-agri-food",
  "new-material": "t3-tech-material",
  crafts: "t4-craft",
};

/** 模板列表（用于遍历渲染） */
export const templateList: TemplateMeta[] = [
  templates["t1-industrial"],
  templates["t2-agri-food"],
  templates["t3-tech-material"],
  templates["t4-craft"],
];

/** 类别中文名 */
export const categoryNames: Record<Category, string> = {
  manufacturing: "传统制造与工业品",
  "agri-food": "特色农副与食品",
  "new-material": "新材料·新能源·电子",
  crafts: "文化工艺品",
};
