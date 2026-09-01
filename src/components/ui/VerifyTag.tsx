// 验证状态标签：已核验 / 待认领
import type { VerifyStatus } from "@/data/companies";

export function VerifyTag({ status }: { status: VerifyStatus }) {
  const isVerified = status === "verified";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${
        isVerified ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${isVerified ? "bg-emerald-500" : "bg-amber-500"}`}
      />
      {isVerified ? "已核验" : "待认领"}
    </span>
  );
}
