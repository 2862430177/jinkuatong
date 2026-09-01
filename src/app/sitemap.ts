// sitemap.xml 生成（静态导出下构建时输出）
import type { MetadataRoute } from "next";
import { industrialBelts } from "@/data/industrial-belts";
import { companies } from "@/data/companies";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jinkuatong.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/industrial-belts/` },
    { url: `${SITE_URL}/companies/` },
    { url: `${SITE_URL}/about/` },
    { url: `${SITE_URL}/claim/` },
  ];

  const beltPages: MetadataRoute.Sitemap = industrialBelts.map((b) => ({
    url: `${SITE_URL}/industrial-belts/${b.slug}/`,
  }));

  const companyPages: MetadataRoute.Sitemap = companies.map((c) => ({
    url: `${SITE_URL}/companies/${c.slug}/`,
  }));

  // 独立站效果页（新窗口）：与 /companies/[slug] 一一对应
  const sitePages: MetadataRoute.Sitemap = companies.map((c) => ({
    url: `${SITE_URL}/companies/${c.slug}/site/`,
  }));

  return [...staticPages, ...beltPages, ...companyPages, ...sitePages];
}
