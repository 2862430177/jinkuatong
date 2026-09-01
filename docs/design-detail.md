# 晋跨通（JinKuaTong）第一版详细设计文档（MVP）

> 配套文档：《晋跨通第一版需求文档 v0.1》《晋跨通第一版功能 TodoList v0.2》《晋跨通市场调研报告 v0.1》
>
> 本文档基于当前工程实现（阶段一 + 阶段二可落地功能）编写，是对架构与实现细节的落地说明。

| 项目 | 内容 |
| --- | --- |
| 文档版本 | v0.2 |
| 编制日期 | 2026-08-31（v0.2 更新） |
| 技术栈 | Next.js 15（App Router）+ TypeScript（strict）+ Tailwind CSS v4 |
| 部署方案 | 静态导出（`output:'export'`）→ Cloudflare Pages |
| 文档状态 | 待评审 |

> **v0.2 更新说明**：新增 §14 功能实现明细（v0.2 落地项）——企业地图渠道筛选与搜索、待认领占位卡、结构化数据、Cookie 合规与隐私/条款页、页面级 metadata、表单服务配置化、数据校验与链接巡检脚本、社媒入口、Web Analytics 埋点与安全头；目录结构与组件层同步更新。

---

## 1. 系统概述

### 1.1 定位

晋跨通（JinKuaTong）：**让山西制造，一站卖全球**。面向山西产业带中小外贸企业，以"品牌官网 + 产业带出海渠道地图 + 4 套行业特色独立站模板"作为第一版获客漏斗入口。

### 1.2 第一版目标（对应需求 §1.2）

1. 品牌官网：讲清"我们是谁、帮谁、做什么"；
2. 产业带出海渠道地图：四大类产业带每类 Top10 企业（约 40 家），收录海外渠道并标注验证状态；
3. 4 套行业特色模板（T1–T4）：按企业类别差异化，符合海外用户使用习惯；
4. 已有独立站企业：参考现有站点做进一步优化（保留品牌资产、改进转化短板）；
5. "待认领"占位卡作为销售线索库；
6. Cloudflare Pages 低成本全球部署。

### 1.3 设计原则

- **单一职责**：数据 / 组件 / 页面分层，每个文件只做一件事；
- **数据驱动**：页面内容由 `src/data/*.ts` 驱动，改数据即改站点；
- **静态优先**：一切功能在静态导出约束下实现（客户端交互仅用 useState/useMemo）；
- **纯净轻量**：不引入重型 UI 库，自研轻量组件。

---

## 2. 总体架构

### 2.1 架构视图

```
┌────────────────────────────────────────────────────────┐
│                       数据层（静态）                      │
│   src/data/templates.ts       模板元信息（T1–T4）         │
│   src/data/industrial-belts.ts 产业带数据（14 个）        │
│   src/data/companies.ts       企业数据（8 家骨架 → 40 家）│
└──────────────────────────┬─────────────────────────────┘
                           │ 构建期导入（模块直接引用）
┌──────────────────────────▼─────────────────────────────┐
│                      路由层（App Router）                │
│   page.tsx / industrial-belts/[slug] / companies/[slug] │
│   about / claim / not-found / sitemap / robots          │
│   generateStaticParams 全量生成静态页面                    │
└──────────────────────────┬─────────────────────────────┘
                           │ 渲染
┌──────────────────────────▼─────────────────────────────┐
│                      组件层（React）                     │
│   ui/（Badge/VerifyTag/FilterBar/CTAButton/Card/…）     │
│   templates/（T1–T4 预览 + TemplatePreview 调度器）       │
│   Header/Footer/BeltCard/CompanyCard                    │
└──────────────────────────┬─────────────────────────────┘
                           │ npm run build（next build）
┌──────────────────────────▼─────────────────────────────┐
│                   部署层（Cloudflare Pages）             │
│   out/ 静态产物 + _headers/_redirects + 自定义域名        │
└────────────────────────────────────────────────────────┘
```

### 2.2 技术选型要点

