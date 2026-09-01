// 企业渠道地图路由组元数据（todo E3）：
// 页面为客户端组件（无法导出 metadata），由本 layout 提供唯一 title/description；
// [slug] 详情页通过 generateMetadata 覆盖更精确的标题。
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "企业出海渠道地图",
  description:
    "山西四大类产业带 Top10 企业（共 40 家）海外渠道地图：企业官网 / 英文站 / 跨境独立站 / B2B 平台店铺，含验证状态。",
};

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
