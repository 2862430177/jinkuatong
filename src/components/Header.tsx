// 站点顶部导航：桌面端横向导航，移动端用 <details> 实现无 JS 汉堡菜单
import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/industrial-belts", label: "产业带" },
  { href: "/companies", label: "企业渠道地图" },
  { href: "/registry", label: "企业名录" },
  { href: "/about", label: "关于我们" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-900/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-gold-500 text-lg font-bold text-brand-950">
            晋
          </span>
          <span className="text-lg font-bold text-white">
            晋跨通<span className="ml-2 hidden text-xs font-normal text-white/60 sm:inline">JinKuaTong</span>
          </span>
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-white/80 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link
            href="/claim"
            className="rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-brand-950 transition-colors hover:bg-gold-400"
          >
            认领企业
          </Link>
        </nav>

        {/* 移动端汉堡菜单（无 JS） */}
        <details className="group relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md text-white [&::-webkit-details-marker]:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <nav className="absolute right-0 top-12 w-48 rounded-lg border border-white/10 bg-brand-800 p-2 shadow-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/claim"
              className="mt-1 block rounded-md bg-gold-500 px-3 py-2 text-center text-sm font-semibold text-brand-950"
            >
              认领企业
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
