// 模板预览调度器：根据 TemplateKey 渲染对应套独立站样板（需求文档 §4）
// 说明：
// - 内容来自 src/data/site-content/（中类别基础包 + 子类覆盖包），与独立站效果页共用一套内容；
// - 以紧凑模式（compact）渲染核心板块，语言固定英文（样板面向海外买家）；
// - beltSlug 可让主站详情页预览与具体企业所属产业带（子类）保持一致。
import type { TemplateKey } from "@/data/templates";
import { getSiteContent } from "@/data/site-content";
import { SiteContentBody, siteThemes } from "./site/SiteContentBody";

interface TemplatePreviewProps {
  templateKey: TemplateKey;
  /** 板块内 CTA 的跳转目标——站内预览传 /claim（晋跨通认领/建站页） */
  quoteHref?: string;
  /** 子类（产业带）slug：有则渲染子类内容包 */
  beltSlug?: string;
}

export function TemplatePreview({ templateKey, quoteHref, beltSlug }: TemplatePreviewProps) {
  const content = getSiteContent(templateKey, beltSlug);
  return (
    <SiteContentBody
      content={content}
      lang="en"
      theme={siteThemes[templateKey]}
      quoteHref={quoteHref ?? "/claim"}
      compact
    />
  );
}
