"use client";

// 筛选栏：通用客户端筛选组件（企业地图/产业带页复用）
interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  /** 选项列表 */
  options: FilterOption[];
  /** 当前选中值 */
  value: string;
  /** 变更回调 */
  onChange: (value: string) => void;
  /** 全部选项的文案，默认 "全部" */
  allLabel?: string;
}

export function FilterBar({ options, value, onChange, allLabel = "全部" }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-brand-800 bg-brand-800 text-white"
                : "border-slate-200 bg-white text-ink-600 hover:border-brand-800/40"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
      <span className="sr-only">{allLabel}</span>
    </div>
  );
}
