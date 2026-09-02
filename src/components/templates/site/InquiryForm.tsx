"use client";
// 询盘表单（方案B 完整版）：点击「发送」后通过 Cloudflare Pages Function（/api/inquiry）自动发信，
// 不再唤起买家本地邮箱客户端。收件人由服务器按企业 slug 路由：
// - 企业有已核验邮箱（src/data/verified-emails.ts）→ 询盘直达该企业销售邮箱；
// - 否则 → 发送至默认兜底收件人（晋跨通平台客服邮箱，人工对接转发）。
// 邮件附带询盘来源（https://jinkuatong.pages.dev/）；reply-to 为买家邮箱，企业可直接回复。
// 自动发送失败时显示兜底引导（mailto 到目标收件邮箱），避免询盘静默丢失。
// 说明：文案随独立站语言（lang）切换，语言相关文案见 src/i18n/site.ts。
import { useState } from "react";
import type { Company } from "@/data/companies";
import { pick } from "@/data/site-content";
import {
  FALLBACK_INQUIRY_EMAIL,
  VERIFIED_COMPANY_EMAILS,
} from "@/data/verified-emails";
import { siteI18n } from "@/i18n/site";
import type { SiteLang } from "@/i18n/site";

interface InquiryFormProps {
  company: Company;
  lang: SiteLang;
}

/**
 * 询盘目标收件邮箱（与服务器路由口径一致，供联系区展示与失败兜底）：
 * - 企业已有「已核验邮箱」（VERIFIED_COMPANY_EMAILS）→ 该企业销售邮箱；
 * - 暂无已核验邮箱 → 默认兜底收件人（晋跨通平台客服邮箱，人工对接转发）。
 */
export function getInquiryEmail(company: Company): string {
  return VERIFIED_COMPANY_EMAILS[company.slug] ?? FALLBACK_INQUIRY_EMAIL;
}

export function InquiryForm({ company, lang }: InquiryFormProps) {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sendFailed, setSendFailed] = useState(false);
  const t = (x: (typeof siteI18n.form)[keyof typeof siteI18n.form]) => pick(x, lang);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError("");
      setSendFailed(false);
    };
  }

  /** 提交询盘：POST /api/inquiry 由 Pages Function 自动发信（收件人服务器路由） */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending || sent) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t(siteI18n.form.errorRequired));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(t(siteI18n.form.errorEmail));
      return;
    }
    setError("");
    setSendFailed(false);
    setSending(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: company.slug,
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          companyName: company.name,
          companyLocation: company.location,
          message: form.message.trim(),
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (res.ok && data?.ok) {
        setSent(true);
        return;
      }
      // 服务端未配置/发送失败：给出 mailto 兜底，不让询盘静默丢失
      setSendFailed(true);
    } catch {
      setSendFailed(true);
    } finally {
      setSending(false);
    }
  }

  const inputCls =
    "w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiry-name" className="mb-1 block text-xs font-semibold text-slate-600">
            {t(siteI18n.form.name)}
          </label>
          <input
            id="inquiry-name"
            className={inputCls}
            value={form.name}
            onChange={update("name")}
            placeholder={t(siteI18n.form.namePlaceholder)}
          />
        </div>
        <div>
          <label htmlFor="inquiry-email" className="mb-1 block text-xs font-semibold text-slate-600">
            {t(siteI18n.form.email)}
          </label>
          <input
            id="inquiry-email"
            type="email"
            className={inputCls}
            value={form.email}
            onChange={update("email")}
            placeholder={t(siteI18n.form.emailPlaceholder)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="inquiry-company" className="mb-1 block text-xs font-semibold text-slate-600">
          {t(siteI18n.form.company)}
        </label>
        <input
          id="inquiry-company"
          className={inputCls}
          value={form.company}
          onChange={update("company")}
          placeholder={t(siteI18n.form.companyPlaceholder)}
        />
      </div>
      <div>
        <label htmlFor="inquiry-message" className="mb-1 block text-xs font-semibold text-slate-600">
          {t(siteI18n.form.message)}
        </label>
        <textarea
          id="inquiry-message"
          rows={4}
          className={inputCls}
          value={form.message}
          onChange={update("message")}
          placeholder={t(siteI18n.form.messagePlaceholder)}
        />
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      {sendFailed ? (
        <p className="rounded bg-red-50 px-3 py-2 text-xs text-red-700">
          {t(siteI18n.form.errorSend)}{" "}
          <a href={`mailto:${getInquiryEmail(company)}`} className="underline">
            {getInquiryEmail(company)}
          </a>
        </p>
      ) : null}
      {sent ? (
        <p className="rounded bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{t(siteI18n.form.success)}</p>
      ) : (
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? t(siteI18n.form.sending) : t(siteI18n.form.send)}
        </button>
      )}
    </form>
  );
}
