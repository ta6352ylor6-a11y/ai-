import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const configPath = process.env.SITE_FACTORY_CONFIG;
const outputDir = process.env.SITE_FACTORY_OUTPUT_DIR;

if (!configPath || !outputDir) {
  throw new Error("Missing SITE_FACTORY_CONFIG or SITE_FACTORY_OUTPUT_DIR for ai-nav.");
}

const { default: config } = await import(pathToFileURL(configPath).href);
const { site, categories } = config;

const tools = categories.flatMap((category) => category.tools.map((tool) => ({ ...tool, category })));
const hotTools = tools.filter((tool) => tool.hot).slice(0, 16);

const slugs = new Set();
for (const tool of tools) {
  if (slugs.has(tool.slug)) throw new Error(`Duplicate tool slug: ${tool.slug}`);
  slugs.add(tool.slug);
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(path.join(outputDir, "assets"), { recursive: true });

writeFile("assets/style.css", renderCss());
writeFile("assets/app.js", renderJs());
writeFile("index.html", renderHome());
writeFile("404.html", renderNotFound());
writeFile("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("sitemap.xml")}\n`);
writeFile("sitemap.xml", renderSitemap());
// Placeholder; scripts/publish.mjs rewrites it with every published sub-site.
writeFile("sites.json", "[]\n");

for (const category of categories) {
  writeFile(`category/${category.slug}/index.html`, renderCategory(category));
}
for (const tool of tools) {
  writeFile(`tool/${tool.slug}/index.html`, renderTool(tool));
}

console.log(`Built ai-nav site "${site.title}" with ${categories.length} categories and ${tools.length} tools.`);

function writeFile(relativePath, content) {
  const filePath = path.join(outputDir, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, "utf8");
}

function absoluteUrl(relativePath = "") {
  return new URL(relativePath, site.baseUrl).toString();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replaceAll("<", "\\u003c")}</script>`;
}

// Stable per-tool hue so letter avatars stay the same color across builds.
function hue(text) {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.codePointAt(0)) % 360;
  return h;
}

function avatar(tool, size = "") {
  const letter = [...tool.name][0].toUpperCase();
  return `<span class="avatar ${size}" style="--h:${hue(tool.slug)}" aria-hidden="true">${escapeHtml(letter)}</span>`;
}

function page({ title, description, canonical, body, schema = [], ogType = "website", noindex = false }) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="${noindex ? "noindex" : "index,follow,max-image-preview:large"}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="${escapeHtml(site.title)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="stylesheet" href="${absoluteUrl("assets/style.css")}">
  ${schema.map(jsonLd).join("\n  ")}
</head>
<body>
${renderHeader()}
<div class="shell">
${renderSidebar()}
  <main class="main" id="main">
${site.rail ? renderRail("rail-inline") : ""}
${body}
${renderFooter()}
  </main>
${site.rail ? `  <aside class="rail" aria-label="推荐">\n${renderRail("rail-card")}\n  </aside>` : ""}
</div>
<script src="${absoluteUrl("assets/app.js")}" defer></script>
</body>
</html>
`;
}

function renderHeader() {
  return `<header class="topbar">
  <button class="menu-btn" type="button" aria-label="打开分类菜单" data-menu>☰</button>
  <a class="logo" href="${absoluteUrl()}">
    <span class="logo-mark">${escapeHtml(site.brandShort)}</span>
    <span class="logo-text">${escapeHtml(site.tagline)}</span>
  </a>
  <form class="top-search" action="${absoluteUrl()}" method="get" role="search">
    <input type="search" name="q" placeholder="搜索 AI 工具，如：PPT、配音、编程" aria-label="搜索 AI 工具" data-search-input>
  </form>
</header>`;
}

// Wide screens show the lead card in a sticky right column; narrower screens get a compact banner above the content.
function renderRail(variant) {
  const { rail } = site;
  return `    <div class="${variant}">
      <p class="rail-eyebrow">${escapeHtml(rail.eyebrow)}</p>
      <p class="rail-title">${escapeHtml(rail.title)}</p>
      <ul class="rail-points">${rail.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
      <a class="rail-cta" href="${escapeHtml(rail.href)}" target="_blank" rel="noopener">${escapeHtml(rail.label)} →</a>
    </div>`;
}

function renderSidebar() {
  const items = categories
    .map((c) => `      <li><a href="${absoluteUrl(`category/${c.slug}/`)}"><span class="ico">${c.icon}</span>${escapeHtml(c.name)}<span class="count">${c.tools.length}</span></a></li>`)
    .join("\n");
  return `  <aside class="sidebar" data-sidebar>
    <nav aria-label="工具分类">
      <p class="side-title">工具分类</p>
      <ul class="side-nav">
      <li><a href="${absoluteUrl()}#hot"><span class="ico">🔥</span>热门工具<span class="count">${hotTools.length}</span></a></li>
${items}
      </ul>
    </nav>
    <div class="promo">
      <p class="promo-title">${escapeHtml(site.promo.title)}</p>
      <p class="promo-body">${escapeHtml(site.promo.body)}</p>
      <a class="promo-link" href="${escapeHtml(site.promo.href)}" target="_blank" rel="noopener">${escapeHtml(site.promo.label)} →</a>
    </div>
  </aside>
  <div class="scrim" data-scrim></div>`;
}

function renderFooter() {
  return `    <footer class="footer">
      <p><strong>${escapeHtml(site.title)}</strong> · 收录 ${tools.length} 个 AI 工具，按场景分为 ${categories.length} 类。更新于 ${escapeHtml(site.updated)}。</p>
      <p>本站仅做导航与使用建议，工具的功能、价格和可用地区以各官网为准。请遵守所在地法律法规使用 AI 服务。</p>
    </footer>`;
}

function card(tool) {
  const search = [tool.name, tool.desc, ...tool.tags, tool.category.name].join(" ").toLowerCase();
  return `<a class="card" href="${absoluteUrl(`tool/${tool.slug}/`)}" data-item data-search="${escapeHtml(search)}">
          ${avatar(tool)}
          <span class="card-body">
            <span class="card-name">${escapeHtml(tool.name)}<span class="region ${tool.region === "国内" ? "cn" : "intl"}">${tool.region}</span></span>
            <span class="card-desc">${escapeHtml(tool.desc)}</span>
          </span>
        </a>`;
}

function grid(list) {
  return `<div class="grid">
        ${list.map(card).join("\n        ")}
      </div>`;
}

function renderHome() {
  const keywords = site.hotKeywords
    .map((k) => `<button type="button" class="chip" data-keyword="${escapeHtml(k)}">${escapeHtml(k)}</button>`)
    .join("");
  const sections = categories
    .map(
      (c) => `    <section class="section" id="${c.slug}" data-section>
      <div class="section-head">
        <h2><span class="ico">${c.icon}</span>${escapeHtml(c.name)}</h2>
        <a class="more" href="${absoluteUrl(`category/${c.slug}/`)}">查看全部 →</a>
      </div>
      ${grid(c.tools.map((tool) => ({ ...tool, category: c })))}
    </section>`
    )
    .join("\n");

  const body = `    <section class="hero">
      <h1>${escapeHtml(site.heroTitle)}</h1>
      <p>${escapeHtml(site.heroSubtitle)}</p>
      <form class="hero-search" action="${absoluteUrl()}" method="get" role="search">
        <input type="search" name="q" placeholder="输入想做的事，例如：做PPT、视频配音、写代码" aria-label="搜索 AI 工具" data-search-input>
        <button type="submit">搜索</button>
      </form>
      <div class="chips">${keywords}</div>
    </section>
    <p class="empty" data-empty hidden>没有找到匹配的工具，换个关键词试试。</p>
    <section class="section" id="hot" data-section>
      <div class="section-head"><h2><span class="ico">🔥</span>热门工具</h2></div>
      ${grid(hotTools)}
    </section>
    <section class="section" id="sites" data-subsites hidden>
      <div class="section-head"><h2><span class="ico">🧭</span>本站专题</h2></div>
      <div class="grid" data-subsite-grid></div>
    </section>
${sections}`;

  return page({
    title: `${site.title} - 精选国内外 AI 工具大全`,
    description: site.description,
    canonical: absoluteUrl(),
    body,
    schema: [
      { "@context": "https://schema.org", "@type": "WebSite", name: site.title, url: absoluteUrl(), description: site.description },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: categories.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: absoluteUrl(`category/${c.slug}/`) }))
      }
    ]
  });
}

