import { ctx } from "../../_shared/context.mjs";
export default {
  site: {
    title: `${ctx.brand} 服务器方案选择`,
    description: "围绕香港服务器、CN2 线路、Windows VPS 和建站场景拆出的引流型方案站，先判断业务需求，再进入合适的线路和方案页。",
    baseUrl: ctx.baseUrl,
    brand: `${ctx.brand} server choice`,
    eyebrow: "lead family",
    heroTitle: "不是先看最低价，而是先看业务部署需要什么线路和资源。",
    heroSubtitle: "把常见业务入口拆成独立方案页，适合从搜索进入后快速判断是否需要香港服务器、CN2、Windows VPS 或 WordPress 专项方案。",
    primaryCta: { label: "查看全部方案页", href: "#offers" },
    secondaryCta: { label: "前往 1bgp", href: ctx.leadTarget },
    selectionNotes: [
      "先判断访问人群和地区，再看线路。",
      "先判断业务系统依赖，再选 Linux / Windows。",
      "先看带宽峰值和波动，再看套餐。"
    ],
    trustPoints: ["按业务入口拆页", "适合搜索流量落地", "CTA 统一导向 1bgp"],
    methodSteps: [
      { title: "看业务对象", body: "如果用户主要来自大陆、东南亚或全球，线路和机房优先级完全不同。" },
      { title: "看系统依赖", body: "需要 ASP.NET、SQL Server 或远程桌面时，Windows VPS 的权重更高。" },
      { title: "看内容结构", body: "如果是 WordPress、商城或多站点，稳定性和备份策略比瞬时价格更重要。" }
    ],
    faqs: [
      { q: "为什么做成多个方案页？", a: "因为引流站的关键是让搜索词和落地页的意图对齐，而不是所有关键词都塞进一个页面。" },
      { q: "这些页面适合直接转化吗？", a: "适合做判断和筛选，真正下单或进一步咨询可以统一导到主目标站。" }
    ]
  },
  offers: [
    {
      slug: "hongkong-business-server",
      title: "香港服务器方案页",
      audience: "海外业务与跨境访问",
      summary: "适合面向大陆和东南亚混合流量的业务，优先关注线路、带宽和网络稳定性。",
      promise: "香港服务器并不是一类固定产品，而是一组围绕延迟、线路和部署便利性做平衡的方案集合。这个页面先帮助判断你是否真的应该选香港节点。",
      benefits: ["降低跨境访问延迟", "提升部署灵活度", "更适合跨境业务入口"],
      signals: ["访问用户分布在大陆和东南亚", "站点需要兼顾速度和部署便利", "业务更重视可用性而不是极限低价"],
      compare: [
        { label: "适配业务", value: "跨境站点" },
        { label: "优先关注", value: "线路稳定" },
        { label: "下一步", value: "看带宽峰值" }
      ],
      sections: [
        { title: "什么时候优先看香港节点", body: "如果业务既面向大陆也面向海外，香港节点通常是一个更容易平衡速度与部署便利性的方案。" },
        { title: "选择时不要只看套餐价格", body: "应先看线路质量、访问区域、流量波动和备份策略，否则便宜套餐可能在高峰期表现不稳定。" }
      ],
      faqs: [
        { q: "香港服务器一定比内地服务器快吗？", a: "不一定，要看访问区域、线路和业务形态。速度不是单看地理位置决定的。" },
        { q: "适合哪些网站类型？", a: "跨境官网、外贸站、海外落地页和需要灵活部署的业务都比较常见。" }
      ],
      cta: { label: "去 1bgp 看方案", href: ctx.leadTarget }
    },
    {
      slug: "cn2-line-guide",
      title: "CN2 线路选择页",
      audience: "大陆访问为主的出海业务",
      summary: "适合访问路径主要在大陆到海外之间，希望线路质量更稳定、波动更小的业务。",
      promise: "如果你的站点对大陆访问延迟比较敏感，CN2 线路往往会进入备选名单，但并不是每种业务都必须上 CN2。这个页面更适合做价值判断。",
      benefits: ["改善大陆访问体验", "减少高峰期波动", "提升关键页面打开速度"],
      signals: ["主要访客来自大陆", "核心页面对打开速度敏感", "愿意为更稳线路付出更高成本"],
      compare: [
        { label: "适配业务", value: "大陆访问优先" },
        { label: "优先关注", value: "链路质量" },
        { label: "下一步", value: "核对预算" }
      ],
      sections: [
        { title: "CN2 的价值不只是快", body: "对业务而言，更重要的是高峰期表现是否稳定，而不是只比较某一次测速结果。" },
        { title: "哪些站不必强求 CN2", body: "如果用户分布更分散，或者站点内容以静态和轻量访问为主，可以先看整体成本和地域覆盖。" }
      ],
      faqs: [
        { q: "所有 CN2 都一样吗？", a: "不一样，线路质量、套餐策略和实际交付体验都可能有差异。" },
        { q: "适合做下载站吗？", a: "要结合带宽峰值和成本，不建议只看线路名词。" }
      ],
      cta: { label: "查看 1bgp 线路方案", href: ctx.leadTarget }
    },
    {
      slug: "windows-vps-plan",
      title: "Windows VPS 场景页",
      audience: "需要桌面环境或特定组件的团队",
      summary: "适合依赖 Windows 软件栈、远程桌面或需要快速交付演示环境的业务场景。",
      promise: "如果业务依赖 .NET、SQL Server、桌面软件或运维习惯偏 Windows，那么 Windows VPS 会比 Linux 更省沟通和迁移成本。",
      benefits: ["保留现有运维习惯", "适合远程桌面操作", "便于兼容 Windows 组件"],
      signals: ["项目依赖 Windows 组件", "团队更熟悉远程桌面维护", "需要快速搭建演示或内部系统环境"],
      compare: [
        { label: "适配业务", value: "Windows 栈" },
        { label: "优先关注", value: "兼容性" },
        { label: "下一步", value: "核对授权与备份" }
      ],
      sections: [
        { title: "什么时候不要勉强上 Linux", body: "如果团队没有 Linux 运维经验，又依赖 Windows 组件，强行切换只会把问题从硬件成本转移到人力成本。" },
        { title: "Windows VPS 选型重点", body: "除了 CPU 和内存，还要看系统版本、远程桌面稳定性、快照和备份策略。" }
      ],
      faqs: [
        { q: "WordPress 适合 Windows VPS 吗？", a: "通常不是首选，但如果团队现有环境和流程依赖 Windows，也可以按实际情况评估。" },
        { q: "适合做内部系统吗？", a: "如果系统本身就是 Windows 栈，通常是更顺手的选择。" }
      ],
      cta: { label: "查看 1bgp Windows 方案", href: ctx.leadTarget }
    },
    {
      slug: "wordpress-hosting-brief",
      title: "WordPress 部署页",
      audience: "官网、内容站和专题站",
      summary: "适合内容站、企业官网和营销站，需要兼顾加载速度、备份、更新和后续扩展。",
      promise: "WordPress 方案页更关注运维成本、插件兼容和备份恢复，而不是只看单机配置。适合用来承接建站和托管类搜索意图。",
      benefits: ["更容易承接建站类搜索", "强调稳定和备份", "适合继续引导到托管方案"],
      signals: ["需要持续更新内容", "依赖插件和主题生态", "站点后续会扩到多栏目或多语言"],
      compare: [
        { label: "适配业务", value: "内容站点" },
        { label: "优先关注", value: "备份更新" },
        { label: "下一步", value: "看运维能力" }
      ],
      sections: [
        { title: "WordPress 不只是装好就结束", body: "真正的成本在插件维护、主题兼容、缓存和备份恢复，尤其是内容持续更新后。" },
        { title: "什么时候需要升级方案", body: "当访问量、媒体资源或多站点需求上来后，应优先评估缓存、对象存储和数据库策略。" }
      ],
      faqs: [
        { q: "适合企业官网吗？", a: "适合，尤其是需要内容更新和快速发布页面的团队。" },
        { q: "需要懂很多运维吗？", a: "不一定，但至少要把备份、更新和恢复流程建立好。" }
      ],
      cta: { label: "去 1bgp 看建站方案", href: ctx.leadTarget }
    }
  ]
};
