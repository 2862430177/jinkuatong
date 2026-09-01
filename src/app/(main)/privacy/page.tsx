// 隐私政策（需求 §4.4 合规 / todo E2）：静态合规页
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "晋跨通隐私政策：我们如何收集、使用与保护您的个人信息（GDPR/Cookie 合规说明）。",
};

/** 章节数据：标题 + 内容段落 */
const sections = [
  {
    title: "1. 我们收集哪些信息",
    paragraphs: [
      "您主动提交的信息：通过认领/联系表单填写的企业名称、联系人、联系方式、所属产业带、现有网站等；通过邮件与我们联系时的邮箱与邮件内容。",
      "自动收集的统计信息：经 Cloudflare Web Analytics 收集的匿名访问统计（页面浏览、来源、设备等，不包含个人身份信息）。",
    ],
  },
  {
    title: "2. Cookie 的使用",
    paragraphs: [
      "本站使用 Cookie 保存您的隐私选择（是否接受统计 Cookie），以及由 Cloudflare 提供的基础 CDN/安全功能所需的必要 Cookie。",
      "您可通过页脚的 Cookie 横幅随时修改选择；拒绝统计 Cookie 不影响站点核心功能。",
    ],
  },
  {
    title: "3. 信息的使用",
    paragraphs: [
      "用于跟进您的认领/合作/建站咨询，核验企业渠道信息，以及改进我们的服务与内容。",
      "我们不会向第三方出售您的个人信息；仅在为您提供服务所必需时（如表单服务商）共享必要字段。",
    ],
  },
  {
    title: "4. 信息的保护",
    paragraphs: [
      "全站启用 HTTPS 加密传输；我们仅保存为达成上述目的所必需的最短期限的信息，并采取合理的安全措施防止未授权访问。",
    ],
  },
  {
    title: "5. 您的权利",
    paragraphs: [
      "您有权查询、更正或删除我们持有的您的个人信息。如需行使上述权利，请发送邮件至 hello@jinkuatong.com，我们将在 15 个工作日内处理。",
    ],
  },
  {
    title: "6. 政策更新",
    paragraphs: [
      "本政策可能随业务与法规变化更新，更新后将在本页面公布并标注生效日期。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold text-brand-900">隐私政策</h1>
      <p className="mt-2 text-sm text-ink-400">生效日期：2026-08-31 · 最后更新：2026-08-31</p>
      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-semibold text-brand-800">{s.title}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-3 text-sm leading-relaxed text-ink-600">
                {p}
              </p>
            ))}
          </section>
        ))}
        <p className="border-t border-slate-200 pt-6 text-sm text-ink-400">
          联系方式：<a href="mailto:hello@jinkuatong.com" className="text-brand-700 hover:underline">hello@jinkuatong.com</a> · 山西·太原
        </p>
      </div>
    </div>
  );
}
