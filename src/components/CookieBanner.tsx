"use client";

// Cookie 合规横幅（需求 §4.4 / todo E2）：
// 首次访问底部展示，用户选择"接受全部 / 仅必要"后写入 localStorage，后续不再展示。
// 静态站无后端，仅记录选择；Web Analytics 埋点（F5）可在接受后由 Cloudflare 侧控制。
import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "jkt-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 仅在客户端读取 localStorage，避免 SSR 与客户端不一致
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  /** 记录选择并收起横幅 */
  function decide(choice: "accepted" | "declined") {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-600">
          我们使用 Cookie 以改善浏览体验与统计站点访问情况（GDPR 合规）。详见
          <Link href="/privacy" className="text-brand-700 hover:underline">
            隐私政策
          </Link>
          。
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="rounded-md border border-slate-300 px-4 py-1.5 text-sm text-ink-600 transition-colors hover:border-slate-400"
          >
            仅必要
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-md bg-gold-500 px-4 py-1.5 text-sm font-semibold text-brand-950 transition-colors hover:bg-gold-400"
          >
            接受全部
          </button>
        </div>
      </div>
    </div>
  );
}
