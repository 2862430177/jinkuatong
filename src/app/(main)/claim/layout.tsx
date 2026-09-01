// 认领页元数据（todo E3）：页面为客户端组件（无法导出 metadata），由本 layout 提供
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "企业认领 / 联系我们",
  description: "认领您的企业展示位，或预约独立站建站（4 套行业模板）与优化诊断，提交后人工跟进核验。",
};

export default function ClaimLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
