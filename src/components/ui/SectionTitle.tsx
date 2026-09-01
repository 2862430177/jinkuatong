// 区块标题：小字眼 + 主标题 + 可选说明
interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** 标题标签：页面级主标题用 h1（SEO 语义化），区块标题用 h2（默认） */
  as?: "h1" | "h2";
}

export function SectionTitle({ eyebrow, title, description, align = "center", as = "h2" }: SectionTitleProps) {
  const alignCls = align === "center" ? "text-center" : "text-left";
  const titleCls = "mt-2 text-2xl font-bold text-brand-900 sm:text-3xl";
  return (
    <div className={`mb-10 ${alignCls}`}>
      <p className="text-sm font-semibold uppercase tracking-wider text-gold-500">{eyebrow}</p>
      {as === "h1" ? <h1 className={titleCls}>{title}</h1> : <h2 className={titleCls}>{title}</h2>}
      {description ? <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-600 sm:text-base">{description}</p> : null}
    </div>
  );
}