| 项 | 选型 | 设计说明 |
| --- | --- | --- |
| 框架 | Next.js 15 App Router | 文件路由 + 服务端组件（默认 RSC），客户端交互局部标注 `"use client"` |
| 语言 | TypeScript strict | 数据模型全部有类型约束，改数据不易出错 |
| 样式 | Tailwind CSS v4 | `@theme` 定义品牌设计令牌（brand/gold/ink 色系） |
| 构建 | `output:'export'` + `trailingSlash` | 产物 `out/`，路径 `/xxx/index.html` 兼容性好 |
| 图片 | `images.unoptimized: true` | 静态导出下 next/image 不优化，用原生 `<img>` + 懒加载 |
| 部署 | Cloudflare Pages | 免费额度、全球 CDN、自动 HTTPS |

### 2.3 静态导出约束（开发红线）

- 动态路由必须用 `generateStaticParams` 全量生成；
- 禁用 Server Actions、middleware、rewrites/redirects（跨域跳转用 `_redirects`）；
- 环境变量仅构建期注入（`NEXT_PUBLIC_*`）；
- 客户端交互仅限 `useState` / `useMemo` / `useEffect` 等纯前端能力。

---

## 3. 目录结构

```
src/
├── app/                        # 路由层
│   ├── layout.tsx              # 根布局：metadata、viewport、结构化数据(JSON-LD)、Web Analytics 脚本
│   ├── page.tsx                # 首页（品牌落地页）
│   ├── globals.css             # Tailwind 入口 + @theme 设计令牌
│   ├── not-found.tsx           # 404
│   ├── sitemap.ts / robots.ts  # SEO 产物（构建期输出）
│   ├── (main)/                 # 主站路由组（含 Header/Footer/CookieBanner）
│   │   ├── layout.tsx          # 主站布局：Header + main + Footer + CookieBanner
│   │   ├── page.tsx            # 首页（品牌落地页）
│   │   ├── industrial-belts/
│   │   │   ├── layout.tsx      # 产业带总览 metadata（E3）
│   │   │   ├── page.tsx        # 产业带总览（客户端筛选）
│   │   │   └── [slug]/page.tsx # 产业带详情（服务端组件）
│   │   ├── companies/
│   │   │   ├── layout.tsx      # 企业地图 metadata（E3）
│   │   │   ├── page.tsx        # 企业渠道地图（分类+渠道筛选+搜索）
│   │   │   └── [slug]/page.tsx # 企业详情（服务端组件 + Product JSON-LD）
│   │   ├── about/page.tsx      # 关于
│   │   ├── claim/
│   │   │   ├── layout.tsx      # 认领页 metadata（E3）
│   │   │   └── page.tsx        # 认领表单（客户端，Formspree/mailto 双通道）
│   │   ├── privacy/page.tsx    # 隐私政策（E2）
│   │   └── terms/page.tsx      # 服务条款（E2）
│   └── (preview)/              # 独立站效果路由组（脱离平台外壳）
│       ├── layout.tsx
│       └── companies/[slug]/site/page.tsx
├── components/
│   ├── ui/                     # 基础组件（无业务依赖）
│   ├── templates/              # 4 套模板预览 + 调度器 + site/
│   ├── Header.tsx / Footer.tsx # 布局组件（Footer 含社媒入口）
│   ├── CookieBanner.tsx        # Cookie 合规弹窗（E2，use client）
│   ├── BeltCard.tsx            # 产业带卡片
│   └── CompanyCard.tsx         # 企业卡片（含待认领占位样式）
├── data/                       # 数据层（唯一数据源）
│   ├── templates.ts
│   ├── industrial-belts.ts
│   └── companies.ts            # 含 channelTypeNames（渠道中文名）
└── scripts/                    # 工具脚本（B5 / F4）
    ├── validate-data.ts        # 数据校验（构建前执行）
    └── check-links.ts          # 渠道链接存活巡检
```

---

## 4. 数据层设计

### 4.1 数据模型总览

