// 独立站效果预览布局（(preview) 路由组）：
// 仅提供一条极简工具条说明这是模板效果预览，页面主体即完整、可点击的真实独立站。
import Link from "next/link";

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* 预览工具条：区别于真实站点的轻量说明层 */}
      <div className="border-b border-slate-200 bg-slate-50/95 px-4 py-2 text-center text-xs text-ink-400">
        <span className="mr-1">🔍 晋跨通模板效果预览 · 非正式站点</span>
        <span className="mx-2 hidden sm:inline">|</span>
        <Link href="/companies" className="hidden text-brand-700 hover:underline sm:inline">
          企业渠道地图
        </Link>
        <span className="mx-2 hidden sm:inline">·</span>
        <Link href="/claim" className="hidden text-brand-700 hover:underline sm:inline">
          预约同款模板建站
        </Link>
      </div>
      {children}
    </div>
  );
}
