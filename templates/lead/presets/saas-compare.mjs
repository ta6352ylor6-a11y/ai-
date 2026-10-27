import { ctx } from "../../_shared/context.mjs";
export default {
  site: {
    title: `${ctx.brand} SaaS 方案比较`,
    description: "围绕客服工单、知识库、表单系统和分析平台拆分的 SaaS 对比与引导站，适合承接选型和方案比较类搜索。",
    baseUrl: ctx.baseUrl,
    brand: `${ctx.brand} saas compare`,
    eyebrow: "lead family",
    heroTitle: "先明确团队规模和流程，再看 SaaS 价格页和功能页。",
    heroSubtitle: "这是一组围绕选型意图设计的方案页，不追求收集所有产品，而是优先把适合什么团队、什么阶段说清楚。",
    primaryCta: { label: "查看对比方案", href: "#offers" },
    secondaryCta: { label: "查看选型方法", href: "#method" },
    selectionNotes: [
      "先看团队协作流程，再看功能多不多。",
      "先看落地成本，再看大而全的套件。",
      "先确认需要替代什么，再谈迁移。"
    ],
    trustPoints: ["按场景拆页", "强调团队规模", "适合选型意图落地"],
    methodSteps: [
      { title: "定义主流程", body: "比如工单、知识库、表单或分析，先把主流程卡住，避免功能太多反而难落地。" },
      { title: "看协作人数", body: "5 人团队和 50 人团队对权限、审批和流程编排的需求完全不同。" },
      { title: "看迁移成本", body: "如果旧系统数据复杂，迁移和培训成本可能比订阅费更重要。" }
    ],
    faqs: [
      { q: "为什么不做成纯产品目录？", a: "因为 lead family 更适合承接高意图流量，强调判断和选择，而不是把几十个工具堆在一起。" },
      { q: "可以继续扩到价格页吗？", a: "可以，后续可以在每个方案页下再挂价格层、迁移层和适合人群层。" }
    ]
  },
  offers: [
    {
      slug: "helpdesk-saas-selection",
      title: "客服工单系统选型",
      audience: "客服与运营团队",
      summary: "适合已经有客服量、需要把邮箱、IM 和 FAQ 汇总到同一流程中的团队。",
      promise: "客服 SaaS 的关键不是消息渠道越多越好，而是工单分派、SLA、知识库和协作备注能否真正落地。",
      benefits: ["减少客服响应混乱", "统一知识库与工单", "更适合多角色协作"],
      signals: ["客服入口分散", "需要 SLA 管理", "需要内部协作备注"],
      compare: [
        { label: "优先对象", value: "客服团队" },
        { label: "先看", value: "流程编排" },
        { label: "最后看", value: "渠道数量" }
      ],
      sections: [
        { title: "先看工单流程是否匹配", body: "如果流程不匹配，即使渠道接进来，团队也很难真正提升效率。" },
        { title: "知识库和工单最好联动", body: "客服常见问题如果不能回流到知识库，重复提问会持续消耗人力。" }
      ],
      faqs: [
        { q: "小团队也要上工单系统吗？", a: "如果问题量开始增长，且多人协作已出现遗漏，通常值得尽早建立工单流程。" },
        { q: "和 IM 工具有什么区别？", a: "IM 强在沟通，工单系统强在追踪、协作、归档和 SLA。" }
      ],
      cta: { label: "查看完整方案页", href: `${ctx.baseUrl}helpdesk-saas-selection/` }
    },
    {
      slug: "knowledge-base-migration",
      title: "知识库迁移方案",
      audience: "产品、运营与客服团队",
      summary: "适合有旧文档、旧 FAQ 或旧 Wiki 需要迁移到统一知识库系统的团队。",
      promise: "知识库迁移的难点通常不在工具本身，而在文档结构、权限和搜索体验的重新梳理。",
      benefits: ["统一文档入口", "减少版本混乱", "提升内部搜索效率"],
      signals: ["文档散落在多个平台", "旧 FAQ 不可搜索", "权限和目录结构混乱"],
      compare: [
        { label: "优先对象", value: "多角色团队" },
        { label: "先看", value: "结构和权限" },
        { label: "最后看", value: "编辑器花哨程度" }
      ],
      sections: [
        { title: "结构先行", body: "知识库迁移前，先整理目录和文档归属，否则新平台也只是把旧混乱搬过去。" },
        { title: "迁移范围要分阶段", body: "建议先迁核心 SOP 和 FAQ，再迁低频参考资料，避免一次性迁移过重。" }
      ],
      faqs: [
        { q: "需要一次迁完吗？", a: "不建议，先迁高频文档和核心流程更稳。" },
        { q: "旧链接怎么办？", a: "需要提前规划跳转和目录映射，否则会影响使用习惯和搜索流量。" }
      ],
      cta: { label: "查看完整方案页", href: `${ctx.baseUrl}knowledge-base-migration/` }
    },
    {
      slug: "form-builder-comparison",
      title: "表单系统比较页",
      audience: "市场、运营与销售团队",
      summary: "适合线索收集、报名、内部审批和多步骤表单场景，强调字段逻辑和数据流转。",
      promise: "如果表单只是收集几项信息，很多工具都够用；真正拉开差异的是多步骤逻辑、审批、通知和数据回流。",
      benefits: ["更适合复杂线索表单", "强调字段和通知逻辑", "利于后续 CRM 流转"],
      signals: ["表单字段复杂", "需要审批或通知", "需要和 CRM 或表格联动"],
      compare: [
        { label: "优先对象", value: "市场与销售" },
        { label: "先看", value: "逻辑和流转" },
        { label: "最后看", value: "模板数量" }
      ],
      sections: [
        { title: "先看流程链路", body: "如果提交后需要审批、同步或自动打标签，就要把数据流转放进选型标准。" },
        { title: "字段设计很关键", body: "字段不合理会直接影响后续 CRM 清洗和销售跟进。" }
      ],
      faqs: [
        { q: "表单系统和问卷系统一样吗？", a: "不完全一样，线索和审批表单更强调流程和后续动作。" },
        { q: "需要先写字段表吗？", a: "建议先写，不然迁移和自动化会越来越乱。" }
      ],
      cta: { label: "查看完整方案页", href: `${ctx.baseUrl}form-builder-comparison/` }
    },
    {
      slug: "analytics-stack-guide",
      title: "分析平台组合页",
      audience: "产品与增长团队",
      summary: "适合评估埋点分析、网站分析、可视化和告警能力，不再只看单个统计工具。",
      promise: "分析平台选型应该从数据采集、权限、报表和告警串起来看，而不是单看一个仪表盘是否好看。",
      benefits: ["适合组合选型", "避免单点工具思维", "更适合增长团队落地"],
      signals: ["已有多处数据来源", "需要多人协作看报表", "需要告警和分析联动"],
      compare: [
        { label: "优先对象", value: "增长团队" },
        { label: "先看", value: "采集与权限" },
        { label: "最后看", value: "仪表盘外观" }
      ],
      sections: [
        { title: "组合往往比单工具更现实", body: "很多团队最终会形成网站分析 + 事件分析 + BI 的组合，而不是一套全包。" },
        { title: "先定义关键指标", body: "没有指标优先级，再好的分析平台也容易沦为摆设。" }
      ],
      faqs: [
        { q: "免费工具够用吗？", a: "起步可以，但当权限、协作和数据量复杂后，通常需要组合升级。" },
        { q: "一定要自己搭 BI 吗？", a: "不一定，先看团队是否真的有持续维护能力。" }
      ],
      cta: { label: "查看完整方案页", href: `${ctx.baseUrl}analytics-stack-guide/` }
    }
  ]
};
