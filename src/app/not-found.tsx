// 404 页面
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-brand-200">404</p>
      <h1 className="mt-4 text-xl font-bold text-brand-900">页面不存在</h1>
      <p className="mt-2 text-sm text-ink-400">您访问的页面可能已移动或不存在。</p>
      <Link href="/" className="mt-6 rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-brand-950 hover:bg-gold-400">
        返回首页
      </Link>
    </div>
  );
}
