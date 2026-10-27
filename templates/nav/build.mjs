import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const configPath = process.env.SITE_FACTORY_CONFIG;
const outputDir = process.env.SITE_FACTORY_OUTPUT_DIR;

if (!configPath || !outputDir) {
  throw new Error("Missing SITE_FACTORY_CONFIG or SITE_FACTORY_OUTPUT_DIR for nav.");
}

const { default: config } = await import(pathToFileURL(configPath).href);
const buildDate = new Date().toISOString().slice(0, 10);
const basePath = new URL(config.site.baseUrl).pathname.replace(/\/$/, "");

const categoryMap = new Map(config.categories.map((category) => [category.slug, category]));
const pagesByCategory = new Map(
  config.categories.map((category) => [
    category.slug,
    config.pages.filter((page) => page.category === category.slug)
  ])
);
const featuredPages = config.pages.slice(0, 8);

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(path.join(outputDir, "assets"), { recursive: true });

writeAsset("base.css", renderBaseCss());
writeAsset("home.css", renderHomeCss());
writeAsset("hub.css", renderHubCss());
writeAsset("detail.css", renderDetailCss());
writeAsset("site.js", renderSiteJs());

writeFile("index.html", renderHomePage());
writeFile("404.html", renderNotFoundPage());
writeFile("robots.txt", renderRobotsTxt());
writeFile("sitemap.xml", renderSitemap());
writeFile("site-manifest.json", JSON.stringify(buildManifest(), null, 2));

for (const category of config.categories) {
  writeFile(path.join(category.slug, "index.html"), renderCategoryPage(category));
}

for (const page of config.pages) {
  writeFile(path.join(page.slug, "index.html"), renderContentPage(page));
}

console.log(`Built nav site "${config.site.title}" with ${config.categories.length} categories and ${config.pages.length} content pages.`);

function writeAsset(name, content) {
  writeFile(path.join("assets", name), content);
}

function writeFile(relativePath, content) {
  const filePath = path.join(outputDir, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, "utf8");
}

function buildManifest() {
  return [
    { type: "home", title: config.site.title, url: config.site.baseUrl },
    ...config.categories.map((category) => ({
      type: "category",
      title: category.name,
      category: category.slug,
      url: absoluteUrl(`${category.slug}/`)
    })),
    ...config.pages.map((page) => ({
      type: page.type,
      title: page.title,
      category: page.category,
      url: absoluteUrl(`${page.slug}/`)
    }))
  ];
}

