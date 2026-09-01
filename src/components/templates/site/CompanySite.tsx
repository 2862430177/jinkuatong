"use client";
// 企业独立站（内容化 + 中英双语切换版）：站点导航（含语言切换）+ Hero/数据看板
// + 主题化正文板块（产品/关于/资质/客户/新闻/FAQ）+ 询盘表单 + 页脚。
// 说明：
// - 内容由 src/data/site-content/ 驱动（中类别基础包 + 子类覆盖包合并）；
// - 语言切换：默认英文（面向海外买家），可切换中文，localStorage 记忆（useSiteLang）；
// - 区别于主站（(main) 平台外壳），本组件渲染一个完整的、可点击的真实独立站。
import type { Company } from "@/data/companies";
import type { IndustrialBelt } from "@/data/industrial-belts";
import { getSiteContent } from "@/data/site-content";
import { siteI18n, siteNavAnchors, langLabels } from "@/i18n/site";
import { useSiteLang } from "./useSiteLang";
import { SiteContentBody, siteThemes } from "./SiteContentBody";
import { InquiryForm, getInquiryEmail } from "./InquiryForm";

interface CompanySiteProps {
  company: Company;
  belt?: IndustrialBelt;
}

export function CompanySite({ company, belt }: CompanySiteProps) {
  const { lang, setLang, t } = useSiteLang();
  const content = getSiteContent(company.template, company.beltSlug);
  const theme = siteThemes[company.template];

  /** 语言切换按钮：显示另一种语言的名称 */
  const nextLangLabel = langLabels[lang === "en" ? "zh" : "en"];

  return (
    <div className="bg-white text-slate-900">
      {/* ===== 站点导航（sticky）：锚点滚动 + 语言切换 + 移动端无 JS 汉堡菜单 ===== */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#home" className="flex min-w-0 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-slate-900 text-base font-bold text-white">
              {company.name.slice(0, 1)}
            </span>
            <span className="truncate text-base font-bold text-slate-900">{company.name}</span>
          </a>

          <nav className="hidden items-center gap-5 text-sm text-slate-600 lg:flex">
            {siteNavAnchors.map((item) => (
              <a key={item.anchor} href={item.anchor} className="shrink-0 transition-colors hover:text-slate-900">
                {t(siteI18n.nav[item.labelKey])}
              </a>
            ))}
            {/* 语言切换 */}
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="shrink-0 rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-500 hover:text-slate-900"
              aria-label="Switch language"
            >
              🌐 {nextLangLabel}
            </button>
            <a
              href="#contact"
              className="shrink-0 rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            >
              {t(siteI18n.actions.quote)}
            </a>
          </nav>

          {/* 移动端菜单（无 JS） */}
          <details className="group relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center text-slate-700 [&::-webkit-details-marker]:hidden">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <nav className="absolute right-0 top-12 w-48 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
              {siteNavAnchors.map((item) => (
                <a
                  key={item.anchor}
                  href={item.anchor}
                  className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {t(siteI18n.nav[item.labelKey])}
                </a>
              ))}
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "zh" : "en")}
                className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                🌐 {nextLangLabel}
              </button>
              <a
                href="#contact"
                className="mt-1 block rounded-md bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                {t(siteI18n.actions.quote)}
              </a>
            </nav>
          </details>
        </div>
      </header>

      {/* ===== Hero + 数据看板 ===== */}
      <section id="home" className={`scroll-mt-16 ${theme.hero}`}>
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-20 sm:px-6 sm:pt-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-70">{t(content.hero.eyebrow)}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">{t(content.hero.title)}</h1>
          <p className="mt-4 text-base opacity-80">
            {company.name} · {company.location}
            {belt ? ` · ${belt.name}` : ""}
          </p>
          <p className="mt-1 max-w-xl text-sm opacity-70">{t(content.hero.tagline)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className={`rounded px-6 py-3 text-sm font-semibold transition-colors ${theme.heroBtn}`}>
              {t(siteI18n.actions.requestQuote)}
            </a>
            <a href="#about" className={`rounded px-6 py-3 text-sm font-semibold transition-colors ${theme.heroGhost}`}>
              {t(siteI18n.actions.learnMore)}
            </a>
          </div>
        </div>
        {/* 数据看板 */}
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {content.stats.map((s) => (
              <div key={s.label.en} className={`rounded-lg p-4 text-center ring-1 ${theme.statCard}`}>
                <p className={`text-xl font-bold sm:text-2xl ${theme.statNum}`}>{s.num}</p>
                <p className={`mt-1 text-xs ${theme.statLabel}`}>{t(s.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 主题化正文板块 ===== */}
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SiteContentBody content={content} lang={lang} theme={theme} quoteHref="#contact" companyName={company.name} />
      </main>

      {/* ===== 联系区 ===== */}
      <section id="contact" className="scroll-mt-16 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8">
            <p className={`text-xs font-semibold uppercase tracking-wider ${theme.eyebrow}`}>
              {t(siteI18n.sections.contactEyebrow)}
            </p>
            <h2 className={`mt-2 text-2xl font-bold sm:text-3xl ${theme.title}`}>{t(siteI18n.sections.contact)}</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">{t(siteI18n.sections.contactDesc)}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-5">
            {/* 联系方式 */}
            <div className={`space-y-4 rounded-lg border p-6 lg:col-span-2 ${theme.card}`}>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${theme.eyebrow}`}>
                  {t(siteI18n.contact.addressLabel)}
                </p>
                <p className={`mt-1 text-sm ${theme.cardText}`}>{t(content.contact.address)}</p>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${theme.eyebrow}`}>
                  {t(siteI18n.contact.emailLabel)}
                </p>
                <a href={`mailto:${getInquiryEmail(company)}`} className={`mt-1 block text-sm ${theme.accentText} hover:underline`}>
                  {getInquiryEmail(company)}
                </a>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${theme.eyebrow}`}>
                  {t(siteI18n.contact.phoneLabel)}
                </p>
                <p className={`mt-1 text-sm ${theme.cardText}`}>{t(siteI18n.contact.availableOnRequest)}</p>
              </div>
              <p className={`border-t pt-4 text-xs leading-relaxed ${theme.cardText}`}>{t(content.hero.tagline)}</p>
            </div>
            {/* 询盘表单 */}
            <div className="lg:col-span-3">
              <InquiryForm company={company} lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 页脚 ===== */}
      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <p className="text-sm font-semibold text-white">{company.name}</p>
          {company.channels.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              {company.channels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 underline-offset-2 hover:text-white hover:underline"
                >
                  {ch.label} ↗
                </a>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">{t(siteI18n.footer.comingSoon)}</p>
          )}
        </div>
        <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {company.name} · {company.location} · Shanxi, China · {t(siteI18n.footer.rights)}
        </div>
      </footer>
    </div>
  );
}
