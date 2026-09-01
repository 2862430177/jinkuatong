// 独立站内容模型（对应需求 §4.1/D1 模板内容化）
// 说明：
// - 独立站全部文案采用 { en, zh } 双语结构，语言切换组件按当前语言取对应文案；
// - 内容分两层：中类别基础包（categories.ts，T1–T4 完整内容）+ 子类覆盖包（belts.ts，
//   按产业带定制 hero/数据/产品/亮点），合并后供站点渲染（getSiteContent）。
import type { Category } from "@/data/templates";

/** 双语文本 */
export interface I18nText {
  en: string;
  zh: string;
}

/** 双语列表（语言切换时取对应语言数组） */
export interface I18nList {
  en: string[];
  zh: string[];
}

/** 数据看板统计项 */
export interface SiteStat {
  num: string;
  label: I18nText;
}

/** 单个产品 */
export interface SiteProduct {
  name: I18nText;
  /** 规格 / 参数 */
  spec: I18nText;
  /** 应用 / 卖点 */
  application: I18nText;
}

/** 产品系列（子类模板的差异化核心） */
export interface SiteProductGroup {
  name: I18nText;
  tagline: I18nText;
  products: SiteProduct[];
}

/** 公司沿革里程碑 */
export interface SiteMilestone {
  year: string;
  title: I18nText;
}

/** 客户评价 */
export interface SiteTestimonial {
  quote: I18nText;
  author: I18nText;
  role: I18nText;
}

/** 新闻 / 动态 */
export interface SiteNews {
  date: string;
  title: I18nText;
  summary: I18nText;
}

/** 常见问题 */
export interface SiteFaq {
  q: I18nText;
  a: I18nText;
}

/** 独立站完整内容包（category 基础包与 belt 覆盖包合并后的最终形态） */
export interface SiteContent {
  hero: {
    eyebrow: I18nText;
    title: I18nText;
    tagline: I18nText;
  };
  stats: SiteStat[];
  products: SiteProductGroup[];
  about: {
    story: I18nText;
    mission: I18nText;
    highlights: I18nList;
    milestones: SiteMilestone[];
  };
  certifications: I18nList;
  clients: {
    /** 合作市场 / 品牌（双语共用） */
    names: string[];
    testimonials: SiteTestimonial[];
  };
  /** 品牌合作背书（参考大华官网"品牌合作"栏目：IKEA/玛莎等合作方展示） */
  partners: string[];
  /** 公司动态（news 保留为公司动态，与大华官网"公司动态+行业动态"双栏目对齐） */
  news: SiteNews[];
  /** 行业动态（区别于 news 公司动态） */
  industryNews: SiteNews[];
  /** B2B 平台外链（参考大华官网"友情链接"：阿里巴巴/Made-in-China 等） */
  b2bLinks: Array<{ name: string; url: string }>;
  faq: SiteFaq[];
  contact: {
    address: I18nText;
  };
}

/** 子类（产业带）覆盖包：仅覆盖与基础包不同的字段 */
export interface BeltContentOverride {
  slug: string;
  /** 所属中类别（用于校验与兜底） */
  category: Category;
  hero: SiteContent["hero"];
  stats: SiteStat[];
  products: SiteProductGroup[];
  about: {
    story: I18nText;
    highlights: I18nList;
  };
  contact: {
    address: I18nText;
  };
}
