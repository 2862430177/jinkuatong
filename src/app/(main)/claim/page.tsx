"use client";

// 企业认领 / 联系表单（需求文档 §6.2 人工闭环 / todo C5）
// - 配置了 NEXT_PUBLIC_FORM_ENDPOINT（如 Formspree）→ 直接 POST 提交
// - 未配置 → 以 mailto 唤起邮件客户端作为保底方案
// - 支持 ?company= 参数预填企业名称（todo C2：占位卡"认领此企业"入口）
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

const CONTACT_EMAIL = "hello@jinkuatong.com";

/** 认领/建站人工客服手机号（微信同号）：用户不便在线提交表单时可电话联系 */
const CONTACT_PHONE = "17611535739";

/** 第三方表单服务 endpoint（Formspree 等）；未配置时走 mailto 保底 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

/** 表单字段定义 */
const fields = [
  { name: "company", label: "企业名称", required: true, placeholder: "如：XX玻璃有限公司" },
  { name: "contact", label: "联系人", required: true, placeholder: "您的姓名" },
  { name: "phone", label: "电话 / 微信", required: false, placeholder: "便于我们与您联系" },
  { name: "belt", label: "所属产业带", required: false, placeholder: "如：祁县玻璃器皿" },
  { name: "website", label: "现有独立站（如有）", required: false, placeholder: "https://…（可选，我们会参考优化）" },
];

const needs = [
  { value: "claim", label: "认领企业展示位" },
  { value: "build", label: "预约独立站建站" },
  { value: "optimize", label: "已有站点优化诊断" },
  { value: "cooperate", label: "园区/协会/服务商合作" },
];

type SubmitStatus = "idle" | "success" | "error";

export default function ClaimPage() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [presetCompany, setPresetCompany] = useState("");

  useEffect(() => {
    // 从 URL ?company= 读取待认领企业名（占位卡"认领此企业"入口预填）
    const name = new URLSearchParams(window.location.search).get("company");
    if (name) setPresetCompany(name);
  }, []);

  /** 提交：优先 POST 第三方表单服务，未配置时 mailto 保底 */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (FORM_ENDPOINT) {
      // 第三方表单服务（如 Formspree）：直接 POST，无需后端
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        setStatus(res.ok ? "success" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    // 保底方案：拼接 mailto 唤起邮件客户端
    const parts: string[] = [];
    for (const field of fields) {
      const value = (data.get(field.name) as string | null)?.trim();
      if (value) parts.push(`${field.label}：${value}`);
    }
    const need = (data.get("need") as string | null) ?? "";
    if (need) parts.push(`需求：${need}`);
    const message = (data.get("message") as string | null)?.trim();
    if (message) parts.push(`补充说明：${message}`);

    const subject = encodeURIComponent(`【认领/合作】${data.get("company") ?? "企业"}`);
    const body = encodeURIComponent(parts.join("\n"));
    // 先渲染成功提示，再延迟唤起邮件客户端（mailto 导航会阻塞后续 JS 执行）
    setStatus("success");
    window.setTimeout(() => {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    }, 120);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Claim"
        title="企业认领 / 联系我们"
        description="认领您的企业展示位，或预约独立站建站与优化诊断。提交后我们将人工跟进核验。"
        as="h1"
      />

      {/* 人工客服联系方式：用户不想在线提交表单时可电话/微信直接联系 */}
      <div className="mb-6 rounded-lg border border-brand-100 bg-brand-50/70 px-4 py-3 text-center text-sm text-ink-600">
        如您不想在线提交认领，可直接电话 / 微信联系：
        <a href={`tel:${CONTACT_PHONE}`} className="ml-1 font-semibold text-brand-700 hover:underline">
          {CONTACT_PHONE}
        </a>
      </div>

      {status === "success" ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-8 text-center">
          <p className="text-lg font-semibold text-emerald-700">提交成功</p>
          <p className="mt-2 text-sm text-emerald-600">
            {FORM_ENDPOINT
              ? "已收到您的信息，我们将在 1–2 个工作日内与您联系。"
              : "已唤起您的邮件客户端，如未弹出请直接发送邮件至 " + CONTACT_EMAIL + "。"}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-ink-900">
                {f.label}
                {f.required ? <span className="ml-0.5 text-red-500">*</span> : null}
              </label>
              {f.name === "company" ? (
                // 企业名称字段：支持 URL 参数预填（受控）
                <input
                  id={f.name}
                  name={f.name}
                  type="text"
                  required={f.required}
                  placeholder={f.placeholder}
                  value={presetCompany}
                  onChange={(e) => setPresetCompany(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-700"
                />
              ) : (
                <input
                  id={f.name}
                  name={f.name}
                  type="text"
                  required={f.required}
                  placeholder={f.placeholder}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-700"
                />
              )}
            </div>
          ))}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900">需求类型</label>
            <div className="flex flex-wrap gap-2">
              {needs.map((n) => (
                <label key={n.value} className="flex cursor-pointer items-center gap-2 rounded border border-slate-200 px-3 py-1.5 text-sm hover:border-brand-700/40">
                  <input type="radio" name="need" value={n.value} defaultChecked={n.value === "claim"} className="accent-brand-700" />
                  {n.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-900">
              补充说明
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="如有更多信息（现有网站、出口国家等）请补充…"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-700"
            />
          </div>

          {status === "error" ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-600">
              提交失败，请稍后重试；或直接邮件联系 {CONTACT_EMAIL}。
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-gold-400"
          >
            {FORM_ENDPOINT ? "提交" : "提交（唤起邮件）"}
          </button>
          <div className="text-center text-xs text-ink-400">
            <p>
              也可直接邮件联系：
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-700 hover:underline">{CONTACT_EMAIL}</a>
            </p>
            <p className="mt-1">
              或电话 / 微信联系：
              <a href={`tel:${CONTACT_PHONE}`} className="font-semibold text-brand-700 hover:underline">{CONTACT_PHONE}</a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
