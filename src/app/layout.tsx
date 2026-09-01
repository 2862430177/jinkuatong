import type { Metadata, Viewport } from "next";
import "./globals.css";

/** 站点域名（构建期注入，默认占位域名，上线前替换为正式域名） */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jinkuatong.com";

/** Cloudflare Web Analytics 令牌（todo F5：配置后自动埋点，未配置不注入脚本） */
const CF_ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "晋跨通 JinKuaTong - 让山西制造，一站卖全球",
    template: "%s | 晋跨通 JinKuaTong",
  },
  description:
    "面向山西产业带中小外贸企业，提供独立站建站（4 套行业模板）、出海渠道地图、合规与海外仓一站式服务。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: "晋跨通 JinKuaTong",
    title: "晋跨通 JinKuaTong - 让山西制造，一站卖全球",
    description:
      "面向山西产业带中小外贸企业，提供独立站建站（4 套行业模板）、出海渠道地图、合规与海外仓一站式服务。",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f3d3e",
};

// 根布局仅保留 html/body 外壳 + 全局脚本（结构化数据 / Web Analytics）；
// 晋跨通 Header/Footer 在 (main) 路由组中提供，使 (preview) 独立站效果页能脱离平台外壳、以真实独立站形态呈现。
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 结构化数据：Organization（todo E1，需求 §8 SEO）
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "晋跨通 JinKuaTong",
    url: SITE_URL,
    description: "面向山西产业带中小外贸企业，提供独立站建站（4 套行业模板）、出海渠道地图、合规与海外仓一站式服务。",
    email: "hello@jinkuatong.com",
    areaServed: "山西",
    knowsAbout: ["独立站建站", "跨境电商", "出海合规", "海外仓"],
  };

  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {/* Cloudflare Web Analytics（todo F5）：配置 NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN 后启用 */}
        {CF_ANALYTICS_TOKEN ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_ANALYTICS_TOKEN })}
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
