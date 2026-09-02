// 询盘收件人配置（方案B：已核验邮箱路由 + 默认兜底收件人）
// 说明：
// - 企业已有「已核验邮箱」→ 客户提交询盘后由平台函数自动直发至该企业邮箱；
// - 企业暂无可用核验邮箱 → 询盘自动发送至默认兜底收件人（晋跨通平台客服邮箱，由平台人工对接转发）。
// 录入标准（2026-09-02 起执行）：
//   1) 来源须为官网公开展示（联系页 mailto: 或正文明确标注 E-mail/邮箱 的地址），禁止按域名猜测 sales@xxx；
//   2) 人工审核上下文确认为企业业务联系邮箱；
//   3) 收件域需存在有效 MX 记录（可送达，用 Resolve-DnsName -Type MX 核验）。
// 抓取与审核记录见 scripts/data/company-emails.json 与 scripts/fetch-company-emails.ts。

/** 已核验过的企业业务邮箱（key: 企业 slug，见 src/data/companies.ts；2026-09-02 录入） */
export const VERIFIED_COMPANY_EMAILS: Record<string, string> = {
  // 传统制造与工业品（T1）
  "da-hua-glass": "dahua@dahuaglass.com", // 大华玻璃：官网联系页 E-mail（mailto/正文）
  "guan-li-flange": "sales@sxguanliflange.com", // 冠力法兰：中英站页脚 mailto 销售邮箱
  "ding-xiang-hengda": "sales@gjyff.com", // 管家营法兰：英文站 International Sales mailto
  "qi-xian-hongchang": "samliu@hy-group.cn", // 山西宏艺玻璃：官网联系页公司域邮箱（外贸）
  "zun-yi-ceramics": "zunyi@vip.163.com", // 尊屹陶瓷：官网联系区 E-mail（163 企业邮）
  // 特色农副与食品（T2）
  "qing-xu-zilin": "zlcy@zlcy.com", // 紫林醋业：官网 mailto
  // 新材料·新能源·电子（T3）
  "chang-zhi-led-co": "sales@gkgd.com", // 高科华烨：英文站 mailto 国际销售
  "chang-zhi-shenzi-led": "zongjingban@luan-uv.cn", // 中科潞安：官网联系页邮箱（腾讯企业邮，域 luan-uv.cn 与官网 .com 不同但 MX 有效）
  "jincheng-ai-camera": "17635097537@163.com", // 星心半导体：官网联系页邮箱（公开展示）
  "lv-liang-aluminum-mg": "13771974218@yuantai-alu.com", // 元泰高导：官网 mailto（阿里企业邮）
  // 说明：天镇通航官网展示 thx@tzhlm.com，但 tzhlm.com 无 MX 记录（域名与官网 tzthlm.com 不一致），
  // 按"可送达"标准剔除，改走兜底；高科华兴/钢科碳材料随集团官网无自身联系邮箱，不录。
};

/** 默认兜底收件人：无已核验邮箱的企业，其询盘统一发往晋跨通平台邮箱 */
export const FALLBACK_INQUIRY_EMAIL = "hewei.419763673@gmail.com";

/** 询盘来源（晋跨通线上平台）：随询盘邮件一并附带，便于企业识别线索来自晋跨通 */
export const INQUIRY_SOURCE_URL = "https://jinkuatong.pages.dev/";