function absoluteUrl(relative) {
  return new URL(relative, config.site.baseUrl).toString();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeHref(href) {
  if (!href) {
    return `${basePath || ""}/`;
  }
  if (/^https?:\/\//.test(href)) {
    return href;
  }
  if (href.startsWith("#")) {
    return `${basePath || ""}/${href}`;
  }
  const clean = href.replace(/^\/+/, "");
  if (clean.startsWith("#")) {
    return `${basePath || ""}/${clean}`;
  }
  if (!clean) {
    return `${basePath || ""}/`;
  }
  return `${basePath}/${clean.replace(/\/?$/, "/")}` || `/${clean.replace(/\/?$/, "/")}`;
}

function bodyVars(theme) {
  return `--accent:${theme.accent};--accent-soft:${theme.accentSoft};--surface:${theme.surface};--panel:${theme.panel};--ink:${theme.ink};--muted:${theme.muted};`;
}

function renderMeta({ title, description, canonical, cssFiles, ogType = "website", jsonLd = "" }) {
  const cssLinks = cssFiles.map((href) => `  <link rel="stylesheet" href="${href}">`).join("\n");
  return `  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta name="baiduspider" content="index,follow">
  <meta name="theme-color" content="#6a5cff">
  <link rel="canonical" href="${canonical}">
  <meta property="og:site_name" content="${escapeHtml(config.site.title)}">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:type" content="${ogType}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
${cssLinks}${jsonLd ? `\n${jsonLd}` : ""}`;
}

function renderJsonLd(data) {
  return `  <script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function renderJsonLdList(items) {
  return items.filter(Boolean).map((item) => renderJsonLd(item)).join("\n");
}

function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

function faqJsonLd(page) {
  if (!(page.faq || []).length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
}

function categoryIcon(slug) {
  return {
    "net-tools": "网",
    "zh-ai-tools": "中",
    "vi-ai-tools": "越",
    "server-idc": "服",
    development: "开",
    "knowledge-docs": "知",
    "customer-growth": "客",
    "ecommerce-content": "商",
    "translation-language": "译",
    "data-processing": "数",
    "education-learning": "学"
  }[slug] || "导";
}

function pageMark(page) {
  const first = page.title.trim().charAt(0);
  return first || "F";
}

function typeLabel(type) {
  return {
    tool: "工具页",
    guide: "指南页",
    service: "专题页",
    article: "文章页"
  }[type] || "页面";
}

function directHref(page) {
  return /^https?:\/\//.test(page.ctaUrl || "") ? page.ctaUrl : `/${page.slug}/`;
}

function secondaryHref(page) {
  const direct = directHref(page);
  const detail = `/${page.slug}/`;
  if (direct === detail) {
    return `/${page.category}/`;
  }
  return detail;
}

function secondaryLabel(page) {
  return directHref(page) === `/${page.slug}/` ? "查看分类" : "查看详情";
}

function pageKeywords(page, category) {
  return [
    category.name,
    category.english,
    typeLabel(page.type),
    page.title,
    page.summary,
    page.description,
    ...(page.metrics || []).map(([label, value]) => `${label} ${value}`)
  ].join(" ");
}

function renderSiteHeader(activeKey = "home", currentLabel = "") {
  const tutorialCategory = config.categories.find((item) => item.slug === "knowledge-docs") || config.categories[0];
  const navs = [
    { key: "home", label: "首页", href: "/" },
    { key: "latest", label: "最新上架", href: "/#featured" },
    { key: "popular", label: "最受欢迎", href: "/#directory" },
    { key: "tutorial", label: "免费教程", href: `/${tutorialCategory.slug}/` },
    { key: "submit", label: "收录申请", href: "/#submit" },
    { key: "contact", label: "联系我们", href: "/#contact" }
  ];

  return `<header class="site-header">
    <div class="shell topbar">
      <div class="brand-wrap">
        <a class="brand-chip" href="${safeHref("/")}">${escapeHtml(config.site.navBrandShort)}</a>
        <a class="brand-title" href="${safeHref("/")}">${escapeHtml(config.site.brand)}</a>
      </div>
      <nav class="top-nav">
        ${navs.map((item) => `<a class="${item.key === activeKey ? "is-active" : ""}" href="${safeHref(item.href)}">${item.label}</a>`).join("")}
      </nav>
      <div class="top-actions">
        <a class="ghost-link" href="${safeHref("/#contact")}">登录</a>
        <a class="submit-link" href="${safeHref("/#submit")}">提交工具</a>
      </div>
    </div>
    ${currentLabel ? `<div class="shell crumb-bar">${currentLabel}</div>` : ""}
  </header>`;
}

function renderSearchPanel(placeholder) {
  return `<section class="search-panel">
    <div class="search-box">
      <button class="search-scope" type="button">站内</button>
      <input id="directorySearch" data-directory-search type="search" placeholder="${escapeHtml(placeholder)}">
      <button class="search-button" type="button">搜索</button>
    </div>
    <div class="search-tip-row">
      <div class="search-tip">
        <span>小提示</span>
        先看左侧分类，再输入关键词，可以更快定位到合适的专题页或工具页。
      </div>
      <div class="search-shortcut">Ctrl+D 收藏本站</div>
    </div>
  </section>`;
}

function renderHomePage() {
  const jsonLd = renderJsonLdList([
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: config.site.title,
      url: config.site.baseUrl,
      description: config.site.description,
      inLanguage: "zh-CN",
      dateModified: buildDate,
      hasPart: config.categories.map((category) => ({
        "@type": "CollectionPage",
        name: category.name,
        url: absoluteUrl(`${category.slug}/`)
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${config.site.title}热门推荐`,
      itemListElement: featuredPages.slice(0, 6).map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`${page.slug}/`),
        name: page.title
      }))
    }
  ]);

  return `<!doctype html>
<html lang="zh-CN">
<head>
${renderMeta({
  title: config.site.title,
  description: config.site.description,
  canonical: config.site.baseUrl,
  cssFiles: ["./assets/base.css", "./assets/home.css"],
  jsonLd
})}
</head>
<body class="home-body">
  ${renderSiteHeader("home")}
  <main class="shell">
    <section class="hero-banner">
      <p class="hero-kicker">FYBOT WEBSITE DIRECTORY</p>
      <h1>${escapeHtml(config.site.heroTitle)}</h1>
      <p class="hero-subtitle">${escapeHtml(config.site.heroSubtitle)}</p>
      <p class="hero-intro">${escapeHtml(config.site.intro)}</p>
      <div class="hero-metrics">
        <div class="hero-metric"><strong>${config.categories.length}</strong><span>个主分类</span></div>
        <div class="hero-metric"><strong>${config.pages.length}</strong><span>个专题页面</span></div>
        <div class="hero-metric"><strong>1</strong><span>个主入口导航站</span></div>
      </div>
    </section>

    ${renderSearchPanel("搜索站内工具、分类或专题，比如：服务器、AI 写作、JSON、客服、学习")}

    <section class="quick-strip" id="featured">
      <div class="quick-head">
        <div>
          <p class="section-kicker">HOT PICKS</p>
          <h2>热门推荐</h2>
        </div>
        <p>优先展示最常被搜索、最容易直接进入使用场景的入口。</p>
      </div>
      <div class="quick-grid">
        ${featuredPages.slice(0, 6).map((page) => renderMiniCard(page)).join("")}
      </div>
    </section>

    <section class="crawl-strip">
      <div class="crawl-head">
        <p class="section-kicker">TOPIC INDEX</p>
        <h2>专题索引与收录入口</h2>
        <p>首页提供分类入口、分类页提供专题列表、详情页补充常见问题和相关推荐，这样 Google 与百度更容易理解整站结构。</p>
      </div>
      <div class="crawl-grid">
        ${config.categories.map((category) => renderCategoryIndexCard(category)).join("")}
      </div>
    </section>

    <section class="directory-shell" id="directory">
      <aside class="directory-sidebar">
        <div class="sidebar-card">
          <h2>分类导航</h2>
          <nav class="sidebar-nav">
            <a class="is-active" href="${safeHref("/#directory")}">全部工具</a>
            ${config.categories.map((category, index) => {
              const pages = pagesByCategory.get(category.slug) || [];
              return `<a href="#group-${index}"><span class="nav-icon">${categoryIcon(category.slug)}</span>${escapeHtml(category.name)}<em>${pages.length}</em></a>`;
            }).join("")}
          </nav>
        </div>
      </aside>

      <div class="directory-content">
        ${config.categories.map((category, index) => renderCategorySection(category, index)).join("")}
        <p id="emptyState" class="empty-state hidden">没有找到匹配内容，请换个关键词或先切换分类试试。</p>
      </div>
    </section>
  </main>
  ${renderFooter()}
  <script type="module" src="./assets/site.js"></script>
</body>
</html>`;
}

