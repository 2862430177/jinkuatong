// 企业数据（对应需求文档 §7.3 / §7.5）
// 说明：
// - 2026-09-02 起扩展为"4 大类 × 每类 Top50 = 200 家"集成口径（todo A1 决策）：
//   基础 40 家（原有）+ 新增 160 家（见 ./companies-extra，真实归类 2 家 + 产业名占位 158 家）。
//   其中已核实真实企业（含独立站渠道）约 20 家，其余 pending（待核验/待认领，作为销售线索库展示）。
//   全省备案企业 1963 家口径：已集成 200 家，其余约 1760 家列入待集成池（src/data/registry.ts + /registry 页）。
// - 2026-09-01 盘点（docs/site-inventory.md）：20 家已替换/补全为已核实真实企业（含独立站渠道，
//   note 标注核验日期；当日复核中科潞安 luan-uv.com、潞安府潞绸 silkhemp.com 后由 pending 转 verified，
//   旧域名 jilier.com 失效）。
// - 2026-09-02 核验替换（按 A1 口径公开核验）：T3 8 家占位全部替换为真实企业（高科华兴电子/星心半导体/
//   中科创源/鼎澜科技/烁科晶体/钢科碳材料/鼎芯晶体/元泰高导），其中鼎澜科技、鼎芯晶体暂未核验到独立官网，
//   仍标 pending（名称/区位已核验）；T4 8 家占位替换 2 家真实企业（永隆漆艺 51sole 店铺、雅艺轩制砚 yayixuan.com），
//   其余 6 家未核验到独立官网的企业补充核验说明后保留待认领。核验详情见 docs/site-inventory.md。
// - 2026-09-02 深度分析（B4，脚本 scripts/analyze-sites.ts）：逐站抓取 30 URL 核验技术栈/SEO/转化，
//   结论与 A/B 两档优化方案见 docs/D3-optimization.md；发现 3 个疑点站已在本文件 note 标注
//   （朔美羊肉业主机默认页、博达双站 923B 跳转页、坚博士默认模板页），待人工复核后更新状态。
// - 有独立站的企业：需按需求文档 §4.5 流程参考其现有站点做进一步优化。
// - 待认领（pending）企业：仅占位展示，点击可查看按所属行业模板（T1–T4）生成的独立站效果。
import type { TemplateKey } from "./templates";
import { extraCompanies } from "./companies-extra";

export type ChannelType = "official" | "english" | "cross-border" | "b2b-platform";
export type VerifyStatus = "verified" | "pending";

/** 渠道类型中文名（用于筛选选项与标签展示，todo C1 复用） */
export const channelTypeNames: Record<ChannelType, string> = {
  official: "企业官网",
  english: "英文站",
  "cross-border": "跨境独立站",
  "b2b-platform": "B2B 平台店铺",
};

export interface CompanyChannel {
  type: ChannelType;
  /** 如 '官网' / '英文站' */
  label: string;
  url: string;
  note?: string;
}

export interface Company {
  /** 唯一标识 */
  slug: string;
  /** 企业名 */
  name: string;
  /** 所属产业带 slug */
  beltSlug: string;
  /** 适用模板（T1–T4），渲染时切换页面风格 */
  template: TemplateKey;
  /** 所在地 */
  location: string;
  /** 简介 */
  intro: string;
  /** 出海渠道 */
  channels: CompanyChannel[];
  /** 已核验 / 待认领 */
  verifyStatus: VerifyStatus;
  /** 是否已被企业认领 */
  claimed?: boolean;
}

