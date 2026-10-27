import { ctx } from "../../_shared/context.mjs";
import base from "../base.config.mjs";

const selectedSlugs = [
  "server-idc",
  "net-tools",
  "knowledge-docs"
];

const categories = base.categories
  .filter((category) => selectedSlugs.includes(category.slug))
  .map((category) => {
    const overrides = {
      "server-idc": {
        summary: "聚合香港服务器、CN2 线路、Windows VPS、WordPress VPS 等服务器选型与购买判断专题。",
        intro: "适合围绕线路、地区、系统与业务类型做快速选型和专题引导。"
      },
      "net-tools": {
        summary: "围绕域名解析、HTTP 状态、请求排查和 CIDR 计算整理上线前常用检查页。",
        intro: "更适合搭配服务器专题一起使用，在选型与上线前完成基础排查和网络检查。"
      },
      "knowledge-docs": {
        summary: "沉淀购买判断、部署前检查、发布说明和运维文档结构，补足决策与执行层内容。",
        intro: "适合让服务器类站点不只是引流页，而是同时具备专题解释和决策辅助能力。"
      }
    };

    return { ...category, ...(overrides[category.slug] || {}) };
  });

const pages = base.pages.filter((page) => selectedSlugs.includes(page.category));

const site = {
  title: `${ctx.brand} 服务器专题导航`,
  description: `${ctx.brand} 服务器专题导航聚合服务器与 IDC、网络排查与知识文档页面，帮助快速比较节点、线路、系统和部署前检查要点。`,
  baseUrl: ctx.baseUrl,
  brand: `${ctx.brand} 服务器专题导航`,
  navBrandShort: ctx.brandShort,
  heroTitle: "快速查看服务器、线路与部署专题",
  heroSubtitle: "覆盖香港服务器、CN2 线路、Windows VPS、上线前排查与运维文档，适合做选型、比较和购买前判断。",
  intro: "这套站点更偏专题引导和决策辅助，首页先看分类，分类页再找线路、系统和网络检查相关页面，服务器类入口继续自然导向 1bgp。",
  serverTarget: base.site.serverTarget
};

export default {
  site,
  categories,
  pages
};
