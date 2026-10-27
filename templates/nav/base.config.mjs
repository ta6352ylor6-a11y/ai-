import { ctx } from "../_shared/context.mjs";
const site = {
  title: `${ctx.brand} 网站导航`,
  description: `${ctx.brand} 网站导航聚合 AI 工具、网络开发、服务器与 IDC、知识文档、电商内容、翻译语言、数据处理与学习资源，帮助快速找到合适的网站与工具。`,
  baseUrl: ctx.baseUrl,
  brand: `${ctx.brand} 网站导航`,
  navBrandShort: ctx.brandShort,
  heroTitle: "一键直达，探索优质网站与工具",
  heroSubtitle: "围绕 AI、开发、服务器、运营、电商、翻译、数据与学习等主题，快速找到真正能用的资源入口。",
  intro: "这里不是单纯堆链接，而是按真实使用场景整理导航入口。首页先看分类，分类页再找细分方向，进入卡片后可以直接访问目标页或继续查看详情。",
  serverTarget: ctx.leadTarget
};

const categories = [
  {
    slug: "net-tools",
    name: "网络与开发工具",
    english: "Network & developer utilities",
    summary: "围绕 IP、CIDR、接口联调和部署前检查整理轻量工具与说明页。",
    intro: "适合从搜索进入后立刻使用，重点是把输入说明、结果说明和常见误区写清楚。",
    hubStyle: "grid",
    theme: { accent: "#0f766e", accentSoft: "#d9f4ef", surface: "#f7fffd", panel: "#ffffff", ink: "#13312d", muted: "#5b6f6a" }
  },
  {
    slug: "zh-ai-tools",
    name: "中文 AI 工具专题",
    english: "Chinese AI workflows",
    summary: "围绕中文写作、客服回复、提纲整理和内容润色整理专题页。",
    intro: "这类页面承接中文搜索词，强调使用场景、提问方式和结果验收标准。",
    hubStyle: "editorial",
    theme: { accent: "#be185d", accentSoft: "#fde7f1", surface: "#fff9fb", panel: "#ffffff", ink: "#3f1730", muted: "#7b5b6d" }
  },
  {
    slug: "vi-ai-tools",
    name: "越南语 AI 专题",
    english: "Vietnamese AI topics",
    summary: "适合越南语产品文案、客服表达、本地化措辞和双语协作场景。",
    intro: "这类页面更像场景化指南页，强调语言语气、市场表达和交付前检查。",
    hubStyle: "signal",
    theme: { accent: "#b45309", accentSoft: "#fff1dc", surface: "#fffaf2", panel: "#ffffff", ink: "#4a2d0d", muted: "#7d644b" }
  },
  {
    slug: "server-idc",
    name: "服务器与 IDC",
    english: "Servers and IDC",
    summary: "围绕香港服务器、CN2、Windows VPS 和 WordPress 部署做专题引导。",
    intro: "这部分页面的主引导统一到 1bgp，首页负责分类，专题页负责承接具体搜索词。",
    hubStyle: "showcase",
    theme: { accent: "#1d4ed8", accentSoft: "#dbeafe", surface: "#f8fbff", panel: "#ffffff", ink: "#172554", muted: "#64748b" }
  },
  {
    slug: "development",
    name: "开发与编程",
    english: "Development and programming",
    summary: "围绕 Python API、前端性能、接口调试和工程交付整理步骤型内容。",
    intro: "这类页面更偏操作型指南，适合做分步骤说明、检查清单和相关工具推荐。",
    hubStyle: "ledger",
    theme: { accent: "#4f46e5", accentSoft: "#e7e5ff", surface: "#fafaff", panel: "#ffffff", ink: "#24204c", muted: "#6b6893" }
  },
  {
    slug: "knowledge-docs",
    name: "知识与文档",
    english: "Knowledge and documentation",
    summary: "面向团队文档、产品规格、知识库结构和交付文档整理。",
    intro: "页面结构更适合做说明文、规范文和模板类内容，减少花哨样式，突出层次。",
    hubStyle: "library",
    theme: { accent: "#475467", accentSoft: "#e8ecf1", surface: "#fbfcfd", panel: "#ffffff", ink: "#1f2937", muted: "#667085" }
  },
  {
    slug: "customer-growth",
    name: "客服与用户运营",
    english: "Support and customer growth",
    summary: "围绕客服回复、FAQ 结构、私域承接和售前流程整理专题。",
    intro: "更偏运营落地，内容需要贴近真实业务，而不是概念化的营销空话。",
    hubStyle: "flow",
    theme: { accent: "#059669", accentSoft: "#d8fbeb", surface: "#f8fffb", panel: "#ffffff", ink: "#143a2b", muted: "#5a776a" }
  },
  {
    slug: "ecommerce-content",
    name: "电商与产品内容",
    english: "Ecommerce and product content",
    summary: "适合商品详情、落地页结构、卖点梳理和内容转化场景。",
    intro: "这类页面更像内容运营页，需要把卖点、结构和行动引导放在清晰位置。",
    hubStyle: "magazine",
    theme: { accent: "#ea580c", accentSoft: "#ffedd5", surface: "#fffaf5", panel: "#ffffff", ink: "#45260f", muted: "#8a644f" }
  },
  {
    slug: "translation-language",
    name: "翻译与语言处理",
    english: "Translation and language workflows",
    summary: "围绕多语校对、术语统一、中文越南语适配和语气调整整理。",
    intro: "这类页面适合放对照表、术语检查和使用说明，既能收录，也能直接使用。",
    hubStyle: "matrix",
    theme: { accent: "#7c3aed", accentSoft: "#efe7ff", surface: "#fbf9ff", panel: "#ffffff", ink: "#32184f", muted: "#73618d" }
  },
  {
    slug: "data-processing",
    name: "数据处理",
    english: "Data processing",
    summary: "覆盖 CSV 清洗、JSON 对比、文本整理和结构化处理的小工具与说明页。",
    intro: "更适合做浏览器内工具页，带示例输入输出和错误提示说明。",
    hubStyle: "lab",
    theme: { accent: "#0891b2", accentSoft: "#dff7ff", surface: "#f6fcff", panel: "#ffffff", ink: "#123544", muted: "#5e7883" }
  },
  {
    slug: "education-learning",
    name: "教育与学习",
    english: "Education and learning",
    summary: "适合学习路径、复盘模板、笔记方法和自学节奏相关页面。",
    intro: "内容更偏长线价值，不追求工具感，而是强调步骤、节奏和复用性。",
    hubStyle: "notebook",
    theme: { accent: "#c2410c", accentSoft: "#ffe7da", surface: "#fffaf7", panel: "#ffffff", ink: "#4a2411", muted: "#876453" }
  }
];

