// 企业详情（需求文档 §5.5）：渠道地图 + 独立站模板样板 + 认领/纠错入口
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { companies, getCompanyBySlug } from "@/data/companies";
import { getBeltBySlug } from "@/data/industrial-belts";
import { templates } from "@/data/templates";
import { Badge } from "@/components/ui/Badge";
import { VerifyTag } from "@/components/ui/VerifyTag";
import { CTAButton } from "@/components/ui/CTAButton";
import { TemplatePreview } from "@/components/templates/TemplatePreview";

/** 站点域名（构建期注入，用于结构化数据中的 canonical URL） */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jinkuatong.com";

/** 静态导出：全量生成所有企业详情页 */
export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const company = getCompanyBySlug(slug);
    return {
      title: company ? `${company.name} - 出海渠道地图` : "企业详情",
      description: company?.intro,
    };
  });
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const belt = getBeltBySlug(company.beltSlug);
  const template = templates[company.template];

  // 结构化数据：Product（todo E1，需求 §8 SEO）——描述该企业及其出海产品
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: company.name,
    description: company.intro,
    brand: { "@type": "Brand", name: company.name },
    url: `${SITE_URL}/companies/${company.slug}/`,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      {/* 头部 */}
      <section className="bg-brand-900 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm text-white/60">
            <Link href="/companies" className="hover:underline">
              企业渠道地图
            </Link>
            <span className="mx-2">/</span>
            {belt ? belt.name : company.location}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <VerifyTag status={company.verifyStatus} />
          </div>
          <p className="mt-3 max-w-2xl text-white/70">{company.intro}</p>
          <p className="mt-2 text-xs text-white/50">📍 {company.location}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        {/* 渠道地图 */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-brand-900">出海渠道地图</h2>
          {company.channels.length > 0 ? (
            <ul className="space-y-3">
              {company.channels.map((ch) => (
                <li key={ch.label} className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
                  <Badge type={ch.type} label={ch.label} />
                  <a href={ch.url} target="_blank" rel="noreferrer" className="text-sm text-brand-700 hover:underline">
                    {ch.url}
                  </a>
                  {ch.note ? <span className="text-xs text-ink-400">{ch.note}</span> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-ink-400">
              暂无核验渠道。如您是此企业，请
              <Link href="/claim" className="mx-1 text-brand-700 hover:underline">
                认领
              </Link>
              并提交渠道信息。
            </p>
          )}
        </section>

        {/* 独立站模板样板（需求 §4：按 template 渲染对应行业模板） */}
        <section>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-brand-900">适用独立站模板：{template.name}</h2>
            <a
              href={`/companies/${company.slug}/site`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-100"
            >
              新窗口查看完整独立站效果 ↗
            </a>
          </div>
          <p className="mb-4 text-sm text-ink-400">
            按企业类别匹配 · {template.positioning} · {template.designSpec}
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-6">
              <TemplatePreview templateKey={company.template} quoteHref="/claim" beltSlug={company.beltSlug} />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div>
                <p className="text-sm font-semibold text-brand-800">海外用户使用习惯要点</p>
                <ul className="mt-2 space-y-2 text-sm text-ink-600">
                  {template.overseasHabits.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-0.5 text-gold-500">◆</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/claim">预约建站 / 优化诊断</CTAButton>
                <CTAButton href="/claim" variant="outline">
                  纠错 / 更新渠道
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