function renderCategorySection(category, index) {
  const pages = pagesByCategory.get(category.slug) || [];
  return `<section class="directory-section" id="group-${index}" data-group data-keywords="${escapeHtml(
    [category.name, category.english, category.summary, ...pages.map((page) => pageKeywords(page, category))].join(" ")
  )}" style="${bodyVars(category.theme)}">
    <div class="section-heading">
      <div>
        <p class="section-kicker">${escapeHtml(category.english)}</p>
        <h2>${escapeHtml(category.name)}</h2>
        <p>${escapeHtml(category.summary)}</p>
        <div class="section-badges">
          <span>${pages.length} 个页面</span>
          <span>${escapeHtml(sectionCountSummary(pages))}</span>
        </div>
      </div>
      <a class="section-link" href="${safeHref(`/${category.slug}/`)}">查看分类页</a>
    </div>
    <div class="card-grid">
      ${pages.map((page) => renderSiteCard(page, category)).join("")}
    </div>
  </section>`;
}

function renderCategoryIndexCard(category) {
  const pages = pagesByCategory.get(category.slug) || [];
  return `<article class="index-card" style="${bodyVars(category.theme)}">
    <h3><a href="${safeHref(`/${category.slug}/`)}">${escapeHtml(category.name)}</a></h3>
    <p>${escapeHtml(category.intro)}</p>
    <div class="index-links">
      ${pages.slice(0, 3).map((page) => `<a href="${safeHref(`/${page.slug}/`)}">${escapeHtml(page.title)}</a>`).join("")}
    </div>
  </article>`;
}