const basePages = [
  {
    slug: "ipv4-subnet-toolkit",
    category: "net-tools",
    type: "tool",
    title: "IPv4 与 CIDR 常用工具",
    summary: "把 IP 地址分析、CIDR 网段计算和子网掩码换算放到一个专题页里，方便运维或开发做基础检查。",
    description: "适合 IP 与子网处理场景的工具页，承接 IPv4、CIDR、子网掩码等关键词搜索。",
    eyebrow: "IP & SUBNET TOOLKIT",
    ctaLabel: "查看网络工具分类",
    ctaUrl: "/net-tools/",
    secondaryLabel: "返回网络工具分类",
    metrics: [
      ["适合场景", "IP 检查 / 子网换算"],
      ["处理方式", "浏览器内完成"],
      ["配套内容", "示例与错误提示"]
    ],
    inputLabel: "待检查内容",
    inputExample: "192.168.1.10/24",
    outputExample: "{\n  \"网络地址\": \"192.168.1.0\",\n  \"首个可用地址\": \"192.168.1.1\",\n  \"末个可用地址\": \"192.168.1.254\"\n}",
    steps: [
      { title: "先确认输入格式", text: "输入前先看示例，保证没有多余说明文字、单位或换行符。" },
      { title: "运行后核对关键项", text: "重点看网络地址、广播地址、主机范围与掩码是否符合预期。" },
      { title: "保存结果再做变更", text: "上线前先保留原始输入与输出，后续排查更容易对照。" }
    ],
    notes: [
      "这类工具适合做格式与数值检查，不负责归属地、ASN 或代理判断。",
      "如果准备修改线上配置，建议先结合网关、路由器或云平台官方规则再执行。"
    ],
    faq: [
      ["为什么示例里先给固定输入？", "这样用户可以先验证字段格式和结果样式，再替换成自己的内容。"],
      ["结果需要上传吗？", "不需要，工具类页面应优先在浏览器本地处理，不要求登录。"]
    ],
    related: [
      ["API 联调检查清单", "/api-debug-checklist/"]
    ]
  },
  {
    slug: "api-debug-checklist",
    category: "net-tools",
    type: "guide",
    title: "API 联调检查清单",
    summary: "把接口联调时最容易漏掉的请求头、鉴权、错误码和环境差异集中整理到一个页面。",
    description: "围绕 API 联调、接口测试和错误排查整理的步骤型指南页。",
    eyebrow: "API DEBUG CHECKLIST",
    ctaLabel: "查看开发分类",
    ctaUrl: "/development/",
    secondaryLabel: "返回网络工具分类",
    metrics: [
      ["联调重点", "Header / Token / Env"],
      ["适用对象", "前后端 / 测试"],
      ["页面形式", "清单 + 对照"]
    ],
    pillars: [
      { title: "请求参数核对", text: "路径、Query、Body 字段和类型是否与接口约定一致。" },
      { title: "鉴权与权限", text: "确认 Token、签名、时间戳和角色权限是否匹配当前环境。" },
      { title: "错误返回记录", text: "保留状态码、错误消息和请求示例，避免只截图不留原始文本。" }
    ],
    checklist: [
      "先确认是测试环境还是正式环境，不要混用域名和 Token。",
      "把 Postman 示例和前端实际请求逐项比对，重点看 Header。",
      "发现 4xx 或 5xx 时，先记录原始请求与返回，再继续改动。"
    ],
    faq: [
      ["为什么同一个接口在前端和 Postman 结果不一样？", "常见原因是 Header、Cookie、跨域处理或请求体格式不同。"],
      ["联调记录应该怎么留？", "建议至少保留请求示例、返回结果、时间和环境说明。"]
    ],
    related: [
      ["Python API 开发指南", "/python-api-guide/"],
      ["JSON 格式化与对比", "/json-format-compare/"],
      ["IPv4 与 CIDR 常用工具", "/ipv4-subnet-toolkit/"]
    ]
  },
  {
    slug: "zh-ai-writing-assistant",
    category: "zh-ai-tools",
    type: "guide",
    title: "中文 AI 写作助手怎么用更稳",
    summary: "把写作目标、语气要求、结构限制和结果验收标准放在一页里，适合承接中文 AI 写作相关搜索。",
    description: "面向中文 AI 写作、内容整理和结构化输出的专题指导页。",
    eyebrow: "CHINESE AI WRITING",
    ctaLabel: "查看中文 AI 专题",
    ctaUrl: "/zh-ai-tools/",
    secondaryLabel: "查看客服回复专题",
    metrics: [
      ["常见用途", "提纲 / 摘要 / 初稿"],
      ["关键动作", "写清任务和限制"],
      ["适合人群", "内容编辑 / 运营"]
    ],
    pillars: [
      { title: "先写目标", text: "直接说明要写什么、给谁看、最终拿来做什么，而不是只给一个标题。" },
      { title: "再写限制", text: "包括长度、语气、是否要分段、是否允许营销词等边界条件。" },
      { title: "最后写验收标准", text: "告诉模型你要的是可发布初稿、提纲还是素材整理结果。" }
    ],
    checklist: [
      "先给出具体场景，比如公众号开头、客服回复或产品介绍。",
      "如果结果过泛，补一条“不要出现空话和套话”。",
      "拿到初稿后再做二次追问，而不是重新从零描述。"
    ],
    faq: [
      ["中文 AI 写作为什么经常看起来像模板？", "因为目标、限制和验收标准不够具体，模型会回到最安全的通用表达。"],
      ["怎么减少 AI 味？", "把行业背景、用户对象和不希望出现的表达都提前写进去。"]
    ],
    related: [
      ["中文 AI 客服回复", "/zh-ai-customer-reply/"],
      ["商品详情页文案结构", "/product-detail-copy/"],
      ["知识文档结构模板", "/docs-structure-template/"]
    ]
  },
  {
    slug: "zh-ai-customer-reply",
    category: "zh-ai-tools",
    type: "guide",
    title: "中文 AI 客服回复的写法",
    summary: "围绕咨询接待、售前答疑和售后解释场景，整理可直接复用的中文回复结构。",
    description: "面向中文 AI 客服回复与售前答疑场景的专题页。",
    eyebrow: "AI CUSTOMER REPLY",
    ctaLabel: "查看用户运营分类",
    ctaUrl: "/customer-growth/",
    secondaryLabel: "返回中文 AI 专题",
    metrics: [
      ["适用场景", "售前 / 售后 / FAQ"],
      ["内容重点", "清楚 / 有边界 / 可复制"],
      ["避免问题", "空话和过度承诺"]
    ],
    pillars: [
      { title: "先回答用户问题", text: "不要上来先铺垫品牌介绍，先给用户一个明确答复。" },
      { title: "再补限制说明", text: "如果有价格范围、时间差异或条件限制，要一次说明完整。" },
      { title: "最后给下一步动作", text: "例如补充需求、查看链接、联系客服或提交资料。" }
    ],
    checklist: [
      "每条回复尽量只处理一个问题主线，不要一段话塞太多信息。",
      "遇到价格、库存、时效这类变化项时，避免写死承诺。",
      "把常见回答整理成 FAQ，减少每次重新组织语言。"
    ],
    faq: [
      ["AI 客服回复最容易出什么问题？", "最常见的是回答太像模板，或者说了很多但没有给用户明确动作。"],
      ["适合直接复制给客服团队吗？", "可以先做初稿，再结合你自己的业务规则和语气做一轮校对。"]
    ],
    related: [
      ["私域 FAQ 知识库", "/private-domain-faq-library/"],
      ["中文 AI 写作助手", "/zh-ai-writing-assistant/"],
      ["客服回复 SOP", "/customer-service-reply-playbook/"]
    ]
  },
  {
    slug: "vi-ai-product-copy",
    category: "vi-ai-tools",
    type: "guide",
    title: "越南语商品文案怎么用 AI 起草",
    summary: "适合跨境商品标题、卖点整理和越南语营销描述场景，重点放在本地表达而不是逐字翻译。",
    description: "面向越南语商品文案与本地化表达的专题指导页。",
    eyebrow: "VIETNAMESE AI COPY",
    ctaLabel: "查看越南语 AI 专题",
    ctaUrl: "/vi-ai-tools/",
    secondaryLabel: "查看电商内容分类",
    metrics: [
      ["主要场景", "商品标题 / 卖点"],
      ["重点", "本地表达而非直译"],
      ["适合对象", "跨境运营"]
    ],
    pillars: [
      { title: "先给商品定位", text: "告诉模型商品用途、核心卖点和目标用户，而不是只给中文原文。" },
      { title: "标注语气方向", text: "是偏说明型、促销型还是平台规范型，越南语表达差异会很大。" },
      { title: "最后做人工校对", text: "尤其是尺寸、材质、优惠信息和平台规则，不能完全依赖自动生成。" }
    ],
    checklist: [
      "不要把中文长句直接逐字翻成越南语，先拆出卖点再重写。",
      "带品牌名或参数时，保持格式统一，方便平台批量上传。",
      "上线前最好找熟悉越南语场景的人再过一遍。"
    ],
    faq: [
      ["为什么越南语 AI 文案容易显得不自然？", "因为很多结果只是从中文直译，没有按当地平台语感重组。"],
      ["适合直接发到商品页吗？", "更适合作为初稿和提纲，正式上线前仍建议校对。"]
    ],
    related: [
      ["中文越南语本地化检查", "/zh-vi-localization-checklist/"],
      ["商品详情页文案结构", "/product-detail-copy/"],
      ["多语文案校对流程", "/multilingual-copy-review/"]
    ]
  },
  {
    slug: "zh-vi-localization-checklist",
    category: "vi-ai-tools",
    type: "article",
    title: "中文到越南语本地化检查清单",
    summary: "把直译风险、平台语气、单位表达和活动信息检查整合成一页，适合做上线前核对。",
    description: "围绕中文转越南语本地化场景的检查清单文章页。",
    eyebrow: "ZH TO VI REVIEW",
    ctaLabel: "查看翻译与语言分类",
    ctaUrl: "/translation-language/",
    secondaryLabel: "返回越南语 AI 专题",
    metrics: [
      ["页面类型", "清单文章"],
      ["重点", "语气 / 单位 / 平台表达"],
      ["适合环节", "上线前复核"]
    ],
    sections: [
      { title: "先检查是不是直译", text: "很多问题并不是词汇错误，而是句子结构、语气和信息顺序还停留在中文逻辑。" },
      { title: "再看平台规则", text: "电商平台、广告平台和客服场景对表达方式不同，不能直接混用同一套文案。" },
      { title: "最后确认数字与单位", text: "价格、尺寸、日期、活动信息必须单独核对，避免因为语言转换造成错误。 " }
    ],
    takeaways: [
      "本地化不只是翻译，更是把信息改写到目标市场读者容易接受的方式。",
      "涉及促销、售后和时效的内容，建议始终做人工复核。"
    ],
    faq: [
      ["本地化和翻译有什么区别？", "翻译更关注语义对应，本地化更关注目标市场是否易懂、自然和合规。"],
      ["这份清单适合谁用？", "适合跨境运营、内容编辑和做越南语商品页的人。"]
    ],
    related: [
      ["越南语商品文案怎么写", "/vi-ai-product-copy/"],
      ["多语文案校对流程", "/multilingual-copy-review/"],
      ["电商落地页结构", "/landing-page-structure/"]
    ]
  },
  {
    slug: "hongkong-server",
    category: "server-idc",
    type: "service",
    title: "香港服务器租用与业务匹配",
    summary: "围绕中文访问、跨境业务和网站部署场景，说明香港服务器的线路、带宽、IP 与配置选择方式。",
    description: "面向香港服务器、网站部署和跨境业务的服务型专题页。",
    eyebrow: "HONG KONG SERVER",
    ctaLabel: "获取配置与报价",
    ctaUrl: site.serverTarget,
    secondaryLabel: "查看服务器分类",
    metrics: [
      ["适合场景", "网站 / 电商 / 后台"],
      ["购买重点", "线路 / 带宽 / IP"],
      ["主引导", "1bgp"]
    ],
    audience: [
      "企业网站、内容站和需要兼顾中文访问体验的页面。",
      "跨境电商、独立站和希望先从香港节点起步的业务。",
      "准备从共享主机迁移到 VPS 的站点。"
    ],
    considerations: [
      "先按访问地区和高峰时段判断线路，而不是只看机房位置。",
      "带宽、流量、IP 数量与系统范围要在购买前问清楚。",
      "如果涉及迁移，要把备份窗口和回滚方式一起确认。"
    ],
    offers: [
      ["香港云服务器", "适合企业网站、内容页和中小型应用起步。"],
      ["香港独立服务器", "适合数据库、持续计算负载和更稳定的资源需求。"],
      ["香港多 IP 方案", "适合多站点管理、独立业务和 IP 资源规划。"]
    ],
    faq: [
      ["香港服务器一定比别的地区更适合中文站吗？", "通常会被优先比较，但最终仍要结合线路测试和用户分布判断。"],
      ["购买前最容易漏掉什么？", "常见是续费规则、IP 范围、系统授权和带宽计费方式。"]
    ],
    related: [
      ["CN2 线路服务器", "/cn2-server/"],
      ["Windows VPS", "/windows-vps/"],
    ]
  },
  {
    slug: "cn2-server",
    category: "server-idc",
    type: "service",
    title: "CN2 线路服务器怎么选",
    summary: "面向关心国内访问体验和线路质量的业务，说明什么时候值得重点看 CN2，而不是只看低价方案。",
    description: "面向 CN2 线路、国内访问体验和节点选择的专题页。",
    eyebrow: "CN2 SERVER",
    ctaLabel: "查看 1bgp 方案",
    ctaUrl: site.serverTarget,
    secondaryLabel: "查看香港服务器",
    metrics: [
      ["适合人群", "中文站长"],
      ["关注点", "回程 / 稳定 / 高峰"],
      ["动作建议", "测试后再买"]
    ],
    audience: [
      "主要流量来自国内，需要尽量稳定访问的内容站和服务站。",
      "对页面打开速度、表单提交和接口访问更敏感的业务。",
      "长期运营站点，希望减少后期因为线路问题反复迁移。"
    ],
    considerations: [
      "线路重要，但不能替代 CPU、内存、磁盘与带宽本身的合理配置。",
      "如果访问用户不在国内，CN2 未必是第一优先级。",
      "咨询时最好按运营商和时段做测试，而不是只看宣传文字。"
    ],
    offers: [
      ["香港 CN2 线路", "适合先兼顾中文访问与香港节点起步。"],
      ["线路测试建议", "至少保留不同运营商、不同时间段的对照结果。"],
      ["预算判断", "如果访问质量直接影响转化，线路比纯低价更值得看。"]
    ],
    faq: [
      ["CN2 一定就是最好的吗？", "不是，只有当你的业务确实依赖国内访问质量时，它才更值得优先考虑。"],
      ["怎么判断要不要为线路多花预算？", "看访问体验是否直接影响询盘、注册、付款或后台使用。"]
    ],
    related: [
      ["香港服务器", "/hongkong-server/"],
      ["入门 VPS 购买指南", "/starter-vps-guide/"],
    ]
  },
  {
    slug: "windows-vps",
    category: "server-idc",
    type: "service",
    title: "Windows VPS 购买前要看什么",
    summary: "适合远程桌面、Windows 软件环境和图形界面操作场景，重点在授权、内存与远程管理。",
    description: "围绕 Windows VPS、远程桌面和系统授权的服务页。",
    eyebrow: "WINDOWS VPS",
    ctaLabel: "咨询 Windows VPS",
    ctaUrl: site.serverTarget,
    secondaryLabel: "查看入门指南",
    metrics: [
      ["适合业务", "远程桌面"],
      ["重点", "授权 / 内存"],
      ["常见用途", "软件环境部署"]
    ],
    audience: [
      "依赖远程桌面或 Windows 软件环境的业务。",
      "更习惯图形界面运维，不想完全用命令行管理服务器的团队。",
      "需要特定 Windows 运行库或桌面环境的场景。"
    ],
    considerations: [
      "系统授权是否包含在报价内，续费怎么算。",
      "内存和磁盘是否足够支撑你要运行的软件。",
      "远程桌面安全、端口管理和备份方案要提前确认。"
    ],
    offers: [
      ["图形界面管理", "适合不想完全依赖命令行的使用方式。"],
      ["系统授权确认", "授权与系统版本要在开通前说清楚。"],
      ["远程操作习惯", "更适合需要桌面方式安装和配置的软件场景。"]
    ],
    faq: [
      ["普通建站一定需要 Windows VPS 吗？", "不一定，多数建站场景 Linux 就够用了，除非业务明确依赖 Windows。"],
      ["Windows VPS 最常漏掉什么？", "授权成本和远程桌面安全配置最容易被忽略。"]
    ],
    related: [
      ["WordPress VPS", "/wordpress-vps/"],
      ["香港服务器", "/hongkong-server/"],
      ["1bgp", site.serverTarget]
    ]
  },
  {
    slug: "wordpress-vps",
    category: "server-idc",
    type: "service",
    title: "WordPress VPS 不一定要高配",
    summary: "面向博客、企业站和内容站部署，重点放在地区、缓存、备份和后续扩容，而不是盲目堆配置。",
    description: "围绕 WordPress VPS、博客建站和内容站部署的专题页。",
    eyebrow: "WORDPRESS VPS",
    ctaLabel: "查看建站方案",
    ctaUrl: site.serverTarget,
    secondaryLabel: "查看上线清单",
    metrics: [
      ["适合对象", "博客 / 企业站"],
      ["关键点", "缓存 / 备份 / 地区"],
      ["系统偏好", "Linux"]
    ],
    audience: [
      "博客、资讯站、企业展示站和营销落地页。",
      "希望后续自己控制环境、插件和备份策略的站点。",
      "准备从轻量托管迁移到 VPS 的内容团队。"
    ],
    considerations: [
      "先按目标访问地区选节点，再决定是否需要更高带宽。",
      "图片、插件和缓存策略通常比盲目升配更影响体验。",
      "上线前要把证书、备份、监控和回滚流程补齐。"
    ],
    offers: [
      ["轻量起步配置", "大多数内容站可以先从适中配置开始，不必一开始上高配。"],
      ["环境和缓存", "Nginx、对象缓存和图片处理方式会显著影响结果。"],
      ["长期维护", "备份、更新和迁移策略要尽早确定。"]
    ],
    faq: [
      ["WordPress 一开始就要高配吗？", "多数情况下不用，先把环境、缓存和图片优化做好更重要。"],
      ["香港和新加坡怎么选？", "按你的用户地区决定，中文访问更重时通常先看香港。"]
    ],
    related: [
      ["香港服务器", "/hongkong-server/"],
      ["入门 VPS 购买指南", "/starter-vps-guide/"],
    ]
  },
  {
    slug: "starter-vps-guide",
    category: "server-idc",
    type: "guide",
    title: "新手第一次买 VPS 的判断顺序",
    summary: "把地区、系统、带宽和配置起步顺序整理成一页，适合第一次买服务器的人快速建立判断框架。",
    description: "面向 VPS 新手和初次购买者的步骤型指南页。",
    eyebrow: "STARTER VPS",
    ctaLabel: "前往 1bgp 看方案",
    ctaUrl: site.serverTarget,
    secondaryLabel: "查看服务器分类",
    metrics: [
      ["适合对象", "第一次买 VPS"],
      ["核心问题", "地区 / 系统 / 预算"],
      ["建议方式", "先小配验证"]
    ],
    pillars: [
      { title: "先看用户地区", text: "地区通常决定节点方向，先看香港、新加坡还是其他地区。" },
      { title: "再看系统和用途", text: "建站、接口、远程桌面不同，系统和资源方向完全不同。" },
      { title: "最后再看配置", text: "CPU、内存和带宽应围绕真实负载，而不是只看别人推荐。 " }
    ],
    checklist: [
      "先确认是内容站、工具站还是后台系统，不同用途差异很大。",
      "不要只看低价，还要看续费、带宽和售后响应。",
      "如果还没验证业务，先选更灵活的周期测试。"
    ],
    faq: [
      ["第一次买 VPS 要不要直接年付？", "如果业务和地区还没验证，通常先测试一段时间会更稳妥。"],
      ["配置不够以后还能升级吗？", "多数情况下可以，所以起步更重要的是方向正确。"]
    ],
    related: [
      ["香港服务器", "/hongkong-server/"],
      ["Windows VPS", "/windows-vps/"],
      ["WordPress VPS", "/wordpress-vps/"]
    ]
  },
  {
    slug: "python-api-guide",
    category: "development",
    type: "guide",
    title: "Python API 开发指南从接口设计开始",
    summary: "适合接口开发、参数约定和错误返回设计场景，重点是让前后端和测试都能看懂。",
    description: "面向 Python API、接口设计和联调流程的指南页。",
    eyebrow: "PYTHON API GUIDE",
    ctaLabel: "查看开发与编程分类",
    ctaUrl: "/development/",
    secondaryLabel: "查看 API 联调清单",
    metrics: [
      ["适合阶段", "设计 / 联调 / 交付"],
      ["重点", "参数与错误码"],
      ["对象", "后端 / 前端 / 测试"]
    ],
    pillars: [
      { title: "接口约定先写清楚", text: "路径、参数、字段类型和错误码越早统一，后面返工越少。" },
      { title: "日志与错误信息要可追踪", text: "方便联调，也方便上线后排查。" },
      { title: "示例请求比口头说明更有效", text: "至少准备一组成功和一组失败示例。 " }
    ],
    checklist: [
      "统一字段命名风格，不要中途切换大小写规则。",
      "把错误返回与权限问题分开说明，减少误判。",
      "上线前保留最小可复现请求样例。"
    ],
    faq: [
      ["接口文档应该什么时候补？", "最好在联调前就写出最小版本，不要等上线后补。"],
      ["示例返回值有必要写吗？", "有，尤其是嵌套字段和错误返回。"]
    ],
    related: [
      ["API 联调检查清单", "/api-debug-checklist/"],
      ["JSON 格式化与对比", "/json-format-compare/"],
      ["产品规格文档流程", "/product-spec-workflow/"]
    ]
  },
  {
    slug: "frontend-performance-checklist",
    category: "development",
    type: "guide",
    title: "前端性能检查清单",
    summary: "适合落地页、工具站和内容页上线前做基础性能复查，重点是资源加载、图片、字体和首屏结构。",
    description: "面向前端性能优化和上线前检查的指南页。",
    eyebrow: "FRONTEND PERFORMANCE",
    ctaLabel: "查看开发与编程分类",
    ctaUrl: "/development/",
    secondaryLabel: "查看比例计算工具",
    metrics: [
      ["适合页面", "落地页 / 工具站"],
      ["重点", "首屏 / 图片 / 字体"],
      ["适合时机", "上线前复查"]
    ],
    pillars: [
      { title: "先减首屏负担", text: "不要把太多卡片、图像和外链脚本全部压在首屏。" },
      { title: "再查图片与字体", text: "图片尺寸、压缩方式和字体加载策略经常决定体验上限。" },
      { title: "最后再补交互", text: "搜索、筛选和动画要在页面清晰可读之后再加。 " }
    ],
    checklist: [
      "减少不必要的大标题和过重的视觉块，先保证可读性。",
      "优先使用系统字体或更轻量的字体加载方式。",
      "移动端按钮、输入框和结果区要尽量在首屏附近。"
    ],
    faq: [
      ["性能优化是不是一定要很技术？", "不一定，很多改动只是减少无意义模块和更合理的首屏层次。"],
      ["工具站要不要做很多动画？", "通常不建议，工具站更需要快、稳和易读。"]
    ],
    related: [
      ["落地页结构模板", "/landing-page-structure/"],
      ["自学路线图", "/self-study-roadmap/"]
    ]
  },
  {
    slug: "docs-structure-template",
    category: "knowledge-docs",
    type: "article",
    title: "知识文档结构模板怎么搭",
    summary: "适合内部知识库、项目文档和操作说明页，重点是结构清晰、可更新、可复用。",
    description: "围绕知识文档结构和团队文档组织方式的文章页。",
    eyebrow: "DOCS STRUCTURE",
    ctaLabel: "查看知识与文档分类",
    ctaUrl: "/knowledge-docs/",
    secondaryLabel: "查看产品规格流程",
    metrics: [
      ["页面类型", "结构模板"],
      ["适合对象", "项目文档 / 知识库"],
      ["核心目标", "可查找 / 可维护"]
    ],
    sections: [
      { title: "先分场景再分层级", text: "按产品、流程、问题排查或角色来划分，会比按部门名更容易被真正使用。" },
      { title: "正文不要写成流水账", text: "建议固定结构，例如背景、步骤、注意事项、FAQ 和相关文档。" },
      { title: "给文档设置更新入口", text: "让读者知道谁负责、什么时候更新、哪些内容已经过期。 " }
    ],
    takeaways: [
      "文档结构的目标不是好看，而是让团队能在需要的时候快速找到正确内容。",
      "如果一份文档需要频繁被引用，就应该有稳定标题、清晰分段和相关链接。"
    ],
    faq: [
      ["知识库为什么总是建了却没人用？", "常见原因是目录按管理视角组织，而不是按使用场景组织。"],
      ["文档适合写多长？", "只要结构清晰、能快速定位，长短不是核心问题。"]
    ],
    related: [
      ["产品规格文档流程", "/product-spec-workflow/"],
      ["中文 AI 写作助手", "/zh-ai-writing-assistant/"],
      ["学习笔记方法", "/study-notes-method/"]
    ]
  },
  {
    slug: "product-spec-workflow",
    category: "knowledge-docs",
    type: "article",
    title: "产品规格文档应该怎么写更好协作",
    summary: "适合产品、设计、开发协作场景，重点放在范围、验收、依赖和变更记录。",
    description: "面向产品规格文档与跨角色协作的文章页。",
    eyebrow: "PRODUCT SPEC",
    ctaLabel: "查看知识与文档分类",
    ctaUrl: "/knowledge-docs/",
    secondaryLabel: "查看开发分类",
    metrics: [
      ["适合角色", "产品 / 设计 / 开发"],
      ["关键模块", "范围 / 验收 / 依赖"],
      ["页面类型", "协作文档"]
    ],
    sections: [
      { title: "先把范围写清楚", text: "如果边界不清，后面所有排期和验收都会跟着模糊。" },
      { title: "验收标准要可检查", text: "不要只写“优化体验”，要写成具体行为和结果。 " },
      { title: "变更记录不能缺", text: "需求调整、优先级变化和接口变更都应该能追溯。 " }
    ],
    takeaways: [
      "规格文档不是单给开发看的，也应该能让设计、测试和运营快速理解改动范围。",
      "好的规格文档会减少会后补充说明和重复追问。"
    ],
    faq: [
      ["产品规格文档和需求文档一样吗？", "相关但不完全相同，规格文档更强调范围、规则和验收细节。"],
      ["规格文档需要多完整才开始做？", "至少要把主流程、边界和验收标准写到可执行。"]
    ],
    related: [
      ["Python API 开发指南", "/python-api-guide/"],
      ["知识文档结构模板", "/docs-structure-template/"],
      ["落地页结构模板", "/landing-page-structure/"]
    ]
  },
  {
    slug: "customer-service-reply-playbook",
    category: "customer-growth",
    type: "guide",
    title: "客服回复 SOP 怎么整理",
    summary: "围绕售前咨询、价格说明、时效答复和问题升级场景，整理更实用的回复 SOP。",
    description: "面向客服回复和用户运营流程的指南页。",
    eyebrow: "SUPPORT PLAYBOOK",
    ctaLabel: "查看客服与用户运营分类",
    ctaUrl: "/customer-growth/",
    secondaryLabel: "查看 FAQ 知识库",
    metrics: [
      ["适合对象", "客服 / 运营"],
      ["重点", "清楚 / 高效 / 可升级"],
      ["常见场景", "咨询 / 售后"]
    ],
    pillars: [
      { title: "先按问题类型分组", text: "价格、时效、售后、登录、发票等问题不应该混在同一套模板里。" },
      { title: "对变化项留余地", text: "价格、库存和时间等内容不要写成绝对承诺。" },
      { title: "给升级场景留出口", text: "遇到特殊情况时，要告诉客服何时转人工或升级处理。 " }
    ],
    checklist: [
      "把最常见的十类问题先整理出来，再逐步扩展。",
      "每条回复模板最好配一条“使用边界”说明。",
      "高频问题应回流到 FAQ 或产品页，而不是只留在聊天里。"
    ],
    faq: [
      ["SOP 会不会让客服回复太机械？", "如果模板只写一句固定话术会，但如果写清楚结构和边界反而更灵活。"],
      ["回复模板多久更新一次？", "建议按高频问题和产品变化节奏更新。"]
    ],
    related: [
      ["私域 FAQ 知识库", "/private-domain-faq-library/"],
      ["中文 AI 客服回复", "/zh-ai-customer-reply/"],
      ["商品详情页文案结构", "/product-detail-copy/"]
    ]
  },
  {
    slug: "private-domain-faq-library",
    category: "customer-growth",
    type: "article",
    title: "私域 FAQ 知识库应该怎么搭",
    summary: "适合承接咨询、减少重复答疑和沉淀常见问题，重点是分类、检索和回链。",
    description: "面向 FAQ 知识库与用户运营承接的文章页。",
    eyebrow: "FAQ LIBRARY",
    ctaLabel: "查看客服与用户运营分类",
    ctaUrl: "/customer-growth/",
    secondaryLabel: "查看知识与文档分类",
    metrics: [
      ["适合用途", "减少重复答疑"],
      ["重点", "分类 / 检索 / 回链"],
      ["页面类型", "知识库文章"]
    ],
    sections: [
      { title: "不要只按内部视角分类", text: "用户不会按部门结构提问，更常按价格、物流、退款、账户等问题去找答案。" },
      { title: "每条 FAQ 都要有去向", text: "好的 FAQ 不只是解答，还会把用户引到下一步动作，例如查看产品页或提交资料。" },
      { title: "FAQ 应该能回流到页面", text: "客服高频问题、表单问题和售后解释都应反向更新回 FAQ。 " }
    ],
    takeaways: [
      "FAQ 是私域承接的重要基础设施，不只是一个补充页面。",
      "如果 FAQ 不能被搜索和被回链，它很快就会失去价值。"
    ],
    faq: [
      ["FAQ 适合做成单页还是多页？", "高频问题多时更适合拆成多页专题，首页只做入口和分类。"],
      ["FAQ 应该多正式？", "重点是清楚和可信，不必堆太多营销语言。"]
    ],
    related: [
      ["客服回复 SOP", "/customer-service-reply-playbook/"],
      ["知识文档结构模板", "/docs-structure-template/"],
      ["中文 AI 客服回复", "/zh-ai-customer-reply/"]
    ]
  },
  {
    slug: "product-detail-copy",
    category: "ecommerce-content",
    type: "guide",
    title: "商品详情页文案结构怎么排更顺",
    summary: "把标题、卖点、对比、使用说明和行动引导拆成更适合商品详情页的顺序。",
    description: "面向商品详情页文案结构和转化逻辑的指南页。",
    eyebrow: "PRODUCT DETAIL COPY",
    ctaLabel: "查看电商与产品内容分类",
    ctaUrl: "/ecommerce-content/",
    secondaryLabel: "查看落地页结构",
    metrics: [
      ["适合对象", "电商运营"],
      ["重点", "卖点排序"],
      ["常见页面", "详情页 / 商品页"]
    ],
    pillars: [
      { title: "先让用户知道卖什么", text: "标题和首屏文案要先明确商品是什么、适合谁、解决什么问题。" },
      { title: "卖点按理解顺序排", text: "不要平铺十几个点，优先展示最能帮助判断的三到五个信息。" },
      { title: "最后再给购买动作", text: "当用户已经理解商品信息后，再给出下单、咨询或查看规格的动作。 " }
    ],
    checklist: [
      "标题、主图文案和规格说明之间不能互相矛盾。",
      "如果有材质、尺寸或套餐差异，最好用表格或分项结构说明。",
      "把常见疑问提前回答，能减少客服重复解释。"
    ],
    faq: [
      ["详情页是不是越长越好？", "不是，关键是信息顺序和是否真正帮助用户判断。"],
      ["适合用 AI 直接生成整页吗？", "更适合作为结构和初稿辅助，正式上线前要结合产品事实再修。"]
    ],
    related: [
      ["落地页结构模板", "/landing-page-structure/"],
      ["中文 AI 写作助手", "/zh-ai-writing-assistant/"],
      ["越南语商品文案", "/vi-ai-product-copy/"]
    ]
  },
  {
    slug: "landing-page-structure",
    category: "ecommerce-content",
    type: "article",
    title: "落地页结构模板怎么搭更像真实页面",
    summary: "围绕首屏、信任信息、卖点顺序和 CTA 位置，整理更适合落地页的结构思路。",
    description: "面向落地页结构与产品内容页组织方式的文章页。",
    eyebrow: "LANDING PAGE STRUCTURE",
    ctaLabel: "查看电商与产品内容分类",
    ctaUrl: "/ecommerce-content/",
    secondaryLabel: "查看前端性能清单",
    metrics: [
      ["页面类型", "结构模板"],
      ["重点", "首屏 / 信任 / CTA"],
      ["适用场景", "产品页 / 活动页"]
    ],
    sections: [
      { title: "首屏先给判断依据", text: "访问者需要在几秒内知道这页讲什么、适合谁、下一步做什么。" },
      { title: "信任信息要早出现", text: "案例、对比、参数、常见问题和联系方式不应该都压在页尾。" },
      { title: "CTA 不要只出现一次", text: "首屏、中段和页尾都可以有动作入口，但文案应贴合当前内容。 " }
    ],
    takeaways: [
      "真实落地页的重点不是把元素堆满，而是让阅读路径自然。",
      "如果所有模块都长得一样，用户会更快跳出。"
    ],
    faq: [
      ["为什么很多落地页看起来像模板？", "因为结构没有围绕具体产品重写，只是在重复通用模块。"],
      ["CTA 放几个合适？", "通常至少首屏一个、中段一个、页尾一个，但要根据内容节奏安排。"]
    ],
    related: [
      ["商品详情页文案结构", "/product-detail-copy/"],
      ["前端性能检查清单", "/frontend-performance-checklist/"],
      ["中文 AI 写作助手", "/zh-ai-writing-assistant/"]
    ]
  },
  {
    slug: "zh-vi-localization",
    category: "translation-language",
    type: "guide",
    title: "中文与越南语本地化协作怎么分工",
    summary: "适合双语内容、商品页和客服内容本地化场景，重点在术语、语气和最终校对流程。",
    description: "围绕中文与越南语本地化协作的指导页。",
    eyebrow: "ZH / VI LOCALIZATION",
    ctaLabel: "查看翻译与语言分类",
    ctaUrl: "/translation-language/",
    secondaryLabel: "查看越南语 AI 专题",
    metrics: [
      ["适合场景", "商品 / 客服 / 活动页"],
      ["重点", "术语 / 语气 / 校对"],
      ["对象", "内容编辑 / 运营"]
    ],
    pillars: [
      { title: "先统一术语", text: "品牌名、功能名、优惠名和尺寸单位最好先建立对照表。" },
      { title: "再区分场景语气", text: "商品页、活动页和客服回复的语气差异很大，不能共用一套话术。 " },
      { title: "最后安排上线前校对", text: "涉及价格、时效和活动承诺的信息要单独复核。 " }
    ],
    checklist: [
      "先把高频术语固定，再做批量翻译。",
      "不要把促销文案、按钮文案和客服话术混为一套模板。",
      "上线后根据实际询盘和点击反馈继续调整词语。"
    ],
    faq: [
      ["为什么同一句中文转成越南语会有多种版本？", "因为表达语气、平台环境和用户对象不同，合理版本不止一种。"],
      ["适合先机器翻译再改吗？", "适合作为初稿，但正式上线前仍需校对。"]
    ],
    related: [
      ["中文到越南语本地化检查", "/zh-vi-localization-checklist/"],
      ["多语文案校对流程", "/multilingual-copy-review/"],
      ["越南语商品文案", "/vi-ai-product-copy/"]
    ]
  },
  {
    slug: "multilingual-copy-review",
    category: "translation-language",
    type: "tool",
    title: "多语文案校对流程与检查点",
    summary: "适合做中英越等多语内容上线前核对，重点在术语统一、长度控制和链接跳转检查。",
    description: "面向多语文案校对与内容上线检查的工具型页面。",
    eyebrow: "COPY REVIEW WORKFLOW",
    ctaLabel: "查看翻译与语言分类",
    ctaUrl: "/translation-language/",
    secondaryLabel: "查看数据处理分类",
    metrics: [
      ["适合阶段", "上线前复核"],
      ["检查点", "术语 / 链接 / 长度"],
      ["页面形式", "检查流程页"]
    ],
    inputLabel: "待校对内容",
    inputExample: "主标题：香港服务器租用\n按钮：立即咨询\n优惠：首月优惠",
    outputExample: "1. 主标题语义一致\n2. 按钮长度可接受\n3. 优惠信息需核对时效",
    steps: [
      { title: "先核对术语与产品名", text: "品牌名、功能名和活动名要统一，否则多语版本会互相打架。" },
      { title: "再核对按钮与链接", text: "按钮长度、跳转地址和锚点文本要逐项看，不要只检查正文。 " },
      { title: "最后看限制性内容", text: "价格、时效、活动范围和售后承诺必须单独确认。 " }
    ],
    notes: [
      "多语文案校对不是只看翻译是否对，还要看页面是否真的能用。",
      "如果不同语言版本跳向不同页面或按钮太长，转化会直接受影响。"
    ],
    faq: [
      ["多语校对为什么要专门留流程？", "因为真正出问题的往往是按钮、链接、活动信息和术语不统一。"],
      ["适合做成清单吗？", "适合，尤其适合给内容编辑和运营反复复用。"]
    ],
    related: [
      ["中文与越南语本地化", "/zh-vi-localization/"],
      ["CSV 清洗与整理", "/csv-cleanup-workflow/"],
      ["商品详情页文案结构", "/product-detail-copy/"]
    ]
  },
  {
    slug: "csv-cleanup-workflow",
    category: "data-processing",
    type: "tool",
    title: "CSV 清洗与整理工作流",
    summary: "围绕表头统一、空值处理、去重和导出检查，整理更适合日常内容和运营数据处理的页面。",
    description: "面向 CSV 清洗与轻量数据整理的工具型页面。",
    eyebrow: "CSV CLEANUP WORKFLOW",
    ctaLabel: "查看数据处理分类",
    ctaUrl: "/data-processing/",
    secondaryLabel: "查看 JSON 工具",
    metrics: [
      ["适合数据", "表格 / 导出文件"],
      ["重点", "去重 / 空值 / 表头"],
      ["页面形式", "工具流程"]
    ],
    inputLabel: "待整理内容",
    inputExample: "name,email,city\nAlice,alice@example.com,Shanghai\nAlice,alice@example.com,Shanghai",
    outputExample: "已识别 2 行数据\n重复记录 1 条\n建议先统一表头再去重",
    steps: [
      { title: "先统一字段名", text: "表头不统一时，后面的去重和合并都很容易出错。" },
      { title: "再处理空值与重复", text: "区分是可以删除、需要补齐，还是需要单独保留说明。 " },
      { title: "最后再导出", text: "导出前再随机抽样几条记录，确认编码和分隔符没有问题。 " }
    ],
    notes: [
      "CSV 处理常见问题不是公式，而是表头不统一、编码混乱和手动改动造成的结构差异。",
      "如果要重复处理同一类文件，最好把清洗顺序固定下来。"
    ],
    faq: [
      ["为什么 CSV 清洗后还是导入失败？", "常见原因是编码、分隔符或列顺序仍然不符合目标系统要求。"],
      ["去重前要不要先备份？", "建议保留原始文件，后续更容易回查。"]
    ],
    related: [
      ["JSON 格式化与对比", "/json-format-compare/"],
      ["多语文案校对流程", "/multilingual-copy-review/"],
      ["知识文档结构模板", "/docs-structure-template/"]
    ]
  },
  {
    slug: "json-format-compare",
    category: "data-processing",
    type: "tool",
    title: "JSON 格式化与结构对比",
    summary: "适合接口调试、结构核对和前后端联调时快速检查 JSON 是否完整、嵌套是否一致。",
    description: "围绕 JSON 格式化、结构比对和联调辅助的工具型页面。",
    eyebrow: "JSON FORMAT & DIFF",
    ctaLabel: "查看数据处理分类",
    ctaUrl: "/data-processing/",
    secondaryLabel: "查看 API 指南",
    metrics: [
      ["适合场景", "接口联调"],
      ["重点", "格式 / 层级 / 字段"],
      ["对象", "前后端 / 测试"]
    ],
    inputLabel: "JSON 输入",
    inputExample: "{ \"code\": 0, \"data\": { \"name\": \"demo\" } }",
    outputExample: "{\n  \"code\": 0,\n  \"data\": {\n    \"name\": \"demo\"\n  }\n}",
    steps: [
      { title: "先校验格式", text: "确认引号、逗号和括号层级是否正确，避免结构错误影响联调。" },
      { title: "再看字段差异", text: "重点看是否少字段、字段名不同或嵌套层级改变。 " },
      { title: "最后保存示例", text: "把成功和失败示例都留存，方便后续定位问题。 " }
    ],
    notes: [
      "JSON 工具页适合配合接口文档一起使用，让开发和测试看到同一套结构。",
      "如果返回值经常变化，建议同步更新示例，而不是只在聊天里口头说明。"
    ],
    faq: [
      ["为什么格式正确仍然联调失败？", "可能是字段语义、类型或层级不匹配，而不只是语法问题。"],
      ["适合给非技术同事看吗？", "适合，只要配清楚字段说明和成功示例。"]
    ],
    related: [
      ["Python API 开发指南", "/python-api-guide/"],
      ["API 联调检查清单", "/api-debug-checklist/"],
      ["CSV 清洗与整理", "/csv-cleanup-workflow/"]
    ]
  },
  {
    slug: "self-study-roadmap",
    category: "education-learning",
    type: "article",
    title: "自学路线图应该怎么排更容易坚持",
    summary: "适合做长期学习规划，重点不是列一堆课程，而是把目标、周期和复盘方式放进计划里。",
    description: "面向自学路线图与学习规划的文章页。",
    eyebrow: "SELF STUDY ROADMAP",
    ctaLabel: "查看教育与学习分类",
    ctaUrl: "/education-learning/",
    secondaryLabel: "查看学习笔记方法",
    metrics: [
      ["适合对象", "长期自学者"],
      ["重点", "目标 / 周期 / 复盘"],
      ["页面类型", "学习文章"]
    ],
    sections: [
      { title: "先定目标，不要先囤资料", text: "先明确三个月后要做到什么，再倒推需要哪些内容和练习。" },
      { title: "周期越短越容易坚持", text: "与其做半年计划，不如先做两周到四周的小周期。 " },
      { title: "复盘比补课更重要", text: "如果学了很多却没有输出、没有记录，路线图很快就会失效。 " }
    ],
    takeaways: [
      "学习路线图不是课程清单，而是一套能持续执行的节奏安排。",
      "真正有效的路线图通常都带有明确产出和复盘节点。"
    ],
    faq: [
      ["自学路线图需要多详细？", "详细到知道下一步做什么就够，不必写成无法执行的超大计划。"],
      ["为什么总是容易中断？", "常见原因是目标太模糊、周期太长或没有固定复盘。"]
    ],
    related: [
      ["学习笔记方法", "/study-notes-method/"],
      ["前端性能检查清单", "/frontend-performance-checklist/"],
      ["知识文档结构模板", "/docs-structure-template/"]
    ]
  },
  {
    slug: "study-notes-method",
    category: "education-learning",
    type: "guide",
    title: "学习笔记方法怎样更容易复用",
    summary: "围绕课程笔记、项目笔记和复盘整理，说明什么信息值得记、怎么记、怎么回看。",
    description: "面向学习笔记与复盘方法的步骤型页面。",
    eyebrow: "STUDY NOTES METHOD",
    ctaLabel: "查看教育与学习分类",
    ctaUrl: "/education-learning/",
    secondaryLabel: "查看知识文档分类",
    metrics: [
      ["常见场景", "课程 / 项目 / 复盘"],
      ["重点", "结构 / 回看 / 复用"],
      ["适合人群", "学生 / 自学者"]
    ],
    pillars: [
      { title: "只记会复用的信息", text: "概念、步骤、例子和常见错误通常最值得留下。" },
      { title: "笔记需要可回看", text: "如果回头找不到重点，再多笔记也很难真正用起来。 " },
      { title: "学完要写一段自己的话", text: "用自己的语言复述，比直接复制原文更容易形成理解。 " }
    ],
    checklist: [
      "每次笔记最好包含背景、步骤、例子和注意事项。",
      "把零散摘录整理成自己的结构，而不是无限堆原文截图。",
      "隔一段时间回看并补充真实使用中的问题。"
    ],
    faq: [
      ["学习笔记一定要很完整吗？", "不一定，关键是回头能看懂、能复用。"],
      ["笔记和知识文档有什么不同？", "笔记更偏个人理解，知识文档更偏团队协作和共享。"]
    ],
    related: [
      ["自学路线图", "/self-study-roadmap/"],
      ["知识文档结构模板", "/docs-structure-template/"],
      ["产品规格文档流程", "/product-spec-workflow/"]
    ]
  }
];