| 文件 | 核心类型 | 数据量（当前 → 目标） | 职责 |
| --- | --- | --- | --- |
| `templates.ts` | `TemplateKey` / `TemplateMeta` | 4 套 | 模板元信息、类别映射、中文名 |
| `industrial-belts.ts` | `IndustrialBelt` | 14 → 稳定 | 产业带信息、关联企业 |
| `companies.ts` | `Company` / `CompanyChannel` | 8 → 40 | 企业信息、出海渠道、验证状态 |

### 4.2 模板数据（`src/data/templates.ts`）

```ts
type Category = "manufacturing" | "agri-food" | "new-material" | "crafts";
type TemplateKey = "t1-industrial" | "t2-agri-food" | "t3-tech-material" | "t4-craft";
type TemplateStyle = "cool" | "warm" | "modern" | "elegant"; // 差异化驱动样式变体

interface TemplateMeta {
  key: TemplateKey;
  name: string;              // 模板名
  category: Category;        // 对应企业类别
  audience: string;          // 目标人群
  positioning: string;       // 模板定位
  designSpec: string;        // 设计规范描述
  keySections: string[];     // 核心板块
  style: TemplateStyle;      // 差异化风格
  overseasHabits: string[];  // 海外使用习惯要点
}
```

关键派生数据：

- `templates: Record<TemplateKey, TemplateMeta>`：模板注册表；
- `categoryToTemplate: Record<Category, TemplateKey>`：类别 → 默认模板映射（详情页据此取模板）；
- `templateList` / `categoryNames`：遍历渲染与展示用。

### 4.3 产业带数据（`src/data/industrial-belts.ts`）

```ts
interface IndustrialBelt {
  slug: string;              // 路由标识
  name: string;              // 名称
  category: Category;        // 分类（对应 T1–T4）
  region: string;            // 区位
  summary: string;           // 一句话简介
  products: string[];        // 代表产品
  highlights: string[];      // 亮点（出口数据/产业地位）
  zone?: string;             // 所属综试区（太原/大同/运城，待核验）
  companySlugs: string[];    // 关联企业 slug
}
```

查询函数：`getBeltsByCategory(category)`、`getBeltBySlug(slug)`。

### 4.4 企业数据（`src/data/companies.ts`）

```ts
type ChannelType = "official" | "english" | "cross-border" | "b2b-platform";
type VerifyStatus = "verified" | "pending";

interface CompanyChannel {
  type: ChannelType;
  label: string;   // 如 '官网' / '英文站'
  url: string;
  note?: string;   // 核验备注
}

interface Company {
  slug: string;
  name: string;
  beltSlug: string;        // 所属产业带（外键，关联 IndustrialBelt.slug）
  template: TemplateKey;   // 渲染时切换页面风格
  location: string;
  intro: string;
  channels: CompanyChannel[];
  verifyStatus: VerifyStatus;  // 已核验 / 待认领
  claimed?: boolean;           // 是否已认领
}
```

查询函数：`getCompaniesByBelt(beltSlug)`、`getCompanyBySlug(slug)`。

### 4.5 数据约束与校验规则

| 约束 | 说明 |
| --- | --- |
| slug 唯一 | 企业、产业带各自全局唯一 |
| 外键有效 | `Company.beltSlug` 必须存在于 `industrialBelts` |
| template 合法 | `Company.template` 必须为 `TemplateKey` 之一 |
| 渠道 URL 格式 | `https?://` 开头；上线前人工核验有效性 |
| 渠道类型 | 四级标签体系（见需求 §7.4） |

> **扩展点**：后续若 Top10 口径按"细分产业带"确认，可在 `Company` 增加 `beltSub` 字段，或拆分独立数据表，不影响现有页面渲染逻辑（todo B1 决策后落地）。

---

## 5. 路由与页面设计

### 5.1 页面清单