function renderCategoryPage(category) {
  const pages = pagesByCategory.get(category.slug) || [];
  const typeGroups = groupedPageTypes(pages);
  const canonical = absoluteUrl(`${category.slug}/`);
  const jsonLd = renderJsonLdList([
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: category.name,
      url: canonical,
      description: category.summary,
      inLanguage: "zh-CN",
      dateModified: buildDate,
      hasPart: pages.map((page) => ({
        "@type": "WebPage",
        name: page.title,
        url: absoluteUrl(`${page.slug}/`)
      }))
    },
    breadcrumbJsonLd([
      { name: "首页", url: config.site.baseUrl },
      { name: category.name, url: canonical }
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${category.name}内容列表`,
      itemListElement: pages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`${page.slug}/`),
        name: page.title
      }))
    }
  ]);

  return `<!doctype html>
<html lang="zh-CN">
<head>
${renderMeta({
  title: `${category.name} - ${config.site.title}`,
  description: category.summary,
  canonical,
  cssFiles: ["../assets/base.css", "../assets/hub.css"],
  jsonLd
})}
</head>
<body class="hub-body" style="${bodyVars(category.theme)}">
  ${renderSiteHeader("popular", `<a href="${safeHref("/")}">首页</a> / ${escapeHtml(category.name)}`)}
  <main class="shell">
    ${renderSearchPanel(`在 ${category.name} 中搜索关键词，比如：${sampleKeywords(category)}`)}
    <section class="hub-layout">
      <aside class="hub-sidebar">
        <div class="sidebar-card">
          <h2>分类导航</h2>
          <nav class="sidebar-nav">
            ${config.categories.map((item) => `<a class="${item.slug === category.slug ? "is-active" : ""}" href="${safeHref(`/${item.slug}/`)}"><span class="nav-icon">${categoryIcon(item.slug)}</span>${escapeHtml(item.name)}</a>`).join("")}
          </nav>
        </div>
        <div class="sidebar-card">
          <h2>本类分区</h2>
          <nav class="sidebar-subnav">
            ${typeGroups.map(({ type, pages: typePages }) => {
              const meta = typeSectionMeta(type);
              return `<a href="#${typeAnchor(type)}">${escapeHtml(meta.title)}<em>${typePages.length}</em></a>`;
            }).join("")}
          </nav>
        </div>
        <div class="sidebar-card">
          <h2>${escapeHtml(category.name)}</h2>
          <nav class="sidebar-subnav compact-subnav">
            ${pages.map((page) => `<a href="${safeHref(`/${page.slug}/`)}">${escapeHtml(page.title)}</a>`).join("")}
          </nav>
        </div>
      </aside>

      <div class="hub-content">
        <section class="hub-hero">
          <p class="section-kicker">${escapeHtml(category.english)}</p>
          <h1>${escapeHtml(category.name)}</h1>
          <p class="hub-intro">${escapeHtml(category.intro)}</p>
          <div class="hub-meta">
            <span>${pages.length} 个页面</span>
            <span>${escapeHtml(sectionCountSummary(pages))}</span>
            <span>支持站内搜索筛选</span>
          </div>
          <div class="hub-copy">
            <p>${escapeHtml(category.summary)}</p>
            <p>本分类页会持续补充专题内容、工具页和文章页，并通过相关推荐和侧栏导航建立更密集的内链结构，方便搜索引擎抓取和理解页面主题。</p>
          </div>
        </section>

        ${typeGroups.map(({ type, pages: typePages }) => renderCategoryTypeSection(category, type, typePages)).join("")}

        <p id="emptyState" class="empty-state hidden">当前分类没有匹配结果，请换个关键词试试。</p>
      </div>
    </section>
  </main>
  ${renderFooter()}
  <script type="module" src="../assets/site.js"></script>
</body>
</html>`;
}

function renderContentPage(page) {
  const category = categoryMap.get(page.category);
  const categoryPages = pagesByCategory.get(category.slug) || [];
  const canonical = absoluteUrl(`${page.slug}/`);
  const jsonLd = renderJsonLdList([
    {
      "@context": "https://schema.org",
      "@type": page.type === "article" ? "Article" : "WebPage",
      name: page.title,
      url: canonical,
      description: page.description,
      inLanguage: "zh-CN",
      dateModified: buildDate,
      isPartOf: {
        "@type": "CollectionPage",
        name: category.name,
        url: absoluteUrl(`${category.slug}/`)
      }
    },
    breadcrumbJsonLd([
      { name: "首页", url: config.site.baseUrl },
      { name: category.name, url: absoluteUrl(`${category.slug}/`) },
      { name: page.title, url: canonical }
    ]),
    faqJsonLd(page)
  ]);

  return `<!doctype html>
<html lang="zh-CN">
<head>
${renderMeta({
  title: `${page.title} - ${config.site.title}`,
  description: page.description,
  canonical,
  cssFiles: ["../assets/base.css", "../assets/detail.css"],
  ogType: "article",
  jsonLd
})}
</head>
<body class="detail-body" style="${bodyVars(category.theme)}">
  ${renderSiteHeader("popular", `<a href="${safeHref("/")}">首页</a> / <a href="${safeHref(`/${category.slug}/`)}">${escapeHtml(category.name)}</a> / ${escapeHtml(page.title)}`)}
  <main class="shell">
    <section class="detail-layout">
      <aside class="detail-sidebar">
        <div class="sidebar-card">
          <h2>当前分类</h2>
          <nav class="sidebar-nav">
            ${config.categories.map((item) => `<a class="${item.slug === category.slug ? "is-active" : ""}" href="${safeHref(`/${item.slug}/`)}"><span class="nav-icon">${categoryIcon(item.slug)}</span>${escapeHtml(item.name)}</a>`).join("")}
          </nav>
        </div>
        <div class="sidebar-card">
          <h2>本类页面</h2>
          <nav class="sidebar-subnav">
            ${categoryPages.map((item) => `<a class="${item.slug === page.slug ? "is-current" : ""}" href="${safeHref(`/${item.slug}/`)}">${escapeHtml(item.title)}</a>`).join("")}
          </nav>
        </div>
        <div class="sidebar-card">
          <h2>页面信息</h2>
          <div class="detail-side-meta">
            <span>${escapeHtml(typeLabel(page.type))}</span>
            <span>${escapeHtml(category.name)}</span>
            <span>${escapeHtml(metricTag(page))}</span>
          </div>
          <a class="sidebar-cta" href="${safeHref(directHref(page))}">${escapeHtml(page.ctaLabel || "直达链接")}</a>
        </div>
      </aside>

      <div class="detail-content">
        <section class="detail-hero">
          <div class="detail-hero-top">
            <div class="detail-mark">${escapeHtml(pageMark(page))}</div>
            <div>
              <p class="section-kicker">${escapeHtml(page.eyebrow || category.english)}</p>
              <h1>${escapeHtml(page.title)}</h1>
            </div>
          </div>
          <p class="detail-summary">${escapeHtml(page.summary)}</p>
          <div class="detail-metrics">
            ${(page.metrics || []).map(([label, value]) => `<div class="metric-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
          </div>
          <div class="detail-actions">
            <a class="button button-primary" href="${safeHref(directHref(page))}">${escapeHtml(page.ctaLabel || "直达链接")}</a>
            <a class="button button-secondary" href="${safeHref(`/${category.slug}/`)}">${escapeHtml(page.secondaryLabel || "返回分类")}</a>
          </div>
        </section>

        ${renderDetailBlocks(page)}

        <section class="detail-related">
          <div class="detail-panel">
            <h2>常见问题</h2>
            <div class="faq-list">
              ${(page.faq || []).map(([q, a]) => `<article class="faq-item"><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></article>`).join("")}
            </div>
          </div>
          <aside class="detail-panel related-panel">
            <h2>继续查看</h2>
            <ul class="related-list">
              ${(page.related || []).map(([label, href]) => `<li><a href="${safeHref(href)}">${escapeHtml(label)}</a></li>`).join("")}
            </ul>
          </aside>
        </section>
      </div>
    </section>
  </main>
  ${renderFooter()}
</body>
</html>`;
}

function renderDetailBlocks(page) {
  if (page.type === "tool") {
    return `<section class="detail-panel">
      <div class="detail-block-head">
        <h2>输入与结果</h2>
        <p>适合先用示例验证格式，再换成自己的内容继续处理。</p>
      </div>
      <div class="tool-grid">
        <div class="tool-box">
          <p class="tool-label">${escapeHtml(page.inputLabel || "输入示例")}</p>
          <pre>${escapeHtml(page.inputExample || "")}</pre>
        </div>
        <div class="tool-box">
          <p class="tool-label">结果示例</p>
          <pre>${escapeHtml(page.outputExample || "")}</pre>
        </div>
      </div>
      <div class="detail-columns">
        ${(page.steps || []).map((item, index) => `<article class="mini-card"><span class="mini-index">${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("")}
      </div>
      ${(page.notes || []).length ? `<ul class="bullet-list">${page.notes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
    </section>`;
  }

  if (page.type === "service") {
    return `<section class="detail-panel">
      <div class="detail-columns two-up">
        <article class="mini-card">
          <h2>适合谁先看</h2>
          <ul class="bullet-list">${(page.audience || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
        <article class="mini-card">
          <h2>购买前确认</h2>
          <ul class="bullet-list">${(page.considerations || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
      </div>
      <div class="detail-columns">
        ${(page.offers || []).map(([title, text]) => `<article class="mini-card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}
      </div>
    </section>`;
  }

  if (page.type === "article") {
    return `<section class="detail-panel">
      ${(page.sections || []).map((item) => `<article class="article-row"><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.text)}</p></article>`).join("")}
      ${(page.takeaways || []).length ? `<div class="takeaway-box"><h2>核心结论</h2><ul class="bullet-list">${page.takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>` : ""}
    </section>`;
  }

  return `<section class="detail-panel">
    <div class="detail-columns">
      ${(page.pillars || []).map((item, index) => `<article class="mini-card"><span class="mini-index">${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("")}
    </div>
    ${(page.checklist || []).length ? `<div class="takeaway-box"><h2>建议核对清单</h2><ul class="bullet-list">${page.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>` : ""}
  </section>`;
}

function groupedPageTypes(pages) {
  const order = ["tool", "guide", "service", "article"];
  return order
    .map((type) => ({ type, pages: pages.filter((page) => page.type === type) }))
    .filter((group) => group.pages.length > 0);
}

function typeAnchor(type) {
  return `type-${type}`;
}

function typeSectionMeta(type) {
  return {
    tool: { title: "工具精选", description: "适合直接使用或快速核对输入输出。" },
    guide: { title: "实用指南", description: "更适合按步骤查看、照着执行。" },
    service: { title: "专题推荐", description: "聚焦具体服务场景与方案选择。" },
    article: { title: "延伸阅读", description: "适合补充背景、方法和判断逻辑。" }
  }[type] || { title: "内容列表", description: "当前分类下的相关页面。" };
}

function sectionCountSummary(pages) {
  const counts = groupedPageTypes(pages).map(({ type, pages: grouped }) => `${typeLabel(type)} ${grouped.length}`);
  return counts.join(" / ");
}

function renderCategoryTypeSection(category, type, pages) {
  const meta = typeSectionMeta(type);
  return `<section class="hub-section" id="${typeAnchor(type)}" data-group data-keywords="${escapeHtml(
    [category.name, category.english, meta.title, meta.description, ...pages.map((page) => pageKeywords(page, category))].join(" ")
  )}">
    <div class="section-heading">
      <div>
        <p class="section-kicker">${escapeHtml(typeLabel(type))}</p>
        <h2>${escapeHtml(meta.title)}</h2>
        <p>${escapeHtml(meta.description)}</p>
      </div>
      <span class="section-count">${pages.length} 项</span>
    </div>
    <div class="card-grid">
      ${pages.map((page) => renderSiteCard(page, category)).join("")}
    </div>
  </section>`;
}

function renderSiteCard(page, category) {
  const direct = directHref(page);
  const secondary = secondaryHref(page);
  return `<article class="site-card" data-card data-keywords="${escapeHtml(pageKeywords(page, category))}">
    <div class="card-top">
      <div class="card-brand">
        <div class="card-mark">${escapeHtml(pageMark(page))}</div>
        <div class="card-copy">
          <h3><a href="${safeHref(`/${page.slug}/`)}">${escapeHtml(page.title)}</a></h3>
          <div class="card-tags">
            <span>${escapeHtml(typeLabel(page.type))}</span>
            <span>${escapeHtml(metricTag(page))}</span>
          </div>
          <p class="card-subtitle">${escapeHtml(category.name)}</p>
        </div>
      </div>
    </div>
    <p class="card-summary">${escapeHtml(page.summary)}</p>
    <p class="card-meta">${escapeHtml((page.metrics || []).slice(0, 2).map(([label, value]) => `${label}：${value}`).join(" · "))}</p>
    <div class="card-actions">
      <a class="primary-action" href="${safeHref(direct)}">直达链接</a>
      <a class="secondary-action" href="${safeHref(secondary)}">${secondaryLabel(page)}</a>
    </div>
  </article>`;
}

function renderMiniCard(page) {
  const category = categoryMap.get(page.category);
  return `<article class="mini-reco">
    <div class="mini-reco-top">
      <span class="mini-type">${escapeHtml(typeLabel(page.type))}</span>
      <span class="mini-category">${escapeHtml(category.name)}</span>
    </div>
    <h3><a href="${safeHref(`/${page.slug}/`)}">${escapeHtml(page.title)}</a></h3>
    <p>${escapeHtml(page.summary)}</p>
    <a class="mini-link" href="${safeHref(`/${page.slug}/`)}">查看详情</a>
  </article>`;
}

function metricTag(page) {
  if (page.type === "service") return "专题";
  if (page.type === "tool") return "可用";
  if (page.type === "guide") return "实操";
  return "阅读";
}

function sampleKeywords(category) {
  const pages = pagesByCategory.get(category.slug) || [];
  return pages.slice(0, 3).map((page) => page.title.split(" ").at(0)).join("、") || category.name;
}

function renderFooter() {
  const aiCategory =
    config.categories.find((item) => item.slug === "zh-ai-tools") ||
    config.categories.find((item) => item.slug === "vi-ai-tools") ||
    config.categories[0];
  const serviceCategory =
    config.categories.find((item) => item.slug === "server-idc") ||
    config.categories.find((item) => item.slug === "customer-growth") ||
    config.categories.at(-1);
  return `<footer class="site-footer" id="contact">
    <div class="shell footer-grid">
      <div>
        <p class="footer-title">${escapeHtml(config.site.brand)}</p>
        <p class="footer-text">按分类浏览，按卡片进入，服务器相关入口统一导向 1bgp，其它页面优先承接真实搜索意图。</p>
      </div>
      <div class="footer-links">
        <a href="${safeHref("/#directory")}">网站目录</a>
        <a href="${safeHref(`/${aiCategory.slug}/`)}">${escapeHtml(aiCategory.name)}</a>
        <a href="${safeHref(`/${serviceCategory.slug}/`)}">${escapeHtml(serviceCategory.name)}</a>
        <a href="${config.site.serverTarget}">1bgp</a>
      </div>
    </div>
  </footer>`;
}

function renderNotFoundPage() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
${renderMeta({
  title: `页面未找到 - ${config.site.title}`,
  description: `返回 ${config.site.title}首页，继续查看分类和工具入口。`,
  canonical: absoluteUrl("404.html"),
  cssFiles: ["./assets/base.css", "./assets/detail.css"]
})}
</head>
<body class="detail-body" style="${bodyVars(config.categories[0].theme)}">
  ${renderSiteHeader("home", `<a href="${safeHref("/")}">首页</a> / 404`)}
  <main class="shell">
    <section class="detail-panel detail-empty">
      <h1>这个页面不存在</h1>
      <p>你可以返回 ${escapeHtml(config.site.title)}首页，继续查看左侧分类和站点卡片。</p>
      <div class="detail-actions">
        <a class="button button-primary" href="${safeHref("/")}">返回首页</a>
        <a class="button button-secondary" href="${safeHref(`/${config.categories[0].slug}/`)}">查看站点分类</a>
      </div>
    </section>
  </main>
  ${renderFooter()}
</body>
</html>`;
}

function renderSitemap() {
  const urls = [
    config.site.baseUrl,
    ...config.categories.map((category) => absoluteUrl(`${category.slug}/`)),
    ...config.pages.map((page) => absoluteUrl(`${page.slug}/`))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url, index) => `  <url>
    <loc>${url}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${index === 0 ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;
}

function renderRobotsTxt() {
  return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Baiduspider
Allow: /

Sitemap: ${absoluteUrl("sitemap.xml")}`;
}

function renderSiteJs() {
  return `const searchInput = document.getElementById("directorySearch");
const groups = [...document.querySelectorAll("[data-group]")];
const emptyState = document.getElementById("emptyState");

if (searchInput) {
  const update = () => {
    const keyword = searchInput.value.trim().toLowerCase();
    let visibleGroups = 0;

    groups.forEach((group) => {
      const cards = [...group.querySelectorAll("[data-card]")];
      let visibleCards = 0;

      cards.forEach((card) => {
        const text = (card.dataset.keywords || "").toLowerCase();
        const matches = !keyword || text.includes(keyword);
        card.classList.toggle("hidden", !matches);
        if (matches) {
          visibleCards += 1;
        }
      });

      if (cards.length > 0) {
        group.classList.toggle("hidden", visibleCards === 0);
        if (visibleCards > 0) {
          visibleGroups += 1;
        }
      } else {
        const text = (group.dataset.keywords || "").toLowerCase();
        const matches = !keyword || text.includes(keyword);
        group.classList.toggle("hidden", !matches);
        if (matches) {
          visibleGroups += 1;
        }
      }
    });

    if (emptyState) {
      emptyState.classList.toggle("hidden", visibleGroups > 0);
    }
  };

  searchInput.addEventListener("input", update);
  update();
}`;
}

function renderBaseCss() {
  return `:root {
  --accent: #6a5cff;
  --accent-soft: #ebe8ff;
  --surface: #f5f6fb;
  --panel: #ffffff;
  --ink: #171717;
  --muted: #6b7280;
  --line: rgba(100, 116, 139, 0.18);
  --shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
  --radius: 20px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: Inter, "PingFang SC", "Microsoft YaHei", sans-serif;
  color: var(--ink);
  background: var(--surface);
  line-height: 1.65;
}
a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; }
.shell { width: min(1240px, calc(100% - 32px)); margin: 0 auto; }
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(245, 246, 251, 0.94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(100, 116, 139, 0.08);
}
.topbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
  min-height: 72px;
}
.brand-wrap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.brand-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #6a5cff;
  color: white;
  font-size: 14px;
  font-weight: 800;
}
.brand-title {
  font-size: 18px;
  font-weight: 800;
}
.top-nav {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 15px;
}
.top-nav a {
  color: #4b5563;
  padding: 10px 0;
}
.top-nav a.is-active {
  color: #6a5cff;
  font-weight: 700;
}
.top-actions {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.ghost-link,
.submit-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
}
.ghost-link {
  border: 1px solid var(--line);
  background: white;
}
.submit-link {
  background: #111827;
  color: white;
}
.crumb-bar {
  padding: 0 0 14px;
  font-size: 13px;
  color: var(--muted);
}
.hero-kicker,
.section-kicker {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6b7280;
}
h1, h2, h3, p, ul, pre { margin: 0; }
h1 { font-size: clamp(30px, 4.2vw, 42px); line-height: 1.18; }
h2 { font-size: clamp(22px, 3vw, 28px); line-height: 1.25; }
h3 { font-size: 18px; line-height: 1.35; }
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 700;
}
.button-primary { background: #6a5cff; color: white; }
.button-secondary { background: white; border-color: var(--line); color: var(--ink); }
.search-panel {
  display: grid;
  gap: 12px;
  margin: 0 auto 22px;
  max-width: 780px;
}
.search-box {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: white;
  box-shadow: var(--shadow);
}
.search-scope,
.search-button {
  min-height: 58px;
  padding: 0 18px;
  border: 0;
  background: transparent;
}
.search-scope {
  border-right: 1px solid var(--line);
  color: #4b5563;
}
.search-button {
  border-left: 1px solid var(--line);
  background: #6a5cff;
  color: white;
  border-radius: 0 18px 18px 0;
  font-weight: 700;
}
input[type="search"] {
  width: 100%;
  min-height: 58px;
  border: 0;
  background: transparent;
  padding: 0 18px;
  font-size: 15px;
  color: var(--ink);
}
input[type="search"]::placeholder,
textarea::placeholder {
  color: #9ca3af;
}
.search-tip-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.search-tip,
.search-shortcut {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 13px;
}
.search-tip {
  gap: 8px;
  color: #6b7280;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(100, 116, 139, 0.12);
}
.search-tip span {
  color: #111827;
  font-weight: 700;
}
.search-shortcut {
  background: #fff3cf;
  color: #a15c00;
  font-weight: 700;
}
.site-footer {
  padding: 20px 0 36px;
}
.crawl-strip {
  padding: 22px;
  margin-bottom: 18px;
  border: 1px solid rgba(100, 116, 139, 0.12);
  border-radius: var(--radius);
  background: white;
  box-shadow: var(--shadow);
}
.crawl-head p:last-child {
  margin-top: 10px;
  color: #6b7280;
  font-size: 14px;
}
.crawl-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 16px;
}
.index-card {
  padding: 18px;
  border-radius: 18px;
  background: color-mix(in srgb, var(--accent-soft) 16%, white);
  border: 1px solid color-mix(in srgb, var(--accent) 12%, #d9dde8);
}
.index-card h3 {
  font-size: 18px;
}
.index-card p {
  margin-top: 10px;
  color: var(--muted);
  font-size: 14px;
}
.index-links {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}
.index-links a {
  color: var(--accent);
  font-size: 14px;
  font-weight: 700;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 18px;
  padding-top: 22px;
  border-top: 1px solid rgba(100, 116, 139, 0.12);
}
.footer-title {
  font-size: 16px;
  font-weight: 700;
}
.footer-text,
.footer-links {
  color: #6b7280;
  font-size: 14px;
}
.footer-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.sidebar-card,
.site-card,
.quick-strip,
.detail-panel,
.hub-hero,
.detail-hero,
.detail-empty {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: white;
  box-shadow: var(--shadow);
}
.sidebar-card {
  padding: 18px;
}
.sidebar-card h2 {
  font-size: 18px;
  margin-bottom: 12px;
}
.sidebar-nav,
.sidebar-subnav {
  display: grid;
  gap: 8px;
}
.sidebar-nav a,
.sidebar-subnav a {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 12px;
  border-radius: 12px;
  color: #4b5563;
  font-size: 14px;
}
.sidebar-nav a em {
  margin-left: auto;
  font-style: normal;
  color: #9ca3af;
  font-size: 12px;
}
.sidebar-subnav a em {
  margin-left: auto;
  font-style: normal;
  color: #9ca3af;
  font-size: 12px;
}
.sidebar-nav a.is-active,
.sidebar-subnav a.is-current {
  background: color-mix(in srgb, var(--accent-soft) 80%, white);
  color: var(--accent);
  font-weight: 700;
}
.nav-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accent-soft) 80%, white);
  color: var(--accent);
  font-size: 12px;
  font-weight: 800;
}
.site-card { padding: 20px; }
.card-top {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
}
.card-brand {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  min-width: 0;
}
.card-copy {
  min-width: 0;
  flex: 1;
}
.card-copy h3 {
  font-size: 17px;
  line-height: 1.45;
}
.card-copy h3 a {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-mark,
.detail-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--accent-soft) 85%, white);
  color: var(--accent);
  font-size: 24px;
  font-weight: 800;
}
.card-subtitle {
  margin-top: 8px;
  color: #6b7280;
  font-size: 13px;
}
.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}
.card-tags span,
.mini-type,
.mini-category {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent-soft) 82%, white);
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
}
.card-summary {
  margin-top: 12px;
  color: #6b7280;
  font-size: 14px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  min-height: 69px;
}
.card-meta {
  margin-top: 10px;
  color: #94a3b8;
  font-size: 13px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 40px;
}
.card-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
}
.primary-action,
.secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
}
.primary-action {
  background: color-mix(in srgb, var(--accent-soft) 82%, white);
  color: var(--accent);
}
.secondary-action {
  color: #6b7280;
}
.empty-state {
  padding: 20px 0 10px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
}
.section-badges,
.hub-meta,
.detail-side-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.section-badges {
  margin-top: 12px;
}
.section-badges span,
.hub-meta span,
.detail-side-meta span,
.section-count {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
}
.compact-subnav a {
  min-height: 38px;
}
.sidebar-cta {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 40px;
  margin-top: 14px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--accent-soft) 82%, white);
  color: var(--accent);
  font-size: 14px;
  font-weight: 700;
}
.hidden { display: none !important; }
@media (max-width: 1024px) {
  .topbar {
    grid-template-columns: 1fr;
    padding: 14px 0;
  }
  .top-nav {
    justify-content: flex-start;
  }
  .crawl-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 720px) {
  .shell { width: min(100% - 20px, 1240px); }
  .top-actions { width: 100%; }
  .ghost-link, .submit-link, .button { width: 100%; }
  .search-box {
    grid-template-columns: 1fr;
  }
  .search-scope,
  .search-button {
    border: 0;
    border-radius: 0;
  }
}`;
}

function renderHomeCss() {
  return `.hero-banner {
  max-width: 880px;
  margin: 34px auto 22px;
  text-align: center;
}
.hero-subtitle {
  margin-top: 12px;
  color: #4b5563;
  font-size: 17px;
}
.hero-intro {
  margin: 14px auto 0;
  max-width: 880px;
  color: #6b7280;
  font-size: 15px;
}
.hero-metrics {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.hero-metric {
  min-width: 150px;
  padding: 14px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(100, 116, 139, 0.12);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
}
.hero-metric strong {
  display: block;
  font-size: 22px;
}
.hero-metric span {
  display: block;
  margin-top: 4px;
  color: #6b7280;
  font-size: 13px;
}
.quick-strip {
  padding: 22px;
  margin-bottom: 18px;
}
.quick-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;
}
.quick-head p {
  color: #6b7280;
  font-size: 14px;
}
.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.mini-reco {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(100, 116, 139, 0.12);
  background: #f8f8fe;
}
.mini-reco-top {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.mini-reco h3 {
  font-size: 16px;
}
.mini-reco p {
  margin-top: 8px;
  color: #6b7280;
  font-size: 14px;
}
.mini-link {
  display: inline-flex;
  margin-top: 14px;
  color: #6a5cff;
  font-size: 13px;
  font-weight: 700;
}
.directory-shell {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}
.directory-sidebar {
  position: sticky;
  top: 92px;
}
.directory-content {
  display: grid;
  gap: 18px;
}
.directory-section {
  padding: 22px;
  border-radius: 20px;
  background: white;
  border: 1px solid color-mix(in srgb, var(--accent) 10%, #d9dde8);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.04);
}
.section-heading {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 16px;
}
.section-heading p {
  color: var(--muted);
  font-size: 14px;
}
.section-link {
  color: var(--accent);
  font-size: 14px;
  font-weight: 700;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 1100px) {
  .quick-grid,
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 860px) {
  .directory-shell {
    grid-template-columns: 1fr;
  }
  .directory-sidebar {
    position: static;
  }
}
@media (max-width: 640px) {
  .quick-head,
  .section-heading,
  .quick-grid,
  .card-grid {
    grid-template-columns: 1fr;
    display: grid;
  }
  .hero-metrics {
    display: grid;
    grid-template-columns: 1fr;
  }
  .card-summary,
  .card-meta {
    min-height: auto;
  }
}`;
}

function renderHubCss() {
  return `.hub-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}
.hub-sidebar {
  position: sticky;
  top: 92px;
  display: grid;
  gap: 16px;
}
.hub-content {
  display: grid;
  gap: 18px;
}
.hub-hero {
  padding: 24px;
}
.hub-intro {
  margin-top: 12px;
  color: var(--muted);
  font-size: 15px;
}
.hub-meta {
  margin-top: 16px;
}
.hub-copy {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}
.hub-copy p {
  color: var(--muted);
  font-size: 14px;
}
.hub-section {
  padding: 22px;
  border-radius: 20px;
  background: white;
  border: 1px solid color-mix(in srgb, var(--accent) 10%, #d9dde8);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.04);
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 1024px) {
  .hub-layout {
    grid-template-columns: 1fr;
  }
  .hub-sidebar {
    position: static;
  }
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}`;
}

function renderDetailCss() {
  return `.detail-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
  padding-top: 20px;
}
.detail-sidebar {
  position: sticky;
  top: 92px;
  display: grid;
  gap: 16px;
}
.detail-content {
  display: grid;
  gap: 18px;
}
.detail-hero {
  padding: 24px;
}
.detail-hero-top {
  display: flex;
  gap: 16px;
  align-items: center;
}
.detail-summary {
  margin-top: 14px;
  color: var(--muted);
  font-size: 15px;
}
.detail-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}
.detail-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
}
.detail-panel {
  padding: 22px;
}
.detail-block-head p {
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
}
.tool-grid,
.detail-columns,
.detail-related {
  display: grid;
  gap: 16px;
}
.tool-grid,
.detail-columns.two-up,
.detail-related {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.detail-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 18px;
}
.tool-box,
.mini-card,
.takeaway-box {
  border: 1px solid var(--line);
  border-radius: 16px;
  background: color-mix(in srgb, var(--accent-soft) 12%, white);
  padding: 18px;
}
.tool-label {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 10px;
}
.tool-box pre {
  white-space: pre-wrap;
  font: 13px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace;
  color: var(--ink);
}
.mini-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent-soft) 80%, white);
  color: var(--accent);
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 10px;
}
.mini-card p,
.article-row p,
.faq-item p {
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
}
.bullet-list {
  list-style: none;
  padding: 0;
  margin: 14px 0 0;
  display: grid;
  gap: 10px;
}
.bullet-list li {
  position: relative;
  padding-left: 16px;
  color: var(--muted);
  font-size: 14px;
}
.bullet-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.article-row + .article-row {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}
.faq-list {
  display: grid;
  gap: 14px;
  margin-top: 14px;
}
.faq-item + .faq-item {
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.related-list {
  list-style: none;
  padding: 0;
  margin: 14px 0 0;
  display: grid;
  gap: 10px;
}
.related-list a {
  display: block;
  padding: 12px 14px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--accent-soft) 70%, white);
  color: var(--accent);
  font-size: 14px;
  font-weight: 700;
}
.detail-empty {
  margin-top: 24px;
  text-align: center;
}
@media (max-width: 1024px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
  .detail-sidebar {
    position: static;
  }
  .detail-metrics,
  .tool-grid,
  .detail-columns,
  .detail-columns.two-up,
  .detail-related {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .detail-hero-top {
    flex-direction: column;
    align-items: flex-start;
  }
}`;
}
