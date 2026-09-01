// 产业带卡片：名称、区位、代表产品、企业数、综试区归属
import Link from "next/link";
import type { IndustrialBelt } from "@/data/industrial-belts";
import { categoryNames } from "@/data/templates";
import { getCompaniesByBelt } from "@/data/companies";

export function BeltCard({ belt }: { belt: IndustrialBelt }) {
  const companyCount = getCompaniesByBelt(belt.slug).length;
  return (
    <Link
      href={`/industrial-belts/${belt.slug}`}
      className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-brand-900 group-hover:text-brand-700">{belt.name}</h3>
        <span className="shrink-0 rounded bg-brand-50 px-1.5 py-0.5 text-xs text-brand-800">{categoryNames[belt.category]}</span>
      </div>
      <p className="mt-1 text-xs text-ink-400">{belt.region}</p>
      <p className="mt-2 line-clamp-2 text-sm text-ink-600">{belt.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {belt.products.slice(0, 3).map((p) => (
          <span key={p} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
            {p}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs text-ink-400">
        <span>{belt.zone ? `${belt.zone}综试区` : "综试区待定"}</span>
        <span>·</span>
        <span>企业 {companyCount} 家</span>
        <span className="ml-auto text-brand-700 transition-transform group-hover:translate-x-1">查看 →</span>
      </div>
    </Link>
  );
}
