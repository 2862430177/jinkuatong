// 数据校验脚本（todo B5 / 设计文档 §11）：
// 构建前校验数据完整性，失败则以非零退出码中断构建。
// 校验项：slug 唯一、外键有效、template 合法、渠道 URL 格式、渠道类型合法、独立站内容完整。
// 运行：npm run validate（依赖 tsx 运行 TS）
import { companies, channelTypeNames } from "../src/data/companies";
import { industrialBelts } from "../src/data/industrial-belts";
import { templates } from "../src/data/templates";
import { categoryContent, beltContent } from "../src/data/site-content";

const errors: string[] = [];
const warnings: string[] = [];

/** 合法值集合（避免依赖 `in` 操作符，兼容各种模块转译环境） */
const validTemplateKeys = Object.keys(templates);
const validChannelTypes = Object.keys(channelTypeNames);
const validStatuses = ["verified", "pending"];

/** 校验：ok 为 false 时记录错误 */
function fail(message: string) {
  errors.push(message);
}

// ---------- 1. 企业校验 ----------
const companySlugs = new Set<string>();
for (const c of companies) {
  // slug 唯一
  if (companySlugs.has(c.slug)) fail(`企业 slug 重复：${c.slug}`);
  companySlugs.add(c.slug);

  // 外键：beltSlug 必须存在
  const belt = industrialBelts.find((b) => b.slug === c.beltSlug);
  if (!belt) fail(`企业 ${c.name} 的 beltSlug 无效：${c.beltSlug}`);

  // template 合法
  if (!validTemplateKeys.includes(c.template)) fail(`企业 ${c.name} 的 template 非法：${c.template}`);

  // verifyStatus 合法
  if (!validStatuses.includes(c.verifyStatus)) fail(`企业 ${c.name} 的 verifyStatus 非法：${c.verifyStatus}`);

  // 渠道类型与 URL 格式
  for (const ch of c.channels) {
    if (!validChannelTypes.includes(ch.type)) fail(`企业 ${c.name} 的渠道类型非法：${ch.type}`);
    if (!/^https?:\/\/.+/.test(ch.url)) fail(`企业 ${c.name} 的渠道 URL 非 http(s)：${ch.url}`);
  }

  // pending 且已认领不一致提示（认领后应更新为 verified）
  if (c.verifyStatus === "pending" && c.claimed) {
    warnings.push(`企业 ${c.name} 已 claimed 但 verifyStatus 仍为 pending`);
  }
}

// ---------- 2. 产业带校验 ----------
const beltSlugs = new Set<string>();
for (const b of industrialBelts) {
  if (beltSlugs.has(b.slug)) fail(`产业带 slug 重复：${b.slug}`);
  beltSlugs.add(b.slug);

  // companySlugs 中每个 slug 都必须有对应企业
  for (const cs of b.companySlugs) {
    if (!companySlugs.has(cs)) fail(`产业带 ${b.name} 关联的企业 slug 不存在：${cs}`);
  }

  if (b.companySlugs.length === 0) {
    warnings.push(`产业带 ${b.name} 暂无关联企业（companySlugs 为空）`);
  }
}

// ---------- 3. 独立站内容校验（site-content） ----------
const validCategoryToTemplate = Object.fromEntries(
  Object.values(templates).map((t) => [t.category, t.key]),
);

/** 双语字段完整性检查 */
function checkI18n(prefix: string, value: { en: string; zh: string } | { en: string[]; zh: string[] } | undefined) {
  if (!value) return fail(`${prefix} 缺失`);
  if (!value.en || value.en.length === 0) fail(`${prefix}.en 为空`);
  if (!value.zh || value.zh.length === 0) fail(`${prefix}.zh 为空`);
}

