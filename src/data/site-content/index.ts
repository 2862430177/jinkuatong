// 独立站内容查询入口：按中类别 + 子类（产业带）合并出最终内容包
// 合并规则：子类覆盖包命中时替换 hero/stats/products/about(story+highlights)/contact.address，
//          其余板块（认证/客户/新闻/FAQ/沿革）沿用中类别基础包。
import type { TemplateKey } from "@/data/templates";
import { categoryContent } from "./categories";
import { beltContent } from "./belts";
import type { BeltContentOverride, SiteContent, I18nText, I18nList } from "./types";

/** 子类覆盖包索引：beltSlug → override */
const beltContentBySlug: Record<string, BeltContentOverride> = Object.fromEntries(
  beltContent.map((b) => [b.slug, b]),
);

/**
 * 取独立站内容包（中类别基础包 + 子类覆盖合并）
 * @param templateKey 企业模板（中类别）
 * @param beltSlug 产业带 slug（子类），缺省时仅用中类别基础包
 */
export function getSiteContent(templateKey: TemplateKey, beltSlug?: string): SiteContent {
  const base = categoryContent[templateKey];
  const belt = beltSlug ? beltContentBySlug[beltSlug] : undefined;
  if (!belt) return base;
  return {
    ...base,
    hero: belt.hero,
    stats: belt.stats,
    products: belt.products,
    about: {
      ...base.about,
      story: belt.about.story,
      highlights: belt.about.highlights,
    },
    contact: { address: belt.contact.address },
  };
}

/** 按当前语言取双语文本 */
export function pick(text: I18nText, lang: "en" | "zh"): string {
  return text[lang];
}

/** 按当前语言取双语列表 */
export function pickList(list: I18nList, lang: "en" | "zh"): string[] {
  return list[lang];
}

/** 导出数据供校验脚本使用 */
export { categoryContent, beltContent };
