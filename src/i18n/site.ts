// 独立站 UI 文案字典（中英双语）：导航 / 板块标题 / 按钮 / 表单 / 联系区 / 页脚
// 说明：内容文案在 src/data/site-content/（数据驱动），本文件只负责站点 UI 的通用文案。

/** 站点语言 */
export type SiteLang = "en" | "zh";

/** UI 文案（全部为双语结构，组件按当前语言取值） */
export const siteI18n = {
  /** 导航项 */
  nav: {
    home: { en: "Home", zh: "首页" },
    products: { en: "Products", zh: "产品" },
    about: { en: "About", zh: "关于我们" },
    certifications: { en: "Certifications", zh: "资质认证" },
    clients: { en: "Clients", zh: "客户案例" },
    news: { en: "News", zh: "新闻动态" },
    faq: { en: "FAQ", zh: "常见问题" },
    contact: { en: "Contact", zh: "联系我们" },
  },
  /** 按钮文案 */
  actions: {
    quote: { en: "Get a Quote", zh: "获取报价" },
    learnMore: { en: "Learn More", zh: "了解更多" },
    requestQuote: { en: "Request a Quote", zh: "立即询价" },
    viewAll: { en: "View All Products", zh: "查看全部产品" },
    requestDocuments: { en: "Request documents by email", zh: "邮件索取资料" },
  },
  /** 板块标题 */
  sections: {
    productsEyebrow: { en: "Our Products", zh: "产品中心" },
    products: { en: "Product Range", zh: "产品系列" },
    aboutEyebrow: { en: "About Us", zh: "关于我们" },
    about: { en: "Factory & Brand Story", zh: "工厂与品牌故事" },
    mission: { en: "Our Mission", zh: "我们的使命" },
    milestones: { en: "Milestones", zh: "发展历程" },
    highlights: { en: "Why Choose Us", zh: "选择我们的理由" },
    certsEyebrow: { en: "Certifications", zh: "资质认证" },
    certs: { en: "Quality & Compliance", zh: "质量与合规" },
    clientsEyebrow: { en: "Clients", zh: "客户案例" },
    clients: { en: "Trusted Worldwide", zh: "全球客户的信赖" },
    partners: { en: "Trusted Brand Partners", zh: "品牌合作" },
    testimonials: { en: "What Our Clients Say", zh: "客户评价" },
    newsEyebrow: { en: "News", zh: "新闻动态" },
    news: { en: "Company Updates", zh: "公司最新动态" },
    companyNews: { en: "Company Updates", zh: "公司动态" },
    industryNews: { en: "Industry Insights", zh: "行业动态" },
    b2bPlatforms: { en: "Find Us on B2B Platforms", zh: "B2B 平台外链" },
    b2bPlatformsDesc: {
      en: "Verify our factory profile on major B2B marketplaces, or contact us directly.",
      zh: "可在主流 B2B 平台查看工厂档案，或直接联系我们。",
    },
    faqEyebrow: { en: "FAQ", zh: "常见问题" },
    faq: { en: "Frequently Asked Questions", zh: "常见问题解答" },
    contactEyebrow: { en: "Contact", zh: "联系我们" },
    contact: { en: "Get in Touch", zh: "联系我们" },
    contactDesc: {
      en: "Tell us about your requirements — our team replies within 24 hours. OEM / ODM / custom orders welcome.",
      zh: "告诉我们您的需求——团队 24 小时内回复。欢迎 OEM / ODM / 定制订单。",
    },
  },
  /** 产品表格表头 */
  table: {
    product: { en: "Product", zh: "产品" },
    specification: { en: "Specification", zh: "规格" },
    application: { en: "Application", zh: "应用" },
  },
  /** 联系区 */
  contact: {
    addressLabel: { en: "Address", zh: "地址" },
    emailLabel: { en: "Email", zh: "邮箱" },
    emailPlaceholder: { en: "sales@company.com", zh: "sales@company.com" },
    phoneLabel: { en: "Phone / WhatsApp", zh: "电话 / WhatsApp" },
    phonePlaceholder: { en: "+86 351 0000 000", zh: "+86 351 0000 000" },
    availableOnRequest: { en: "Contact us for direct channels", zh: "联系索取直达联系方式" },
  },
  /** 询盘表单（InquiryForm） */
  form: {
    title: { en: "Send an Inquiry", zh: "提交询盘" },
    name: { en: "Name *", zh: "姓名 *" },
    namePlaceholder: { en: "Your full name", zh: "您的姓名" },
    email: { en: "Email *", zh: "邮箱 *" },
    emailPlaceholder: { en: "you@company.com", zh: "you@company.com" },
    company: { en: "Company", zh: "公司" },
    companyPlaceholder: { en: "Your company (optional)", zh: "公司（选填）" },
    message: { en: "Message *", zh: "留言 *" },
    messagePlaceholder: { en: "Product, quantity, target market, etc.", zh: "产品、数量、目标市场等" },
    send: { en: "Send Inquiry", zh: "发送询盘" },
    errorRequired: { en: "Please fill in your name, email and message.", zh: "请填写姓名、邮箱与留言。" },
    errorEmail: { en: "Please enter a valid email address.", zh: "请输入有效的邮箱地址。" },
    success: {
      en: "✓ Your email client should open with the inquiry pre-filled. We reply within 24 hours.",
      zh: "✓ 邮箱客户端已打开并预填询盘内容，我们将在 24 小时内回复。",
    },
  },
  /** 页脚 */
  footer: {
    comingSoon: { en: "Official site coming soon — contact us for product information.", zh: "正式官网建设中——欢迎联系我们获取产品信息。" },
    rights: { en: "All Rights Reserved", zh: "版权所有" },
    backToPlatform: { en: "Preview by JinKuaTong", zh: "晋跨通模板效果预览" },
  },
} as const;

/** 语言切换按钮文案 */
export const langLabels: Record<SiteLang, string> = {
  en: "EN",
  zh: "中文",
};

/** 站点语言（英文默认：面向海外买家，中文可切换） */
export const DEFAULT_SITE_LANG: SiteLang = "en";

/** localStorage 键名 */
export const SITE_LANG_STORAGE_KEY = "jkt-site-lang";

/** 板块锚点顺序（导航与渲染共用） */
export const siteNavAnchors: Array<{ anchor: string; labelKey: keyof typeof siteI18n.nav }> = [
  { anchor: "#home", labelKey: "home" },
  { anchor: "#products", labelKey: "products" },
  { anchor: "#about", labelKey: "about" },
  { anchor: "#certifications", labelKey: "certifications" },
  { anchor: "#clients", labelKey: "clients" },
  { anchor: "#news", labelKey: "news" },
  { anchor: "#faq", labelKey: "faq" },
  { anchor: "#contact", labelKey: "contact" },
];
