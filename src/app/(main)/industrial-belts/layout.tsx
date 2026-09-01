// 产业带总览路由组元数据（todo E3）：
// 页面为客户端组件（无法导出 metadata），由本 layout 提供唯一 title/description；
// [slug] 详情页通过 generateMetadata 覆盖更精确的标题。
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "山西产业带总览",
  description: "山西四大类产业带出海总览：传统制造与工业品 / 特色农副与食品 / 新材料·新能源·电子 / 文化工艺品。",
};

export default function IndustrialBeltsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
