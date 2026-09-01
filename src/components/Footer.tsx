// 站点底部：品牌、快速链接、联系信息、合规链接
// todo G3：海外社媒入口（Instagram/Facebook/LinkedIn）——账号开通后替换为真实主页链接
import Link from "next/link";

/** 海外社媒入口（占位：先指向平台首页，注册后替换为品牌主页） */
const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/", title: "晋跨通 Instagram（账号开通后更新）" },
  { name: "Facebook", href: "https://www.facebook.com/", title: "晋跨通 Facebook（账号开通后更新）" },
  { name: "LinkedIn", href: "https://www.linkedin.com/", title: "晋跨通 LinkedIn（账号开通后更新）" },
];

const linkGroups = [
  {
    title: "平台",
    links: [
      { href: "/industrial-belts", label: "产业带总览" },
      { href: "/companies", label: "企业渠道地图" },
      { href: "/claim", label: "企业认领" },
      { href: "/about", label: "关于我们" },
    ],
  },
  {
    title: "服务",
    links: [
      { href: "/about", label: "独立站建站（4 套行业模板）" },
      { href: "/about", label: "出海合规" },
      { href: "/about", label: "海外仓对接" },
      { href: "/about", label: "本地代运营" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* 品牌区 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded bg-gold-500 text-lg font-bold text-brand-950">
                晋
              </span>
              <span className="text-lg font-bold">晋跨通 JinKuaTong</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              让山西制造，一站卖全球。面向山西产业带中小外贸企业，提供从「建站 → 获客 → 合规 → 履约」的一站式出海服务。
            </p>
            <p className="mt-4 text-sm text-white/60">
              联系：<a href="mailto:hello@jinkuatong.com" className="text-gold-400 hover:underline">hello@jinkuatong.com</a>
            </p>
            {/* 海外社媒入口（todo G3） */}
            <div className="mt-4 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.title}
                  aria-label={`晋跨通 ${s.name}`}
                  className="rounded-md border border-white/15 px-3 py-1 text-xs text-white/70 transition-colors hover:border-gold-400 hover:text-gold-400"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* 链接组 */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white/90">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 版权与合规 */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 晋跨通 JinKuaTong · 山西·太原</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">隐私政策</Link>
            <Link href="/terms" className="hover:text-white">服务条款</Link>
            <span>ICP 备案号待更新</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
