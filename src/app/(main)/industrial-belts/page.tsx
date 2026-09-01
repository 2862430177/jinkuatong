"use client";

// 产业带总览（需求文档 §5.2）：分类过滤 + 产业带卡片
import { useMemo, useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FilterBar } from "@/components/ui/FilterBar";
import { BeltCard } from "@/components/BeltCard";
import { industrialBelts } from "@/data/industrial-belts";
import { categoryNames } from "@/data/templates";

const filterOptions = [
  { value: "all", label: "全部" },
  ...(Object.entries(categoryNames) as [string, string][]).map(([value, label]) => ({ value, label })),
];

export default function IndustrialBeltsPage() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () => (category === "all" ? industrialBelts : industrialBelts.filter((b) => b.category === category)),
    [category],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionTitle
        eyebrow="Industrial Belts"
        title="山西产业带总览"
        description="四大类产业带：传统制造与工业品 / 特色农副与食品 / 新材料·新能源·电子 / 文化工艺品。"
        as="h1"
      />
      <div className="mb-8 flex justify-center">
        <FilterBar options={filterOptions} value={category} onChange={setCategory} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((belt) => (
          <BeltCard key={belt.slug} belt={belt} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-400">该分类暂无产业带数据。</p>
      ) : null}
    </div>
  );
}
