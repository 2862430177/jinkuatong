"use client";
// 询盘表单（真实可交互）：静态站无后端，提交时通过 mailto 唤起邮箱客户端，并给出成功提示。
// 收件人路由（方案B）：企业已核验邮箱 → 否则默认兜底邮箱；邮件正文附带询盘来源。
// 说明：文案随独立站语言（lang）切换，语言相关文案见 src/i18n/site.ts。
import { useState } from "react";
import type { Company } from "@/data/companies";
import { pick } from "@/data/site-content";
import {
  FALLBACK_INQUIRY_EMAIL,
  INQUIRY_SOURCE_URL,
  VERIFIED_COMPANY_EMAILS,
} from "@/data/verified-emails";
import { siteI18n } from "@/i18n/site";
import type { SiteLang } from "@/i18n/site";

interface InquiryFormProps {
  company: Company;
  lang: SiteLang;
}

/**
 * 询盘接收邮箱（方案B 收件人路由）：
 * - 企业已有「已核验邮箱」（VERIFIED_COMPANY_EMAILS）→ 询盘直接发送至该公司销售邮箱；
 * - 暂无已核验邮箱 → 发送至默认兜底收件人（晋跨通平台客服邮箱，人工对接转发）。
 */
export function getInquiryEmail(company: Company): string {
  return VERIFIED_COMPANY_EMAILS[company.slug] ?? FALLBACK_INQUIRY_EMAIL;
}

export function InquiryForm({ company, lang }: InquiryFormProps) {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const t = (x: (typeof siteI18n.form)[keyof typeof siteI18n.form]) => pick(x, lang);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError("");
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t(siteI18n.form.errorRequired));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(t(siteI18n.form.errorEmail));
      return;
    }
    // 静态站无后端：将询盘内容拼入 mailto，唤起客户邮箱客户端发送
    // 收件人为 getInquiryEmail 的路由结果；正文附带询盘来源与企业信息，便于识别线索渠道与归属企业
    const subject = encodeURIComponent(
      `Inquiry from ${form.name.trim()}${form.company.trim() ? ` (${form.company.trim()})` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        `Company: ${form.company.trim()}`,
        "",
        `Message:\n${form.message.trim()}`,
        "",
        `--`,
        `Inquiry source: ${INQUIRY_SOURCE_URL}`,
        `Company profile: ${company.name} · ${company.location}`,
      ].join("\n"),
    );
    window.location.href = `mailto:${getInquiryEmail(company)}?subject=${subject}&body=${body}`;
    setSent(true);
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
      {sent ? (
        <p className="rounded bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{t(siteI18n.form.success)}</p>
      ) : (
        <button
          type="submit"
          className="w-full rounded bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          {t(siteI18n.form.send)}
        </button>
      )}
    </form>
  );
}
