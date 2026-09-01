// 独立站正文渲染器（主题化）：渲染 产品系列 / 关于我们 / 资质认证 / 客户案例 / 新闻动态 / FAQ
// 说明：
// - 内容来自 src/data/site-content/（中类别基础包 + 子类覆盖包），语言由 lang prop 控制；
// - 四种主题（cool/warm/modern/elegant）通过 SiteTheme 差异化配色与产品版式；
// - compact 模式用于主站详情页的模板样板预览（不渲染 Hero/统计/联系区）。
import type { TemplateKey } from "@/data/templates";
import { pick, pickList } from "@/data/site-content";
import type { SiteContent, I18nText, I18nList } from "@/data/site-content/types";
import { siteI18n } from "@/i18n/site";
import type { SiteLang } from "@/i18n/site";

/** 主题（每类一套，驱动配色与产品版式） */
export interface SiteTheme {
  /** Hero 区背景与文字 */
  hero: string;
  heroBtn: string;
  heroGhost: string;
  /** 数据看板 */
  statCard: string;
  statNum: string;
  statLabel: string;
  /** 板块标题 */
  eyebrow: string;
  title: string;
  /** 卡片 */
  card: string;
  cardTitle: string;
  cardText: string;
  chip: string;
  /** 强调色 */
  accentText: string;
  accentBg: string;
  accentBorder: string;
  /** 按钮 */
  btnPrimary: string;
  btnGhost: string;
  /** 产品版式：table（工业参数表）/ cards（食品卡片）/ gallery（工艺图鉴） */
  productLayout: "table" | "cards" | "gallery";
}

/** 主题注册表：TemplateKey → SiteTheme */
export const siteThemes: Record<TemplateKey, SiteTheme> = {
  // T1 工业：冷峻金属（深青 + 钢灰），信息密度高 → 表格版式
  "t1-industrial": {
    hero: "bg-slate-900 text-white",
    heroBtn: "bg-slate-100 text-slate-900 hover:bg-white",
    heroGhost: "border border-white/40 text-white hover:bg-white/10",
    statCard: "bg-white/5 ring-1 ring-white/10",
    statNum: "text-gold-400",
    statLabel: "text-slate-300",
    eyebrow: "text-slate-500",
    title: "text-slate-900",
    card: "border-slate-200 bg-white",
    cardTitle: "text-slate-800",
    cardText: "text-slate-500",
    chip: "border-slate-300 text-slate-600",
    accentText: "text-slate-900",
    accentBg: "bg-slate-50",
    accentBorder: "border-slate-200",
    btnPrimary: "bg-slate-900 text-white hover:bg-slate-700",
    btnGhost: "border border-slate-300 text-slate-600 hover:border-slate-500 hover:text-slate-900",
    productLayout: "table",
  },
  // T2 农副：温暖自然（米白 + 大地色），图片食欲感 → 卡片版式
  "t2-agri-food": {
    hero: "bg-amber-50 text-stone-900",
    heroBtn: "bg-stone-900 text-white hover:bg-stone-800",
    heroGhost: "border border-stone-400 text-stone-800 hover:bg-stone-900/5",
    statCard: "bg-white/70 ring-1 ring-amber-200/60",
    statNum: "text-amber-700",
    statLabel: "text-stone-500",
    eyebrow: "text-amber-600",
    title: "text-stone-900",
    card: "border-stone-200 bg-white",
    cardTitle: "text-stone-800",
    cardText: "text-stone-500",
    chip: "border-emerald-200 text-emerald-700",
    accentText: "text-amber-800",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-100",
    btnPrimary: "bg-stone-900 text-white hover:bg-stone-700",
    btnGhost: "border border-stone-300 text-stone-600 hover:border-stone-500 hover:text-stone-900",
    productLayout: "cards",
  },
  // T3 科技：简洁现代（深蓝 + 亮青），参数化 → 表格版式
  "t3-tech-material": {
    hero: "bg-blue-950 text-white",
    heroBtn: "bg-cyan-400 text-blue-950 hover:bg-cyan-300",
    heroGhost: "border border-white/40 text-white hover:bg-white/10",
    statCard: "bg-white/5 ring-1 ring-cyan-400/20",
    statNum: "text-cyan-300",
    statLabel: "text-blue-100",
    eyebrow: "text-cyan-700",
    title: "text-slate-900",
    card: "border-cyan-100 bg-white",
    cardTitle: "text-slate-800",
    cardText: "text-slate-500",
    chip: "bg-slate-900 text-cyan-300",
    accentText: "text-cyan-700",
    accentBg: "bg-cyan-50",
    accentBorder: "border-cyan-100",
    btnPrimary: "bg-cyan-600 text-white hover:bg-cyan-500",
    btnGhost: "border border-cyan-300 text-cyan-700 hover:border-cyan-500 hover:text-cyan-900",
    productLayout: "table",
  },
  // T4 工艺：雅致留白（墨色 + 金色），慢视觉 → 图鉴版式
  "t4-craft": {
    hero: "bg-stone-900 text-white",
    heroBtn: "bg-gold-500 text-stone-950 hover:bg-gold-400",
    heroGhost: "border border-white/40 text-white hover:bg-white/10",
    statCard: "bg-white/5 ring-1 ring-gold-400/20",
    statNum: "text-gold-400",
    statLabel: "text-stone-300",
    eyebrow: "text-stone-500",
    title: "text-stone-900",
    card: "border-stone-200 bg-white",
    cardTitle: "text-stone-800",
    cardText: "text-stone-500",
    chip: "border-stone-300 text-stone-600",
    accentText: "text-stone-800",
    accentBg: "bg-gold-100/40",
    accentBorder: "border-gold-200",
    btnPrimary: "bg-stone-900 text-white hover:bg-stone-700",
    btnGhost: "border border-stone-300 text-stone-600 hover:border-stone-500 hover:text-stone-900",
    productLayout: "gallery",
  },
};

