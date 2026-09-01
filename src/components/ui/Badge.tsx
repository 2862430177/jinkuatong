// 渠道标签（需求文档 §7.4）：企业官网 / 英文站 / 跨境独立站 / B2B 平台店铺
import type { ChannelType } from "@/data/companies";

const channelStyles: Record<ChannelType, string> = {
  official: "bg-slate-100 text-slate-700 border-slate-200",
  english: "bg-brand-100 text-brand-800 border-brand-700/20",
  "cross-border": "bg-gold-100 text-gold-600 border-gold-500/30",
  "b2b-platform": "bg-sky-50 text-sky-700 border-sky-200",
};

export function Badge({ type, label }: { type: ChannelType; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${channelStyles[type]}`}
    >
      {label}
    </span>
  );
}
