// 服务条款（需求 §4.4 合规 / todo E2）：静态合规页
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务条款",
  description: "晋跨通服务条款：服务范围、信息准确性、知识产权与责任说明。",
};

/** 条款章节：标题 + 内容 */
const sections = [
  {
    title: "1. 服务范围",
    paragraphs: [
      "晋跨通（JinKuaTong）面向山西产业带中小外贸企业提供：独立站建站（4 套行业特色模板）、出海渠道地图展示、出海合规咨询、海外仓对接与本地代运营等一站式出海服务。",
    ],
  },
  {
    title: "2. 渠道地图信息说明",
    paragraphs: [
      "企业出海渠道地图收录的信息来源于公开渠道（企业官网、B2B 平台、政府公开数据、行业榜单等）。我们尽力保证信息准确，但不对第三方链接的持续可用性与内容负责。",
      "信息标注状态说明：『已核验』表示经人工确认；『待认领』表示信息尚未核验，欢迎相关企业认领以完善。若您发现信息有误，可通过认领/纠错表单或邮件联系我们更正。",
    ],
  },
  {
    title: "3. 知识产权",
    paragraphs: [
      "本站的文案、界面设计与 4 套行业模板的著作权归晋跨通所有（署名权按法律法规规定）。页面展示的企业名称、商标与图片归各企业所有。",
    ],
  },
  {
    title: "4. 责任限制",
    paragraphs: [
      "本站信息仅供参考，不构成任何商业承诺。因使用本站信息或第三方链接产生的直接或间接损失，晋跨通不承担相应责任。",
    ],
  },
  {
    title: "5. 条款变更",
    paragraphs: [
      "我们可能适时更新本条款，更新后将在本页面公布。继续使用本站即视为接受更新后的条款。",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold text-brand-900">服务条款</h1>
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
          如有疑问请联系：<a href="mailto:hewei.419763673@gmail.com" className="text-brand-700 hover:underline">hewei.419763673@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
