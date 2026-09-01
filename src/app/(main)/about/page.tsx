// 关于晋跨通（需求文档 §5.6）：服务范围、合作方式
import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTAButton } from "@/components/ui/CTAButton";
import { templateList } from "@/data/templates";

export const metadata: Metadata = {
  title: "关于我们",
  description: "晋跨通：面向山西产业带中小外贸企业的一站式出海服务商。",
};

const services = [
  {
    name: "独立站建站",
    items: ["4 套行业特色模板（T1–T4）", "符合海外用户使用习惯", "已有独立站可参考优化", "中英双语预留"],
  },
  {
    name: "出海合规",
    items: ["本地报关行对接", "目标市场税务/合规支持", "GDPR/Cookie 合规配置"],
  },
  {
    name: "海外仓与物流",
    items: ["18 个海外仓资源", "多国履约支持", "本地清关资源"],
  },
  {
    name: "本地代运营",
    items: ["小步快跑落地", "询盘管理与跟进", "园区/协会资源绑定"],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="About"
        title="关于晋跨通"
        description="晋商跨海，通达全球。我们深耕山西产业带，把「工厂」变成「品牌」，把「产品」卖向「全球」。"
        as="h1"
      />

      {/* 服务范围 */}
      <section className="grid gap-5 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.name} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-brand-900">{s.name}</h3>
            <ul className="mt-3 space-y-2">
              {s.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink-600">
                  <span className="text-gold-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 模板体系 */}
      <section className="mt-16">
        <h2 className="mb-6 text-center text-xl font-bold text-brand-900">我们的 4 套行业模板</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {templateList.map((t) => (
            <div key={t.key} className="rounded-lg bg-brand-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-500">{t.key}</p>
              <h3 className="mt-1 font-bold text-brand-900">{t.name}</h3>
              <p className="mt-2 text-sm text-ink-600">{t.positioning}</p>
              <p className="mt-1 text-xs text-ink-400">{t.audience}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 合作方式 */}
      <section className="mt-16 rounded-lg bg-brand-900 p-8 text-white">
        <h2 className="text-xl font-bold">合作方式</h2>
        <ul className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
          <li>
            <p className="font-semibold text-gold-400">园区 / 协会</p>
            <p className="mt-1 text-white/70">三大综试区产业园、产业带协会共建出海服务。</p>
          </li>
          <li>
            <p className="font-semibold text-gold-400">本地服务商</p>
            <p className="mt-1 text-white/70">报关行、海外仓、代运营伙伴生态共建。</p>
          </li>
          <li>
            <p className="font-semibold text-gold-400">企业主</p>
            <p className="mt-1 text-white/70">直接认领企业展示位或预约独立站诊断。</p>
          </li>
        </ul>
        <div className="mt-8">
          <CTAButton href="/claim">立即联系合作</CTAButton>
        </div>
      </section>
    </div>
  );
}