| 路由 | 类型 | 组件模式 | 说明 |
| --- | --- | --- | --- |
| `/` | 静态 | Server | 品牌落地页（8 大板块） |
| `/industrial-belts` | 静态 | **Client** | 产业带总览 + 分类筛选 |
| `/industrial-belts/[slug]` | 动态 | Server | 产业带详情（介绍/企业/推荐模板） |
| `/companies` | 静态 | **Client** | 企业渠道地图 + 分类筛选 |
| `/companies/[slug]` | 动态 | Server | 企业详情（渠道/模板样板/认领入口） |
| `/about` | 静态 | Server | 服务范围/模板/合作方式 |
| `/claim` | 静态 | **Client** | 认领表单（mailto → 第三方表单服务） |
| `/404` | 静态 | Server | 自定义 404 |
| `/sitemap.xml` `/robots.txt` | 静态 | Server | 构建期生成 |

### 5.2 动态路由设计

**产业带详情** `industrial-belts/[slug]/page.tsx`：

- `generateStaticParams()`：由 `industrialBelts.map(b => ({ slug: b.slug }))` 全量生成；
- `generateMetadata()`：`title = belt.name`，`description = belt.summary`；
- 页面三段式：头部（类别/名称/区位）→ 产业亮点 → 代表企业（CompanyCard 复用）→ 推荐模板（TemplatePreview + CTA）。

**企业详情** `companies/[slug]/page.tsx`：

- `generateStaticParams()`：由 `companies.map(c => ({ slug: c.slug }))` 全量生成；
- `generateMetadata()`：`title = company.name + 出海渠道地图`；
- 页面结构：头部（面包屑/名称/VerifyTag）→ 出海渠道地图（Badge + 外链）→ 适用模板样板（overseasHabits 要点 + 认领/纠错 CTA）。

### 5.3 元数据与 SEO 策略

根布局 `layout.tsx`：

- `metadataBase = NEXT_PUBLIC_SITE_URL`（默认占位 `https://jinkuatong.com`）；
- 全局默认 title/description/OG；
- `viewport.themeColor = #0f3d3e`。

子页面：通过 `generateMetadata` 覆盖 title/description，保证每页唯一（todo E3 复查项）。

---

## 6. 组件层设计

### 6.1 基础组件（`src/components/ui/`，无业务依赖）

| 组件 | 接口 | 职责 |
| --- | --- | --- |
| `Badge` | `{ type: ChannelType; label: string }` | 渠道标签，四级配色（official 灰 / english 青 / cross-border 金 / b2b 蓝） |
| `VerifyTag` | `{ status: VerifyStatus }` | 验证状态（已核验绿 / 待认领琥珀） |
| `FilterBar` | `{ options; value; onChange; allLabel? }` | 通用客户端筛选栏（`"use client"`） |
| `CTAButton` | `{ href; children; variant?; className? }` | 主/次按钮；站外 http/mailto 用 `<a>`，站内用 `next/link` |
| `Card` | `{ children; className?; hoverable? }` | 通用卡片容器 |
| `SectionTitle` | `{ eyebrow; title; description?; align? }` | 区块标题（眼眉字 + 主标题 + 说明） |

### 6.2 领域组件

| 组件 | 职责 | 数据来源 |
| --- | --- | --- |
| `Header` | 站点导航；桌面横向 / 移动端 `<details>` 无 JS 汉堡菜单；认领 CTA | 常量 |
| `Footer` | 品牌区 / 链接组 / 合规链接 | 常量 |
| `BeltCard` | 产业带卡片（名称/区位/产品/综试区/企业数） | `belt` prop + `getCompaniesByBelt` |
| `CompanyCard` | 企业卡片（名称/区位/渠道标签/验证状态） | `company` prop + `getBeltBySlug` |

### 6.3 模板预览组件（`src/components/templates/`）

```
TemplatePreview.tsx（调度器）
  ├── T1IndustrialPreview.tsx   工业制造样板
  ├── T2AgriFoodPreview.tsx     农副食品样板
  ├── T3TechMaterialPreview.tsx 科技新材料样板
  └── T4CraftPreview.tsx        文化工艺样板
```

调度器通过 `Record<TemplateKey, Component>` 映射，传入 `templateKey` 即渲染对应样板，实现"按数据字段切换模板"（需求 §1.2.3 / §4）。

