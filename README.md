# 晋跨通 JinKuaTong

> 让山西制造，一站卖全球。

面向山西产业带中小外贸企业的一站式出海服务官网（品牌官网 + 产业带出海渠道地图 + 4 套行业独立站模板）。

## 技术栈

- Next.js 15（App Router）+ TypeScript（strict）
- Tailwind CSS v4（设计令牌驱动品牌色）
- 静态导出（`output: 'export'`）部署到 Cloudflare Pages

## 快速开始

```bash
npm install          # 安装依赖
npm run dev          # 本地开发 http://localhost:3000
npm run build        # 构建（产物输出到 out/）
npm run lint         # 代码检查
npm run typecheck    # 类型检查
```

## 目录结构

```
src/
├── app/                  # 页面路由
│   ├── page.tsx          # 首页
│   ├── industrial-belts/ # 产业带列表 + [slug] 详情
│   ├── companies/        # 企业地图 + [slug] 详情
│   ├── about/            # 关于
│   ├── claim/            # 企业认领/联系表单
│   ├── sitemap.ts        # sitemap.xml
│   └── robots.ts         # robots.txt
├── components/           # 组件
│   ├── ui/               # 基础组件（Badge/Tag/Card/FilterBar…）
│   ├── templates/        # 4 套行业模板预览（T1–T4）
│   └── Header.tsx / Footer.tsx
└── data/                 # 集中式数据（模板/产业带/企业）
```

## 数据维护

- `src/data/templates.ts`：4 套行业模板定义（T1 工业制造 / T2 农副食品 / T3 科技新材料 / T4 文化工艺）
- `src/data/industrial-belts.ts`：产业带数据
- `src/data/companies.ts`：企业数据（含渠道、验证状态、template 字段）

修改数据后重新构建部署即可更新站点。

## 部署（Cloudflare Pages）

1. 推送到 GitHub 仓库；
2. Cloudflare Pages 新建项目，连接该仓库；
3. 构建设置：
   - 构建命令：`npm run build`
   - 输出目录：`out`
   - 环境变量（可选）：`NEXT_PUBLIC_SITE_URL=https://正式域名`
4. 部署完成后绑定自定义域名（`jinkuatong.com`）。

## 参考文档

- `docs/market-report.md`：市场调研报告 v0.1
- `docs/requirements.md`：第一版需求文档 v0.1
