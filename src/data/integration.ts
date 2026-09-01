// 企业集成统计（2026-09-02）
// 口径：全省跨境电商备案企业 1963 家（市场报告 §2.1，2026.6）；平台已集成 200 家（4 大类 × 每类 Top50，
// 见 companies.ts），其余列入待集成池（registry.ts，其中已抓取真实名录可在 /registry 页浏览）。
import { companies } from "./companies";
import { registryEntries } from "./registry";

/** 全省跨境电商备案企业总数（市场报告 §2.1，待二次核验） */
export const marketTotal = 1963;

/** 已集成企业数（companies.ts，4 大类 × 每类 Top50） */
export const integratedCount = companies.length;

/** 待集成企业数（= 总量 - 已集成） */
export const pendingCount = marketTotal - integratedCount;

/** 待集成池已抓取真实名录条数（registry.ts） */
export const registryPoolCount = registryEntries.length;