---

## 7. 模板体系设计（T1–T4）

### 7.1 差异化矩阵

| 模板 | 类别 | 风格 | 设计要点 | 海外习惯要点 |
| --- | --- | --- | --- | --- |
| T1 工业制造 | manufacturing | cool（冷峻金属） | 深青 + 钢灰，信息密度高 | 资质/产能/MOQ/交期/认证；PDF 可下载；Email/WhatsApp |
| T2 农副食品 | agri-food | warm（温暖自然） | 米白 + 大地色，图片食欲感 | 天然/有机/可追溯；产地溯源 + 认证；IG/FB 内容营销 |
| T3 科技新材料 | new-material | modern（简洁现代） | 深蓝 + 亮青，参数表格化 | 规格数据/测试报告；Datasheet 下载；样品申请 |
| T4 文化工艺 | crafts | elegant（雅致留白） | 墨色 + 金色，慢视觉 | 文化叙事/艺术价值；高质感实拍；限量定制 |

### 7.2 渲染链路

```
Company.template ──→ templates[template]（元信息 + 风格）
      │
      ├─→ 企业详情页：TemplatePreview 渲染对应样板 + overseasHabits 展示
      └─→ 产业带详情页：categoryToTemplate[category] 取默认模板
```

### 7.3 设计令牌（`globals.css` @theme）

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `brand-950/900/800/700/600/200/100/50` | 深青系（`#08292a` → `#f0f7f5`） | 主色/背景 |
| `gold-600/500/400/100` | 金色系（`#a8862f` → `#f4ead4`） | 点缀/CTA |
| `ink-900/600/400` | 墨色系（`#1b2323` → `#7c8b8b`） | 正文/次级文字 |

模板差异化**不新增令牌**，通过组件组合 + 布局差异实现（保持设计令牌统一，需求 §8）。

---

## 8. 交互与状态设计

### 8.1 客户端交互清单

| 交互 | 页面 | 实现方式 |
| --- | --- | --- |
| 分类筛选 | 产业带总览 / 企业地图 | `useState` + `useMemo` 客户端过滤（FilterBar） |
| 认领表单 | `/claim` | `FormEvent` 提交；当前 mailto 拼接（保底），todo C5 切换 Formspree POST |
| 移动端菜单 | 全局 | `<details>/<summary>` 原生交互（无 JS） |
| 待认领展示 | 企业卡片/详情 | 按 `verifyStatus` 条件渲染（VerifyTag + 占位引导） |

### 8.2 认领流程（人工闭环，需求 §6.2）

```
用户点击"认领" → /claim 表单 → mailto 唤起邮件（当前）
                                  → 第三方表单服务（todo C5 切换）
运营人工跟进 → 核验渠道信息 → 更新 companies.ts → 重新构建部署
```

---

## 9. 部署设计

### 9.1 构建产物

- 命令：`npm run build`（`next build` → 输出 `out/`）；
- 配置：`next.config.ts`（`output:'export'` / `trailingSlash` / `images.unoptimized`）；
- 辅助文件：`public/_headers`（安全头）、`public/_redirects`（跳转规则）。

### 9.2 Cloudflare Pages

| 项 | 配置 |
| --- | --- |
| 构建命令 | `npm run build` |
| 输出目录 | `out` |
| 环境变量 | `NEXT_PUBLIC_SITE_URL=https://正式域名`（构建期注入） |
| 自定义域名 | `jinkuatong.com`（todo F2，阻塞于域名注册） |
| CI | GitHub 仓库推送自动触发（todo F1） |

### 9.3 上线检查单（与 TodoList 对应）

1. A2 域名就绪 → F2 注入 `NEXT_PUBLIC_SITE_URL`；
2. B2 渠道链接全部核验；
3. E4 Lighthouse 性能/SEO ≥ 90；
4. F4 URL 存活巡检脚本上线。

---

## 10. 非功能设计

