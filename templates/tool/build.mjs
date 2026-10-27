import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const configPath = process.env.SITE_FACTORY_CONFIG;
const outputDir = process.env.SITE_FACTORY_OUTPUT_DIR;

if (!configPath || !outputDir) {
  throw new Error("Missing SITE_FACTORY_CONFIG or SITE_FACTORY_OUTPUT_DIR for family-tool.");
}

const { default: config } = await import(pathToFileURL(configPath).href);

const categories = new Map(config.categories.map((item) => [item.id, item]));
const groupedTools = config.categories.map((category) => ({
  ...category,
  tools: config.tools.filter((tool) => tool.category === category.id)
}));

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(path.join(outputDir, "assets"), { recursive: true });

writeFile("index.html", renderHomePage());
writeFile("robots.txt", renderRobotsTxt());
writeFile("sitemap.xml", renderSitemap());
writeFile(path.join("assets", "tool.css"), renderCss());
writeFile(path.join("assets", "tool.js"), renderJs());

for (const tool of config.tools) {
  writeFile(path.join(tool.slug, "index.html"), renderToolPage(tool));
}

console.log(`Built family-tool site "${config.site.title}" with ${config.tools.length} tool pages.`);

function writeFile(relativePath, content) {
  const filePath = path.join(outputDir, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, "utf8");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function absoluteUrl(relativePath = "") {
  return new URL(relativePath, config.site.baseUrl).toString();
}

function renderMeta({ title, description, canonical, jsonLd = "" }) {
  return `  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="stylesheet" href="${absoluteUrl("assets/tool.css")}">
${jsonLd ? `  <script type="application/ld+json">${jsonLd}</script>` : ""}`;
}

function renderHeader() {
  const categoryLinks = config.categories
    .map((category) => `<button class="chip" type="button" data-filter="${escapeHtml(category.id)}">${escapeHtml(category.name)}</button>`)
    .join("");

  return `<header class="site-header">
    <div class="shell header-row">
      <a class="brand" href="${absoluteUrl()}">${escapeHtml(config.site.brand)}</a>
      <div class="header-actions">
        <a href="#toolDirectory">工具目录</a>
        <a href="#faq">常见问题</a>
        <a class="button ghost" href="${escapeHtml(config.site.primaryAction.href)}">${escapeHtml(config.site.primaryAction.label)}</a>
      </div>
    </div>
    <div class="shell hero-grid">
      <div>
        <p class="eyebrow">${escapeHtml(config.site.eyebrow)}</p>
        <h1>${escapeHtml(config.site.heroTitle)}</h1>
        <p class="hero-text">${escapeHtml(config.site.heroSubtitle)}</p>
        <div class="hero-cta">
          <a class="button" href="#toolDirectory">${escapeHtml(config.site.primaryAction.label)}</a>
          <a class="button ghost" href="${escapeHtml(config.site.secondaryAction.href)}">${escapeHtml(config.site.secondaryAction.label)}</a>
        </div>
      </div>
      <aside class="hero-panel">
        <p>${escapeHtml(config.site.intro)}</p>
        <div class="hero-search">
          <input id="toolSearch" type="search" placeholder="${escapeHtml(config.site.searchPlaceholder)}">
        </div>
        <div class="chip-row">${categoryLinks}</div>
      </aside>
    </div>
  </header>`;
}

function renderHomePage() {
  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: config.site.title,
      url: absoluteUrl(),
      description: config.site.description,
      hasPart: config.tools.map((tool) => ({
        "@type": "SoftwareApplication",
        name: tool.title,
        url: absoluteUrl(`${tool.slug}/`),
        applicationCategory: categories.get(tool.category)?.name || tool.category
      }))
    },
    null,
    0
  );

  return `<!doctype html>
<html lang="zh-CN">
<head>
${renderMeta({
  title: config.site.title,
  description: config.site.description,
  canonical: absoluteUrl(),
  jsonLd
})}
</head>
<body>
  ${renderHeader()}
  <main class="shell main-stack" id="toolDirectory">
    <section class="stats-row">
      <article>
        <strong>${config.tools.length}</strong>
        <span>个实用工具页</span>
      </article>
      <article>
        <strong>${config.categories.length}</strong>
        <span>个场景分类</span>
      </article>
      <article>
        <strong>${config.site.updateNote}</strong>
        <span>最近更新</span>
      </article>
    </section>
    ${groupedTools.map(renderCategorySection).join("\n")}
    <section class="faq-shell" id="faq">
      <div class="section-head">
        <p class="eyebrow">FAQ</p>
        <h2>工具站使用说明</h2>
      </div>
      <div class="faq-grid">
        ${config.site.faqs
          .map(
            (faq) => `<article class="faq-card"><h3>${escapeHtml(faq.q)}</h3><p>${escapeHtml(faq.a)}</p></article>`
          )
          .join("")}
      </div>
    </section>
  </main>
  <script src="${absoluteUrl("assets/tool.js")}"></script>
</body>
</html>`;
}

