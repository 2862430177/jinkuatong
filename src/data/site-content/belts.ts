// 子类（产业带）内容覆盖包：每个产业带一套差异化的 hero / 数据看板 / 产品系列 / 故事与亮点
// 说明：与 industrial-belts.ts 的 16 个产业带一一对应（slug 相同）；
//      认证、客户、新闻、FAQ、沿革等通用板块沿用所属中类别基础包（categories.ts）。
import type { BeltContentOverride } from "./types";

/** 子类覆盖包注册表：beltSlug → 覆盖内容 */
export const beltContent: BeltContentOverride[] = [
  // ============ T1 工业制造 ============
  {
    slug: "qi-xian-glass",
    category: "manufacturing",
    hero: {
      eyebrow: { en: "Hand-blown Glassware · Shanxi, China", zh: "人工吹制玻璃器皿 · 中国山西" },
      title: { en: "Artisan Glassware for Global Dining", zh: "为全球餐桌而生的工艺玻璃" },
      tagline: {
        en: "Hand-blown crystal cups · OEM/ODM · Exporting to 80+ countries",
        zh: "人工吹制水晶杯 · 支持 OEM/ODM · 远销 80+ 国家",
      },
    },
    stats: [
      { num: "200+", label: { en: "Artisan Blowers", zh: "名吹制工匠" } },
      { num: "80+", label: { en: "Export Countries", zh: "个出口国家" } },
      { num: "100%", label: { en: "Hand Blown", zh: "人工吹制" } },
      { num: "20+", label: { en: "Years of Heritage", zh: "年行业传承" } },
    ],
    products: [
      {
        name: { en: "Crystal Drinkware", zh: "水晶饮具" },
        tagline: { en: "Lead-free crystal, machine-free hand blowing", zh: "无铅水晶 · 纯手工吹制" },
        products: [
          {
            name: { en: "Crystal Wine Glasses", zh: "水晶红酒杯" },
            spec: { en: "Lead-free crystal · 200–450 ml", zh: "无铅水晶 · 200–450 ml" },
            application: { en: "Dining & hospitality", zh: "餐饮与酒店" },
          },
          {
            name: { en: "Whiskey Tumblers", zh: "威士忌杯" },
            spec: { en: "Heavy base · 250–350 ml", zh: "厚底 · 250–350 ml" },
            application: { en: "Bar & gift sets", zh: "酒吧与礼品套装" },
          },
          {
            name: { en: "Beer Mugs", zh: "啤酒杯" },
            spec: { en: "1,000–2,000 ml · glass handle", zh: "1000–2000 ml · 玻璃把手" },
            application: { en: "Pubs & restaurants", zh: "酒吧与餐厅" },
          },
        ],
      },
      {
        name: { en: "Tableware & Decor", zh: "餐桌用品与装饰" },
        tagline: { en: "From decanters to decorative art", zh: "从分酒器到装饰艺术品" },
        products: [
          {
            name: { en: "Decanters & Sets", zh: "分酒器及套具" },
            spec: { en: "Aerating design · 750 ml–1.5 L", zh: "醒酒设计 · 750 ml–1.5 L" },
            application: { en: "Wine service", zh: "酒水服务" },
          },
          {
            name: { en: "Glass Bowls", zh: "玻璃碗" },
            spec: { en: "Hand-blown · 1–6 pc sets", zh: "人工吹制 · 1–6 件套装" },
            application: { en: "Table & kitchen", zh: "餐桌与厨房" },
          },
          {
            name: { en: "Decorative Glass", zh: "玻璃工艺品" },
            spec: { en: "Sculpted & engraved", zh: "雕刻与磨花工艺" },
            application: { en: "Retail & gifts", zh: "零售与礼赠" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Based in Qi County — China's largest hand-blown glassware base — our artisans keep a 20-year tradition alive: lead-free crystal, shaped entirely by hand and breath.",
        zh: "公司位于祁县——全国最大的人工吹制玻璃器皿生产基地，20 年传承无铅水晶纯手工吹制技艺。",
      },
      highlights: {
        en: ["China's largest hand-blown glassware base", "Lead-free crystal & food-safe", "Custom engraving and gift boxes"],
        zh: ["全国最大人工吹制玻璃基地", "无铅水晶 · 食品级安全", "支持刻花与礼盒定制"],
      },
    },
    contact: { address: { en: "Qi County, Jinzhong · Shanxi, China", zh: "山西省晋中市祁县" } },
  },
  {
    slug: "ding-xiang-flange",
    category: "manufacturing",
    hero: {
      eyebrow: { en: "Forged Flanges & Pipe Fittings · Shanxi, China", zh: "锻造法兰与管件 · 中国山西" },
      title: { en: "Precision Forgings for Global Pipelines", zh: "服务全球管道的精密锻件" },
      tagline: {
        en: "ANSI / DIN / JIS · Carbon & stainless · 30% of China's flange exports",
        zh: "ANSI / DIN / JIS · 碳钢与不锈钢 · 占全国法兰出口三成",
      },
    },
    stats: [
      { num: "30%", label: { en: "of China's Flange Exports", zh: "占全国法兰出口" } },
      { num: "3,000+", label: { en: "Standard Specifications", zh: "种标准规格" } },
      { num: "DN15–600", label: { en: "Size Range", zh: "尺寸范围" } },
      { num: "ASME", label: { en: "Global Standards", zh: "全球标准认证" } },
    ],
    products: [
      {
        name: { en: "Flanges", zh: "法兰" },
        tagline: { en: "Full standard range from stock", zh: "全标准系列常备库存" },
        products: [
          {
            name: { en: "Weld Neck Flange", zh: "对焊法兰" },
            spec: { en: "ANSI B16.5 · DN15–600", zh: "ANSI B16.5 · DN15–600" },
            application: { en: "High-pressure pipelines", zh: "高压管道" },
          },
          {
            name: { en: "Slip-on Flange", zh: "平焊法兰" },
            spec: { en: "DIN / JIS · Class 150–900", zh: "DIN / JIS · 150–900 磅级" },
            application: { en: "General piping", zh: "一般管道连接" },
          },
          {
            name: { en: "Blind Flange", zh: "盲板法兰" },
            spec: { en: "Carbon / stainless · full size range", zh: "碳钢 / 不锈钢 · 全尺寸" },
            application: { en: "System isolation & inspection", zh: "管道封堵与检修" },
          },
        ],
      },
      {
        name: { en: "Fittings & Forgings", zh: "管件与锻件" },
        tagline: { en: "Forged to drawing, tested to standard", zh: "按图锻造，按标检测" },
        products: [
          {
            name: { en: "Elbows & Tees", zh: "弯头与三通" },
            spec: { en: "Sch10–160 · seamless", zh: "Sch10–160 · 无缝" },
            application: { en: "Oil, gas & chemical", zh: "油气与化工" },
          },
          {
            name: { en: "Reducers", zh: "异径管" },
            spec: { en: "Concentric / eccentric", zh: "同心 / 偏心" },
            application: { en: "Piping transitions", zh: "管道变径" },
          },
          {
            name: { en: "Custom Forgings", zh: "定制锻件" },
            spec: { en: "OEM/ODM · per drawing", zh: "OEM/ODM · 按图纸" },
            application: { en: "Specialty industries", zh: "特殊行业应用" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Dingxiang is one of Asia's largest flange forging bases, and we supply its forged products to pipeline projects worldwide — backed by strict material traceability and third-party testing.",
        zh: "定襄是亚洲较大的法兰锻造基地，我们将其锻件产品供应给全球管道项目——依托严格的材质追溯与第三方检测。",
      },
      highlights: {
        en: ["Asia's major flange forging base", "Material certificates & third-party testing", "OEM/ODM with per-drawing production"],
        zh: ["亚洲较大的法兰锻造基地", "材质证书与第三方检测", "支持按图 OEM/ODM 生产"],
      },
    },
    contact: { address: { en: "Dingxiang County, Xinzhou · Shanxi, China", zh: "山西省忻州市定襄县" } },
  },
  {
    slug: "huai-ren-ceramic",
    category: "manufacturing",
    hero: {
      eyebrow: { en: "Daily-Use Ceramics · Shanxi, China", zh: "日用陶瓷 · 中国山西" },
      title: { en: "Bone China & Daily Ceramics for Global Homes", zh: "骨质瓷与日用瓷，走进全球家庭" },
      tagline: {
        en: "Bone china · hotel ware · export-grade quality",
        zh: "骨质瓷 · 酒店用瓷 · 出口级品质",
      },
    },
    stats: [
      { num: "40+", label: { en: "Years of Craft", zh: "年制瓷经验" } },
      { num: "100%", label: { en: "Food-safe Glaze", zh: "食品级釉料" } },
      { num: "20+", label: { en: "Export Countries", zh: "个出口国家" } },
      { num: "500+", label: { en: "Product SKUs", zh: "款产品" } },
    ],
    products: [
      {
        name: { en: "Bone China Tableware", zh: "骨质瓷餐瓷" },
        tagline: { en: "High bone-ash content, bright & durable", zh: "高骨粉含量，透亮耐用" },
        products: [
          {
            name: { en: "Tea & Coffee Sets", zh: "茶具与咖啡具" },
            spec: { en: "Bone china · 12–21 pc", zh: "骨质瓷 · 12–21 件" },
            application: { en: "Home & hotel", zh: "家庭与酒店" },
          },
          {
            name: { en: "Dinner Sets", zh: "中式餐具套装" },
            spec: { en: "20–60 pc · gold trim", zh: "20–60 件 · 描金" },
            application: { en: "Retail & gifting", zh: "零售与礼赠" },
          },
          {
            name: { en: "Coffee Cups", zh: "咖啡杯" },
            spec: { en: "180–300 ml", zh: "180–300 ml" },
            application: { en: "Café & office", zh: "咖啡馆与办公" },
          },
        ],
      },
      {
        name: { en: "Hotel & Everyday Ware", zh: "酒店与日用瓷" },
        tagline: { en: "Durable, stackable, dishwasher-safe", zh: "耐用、可叠放、可机洗" },
        products: [
          {
            name: { en: "Hotel China", zh: "酒店用瓷" },
            spec: { en: "Reinforced body · heavy duty", zh: "强化瓷体 · 耐用" },
            application: { en: "Hotels & catering", zh: "酒店与餐饮" },
          },
          {
            name: { en: "Mugs & Cups", zh: "马克杯" },
            spec: { en: "300–450 ml · custom print", zh: "300–450 ml · 可印刷" },
            application: { en: "Promo & retail", zh: "促销与零售" },
          },
          {
            name: { en: "Giftware", zh: "陶瓷礼品" },
            spec: { en: "Decorative & seasonal", zh: "装饰与节庆款" },
            application: { en: "Seasonal gifting", zh: "节庆礼赠" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "From the ceramic heartland of Northern China, our factory produces bone china and daily-use ceramics that balance beauty with durability — trusted by hotels and families in 20+ countries.",
        zh: "工厂位于中国北方陶瓷重镇，生产兼顾美观与耐用的骨质瓷与日用瓷，深受 20+ 国家酒店与家庭的信赖。",
      },
      highlights: {
        en: ["40+ years of ceramic craft", "Food-safe glazes, export tested", "Custom decals, shapes & packaging"],
        zh: ["40 余年制瓷经验", "食品级釉料，通过出口检测", "支持花纸、器型与包装定制"],
      },
    },
    contact: { address: { en: "Huairen, Shuozhou · Shanxi, China", zh: "山西省朔州市怀仁" } },
  },
  {
    slug: "yan-hu-pump",
    category: "manufacturing",
    hero: {
      eyebrow: { en: "Water Pumps & Electrical Machinery · Shanxi, China", zh: "水泵与机电设备 · 中国山西" },
      title: { en: "Reliable Pumps for Global Water Systems", zh: "为全球水务提供可靠水泵" },
      tagline: {
        en: "Exporting to 130+ countries · ISO certified",
        zh: "远销 130+ 国家 · ISO 认证",
      },
    },
    stats: [
      { num: "130+", label: { en: "Export Countries", zh: "个出口国家" } },
      { num: "50+", label: { en: "Pump Models", zh: "款泵型" } },
      { num: "10,000h", label: { en: "Design Lifetime", zh: "设计寿命" } },
      { num: "ISO", label: { en: "Certified Factory", zh: "认证工厂" } },
    ],
    products: [
      {
        name: { en: "Water Pumps", zh: "水泵" },
        tagline: { en: "Covering residential to irrigation", zh: "覆盖家庭到灌溉" },
        products: [
          {
            name: { en: "Submersible Pumps", zh: "潜水泵" },
            spec: { en: "0.75–7.5 kW · cast iron / SS", zh: "0.75–7.5 kW · 铸铁 / 不锈钢" },
            application: { en: "Wells & irrigation", zh: "深井与灌溉" },
          },
          {
            name: { en: "Centrifugal Pumps", zh: "离心泵" },
            spec: { en: "Flow 1–100 m³/h", zh: "流量 1–100 m³/h" },
            application: { en: "Water supply & boost", zh: "供水与增压" },
          },
          {
            name: { en: "Borehole Pumps", zh: "深井泵" },
            spec: { en: "4–8 inch · high lift", zh: "4–8 英寸 · 高扬程" },
            application: { en: "Deep wells", zh: "深井取水" },
          },
        ],
      },
      {
        name: { en: "Motors & Systems", zh: "电机与配套" },
        tagline: { en: "Matched motors and complete systems", zh: "电机与成套系统配套" },
        products: [
          {
            name: { en: "Electric Motors", zh: "电机" },
            spec: { en: "0.37–90 kW · IE2/IE3", zh: "0.37–90 kW · IE2/IE3" },
            application: { en: "Pump & machinery drive", zh: "水泵与机械驱动" },
          },
          {
            name: { en: "Pump Parts", zh: "泵配件" },
            spec: { en: "Impellers, seals, bearings", zh: "叶轮、密封件、轴承" },
            application: { en: "OEM & aftermarket", zh: "OEM 与售后" },
          },
          {
            name: { en: "Custom Assemblies", zh: "定制成套" },
            spec: { en: "Per project specification", zh: "按项目配置" },
            application: { en: "Irrigation & water works", zh: "灌溉与水工程" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Based in Yuncheng — a national pump and electrical machinery base — our pumps move water for farms and cities in 130+ countries, built on rigorous testing and durable materials.",
        zh: "公司位于运城——全国水泵机电产业基地，我们的水泵为 130+ 国家的农场与城市送水，依托严格测试与耐用材质。",
      },
      highlights: {
        en: ["Exported to 130+ countries", "Full testing before shipping", "OEM/ODM with engineering support"],
        zh: ["远销 130+ 国家", "出厂全检", "OEM/ODM 与工程支持"],
      },
    },
    contact: { address: { en: "Yanhu District, Yuncheng · Shanxi, China", zh: "山西省运城市盐湖区" } },
  },
  {
    slug: "ji-shan-diamond",
    category: "manufacturing",
    hero: {
      eyebrow: { en: "Diamond Tools & Superhard Materials · Shanxi, China", zh: "金刚石刀具与超硬材料 · 中国山西" },
      title: { en: "High-Performance Diamond Tools", zh: "高性能金刚石工具" },
      tagline: {
        en: "Diamond blades · grinding wheels · superhard materials",
        zh: "金刚石锯片 · 砂轮 · 超硬材料",
      },
    },
    stats: [
      { num: "99.9%", label: { en: "Synthetic Diamond Purity", zh: "合成金刚石纯度" } },
      { num: "30+", label: { en: "Export Countries", zh: "个出口国家" } },
      { num: "500+", label: { en: "Tool Specifications", zh: "款工具规格" } },
      { num: "24h", label: { en: "Technical Support", zh: "技术支持响应" } },
    ],
    products: [
      {
        name: { en: "Diamond Tools", zh: "金刚石工具" },
        tagline: { en: "Precision cutting & grinding", zh: "精密切割与磨削" },
        products: [
          {
            name: { en: "Diamond Saw Blades", zh: "金刚石锯片" },
            spec: { en: "Ø105–1600 mm", zh: "Ø105–1600 mm" },
            application: { en: "Stone & concrete cutting", zh: "石材与混凝土切割" },
          },
          {
            name: { en: "Grinding Wheels", zh: "金刚石砂轮" },
            spec: { en: "Resin / metal bond", zh: "树脂 / 金属结合剂" },
            application: { en: "Surface grinding", zh: "平面磨削" },
          },
          {
            name: { en: "Core Drills", zh: "金刚石钻头" },
            spec: { en: "Wet & dry · Ø20–200 mm", zh: "干湿两用 · Ø20–200 mm" },
            application: { en: "Concrete & masonry", zh: "混凝土与砌体" },
          },
        ],
      },
      {
        name: { en: "Superhard Materials", zh: "超硬材料" },
        tagline: { en: "Materials behind the tools", zh: "工具背后的核心材料" },
        products: [
          {
            name: { en: "PCD Tools", zh: "PCD 刀具" },
            spec: { en: "Polycrystalline diamond", zh: "聚晶金刚石" },
            application: { en: "Non-ferrous machining", zh: "有色金属加工" },
          },
          {
            name: { en: "Diamond Powder", zh: "金刚石微粉" },
            spec: { en: "W0.5–W60", zh: "W0.5–W60" },
            application: { en: "Polishing & lapping", zh: "抛光与研磨" },
          },
          {
            name: { en: "Abrasives", zh: "金刚石磨料" },
            spec: { en: "Mesh 20–400", zh: "20–400 目" },
            application: { en: "Industrial abrasives", zh: "工业磨料" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "From Jishan's superhard materials cluster, we engineer diamond tools and abrasives that keep cutting, grinding and drilling lines running across 30+ countries.",
        zh: "公司来自稷山超硬材料产业集群，我们研发的金刚石工具与磨料保障着 30+ 国家的切割、磨削与钻进产线。",
      },
      highlights: {
        en: ["Complete superhard material cluster supply", "Consistent batch quality", "OEM tooling with technical support"],
        zh: ["超硬材料全链条供应", "批次质量稳定", "OEM 定制与技术支持"],
      },
    },
    contact: { address: { en: "Jishan County, Yuncheng · Shanxi, China", zh: "山西省运城市稷山县" } },
  },
  {
    slug: "taiyuan-stainless",
    category: "manufacturing",
    hero: {
      eyebrow: { en: "Stainless Steel & Special Steel · Shanxi, China", zh: "不锈钢与特种钢 · 中国山西" },
      title: { en: "Stainless Products for Global Industry", zh: "服务全球工业的不锈钢制品" },
      tagline: {
        en: "Taigang-linked supply · precision components",
        zh: "依托太钢产业链 · 精密部件",
      },
    },
    stats: [
      { num: "SUS304/316", label: { en: "Main Grades", zh: "主要牌号" } },
      { num: "0.1 mm", label: { en: "Precision Tolerance", zh: "加工精度" } },
      { num: "25+", label: { en: "Export Countries", zh: "个出口国家" } },
      { num: "100%", label: { en: "Material Traceability", zh: "材质可追溯" } },
    ],
    products: [
      {
        name: { en: "Stainless Products", zh: "不锈钢制品" },
        tagline: { en: "From raw stock to finished parts", zh: "从原料到成品部件" },
        products: [
          {
            name: { en: "Coils & Sheets", zh: "卷板与板材" },
            spec: { en: "304 / 316 / 430 · 0.3–10 mm", zh: "304 / 316 / 430 · 0.3–10 mm" },
            application: { en: "Fabrication & appliances", zh: "加工与家电" },
          },
          {
            name: { en: "Precision Parts", zh: "精密部件" },
            spec: { en: "CNC machined · ±0.01 mm", zh: "CNC 加工 · ±0.01 mm" },
            application: { en: "Medical & automation", zh: "医疗与自动化" },
          },
          {
            name: { en: "Fasteners", zh: "不锈钢紧固件" },
            spec: { en: "304 / 316 · DIN/ISO", zh: "304 / 316 · DIN/ISO" },
            application: { en: "Corrosive environments", zh: "腐蚀性环境" },
          },
        ],
      },
      {
        name: { en: "Special Steel", zh: "特种钢" },
        tagline: { en: "Engineered grades for demanding use", zh: "面向严苛工况的工程牌号" },
        products: [
          {
            name: { en: "Tool Steel", zh: "工具钢" },
            spec: { en: "HSS · alloy tool steel", zh: "高速钢 · 合金工具钢" },
            application: { en: "Tooling & dies", zh: "模具与刀具" },
          },
          {
            name: { en: "Alloy Steel", zh: "合金钢" },
            spec: { en: "Custom heat treatment", zh: "可定制热处理" },
            application: { en: "Machinery components", zh: "机械部件" },
          },
          {
            name: { en: "Custom Components", zh: "定制部件" },
            spec: { en: "OEM/ODM per drawing", zh: "OEM/ODM 按图纸" },
            application: { en: "Specialty industries", zh: "特殊行业" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Riding the supply chain of China's leading stainless steel producer in Taiyuan, we transform special steel into precision parts for global manufacturers.",
        zh: "依托太原国内领先的不锈钢产业链，我们将特种钢加工为服务全球制造商的精密部件。",
      },
      highlights: {
        en: ["Direct Taigang-linked steel supply", "Full material certificates", "Precision machining to ±0.01 mm"],
        zh: ["太钢产业链直供", "材质证书齐全", "精密加工至 ±0.01 mm"],
      },
    },
    contact: { address: { en: "Taiyuan · Shanxi, China", zh: "山西省太原市" } },
  },

  // ============ T2 农副食品 ============
  {
    slug: "small-grains",
    category: "agri-food",
    hero: {
      eyebrow: { en: "Shanxi Small Grains · Highland Origin", zh: "山西小杂粮 · 高原产地" },
      title: { en: "Premium Millet & Grains from the Highlands", zh: "来自高原的优质小米与杂粮" },
      tagline: {
        en: "Jinzhou Huang millet · selenium-rich · traceable",
        zh: "沁州黄小米 · 富硒 · 全程可追溯",
      },
    },
    stats: [
      { num: "1,200m", label: { en: "Highland Farms", zh: "高原农场" } },
      { num: "1,000yr", label: { en: "Cultivation History", zh: "年种植历史" } },
      { num: "0.2 mg", label: { en: "Natural Selenium / kg", zh: "每公斤天然硒" } },
      { num: "18+", label: { en: "Export Countries", zh: "个出口国家" } },
    ],
    products: [
      {
        name: { en: "Millet Series", zh: "小米系列" },
        tagline: { en: "Fragrant, nutritious, traceable", zh: "香糯营养，可溯源" },
        products: [
          {
            name: { en: "Jinzhou Huang Millet", zh: "沁州黄小米" },
            spec: { en: "Geographic-indication grade", zh: "地理标志产品" },
            application: { en: "Gourmet & health food", zh: "高端与健康食品" },
          },
          {
            name: { en: "Selenium-rich Millet", zh: "富硒小米" },
            spec: { en: "Naturally selenium-rich", zh: "天然富硒" },
            application: { en: "Functional food channel", zh: "功能食品渠道" },
          },
          {
            name: { en: "Pearl Millet", zh: "珍珠小米" },
            spec: { en: "Polished & graded", zh: "精磨分级" },
            application: { en: "Retail bags & bulk", zh: "零售与散装" },
          },
        ],
      },
      {
        name: { en: "Grains & Beans", zh: "杂粮杂豆" },
        tagline: { en: "A complete highland grain pantry", zh: "高原杂粮全品类" },
        products: [
          {
            name: { en: "Black Rice", zh: "黑米" },
            spec: { en: "Whole grain · anthocyanin rich", zh: "全谷物 · 富含花青素" },
            application: { en: "Health food", zh: "健康食品" },
          },
          {
            name: { en: "Red Beans", zh: "红小豆" },
            spec: { en: "Even size · low impurity", zh: "颗粒均匀 · 杂质少" },
            application: { en: "Food processing", zh: "食品加工" },
          },
          {
            name: { en: "Grain Gift Sets", zh: "杂粮礼盒" },
            spec: { en: "5–8 variety combos", zh: "5–8 种组合" },
            application: { en: "Corporate gifting", zh: "企业礼赠" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Shanxi's highlands have grown small grains for over a thousand years. We partner with local farms to bring millet and selenium-rich grains from the field to your shelf — traceable to the very field.",
        zh: "山西高原种植小杂粮逾千年。我们与本地农场合作，将小米与富硒杂粮从田间带到您的货架——可精确溯源到地块。",
      },
      highlights: {
        en: ["1,000-year cultivation heritage", "Jinzhou Huang GI product", "Field-to-shelf traceability"],
        zh: ["千年种植传承", "沁州黄地理标志产品", "地块到货架全程溯源"],
      },
    },
    contact: { address: { en: "Qin County, Changzhi · Shanxi, China", zh: "山西省长治市沁县" } },
  },
  {
    slug: "forest-fruit",
    category: "agri-food",
    hero: {
      eyebrow: { en: "Sea Buckthorn & Forest Fruits · Shanxi, China", zh: "沙棘与林果 · 中国山西" },
      title: { en: "Wild Harvest, Naturally Rich", zh: "野生采摘，天然营养" },
      tagline: {
        en: "Wild sea buckthorn · apples · red dates",
        zh: "野生沙棘 · 苹果 · 红枣",
      },
    },
    stats: [
      { num: "100%", label: { en: "Wild-harvested", zh: "野生采摘" } },
      { num: "1,500m", label: { en: "Mountain Orchards", zh: "高山果园" } },
      { num: "VC 900+", label: { en: "mg/100g Sea Buckthorn", zh: "沙棘每百克维C" } },
      { num: "25+", label: { en: "Export Countries", zh: "个出口国家" } },
    ],
    products: [
      {
        name: { en: "Sea Buckthorn", zh: "沙棘系列" },
        tagline: { en: "From wild mountains to wellness", zh: "从野山到健康生活" },
        products: [
          {
            name: { en: "Sea Buckthorn Juice", zh: "沙棘汁" },
            spec: { en: "NFC · no added sugar", zh: "NFC 工艺 · 无添加糖" },
            application: { en: "300ml bottle · private label", zh: "300ml 瓶装 · 可贴牌" },
          },
          {
            name: { en: "Sea Buckthorn Seed Oil", zh: "沙棘籽油" },
            spec: { en: "Cold-pressed · Omega-7", zh: "冷榨 · 富含 Omega-7" },
            application: { en: "Health supplements", zh: "保健品原料" },
          },
          {
            name: { en: "Berry Powder", zh: "沙棘冻干粉" },
            spec: { en: "Freeze-dried · 100% berry", zh: "冻干 · 纯果粉" },
            application: { en: "Smoothies & supplements", zh: "冲饮与膳食补充" },
          },
        ],
      },
      {
        name: { en: "Orchard Fruits", zh: "果园鲜果" },
        tagline: { en: "Sun-ripened, export graded", zh: "阳光催熟，出口分级" },
        products: [
          {
            name: { en: "Yuncheng Apples", zh: "运城苹果" },
            spec: { en: "GI product · 80–100 mm", zh: "地理标志 · 80–100 mm" },
            application: { en: "Fresh export", zh: "鲜果出口" },
          },
          {
            name: { en: "Dried Red Jujube", zh: "红枣干" },
            spec: { en: "Sun-dried · pitted options", zh: "自然晾晒 · 可选去核" },
            application: { en: "Snacks & bakery", zh: "零食与烘焙" },
          },
          {
            name: { en: "Fruit Snacks", zh: "果干零食" },
            spec: { en: "No preservatives", zh: "无防腐剂" },
            application: { en: "Retail ready packs", zh: "零售小包装" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "In the mountains of Lvliang and the orchards of Yuncheng, we harvest wild sea buckthorn and sun-ripened fruits that carry the clean taste of northern China to global shelves.",
        zh: "在吕梁山间与运城果园，我们采摘野生沙棘与阳光催熟的水果，把中国北方的清新滋味带到全球货架。",
      },
      highlights: {
        en: ["Wild sea buckthorn, naturally rich in VC", "GI Yuncheng apples", "Cold-chain export logistics"],
        zh: ["野生沙棘，天然高维C", "运城苹果地理标志", "冷链出口物流"],
      },
    },
    contact: { address: { en: "Lvliang & Yuncheng · Shanxi, China", zh: "山西省吕梁 / 运城" } },
  },
  {
    slug: "qing-xu-vinegar",
    category: "agri-food",
    hero: {
      eyebrow: { en: "Aged Vinegar · Qingxu, Shanxi", zh: "老陈醋 · 山西清徐" },
      title: { en: "China's Famous Aged Vinegar", zh: "中国名醋，岁月陈香" },
      tagline: {
        en: "6-year solid-state fermentation · 500 years of craft",
        zh: "固态发酵六年 · 五百年酿造技艺",
      },
    },
    stats: [
      { num: "6yr+", label: { en: "Minimum Aging", zh: "最低陈酿年限" } },
      { num: "500yr", label: { en: "Craft Heritage", zh: "年酿造传承" } },
      { num: "36+", label: { en: "Export Countries", zh: "个出口国家" } },
      { num: "0%", label: { en: "Added Preservatives", zh: "添加防腐剂" } },
    ],
    products: [
      {
        name: { en: "Aged Vinegar", zh: "老陈醋" },
        tagline: { en: "Aged in the traditional way", zh: "传统工艺陈酿" },
        products: [
          {
            name: { en: "6-Year Aged Vinegar", zh: "六年陈醋" },
            spec: { en: "≥6.0 g/100ml acidity", zh: "总酸 ≥6.0 g/100ml" },
            application: { en: "Cooking & dipping", zh: "烹饪与蘸食" },
          },
          {
            name: { en: "10-Year Aged Vinegar", zh: "十年陈醋" },
            spec: { en: "Concentrated · mellow", zh: "浓缩醇厚" },
            application: { en: "Premium gifting", zh: "高端礼赠" },
          },
          {
            name: { en: "Balsamic-style Vinegar", zh: "风味醋" },
            spec: { en: "Blended for Western cuisine", zh: "适配西餐风味" },
            application: { en: "Salads & marinades", zh: "沙拉与腌制" },
          },
        ],
      },
      {
        name: { en: "Vinegar Drinks & Food", zh: "醋饮与醋食" },
        tagline: { en: "Wellness beyond the kitchen", zh: "走出厨房的健康" },
        products: [
          {
            name: { en: "Vinegar Beverage", zh: "醋饮料" },
            spec: { en: "Fruit-flavored · low sugar", zh: "果味 · 低糖" },
            application: { en: "Beverage channel", zh: "饮品渠道" },
          },
          {
            name: { en: "Vinegar-pickled Foods", zh: "醋泡食品" },
            spec: { en: "Garlic, ginger, black beans", zh: "醋蒜、醋姜、醋豆" },
            application: { en: "Retail snacks", zh: "零售零食" },
          },
          {
            name: { en: "Gift Packs", zh: "醋礼盒" },
            spec: { en: "Curated aging sets", zh: "多年份组合" },
            application: { en: "Corporate gifting", zh: "企业礼赠" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Qingxu has brewed vinegar for over 500 years. We keep the traditional solid-state fermentation alive, aging every batch in the sun for at least six years — rich, mellow and preservative-free.",
        zh: "清徐酿醋已有五百余年历史。我们坚持传统固态发酵，让每一批醋在阳光下至少陈酿六年——酸香醇厚，零添加。",
      },
      highlights: {
        en: ["500-year brewing heritage", "6+ year traditional aging", "Export grade, preservative-free"],
        zh: ["五百年酿造传承", "传统工艺陈酿六年以上", "出口级 · 零添加防腐剂"],
      },
    },
    contact: { address: { en: "Qingxu County, Taiyuan · Shanxi, China", zh: "山西省太原市清徐县" } },
  },
  {
    slug: "meat-products",
    category: "agri-food",
    hero: {
      eyebrow: { en: "Pingyao Beef & Lamb Specialties · Shanxi, China", zh: "平遥牛肉与羊肉制品 · 中国山西" },
      title: { en: "Traditional Cured Meat, Modern Safety", zh: "传统肉食工艺，现代安全标准" },
      tagline: {
        en: "Pingyao beef · lamb · export-grade processing",
        zh: "平遥牛肉 · 羊肉 · 出口级加工",
      },
    },
    stats: [
      { num: "GI", label: { en: "Pingyao Beef Status", zh: "平遥牛肉地理标志" } },
      { num: "100%", label: { en: "Traceable Supply", zh: "原料可追溯" } },
      { num: "12+", label: { en: "Export Countries", zh: "个出口国家" } },
      { num: "HACCP", label: { en: "Certified Plant", zh: "认证工厂" } },
    ],
    products: [
      {
        name: { en: "Pingyao Beef", zh: "平遥牛肉" },
        tagline: { en: "A 300-year-old classic recipe", zh: "三百年经典工艺" },
        products: [
          {
            name: { en: "Classic Cured Beef", zh: "经典卤牛肉" },
            spec: { en: "Traditional recipe · vacuum pack", zh: "传统配方 · 真空包装" },
            application: { en: "Deli & snacks", zh: "熟食与零食" },
          },
          {
            name: { en: "Spiced Beef", zh: "五香牛肉" },
            spec: { en: "Ready-to-eat slices", zh: "即食切片" },
            application: { en: "Retail & travel", zh: "零售与旅行" },
          },
          {
            name: { en: "Beef Gift Boxes", zh: "牛肉礼盒" },
            spec: { en: "Premium selection", zh: "精选组合" },
            application: { en: "Corporate gifting", zh: "企业礼赠" },
          },
        ],
      },
      {
        name: { en: "Lamb & Prepared Meat", zh: "羊肉与肉制品" },
        tagline: { en: "From Shanxi pastures", zh: "来自山西牧场" },
        products: [
          {
            name: { en: "Lamb Cuts", zh: "羊肉分割" },
            spec: { en: "Chilled & frozen", zh: "冰鲜与冷冻" },
            application: { en: "Wholesale & retail", zh: "批发与零售" },
          },
          {
            name: { en: "Ready-to-eat Meals", zh: "即食肉品" },
            spec: { en: "Long shelf life", zh: "长保质期" },
            application: { en: "Convenience channel", zh: "便利渠道" },
          },
          {
            name: { en: "Deli Products", zh: "熟食制品" },
            spec: { en: "Custom recipes available", zh: "可定制配方" },
            application: { en: "Food service", zh: "餐饮供应" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "From the ancient city of Pingyao, our plant turns a 300-year-old beef recipe into export-grade products — combining heritage flavor with HACCP-standard safety and full supply traceability.",
        zh: "从平遥古城出发，我们将传承三百年的牛肉配方转化为出口级产品——传统风味与 HACCP 安全标准、全链条溯源兼得。",
      },
      highlights: {
        en: ["Pingyao beef GI product", "HACCP certified processing", "Vacuum-packed for global shelf life"],
        zh: ["平遥牛肉地理标志产品", "HACCP 认证加工", "真空包装，适合全球货架"],
      },
    },
    contact: { address: { en: "Pingyao County, Jinzhong · Shanxi, China", zh: "山西省晋中市平遥县" } },
  },

  // ============ T3 科技新材料 ============
  {
    slug: "chang-zhi-led",
    category: "new-material",
    hero: {
      eyebrow: { en: "LED & Deep-UV Optoelectronics · Shanxi, China", zh: "LED 与深紫外光电 · 中国山西" },
      title: { en: "Advanced LED Solutions, Data-Driven", zh: "先进 LED 解决方案，数据驱动" },
      tagline: {
        en: "Deep-UV LED global leader · 95% of Shanxi LED output",
        zh: "深紫外 LED 全球领先 · 占山西 LED 产值 95%",
      },
    },
    stats: [
      { num: "95%+", label: { en: "of Shanxi LED Output", zh: "占全省 LED 产值" } },
      { num: "265 nm", label: { en: "UVC Wavelength", zh: "UVC 波长" } },
      { num: "10,000h", label: { en: "Rated Lifetime", zh: "额定寿命" } },
      { num: "60+", label: { en: "Patents", zh: "项专利" } },
    ],
    products: [
      {
        name: { en: "Deep-UV LED", zh: "深紫外 LED" },
        tagline: { en: "Disinfection-grade UVC, verified data", zh: "消毒级 UVC，数据可验证" },
        products: [
          {
            name: { en: "UVC LED Chips", zh: "UVC 灯珠" },
            spec: { en: "265 nm · 20–100 mW", zh: "265 nm · 20–100 mW" },
            application: { en: "Sterilization modules", zh: "消毒模组" },
          },
          {
            name: { en: "UVC Modules", zh: "UVC 模组" },
            spec: { en: "Waterproof · 12–48 V", zh: "防水 · 12–48 V" },
            application: { en: "Air & water treatment", zh: "空气与水处理" },
          },
          {
            name: { en: "Water Purification Modules", zh: "净水消毒模组" },
            spec: { en: "Flow-through design", zh: "过流式设计" },
            application: { en: "Drinking water systems", zh: "饮用水系统" },
          },
        ],
      },
      {
        name: { en: "LED Lighting", zh: "LED 照明" },
        tagline: { en: "Efficient lighting for every scene", zh: "高效照明，覆盖全场景" },
        products: [
          {
            name: { en: "LED Tubes", zh: "LED 灯管" },
            spec: { en: "T8 · 120–200 lm/W", zh: "T8 · 120–200 lm/W" },
            application: { en: "Industrial & commercial", zh: "工业与商用" },
          },
          {
            name: { en: "Plant Grow Lights", zh: "植物生长灯" },
            spec: { en: "Full spectrum · PPF rated", zh: "全光谱 · PPF 标定" },
            application: { en: "Greenhouse & vertical farm", zh: "温室与垂直农场" },
          },
          {
            name: { en: "Custom Modules", zh: "定制模组" },
            spec: { en: "Wavelength & power custom", zh: "波长与功率可定制" },
            application: { en: "OEM/ODM projects", zh: "OEM/ODM 项目" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "In Changzhi — home to 95% of Shanxi's LED output — our labs push deep-UV technology forward with a leading global patent portfolio and production-scale reliability.",
        zh: "在长治——山西 95% LED 产值的诞生地，我们的实验室以全球领先的专利组合与量产可靠性，推动深紫外技术不断向前。",
      },
      highlights: {
        en: ["Deep-UV LED global leader", "60+ patents & in-house labs", "Third-party test reports included"],
        zh: ["深紫外 LED 全球领先", "60+ 专利与自有实验室", "附带第三方测试报告"],
      },
    },
    contact: { address: { en: "Changzhi · Shanxi, China", zh: "山西省长治市" } },
  },
  {
    slug: "jincheng-optoelectronics",
    category: "new-material",
    hero: {
      eyebrow: { en: "Consumer Electronics & Smart Devices · Shanxi, China", zh: "消费电子与智能设备 · 中国山西" },
      title: { en: "Smart Consumer Electronics, Global-Ready", zh: "面向全球的智能消费电子" },
      tagline: {
        en: "AI cameras · Bluetooth speakers · small appliances",
        zh: "AI 相机 · 蓝牙音箱 · 小家电",
      },
    },
    stats: [
      { num: "10+", label: { en: "Product Lines", zh: "条产品线" } },
      { num: "CE/FCC", label: { en: "Certified Products", zh: "认证产品" } },
      { num: "40+", label: { en: "Export Countries", zh: "个出口国家" } },
      { num: "2yr", label: { en: "Warranty", zh: "质保期" } },
    ],
    products: [
      {
        name: { en: "Consumer Electronics", zh: "消费电子" },
        tagline: { en: "Smart devices people love", zh: "广受欢迎的智能设备" },
        products: [
          {
            name: { en: "AI Kids Camera", zh: "AI 儿童相机" },
            spec: { en: "AI effects · safe materials", zh: "AI 特效 · 安全材质" },
            application: { en: "Kids & family retail", zh: "亲子零售" },
          },
          {
            name: { en: "Bluetooth Speakers", zh: "蓝牙音箱" },
            spec: { en: "IPX5 · 10h battery", zh: "IPX5 防水 · 10 小时续航" },
            application: { en: "Consumer electronics", zh: "消费电子" },
          },
          {
            name: { en: "Smart Desk Lamps", zh: "智能台灯" },
            spec: { en: "Eye-care · wireless charge", zh: "护眼 · 支持无线充电" },
            application: { en: "Office & study", zh: "办公与学习" },
          },
        ],
      },
      {
        name: { en: "Small Appliances", zh: "小家电" },
        tagline: { en: "Compact, powerful, export-certified", zh: "小巧强劲，出口认证" },
        products: [
          {
            name: { en: "Portable Blenders", zh: "便携冰沙机" },
            spec: { en: "USB-C · 400 ml", zh: "USB-C · 400 ml" },
            application: { en: "Healthy living", zh: "健康生活" },
          },
          {
            name: { en: "Juicers", zh: "榨汁机" },
            spec: { en: "Slow masticating", zh: "慢速冷压" },
            application: { en: "Home kitchen", zh: "家庭厨房" },
          },
          {
            name: { en: "Custom OEM", zh: "OEM 定制" },
            spec: { en: "Design & manufacturing", zh: "设计与制造一体" },
            application: { en: "Brand partners", zh: "品牌伙伴" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "From Jincheng's optoelectronics cluster, we design and manufacture consumer electronics that combine smart features with reliable quality — exported to 40+ countries under our own and partner brands.",
        zh: "来自晋城光机电产业集群，我们设计并制造兼具智能功能与可靠品质的消费电子，以自有与伙伴品牌出口 40+ 国家。",
      },
      highlights: {
        en: ["Fast-moving consumer electronics", "CE/FCC/UL certified", "OEM/ODM design-to-manufacturing"],
        zh: ["出海增速快的消费电子", "CE/FCC/UL 认证", "OEM/ODM 设计制造一体"],
      },
    },
    contact: { address: { en: "Jincheng · Shanxi, China", zh: "山西省晋城市" } },
  },
  {
    slug: "new-materials",
    category: "new-material",
    hero: {
      eyebrow: { en: "Advanced New Materials · Shanxi, China", zh: "先进新材料 · 中国山西" },
      title: { en: "Semiconductor & Composite Materials", zh: "半导体与复合材料" },
      tagline: {
        en: "Semiconductor materials · carbon fiber · sapphire crystals",
        zh: "半导体材料 · 碳纤维 · 蓝宝石晶体",
      },
    },
    stats: [
      { num: "99.99%", label: { en: "Material Purity", zh: "材料纯度" } },
      { num: "40+", label: { en: "Patents", zh: "项专利" } },
      { num: "2–6\"", label: { en: "Sapphire Substrates", zh: "蓝宝石衬底" } },
      { num: "25+", label: { en: "Countries Served", zh: "个服务国家" } },
    ],
    products: [
      {
        name: { en: "Semiconductor Materials", zh: "半导体材料" },
        tagline: { en: "High purity, batch consistent", zh: "高纯度，批次稳定" },
        products: [
          {
            name: { en: "Silicon Carbide", zh: "碳化硅" },
            spec: { en: "4H/6H · high purity", zh: "4H/6H · 高纯" },
            application: { en: "Power electronics", zh: "功率电子" },
          },
          {
            name: { en: "Sapphire Substrates", zh: "蓝宝石衬底" },
            spec: { en: "2–6 inch · EPI-ready", zh: "2–6 英寸 · 外延级" },
            application: { en: "LED & semiconductor", zh: "LED 与半导体" },
          },
          {
            name: { en: "High-purity Chemicals", zh: "高纯材料" },
            spec: { en: "99.99%+ purity", zh: "纯度 99.99%+" },
            application: { en: "Crystal growth", zh: "晶体生长" },
          },
        ],
      },
      {
        name: { en: "Composites & Alloys", zh: "复合材料与合金" },
        tagline: { en: "Lightweight, high-strength solutions", zh: "轻量高强解决方案" },
        products: [
          {
            name: { en: "Carbon Fiber", zh: "碳纤维" },
            spec: { en: "T300–T800 · custom prepreg", zh: "T300–T800 · 预浸料定制" },
            application: { en: "Aerospace & automotive", zh: "航空航天与汽车" },
          },
          {
            name: { en: "Aluminum-Magnesium Alloy", zh: "铝镁合金" },
            spec: { en: "Lightweight · high strength", zh: "轻量化 · 高强度" },
            application: { en: "Structural components", zh: "结构部件" },
          },
          {
            name: { en: "Custom Processing", zh: "定制加工" },
            spec: { en: "Per drawing & spec", zh: "按图纸与规格" },
            application: { en: "R&D & production", zh: "研发与量产" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "Shanxi's new-materials industry spans semiconductor, carbon fiber, sapphire and light alloys. Our team turns these advanced materials into reliable supply for global engineers.",
        zh: "山西新材料产业横跨半导体、碳纤维、蓝宝石与轻合金。我们团队将这些先进材料转化为服务全球工程师的可靠供应。",
      },
      highlights: {
        en: ["High-purity, batch-consistent supply", "In-house labs & 40+ patents", "Custom processing supported"],
        zh: ["高纯度、批次稳定供应", "自有实验室与 40+ 专利", "支持定制加工"],
      },
    },
    contact: { address: { en: "Taiyuan & Lvliang · Shanxi, China", zh: "山西省太原 / 吕梁" } },
  },

  // ============ T4 文化工艺 ============
  {
    slug: "ping-yao-lacquer",
    category: "crafts",
    hero: {
      eyebrow: { en: "Pingyao Lacquerware · National ICH · Shanxi, China", zh: "平遥推光漆器 · 国家级非遗 · 中国山西" },
      title: { en: "Lacquerware Painted by Light", zh: "以光推就的漆艺珍品" },
      tagline: {
        en: "National ICH · hand-polished · collector-grade",
        zh: "国家级非遗 · 手工推光 · 收藏级品质",
      },
    },
    stats: [
      { num: "ICH", label: { en: "National Heritage Status", zh: "国家级非遗" } },
      { num: "60+", label: { en: "Craft Steps", zh: "道工序" } },
      { num: "20+", label: { en: "Years of Mastery", zh: "匠人平均从业" } },
      { num: "30+", label: { en: "Countries Collected", zh: "个收藏国家" } },
    ],
    products: [
      {
        name: { en: "Lacquerware", zh: "推光漆器" },
        tagline: { en: "Hand-polished to a mirror glow", zh: "手工推光，镜面光泽" },
        products: [
          {
            name: { en: "Jewelry Boxes", zh: "首饰盒" },
            spec: { en: "Hand-polished · inlaid", zh: "手工推光 · 镶嵌工艺" },
            application: { en: "Collector & gifting", zh: "收藏与礼赠" },
          },
          {
            name: { en: "Folding Screens", zh: "漆艺屏风" },
            spec: { en: "Hand-painted · 2–6 panels", zh: "手绘 · 2–6 扇" },
            application: { en: "Interior decor", zh: "家居陈设" },
          },
          {
            name: { en: "Trays & Cases", zh: "漆盘与漆匣" },
            spec: { en: "Daily-use heritage pieces", zh: "日用传世之作" },
            application: { en: "Home & office", zh: "家居与办公" },
          },
        ],
      },
      {
        name: { en: "Lacquer Paintings", zh: "漆画" },
        tagline: { en: "Art from the workshop walls", zh: "工坊墙上走出的艺术" },
        products: [
          {
            name: { en: "Landscape Panels", zh: "山水漆画" },
            spec: { en: "Traditional lacquer on wood", zh: "传统大漆木板" },
            application: { en: "Gallery & private collection", zh: "画廊与私藏" },
          },
          {
            name: { en: "Portrait Art", zh: "人物漆画" },
            spec: { en: "Fine brushwork", zh: "精工笔法" },
            application: { en: "Commissioned works", zh: "定制作品" },
          },
          {
            name: { en: "Custom Commissions", zh: "主题定制" },
            spec: { en: "Themes & sizes customizable", zh: "主题与尺寸可定制" },
            application: { en: "Corporate & private", zh: "企业与个人" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "From the ancient city of Pingyao, our workshop keeps the national intangible heritage of tuiguang (hand-polished) lacquer alive — each piece polished to a mirror glow by master artisans.",
        zh: "在平遥古城，我们的工坊延续着国家级非遗推光漆器技艺——每件作品都由匠人手工推光至镜面般的光泽。",
      },
      highlights: {
        en: ["National intangible cultural heritage", "Certificate of authenticity included", "Custom, limited & gift packaging"],
        zh: ["国家级非物质文化遗产", "附收藏证书", "支持定制、限量与礼盒包装"],
      },
    },
    contact: { address: { en: "Pingyao County, Jinzhong · Shanxi, China", zh: "山西省晋中市平遥县" } },
  },
  {
    slug: "gao-ping-lu-silk",
    category: "crafts",
    hero: {
      eyebrow: { en: "Lu Silk · 1,000 Years of Weaving · Shanxi, China", zh: "高平潞绸 · 千年织造 · 中国山西" },
      title: { en: "Northern China's Silk Heritage", zh: "北方丝绸的千年传承" },
      tagline: {
        en: "Hand-woven Lu silk · scarves & textiles",
        zh: "手工织造潞绸 · 丝巾与织品",
      },
    },
    stats: [
      { num: "1,000yr", label: { en: "Weaving History", zh: "年织造历史" } },
      { num: "100%", label: { en: "Natural Silk", zh: "天然蚕丝" } },
      { num: "40+", label: { en: "Steps per Piece", zh: "道工序" } },
      { num: "15+", label: { en: "Countries Collected", zh: "个收藏国家" } },
    ],
    products: [
      {
        name: { en: "Silk Textiles", zh: "丝绸织品" },
        tagline: { en: "Woven with heritage techniques", zh: "传承工艺织造" },
        products: [
          {
            name: { en: "Lu Silk Fabric", zh: "潞绸面料" },
            spec: { en: "Mulberry silk · heritage loom", zh: "桑蚕丝 · 传统织机" },
            application: { en: "Tailoring & décor", zh: "服装与装饰" },
          },
          {
            name: { en: "Silk Scarves", zh: "真丝丝巾" },
            spec: { en: "Hand-rolled edges", zh: "手工卷边" },
            application: { en: "Fashion & gifting", zh: "时尚与礼赠" },
          },
          {
            name: { en: "Silk Cushions", zh: "丝绸靠垫" },
            spec: { en: "Embroidered · silk-filled", zh: "刺绣 · 蚕丝填充" },
            application: { en: "Home décor", zh: "家居装饰" },
          },
        ],
      },
      {
        name: { en: "Cultural Products", zh: "文化产品" },
        tagline: { en: "Silk as cultural expression", zh: "以丝绸表达文化" },
        products: [
          {
            name: { en: "Silk Wall Art", zh: "丝织画" },
            spec: { en: "Heritage patterns", zh: "传统纹样" },
            application: { en: "Gallery & collection", zh: "画廊与收藏" },
          },
          {
            name: { en: "Gift Collections", zh: "礼品套装" },
            spec: { en: "Curated silk sets", zh: "精选组合" },
            application: { en: "Corporate gifting", zh: "企业礼赠" },
          },
          {
            name: { en: "Custom Weaving", zh: "定制织造" },
            spec: { en: "Patterns & colors custom", zh: "纹样与配色可定制" },
            application: { en: "Commissions", zh: "委托定制" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "For a thousand years, Gaoping's Lu silk has carried the story of northern Chinese weaving. Our looms keep the heritage alive, producing silk with the depth and character only tradition can give.",
        zh: "千年来，高平潞绸承载着中国北方织造的故事。我们的织机延续着这份传承，织出只有传统才能赋予的质感与韵味。",
      },
      highlights: {
        en: ["1,000-year Lu silk heritage", "100% mulberry silk", "Custom weaving & gift services"],
        zh: ["千年潞绸传承", "100% 桑蚕丝", "支持定制织造与礼赠"],
      },
    },
    contact: { address: { en: "Gaoping, Jincheng · Shanxi, China", zh: "山西省晋城市高平" } },
  },
  {
    slug: "ding-xiang-wood",
    category: "crafts",
    hero: {
      eyebrow: { en: "Woodcraft & Classical Furniture · Shanxi, China", zh: "木器与古典家具 · 中国山西" },
      title: { en: "Timeless Wood, Modern Living", zh: "传世之木，装点现代生活" },
      tagline: {
        en: "Classical furniture · carved crafts · practical & collectible",
        zh: "古典家具 · 木雕工艺 · 实用与收藏兼得",
      },
    },
    stats: [
      { num: "30yr", label: { en: "Woodcraft Heritage", zh: "年木作传承" } },
      { num: "100%", label: { en: "Hand Finished", zh: "手工精修" } },
      { num: "5yr", label: { en: "Average Training", zh: "匠人平均学艺" } },
      { num: "15+", label: { en: "Export Countries", zh: "个出口国家" } },
    ],
    products: [
      {
        name: { en: "Wood Crafts", zh: "木制工艺品" },
        tagline: { en: "Carved with patience", zh: "以耐心雕琢" },
        products: [
          {
            name: { en: "Carved Ornaments", zh: "木雕摆件" },
            spec: { en: "Hand-carved · selected woods", zh: "手工雕刻 · 精选木材" },
            application: { en: "Home & office décor", zh: "家居与办公陈设" },
          },
          {
            name: { en: "Wooden Giftware", zh: "木艺礼品" },
            spec: { en: "Practical & elegant", zh: "实用与雅致兼得" },
            application: { en: "Gifting", zh: "礼赠" },
          },
          {
            name: { en: "Home Décor", zh: "家居木艺" },
            spec: { en: "Modern-classical blend", zh: "现代与古典融合" },
            application: { en: "Interior design", zh: "室内设计" },
          },
        ],
      },
      {
        name: { en: "Classical Furniture", zh: "古典家具" },
        tagline: { en: "Built to last generations", zh: "可传代的工艺" },
        products: [
          {
            name: { en: "Classical Chairs", zh: "古典座椅" },
            spec: { en: "Mortise & tenon joinery", zh: "榫卯结构" },
            application: { en: "Collector & living", zh: "收藏与居用" },
          },
          {
            name: { en: "Tables & Cabinets", zh: "桌案与柜架" },
            spec: { en: "Solid wood · hand finished", zh: "实木 · 手工精修" },
            application: { en: "Home & studio", zh: "家居与工作室" },
          },
          {
            name: { en: "Custom Furniture", zh: "定制家具" },
            spec: { en: "Per size & style", zh: "尺寸与风格可定制" },
            application: { en: "Commissions", zh: "委托定制" },
          },
        ],
      },
    ],
    about: {
      story: {
        en: "In Dingxiang, where woodcraft has thrived for generations, our workshops shape classical furniture and carved crafts — pieces that are as practical as they are collectible.",
        zh: "在木作技艺代代相传的定襄，我们的工坊打造古典家具与木雕工艺品——既实用，又值得收藏。",
      },
      highlights: {
        en: ["Generations of woodcraft skill", "Traditional joinery, hand finished", "Custom furniture commissions"],
        zh: ["世代相传的木作技艺", "传统榫卯，手工精修", "支持家具定制"],
      },
    },
    contact: { address: { en: "Dingxiang County, Xinzhou · Shanxi, China", zh: "山西省忻州市定襄县" } },
  },
];