interface SiteContentBodyProps {
  content: SiteContent;
  lang: SiteLang;
  theme: SiteTheme;
  /** 板块内 CTA 的跳转目标（独立站传 #contact，主站样板预览传 /claim） */
  quoteHref: string;
  /** 紧凑模式：主站详情页的模板样板预览（只渲染核心板块） */
  compact?: boolean;
  /** 企业名（注入「关于我们」标题，增强站点归属感） */
  companyName?: string;
}

/** 板块标题（左侧对齐） */
function SectionHeading({
  theme,
  eyebrow,
  title,
}: {
  theme: SiteTheme;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <p className={`text-xs font-semibold uppercase tracking-wider ${theme.eyebrow}`}>{eyebrow}</p>
      <h2 className={`mt-2 text-2xl font-bold sm:text-3xl ${theme.title}`}>{title}</h2>
    </div>
  );
}

/** 产品区：按主题版式渲染 */
function ProductsSection({
  content,
  t,
  theme,
}: {
  content: SiteContent;
  t: (x: I18nText) => string;
  theme: SiteTheme;
}) {
  const layout = theme.productLayout;
  return (
    <section id="products" className="scroll-mt-20">
      <SectionHeading
        theme={theme}
        eyebrow={t(siteI18n.sections.productsEyebrow)}
        title={t(siteI18n.sections.products)}
      />
      <div className="space-y-12">
        {content.products.map((group) => (
          <div key={group.name.en}>
            {/* 系列标题 */}
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className={`text-lg font-bold ${theme.title}`}>{t(group.name)}</h3>
              <p className={`text-sm ${theme.cardText}`}>{t(group.tagline)}</p>
            </div>

            {layout === "table" ? (
              /* 表格版式：工业参数表（产品 / 规格 / 应用） */
              <div className={`overflow-hidden rounded-lg border ${theme.card} ${theme.accentBorder}`}>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className={`${theme.accentBg}`}>
                      <th className={`px-4 py-3 font-semibold ${theme.title}`}>{t(siteI18n.table.product)}</th>
                      <th className={`px-4 py-3 font-semibold ${theme.title}`}>{t(siteI18n.table.specification)}</th>
                      <th className={`hidden px-4 py-3 font-semibold ${theme.title} sm:table-cell`}>{t(siteI18n.table.application)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.products.map((p) => (
                      <tr key={p.name.en} className="border-t border-slate-100">
                        <td className={`px-4 py-3 font-medium ${theme.cardTitle}`}>{t(p.name)}</td>
                        <td className={`px-4 py-3 ${theme.cardText}`}>{t(p.spec)}</td>
                        <td className={`hidden px-4 py-3 ${theme.cardText} sm:table-cell`}>{t(p.application)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : layout === "cards" ? (
              /* 卡片版式：食品卡片（图位 + 名称/规格/应用） */
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.products.map((p) => (
                  <div key={p.name.en} className={`flex flex-col rounded-lg border p-4 shadow-sm ${theme.card}`}>
                    <div className={`flex h-20 items-center justify-center rounded-md text-xs ${theme.accentBg} ${theme.accentText}`}>
                      {t(group.name)}
                    </div>
                    <p className={`mt-3 font-semibold ${theme.cardTitle}`}>{t(p.name)}</p>
                    <p className={`mt-1 text-xs ${theme.cardText}`}>{t(p.spec)}</p>
                    <p className={`mt-auto pt-2 text-xs font-medium ${theme.accentText}`}>{t(p.application)}</p>
                  </div>
                ))}
              </div>
            ) : (
              /* 图鉴版式：工艺作品（细节图位 + 编号说明） */
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {group.products.map((p) => (
                  <div key={p.name.en} className={`group overflow-hidden rounded-lg border ${theme.card} transition-shadow hover:shadow-md`}>
                    <div className={`flex h-24 items-center justify-center text-xs ${theme.accentBg} ${theme.accentText}`}>
                      {t(p.spec)}
                    </div>
                    <div className="p-3">
                      <p className={`text-sm font-semibold ${theme.cardTitle}`}>{t(p.name)}</p>
                      <p className={`mt-1 text-xs ${theme.cardText}`}>{t(p.application)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/** 关于我们：故事 / 使命 / 亮点 / 沿革 */
function AboutSection({
  content,
  t,
  tl,
  theme,
  companyName,
}: {
  content: SiteContent;
  t: (x: I18nText) => string;
  tl: (x: I18nList) => string[];
  theme: SiteTheme;
  companyName?: string;
}) {
  const { about } = content;
  return (
    <section id="about" className="scroll-mt-20">
      <SectionHeading
        theme={theme}
        eyebrow={t(siteI18n.sections.aboutEyebrow)}
        title={companyName ? `${t(siteI18n.sections.about)} — ${companyName}` : t(siteI18n.sections.about)}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`rounded-lg border p-6 ${theme.card}`}>
          <p className={`text-sm leading-relaxed ${theme.cardText}`}>{t(about.story)}</p>
          <p className={`mt-4 border-t pt-4 text-sm font-medium ${theme.accentText}`}>
            <span className={`mr-2 text-xs uppercase tracking-wider ${theme.eyebrow}`}>{t(siteI18n.sections.mission)}</span>
            {t(about.mission)}
          </p>
        </div>
        <div className={`rounded-lg border p-6 ${theme.card}`}>
          <p className={`text-sm font-semibold ${theme.title}`}>{t(siteI18n.sections.highlights)}</p>
          <ul className="mt-3 space-y-2">
            {tl(about.highlights).map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                <span className={`mt-0.5 ${theme.accentText}`}>◆</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* 发展历程 */}
      <div className="mt-8">
        <p className={`mb-4 text-sm font-semibold ${theme.title}`}>{t(siteI18n.sections.milestones)}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {about.milestones.map((m) => (
            <div key={m.year} className={`rounded-lg border-l-4 p-4 ${theme.card} ${theme.accentBorder}`}>
              <p className={`text-lg font-bold ${theme.accentText}`}>{m.year}</p>
              <p className={`mt-1 text-sm ${theme.cardText}`}>{t(m.title)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 资质认证：可点击跳转询盘 */
function CertificationsSection({
  content,
  t,
  tl,
  theme,
  quoteHref,
}: {
  content: SiteContent;
  t: (x: I18nText) => string;
  tl: (x: I18nList) => string[];
  theme: SiteTheme;
  quoteHref: string;
}) {
  return (
    <section id="certifications" className="scroll-mt-20">
      <SectionHeading
        theme={theme}
        eyebrow={t(siteI18n.sections.certsEyebrow)}
        title={t(siteI18n.sections.certs)}
      />
      <div className="flex flex-wrap gap-2">
        {tl(content.certifications).map((c) => (
          <a
            key={c}
            href={quoteHref}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${theme.chip}`}
          >
            ✓ {c}
          </a>
        ))}
      </div>
    </section>
  );
}

/** 客户与评价 */
function ClientsSection({
  content,
  t,
  theme,
}: {
  content: SiteContent;
  t: (x: I18nText) => string;
  theme: SiteTheme;
}) {
  return (
    <section id="clients" className="scroll-mt-20">
      <SectionHeading
        theme={theme}
        eyebrow={t(siteI18n.sections.clientsEyebrow)}
        title={t(siteI18n.sections.clients)}
      />
      {/* 品牌合作背书（参考大华官网"品牌合作"栏目） */}
      <p className={`mb-4 text-sm font-semibold ${theme.title}`}>{t(siteI18n.sections.partners)}</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {content.partners.map((n) => (
          <span key={n} className={`rounded border px-3 py-1 text-sm ${theme.chip}`}>
            {n}
          </span>
        ))}
      </div>
      {/* 合作市场 */}
      <div className="mb-6 flex flex-wrap gap-2">
        {content.clients.names.map((n) => (
          <span key={n} className={`rounded border px-3 py-1 text-sm ${theme.chip}`}>
            {n}
          </span>
        ))}
      </div>
      {/* 客户评价 */}
      <p className={`mb-4 text-sm font-semibold ${theme.title}`}>{t(siteI18n.sections.testimonials)}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {content.clients.testimonials.map((item) => (
          <figure key={item.author.en} className={`rounded-lg border p-5 ${theme.card}`}>
            <blockquote className={`text-sm leading-relaxed ${theme.cardText}`}>“{t(item.quote)}”</blockquote>
            <figcaption className={`mt-3 text-xs font-medium ${theme.accentText}`}>
              {t(item.author)} · <span className={theme.cardText}>{t(item.role)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** 新闻动态：公司动态 + 行业动态双栏目（参考大华官网"公司动态+行业动态"结构） */
function NewsSection({
  content,
  t,
  theme,
}: {
  content: SiteContent;
  t: (x: I18nText) => string;
  theme: SiteTheme;
}) {
  return (
    <section id="news" className="scroll-mt-20">
      <SectionHeading
        theme={theme}
        eyebrow={t(siteI18n.sections.newsEyebrow)}
        title={t(siteI18n.sections.news)}
      />
      {/* 公司动态 */}
      <p className={`mb-4 text-sm font-semibold ${theme.title}`}>{t(siteI18n.sections.companyNews)}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {content.news.map((n) => (
          <article key={`company-${n.title.en}`} className={`rounded-lg border p-5 ${theme.card}`}>
            <p className={`text-xs ${theme.accentText}`}>{n.date}</p>
            <h3 className={`mt-2 text-sm font-semibold ${theme.cardTitle}`}>{t(n.title)}</h3>
            <p className={`mt-2 text-xs leading-relaxed ${theme.cardText}`}>{t(n.summary)}</p>
          </article>
        ))}
      </div>
      {/* 行业动态 */}
      <p className={`mb-4 mt-8 text-sm font-semibold ${theme.title}`}>{t(siteI18n.sections.industryNews)}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {content.industryNews.map((n) => (
          <article key={`industry-${n.title.en}`} className={`rounded-lg border p-5 ${theme.card}`}>
            <p className={`text-xs ${theme.accentText}`}>{n.date}</p>
            <h3 className={`mt-2 text-sm font-semibold ${theme.cardTitle}`}>{t(n.title)}</h3>
            <p className={`mt-2 text-xs leading-relaxed ${theme.cardText}`}>{t(n.summary)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/** B2B 平台外链区（参考大华官网"友情链接"，增加采购方信任与询盘入口） */
function B2bSection({
  content,
  t,
  theme,
}: {
  content: SiteContent;
  t: (x: I18nText) => string;
  theme: SiteTheme;
}) {
  return (
    <section id="platforms" className="scroll-mt-20">
      <div className={`rounded-lg border p-6 ${theme.card}`}>
        <p className={`text-sm font-semibold ${theme.title}`}>{t(siteI18n.sections.b2bPlatforms)}</p>
        <p className={`mt-1 text-xs ${theme.cardText}`}>{t(siteI18n.sections.b2bPlatformsDesc)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {content.b2bLinks.map((b) => (
            <a
              key={b.name}
              href={b.url}
              target="_blank"
              rel="noreferrer"
              className={`rounded border px-3 py-1 text-sm font-semibold transition-opacity hover:opacity-70 ${theme.chip}`}
            >
              {b.name} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/** FAQ（details 展开） */
function FaqSection({
  content,
  t,
  theme,
}: {
  content: SiteContent;
  t: (x: I18nText) => string;
  theme: SiteTheme;
}) {
  return (
    <section id="faq" className="scroll-mt-20">
      <SectionHeading
        theme={theme}
        eyebrow={t(siteI18n.sections.faqEyebrow)}
        title={t(siteI18n.sections.faq)}
      />
      <div className="space-y-3">
        {content.faq.map((item) => (
          <details key={item.q.en} className={`group rounded-lg border ${theme.card} transition-shadow hover:shadow-md`}>
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 [&::-webkit-details-marker]:hidden">
              <span className={`text-sm font-semibold ${theme.cardTitle}`}>{t(item.q)}</span>
              <span className={`text-xs transition-transform group-open:rotate-180 ${theme.accentText}`}>▾</span>
            </summary>
            <p className={`border-t px-5 py-4 text-sm leading-relaxed ${theme.cardText}`}>{t(item.a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function SiteContentBody({ content, lang, theme, quoteHref, compact, companyName }: SiteContentBodyProps) {
  const t = (x: I18nText) => pick(x, lang);
  const tl = (x: I18nList) => pickList(x, lang);

  return (
    <div className="space-y-14">
      {compact ? (
        <>
          {/* 紧凑预览：产品（首个系列）+ 故事 + 认证 + CTA */}
          {content.products[0] ? (
            <section id="products" className="scroll-mt-20">
              <SectionHeading
                theme={theme}
                eyebrow={t(siteI18n.sections.productsEyebrow)}
                title={t(siteI18n.sections.products)}
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {content.products[0].products.map((p) => (
                  <div key={p.name.en} className={`rounded-lg border p-4 ${theme.card}`}>
                    <p className={`text-sm font-semibold ${theme.cardTitle}`}>{t(p.name)}</p>
                    <p className={`mt-1 text-xs ${theme.cardText}`}>{t(p.spec)}</p>
                    <p className={`mt-2 text-xs font-medium ${theme.accentText}`}>{t(p.application)}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
          <section className="rounded-lg border p-5">
            <p className={`text-sm font-semibold ${theme.title}`}>{t(siteI18n.sections.about)}</p>
            <p className={`mt-2 text-sm leading-relaxed ${theme.cardText}`}>{t(content.about.story)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {tl(content.about.highlights).slice(0, 3).map((h) => (
                <span key={h} className={`rounded-full border px-2.5 py-1 text-xs ${theme.chip}`}>
                  ✓ {h}
                </span>
              ))}
            </div>
          </section>
          <div className="flex flex-wrap gap-2">
            {tl(content.certifications).map((c) => (
              <a key={c} href={quoteHref} className={`rounded-full border px-3 py-1 text-xs font-semibold ${theme.chip}`}>
                ✓ {c}
              </a>
            ))}
          </div>
          <div className={`rounded-lg p-6 text-center ${theme.accentBg}`}>
            <p className={`text-sm font-semibold ${theme.accentText}`}>{t(siteI18n.actions.quote)}</p>
            <a
              href={quoteHref}
              className={`mt-3 inline-block rounded px-6 py-3 text-sm font-semibold transition-colors ${theme.btnPrimary}`}
            >
              {t(siteI18n.actions.requestQuote)}
            </a>
          </div>
        </>
      ) : (
        <>
          <ProductsSection content={content} t={t} theme={theme} />
          <AboutSection content={content} t={t} tl={tl} theme={theme} companyName={companyName} />
          <CertificationsSection content={content} t={t} tl={tl} theme={theme} quoteHref={quoteHref} />
          <ClientsSection content={content} t={t} theme={theme} />
          <NewsSection content={content} t={t} theme={theme} />
          <FaqSection content={content} t={t} theme={theme} />
          <B2bSection content={content} t={t} theme={theme} />
        </>
      )}
    </div>
  );
}