function renderCategorySection(category) {
  return `<section class="category-shell" data-group="${escapeHtml(category.id)}" data-keywords="${escapeHtml(
    [category.name, category.summary, ...category.tools.flatMap((tool) => [tool.title, tool.summary, ...(tool.tags || [])])].join(" ")
  )}">
      <div class="section-head">
        <p class="eyebrow">${escapeHtml(category.name)}</p>
        <h2>${escapeHtml(category.summary)}</h2>
      </div>
      <div class="tool-grid">
        ${category.tools.map(renderToolCard).join("")}
      </div>
    </section>`;
}

function renderToolCard(tool) {
  const category = categories.get(tool.category);
  return `<article class="tool-card" data-card data-keywords="${escapeHtml(
    [tool.title, tool.tagline, tool.summary, ...(tool.tags || []), ...(tool.useCases || [])].join(" ")
  )}">
      <div class="tool-head">
        <div class="tool-icon">${escapeHtml(tool.title.slice(0, 1))}</div>
        <div>
          <h3>${escapeHtml(tool.title)}</h3>
          <p class="tagline">${escapeHtml(tool.tagline)}</p>
        </div>
      </div>
      <div class="tag-row">
        ${(tool.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
      <p class="tool-summary">${escapeHtml(tool.summary)}</p>
      <p class="tool-meta">${escapeHtml(category?.name || "")} · ${escapeHtml(tool.outputs.join(" / "))}</p>
      <div class="card-actions">
        <a class="button" href="${absoluteUrl(`${tool.slug}/`)}">进入工具页</a>
        <a class="text-link" href="${escapeHtml(tool.primaryLink)}" target="_blank" rel="noreferrer">直达链接</a>
      </div>
    </article>`;
}

function renderToolPage(tool) {
  const category = categories.get(tool.category);
  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.title,
      url: absoluteUrl(`${tool.slug}/`),
      applicationCategory: category?.name || tool.category,
      description: tool.summary,
      featureList: tool.steps
    },
    null,
    0
  );

  return `<!doctype html>
<html lang="zh-CN">
<head>
${renderMeta({
  title: `${tool.title} - ${config.site.title}`,
  description: tool.summary,
  canonical: absoluteUrl(`${tool.slug}/`),
  jsonLd
})}
</head>
<body>
  <header class="page-top shell">
    <a class="brand" href="${absoluteUrl()}">${escapeHtml(config.site.brand)}</a>
    <nav><a href="${absoluteUrl()}#toolDirectory">返回工具目录</a></nav>
  </header>
  <main class="shell detail-shell">
    <section class="detail-hero">
      <div>
        <p class="eyebrow">${escapeHtml(category?.name || tool.category)}</p>
        <h1>${escapeHtml(tool.title)}</h1>
        <p class="hero-text">${escapeHtml(tool.description)}</p>
        <div class="tag-row">
          ${(tool.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
      <aside class="detail-panel">
        <h2>快速信息</h2>
        <ul>
          <li>适合场景：${escapeHtml(tool.useCases.join("、"))}</li>
          <li>常见输入：${escapeHtml(tool.inputs.join("、"))}</li>
          <li>输出结果：${escapeHtml(tool.outputs.join("、"))}</li>
        </ul>
        <a class="button" href="${escapeHtml(tool.primaryLink)}" target="_blank" rel="noreferrer">${escapeHtml(
          tool.linkLabel
        )}</a>
      </aside>
    </section>
    <section class="detail-grid">
      <article class="detail-card">
        <h2>使用步骤</h2>
        <ol>
          ${tool.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ol>
      </article>
      <article class="detail-card">
        <h2>适合谁用</h2>
        <ul>
          ${tool.useCases.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
      <article class="detail-card">
        <h2>输入与输出</h2>
        <p><strong>输入：</strong>${escapeHtml(tool.inputs.join("、"))}</p>
        <p><strong>输出：</strong>${escapeHtml(tool.outputs.join("、"))}</p>
      </article>
    </section>
    <section class="faq-shell">
      <div class="section-head">
        <p class="eyebrow">FAQ</p>
        <h2>${escapeHtml(tool.title)} 常见问题</h2>
      </div>
      <div class="faq-grid">
        ${tool.faqs
          .map((faq) => `<article class="faq-card"><h3>${escapeHtml(faq.q)}</h3><p>${escapeHtml(faq.a)}</p></article>`)
          .join("")}
      </div>
    </section>
  </main>
</body>
</html>`;
}

function renderRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("sitemap.xml")}\n`;
}

function renderSitemap() {
  const urls = [absoluteUrl(), ...config.tools.map((tool) => absoluteUrl(`${tool.slug}/`))];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`)
    .join("\n")}\n</urlset>\n`;
}

function renderJs() {
  return `const searchInput = document.getElementById("toolSearch");
const chips = [...document.querySelectorAll("[data-filter]")];
const groups = [...document.querySelectorAll("[data-group]")];

let activeFilter = "";