/** 企业 Top10 清单（四大类 × 10 家） */
export const companies: Company[] = [
  // ============ 传统制造与工业品（T1）Top10 ============
  {
    slug: "da-hua-glass",
    name: "大华玻璃",
    beltSlug: "qi-xian-glass",
    template: "t1-industrial",
    location: "晋中·祁县",
    intro: "祁县玻璃器皿头部企业，主营人工吹制玻璃器皿，产品覆盖全球 80+ 国家。",
    channels: [
      { type: "official", label: "官网", url: "https://www.dahuaglass.com", note: "中文站（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "guan-li-flange",
    name: "冠力法兰",
    beltSlug: "ding-xiang-flange",
    template: "t1-industrial",
    location: "忻州·定襄",
    intro: "定襄法兰代表企业，法兰与锻件出口，建有中英双语站。",
    channels: [
      { type: "official", label: "官网", url: "https://www.sxguanliflange.com", note: "中文站（已核验 2026-09-01）" },
      { type: "english", label: "英文站", url: "https://en.sxguanliflange.com", note: "英文站（已核验）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "bo-da-ceramics",
    name: "博达瓷业",
    beltSlug: "huai-ren-ceramic",
    template: "t1-industrial",
    location: "朔州·应县",
    intro: "应县日用陶瓷代表企业，高压/空心注浆瓷出口美国、日本、德国等 50+ 国家。",
    channels: [
      // 2026-09-02 深度分析：双站均返回 923B 同内容页（title"应县博达瓷业有限公司-首页"），BODA ARTS 英文品牌站名不副实，待人工复核
      { type: "official", label: "官网", url: "https://www.boda-arts.com", note: "BODA ARTS（已核验 2026-09-01；2026-09-02 深度分析：与应县站同内容跳转页，待复核）" },
      { type: "official", label: "官网", url: "https://www.boda-yingxian.com", note: "应县站（已核验 2026-09-01；2026-09-02 深度分析：923B 占位页，待复核）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "zun-yi-ceramics",
    name: "尊屹陶瓷",
    beltSlug: "huai-ren-ceramic",
    template: "t1-industrial",
    location: "朔州·怀仁",
    intro: "怀仁金沙滩陶瓷工业园代表企业，日用陶瓷研发、生产与出口。",
    // 注：2026-08-31 check-links 以 HEAD 请求误判失效被剔除；2026-09-01 复核 GET 存活，已恢复并修复巡检脚本（HEAD 失败回退 GET）
    channels: [
      { type: "official", label: "官网", url: "http://zunyiceramic.com/cn/", note: "中文站（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "qi-xian-hongchang",
    name: "山西宏艺玻璃",
    beltSlug: "qi-xian-glass",
    template: "t1-industrial",
    location: "晋中·祁县",
    intro: "祁县玻璃产业带代表企业，人工吹制/机压/离心甩制玻璃器皿，出口多国。",
    channels: [
      { type: "official", label: "官网", url: "http://www.hy-group.cn/", note: "官网（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "ding-xiang-hengda",
    name: "管家营法兰",
    beltSlug: "ding-xiang-flange",
    template: "t1-industrial",
    location: "忻州·定襄",
    intro: "定襄法兰产业带代表企业，锻钢法兰与锻件 95% 出口欧美、中东等市场。",
    channels: [
      { type: "official", label: "官网", url: "https://cn.gjyff.com/", note: "中文站（已核验 2026-09-01）" },
      { type: "english", label: "英文站", url: "https://www.gjyff.com/", note: "GJY FLANGE 英文站（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "yan-hu-yongji",
    name: "山西天海泵业",
    beltSlug: "yan-hu-pump",
    template: "t1-industrial",
    location: "运城·盐湖",
    intro: "盐湖水泵机电产业带代表企业，潜水电泵研发制造龙头，产品远销海外。",
    channels: [
      { type: "official", label: "官网", url: "http://www.skysea.com.cn/", note: "官网（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "ji-shan-haitong",
    name: "坚博士金刚石",
    beltSlug: "ji-shan-diamond",
    template: "t1-industrial",
    location: "运城·稷山",
    intro: "稷山金刚石产业集群代表企业，钎焊金刚石刀具远销英国、美国、俄罗斯等 12+ 国。",
    channels: [
      // 2026-09-02 深度分析：主页 917B，title"首页-企业官网"（通用建站模板默认页），疑未正式建站，待人工复核
      { type: "official", label: "官网", url: "https://www.soliboss.com/", note: "官网（已核验 2026-09-01；2026-09-02 深度分析：917B 默认模板页，待复核）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "taiyuan-taigang-steel",
    name: "太钢·TISCO",
    beltSlug: "taiyuan-stainless",
    template: "t1-industrial",
    location: "太原",
    intro: "全球最大不锈钢企业，年产能 1200 万吨钢（含 450 万吨不锈钢），全流程生产线。",
    channels: [
      { type: "official", label: "官网", url: "https://www.tisco.com.cn/", note: "官网（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "huai-ren-jinlan",
    name: "怀仁锦兰瓷业",
    beltSlug: "huai-ren-ceramic",
    template: "t1-industrial",
    location: "朔州·怀仁",
    intro: "怀仁陶瓷产业带代表企业，日用瓷与酒店用瓷出口（占位待认领）。",
    channels: [],
    verifyStatus: "pending",
  },

  // ============ 特色农副与食品（T2）Top10 ============
  {
    slug: "ye-shan-po",
    name: "野山坡",
    beltSlug: "forest-fruit",
    template: "t2-agri-food",
    location: "吕梁·文水",
    intro: "吕梁沙棘饮品代表企业，依托野生沙棘资源做健康饮品出口。",
    channels: [
      { type: "official", label: "官网", url: "https://www.yspshaji.com", note: "沙棘饮品（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "qiu-ji-millet",
    name: "沁州黄小米集团",
    beltSlug: "small-grains",
    template: "t2-agri-food",
    location: "长治·沁县",
    intro: "沁州黄小米地理标志代表企业，中国生态原产地保护产品，全产业链经营。",
    channels: [
      { type: "official", label: "官网", url: "https://www.qinzhouhuang.com/", note: "官网（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "qing-xu-zilin",
    name: "山西紫林醋业",
    beltSlug: "qing-xu-vinegar",
    template: "t2-agri-food",
    location: "太原·清徐",
    intro: "清徐老陈醋产业带代表企业，酿造食醋十大系列数百品种，出口 36+ 国家。",
    channels: [
      { type: "official", label: "官网", url: "https://www.zlcy.com/", note: "官网（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "qing-xu-shuita",
    name: "山西水塔醋业",
    beltSlug: "qing-xu-vinegar",
    template: "t2-agri-food",
    location: "太原·清徐",
    intro: "清徐老陈醋产业带代表企业，首批国家级农业产业化重点龙头，十大分厂。",
    channels: [
      { type: "official", label: "官网", url: "http://www.shuita.com.cn/", note: "官网（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "ping-yao-guanyun",
    name: "平遥牛肉集团",
    beltSlug: "meat-products",
    template: "t2-agri-food",
    location: "晋中·平遥",
    intro: "平遥牛肉地理标志代表企业，中华老字号，集养殖、加工、销售于一体。",
    channels: [
      { type: "official", label: "官网", url: "http://www.py-guanyun.com/", note: "冠云官网（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "shuo-zhou-lamb",
    name: "朔美羊肉业",
    beltSlug: "meat-products",
    template: "t2-agri-food",
    location: "朔州·怀仁",
    intro: "朔州羔羊肉产业代表企业，全产业链种羊繁育、养殖、屠宰加工与品牌运营。",
    channels: [
      // 2026-09-02 深度分析：主页 title 为"主机开设成功！！！"（虚拟主机默认页），站点未部署正式内容，待人工复核
      { type: "official", label: "官网", url: "http://www.smmuye.com/", note: "官网（已核验 2026-09-01；2026-09-02 深度分析发现主页为主机默认页，待复核）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "yang-quan-fuxi-millet",
    name: "阳泉富硒小米",
    beltSlug: "small-grains",
    template: "t2-agri-food",
    location: "阳泉",
    intro: "山西小杂粮产业带代表企业，富硒小米差异化出口（占位待认领）。",
    channels: [],
    verifyStatus: "pending",
  },
  {
    slug: "datong-cereal",
    name: "天镇通航粮贸",
    beltSlug: "small-grains",
    template: "t2-agri-food",
    location: "大同·天镇",
    intro: "大同小杂粮产业带代表企业，有机杂粮获欧盟/美国有机认证，出口欧美。",
    channels: [
      { type: "official", label: "官网", url: "https://www.tzthlm.com/", note: "官网（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "yun-cheng-apple",
    name: "运城苹果出口基地",
    beltSlug: "forest-fruit",
    template: "t2-agri-food",
    location: "运城·临猗",
    intro: "运城苹果地理标志代表基地，鲜果出口（占位待认领）。",
    channels: [],
    verifyStatus: "pending",
  },
  {
    slug: "lv-liang-red-jujube",
    name: "吕梁红枣食品",
    beltSlug: "forest-fruit",
    template: "t2-agri-food",
    location: "吕梁",
    intro: "吕梁红枣与沙棘产业带代表企业，健康食品出口（占位待认领）。",
    channels: [],
    verifyStatus: "pending",
  },

  // ============ 新材料·新能源·电子（T3）Top10 ============
  {
    slug: "chang-zhi-led-co",
    name: "高科华烨",
    beltSlug: "chang-zhi-led",
    template: "t3-tech-material",
    location: "长治",
    intro: "长治 LED 光电产业带链主企业，覆盖外延芯片、封装、显示屏、照明完整产业链。",
    channels: [
      { type: "official", label: "官网", url: "https://www.gkgd.cn/index.html", note: "中文站（已核验 2026-09-01）" },
      { type: "english", label: "英文站", url: "https://www.gkgd.com/index.html", note: "GKGD 英文站（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "chang-zhi-shenzi-led",
    name: "中科潞安",
    beltSlug: "chang-zhi-led",
    template: "t3-tech-material",
    location: "长治",
    intro: "长治 LED 产业带代表企业，深紫外 LED 全球领先，杀菌效率 99.99%。",
    channels: [
      // 2026-09-01 复核：裸域 luan-uv.com 证书 CN 不匹配（浏览器报错），www 版证书正常；故收录 www 地址
      { type: "official", label: "官网", url: "https://www.luan-uv.com/", note: "官网（已核验 2026-09-01，深紫外 LED 中英文站）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "chang-zhi-optics-module",
    // 2026-09-02 核验替换：山西高科华兴电子（高科华烨集团链核企业，LED 封装/显示屏）
    name: "山西高科华兴电子",
    beltSlug: "chang-zhi-led",
    template: "t3-tech-material",
    location: "长治",
    intro: "长治 LED 光电产业带链核企业（高科华烨集团旗下），主营 LED 支架、封装与显示器件，产品出口多国。",
    channels: [
      { type: "official", label: "官网", url: "https://www.gkgd.cn/index.html", note: "随集团官网（已核验 2026-09-02）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "jincheng-ai-camera",
    // 2026-09-02 核验替换：山西星心半导体（晋城经开区金匠园区光机电产业园，RGB 封装/IC 封测）
    name: "山西星心半导体科技",
    beltSlug: "jincheng-optoelectronics",
    template: "t3-tech-material",
    location: "晋城",
    intro: "晋城光机电产业带链主企业，LED 显示屏上游 RGB 封装与 IC 封测，产品配套显示屏出口。",
    channels: [
      { type: "official", label: "官网", url: "https://www.xxbdtkj.cn/", note: "官网（已核验 2026-09-02）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "jincheng-audio",
    // 2026-09-02 核验替换：中科创源（山西）智能科技（晋城经开区人工智能产业链链主企业）
    name: "中科创源（山西）智能科技",
    beltSlug: "jincheng-optoelectronics",
    template: "t3-tech-material",
    location: "晋城",
    intro: "晋城经开区人工智能产业链链主企业，AI 视觉算法与智能终端，为机器人、无人机、智能家居供视觉方案。",
    channels: [
      { type: "official", label: "官网", url: "http://zhongkecy.mensuo.com.cn/", note: "官网（已核验 2026-09-02）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "jincheng-blender",
    // 2026-09-02 核验替换：山西鼎澜科技（晋城经开区智能电子终端制造项目）
    name: "山西鼎澜科技",
    beltSlug: "jincheng-optoelectronics",
    template: "t3-tech-material",
    location: "晋城",
    intro: "晋城光机电产业带代表企业，智能家居、智能摄像头等智能电子终端制造（占位待认领，名称已核验）。",
    channels: [],
    verifyStatus: "pending",
  },
  {
    slug: "taiyuan-semiconductor",
    // 2026-09-02 核验替换：山西烁科晶体（太原综改区，第三代半导体碳化硅领军企业）
    name: "山西烁科晶体",
    beltSlug: "new-materials",
    template: "t3-tech-material",
    location: "太原·综改区",
    intro: "山西新材料产业带代表企业，第三代半导体材料碳化硅单晶衬底领军企业，产品配套功率器件产业。",
    channels: [
      { type: "official", label: "官网", url: "http://www.semisic.cn/", note: "官网（已核验 2026-09-02）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "taiyuan-carbon-fiber",
    // 2026-09-02 核验替换：山西钢科碳材料（太钢集团全资子公司，高性能碳纤维）
    name: "山西钢科碳材料",
    beltSlug: "new-materials",
    template: "t3-tech-material",
    location: "太原",
    intro: "太钢集团全资子公司，专注高性能聚丙烯腈基碳纤维及复合材料研发制造，服务先进制造业。",
    channels: [
      { type: "official", label: "官网", url: "https://www.tisco.com.cn/", note: "随母公司太钢官网（已核验 2026-09-02）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "lv-liang-sapphire",
    // 2026-09-02 核验替换：山西鼎芯晶体（太原综改区，蓝宝石晶体材料）
    name: "山西鼎芯晶体",
    beltSlug: "new-materials",
    template: "t3-tech-material",
    location: "太原·综改区",
    intro: "山西新材料产业带代表企业，蓝宝石晶体及晶片研发制造，服务半导体材料产业。",
    channels: [],
    verifyStatus: "pending",
  },
  {
    slug: "lv-liang-aluminum-mg",
    // 2026-09-02 核验替换：元泰高导材料（吕梁兴县经开区，铝镁合金铸棒/铸锭）
    name: "元泰高导材料（山西）",
    beltSlug: "new-materials",
    template: "t3-tech-material",
    location: "吕梁·兴县",
    intro: "吕梁铝镁新材料产业带代表企业，依托中铝华润铝液生产 2–7 系铝合金铸棒，供航空航天与新能源领域。",
    channels: [
      { type: "official", label: "官网", url: "https://www.yuantai-alu.com/", note: "官网（已核验 2026-09-02）" },
    ],
    verifyStatus: "verified",
  },

  // ============ 文化工艺品（T4）Top10 ============
  {
    slug: "ping-yao-lacquer-co",
    name: "唐都推光漆器",
    beltSlug: "ping-yao-lacquer",
    template: "t4-craft",
    location: "晋中·平遥",
    intro: "平遥推光漆器代表企业，国家级非遗保护、传承、弘扬与文旅基地。",
    channels: [
      { type: "official", label: "官网", url: "http://pytdqq.com/", note: "官网（已核验 2026-09-01）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "ping-yao-hongguang",
    // 2026-09-02 核验替换：平遥县永隆漆艺（永隆号，非遗传承点，推光漆器）
    name: "平遥永隆漆艺",
    beltSlug: "ping-yao-lacquer",
    template: "t4-craft",
    location: "晋中·平遥",
    intro: "平遥推光漆器产业带代表企业（永隆号），非遗平遥推光漆髹饰技艺传承点，主营漆器首饰盒、屏风、家具。",
    channels: [
      { type: "official", label: "官网", url: "https://15035645959.51sole.com/", note: "企业店铺（已核验 2026-09-02）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "ping-yao-qihu",
    // 2026-09-02 核验：平遥推光漆器髹饰技艺国家级非遗代表性传承人薛生金工作室（无独立官网，保留待认领）
    name: "平遥漆画工坊",
    beltSlug: "ping-yao-lacquer",
    template: "t4-craft",
    location: "晋中·平遥",
    intro: "平遥推光漆器产业带代表工坊（薛生金工作室系国家级非遗传承点），漆画与工艺品出口（占位待认领）。",
    channels: [],
    verifyStatus: "pending",
  },
  {
    slug: "ping-yao-lacquer-studio",
    // 2026-09-02 核验：平遥县已建漆艺苑/漆器艺术馆等传承机构，未核验到具体企业官网，保留待认领
    name: "平遥漆艺工作室",
    beltSlug: "ping-yao-lacquer",
    template: "t4-craft",
    location: "晋中·平遥",
    intro: "平遥推光漆器产业带代表工作室，收藏级漆艺定制（占位待认领）。",
    channels: [],
    verifyStatus: "pending",
  },
  {
    slug: "gao-ping-lu-silk-group",
    name: "潞安府潞绸集团",
    beltSlug: "gao-ping-lu-silk",
    template: "t4-craft",
    location: "晋城·高平",
    intro: "高平潞绸产业带代表企业，北方丝绸潞绸唯一传承企业，非遗技艺。",
    channels: [
      // 2026-09-01 复核：旧域名 jilier.com 已失效（连接超时）；现官网 silkhemp.com 实测 200（title 为"潞安府潞绸集团"）
      { type: "official", label: "官网", url: "https://www.silkhemp.com/", note: "官网（已核验 2026-09-01，silkhemp 丝麻站）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "gao-ping-silk-craft",
    // 2026-09-02 核验：高平潞绸文创空间为潞安府集团旗下（见高平市政府网），未核验到独立企业官网，保留待认领
    name: "高平丝绸文创",
    beltSlug: "gao-ping-lu-silk",
    template: "t4-craft",
    location: "晋城·高平",
    intro: "高平潞绸产业带代表企业（潞文创空间），丝绸文创产品出口（占位待认领）。",
    channels: [],
    verifyStatus: "pending",
  },
  {
    slug: "gao-ping-fabric",
    // 2026-09-02 核验：高平潞绸面料产业主要集中潞安府集团（已收录），未核验到其他独立官网企业，保留待认领
    name: "高平潞绸面料",
    beltSlug: "gao-ping-lu-silk",
    template: "t4-craft",
    location: "晋城·高平",
    intro: "高平潞绸产业带代表企业，潞绸面料与丝绸制品（占位待认领）。",
    channels: [],
    verifyStatus: "pending",
  },
  {
    slug: "ding-xiang-wood-workshop",
    // 2026-09-02 核验替换：定襄河边传统雕刻（雅艺轩制砚厂，惠氏澄泥砚/石末砚，属定襄雕刻文化工艺）
    name: "定襄雅艺轩制砚",
    beltSlug: "ding-xiang-wood",
    template: "t4-craft",
    location: "忻州·定襄",
    intro: "定襄传统雕刻产业带代表企业（雅艺轩制砚厂），复古澄泥砚、石末砚制作技艺，国家级非遗澄泥砚代表。",
    channels: [
      { type: "official", label: "官网", url: "http://www.yayixuan.com/", note: "官网（已核验 2026-09-02）" },
    ],
    verifyStatus: "verified",
  },
  {
    slug: "ding-xiang-furniture",
    // 2026-09-02 核验：定襄木雕为山西非遗，集中于智村/宏道镇，未核验到具体企业官网，保留待认领
    name: "定襄古典家具",
    beltSlug: "ding-xiang-wood",
    template: "t4-craft",
    location: "忻州·定襄",
    intro: "定襄木器产业带代表企业，古典家具兼具实用与收藏价值（占位待认领）。",
    channels: [],
    verifyStatus: "pending",
  },
  {
    slug: "ding-xiang-wood-craft",
    // 2026-09-02 核验：定襄木雕非遗传承集中于宏道镇等地，未核验到具体企业官网，保留待认领
    name: "定襄木制工艺品",
    beltSlug: "ding-xiang-wood",
    template: "t4-craft",
    location: "忻州·定襄",
    intro: "定襄木器产业带代表企业，木制工艺品出口（占位待认领）。",
    channels: [],
    verifyStatus: "pending",
  },
  // ============ 2026-09-02 规模化集成：4 大类 × 每类 Top50 = 200 家 ============
  // 新增 160 家来自 ./companies-extra（真实归类 2 家 + 产业名占位 158 家，均 pending 待核验/待认领），
  // 与"全省备案企业 1963 家"口径对应：其余约 1760 家列入待集成池（见 src/data/registry.ts + /registry 页）。
  ...extraCompanies,
];

/** 按产业带取企业 */
export function getCompaniesByBelt(beltSlug: string): Company[] {
  return companies.filter((c) => c.beltSlug === beltSlug);
}

/** 按 slug 取企业 */
export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}
