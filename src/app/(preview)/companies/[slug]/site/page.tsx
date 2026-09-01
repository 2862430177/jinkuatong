// 企业独立站效果页（需求文档 §4）：完整、可点击的真实独立站
// 按企业所属行业模板（T1–T4）渲染站点外壳 + 内容板块 + 询盘表单，符合海外用户使用习惯。
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { companies, getCompanyBySlug } from "@/data/companies";
import { getBeltBySlug } from "@/data/industrial-belts";
import { CompanySite } from "@/components/templates/site/CompanySite";

/** 静态导出：全量生成所有企业的独立站效果页 */
export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const company = getCompanyBySlug(slug);
    return {
      title: company ? `${company.name} - 独立站效果预览` : "独立站效果预览",
      description: company ? `${company.name}按所属行业模板生成的独立站效果预览，符合海外用户使用习惯。` : undefined,
    };
  });
}

export default async function CompanySitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const belt = getBeltBySlug(company.beltSlug);

  return <CompanySite company={company} belt={belt} />;
}
