"use client";

// 企业名录池 / 待集成池（todo B1 批量接入，2026-09-02）：
// - 展示公开渠道（名录集）抓取的山西企业真实名录：跨境/进出口 50 家 + 产业带未归类 220 家 = 270 家。
// - 口径说明：工商注册真实企业名，非海关备案口径；数据可靠性需人工复核。
// - 定位：对应"全省备案企业 1963 家 - 已集成 200 家"的待集成池。认领流程复用 /claim 表单；
//   官方备案名录到位后追加条目。
import { useMemo, useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FilterBar } from "@/components/ui/FilterBar";
import { registryEntries, type RegistryEntry } from "@/data/registry";

/** 按来源分类筛选 */
const sourceOptions = [
  { value: "all", label: "全部来源" },
  ...Array.from(new Set(registryEntries.map((e) => e.source))).map((s) => ({ value: s, label: s })),
];

export default function RegistryPage() {
  const [source, setSource] = useState("all");
  const [keyword, setKeyword] = useState("");

  /** 组合过滤：来源 AND 关键词（企业名 / 区位 / 联系人） */
  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return registryEntries.filter((e) => {
      if (source !== "all" && e.source !== source) return false;
      if (kw) {
        const haystack = [e.name, e.region, e.contact ?? ""].join(" ").toLowerCase();
        if (!haystack.includes(kw)) return false;
      }
      return true;
    });
  }, [source, keyword]);

  /** 按区位分组统计，用于头部概览 */
  const cityCount = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of registryEntries) {
      const city = e.region.split("·")[0];
      map.set(city, (map.get(city) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionTitle
        eyebrow="Company Registry"
        title="待集成企业名录池"
        description={`公开渠道已抓取 ${registryEntries.length} 家山西企业真实名录（2026-09-02，含跨境/进出口 50 家 + 产业带未归类 220 家），对应全省备案企业 1963 家中"已集成 200 家"之外的待集成池。此名录非海关备案口径，数据可靠性需人工复核；认领您的企业请使用「认领企业」入口。`}
        as="h1"
      />

      {/* 城市分布概览 */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {cityCount.map(([city, count]) => (
          <span
            key={city}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-ink-600"
          >
            {city} {count}
          </span>
        ))}
      </div>

      {/* 关键词搜索 */}
      <div className="mb-5 flex justify-center">
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索企业名称 / 地区 / 联系人…"
          aria-label="搜索名录企业"
          className="w-full max-w-md rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-700"
        />
      </div>
      {/* 来源筛选 */}
      <div className="mb-8 flex justify-center">
        <FilterBar options={sourceOptions} value={source} onChange={setSource} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((entry) => (
          <RegistryCard key={entry.id} entry={entry} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-400">没有符合筛选条件的名录企业。</p>
      ) : null}
    </div>
  );
}

/** 名录企业卡片：名称 / 区位 / 联系人 / 来源 + 认领入口 */
function RegistryCard({ entry }: { entry: RegistryEntry }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md">
      <h2 className="text-sm font-semibold text-ink-900">{entry.name}</h2>
      <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
        <span className="rounded bg-slate-100 px-2 py-0.5 text-ink-600">{entry.region}</span>
        <span className="rounded bg-gold-50 px-2 py-0.5 text-gold-700">{entry.source}</span>
      </div>
      {entry.contact ? (
        <p className="mt-2 text-xs text-ink-400">联系人：{entry.contact}</p>
      ) : null}
      <div className="mt-3 border-t border-slate-100 pt-3">
        <a
          href={`/claim?company=${encodeURIComponent(entry.name)}`}
          className="inline-flex items-center text-xs font-medium text-brand-700 hover:text-brand-800 hover:underline"
        >
          认领这家企业 →
        </a>
      </div>
    </div>
  );
}
