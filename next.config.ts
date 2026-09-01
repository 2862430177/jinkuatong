import type { NextConfig } from "next";

// 第一版采用静态导出（需求文档 §3.2 方案 A）：
// - output: 'export'：构建产物输出到 out/，零 Node 运行时，直接部署 Cloudflare Pages
// - trailingSlash: 静态导出时生成 /about/index.html，路径兼容性更好
// - images.unoptimized: 静态导出下 next/image 需关闭优化（或使用 <img>）
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
