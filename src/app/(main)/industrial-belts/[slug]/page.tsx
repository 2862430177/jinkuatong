// 产业带详情（需求文档 §5.3）：介绍 + 代表企业 + 对应行业模板样板
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industrialBelts, getBeltBySlug } from "@/data/industrial-belts";
import { getCompaniesByBelt } from "@/data/companies";
import { categoryToTemplate, templates, categoryNames } from "@/data/templates";
import { CompanyCard } from "@/components/CompanyCard";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { CTAButton } from "@/components/ui/CTAButton";

/** 静态导出：全量生成所有产业带详情页 */
export function generateStaticParams() {
  return industrialBelts.map((belt) => ({ slug: belt.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const belt = getBeltBySlug(slug);
    return {
      title: belt ? belt.name : "产业带",
      description: belt?.summary,
    };
  });
}

export default async function BeltDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const belt = getBeltBySlug(slug);
  if (!belt) notFound();

  const companies = getCompaniesByBelt(belt.slug);
  const template = templates[categoryToTemplate[belt.category]];

  return (
    <div>
      {/* 头部 */}
      <section className="bg-brand-900 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">{categoryNames[belt.category]}</p>
          <h1 className="mt-2 text-3xl font-bold">{belt.name}</h1>
          <p className="mt-3 max-w-2xl text-white/70">{belt.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
            <span>📍 {belt.region}</span>
            {belt.zone ? <span>· {belt.zone}综试区</span> : null}
            <span>· 代表产品：{belt.products.join(" / ")}</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        {/* 产业亮点 */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-brand-900">产业亮点</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {belt.highlights.map((h) => (
              <li key={h} className="rounded-lg border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* 代表企业 */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-brand-900">代表企业</h2>
            <Link href="/claim" className="text-sm text-brand-700 hover:underline">
              + 认领企业
            </Link>
          </div>
          {companies.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((c) => (
                <CompanyCard key={c.slug} company={c} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-ink-400">
              企业数据整理中（每类 Top10 覆盖计划内），点击
              <Link href="/claim" className="mx-1 text-brand-700 hover:underline">
                认领
              </Link>
              提前展示您的企业。
            </p>
          )}
        </section>

        {/* 对应行业模板 */}
        <section>
          <h2 className="mb-2 text-xl font-bold text-brand-900">推荐独立站模板：{template.name}</h2>
          <p className="mb-4 text-sm text-ink-400">
            定位：{template.positioning} · 目标人群：{template.audience} · 符合海外用户使用习惯
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-6">
              <TemplatePreview templateKey={template.key} quoteHref="/claim" beltSlug={belt.slug} />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <p className="text-sm leading-relaxed text-ink-600">
                该产业带企业适合使用「{template.name}」。设计要点：{template.designSpec}。
              </p>
              <ul className="space-y-2 text-sm text-ink-600">
                {template.keySections.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="text-gold-500">◆</span>
                    {s}
                  </li>
                ))}
              </ul>
              {companies.length > 0 ? (
                <a
                  href={`/companies/${companies[0].slug}/site`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded border border-brand-200 bg-brand-50 px-4 py-2 text-center text-sm font-medium text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-100"
                >
                  新窗口查看示例企业独立站效果 ↗
                </a>
              ) : null}
              <CTAButton href="/claim">为企业预约该模板建站</CTAButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
