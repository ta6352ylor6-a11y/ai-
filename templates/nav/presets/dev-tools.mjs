import { ctx } from "../../_shared/context.mjs";
import base from "../base.config.mjs";

const selectedSlugs = [
  "net-tools",
  "development",
  "knowledge-docs",
  "data-processing"
];

const categories = base.categories
  .filter((category) => selectedSlugs.includes(category.slug))
  .map((category) => {
    const overrides = {
      "net-tools": {
        summary: "围绕接口联调、域名检查、JSON 结构和请求排查整理开发常用入口。",
        intro: "适合开发、测试和技术支持团队快速查找调试工具、排查流程和常见问题页面。"
      },
      development: {
        summary: "覆盖 API 开发、前端性能检查、代码评审自查和浏览器排错等开发专题。",
        intro: "更适合做开发与调试导航，帮助快速进入接口、前端、发布和 review 类页面。"
      },
      "knowledge-docs": {
        summary: "聚合发布说明、Runbook、Wiki 目录和会议纪要结构等技术文档页。",
        intro: "适合做知识沉淀、交接文档和协作规范时快速查看模板与结构说明。"
      },
      "data-processing": {
        summary: "围绕 CSV、Markdown 表格、字段映射和文本去重等开发周边数据处理任务整理入口。",
        intro: "适合开发和运营协作时处理结构化文本、配置表和字段映射。"
      }
    };

    return { ...category, ...(overrides[category.slug] || {}) };
  });

const pages = base.pages.filter((page) => selectedSlugs.includes(page.category));

const site = {
  title: `${ctx.brand} 开发工具导航`,
  description: `${ctx.brand} 开发工具导航聚合网络调试、开发与编程、技术文档和数据处理页面，帮助快速找到 API、前端、发布与排查类工具和专题。`,
  baseUrl: ctx.baseUrl,
  brand: `${ctx.brand} 开发工具导航`,
  navBrandShort: ctx.brandShort,
  heroTitle: "快速进入开发、调试与交付常用页面",
  heroSubtitle: "覆盖接口联调、前端检查、代码评审、发布说明与数据处理，适合技术团队日常查找与复用。",
  intro: "这是面向开发和技术协作场景的导航站，首页聚合调试与文档入口，分类页继续收拢接口、前端、发布和数据处理类页面。",
  serverTarget: base.site.serverTarget
};

export default {
  site,
  categories,
  pages
};