function breadcrumb(items) {
  const html = items
    .map((item, i) => (i === items.length - 1 ? `<span>${escapeHtml(item.name)}</span>` : `<a href="${item.url}">${escapeHtml(item.name)}</a>`))
    .join(`<span class="sep">/</span>`);
  return {
    html: `<nav class="crumbs" aria-label="面包屑">${html}</nav>`,
    schema: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url }))
    }
  };
}

function renderCategory(category) {
  const url = absoluteUrl(`category/${category.slug}/`);
  const crumbs = breadcrumb([
    { name: "首页", url: absoluteUrl() },
    { name: category.name, url }
  ]);
  const others = categories
    .filter((c) => c.slug !== category.slug)
    .map((c) => `<a class="chip" href="${absoluteUrl(`category/${c.slug}/`)}">${c.icon} ${escapeHtml(c.name)}</a>`)
    .join("");

  const body = `    ${crumbs.html}
    <section class="page-head">
      <h1><span class="ico">${category.icon}</span>${escapeHtml(category.name)}工具</h1>
      <p>${escapeHtml(category.summary)}共收录 ${category.tools.length} 个工具。</p>
    </section>
    <p class="empty" data-empty hidden>没有找到匹配的工具，换个关键词试试。</p>
    <section class="section" data-section>
      ${grid(category.tools.map((tool) => ({ ...tool, category })))}
    </section>
    <section class="panel">
      <h2>怎么选${escapeHtml(category.name)}工具</h2>
      <ol class="steps">${category.guide.map((g) => `<li>${escapeHtml(g)}</li>`).join("")}</ol>
    </section>
    <section class="panel">
      <h2>其他分类</h2>
      <div class="chips">${others}</div>
    </section>`;

  return page({
    title: `${category.name}工具推荐 - ${site.title}`,
    description: `${category.summary}收录 ${category.tools.map((t) => t.name).slice(0, 6).join("、")} 等 ${category.tools.length} 个工具。`,
    canonical: url,
    body,
    schema: [
      crumbs.schema,
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: category.name,
        itemListElement: category.tools.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: absoluteUrl(`tool/${t.slug}/`) }))
      }
    ]
  });
}