| 类别 | 设计 |
| --- | --- |
| 性能 | 静态导出零运行时；图片懒加载 + 预尺寸；组件按需拆分；Lighthouse ≥ 90（todo E4） |
| 响应式 | 移动优先；375–1920px 网格自适应（`sm/md/lg` 断点）无横向滚动 |
| 可访问性 | 语义化标签（header/main/section/nav）、`sr-only`、表单 label 关联、对比度 AA |
| SEO | 每页唯一 title/description、语义化 H1、sitemap.xml、robots.txt、OG（结构化数据 E1 待补） |
| 合规 | HTTPS 全站；Cookie/GDPR（E2 待补）；隐私政策/服务条款页 |
| 维护性 | 数据/组件/页面三层分离；单一职责；关键代码注释；TS 类型约束 |
| 浏览器 | 最近 2 个版本 Chrome/Safari/Edge/Firefox |

---

## 11. 质量保障

| 检查 | 命令 | 说明 |
| --- | --- | --- |
| 类型检查 | `npm run typecheck` | `tsc --noEmit`，数据模型变更后必跑 |
| 代码检查 | `npm run lint` | eslint；需 ignore `next-env.d.ts` |
| 构建验证 | `npm run build` | 确认 `out/` 全量生成（页面数随数据增长） |
| 数据校验 | `scripts/validate-data.ts`（todo B5） | slug 唯一、外键有效、URL 格式 |

---

## 12. 已知限制与 v2 演进

| 限制 | 说明 | v2 演进 |
| --- | --- | --- |
| 无动态能力 | 静态导出禁 SSR/API/中间件 | `@opennextjs/cloudflare` 或 Cloudflare Workers |
| 无后端 | 认领线索走 mailto/第三方表单 | 轻量管理后台 / CMS |
| 单语言 | 仅中文 | 中英双语（i18n，模板骨架已预留） |
| 数据静态维护 | 改数据需重新构建部署 | 数据 JSON 化 + 简单后台 |

---

## 13. 关键文件索引

| 文件 | 职责 |
| --- | --- |
| `next.config.ts` | 静态导出配置 |
| `src/app/globals.css` | 设计令牌 + 全局样式 |
| `src/data/templates.ts` | 模板注册表（T1–T4） |
| `src/data/industrial-belts.ts` | 产业带数据与查询 |
| `src/data/companies.ts` | 企业数据与查询（含 `channelTypeNames`） |
| `src/components/templates/TemplatePreview.tsx` | 模板渲染调度器 |
| `src/components/CookieBanner.tsx` | Cookie 合规弹窗（E2） |
| `src/app/industrial-belts/[slug]/page.tsx` | 产业带详情（动态路由示例） |
| `src/app/companies/[slug]/page.tsx` | 企业详情（动态路由 + Product JSON-LD） |
| `src/app/(main)/companies/page.tsx` | 企业地图（分类+渠道筛选+搜索） |
| `scripts/validate-data.ts` | 数据校验脚本（B5，构建前执行） |
| `scripts/check-links.ts` | 渠道链接存活巡检（F4） |
| `public/_headers`、`public/_redirects` | Cloudflare Pages 配置（F3） |

---

## 14. 功能实现明细（v0.2 落地项）

> 对应 TodoList v0.2：C1/C2/C3、C5、E1/E2/E3、B3/B5、F3/F4/F5、G3 已实现并验证（`npm run build` 产出 108 静态页）。

### 14.1 企业地图筛选与搜索（C1 / C3，`src/app/(main)/companies/page.tsx`）

- 三层组合过滤（AND 关系），全部在客户端 `useMemo` 内完成：
  1. **分类**：按所属产业带 `category`（复用 `FilterBar`）；
  2. **渠道标签**：按 `channels[].type` 匹配四级渠道，或 `pending`（`verifyStatus === "pending"`）筛出待认领企业；
  3. **关键词**：匹配企业名 / 区位 / 简介 / 产业带名（小写化包含匹配）。
- 渠道中文名统一维护在 `src/data/companies.ts` 的 `channelTypeNames`（单一职责：数据层提供语义名，展示层复用）。