function update() {
  const keyword = (searchInput?.value || "").trim().toLowerCase();
  groups.forEach((group) => {
    const cards = [...group.querySelectorAll("[data-card]")];
    let visible = 0;
    cards.forEach((card) => {
      const matchesKeyword = !keyword || (card.dataset.keywords || "").toLowerCase().includes(keyword);
      const matchesFilter = !activeFilter || group.dataset.group === activeFilter;
      const show = matchesKeyword && matchesFilter;
      card.classList.toggle("hidden", !show);
      if (show) visible += 1;
    });
    group.classList.toggle("hidden", visible === 0);
  });
}

searchInput?.addEventListener("input", update);
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const next = chip.dataset.filter || "";
    activeFilter = activeFilter === next ? "" : next;
    chips.forEach((item) => item.classList.toggle("active", item === chip && activeFilter === next));
    update();
  });
});

update();
`;
}

function renderCss() {
  return `:root {
  --bg: #f4f7fb;
  --card: #ffffff;
  --line: #d9e2ec;
  --ink: #162033;
  --muted: #5f6f86;
  --accent: #4f46e5;
  --accent-soft: #e9e8ff;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif;
  background: linear-gradient(180deg, #eef3ff 0, #f8fbff 240px, #f4f7fb 240px);
  color: var(--ink);
}
a { color: inherit; text-decoration: none; }
.shell { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
.site-header { padding: 24px 0 32px; }
.header-row, .hero-grid, .card-actions, .hero-cta, .tag-row, .stats-row, .header-actions { display: flex; gap: 12px; }
.header-row, .hero-grid { justify-content: space-between; align-items: center; }
.brand { font-size: 20px; font-weight: 800; }
.header-actions { align-items: center; color: var(--muted); flex-wrap: wrap; }
.button {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 44px; padding: 0 18px; border-radius: 14px;
  background: var(--accent); color: #fff; font-weight: 700;
}
.button.ghost { background: var(--accent-soft); color: var(--accent); }
.hero-grid { align-items: stretch; margin-top: 28px; gap: 24px; }
.hero-grid > * { flex: 1; }
.eyebrow { margin: 0 0 12px; color: var(--accent); letter-spacing: 0.12em; font-size: 12px; text-transform: uppercase; font-weight: 800; }
h1, h2, h3 { margin: 0; line-height: 1.15; }
h1 { font-size: clamp(36px, 6vw, 58px); max-width: 700px; }
.hero-text, .tool-summary, .faq-card p, .detail-card p, .detail-card li, .detail-panel li, .tagline, .tool-meta {
  color: var(--muted); line-height: 1.8;
}
.hero-panel, .tool-card, .faq-card, .detail-card, .detail-panel, .stats-row article {
  background: var(--card); border: 1px solid var(--line); border-radius: 24px;
  box-shadow: 0 18px 40px rgba(79, 70, 229, 0.06);
}
.hero-panel { padding: 24px; }
.hero-search input {
  width: 100%; min-height: 54px; border-radius: 16px; border: 1px solid var(--line);
  padding: 0 16px; font-size: 15px; margin: 14px 0 16px;
}
.chip-row, .tag-row { flex-wrap: wrap; }
.chip, .tag-row span {
  border: 1px solid transparent; background: var(--accent-soft); color: var(--accent);
  padding: 8px 12px; border-radius: 999px; font-size: 13px; font-weight: 700;
}
.chip { cursor: pointer; }
.chip.active { border-color: var(--accent); }
.main-stack { display: grid; gap: 28px; padding-bottom: 60px; }
.stats-row { flex-wrap: wrap; }
.stats-row article { flex: 1 1 180px; padding: 18px 20px; display: grid; gap: 8px; }
.stats-row strong { font-size: 28px; }
.section-head { display: grid; gap: 8px; margin-bottom: 18px; }
.category-shell { display: grid; gap: 18px; }
.tool-grid, .faq-grid, .detail-grid { display: grid; gap: 18px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.tool-card, .faq-card, .detail-card { padding: 22px; }
.tool-head { display: grid; grid-template-columns: 56px minmax(0, 1fr); gap: 16px; align-items: center; margin-bottom: 14px; }
.tool-icon {
  width: 56px; height: 56px; border-radius: 18px; background: var(--accent-soft);
  color: var(--accent); display: grid; place-items: center; font-weight: 800; font-size: 26px;
}
.tool-summary {
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; min-height: 86px;
}
.card-actions { justify-content: space-between; align-items: center; margin-top: 18px; flex-wrap: wrap; }
.text-link { color: var(--muted); font-weight: 700; }
.page-top { padding: 24px 0 0; display: flex; justify-content: space-between; align-items: center; }
.detail-shell { display: grid; gap: 24px; padding: 26px 0 60px; }
.detail-hero { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.8fr); gap: 20px; align-items: start; }
.detail-panel { padding: 24px; }
.detail-panel ul { padding-left: 18px; margin: 0 0 20px; }
.detail-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.hidden { display: none !important; }
@media (max-width: 900px) {
  .hero-grid, .detail-hero, .detail-grid, .tool-grid, .faq-grid { grid-template-columns: 1fr; display: grid; }
  .header-row, .header-actions, .hero-cta, .stats-row { flex-direction: column; align-items: stretch; }
}
`;
}