function renderTool(tool) {
  const url = absoluteUrl(`tool/${tool.slug}/`);
  const { category } = tool;
  const crumbs = breadcrumb([
    { name: "首页", url: absoluteUrl() },
    { name: category.name, url: absoluteUrl(`category/${category.slug}/`) },
    { name: tool.name, url }
  ]);
  const related = category.tools.filter((t) => t.slug !== tool.slug).slice(0, 6).map((t) => ({ ...t, category }));
  const access =
    tool.region === "国内"
      ? `${tool.name} 是国内产品，一般可以直接访问，部分功能需要注册登录。`
      : `${tool.name} 是海外服务，部分地区可能无法直接访问或需要海外手机号注册，请遵守所在地法律法规使用。`;
  const faq = [
    [`${tool.name} 是做什么的？`, tool.intro],
    [`${tool.name} 收费吗？`, "多数 AI 工具提供免费额度或试用，进阶功能按订阅或用量计费，具体以官网最新价格为准。"],
    [`${tool.name} 可以直接访问吗？`, access]
  ];

  const body = `    ${crumbs.html}
    <section class="tool-head">
      ${avatar(tool, "lg")}
      <div class="tool-meta">
        <h1>${escapeHtml(tool.name)}</h1>
        <p class="tool-desc">${escapeHtml(tool.desc)}</p>
        <div class="tags">
          <span class="region ${tool.region === "国内" ? "cn" : "intl"}">${tool.region}</span>
          ${tool.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
      <a class="visit" href="${escapeHtml(tool.url)}" target="_blank" rel="noopener nofollow">访问官网 ↗</a>
    </section>
    <section class="panel">
      <h2>${escapeHtml(tool.name)} 简介</h2>
      <p>${escapeHtml(tool.intro)}</p>
      <p class="muted">官网地址：<a href="${escapeHtml(tool.url)}" target="_blank" rel="noopener nofollow">${escapeHtml(tool.url)}</a></p>
    </section>
    <section class="panel">
      <h2>选择${escapeHtml(category.name)}工具时注意</h2>
      <ol class="steps">${category.guide.map((g) => `<li>${escapeHtml(g)}</li>`).join("")}</ol>
    </section>
    <section class="panel">
      <h2>常见问题</h2>
      ${faq.map(([q, a]) => `<details class="faq"><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("\n      ")}
    </section>
    <section class="section">
      <div class="section-head">
        <h2>同类工具</h2>
        <a class="more" href="${absoluteUrl(`category/${category.slug}/`)}">全部${escapeHtml(category.name)} →</a>
      </div>
      ${grid(related)}
    </section>`;

  return page({
    title: `${tool.name}：${tool.desc.replace(/。$/, "")} - ${site.title}`,
    description: `${tool.intro}`.slice(0, 150),
    canonical: url,
    ogType: "article",
    body,
    schema: [
      crumbs.schema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
      }
    ]
  });
}

function renderNotFound() {
  return page({
    title: `页面不存在 - ${site.title}`,
    description: "你访问的页面不存在。",
    canonical: absoluteUrl("404.html"),
    noindex: true,
    body: `    <section class="page-head">
      <h1>页面不存在</h1>
      <p>链接可能已经变更。可以回到 <a href="${absoluteUrl()}">首页</a> 搜索需要的 AI 工具。</p>
    </section>`
  });
}

function renderSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [absoluteUrl(), ...categories.map((c) => absoluteUrl(`category/${c.slug}/`)), ...tools.map((t) => absoluteUrl(`tool/${t.slug}/`))];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
}

function renderJs() {
  return `(() => {
  const sidebar = document.querySelector("[data-sidebar]");
  const scrim = document.querySelector("[data-scrim]");
  const toggle = (open) => {
    sidebar.classList.toggle("open", open);
    scrim.classList.toggle("open", open);
  };
  document.querySelector("[data-menu]").addEventListener("click", () => toggle(!sidebar.classList.contains("open")));
  scrim.addEventListener("click", () => toggle(false));

  const inputs = [...document.querySelectorAll("[data-search-input]")];
  const items = [...document.querySelectorAll("[data-item]")];
  const empty = document.querySelector("[data-empty]");
  const filter = (raw) => {
    const q = raw.trim().toLowerCase();
    inputs.forEach((input) => { if (input.value !== raw) input.value = raw; });
    items.forEach((item) => { item.hidden = q !== "" && !item.dataset.search.includes(q); });
    let visible = 0;
    document.querySelectorAll("[data-section]").forEach((section) => {
      const shown = [...section.querySelectorAll("[data-item]")].some((item) => !item.hidden);
      section.hidden = !shown;
      if (shown) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;
  };
  if (items.length) {
    inputs.forEach((input) => {
      input.addEventListener("input", () => filter(input.value));
      input.form.addEventListener("submit", (event) => { event.preventDefault(); filter(input.value); });
    });
    document.querySelectorAll("[data-keyword]").forEach((chip) => chip.addEventListener("click", () => filter(chip.dataset.keyword)));
    const q = new URLSearchParams(location.search).get("q");
    if (q) filter(q);
  }

  const subsites = document.querySelector("[data-subsites]");
  if (subsites) {
    fetch(${JSON.stringify(absoluteUrl("sites.json"))}, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((list) => {
        if (!Array.isArray(list) || !list.length) return;
        const grid = subsites.querySelector("[data-subsite-grid]");
        for (const s of list) {
          const a = document.createElement("a");
          a.className = "card";
          a.href = s.url;
          const name = document.createElement("span");
          name.className = "card-name";
          name.textContent = s.title;
          const desc = document.createElement("span");
          desc.className = "card-desc";
          desc.textContent = s.description || s.url;
          const body = document.createElement("span");
          body.className = "card-body";
          body.append(name, desc);
          a.append(body);
          grid.append(a);
        }
        subsites.hidden = false;
      })
      .catch(() => {});
  }
})();
`;
}

function renderCss() {
  return `:root {
  --bg: #f4f6fb;
  --panel: #ffffff;
  --ink: #1d2433;
  --muted: #69738a;
  --line: #e5e9f2;
  --accent: #4f5bd5;
  --accent-soft: #eef0ff;
  --cn: #0f8a5f;
  --cn-soft: #e5f6ee;
  --intl: #8a5a0f;
  --intl-soft: #fbf1df;
  --shadow: 0 1px 2px rgba(20, 30, 60, .04), 0 6px 18px rgba(20, 30, 60, .06);
  --radius: 12px;
  --side: 232px;
  --top: 60px;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #12151d;
    --panel: #1a1e29;
    --ink: #e6e9f2;
    --muted: #98a1b5;
    --line: #2a3040;
    --accent: #8d96ff;
    --accent-soft: #252a45;
    --cn: #5fd3a3;
    --cn-soft: #173229;
    --intl: #e7b866;
    --intl-soft: #3a2f1a;
    --shadow: none;
  }
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: calc(var(--top) + 12px); }
body { margin: 0; background: var(--bg); color: var(--ink); font: 15px/1.6 -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif; }
a { color: inherit; text-decoration: none; }
[hidden] { display: none !important; }
.topbar { position: sticky; top: 0; z-index: 30; height: var(--top); display: flex; align-items: center; gap: 16px; padding: 0 20px; background: var(--panel); border-bottom: 1px solid var(--line); }
.logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; width: calc(var(--side) - 20px); }
.logo-mark { background: var(--accent); color: #fff; font-weight: 700; padding: 4px 10px; border-radius: 8px; font-size: 14px; }
.logo-text { font-weight: 700; font-size: 17px; }
.top-search { flex: 1; max-width: 520px; }
.top-search input, .hero-search input { width: 100%; border: 1px solid var(--line); background: var(--bg); color: var(--ink); border-radius: 999px; padding: 9px 18px; font: inherit; outline: none; }
.top-search input:focus, .hero-search input:focus { border-color: var(--accent); }
.menu-btn { display: none; border: 0; background: none; color: var(--ink); font-size: 22px; cursor: pointer; padding: 4px; }
.shell { display: flex; }
.sidebar { position: sticky; top: var(--top); height: calc(100vh - var(--top)); width: var(--side); flex-shrink: 0; overflow-y: auto; padding: 16px 12px; background: var(--panel); border-right: 1px solid var(--line); }
.side-title { margin: 0 10px 8px; font-size: 12px; color: var(--muted); letter-spacing: .08em; }
.side-nav { list-style: none; margin: 0; padding: 0; }
.side-nav a { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; font-size: 14px; }
.side-nav a:hover { background: var(--accent-soft); color: var(--accent); }
.count { margin-left: auto; font-size: 12px; color: var(--muted); }
.ico { display: inline-block; width: 1.4em; text-align: center; margin-right: 4px; }
.side-nav .ico { margin-right: 0; }
.promo { margin: 18px 4px 8px; padding: 14px; border-radius: var(--radius); background: var(--accent-soft); }
.promo-title { margin: 0 0 6px; font-weight: 700; font-size: 14px; }
.promo-body { margin: 0 0 10px; font-size: 13px; color: var(--muted); }
.promo-link { font-size: 13px; font-weight: 600; color: var(--accent); }
.scrim { display: none; }
.rail { width: 272px; flex-shrink: 0; padding: 24px 20px 24px 0; }
.rail-card { position: sticky; top: calc(var(--top) + 24px); }
.rail-card, .rail-inline { padding: 22px 20px; border-radius: 16px; color: #fff; background: linear-gradient(150deg, #ff6a3d, #e8384f 55%, #b8236b); box-shadow: 0 10px 30px rgba(232, 56, 79, .28); }
.rail-eyebrow { display: inline-block; margin: 0 0 10px; padding: 2px 10px; border-radius: 999px; background: rgba(255, 255, 255, .22); font-size: 12px; font-weight: 600; }
.rail-title { margin: 0 0 12px; font-size: 20px; font-weight: 800; line-height: 1.35; }
.rail-points { margin: 0 0 18px; padding: 0; list-style: none; font-size: 14px; }
.rail-points li { padding: 4px 0 4px 22px; position: relative; }
.rail-points li::before { content: "✓"; position: absolute; left: 0; font-weight: 700; }
.rail-cta { display: block; text-align: center; padding: 11px 0; border-radius: 999px; background: #fff; color: #d6304a; font-weight: 700; }
.rail-cta:hover { opacity: .92; }
.rail-inline { display: none; margin-bottom: 18px; }
.main { flex: 1; min-width: 0; padding: 24px 28px 40px; max-width: 1280px; }
.hero { text-align: center; padding: 36px 16px 28px; margin-bottom: 8px; border-radius: 18px; background: linear-gradient(135deg, var(--accent-soft), var(--panel)); border: 1px solid var(--line); }
.hero h1 { margin: 0 0 8px; font-size: 32px; }
.hero p { margin: 0 auto 20px; color: var(--muted); max-width: 640px; }
.hero-search { display: flex; gap: 8px; max-width: 620px; margin: 0 auto 14px; }
.hero-search input { padding: 12px 20px; background: var(--panel); }
.hero-search button { white-space: nowrap; border: 0; border-radius: 999px; padding: 0 24px; background: var(--accent); color: #fff; font: inherit; font-weight: 600; cursor: pointer; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.panel .chips { justify-content: flex-start; }
.chip { border: 1px solid var(--line); background: var(--panel); color: var(--ink); border-radius: 999px; padding: 4px 14px; font: inherit; font-size: 13px; cursor: pointer; }
.chip:hover { border-color: var(--accent); color: var(--accent); }
.section { margin-top: 28px; }
.section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.section-head h2 { margin: 0; font-size: 19px; }
.more { font-size: 13px; color: var(--muted); }
.more:hover { color: var(--accent); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px; }
.card { display: flex; gap: 12px; align-items: flex-start; padding: 14px; background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); transition: transform .15s, border-color .15s; }
.card:hover { transform: translateY(-2px); border-color: var(--accent); }
.card-body { display: flex; flex-direction: column; min-width: 0; }
.card-name { display: flex; align-items: center; gap: 6px; font-weight: 650; }
.card-desc { font-size: 13px; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-top: 2px; }
.avatar { flex-shrink: 0; width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; font-weight: 700; font-size: 18px; color: hsl(var(--h) 60% 38%); background: hsl(var(--h) 75% 92%); }
@media (prefers-color-scheme: dark) { .avatar { color: hsl(var(--h) 75% 78%); background: hsl(var(--h) 30% 22%); } }
.avatar.lg { width: 72px; height: 72px; font-size: 32px; border-radius: 16px; }
.region { font-size: 11px; font-weight: 600; padding: 1px 6px; border-radius: 4px; }
.region.cn { color: var(--cn); background: var(--cn-soft); }
.region.intl { color: var(--intl); background: var(--intl-soft); }
.empty { text-align: center; color: var(--muted); padding: 30px 0; }
.crumbs { font-size: 13px; color: var(--muted); margin-bottom: 14px; }
.crumbs a:hover { color: var(--accent); }
.sep { margin: 0 8px; }
.page-head { padding: 22px 24px; background: var(--panel); border: 1px solid var(--line); border-radius: 16px; }
.page-head h1 { margin: 0 0 6px; font-size: 26px; }
.page-head p { margin: 0; color: var(--muted); }
.page-head a { color: var(--accent); }
.panel { margin-top: 18px; padding: 20px 24px; background: var(--panel); border: 1px solid var(--line); border-radius: 16px; }
.panel h2 { margin: 0 0 10px; font-size: 18px; }
.panel p { margin: 0 0 8px; }
.muted { color: var(--muted); font-size: 14px; word-break: break-all; }
.muted a { color: var(--accent); }
.steps { margin: 0; padding-left: 20px; }
.steps li { margin: 4px 0; }
.tool-head { display: flex; gap: 18px; align-items: center; padding: 24px; background: var(--panel); border: 1px solid var(--line); border-radius: 16px; }
.tool-meta { flex: 1; min-width: 0; }
.tool-meta h1 { margin: 0; font-size: 28px; }
.tool-desc { margin: 4px 0 10px; color: var(--muted); }
.tags { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.tag { font-size: 12px; padding: 2px 8px; border-radius: 4px; background: var(--accent-soft); color: var(--accent); }
.visit { flex-shrink: 0; background: var(--accent); color: #fff; font-weight: 600; padding: 10px 22px; border-radius: 999px; }
.visit:hover { opacity: .9; }
.faq { border-top: 1px solid var(--line); padding: 10px 0; }
.faq:first-of-type { border-top: 0; }
.faq summary { cursor: pointer; font-weight: 600; }
.faq p { margin: 8px 0 0; color: var(--muted); }
.footer { margin-top: 40px; padding-top: 18px; border-top: 1px solid var(--line); font-size: 13px; color: var(--muted); }
.footer p { margin: 4px 0; }
@media (max-width: 1199px) {
  .rail { display: none; }
  .rail-inline { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 18px; padding: 16px 20px; }
  .rail-inline .rail-eyebrow { margin: 0; }
  .rail-inline .rail-title { margin: 0; font-size: 17px; flex: 1; min-width: 200px; }
  .rail-inline .rail-points { display: none; }
  .rail-inline .rail-cta { padding: 8px 22px; }
}
@media (max-width: 900px) {
  .menu-btn { display: block; }
  .logo { width: auto; }
  .logo-text { display: none; }
  .sidebar { position: fixed; z-index: 40; top: var(--top); left: 0; transform: translateX(-100%); transition: transform .2s; }
  .sidebar.open { transform: none; }
  .scrim.open { display: block; position: fixed; inset: var(--top) 0 0 0; z-index: 35; background: rgba(0, 0, 0, .35); }
  .main { padding: 16px 16px 32px; }
  .hero h1 { font-size: 24px; }
  .tool-head { flex-wrap: wrap; }
  .visit { width: 100%; text-align: center; }
}
`;
}
