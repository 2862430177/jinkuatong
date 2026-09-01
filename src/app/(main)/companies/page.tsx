"use client";

// 企业渠道地图（需求文档 §5.4 / todo C1、C3）：
// - 分类筛选（四大类）+ 渠道标签筛选（官网/英文站/跨境站/B2B 平台/待认领）
// - 关键词搜索（企业名 / 区位 / 简介 / 产业带名）
import { useMemo, useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FilterBar } from "@/components/ui/FilterBar";
import { CompanyCard } from "@/components/CompanyCard";
import { companies, channelTypeNames, type ChannelType } from "@/data/companies";
import { categoryNames } from "@/data/templates";
import { getBeltBySlug } from "@/data/industrial-belts";
import { pendingCount } from "@/data/integration";

/** 分类筛选选项：全部 + 四大类 */
const categoryOptions = [
  { value: "all", label: "全部" },
  ...(Object.entries(categoryNames) as [string, string][]).map(([value, label]) => ({ value, label })),
];

/** 渠道标签筛选选项：全部渠道 + 四级渠道 + 未验证待认领 */
const channelOptions = [
  { value: "all", label: "全部渠道" },
  ...(Object.entries(channelTypeNames) as [ChannelType, string][]).map(([value, label]) => ({ value, label })),
  { value: "pending", label: "未验证·待认领" },
];

export default function CompaniesPage() {
  const [category, setCategory] = useState("all");
  const [channel, setChannel] = useState("all");
  const [keyword, setKeyword] = useState("");

  /** 组合过滤：分类 AND 渠道 AND 关键词 */
  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return companies.filter((c) => {
      // 1. 分类过滤（按所属产业带类别）
      if (category !== "all" && getBeltBySlug(c.beltSlug)?.category !== category) return false;
      // 2. 渠道标签过滤
      if (channel !== "all") {
        if (channel === "pending") {
          if (c.verifyStatus !== "pending") return false;
        } else if (!c.channels.some((ch) => ch.type === channel)) {
          return false;
        }
      }
      // 3. 关键词搜索：企业名 / 区位 / 简介 / 产业带名
      if (kw) {
        const haystack = [c.name, c.location, c.intro, getBeltBySlug(c.beltSlug)?.name ?? ""]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(kw)) return false;
      }
      return true;
    });
  }, [category, channel, keyword]);

  const verifiedCount = companies.filter((c) => c.verifyStatus === "verified").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionTitle
        eyebrow="Channel Map"
        title="企业出海渠道地图"
        description={`已收录 4 大类 × 每类 Top50 共 ${companies.length} 家产业带企业（2026-09-02 规模化集成），已核验 ${verifiedCount} 家，其余为待核验/待认领占位，点击卡片可查看对应行业模板的独立站效果。更多真实名录见「企业名录」页（待集成池，共 ${pendingCount} 家待集成）。`}
        as="h1"
      />
      {/* 关键词搜索（todo C3） */}
      <div className="mb-5 flex justify-center">
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索企业名称 / 产品 / 地区…"
          aria-label="搜索企业"
          className="w-full max-w-md rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-700"
        />
      </div>
      {/* 分类 + 渠道标签筛选（todo C1） */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <FilterBar options={categoryOptions} value={category} onChange={setCategory} />
        <FilterBar options={channelOptions} value={channel} onChange={setChannel} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-400">
          没有符合筛选条件的企业，可调整筛选或
          <a href="/claim" className="mx-1 text-brand-700 hover:underline">
            认领
          </a>
          提前展示您的企业。
        </p>
      ) : null}
    </div>
  );
}
