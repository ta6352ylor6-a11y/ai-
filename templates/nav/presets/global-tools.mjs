import { ctx } from "../../_shared/context.mjs";
import base from "../base.config.mjs";

const selectedSlugs = [
  "zh-ai-tools",
  "vi-ai-tools",
  "customer-growth",
  "ecommerce-content",
  "translation-language",
  "data-processing"
];

const categories = base.categories
  .filter((category) => selectedSlugs.includes(category.slug))
  .map((category) => {
    const overrides = {
      "zh-ai-tools": {
        summary: "围绕中文 AI 写作、提纲、客服回复和标题润色整理更适合内容团队的专题入口。",
        intro: "适合内容运营、品牌团队和编辑同学快速查看中文 AI 工作流、标题优化和文章改写类页面。"
      },
      "vi-ai-tools": {
        summary: "面向越南语商品文案、客服对话、广告表达和关键词整理的出海专题页。",
        intro: "适合做越南市场投放、本地化和客服协作时快速定位越南语相关页面与方法。"
      },
      "customer-growth": {
        summary: "覆盖新用户欢迎语、退款 FAQ、客服 SOP 和线索初筛等运营场景。",
        intro: "更偏运营和客户沟通，适合承接私域、SaaS 与跨境客服相关搜索词。"
      },
      "ecommerce-content": {
        summary: "聚合价格页、详情页、SKU 卖点和活动落地页等电商内容结构页。",
        intro: "适合电商运营、活动页制作和商品内容团队快速看结构、查页面模板。"
      },
      "translation-language": {
        summary: "围绕多语文案、本地化、术语表与字幕长度检查整理翻译语言工具与文章。",
        intro: "适合多语产品、国际化界面和跨语种内容团队快速查看语言处理类页面。"
      },
      "data-processing": {
        summary: "面向 CSV、Markdown 表格、文本去重和字段映射等日常数据处理场景。",
        intro: "更适合运营和内容团队处理表格、字段和文本结构化任务时使用。"
      }
    };

    return { ...category, ...(overrides[category.slug] || {}) };
  });

const pages = base.pages.filter((page) => selectedSlugs.includes(page.category));

const site = {
  title: `${ctx.brand} 出海工具导航`,
  description: `${ctx.brand} 出海工具导航聚合中文 AI、越南语本地化、客服运营、电商内容、翻译语言与数据处理页面，帮助快速找到适合出海业务的工具和专题。`,
  baseUrl: ctx.baseUrl,
  brand: `${ctx.brand} 出海工具导航`,
  navBrandShort: ctx.brandShort,
  heroTitle: "一站看懂出海运营、内容与本地化工具",
  heroSubtitle: "覆盖中文 AI、越南语 AI、本地化、客服、电商内容与数据处理，适合做跨境业务时快速找页面、查结构、看专题。",
  intro: "这是一套偏出海业务场景的导航站：首页先按主题找入口，分类页继续看专题列表，详情页补充 FAQ、相关推荐和更容易抓取的文本内容。",
  serverTarget: base.site.serverTarget
};

export default {
  site,
  categories,
  pages
};
