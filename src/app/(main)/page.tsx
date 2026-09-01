// 首页：品牌落地页（需求文档 §5.1）
// 板块：Hero → 数据看板 → 三大综试区 → 产业带矩阵 → 样板产业带 → 模板体系 → 服务 → CTA
import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTAButton } from "@/components/ui/CTAButton";
import { BeltCard } from "@/components/BeltCard";
import { getBeltsByCategory, industrialBelts } from "@/data/industrial-belts";
import { categoryNames, templateList } from "@/data/templates";
import { integratedCount, pendingCount } from "@/data/integration";

/** 数据看板（市场报告 §2，待二次核验；集成进度为动态数据） */
const stats = [
  { num: "195亿", label: "2025 跨境电商出口额（+30%）" },
  { num: "13万", label: "跨境电商平台卖家" },
  { num: String(integratedCount), label: "已收录产业带企业（4 大类 × 每类 Top50）" },
  { num: String(pendingCount), label: "待集成备案企业（全省共 1963 家）" },
];

/** 三大综试区（市场报告 §4） */
const zones = [
  { name: "太原", role: "智造之都 · 全省枢纽", belts: "不锈钢、重型机械、半导体新材料" },
  { name: "大同", role: "能源新星 · 小杂粮", belts: "新能源装备、黄花/黄芪、轨道交通" },
  { name: "运城", role: "果香玻璃", belts: "苹果、玻璃器皿、水泵、金刚石" },
];

/** 样板产业带（市场报告 §10 建议首批） */
const sampleBeltSlugs = ["qi-xian-glass", "ding-xiang-flange", "huai-ren-ceramic", "forest-fruit"];

/** 服务（市场报告 §7 路线 A 打包） */
const services = [
  { icon: "🌐", name: "独立站建站", desc: "4 套行业特色模板，符合海外用户使用习惯，已有站点可参考优化" },
  { icon: "📋", name: "出海合规", desc: "本地报关行对接、目标市场合规与税务支持" },
  { icon: "🚢", name: "海外仓对接", desc: "18 个海外仓资源，支持多国履约" },
  { icon: "🤝", name: "本地代运营", desc: "小步快跑，从建站到获客的本地化打包服务" },
];

export default function HomePage() {
  const categories = (Object.keys(categoryNames) as (keyof typeof categoryNames)[]).map((c) => ({
    key: c,
    name: categoryNames[c],
    count: getBeltsByCategory(c).length,
    template: templateList.find((t) => t.category === c),
  }));

  const sampleBelts = sampleBeltSlugs
    .map((slug) => industrialBelts.find((b) => b.slug === slug))
    .filter((b): b is (typeof industrialBelts)[number] => Boolean(b));

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">山西产业带 · 一站式出海服务</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            让山西制造
            <span className="text-gold-400">，一站卖全球</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg">
            深耕祁县玻璃、定襄法兰、清徐陈醋等产业带，提供行业特色独立站模板、出海渠道地图与本地化运营服务。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton href="/industrial-belts">查看产业带</CTAButton>
            <CTAButton href="/companies" variant="outline">
              浏览企业渠道地图
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 数据看板 */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-brand-800">{s.num}</p>
              <p className="mt-1 text-xs text-ink-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 三大综试区 */}
      <section className="bg-brand-50/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Policy"
            title="三大国家级跨境电商综试区"
            description="政策资源（补贴、通关、外汇）集中地，晋跨通与综试区园区、产业带协会深度合作。"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {zones.map((z) => (
              <div key={z.name} className="rounded-lg border border-brand-100 bg-white p-6">
                <h3 className="text-xl font-bold text-brand-800">{z.name}综试区</h3>
                <p className="mt-1 text-sm font-medium text-gold-600">{z.role}</p>
                <p className="mt-3 text-sm text-ink-600">{z.belts}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 产业带矩阵 */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Industrial Belts"
            title="产业带出海地图"
            description="四大类产业带全景，每类配备行业特色独立站模板。"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.key}
                href={`/industrial-belts?category=${c.key}`}
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-500">
                  {c.template?.name ?? "模板"}
                </p>
                <h3 className="mt-2 text-lg font-bold text-brand-900">{c.name}</h3>
                <p className="mt-2 text-sm text-ink-400">{c.count} 个产业带</p>
                <p className="mt-3 text-sm text-brand-700 group-hover:underline">进入 →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 样板产业带精选 */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Samples"
            title="样板产业带精选"
            description="首批重点深耕产业带：出口数据透明、客单价高、卖家集中。"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sampleBelts.map((b) => (
              <BeltCard key={b.slug} belt={b} />
            ))}
          </div>
        </div>
      </section>

      {/* 模板体系 */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Templates"
            title="4 套行业特色独立站模板"
            description="每类企业的独立站采用适用该类企业特色的模板，并符合海外用户使用习惯。"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {templateList.map((t) => (
              <div key={t.key} className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-500">{t.key}</p>
                <h3 className="mt-1 text-base font-bold text-brand-900">{t.name}</h3>
                <p className="mt-1 text-xs text-ink-400">{t.audience}</p>
                <p className="mt-2 text-sm text-ink-600">{t.positioning}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {t.keySections.map((s) => (
                    <li key={s} className="rounded bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务介绍 */}
      <section className="bg-brand-900 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Services"
            title="从建站到履约的一站式服务"
            description="产业带垂直 SaaS + 本地代运营（路线 A），客单价 2–5 万元/年/家。"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.name} className="rounded-lg border border-white/10 bg-white/5 p-5">
                <p className="text-2xl">{s.icon}</p>
                <h3 className="mt-3 text-base font-bold">{s.name}</h3>
                <p className="mt-2 text-sm text-white/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold-500 py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-bold text-brand-950 sm:text-3xl">您的企业已在产业带地图上吗？</h2>
          <p className="mt-3 text-sm text-brand-950/80">
            认领您的企业展示位，或预约一次免费独立站诊断（已有站点可参考优化）。
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton href="/claim">认领企业 / 预约诊断</CTAButton>
            <CTAButton href="/about" variant="outline">
              了解服务
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
