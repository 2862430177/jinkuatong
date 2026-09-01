// 企业卡片：企业名、区位、渠道标签、验证状态 + 独立站效果（新窗口）入口
// todo C2：待认领（pending）企业以虚线边框 + "认领此企业"引导呈现，作为销售线索库入口。
import Link from "next/link";
import type { Company } from "@/data/companies";
import { getBeltBySlug } from "@/data/industrial-belts";
import { Badge } from "./ui/Badge";
import { VerifyTag } from "./ui/VerifyTag";

export function CompanyCard({ company }: { company: Company }) {
  const belt = getBeltBySlug(company.beltSlug);
  const isPending = company.verifyStatus === "pending";

  return (
    <div
      className={`group flex h-full flex-col rounded-lg border bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
        isPending ? "border-dashed border-amber-300" : "border-slate-200"
      }`}
    >
      {/* 卡片主体：点击进入企业详情 */}
      <Link href={`/companies/${company.slug}`} className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-brand-900 group-hover:text-brand-700">{company.name}</h3>
          <VerifyTag status={company.verifyStatus} />
        </div>
        <p className="mt-1 text-xs text-ink-400">{belt ? `${belt.name} · ${company.location}` : company.location}</p>
        <p className="mt-2 line-clamp-2 text-sm text-ink-600">{company.intro}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {company.channels.length > 0 ? (
            company.channels.map((ch) => <Badge key={ch.label} type={ch.type} label={ch.label} />)
          ) : (
            <span className="text-xs text-amber-600">暂无核验渠道 · 待认领</span>
          )}
        </div>
      </Link>
      {/* 底部操作区：认领引导（仅 pending）+ 渠道地图 + 独立站效果（新窗口） */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
        {isPending ? (
          <Link
            href={`/claim?company=${encodeURIComponent(company.name)}`}
            className="rounded border border-amber-400 bg-amber-50 px-2 py-1 font-medium text-amber-700 transition-colors hover:border-amber-500 hover:bg-amber-100"
          >
            认领此企业
          </Link>
        ) : (
          <Link href={`/companies/${company.slug}`} className="text-ink-400 transition-colors hover:text-brand-700">
            查看渠道地图
          </Link>
        )}
        <a
          href={`/companies/${company.slug}/site`}
          target="_blank"
          rel="noopener noreferrer"
          title="在新窗口查看该企业按所属行业模板生成的独立站效果"
          className="inline-flex items-center gap-1 rounded border border-brand-200 bg-brand-50 px-2 py-1 font-medium text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-100"
        >
          独立站效果 ↗
        </a>
      </div>
    </div>
  );
}
