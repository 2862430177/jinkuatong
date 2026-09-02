// 询盘收件人配置（方案B：已核验邮箱路由 + 默认兜底收件人）
// 说明：
// - 企业已有「已核验邮箱」（人工核验邮箱真实可用后录入）→ 客户询盘直接发送至该企业销售邮箱；
// - 企业暂无可用核验邮箱 → 询盘统一发送至默认兜底收件人（晋跨通平台客服邮箱，由平台人工对接转发）。
// 录入规则：只有经过人工核验（官方邮件/电话/平台认证确认可用）的邮箱才能写入本名单，
// 切勿把"根据官网域名猜测的 sales@域名"当作已核验邮箱（猜测邮箱不可用会导致询盘丢失）。

/** 已核验过的企业销售邮箱（key: 企业 slug，见 src/data/companies.ts） */
export const VERIFIED_COMPANY_EMAILS: Record<string, string> = {
  // 示例（人工核验通过后录入）：
  // "da-hua-glass": "sales@example.com",
};

/** 默认兜底收件人：无已核验邮箱的企业，其询盘统一发往晋跨通平台邮箱 */
export const FALLBACK_INQUIRY_EMAIL = "hewei.419763673@gmail.com";

/** 询盘来源（晋跨通线上平台）：随询盘邮件一并附带，便于企业识别线索来自晋跨通 */
export const INQUIRY_SOURCE_URL = "https://jinkuatong.pages.dev/";