// 中类别基础包：每套模板必须有完整内容
for (const tpl of Object.values(templates)) {
  const content = categoryContent[tpl.key];
  if (!content) {
    fail(`模板 ${tpl.key} 缺少中类别内容基础包`);
    continue;
  }
  checkI18n(`[${tpl.key}] hero.eyebrow`, content.hero.eyebrow);
  checkI18n(`[${tpl.key}] hero.title`, content.hero.title);
  checkI18n(`[${tpl.key}] hero.tagline`, content.hero.tagline);
  if (content.stats.length < 4) fail(`[${tpl.key}] stats 少于 4 项`);
  if (content.products.length === 0) fail(`[${tpl.key}] products 为空`);
  checkI18n(`[${tpl.key}] about.story`, content.about.story);
  checkI18n(`[${tpl.key}] about.highlights`, content.about.highlights);
  if (content.about.milestones.length === 0) fail(`[${tpl.key}] about.milestones 为空`);
  checkI18n(`[${tpl.key}] certifications`, content.certifications);
  if (content.clients.testimonials.length === 0) fail(`[${tpl.key}] clients.testimonials 为空`);
  if (content.partners.length === 0) fail(`[${tpl.key}] partners（品牌合作）为空`);
  if (content.news.length < 3) fail(`[${tpl.key}] news（公司动态）少于 3 条`);
  if (content.industryNews.length < 3) fail(`[${tpl.key}] industryNews（行业动态）少于 3 条`);
  if (content.b2bLinks.length === 0) fail(`[${tpl.key}] b2bLinks（B2B 平台外链）为空`);
  for (const b of content.b2bLinks) {
    if (!/^https?:\/\/.+/.test(b.url)) fail(`[${tpl.key}] b2bLinks 的 URL 非 http(s)：${b.name}`);
  }
  if (content.faq.length < 3) fail(`[${tpl.key}] faq 少于 3 条`);
  checkI18n(`[${tpl.key}] contact.address`, content.contact.address);
}

// 子类覆盖包：slug 必须存在、category 必须合法、内容字段必须完整
const beltSlugSet = new Set(industrialBelts.map((b) => b.slug));
const beltSlugsChecked = new Set<string>();
for (const b of beltContent) {
  if (beltSlugsChecked.has(b.slug)) fail(`子类内容包 slug 重复：${b.slug}`);
  beltSlugsChecked.add(b.slug);
  if (!beltSlugSet.has(b.slug)) fail(`子类内容包 slug 无对应产业带：${b.slug}`);
  const tplKey = validCategoryToTemplate[b.category];
  if (!tplKey) fail(`子类内容包 ${b.slug} 的 category 非法：${b.category}`);
  checkI18n(`[belt:${b.slug}] hero.eyebrow`, b.hero.eyebrow);
  checkI18n(`[belt:${b.slug}] hero.title`, b.hero.title);
  checkI18n(`[belt:${b.slug}] hero.tagline`, b.hero.tagline);
  if (b.stats.length < 4) fail(`[belt:${b.slug}] stats 少于 4 项`);
  if (b.products.length === 0) fail(`[belt:${b.slug}] products 为空`);
  checkI18n(`[belt:${b.slug}] about.story`, b.about.story);
  checkI18n(`[belt:${b.slug}] about.highlights`, b.about.highlights);
  checkI18n(`[belt:${b.slug}] contact.address`, b.contact.address);
}
// 每个产业带都有子类内容包（缺省则回退中类别基础包，但应补全）
for (const belt of industrialBelts) {
  if (!beltSlugsChecked.has(belt.slug)) {
    warnings.push(`产业带 ${belt.name} 缺少子类内容包（将回退使用中类别基础包）`);
  }
}

// ---------- 输出 ----------
console.log(
  `\n数据校验完成：企业 ${companies.length} 家 · 产业带 ${industrialBelts.length} 个 · 模板 ${validTemplateKeys.length} 套 · 内容包 ${beltContent.length} 个`,
);

if (warnings.length > 0) {
  console.log(`\n提示（${warnings.length} 条）：`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}

if (errors.length > 0) {
  console.error(`\n校验失败（${errors.length} 条）：`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exitCode = 1;
} else {
  console.log("全部校验通过。");
}