function makeGuidePage(page) {
  return {
    type: "guide",
    ctaLabel: "查看当前分类",
    ctaUrl: `/${page.category}/`,
    secondaryLabel: "返回分类",
    metrics: [],
    pillars: [],
    checklist: [],
    faq: [],
    related: [],
    ...page
  };
}

function makeArticlePage(page) {
  return {
    type: "article",
    ctaLabel: "查看当前分类",
    ctaUrl: `/${page.category}/`,
    secondaryLabel: "返回分类",
    metrics: [],
    sections: [],
    takeaways: [],
    faq: [],
    related: [],
    ...page
  };
}

function makeToolPage(page) {
  return {
    type: "tool",
    ctaLabel: "查看当前分类",
    ctaUrl: `/${page.category}/`,
    secondaryLabel: "返回分类",
    metrics: [],
    inputLabel: "输入示例",
    inputExample: "",
    outputExample: "",
    steps: [],
    notes: [],
    faq: [],
    related: [],
    ...page
  };
}

const supplementalPages = [
  makeToolPage({
    slug: "dns-http-status-check",
    category: "net-tools",
    title: "域名解析与 HTTP 状态检查",
    summary: "适合域名切换、接口联调和站点上线前快速确认解析结果与页面响应状态。",
    description: "围绕 DNS 解析、HTTP 状态码与基础访问检查的工具型页面。",
    eyebrow: "DNS & HTTP CHECK",
    ctaLabel: "查看网络工具分类",
    metrics: [
      ["适合场景", "域名切换 / 上线前检查"],
      ["重点", "解析 / 状态码 / 跳转"],
      ["页面形式", "核对流程"]
    ],
    inputLabel: "待检查目标",
    inputExample: "example.com\nhttps://example.com/login",
    outputExample: "A 记录已返回\nHTTP 200\n未发现异常跳转",
    steps: [
      { title: "先查解析是否生效", text: "重点看 A 记录、CNAME 或 CDN 返回是否符合预期。" },
      { title: "再看状态码与跳转", text: "确认首页、登录页和表单页没有意外的 301、302 或 5xx。" },
      { title: "最后核对地区差异", text: "如果有 CDN 或海外节点，建议再补一轮不同地区访问检查。" }
    ],
    notes: [
      "解析正常不代表页面一定正常，仍要结合状态码和页面内容一起看。",
      "站点刚切换域名或证书时，缓存和地区传播差异很常见。"
    ],
    faq: [
      ["为什么 DNS 已经生效但页面还是旧的？", "通常和本地缓存、CDN 缓存或浏览器缓存有关。"],
      ["HTTP 200 就一定没问题吗？", "不一定，还要确认页面内容、跳转链路和关键接口是否正常。"]
    ],
    related: [
      ["IPv4 与 CIDR 常用工具", "/ipv4-subnet-toolkit/"],
      ["API 联调检查清单", "/api-debug-checklist/"],
      ["JSON 格式化与结构对比", "/json-format-compare/"]
    ]
  }),
  makeGuidePage({
    slug: "curl-request-builder",
    category: "net-tools",
    title: "curl 请求排查顺序",
    summary: "把 Header、Method、Body 和响应结果拆成更容易检查的顺序，适合排查接口请求差异。",
    description: "面向 curl 请求构造、接口排查和联调核对的指南页。",
    eyebrow: "CURL REQUEST DEBUG",
    metrics: [
      ["适合对象", "开发 / 测试 / 运维"],
      ["关键点", "Header / Method / Body"],
      ["页面形式", "步骤清单"]
    ],
    pillars: [
      { title: "先确认请求方法", text: "GET、POST、PUT 和 DELETE 的差异会直接影响接口返回，不要默认复制旧命令。" },
      { title: "再核对请求头", text: "Authorization、Content-Type 和 Cookie 是最常见的差异点。" },
      { title: "最后保存可复现命令", text: "保留一条最小可复现的 curl 示例，便于前后端快速对齐。" }
    ],
    checklist: [
      "先用最短命令确认域名和状态码可达，再补 header 和 body。",
      "如果和前端结果不一致，先比对 header、token 和 cookie。",
      "把失败请求和成功请求各留一条，便于后续对照。"
    ],
    faq: [
      ["为什么 curl 成功但页面请求失败？", "通常是 cookie、跨域、浏览器环境或 header 不同。"],
      ["curl 命令要不要保留敏感信息？", "不要，建议用占位符替换 token 和私密参数。"]
    ],
    related: [
      ["API 联调检查清单", "/api-debug-checklist/"],
      ["Python API 开发指南", "/python-api-guide/"],
      ["JSON 格式化与结构对比", "/json-format-compare/"]
    ]
  }),
  makeGuidePage({
    slug: "webhook-debug-notes",
    category: "net-tools",
    title: "Webhook 调试记录怎么留",
    summary: "适合支付回调、表单通知和自动化触发场景，重点是把重放、签名和返回结果记录清楚。",
    description: "面向 webhook 调试、回调排查和触发记录的专题指导页。",
    eyebrow: "WEBHOOK DEBUG NOTES",
    metrics: [
      ["适用场景", "支付 / 表单 / 自动化"],
      ["重点", "签名 / 重放 / 返回值"],
      ["适合阶段", "联调 / 上线后排查"]
    ],
    pillars: [
      { title: "先留原始请求", text: "时间、header、body 和签名字段都要保留，避免只截图不留文本。" },
      { title: "再看返回值", text: "确认回调是否因为状态码、超时或格式错误被判定失败。" },
      { title: "最后做重放验证", text: "用同一份 payload 重新验证，能更快区分接口逻辑和外部触发问题。" }
    ],
    checklist: [
      "把请求时间、重试次数和回调来源一起记录。",
      "如果带签名校验，保留签名串和验签逻辑说明。",
      "上线后遇到偶发失败时，优先看超时和幂等处理。"
    ],
    faq: [
      ["Webhook 最常见的问题是什么？", "签名不一致、状态码返回不正确和幂等处理缺失都很常见。"],
      ["为什么要保留重放记录？", "这样更容易定位是第三方重复触发，还是你自己的逻辑异常。"]
    ],
    related: [
      ["curl 请求排查顺序", "/curl-request-builder/"],
      ["API 联调检查清单", "/api-debug-checklist/"],
      ["CSV 清洗与整理工作流", "/csv-cleanup-workflow/"]
    ]
  }),
  makeGuidePage({
    slug: "zh-ai-outline-workflow",
    category: "zh-ai-tools",
    title: "中文 AI 提纲生成流程",
    summary: "适合文章、视频脚本和产品说明起稿，重点是先定结构再填内容，减少结果发散。",
    description: "面向中文 AI 提纲生成与内容结构规划的指导页。",
    eyebrow: "AI OUTLINE WORKFLOW",
    metrics: [
      ["适用内容", "文章 / 脚本 / 方案"],
      ["关键动作", "先结构后细化"],
      ["适合人群", "编辑 / 运营 / 产品"]
    ],
    pillars: [
      { title: "先写目标读者", text: "提纲不是给自己看的，先写清楚最终是给谁阅读。" },
      { title: "再设章节数量", text: "限定层级和段落数量后，模型更容易给出可用结构。" },
      { title: "最后逐段扩写", text: "不要一开始就要求完整长文，先拿到结构再深入。" }
    ],
    checklist: [
      "提纲阶段先控制在 3 到 6 个主段落。",
      "如果结果太散，补一句“按先后顺序组织”。",
      "扩写前先删掉重复和空泛段落。"
    ],
    faq: [
      ["为什么 AI 提纲总是很像？", "因为没有限制目标读者、结构层级和篇幅。"],
      ["提纲适合直接发给团队吗？", "适合作为初稿，但最好补上你的业务重点。"]
    ],
    related: [
      ["中文 AI 写作助手怎么用更稳", "/zh-ai-writing-assistant/"],
      ["产品规格文档应该怎么写更好协作", "/product-spec-workflow/"],
      ["商品详情页文案结构怎么排更顺", "/product-detail-copy/"]
    ]
  }),
  makeGuidePage({
    slug: "zh-ai-article-rewrite",
    category: "zh-ai-tools",
    title: "中文文章改写时怎么减少套话",
    summary: "围绕旧文翻新、内容重写和多版本输出场景，重点是保留信息、调整表达而不是机械替换。",
    description: "面向中文文章改写、内容重写与语气优化的专题页。",
    eyebrow: "ARTICLE REWRITE",
    metrics: [
      ["主要用途", "旧文翻新 / 重写"],
      ["重点", "保留信息 / 降低套话"],
      ["对象", "编辑 / 内容团队"]
    ],
    pillars: [
      { title: "先锁定不能改的信息", text: "事实、参数、时间和观点立场应先明确列出来。" },
      { title: "再指定改写方向", text: "是更口语、更专业还是更适合搜索落地页，方向必须清楚。" },
      { title: "最后逐段人工过一遍", text: "尤其要删掉重复句和无意义总结。 " }
    ],
    checklist: [
      "先抽出原文中的关键事实，再要求重写。",
      "明确禁止“综上所述”“不难看出”这类空泛句。",
      "不同渠道版本建议单独改写，不要直接复制。"
    ],
    faq: [
      ["为什么改写后还是很像原文？", "可能只是换词，没有重新组织信息顺序。"],
      ["减少 AI 味最有效的方法是什么？", "给清晰语气要求，并在第二轮专门清理套话。"]
    ],
    related: [
      ["中文 AI 写作助手怎么用更稳", "/zh-ai-writing-assistant/"],
      ["中文 AI 提纲生成流程", "/zh-ai-outline-workflow/"],
      ["落地页结构模板怎么搭更像真实页面", "/landing-page-structure/"]
    ]
  }),
  makeArticlePage({
    slug: "zh-ai-title-polish",
    category: "zh-ai-tools",
    title: "中文标题润色时该保留什么",
    summary: "适合文章标题、商品标题和活动标题优化，重点是保留搜索意图而不是一味追求花哨。",
    description: "围绕中文标题润色与搜索意图保留的文章页。",
    eyebrow: "TITLE POLISH",
    metrics: [
      ["适合场景", "文章 / 商品 / 活动"],
      ["重点", "搜索意图 / 可读性"],
      ["页面类型", "方法文章"]
    ],
    sections: [
      { title: "先保留核心主题", text: "如果主题词丢了，标题再顺也无法承接搜索流量。" },
      { title: "再优化可读性", text: "让读者更容易一眼看懂，而不是只堆很多修饰词。" },
      { title: "最后看渠道差异", text: "搜索页、社媒封面和商品列表的标题写法并不一样。" }
    ],
    takeaways: [
      "标题润色的重点是更清楚，不是更复杂。",
      "如果页面依赖搜索流量，标题中最关键的词不要轻易删。"
    ],
    faq: [
      ["标题要不要都做成短句？", "不一定，要看承载渠道和关键词要求。"],
      ["花哨标题会更有效吗？", "很多时候反而会降低搜索匹配和理解速度。"]
    ],
    related: [
      ["中文文章改写时怎么减少套话", "/zh-ai-article-rewrite/"],
      ["商品详情页文案结构怎么排更顺", "/product-detail-copy/"],
      ["越南语商品文案怎么用 AI 起草", "/vi-ai-product-copy/"]
    ]
  }),
  makeGuidePage({
    slug: "vi-ai-customer-chat",
    category: "vi-ai-tools",
    title: "越南语客服对话初稿怎么写",
    summary: "适合售前咨询、售后解释和订单沟通场景，重点是语气自然、边界清楚。",
    description: "面向越南语客服对话与售前售后沟通的指导页。",
    eyebrow: "VI CUSTOMER CHAT",
    metrics: [
      ["适用场景", "售前 / 售后 / 订单"],
      ["重点", "语气 / 清晰 / 边界"],
      ["对象", "跨境客服 / 运营"]
    ],
    pillars: [
      { title: "先明确对话目的", text: "先判断是解释、催付、回复问题还是引导补资料。" },
      { title: "再限定语气", text: "礼貌、简洁或偏促单的写法差别很大，不能混写。" },
      { title: "最后核对敏感信息", text: "价格、时效、售后范围和活动条件要人工确认。" }
    ],
    checklist: [
      "同一句中文不要机械逐字翻成越南语客服话术。",
      "遇到时间和价格变化时，要避免绝对承诺。",
      "高频问答应整理到 FAQ 页面，便于长期复用。"
    ],
    faq: [
      ["越南语客服最容易出什么问题？", "常见是语气不自然，或者把中文表达生硬直译过去。"],
      ["适合直接上线使用吗？", "更适合作为初稿，正式使用前仍要校对。"]
    ],
    related: [
      ["越南语商品文案怎么用 AI 起草", "/vi-ai-product-copy/"],
      ["中文到越南语本地化检查清单", "/zh-vi-localization-checklist/"],
      ["中文与越南语本地化协作怎么分工", "/zh-vi-localization/"]
    ]
  }),
  makeArticlePage({
    slug: "vietnamese-ad-copy-checklist",
    category: "vi-ai-tools",
    title: "越南语广告文案上线前检查点",
    summary: "围绕活动页、广告标题和促销卖点整理更适合上线前核对的检查清单。",
    description: "面向越南语广告文案与活动页面上线检查的文章页。",
    eyebrow: "VI AD CHECKLIST",
    metrics: [
      ["页面类型", "检查清单"],
      ["重点", "活动 / 时效 / 语气"],
      ["适合阶段", "上线前复核"]
    ],
    sections: [
      { title: "先确认活动信息", text: "折扣、赠品、时效和使用条件必须先核对清楚。" },
      { title: "再看表达语气", text: "广告文案要更像本地平台表达，而不是中文营销词直译。" },
      { title: "最后查按钮和落地页", text: "文案和页面动作要一致，避免广告说法和落地页内容脱节。" }
    ],
    takeaways: [
      "越南语广告文案的重点是自然和可信，而不是翻得完整。",
      "价格、时间和优惠范围必须放在最后一轮人工检查里。"
    ],
    faq: [
      ["广告文案和商品详情页能共用吗？", "可以参考，但通常不建议原样复用。"],
      ["为什么要检查按钮文案？", "因为按钮语气和落地页动作会直接影响转化。"]
    ],
    related: [
      ["越南语客服对话初稿怎么写", "/vi-ai-customer-chat/"],
      ["越南语商品文案怎么用 AI 起草", "/vi-ai-product-copy/"],
      ["多语文案校对流程与检查点", "/multilingual-copy-review/"]
    ]
  }),
  makeGuidePage({
    slug: "vi-market-keyword-notes",
    category: "vi-ai-tools",
    title: "越南语市场关键词整理方法",
    summary: "适合商品标题、活动页和搜索词研究场景，重点是按意图分组而不是直接翻译。",
    description: "围绕越南语市场关键词整理与搜索意图分组的指导页。",
    eyebrow: "VI KEYWORD NOTES",
    metrics: [
      ["适合用途", "标题 / 搜索 / 活动页"],
      ["重点", "意图分组"],
      ["对象", "运营 / 内容"]
    ],
    pillars: [
      { title: "先按用户意图分组", text: "购买词、比较词和问题词应分开处理。" },
      { title: "再做本地表达筛选", text: "同一商品在不同平台上的关键词表达可能差别很大。" },
      { title: "最后回到页面结构", text: "关键词不是单独存在的，要落到标题、段落和按钮里。" }
    ],
    checklist: [
      "不要把中文关键词直接翻成越南语就拿去用。",
      "高频词和转化词分开整理，方便页面布局。",
      "每次上新或做活动前都应补一次关键词核对。"
    ],
    faq: [
      ["关键词整理和翻译有什么不同？", "关键词整理更强调用户意图和页面使用位置。"],
      ["适合做成表格吗？", "很适合，后续更新会更容易维护。"]
    ],
    related: [
      ["中文到越南语本地化检查清单", "/zh-vi-localization-checklist/"],
      ["中文与越南语本地化协作怎么分工", "/zh-vi-localization/"],
      ["越南语广告文案上线前检查点", "/vietnamese-ad-copy-checklist/"]
    ]
  }),
  makeGuidePage({
    slug: "ai-code-review-checklist",
    category: "development",
    title: "代码评审前的 AI 辅助检查清单",
    summary: "适合提交前自查、功能回归和接口改动复核，重点是先把低级问题在本地扫掉。",
    description: "面向代码评审、提交前检查和 AI 辅助自查的指南页。",
    eyebrow: "AI CODE REVIEW",
    metrics: [
      ["适合阶段", "提交前 / Review 前"],
      ["重点", "回归 / 边界 / 命名"],
      ["对象", "开发团队"]
    ],
    pillars: [
      { title: "先查行为变化", text: "确认改动是否影响旧接口、旧页面和已有流程。" },
      { title: "再查边界条件", text: "空值、异常分支、权限和失败提示要优先检查。" },
      { title: "最后整理评审上下文", text: "把改动原因、范围和已验证结果说清楚，评审效率会高很多。" }
    ],
    checklist: [
      "先跑最接近实际使用路径的验证，而不是只看 happy path。",
      "高风险改动应补充影响范围说明。",
      "提交前先清理无关日志和临时代码。"
    ],
    faq: [
      ["AI 能替代代码评审吗？", "不能，但很适合先做一轮自查。"],
      ["最值得先查什么？", "行为回归、边界条件和错误提示通常最值得优先查。"]
    ],
    related: [
      ["Python API 开发指南从接口设计开始", "/python-api-guide/"],
      ["前端性能检查清单", "/frontend-performance-checklist/"],
      ["API 联调检查清单", "/api-debug-checklist/"]
    ]
  }),
  makeArticlePage({
    slug: "release-notes-template",
    category: "development",
    title: "版本发布说明模板怎么写",
    summary: "适合版本上线、内部通知和对外更新公告场景，重点是让读者知道改了什么和影响什么。",
    description: "围绕发布说明、更新公告和版本变更记录的文章页。",
    eyebrow: "RELEASE NOTES",
    metrics: [
      ["适合场景", "版本上线 / 更新公告"],
      ["重点", "变更 / 影响 / 回滚"],
      ["页面类型", "模板文章"]
    ],
    sections: [
      { title: "先写用户能感知的变化", text: "把功能、页面和流程变化放在最前面，而不是先写内部细节。" },
      { title: "再写影响范围", text: "版本影响到哪些角色、哪些模块、哪些数据要说清楚。" },
      { title: "最后写风险和回滚", text: "如果有兼容性风险或迁移要求，不要放到最后一行才提。 " }
    ],
    takeaways: [
      "发布说明不是流水账，而是帮助团队和用户快速理解变更的文档。",
      "如果一份说明不能回答“改了什么、影响谁、要注意什么”，就还不够清楚。"
    ],
    faq: [
      ["发布说明需要很长吗？", "不一定，重点是结构清楚。"],
      ["内部和外部说明能共用吗？", "可以共用一部分，但细节层级通常不同。"]
    ],
    related: [
      ["产品规格文档应该怎么写更好协作", "/product-spec-workflow/"],
      ["代码评审前的 AI 辅助检查清单", "/ai-code-review-checklist/"],
      ["知识文档结构模板怎么搭", "/docs-structure-template/"]
    ]
  }),
  makeGuidePage({
    slug: "browser-console-debug-guide",
    category: "development",
    title: "浏览器控制台排错顺序",
    summary: "适合前端页面异常、接口报错和脚本失效场景，重点是先定位范围再深挖原因。",
    description: "面向浏览器控制台排错、前端异常定位和脚本问题处理的指南页。",
    eyebrow: "CONSOLE DEBUG",
    metrics: [
      ["适合页面", "站点 / 工具页 / 后台"],
      ["重点", "报错 / 网络 / 脚本"],
      ["对象", "前端 / 测试"]
    ],
    pillars: [
      { title: "先看报错类型", text: "区分是资源加载失败、脚本报错还是接口返回异常。" },
      { title: "再看 Network 请求", text: "把报错页面和请求结果对应起来，避免只盯控制台文字。" },
      { title: "最后做最小复现", text: "只保留一条关键路径，能更快看清问题真正位置。" }
    ],
    checklist: [
      "先刷新并保留 console、network 两边的关键记录。",
      "发现报错时记录浏览器、系统和复现步骤。",
      "排查跨域或缓存问题时，记得说明环境差异。"
    ],
    faq: [
      ["控制台没报错就说明前端没问题吗？", "不一定，很多问题会出现在 network 或页面逻辑层。"],
      ["需要把全部日志都发给团队吗？", "建议先提炼关键报错和复现步骤。"]
    ],
    related: [
      ["前端性能检查清单", "/frontend-performance-checklist/"],
      ["JSON 格式化与结构对比", "/json-format-compare/"],
      ["curl 请求排查顺序", "/curl-request-builder/"]
    ]
  }),
  makeArticlePage({
    slug: "ops-runbook-template",
    category: "knowledge-docs",
    title: "运维 Runbook 模板怎么写",
    summary: "适合上线、故障处理和例行维护场景，重点是让任何接手的人都能按步骤执行。",
    description: "围绕运维 Runbook、故障处理和流程说明的文章页。",
    eyebrow: "RUNBOOK TEMPLATE",
    metrics: [
      ["适合场景", "上线 / 故障 / 维护"],
      ["重点", "步骤 / 风险 / 回滚"],
      ["页面类型", "模板文章"]
    ],
    sections: [
      { title: "先写适用范围", text: "明确这个 runbook 是给谁、处理什么问题、何时使用。" },
      { title: "再写逐步动作", text: "每一步都应该可执行，而不是只写原则。" },
      { title: "最后补风险与回滚", text: "如果有不可逆操作，回滚方案必须提前写清楚。" }
    ],
    takeaways: [
      "Runbook 的价值在于可交接和可重复，不是写得多专业。",
      "关键动作、判断条件和回滚路径应始终出现在同一页里。"
    ],
    faq: [
      ["Runbook 和知识库文章有什么区别？", "Runbook 更偏执行步骤和操作约束。"],
      ["适合只写给资深同事看吗？", "不建议，越能让新人看懂越有价值。"]
    ],
    related: [
      ["知识文档结构模板怎么搭", "/docs-structure-template/"],
      ["版本发布说明模板怎么写", "/release-notes-template/"],
      ["新手第一次买 VPS 的判断顺序", "/starter-vps-guide/"]
    ]
  }),
  makeGuidePage({
    slug: "meeting-summary-template",
    category: "knowledge-docs",
    title: "会议纪要模板怎么写更有用",
    summary: "围绕讨论结论、责任人和下一步安排整理更适合团队复用的会议纪要结构。",
    description: "面向会议纪要、协作记录和行动项整理的指导页。",
    eyebrow: "MEETING SUMMARY",
    metrics: [
      ["适合对象", "产品 / 运营 / 开发"],
      ["重点", "结论 / 责任人 / 时间"],
      ["页面形式", "模板指南"]
    ],
    pillars: [
      { title: "先写结论", text: "不要让读者翻半天才知道最后决定了什么。" },
      { title: "再写行动项", text: "责任人、截止时间和依赖关系应单独列出。" },
      { title: "最后补背景", text: "背景和过程可以写，但不要盖过结论本身。" }
    ],
    checklist: [
      "每次会议纪要至少包含结论、行动项和负责人。",
      "不要只记录讨论过程，真正要沉淀的是下一步动作。",
      "会后一天内发出纪要，内容会更准确。"
    ],
    faq: [
      ["会议纪要一定要很完整吗？", "不一定，最关键的是让行动项可执行。"],
      ["纪要适合做成长文吗？", "如果信息很多，可以拆成总结和附件两层。"]
    ],
    related: [
      ["产品规格文档应该怎么写更好协作", "/product-spec-workflow/"],
      ["知识文档结构模板怎么搭", "/docs-structure-template/"],
      ["学习笔记方法怎样更容易复用", "/study-notes-method/"]
    ]
  }),
  makeArticlePage({
    slug: "wiki-directory-planning",
    category: "knowledge-docs",
    title: "团队 Wiki 目录该怎么规划",
    summary: "适合知识库初始化和旧文档重整场景，重点是让目录按照使用场景而不是部门堆叠。",
    description: "围绕团队 Wiki 目录规划与知识库结构设计的文章页。",
    eyebrow: "WIKI DIRECTORY",
    metrics: [
      ["页面类型", "规划文章"],
      ["重点", "场景 / 路径 / 查找"],
      ["适合阶段", "知识库重建"]
    ],
    sections: [
      { title: "先看读者怎么找信息", text: "目录结构应围绕问题、流程和角色，而不是围绕内部组织结构。" },
      { title: "再决定一级目录", text: "一级目录越少越好，但每个目录要有清晰边界。" },
      { title: "最后安排迁移顺序", text: "老文档迁移时应先迁高频内容，再清理低价值内容。" }
    ],
    takeaways: [
      "Wiki 目录的目标是更容易找，不是更像组织架构图。",
      "高频问题、高频流程和高频页面应优先放到最浅层级。"
    ],
    faq: [
      ["Wiki 一开始需要分很细吗？", "通常不需要，先把高频内容组织清楚更重要。"],
      ["旧目录要不要直接删除？", "建议先迁移和归档，再逐步清理。"]
    ],
    related: [
      ["知识文档结构模板怎么搭", "/docs-structure-template/"],
      ["私域 FAQ 知识库应该怎么搭", "/private-domain-faq-library/"],
      ["运维 Runbook 模板怎么写", "/ops-runbook-template/"]
    ]
  }),
  makeGuidePage({
    slug: "onboarding-message-template",
    category: "customer-growth",
    title: "新用户欢迎语怎么写更自然",
    summary: "适合私域、SaaS 引导和社群欢迎场景，重点是先说明价值，再引导下一步动作。",
    description: "面向新用户欢迎语、首条消息与 onboarding 引导的指导页。",
    eyebrow: "ONBOARDING MESSAGE",
    metrics: [
      ["适合场景", "私域 / SaaS / 社群"],
      ["重点", "价值 / 动作 / 节奏"],
      ["对象", "运营 / 客服"]
    ],
    pillars: [
      { title: "先说明用户能得到什么", text: "欢迎语不该只是问好，要告诉用户接下来能获取什么帮助。" },
      { title: "再给一个动作", text: "引导查看文档、填写资料或回复关键词都可以，但只给一个主动作。" },
      { title: "最后控制篇幅", text: "首条欢迎消息越长，用户越容易跳过。" }
    ],
    checklist: [
      "先说价值，再说规则，最后给动作。",
      "不要在第一条消息里塞入太多链接。",
      "欢迎语应与后续 FAQ 和 SOP 保持一致。"
    ],
    faq: [
      ["欢迎语需要很热情吗？", "重点是自然和清楚，不一定要很夸张。"],
      ["第一条消息里适合放优惠吗？", "可以，但不要盖过最主要的引导目标。"]
    ],
    related: [
      ["客服回复 SOP 怎么整理", "/customer-service-reply-playbook/"],
      ["私域 FAQ 知识库应该怎么搭", "/private-domain-faq-library/"],
      ["中文 AI 客服回复的写法", "/zh-ai-customer-reply/"]
    ]
  }),
  makeArticlePage({
    slug: "refund-faq-structure",
    category: "customer-growth",
    title: "退款 FAQ 结构怎么写更清楚",
    summary: "适合售后解释、退款申请和规则说明场景，重点是先把条件和流程说清楚。",
    description: "围绕退款 FAQ 结构、售后规则说明和用户沟通的文章页。",
    eyebrow: "REFUND FAQ",
    metrics: [
      ["适合场景", "售后 / 退款 / 规则页"],
      ["重点", "条件 / 流程 / 时效"],
      ["页面类型", "FAQ 文章"]
    ],
    sections: [
      { title: "先写能不能退", text: "用户最想先知道的是是否符合退款条件，而不是先看条款背景。" },
      { title: "再写怎么退", text: "申请入口、材料要求和处理流程应明确列出。" },
      { title: "最后写多久完成", text: "退款周期、到账时间和特殊情况要写清楚。" }
    ],
    takeaways: [
      "退款 FAQ 越具体，客服重复解释成本越低。",
      "规则页要少空话，多条件和流程。"
    ],
    faq: [
      ["退款 FAQ 和客服回复模板需要分开吗？", "建议分开，一个负责规则，一个负责对话场景。"],
      ["规则改动后先更新哪里？", "优先更新 FAQ 和对外页面，再同步客服话术。"]
    ],
    related: [
      ["客服回复 SOP 怎么整理", "/customer-service-reply-playbook/"],
      ["私域 FAQ 知识库应该怎么搭", "/private-domain-faq-library/"],
      ["新用户欢迎语怎么写更自然", "/onboarding-message-template/"]
    ]
  }),
  makeGuidePage({
    slug: "lead-qualification-checklist",
    category: "customer-growth",
    title: "线索初筛时要先问什么",
    summary: "适合表单咨询、私信询盘和售前沟通场景，重点是快速判断意向与匹配度。",
    description: "面向线索初筛、售前问询与客户资格判断的指南页。",
    eyebrow: "LEAD QUALIFICATION",
    metrics: [
      ["适合场景", "询盘 / 售前 / 私信"],
      ["重点", "需求 / 预算 / 时间"],
      ["对象", "销售 / 运营 / 客服"]
    ],
    pillars: [
      { title: "先问目标", text: "搞清楚用户想解决什么问题，比先问预算更有效。" },
      { title: "再问时间和预算", text: "项目周期和预算会直接影响后续沟通深度。" },
      { title: "最后给下一步动作", text: "如果暂时不匹配，也要给出明确出口。" }
    ],
    checklist: [
      "不要一开始就罗列太多问题，先抓最关键的 3 个。",
      "把高价值线索和普通咨询区分开处理。",
      "对不匹配线索也应有统一回复策略。"
    ],
    faq: [
      ["初筛问题可以写成固定模板吗？", "可以，但应按业务类型做微调。"],
      ["为什么很多线索聊着聊着就断了？", "常见是前面提问太散，或者没有清楚的下一步动作。"]
    ],
    related: [
      ["新用户欢迎语怎么写更自然", "/onboarding-message-template/"],
      ["中文 AI 客服回复的写法", "/zh-ai-customer-reply/"],
      ["香港服务器租用与业务匹配", "/hongkong-server/"]
    ]
  }),
  makeArticlePage({
    slug: "pricing-page-copy-structure",
    category: "ecommerce-content",
    title: "价格页文案结构怎么排更清楚",
    summary: "适合套餐页、订阅页和服务报价页，重点是先讲差异，再讲价格与规则。",
    description: "围绕价格页文案、套餐说明与购买判断结构的文章页。",
    eyebrow: "PRICING PAGE COPY",
    metrics: [
      ["适合页面", "套餐页 / 订阅页"],
      ["重点", "差异 / 规则 / CTA"],
      ["页面类型", "结构文章"]
    ],
    sections: [
      { title: "先写套餐差异", text: "价格不是第一眼唯一要看的内容，用户先想知道差别在哪里。" },
      { title: "再写收费规则", text: "月付年付、赠送项目和限制条件要明确。" },
      { title: "最后再放动作", text: "当用户完成比较后，再给购买或咨询入口更自然。" }
    ],
    takeaways: [
      "价格页的重点是帮助判断，而不是只让用户看到数字。",
      "如果规则说明不清楚，后续客服成本会显著上升。"
    ],
    faq: [
      ["价格页一定要有对比表吗？", "很多场景下有帮助，但不一定必须。"],
      ["低价套餐要不要藏限制？", "不建议，规则应尽量提前写清楚。"]
    ],
    related: [
      ["商品详情页文案结构怎么排更顺", "/product-detail-copy/"],
      ["落地页结构模板怎么搭更像真实页面", "/landing-page-structure/"],
      ["香港服务器租用与业务匹配", "/hongkong-server/"]
    ]
  }),
  makeGuidePage({
    slug: "sku-selling-points-matrix",
    category: "ecommerce-content",
    title: "SKU 卖点矩阵怎么整理",
    summary: "适合多规格商品、多套餐页面和活动页梳理，重点是让用户更快看懂差异。",
    description: "面向 SKU 卖点矩阵、规格对比与商品信息整理的指导页。",
    eyebrow: "SKU MATRIX",
    metrics: [
      ["适用场景", "多规格 / 多套餐"],
      ["重点", "差异 / 卖点 / 展示顺序"],
      ["对象", "电商运营 / 内容"]
    ],
    pillars: [
      { title: "先拆共同点和差异点", text: "把通用信息和差异信息分开，页面会清楚很多。" },
      { title: "再按购买优先级排序", text: "用户最关心的维度应排在最前面。" },
      { title: "最后回到页面模块", text: "矩阵不是表格终点，还要落到标题、卡片和详情模块里。" }
    ],
    checklist: [
      "差异点不要写成一大段，建议拆成列。",
      "价格、规格和适用场景应保持同一排序逻辑。",
      "活动期间新增套餐时，先补矩阵再改页面。"
    ],
    faq: [
      ["SKU 多的时候是不是只能做表格？", "表格很有用，但也可以拆成卡片和重点模块。"],
      ["矩阵适合谁维护？", "最好由内容和商品负责人共同维护。"]
    ],
    related: [
      ["商品详情页文案结构怎么排更顺", "/product-detail-copy/"],
      ["价格页文案结构怎么排更清楚", "/pricing-page-copy-structure/"],
      ["越南语商品文案怎么用 AI 起草", "/vi-ai-product-copy/"]
    ]
  }),
  makeGuidePage({
    slug: "promotion-landing-checklist",
    category: "ecommerce-content",
    title: "活动落地页上线前检查清单",
    summary: "适合大促、报名页和短期活动页面，重点是先查时间、库存、按钮和跳转。",
    description: "面向活动落地页、促销页面与上线前检查的指南页。",
    eyebrow: "PROMOTION CHECKLIST",
    metrics: [
      ["适合页面", "活动页 / 报名页"],
      ["重点", "时间 / 按钮 / 跳转"],
      ["适合阶段", "上线前复查"]
    ],
    pillars: [
      { title: "先核对活动信息", text: "时间、价格、库存和规则文字必须全部一致。" },
      { title: "再看转化路径", text: "按钮、表单、咨询入口和支付跳转要全链路检查。" },
      { title: "最后看移动端", text: "很多活动页问题都在移动端按钮、弹窗和加载上。" }
    ],
    checklist: [
      "主标题、副标题和活动规则不能互相冲突。",
      "至少走一遍完整下单或报名流程。",
      "活动结束后记得安排下线或替换方案。"
    ],
    faq: [
      ["活动页为什么经常上线后才发现问题？", "通常是没有按完整路径做检查。"],
      ["活动页要不要单独做移动端复查？", "建议必须做。"]
    ],
    related: [
      ["落地页结构模板怎么搭更像真实页面", "/landing-page-structure/"],
      ["前端性能检查清单", "/frontend-performance-checklist/"],
      ["价格页文案结构怎么排更清楚", "/pricing-page-copy-structure/"]
    ]
  }),
  makeArticlePage({
    slug: "english-chinese-term-base",
    category: "translation-language",
    title: "中英术语表怎么建更省事",
    summary: "适合产品文档、界面文案和跨团队协作场景，重点是统一术语并持续维护。",
    description: "围绕中英术语表、术语统一与协作文案管理的文章页。",
    eyebrow: "TERM BASE",
    metrics: [
      ["适合场景", "文档 / UI / 协作"],
      ["重点", "统一 / 维护 / 复用"],
      ["页面类型", "术语文章"]
    ],
    sections: [
      { title: "先整理高频术语", text: "按钮、功能名、状态名和模块名应优先建立对照。" },
      { title: "再写使用边界", text: "同一个词在哪些场景用、哪些场景不用要标清楚。" },
      { title: "最后设更新机制", text: "术语表不是建完就结束，需要跟版本持续更新。" }
    ],
    takeaways: [
      "术语表的最大价值是减少团队内部重复争论。",
      "如果高频词没有统一，页面、文档和客服文本很快会分裂。"
    ],
    faq: [
      ["术语表适合放在文档里还是表格里？", "都可以，关键是便于查询和更新。"],
      ["只做一次整理够吗？", "通常不够，产品变化后要继续维护。"]
    ],
    related: [
      ["中文与越南语本地化协作怎么分工", "/zh-vi-localization/"],
      ["多语文案校对流程与检查点", "/multilingual-copy-review/"],
      ["产品规格文档应该怎么写更好协作", "/product-spec-workflow/"]
    ]
  }),
  makeGuidePage({
    slug: "app-ui-copy-localization",
    category: "translation-language",
    title: "应用界面文案本地化要先看什么",
    summary: "适合按钮、弹窗、设置页和引导页本地化，重点是长度、语气和上下文一致性。",
    description: "面向应用界面文案本地化与 UI copy 协作的指导页。",
    eyebrow: "UI COPY LOCALIZATION",
    metrics: [
      ["适合场景", "按钮 / 弹窗 / 设置页"],
      ["重点", "长度 / 语气 / 上下文"],
      ["对象", "产品 / 设计 / 本地化"]
    ],
    pillars: [
      { title: "先看上下文", text: "同一个词在按钮、标题和设置项里的翻译方式可能完全不同。" },
      { title: "再看长度约束", text: "UI 文案比普通正文更容易因为字数和排版出问题。" },
      { title: "最后统一语气", text: "确认系统语气、按钮风格和错误提示是否一致。" }
    ],
    checklist: [
      "界面文案不要脱离页面上下文单独翻译。",
      "重点按钮建议在真机或设计稿里再看一遍长度。",
      "错误提示和确认弹窗要统一语气。"
    ],
    faq: [
      ["UI 文案能用普通翻译流程处理吗？", "可以参考，但最好单独做一轮界面核对。"],
      ["按钮越短越好吗？", "通常更好，但不能牺牲清楚度。"]
    ],
    related: [
      ["中英术语表怎么建更省事", "/english-chinese-term-base/"],
      ["多语文案校对流程与检查点", "/multilingual-copy-review/"],
      ["中文到越南语本地化检查清单", "/zh-vi-localization-checklist/"]
    ]
  }),
  makeToolPage({
    slug: "subtitle-length-checker",
    category: "translation-language",
    title: "字幕长度检查与换行建议",
    summary: "适合视频字幕、多语标题和短句文案场景，重点是检查长度、换行和阅读节奏。",
    description: "围绕字幕长度、换行建议和短句文案检查的工具型页面。",
    eyebrow: "SUBTITLE LENGTH",
    metrics: [
      ["适合内容", "字幕 / 标题 / 短句"],
      ["重点", "长度 / 换行 / 节奏"],
      ["页面形式", "检查流程"]
    ],
    inputLabel: "待检查字幕",
    inputExample: `欢迎来到 ${ctx.brand} 网站导航，我们帮你更快找到合适工具。`,
    outputExample: `建议分为 2 行\n第 1 行：欢迎来到 ${ctx.brand} 网站导航\n第 2 行：我们帮你更快找到合适工具`,
    steps: [
      { title: "先看单行长度", text: "不要让每行过长，尤其是移动端和视频字幕场景。" },
      { title: "再看停顿位置", text: "换行应尽量落在语义停顿点，而不是强行切断词组。" },
      { title: "最后看阅读节奏", text: "长度合适但节奏不自然时，也会影响理解。" }
    ],
    notes: [
      "字幕类内容除了长度，还要关注自然停顿和上下文连贯。",
      "多语版本长度差异很大，建议分别检查。"
    ],
    faq: [
      ["字幕长度有统一标准吗？", "没有绝对标准，但应结合场景控制可读性。"],
      ["只检查字数够吗？", "不够，还要看换行和语义完整度。"]
    ],
    related: [
      ["应用界面文案本地化要先看什么", "/app-ui-copy-localization/"],
      ["多语文案校对流程与检查点", "/multilingual-copy-review/"],
      ["中文文章改写时怎么减少套话", "/zh-ai-article-rewrite/"]
    ]
  }),
  makeToolPage({
    slug: "markdown-table-cleaner",
    category: "data-processing",
    title: "Markdown 表格清理步骤",
    summary: "适合文档整理、知识库迁移和 README 排版场景，重点是统一列数和对齐格式。",
    description: "面向 Markdown 表格清理、结构对齐与文档整理的工具型页面。",
    eyebrow: "MARKDOWN TABLE",
    metrics: [
      ["适合场景", "文档 / README / Wiki"],
      ["重点", "列数 / 对齐 / 转换"],
      ["页面形式", "流程工具"]
    ],
    inputLabel: "待清理表格",
    inputExample: "| name | value |\n| --- | --- |\n| api | ok |\n| web | stable |",
    outputExample: "列数一致\n建议统一对齐方式\n可继续导出到文档或 Wiki",
    steps: [
      { title: "先统一列数", text: "列数不一致会导致后续导入和显示都出问题。" },
      { title: "再统一对齐方式", text: "左对齐、居中和右对齐要按信息类型做选择。" },
      { title: "最后做预览检查", text: "在真实 Markdown 渲染环境里再看一遍格式。" }
    ],
    notes: [
      "Markdown 表格常见问题是复制来源太杂，导致列数和空格不统一。",
      "如果要导入 Wiki 或文档系统，建议先做一次渲染预览。"
    ],
    faq: [
      ["Markdown 表格为什么总是显示错位？", "很多时候是列数不一致或存在隐藏空格。"],
      ["适合直接从 Excel 粘贴吗？", "可以，但最好先做一次中间清理。"]
    ],
    related: [
      ["CSV 清洗与整理工作流", "/csv-cleanup-workflow/"],
      ["知识文档结构模板怎么搭", "/docs-structure-template/"],
      ["列映射模板怎么整理", "/column-mapping-template/"]
    ]
  }),
  makeGuidePage({
    slug: "text-dedup-checklist",
    category: "data-processing",
    title: "文本去重前先确认什么",
    summary: "适合名单、评论、文案库和知识条目整理，重点是先定义重复规则再开始处理。",
    description: "围绕文本去重、数据规则和内容整理的步骤型页面。",
    eyebrow: "TEXT DEDUP",
    metrics: [
      ["适合数据", "名单 / 评论 / 文案"],
      ["重点", "规则 / 归一化 / 备份"],
      ["对象", "运营 / 内容 / 数据"]
    ],
    pillars: [
      { title: "先定义重复", text: "完全相同、大小写不同或近似相同，去重规则完全不同。" },
      { title: "再做归一化", text: "空格、标点和大小写经常影响去重结果。" },
      { title: "最后保留原始数据", text: "去重前一定保留源文件，方便回查。" }
    ],
    checklist: [
      "先给重复规则写一句明确说明。",
      "涉及客户数据时，先确认误删风险。",
      "去重后抽样复查几条边界样本。"
    ],
    faq: [
      ["文本去重是不是只靠工具就行？", "很多时候规则比工具更关键。"],
      ["去重后为什么还有重复？", "可能是归一化步骤没做，或重复规则定义不一致。"]
    ],
    related: [
      ["CSV 清洗与整理工作流", "/csv-cleanup-workflow/"],
      ["Markdown 表格清理步骤", "/markdown-table-cleaner/"],
      ["JSON 格式化与结构对比", "/json-format-compare/"]
    ]
  }),
  makeArticlePage({
    slug: "column-mapping-template",
    category: "data-processing",
    title: "列映射模板怎么整理",
    summary: "适合系统迁移、表格导入和接口字段对应场景，重点是把来源字段和目标字段对齐。",
    description: "围绕列映射模板、字段对应和迁移整理的文章页。",
    eyebrow: "COLUMN MAPPING",
    metrics: [
      ["适合场景", "导入 / 迁移 / 字段对应"],
      ["重点", "来源 / 目标 / 规则"],
      ["页面类型", "模板文章"]
    ],
    sections: [
      { title: "先列来源字段", text: "源系统字段名称、类型和示例值应先完整列出来。" },
      { title: "再列目标字段", text: "目标系统字段和必填规则要对照写清楚。" },
      { title: "最后写转换规则", text: "格式转换、单位换算和空值处理要单独注明。" }
    ],
    takeaways: [
      "字段映射最怕口头约定，最好形成稳定模板。",
      "如果转换规则没写清楚，导入后的问题会非常难查。"
    ],
    faq: [
      ["列映射表适合谁维护？", "最好由业务方和技术方共同维护。"],
      ["只写字段名够吗？", "不够，示例值和规则说明同样重要。"]
    ],
    related: [
      ["JSON 格式化与结构对比", "/json-format-compare/"],
      ["CSV 清洗与整理工作流", "/csv-cleanup-workflow/"],
      ["Python API 开发指南从接口设计开始", "/python-api-guide/"]
    ]
  }),
  makeGuidePage({
    slug: "exam-revision-checklist",
    category: "education-learning",
    title: "考试复习清单怎么排更稳",
    summary: "适合阶段性复习、冲刺计划和知识点回顾场景，重点是把范围、节奏和检查点排清楚。",
    description: "面向考试复习清单、冲刺计划和知识点回顾的指导页。",
    eyebrow: "REVISION CHECKLIST",
    metrics: [
      ["适合阶段", "复习 / 冲刺"],
      ["重点", "范围 / 节奏 / 检查点"],
      ["对象", "学生 / 自学者"]
    ],
    pillars: [
      { title: "先列复习范围", text: "先把章节、题型和重点范围列清楚，避免边做边补。" },
      { title: "再排复习节奏", text: "不同内容块安排不同时间，不要平均分配。" },
      { title: "最后设检查点", text: "用小测、口述或错题回看确认是否真正掌握。" }
    ],
    checklist: [
      "冲刺期优先回看高频错题和重点章节。",
      "每天安排一个可完成的小闭环。",
      "不要把所有时间都放在看资料，留出输出时间。"
    ],
    faq: [
      ["复习清单是不是越细越好？", "够执行即可，太细反而容易拖延。"],
      ["冲刺期适合再学新内容吗？", "一般应优先巩固已有范围。"]
    ],
    related: [
      ["自学路线图应该怎么排更容易坚持", "/self-study-roadmap/"],
      ["学习笔记方法怎样更容易复用", "/study-notes-method/"],
      ["每周学习复盘怎么写", "/weekly-learning-review/"]
    ]
  }),
  makeArticlePage({
    slug: "weekly-learning-review",
    category: "education-learning",
    title: "每周学习复盘怎么写",
    summary: "适合长期学习、项目练习和自学输出场景，重点是记录有效动作而不是流水账。",
    description: "围绕每周学习复盘、输出总结和自学节奏维护的文章页。",
    eyebrow: "WEEKLY REVIEW",
    metrics: [
      ["页面类型", "复盘文章"],
      ["重点", "输出 / 问题 / 下周计划"],
      ["适合对象", "长期自学者"]
    ],
    sections: [
      { title: "先写做了什么", text: "记录本周真正完成的动作和产出，而不是只写学习意图。" },
      { title: "再写卡在哪里", text: "遇到的问题和阻塞点比空泛总结更有价值。" },
      { title: "最后排下周计划", text: "下周计划越具体，越容易继续执行。" }
    ],
    takeaways: [
      "复盘的重点是给下周服务，不是写得好看。",
      "只写“这周学了很多”几乎没有复用价值。"
    ],
    faq: [
      ["复盘适合每天写还是每周写？", "很多人每周一版更容易长期坚持。"],
      ["需要写得很长吗？", "不需要，关键是有问题和下一步。"]
    ],
    related: [
      ["自学路线图应该怎么排更容易坚持", "/self-study-roadmap/"],
      ["考试复习清单怎么排更稳", "/exam-revision-checklist/"],
      ["学习笔记方法怎样更容易复用", "/study-notes-method/"]
    ]
  }),
  makeGuidePage({
    slug: "flashcard-notes-workflow",
    category: "education-learning",
    title: "卡片笔记和长笔记怎么配合",
    summary: "适合知识整理、课程复盘和长期积累场景，重点是把碎片知识和系统知识分开存放。",
    description: "面向卡片笔记、长笔记与长期知识整理的指导页。",
    eyebrow: "FLASHCARD NOTES",
    metrics: [
      ["适合场景", "课程 / 项目 / 长期积累"],
      ["重点", "碎片 / 结构 / 回看"],
      ["对象", "学生 / 自学者"]
    ],
    pillars: [
      { title: "先区分记录粒度", text: "一句话知识点和完整方法说明不应混在同一层。" },
      { title: "再安排回看路径", text: "卡片适合快速回顾，长笔记适合系统复盘。" },
      { title: "最后建立连接", text: "把卡片链接到专题笔记里，长期更容易复用。" }
    ],
    checklist: [
      "新知识先记卡片，再决定是否升级成长笔记。",
      "长笔记优先记录结构、步骤和案例。",
      "定期把高频卡片整理回主题文档。"
    ],
    faq: [
      ["卡片笔记会不会太碎？", "如果有回链和整理流程，就不会只剩碎片。"],
      ["长笔记是不是一定更好？", "不一定，很多知识点更适合先用卡片方式保存。"]
    ],
    related: [
      ["学习笔记方法怎样更容易复用", "/study-notes-method/"],
      ["每周学习复盘怎么写", "/weekly-learning-review/"],
      ["知识文档结构模板怎么搭", "/docs-structure-template/"]
    ]
  })
];

const pages = [...basePages, ...supplementalPages];

export default {
  site,
  categories,
  pages
};
