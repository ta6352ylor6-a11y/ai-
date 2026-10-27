import { ctx } from "../../_shared/context.mjs";
export default {
  site: {
    title: `${ctx.brand} 数据清洗工具站`,
    description: "围绕 CSV 清洗、文本去重、字段映射和 Markdown 表格整理的轻量工具站，适合运营、产品、数据和内容团队快速处理原始数据。",
    baseUrl: ctx.baseUrl,
    brand: `${ctx.brand} data clean lab`,
    eyebrow: "tool family",
    heroTitle: "把零散数据先处理干净，再进入分析和交付。",
    heroSubtitle: "这不是导航站，而是围绕数据整理场景组织的工具型页面：先看输入和输出，再看步骤、限制和 FAQ。",
    intro: "适合处理运营导出的 CSV、客服文本、投放报表、渠道字段和 Markdown 表格。每个页面都尽量写清楚什么情况下该用、结果能拿去做什么。",
    searchPlaceholder: "搜索工具名、场景或标签，例如：CSV、去重、字段映射、Markdown 表格",
    primaryAction: { label: "查看全部工具", href: "#toolDirectory" },
    secondaryAction: { label: "整理工作清单", href: "#faq" },
    updateNote: "2026-10",
    faqs: [
      { q: "这套站更适合谁？", a: "更适合有明确输入和输出的场景，例如运营表格清洗、数据导入前校验、文本批量处理，而不是单纯浏览链接。" },
      { q: "为什么每页都写输入和输出？", a: "因为工具站的关键不是介绍多全，而是让访客快速判断自己当前手头的数据能不能直接处理。" },
      { q: "后续还能扩什么？", a: "可以继续加更多输入输出明确的小工具，例如时区换算、金额格式标准化、标题去重和导入模板检查。" }
    ]
  },
  categories: [
    { id: "sheet-clean", name: "表格整理", summary: "先处理行列、空值、字段顺序，再进入统计或导入。" },
    { id: "text-normalize", name: "文本处理", summary: "适合客服、运营和内容团队整理文本、标题和说明字段。" },
    { id: "mapping-check", name: "映射校验", summary: "围绕字段映射、导入模板和结构一致性做预检查。" }
  ],
  tools: [
    {
      slug: "csv-column-normalizer",
      title: "CSV 列名标准化",
      category: "sheet-clean",
      tagline: "统一列名、顺序和空值标记",
      summary: "处理渠道报表、活动导出和 CRM 列名不一致的问题，先把原始字段统一，再进入后续汇总或导入。",
      description: "当同一份报表来自多个来源时，最常见的问题是列名不一致、字段顺序混乱、空值标记不同。这个页面把标准化前后的检查点写清楚，方便团队先统一格式。",
      tags: ["CSV", "列名规范", "导入前检查"],
      useCases: ["渠道投放报表汇总", "多店铺订单导出合并", "CRM 导入前预处理"],
      steps: ["确认标准列名清单", "映射各来源字段", "统一空值和日期格式", "导出标准 CSV 并抽样检查"],
      inputs: ["CSV 文件", "标准字段表", "空值规则"],
      outputs: ["统一列名的 CSV", "字段映射记录"],
      faqs: [
        { q: "列名一定要全英文吗？", a: "不一定，但建议在同一个流程里只保留一套命名规范，避免中英混杂导致后续自动化失败。" },
        { q: "日期字段要怎么处理？", a: "建议在标准化阶段统一成同一种格式，并明确时区，避免后续聚合时出现偏差。" }
      ],
      primaryLink: ctx.baseUrl,
      linkLabel: "返回工具站"
    },
    {
      slug: "markdown-table-cleaner",
      title: "Markdown 表格整理器",
      category: "sheet-clean",
      tagline: "把文档中的表格先修平再发布",
      summary: "适合把飞书、Notion、Excel 导出的内容整理成可直接贴到 Markdown 文档里的表格结构。",
      description: "很多团队在写文档和知识库时会直接复制表格，结果出现列宽错乱、空列、对齐混乱。这个页面更像发布前清理清单，适合写作和技术文档团队。",
      tags: ["Markdown", "知识库", "文档整理"],
      useCases: ["产品文档发布前", "技术博客排版", "知识库迁移"],
      steps: ["删除空列和重复列", "统一标题行", "检查数值列对齐", "预览最终 Markdown 渲染效果"],
      inputs: ["原始表格", "字段说明", "Markdown 目标格式"],
      outputs: ["干净的 Markdown 表格", "表头规范"],
      faqs: [
        { q: "为什么要先删空列？", a: "空列会放大排版问题，尤其在手机端和窄屏场景中更明显。" },
        { q: "适合长表格吗？", a: "长表格建议分段发布，否则即使格式正确，也不利于阅读和收录。" }
      ],
      primaryLink: ctx.baseUrl,
      linkLabel: "返回工具站"
    },
    {
      slug: "text-dedup-checklist",
      title: "文本去重检查清单",
      category: "text-normalize",
      tagline: "先去重，再做标题和文案整理",
      summary: "适合清洗标题库、客服快捷回复、活动说明和商品卖点，避免重复文本在导入和发布时污染结果。",
      description: "文本去重不是简单删重复，而是先定义判重规则：完全重复、近似重复、同义表达是否合并。这个页面会把这些判断点拆开。",
      tags: ["文本去重", "客服话术", "标题整理"],
      useCases: ["商品标题库整理", "FAQ 文本去重", "客服常用回复合并"],
      steps: ["区分完全重复和近似重复", "保留主版本文案", "记录合并规则", "抽样检查语义是否丢失"],
      inputs: ["文本列表", "判重规则", "保留优先级"],
      outputs: ["去重文本库", "去重规则说明"],
      faqs: [
        { q: "近似重复要不要合并？", a: "要看后续使用场景，如果是 SEO 标题池，通常保留差异；如果是客服快捷回复，可以适当合并。" },
        { q: "怎么避免误删？", a: "给每轮去重保留快照，并记录保留优先级。" }
      ],
      primaryLink: ctx.baseUrl,
      linkLabel: "返回工具站"
    },
    {
      slug: "column-mapping-template",
      title: "字段映射模板",
      category: "mapping-check",
      tagline: "把来源字段和目标字段先对齐",
      summary: "适合多系统对接、报表迁移和表单导入，把字段来源、目标名、类型和必填规则明确写在一起。",
      description: "字段映射的价值在于减少导入失败、接口出错和人工解释成本。这个页面会强调字段类型、缺失策略和默认值处理。",
      tags: ["字段映射", "导入模板", "结构化数据"],
      useCases: ["CRM 迁移", "表单字段对接", "内部系统导入模板"],
      steps: ["列出源字段和目标字段", "补充类型和必填约束", "定义缺失值处理", "用样例数据做一次试导入"],
      inputs: ["源字段列表", "目标字段列表", "样例数据"],
      outputs: ["字段映射表", "导入前校验结果"],
      faqs: [
        { q: "只写字段名够吗？", a: "不够，至少还要写字段类型、是否必填和默认值策略。" },
        { q: "谁来维护映射模板？", a: "建议由最接近导入或接口的一方维护，否则容易出现理解偏差。" }
      ],
      primaryLink: ctx.baseUrl,
      linkLabel: "返回工具站"
    },
    {
      slug: "import-template-precheck",
      title: "导入模板预检查",
      category: "mapping-check",
      tagline: "导入前最后一轮结构确认",
      summary: "适合在 CRM、ERP、表单系统或广告平台导入前检查模板列数、必填项、枚举值和编码格式。",
      description: "很多导入失败并不是字段本身有问题，而是模板结构、编码、必填项或枚举值没有提前核对。这个页面适合做导入前的最后检查。",
      tags: ["模板预检", "导入校验", "枚举值"],
      useCases: ["广告平台素材导入", "线索表单导入", "ERP 商品批量导入"],
      steps: ["检查列数和表头", "核对必填项是否齐全", "验证枚举值合法性", "确认编码和分隔符"],
      inputs: ["导入模板", "平台规则", "样例数据"],
      outputs: ["预检查清单", "问题项列表"],
      faqs: [
        { q: "预检查一定要做吗？", a: "如果导入失败的回滚成本高，预检查比事后修复更省时间。" },
        { q: "枚举值为什么常出错？", a: "因为很多平台限制值集合，但导出数据里常常混入自由输入内容。" }
      ],
      primaryLink: ctx.baseUrl,
      linkLabel: "返回工具站"
    }
  ]
};
