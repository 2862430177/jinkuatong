// 中类别内容基础包（T1–T4）：独立站的完整默认内容（中英双语）
// 说明：子类（产业带）覆盖包在 belts.ts，合并逻辑见 index.ts；
//      认证、客户、新闻、FAQ、沿革等通用板块在此定义，产品/数据/故事由子类覆盖。
import type { TemplateKey, Category } from "@/data/templates";
import type { SiteContent } from "./types";

/** 中类别基础包注册表：templateKey → 完整内容 */
export const categoryContent: Record<TemplateKey, SiteContent> = {
  // ============ T1 工业制造（冷峻金属感） ============
  "t1-industrial": {
    hero: {
      eyebrow: { en: "ISO 9001 Certified Factory · Shanxi, China", zh: "ISO 9001 认证工厂 · 中国山西" },
      title: { en: "Precision Manufacturing, Delivered Globally", zh: "精密制造，货通全球" },
      tagline: {
        en: "Factory-direct pricing · OEM/ODM supported · Exporting to 80+ countries",
        zh: "工厂直供价格 · 支持 OEM/ODM · 产品远销 80+ 国家",
      },
    },
    stats: [
      { num: "12", label: { en: "Production Lines", zh: "条生产线" } },
      { num: "500+", label: { en: "Skilled Workers", zh: "名熟练工人" } },
      { num: "80+", label: { en: "Export Countries", zh: "个出口国家" } },
      { num: "ISO 9001", label: { en: "Certified Quality", zh: "质量体系认证" } },
    ],
    products: [
      {
        name: { en: "Machinery Parts", zh: "机械零部件" },
        tagline: { en: "Forged & machined to international standards", zh: "按国际标准锻造与机加工" },
        products: [
          {
            name: { en: "Forged Flanges", zh: "锻造法兰" },
            spec: { en: "ANSI / DIN / JIS · DN15–600", zh: "ANSI / DIN / JIS · DN15–600" },
            application: { en: "Pipeline connection systems", zh: "管道连接系统" },
          },
          {
            name: { en: "Pipe Fittings", zh: "管件" },
            spec: { en: "Elbow / Tee / Reducer · Sch10–160", zh: "弯头 / 三通 / 异径 · Sch10–160" },
            application: { en: "Oil, gas & water systems", zh: "油气与水系统" },
          },
          {
            name: { en: "Custom Forgings", zh: "定制锻件" },
            spec: { en: "OEM/ODM · 0.5–50 kg", zh: "OEM/ODM · 0.5–50 kg" },
            application: { en: "Per customer drawings", zh: "按客户图纸定制" },
          },
        ],
      },
      {
        name: { en: "Precision Components", zh: "精密部件" },
        tagline: { en: "High-tolerance machining for demanding industries", zh: "面向严苛行业的高精度加工" },
        products: [
          {
            name: { en: "Turned Parts", zh: "车削件" },
            spec: { en: "±0.01 mm tolerance", zh: "公差 ±0.01 mm" },
            application: { en: "Automotive & machinery", zh: "汽车与机械" },
          },
          {
            name: { en: "Stamped Parts", zh: "冲压件" },
            spec: { en: "0.2–8 mm sheet", zh: "0.2–8 mm 板材" },
            application: { en: "Appliances & electronics", zh: "家电与电子" },
          },
          {
            name: { en: "Fasteners", zh: "紧固件" },
            spec: { en: "Grade 8.8 / 10.9 / 12.9", zh: "8.8 / 10.9 / 12.9 级" },
            application: { en: "General industrial use", zh: "一般工业用途" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Based in Shanxi's industrial heartland, our factory has grown from a small workshop into an export manufacturer serving more than 80 countries — powered by strict quality control and a skilled workforce.",
        zh: "工厂扎根山西工业腹地，从小作坊成长为服务 80+ 国家的出口制造商，靠的是严格的质量管控与熟练的产业工人。",
      },
      mission: {
        en: "To deliver reliable, cost-effective industrial parts with on-time delivery and full traceability.",
        zh: "以准时交付与全程可追溯，提供可靠、高性价比的工业部件。",
      },
      highlights: {
        en: ["ISO 9001 / CE / SGS certified", "OEM/ODM supported with free samples", "Strict multi-step QC before shipping"],
        zh: ["ISO 9001 / CE / SGS 认证", "支持 OEM/ODM，免费样品", "发货前多道质检"],
      },
      milestones: [
        { year: "2010", title: { en: "Factory established in Shanxi", zh: "山西建厂" } },
        { year: "2015", title: { en: "ISO 9001 quality certification", zh: "通过 ISO 9001 认证" } },
        { year: "2018", title: { en: "Exports reach 80+ countries", zh: "出口国突破 80 个" } },
        { year: "2024", title: { en: "New automated production line", zh: "新增自动化产线" } },
      ],
    },
    certifications: {
      en: ["ISO 9001", "CE", "SGS", "UL", "RoHS"],
      zh: ["ISO 9001", "CE", "SGS", "UL", "RoHS"],
    },
    clients: {
      names: ["Germany", "United States", "UAE", "Australia", "Southeast Asia"],
      testimonials: [
        {
          quote: {
            en: "Consistent quality and reliable delivery — a trustworthy partner for our European projects.",
            zh: "质量稳定、交期可靠，是我们欧洲项目的可靠伙伴。",
          },
          author: { en: "Procurement Manager", zh: "采购经理" },
          role: { en: "Germany", zh: "德国" },
        },
        {
          quote: {
            en: "The OEM team turned our drawings into products fast, with excellent finish.",
            zh: "OEM 团队将我们的图纸快速转化为产品，表面处理出色。",
          },
          author: { en: "Founder", zh: "创始人" },
          role: { en: "United States", zh: "美国" },
        },
      ],
    },
    news: [
      {
        date: "2026-06",
        title: { en: "New automated production line goes live", zh: "新自动化生产线投产" },
        summary: { en: "Capacity increased by 30% with tighter tolerance control.", zh: "产能提升 30%，公差控制更严格。" },
      },
      {
        date: "2026-04",
        title: { en: "Exhibiting at Hannover Messe 2026", zh: "参展 2026 汉诺威工业展" },
        summary: { en: "Visit our booth to discuss custom forgings and components.", zh: "欢迎到访展位洽谈定制锻件与部件。" },
      },
      {
        date: "2026-01",
        title: { en: "ISO 9001:2015 recertification passed", zh: "通过 ISO 9001:2015 复审" },
        summary: { en: "Quality management system re-audited and approved.", zh: "质量管理体系再审核通过。" },
      },
    ],
    // 品牌合作背书（样板：列举常见零售/渠道采购商，企业认领后可替换为真实客户）
    partners: ["IKEA", "Target", "Carrefour", "Lidl", "Ace Hardware"],
    // 行业动态（区别于上方 news 公司动态，参考大华官网双栏目结构）
    industryNews: [
      {
        date: "2026-08",
        title: { en: "EU updates food-contact glass & ceramic rules", zh: "欧盟更新食品接触玻璃陶瓷法规" },
        summary: { en: "New migration limits take effect for glass tableware export.", zh: "玻璃餐具出口迁移量限值新规生效。" },
      },
      {
        date: "2026-06",
        title: { en: "Global tableware market to grow 4.8% by 2030", zh: "全球餐具市场 2030 年前年增 4.8%" },
        summary: { en: "Hotel & foodservice demand drives premium glassware.", zh: "酒店与餐饮需求拉动高端玻璃器皿。" },
      },
      {
        date: "2026-03",
        title: { en: "Sea freight rates ease on Asia-Europe routes", zh: "亚欧航线海运费回落" },
        summary: { en: "Container costs normalize, improving export margins.", zh: "集装箱运价回归常态，出口利润改善。" },
      },
    ],
    // B2B 平台外链（参考大华官网"友情链接"，指向主流跨境 B2B 平台主页）
    b2bLinks: [
      { name: "Alibaba.com", url: "https://www.alibaba.com" },
      { name: "Made-in-China.com", url: "https://www.made-in-china.com" },
      { name: "GlobalSources.com", url: "https://www.globalsources.com" },
      { name: "EC21.com", url: "https://www.ec21.com" },
    ],
    faq: [
      { q: { en: "What is your MOQ?", zh: "起订量是多少？" }, a: { en: "Generally 500–1,000 pcs depending on product and size.", zh: "一般视产品与规格为 500–1000 件。" } },
      { q: { en: "Do you support OEM/ODM?", zh: "是否支持 OEM/ODM？" }, a: { en: "Yes — custom sizes, materials, logos and packaging are all available.", zh: "支持——尺寸、材质、Logo 与包装均可定制。" } },
      { q: { en: "What are the lead times?", zh: "交货周期是多久？" }, a: { en: "25–35 days for standard products; samples within 7–10 days.", zh: "常规品 25–35 天，样品 7–10 天。" } },
      { q: { en: "Can I get samples before ordering?", zh: "下单前可以拿样品吗？" }, a: { en: "Yes, samples are available against freight payment.", zh: "可以，样品运费到付即可。" } },
    ],
    contact: { address: { en: "Shanxi, China", zh: "中国山西" } },
  },

  // ============ T2 农副食品（温暖自然） ============
  "t2-agri-food": {
    hero: {
      eyebrow: { en: "Organic · Traceable · Shanxi, China", zh: "有机 · 可追溯 · 中国山西" },
      title: { en: "Pure Shanxi Harvest, From Farm to Table", zh: "纯净山西物产，从田间到餐桌" },
      tagline: {
        en: "Natural & safe food · HACCP certified · Direct from origin",
        zh: "天然安全食品 · HACCP 认证 · 产地直供",
      },
    },
    stats: [
      { num: "5,000+", label: { en: "Acres of Origin Fields", zh: "亩产地" } },
      { num: "1,200m", label: { en: "Average Altitude", zh: "平均海拔" } },
      { num: "30+", label: { en: "Export Countries", zh: "个出口国家" } },
      { num: "HACCP", label: { en: "Food Safety Certified", zh: "食品安全认证" } },
    ],
    products: [
      {
        name: { en: "Staple Grains", zh: "主粮杂粮" },
        tagline: { en: "Highland-grown, full traceability", zh: "高原种植，全程可追溯" },
        products: [
          {
            name: { en: "Organic Millet", zh: "有机小米" },
            spec: { en: "1,200m highland · Harvest 2026", zh: "1200 米高原 · 2026 年产" },
            application: { en: "25kg / 50kg export bags", zh: "25kg / 50kg 出口装" },
          },
          {
            name: { en: "Selenium-rich Millet", zh: "富硒小米" },
            spec: { en: "Natural selenium · 0.2 mg/kg", zh: "天然富硒 · 0.2 mg/kg" },
            application: { en: "Health food channel", zh: "健康食品渠道" },
          },
          {
            name: { en: "Black Rice & Beans", zh: "黑米与杂豆" },
            spec: { en: "Mixed grain gift packs", zh: "杂粮礼盒装" },
            application: { en: "Retail & gifting", zh: "零售与礼赠" },
          },
        ],
      },
      {
        name: { en: "Wellness Beverages", zh: "健康饮品" },
        tagline: { en: "Cold-pressed, additive-free", zh: "冷压工艺，无添加" },
        products: [
          {
            name: { en: "Sea Buckthorn Juice", zh: "沙棘汁" },
            spec: { en: "NFC · Vitamin C rich", zh: "NFC 非浓缩还原 · 富含维C" },
            application: { en: "300ml glass bottle · private label", zh: "300ml 玻璃瓶 · 支持贴牌" },
          },
          {
            name: { en: "Aged Vinegar", zh: "老陈醋" },
            spec: { en: "6-year solid-state fermentation", zh: "固态发酵六年" },
            application: { en: "500ml · export grade", zh: "500ml · 出口级" },
          },
          {
            name: { en: "Dried Fruit Snacks", zh: "果干零食" },
            spec: { en: "No added sugar", zh: "无添加蔗糖" },
            application: { en: "Retail ready packs", zh: "零售小包装" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Nestled in the highlands of Shanxi, our origin farms produce some of China's most treasured grains and fruits. Every harvest is traceable back to a specific region and farm, ensuring natural quality from soil to shelf.",
        zh: "基地位于山西高原，出产中国最受珍视的杂粮与林果。每一季收成都可追溯到具体产区与农场，从土壤到货架保证天然品质。",
      },
      mission: {
        en: "To bring the clean, natural taste of Shanxi to tables around the world — safely and traceably.",
        zh: "把山西干净、天然的滋味安全、可追溯地带到世界餐桌。",
      },
      highlights: {
        en: ["Traceable origin from farm to table", "HACCP / Organic / FDA certified", "Private label & custom packaging"],
        zh: ["田间到餐桌全程可追溯", "HACCP / 有机 / FDA 认证", "支持贴牌与定制包装"],
      },
      milestones: [
        { year: "2008", title: { en: "Origin farm base established", zh: "建立产地基地" } },
        { year: "2014", title: { en: "HACCP food safety certification", zh: "通过 HACCP 认证" } },
        { year: "2019", title: { en: "Exports to 30+ countries", zh: "出口 30+ 国家" } },
        { year: "2025", title: { en: "Full-chain cold-chain logistics", zh: "全链路冷链物流" } },
      ],
    },
    certifications: {
      en: ["Organic", "HACCP", "FDA Registered", "ISO 22000"],
      zh: ["有机认证", "HACCP", "FDA 注册", "ISO 22000"],
    },
    clients: {
      names: ["Netherlands", "United States", "Japan", "Middle East", "Southeast Asia"],
      testimonials: [
        {
          quote: {
            en: "Full traceability and consistent quality make them our preferred Asian origin supplier.",
            zh: "全程可追溯、品质稳定，是我们首选的亚洲产地供应商。",
          },
          author: { en: "Import Manager", zh: "进口经理" },
          role: { en: "Netherlands", zh: "荷兰" },
        },
        {
          quote: {
            en: "Their private-label millet sells extremely well in our health-food chain.",
            zh: "他们的贴牌小米在我们的健康食品连锁中销量极佳。",
          },
          author: { en: "Category Director", zh: "品类总监" },
          role: { en: "United States", zh: "美国" },
        },
      ],
    },
    news: [
      {
        date: "2026-08",
        title: { en: "2026 autumn harvest begins at origin farms", zh: "产地基地开启 2026 秋收" },
        summary: { en: "Highland millet and fruit harvest entering peak season.", zh: "高原小米与林果进入采收旺季。" },
      },
      {
        date: "2026-05",
        title: { en: "New organic certification for grain lines", zh: "谷物线新增有机认证" },
        summary: { en: "Full grain range now certified organic by international bodies.", zh: "全谷物产品线获国际机构有机认证。" },
      },
      {
        date: "2026-02",
        title: { en: "Attending Gulfood 2026 in Dubai", zh: "参展 2026 迪拜海湾食品展" },
        summary: { en: "Meet us to discuss distribution partnerships in the Middle East.", zh: "欢迎洽谈中东分销合作。" },
      },
    ],
    // 品牌合作背书（样板：常见食品零售商，认领后替换为真实客户）
    partners: ["Whole Foods Market", "Costco", "H-E-B", "Aldi", "Tesco"],
    // 行业动态（区别于上方 news 公司动态）
    industryNews: [
      {
        date: "2026-08",
        title: { en: "Organic food demand up 9% in EU & US", zh: "欧美有机食品需求增长 9%" },
        summary: { en: "Retailers expand organic shelf space, opening export channels.", zh: "零售商扩大有机货架，出口渠道扩容。" },
      },
      {
        date: "2026-06",
        title: { en: "EU updates organic import equivalence rules", zh: "欧盟更新有机进口等效规则" },
        summary: { en: "Simplified certification path for approved origins.", zh: "获认可产地的认证流程简化。" },
      },
      {
        date: "2026-03",
        title: { en: "Cold-chain logistics costs ease for Asia exports", zh: "亚洲出口冷链物流成本回落" },
        summary: { en: "Freight normalization benefits fresh & frozen categories.", zh: "运价回归利好生鲜与冷冻品类。" },
      },
    ],
    // B2B 平台外链（面向食品采购商的主流 B2B 平台）
    b2bLinks: [
      { name: "Alibaba.com", url: "https://www.alibaba.com" },
      { name: "Made-in-China.com", url: "https://www.made-in-china.com" },
      { name: "GlobalSources.com", url: "https://www.globalsources.com" },
      { name: "EC21.com", url: "https://www.ec21.com" },
    ],
    faq: [
      { q: { en: "Can I trace the origin of each batch?", zh: "每批货可以溯源吗？" }, a: { en: "Yes — every batch carries a traceability code linked to origin farm and date.", zh: "可以——每批货都有溯源编码，关联产地农场与采收日期。" } },
      { q: { en: "What is the minimum order quantity?", zh: "起订量是多少？" }, a: { en: "Usually one pallet (approx. 500–1,000 kg) for bulk grains.", zh: "散装谷物通常为一个托盘（约 500–1000 kg）。" } },
      { q: { en: "Do you offer private label?", zh: "是否支持贴牌？" }, a: { en: "Yes — custom labels, bags and retail-ready packaging are available.", zh: "支持——可定制标签、袋装与零售包装。" } },
      { q: { en: "What is the shelf life?", zh: "保质期多长？" }, a: { en: "18–24 months for grains; 12 months for beverages.", zh: "谷物 18–24 个月，饮品 12 个月。" } },
    ],
    contact: { address: { en: "Shanxi, China", zh: "中国山西" } },
  },

  // ============ T3 科技新材料（简洁现代） ============
  "t3-tech-material": {
    hero: {
      eyebrow: { en: "Engineered in Shanxi · Certified Labs", zh: "山西智造 · 实验室认证" },
      title: { en: "Advanced Materials & Components, Data-Driven", zh: "先进材料与组件，数据驱动" },
      tagline: {
        en: "Precise specifications · Test reports available · Fast sample service",
        zh: "规格精确 · 测试报告齐全 · 样品快速寄送",
      },
    },
    stats: [
      { num: "50+", label: { en: "R&D Engineers", zh: "名研发工程师" } },
      { num: "120+", label: { en: "Patents Granted", zh: "项授权专利" } },
      { num: "10,000h", label: { en: "Rated Lifetime", zh: "额定寿命" } },
      { num: "30+", label: { en: "Countries Served", zh: "个服务国家" } },
    ],
    products: [
      {
        name: { en: "Optoelectronic Components", zh: "光电组件" },
        tagline: { en: "Precision optics with full test data", zh: "精密光学，测试数据齐全" },
        products: [
          {
            name: { en: "Deep-UV LED Modules", zh: "深紫外 LED 模组" },
            spec: { en: "265 nm UVC · 120 mW", zh: "265 nm UVC · 120 mW" },
            application: { en: "Water & air disinfection", zh: "水与空气消毒" },
          },
          {
            name: { en: "Optical Modules", zh: "光电模组" },
            spec: { en: "Custom wavelengths · SMD/COB", zh: "波长可定制 · SMD/COB" },
            application: { en: "Medical & industrial lighting", zh: "医疗与工业照明" },
          },
          {
            name: { en: "Sapphire Substrates", zh: "蓝宝石衬底" },
            spec: { en: "2–6 inch · EPI-ready", zh: "2–6 英寸 · 外延级" },
            application: { en: "LED & semiconductor", zh: "LED 与半导体" },
          },
        ],
      },
      {
        name: { en: "Advanced Materials", zh: "先进材料" },
        tagline: { en: "High-performance materials, batch-consistent", zh: "高性能材料，批次稳定" },
        products: [
          {
            name: { en: "Silicon Carbide Materials", zh: "碳化硅材料" },
            spec: { en: "High-purity · 4H/6H", zh: "高纯 · 4H/6H" },
            application: { en: "Power electronics", zh: "功率电子" },
          },
          {
            name: { en: "Carbon Fiber Composites", zh: "碳纤维复合材料" },
            spec: { en: "T300–T800 · custom prepreg", zh: "T300–T800 · 可定制预浸料" },
            application: { en: "Aerospace & automotive", zh: "航空航天与汽车" },
          },
          {
            name: { en: "Aluminum-Magnesium Alloy", zh: "铝镁合金" },
            spec: { en: "Lightweight · high strength", zh: "轻量化 · 高强度" },
            application: { en: "Structural components", zh: "结构部件" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Born from Shanxi's industrial research base, our team turns advanced materials into reliable products. In-house laboratories, a strong patent portfolio and third-party test reports back every specification we publish.",
        zh: "团队脱胎于山西产业科研基地，将先进材料转化为可靠产品。自有实验室、扎实的专利组合与第三方测试报告，支撑我们所发布的每一项规格。",
      },
      mission: {
        en: "To help engineers specify with confidence through transparent data and rapid sample service.",
        zh: "以透明数据与快速样品服务，让工程师放心选型。",
      },
      highlights: {
        en: ["In-house labs & 120+ patents", "Third-party test reports included", "Sample service within 7 days"],
        zh: ["自有实验室与 120+ 专利", "附带第三方测试报告", "7 天内寄送样品"],
      },
      milestones: [
        { year: "2012", title: { en: "R&D center established", zh: "成立研发中心" } },
        { year: "2017", title: { en: "First deep-UV patent granted", zh: "首个深紫外专利授权" } },
        { year: "2021", title: { en: "IATF 16949 certified", zh: "通过 IATF 16949 认证" } },
        { year: "2025", title: { en: "Expanded to 120+ patents", zh: "专利突破 120 项" } },
      ],
    },
    certifications: {
      en: ["ISO 9001", "IATF 16949", "REACH", "RoHS"],
      zh: ["ISO 9001", "IATF 16949", "REACH", "RoHS"],
    },
    clients: {
      names: ["Germany", "South Korea", "Japan", "United States", "Southeast Asia"],
      testimonials: [
        {
          quote: {
            en: "Complete datasheets and fast samples made the qualification process smooth.",
            zh: "完整的数据表与快速样品，让认证流程非常顺畅。",
          },
          author: { en: "Senior Engineer", zh: "高级工程师" },
          role: { en: "Germany", zh: "德国" },
        },
        {
          quote: {
            en: "Batch consistency is excellent — we can design them into mass production.",
            zh: "批次一致性极佳，我们已将其纳入量产设计。",
          },
          author: { en: "Purchasing Director", zh: "采购总监" },
          role: { en: "South Korea", zh: "韩国" },
        },
      ],
    },
    news: [
      {
        date: "2026-07",
        title: { en: "New UVC disinfection module launched", zh: "发布新型 UVC 消毒模组" },
        summary: { en: "Higher irradiance with 10,000h rated lifetime.", zh: "更高辐照度，额定寿命 10000 小时。" },
      },
      {
        date: "2026-03",
        title: { en: "Three new patents granted in Q1", zh: "一季度新增三项专利" },
        summary: { en: "Covering LED packaging and materials processing.", zh: "涵盖 LED 封装与材料工艺。" },
      },
      {
        date: "2025-12",
        title: { en: "Lab accredited for third-party testing", zh: "实验室通过第三方检测资质" },
        summary: { en: "In-house reports now accepted for export compliance.", zh: "自有报告可用于出口合规。" },
      },
    ],
    // 品牌合作背书（样板：常见品牌客户，认领后替换为真实客户）
    partners: ["Philips", "Panasonic", "Signify", "LG Electronics"],
    // 行业动态（区别于上方 news 公司动态）
    industryNews: [
      {
        date: "2026-08",
        title: { en: "Deep-UV LED market to reach $2.1B by 2030", zh: "深紫外 LED 市场 2030 年将达 21 亿美元" },
        summary: { en: "Disinfection demand drives 11% CAGR worldwide.", zh: "消毒需求带动全球 11% 年复合增长。" },
      },
      {
        date: "2026-05",
        title: { en: "EU RoHS update expands restricted substances", zh: "欧盟 RoHS 修订扩大限制物质范围" },
        summary: { en: "New substances require updated compliance reports.", zh: "新增限制物质需更新合规报告。" },
      },
      {
        date: "2026-02",
        title: { en: "SiC power devices surging in EV charging", zh: "碳化硅器件在充电桩市场快速增长" },
        summary: { en: "Higher efficiency drives SiC adoption in power modules.", zh: "更高效率推动碳化硅在功率模组普及。" },
      },
    ],
    // B2B 平台外链（面向工业采购商的主流 B2B 平台）
    b2bLinks: [
      { name: "Alibaba.com", url: "https://www.alibaba.com" },
      { name: "Made-in-China.com", url: "https://www.made-in-china.com" },
      { name: "GlobalSources.com", url: "https://www.globalsources.com" },
      { name: "EC21.com", url: "https://www.ec21.com" },
    ],
    faq: [
      { q: { en: "Can I get the full datasheet?", zh: "能提供完整数据表吗？" }, a: { en: "Yes — request via the form and we send datasheet, test reports and samples together.", zh: "可以——通过表单索取，我们会连同数据表、测试报告与样品一并寄送。" } },
      { q: { en: "Do you offer free samples?", zh: "提供免费样品吗？" }, a: { en: "Yes, samples are free; courier cost is on the customer.", zh: "样品免费，运费客户承担。" } },
      { q: { en: "Can specifications be customized?", zh: "规格可以定制吗？" }, a: { en: "Yes — wavelength, power, package and substrates can be customized with MOQ.", zh: "可以——波长、功率、封装与衬底均可定制，视起订量而定。" } },
      { q: { en: "What is your typical delivery time?", zh: "常规交期多久？" }, a: { en: "2–4 weeks for samples; 4–8 weeks for production orders.", zh: "样品 2–4 周，量产订单 4–8 周。" } },
    ],
    contact: { address: { en: "Shanxi, China", zh: "中国山西" } },
  },

  // ============ T4 文化工艺（雅致留金） ============
  "t4-craft": {
    hero: {
      eyebrow: { en: "Intangible Cultural Heritage · Shanxi, China", zh: "非物质文化遗产 · 中国山西" },
      title: { en: "Heritage Craftsmanship, Timeless Collectibles", zh: "传承技艺，历久弥珍" },
      tagline: {
        en: "Handmade by master artisans · Limited editions · Gift & private collection",
        zh: "匠人手工制作 · 限量发行 · 礼品与私藏",
      },
    },
    stats: [
      { num: "30+", label: { en: "Master Artisans", zh: "位匠人师傅" } },
      { num: "60+", label: { en: "Handcrafted Steps", zh: "道手工工序" } },
      { num: "5yr", label: { en: "Average Apprenticeship", zh: "平均学艺时长" } },
      { num: "20+", label: { en: "Countries Collected", zh: "个收藏国家" } },
    ],
    products: [
      {
        name: { en: "Heritage Collection", zh: "传世典藏" },
        tagline: { en: "Handmade pieces with certificates of authenticity", zh: "手工制作，附收藏证书" },
        products: [
          {
            name: { en: "Lacquer Jewelry Box", zh: "大漆首饰盒" },
            spec: { en: "Hand-polished · mother-of-pearl inlay", zh: "手工推光 · 螺钿镶嵌" },
            application: { en: "Collector & gifting", zh: "收藏与礼赠" },
          },
          {
            name: { en: "Painted Folding Screen", zh: "漆绘屏风" },
            spec: { en: "Hand-painted · 2–6 panels", zh: "手绘 · 2–6 扇" },
            application: { en: "Interior decor", zh: "家居陈设" },
          },
          {
            name: { en: "Carved Giftware", zh: "雕刻摆件" },
            spec: { en: "Limited edition · numbered", zh: "限量 · 编号发行" },
            application: { en: "Corporate gifts", zh: "商务礼赠" },
          },
        ],
      },
      {
        name: { en: "Gallery Pieces", zh: "艺术馆藏" },
        tagline: { en: "One-of-a-kind works by senior masters", zh: "大师孤品，独一无二" },
        products: [
          {
            name: { en: "Lacquer Paintings", zh: "漆画" },
            spec: { en: "Traditional lacquer on wood", zh: "传统大漆木板" },
            application: { en: "Gallery & private collection", zh: "画廊与私藏" },
          },
          {
            name: { en: "Hand-woven Silk Art", zh: "织锦艺术" },
            spec: { en: "Lu silk · heritage loom", zh: "潞绸 · 传统织机" },
            application: { en: "Museum-grade pieces", zh: "馆藏级作品" },
          },
          {
            name: { en: "Commissioned Works", zh: "定制作品" },
            spec: { en: "Custom themes & sizes", zh: "主题与尺寸可定制" },
            application: { en: "Corporate & private commissions", zh: "企业与个人定制" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Our workshop carries forward a heritage recognized as China's National Intangible Cultural Heritage. Every piece passes through dozens of handcrafted steps — from material selection to months of patient polishing — by master artisans trained over many years.",
        zh: "我们的工坊传承着被列为中国国家级非物质文化遗产的技艺。每一件作品都要历经选料、裱布、描金、推光等数十道手工工序，由多年学艺的匠人师傅耐心完成。",
      },
      mission: {
        en: "To let heritage craftsmanship live on — as timeless collectibles and gifts with meaning.",
        zh: "让传统技艺生生不息——化作历久弥新的收藏与有温度的礼品。",
      },
      highlights: {
        en: ["National Intangible Cultural Heritage", "Certificate of authenticity with every piece", "Custom, limited and gift-packaging services"],
        zh: ["国家级非物质文化遗产", "每件附收藏证书", "支持定制、限量与礼盒包装"],
      },
      milestones: [
        { year: "1978", title: { en: "Workshop founded by master craftsmen", zh: "匠人创立工坊" } },
        { year: "2006", title: { en: "Craft listed as National ICH", zh: "技艺列入国家级非遗" } },
        { year: "2015", title: { en: "Works exhibited internationally", zh: "作品走向国际展览" } },
        { year: "2024", title: { en: "New artisan training program", zh: "启动新学徒培养计划" } },
      ],
    },
    certifications: {
      en: ["National Intangible Cultural Heritage", "Certificate of Authenticity", "Restoration & Appraisal Service"],
      zh: ["国家级非物质文化遗产", "收藏证书", "修复与鉴定服务"],
    },
    clients: {
      names: ["Galleries", "Museums", "Luxury Hotels", "Corporate Collectors", "International Auctions"],
      testimonials: [
        {
          quote: {
            en: "The lacquer pieces are museum quality — our clients treasure them.",
            zh: "这些漆器达到馆藏级别——客户视若珍宝。",
          },
          author: { en: "Gallery Curator", zh: "画廊策展人" },
          role: { en: "Italy", zh: "意大利" },
        },
        {
          quote: {
            en: "A perfect cultural gift for our high-end corporate partners.",
            zh: "非常适合赠予高端企业合作伙伴的文化礼品。",
          },
          author: { en: "B2B Marketing Lead", zh: "企业市场负责人" },
          role: { en: "Singapore", zh: "新加坡" },
        },
      ],
    },
    news: [
      {
        date: "2026-06",
        title: { en: "New collection unveiled at heritage exhibition", zh: "非遗展上新系列亮相" },
        summary: { en: "Limited lacquer series inspired by Shanxi landscapes.", zh: "以山西山水为灵感的限量漆器系列。" },
      },
      {
        date: "2026-03",
        title: { en: "Artisan apprenticeship program opens", zh: "匠人学徒培养计划启动" },
        summary: { en: "Passing the craft to the next generation of masters.", zh: "让技艺传承给下一代匠人。" },
      },
      {
        date: "2025-11",
        title: { en: "Works collected by international museums", zh: "作品被国际博物馆收藏" },
        summary: { en: "Two pieces added to permanent collections.", zh: "两件作品进入常设馆藏。" },
      },
    ],
    // 品牌合作背书（样板：高端零售/酒店/画廊渠道，认领后替换为真实客户）
    partners: ["Farfetch", "Anthropologie", "Aman Resorts", "Four Seasons"],
    // 行业动态（区别于上方 news 公司动态）
    industryNews: [
      {
        date: "2026-08",
        title: { en: "Handcrafted luxury goods demand grows in Asia & Middle East", zh: "亚洲与中东高端手工艺品需求增长" },
        summary: { en: "Heritage crafts gain shelf space in premium retail.", zh: "非遗工艺在高端零售中扩展陈列。" },
      },
      {
        date: "2026-05",
        title: { en: "Museums expand contemporary heritage craft collections", zh: "博物馆扩大当代非遗工艺收藏" },
        summary: { en: "Institutional demand strengthens provenance value.", zh: "机构收藏强化了来源价值。" },
      },
      {
        date: "2026-02",
        title: { en: "Collectors show rising interest in heritage craft", zh: "藏家对非遗工艺兴趣升温" },
        summary: { en: "Auction results reflect steady appreciation.", zh: "拍卖行情体现稳步升值。" },
      },
    ],
    // B2B 平台外链（面向礼品与工艺品采购商的主流平台）
    b2bLinks: [
      { name: "Alibaba.com", url: "https://www.alibaba.com" },
      { name: "Made-in-China.com", url: "https://www.made-in-china.com" },
      { name: "GlobalSources.com", url: "https://www.globalsources.com" },
      { name: "EC21.com", url: "https://www.ec21.com" },
    ],
    faq: [
      { q: { en: "Is each piece truly handmade?", zh: "每件作品都是纯手工吗？" }, a: { en: "Yes — every piece is made by hand, often taking months to complete.", zh: "是的——每件均为手工制作，往往耗时数月。" } },
      { q: { en: "Does it come with a certificate?", zh: "附带证书吗？" }, a: { en: "Every piece includes a numbered certificate of authenticity.", zh: "每件作品均附编号收藏证书。" } },
      { q: { en: "Can I commission a custom piece?", zh: "可以定制作品吗？" }, a: { en: "Yes — themes, sizes and colors can be commissioned with a lead time of 3–6 months.", zh: "可以——主题、尺寸与配色可定制，工期 3–6 个月。" } },
      { q: { en: "How is shipping and packaging handled?", zh: "运输与包装如何处理？" }, a: { en: "We provide museum-grade protective packaging and insured international shipping.", zh: "提供馆藏级保护包装与国际保价运输。" } },
    ],
    contact: { address: { en: "Shanxi, China", zh: "中国山西" } },
  },
};

/** 中类别 → 基础包映射（供合并与校验） */
export const categoryContentList: Array<{ key: TemplateKey; category: Category }> = [
  { key: "t1-industrial", category: "manufacturing" },
  { key: "t2-agri-food", category: "agri-food" },
  { key: "t3-tech-material", category: "new-material" },
  { key: "t4-craft", category: "crafts" },
];