### 14.2 待认领占位卡（C2，`src/components/CompanyCard.tsx` + `/claim`）

- pending 企业卡片：琥珀色虚线边框 + 「认领此企业」按钮（跳转 `/claim?company=企业名`）；
- 认领页读取 URL 参数预填企业名称：`useEffect` 解析 `window.location.search` → 更新 `presetCompany` state → 企业名称 input 采用**受控方案**（`value={presetCompany}` + `onChange` 更新），其余字段保持非受控（提交时统一经 `FormData` 读取）。实测静态导出下受控方案可稳定回填，`defaultValue`+`key` 方案在重新挂载后存在不生效问题，故弃用。

### 14.3 认领表单双通道（C5，`src/app/(main)/claim/page.tsx`）

- `NEXT_PUBLIC_FORM_ENDPOINT` 配置时：`fetch` POST 到第三方表单服务（Formspree 协议），`res.ok` 判定成功/失败并展示错误提示；
- 未配置时：mailto 保底（拼接主题/正文唤起邮件客户端）；
- 提交状态机：`idle | success | error`。

### 14.4 结构化数据（E1）

- **Organization**（根 `layout.tsx`）：`<script type="application/ld+json">` 注入，含名称/URL/描述/邮箱/服务区域；
- **Product**（企业详情页）：按企业 `name`/`intro`/详情页 URL 生成，URL 使用 `NEXT_PUBLIC_SITE_URL`（默认占位域名）。

### 14.5 Cookie 合规与合规页（E2）

- `CookieBanner`（use client，挂载于 `(main)/layout.tsx`）：首次访问展示底部横幅，选择「接受全部/仅必要」后写入 `localStorage`（key `jkt-cookie-consent`）不再展示；
- `/privacy`、`/terms`：静态合规页（服务端组件 + 独立 metadata）；Footer 合规链接已指向两页（原指向 `/about` 修正）。

### 14.6 页面级元数据（E3）

- 客户端组件页面（`/companies`、`/industrial-belts`、`/claim`）无法导出 `metadata`，通过**路由组 layout** 提供唯一 title/description：
  - `companies/layout.tsx` / `industrial-belts/layout.tsx` / `claim/layout.tsx`；
- 动态详情页沿用 `generateMetadata`（按 slug 取数据生成唯一标题），与 layout metadata 合并覆盖。

### 14.7 数据校验与链接巡检（B5 / F4，`scripts/`）

- `validate-data.ts`：7 类校验（企业/产业带 slug 唯一、`beltSlug` 外键、`template` 合法、`verifyStatus` 合法、渠道类型合法、渠道 URL 格式、`companySlugs` 外键），输出错误/提示两类日志，失败退出码 1；已接入 `npm run build`（构建前自动执行）；
- `check-links.ts`：遍历全部渠道 URL 做 HEAD 请求（10s 超时、10 并发），输出异常清单，失败退出码 1；`npm run check-links` 可挂 CI/定时任务（对应需求 §11 风险对策）。
- 实现注意：判断值合法性统一用 `Object.keys().includes()`，**避免 `in` 操作符**（在 tsx 转译环境下行为异常）。

### 14.8 社媒入口 / 埋点 / 安全头（G3 / F5 / F3）

- Footer 新增 Instagram/Facebook/LinkedIn 入口（占位指向平台首页，品牌账号注册后替换真实链接）；
- 根 layout 条件注入 Cloudflare Web Analytics beacon 脚本（`NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` 配置后生效）；
- `public/_headers` 补充 `X-Frame-Options: DENY` 与 HTML `no-cache` 规则（HTTPS/HSTS 由 Cloudflare Pages 自动处理）。

---

## 附录：待确认事项（同需求文档附录 B）

1. 正式域名注册情况；
2. 品牌视觉与配色定稿；
3. "每类 Top10"企业口径与核验人（todo A1，阻塞阶段二）；
4. 已有独立站企业清单与盘点排期；
5. 认领表单第三方服务选型（todo A4）。
