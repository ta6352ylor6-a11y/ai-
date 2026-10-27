import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const configPath = process.env.SITE_FACTORY_CONFIG;
const outputDir = process.env.SITE_FACTORY_OUTPUT_DIR;

if (!configPath || !outputDir) {
  throw new Error("Missing SITE_FACTORY_CONFIG or SITE_FACTORY_OUTPUT_DIR for family-analysis.");
}

const { default: config } = await import(pathToFileURL(configPath).href);

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(path.join(outputDir, "assets"), { recursive: true });

writeFile("index.html", renderHomePage());
writeFile("robots.txt", renderRobots());
writeFile("sitemap.xml", renderSitemap());
writeFile(path.join("assets", "analysis.css"), renderCss());

for (const report of config.reports) {
  writeFile(path.join(report.slug, "index.html"), renderReportPage(report));
}

console.log(`Built family-analysis site "${config.site.title}" with ${config.reports.length} reports.`);

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

function meta({ title, description, canonical, jsonLd = "" }) {
  return `  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="stylesheet" href="${absoluteUrl("assets/analysis.css")}">
${jsonLd ? `  <script type="application/ld+json">${jsonLd}</script>` : ""}`;
}

function renderHomePage() {
  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: config.site.title,
      url: absoluteUrl(),
      description: config.site.description
    },
    null,
    0
  );

  return `<!doctype html>
<html lang="zh-CN">
<head>
${meta({
  title: config.site.title,
  description: config.site.description,
  canonical: absoluteUrl(),
  jsonLd
})}
</head>
<body>
  <header class="hero">
    <div class="shell hero-grid">
      <div>
        <p class="eyebrow">${escapeHtml(config.site.eyebrow)}</p>
        <h1>${escapeHtml(config.site.heroTitle)}</h1>
        <p class="hero-text">${escapeHtml(config.site.heroSubtitle)}</p>
      </div>
      <aside class="hero-note">
        <h2>写法说明</h2>
        <ul>
          ${config.site.editorialNotes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </aside>
    </div>
  </header>
  <main class="shell analysis-home">
    <section class="lead-block">
      <h2>${escapeHtml(config.site.leadTitle)}</h2>
      <p>${escapeHtml(config.site.leadBody)}</p>
    </section>
    <section class="report-list">
      ${config.reports.map(renderReportCard).join("")}
    </section>
  </main>
</body>
</html>`;
}

function renderReportCard(report) {
  return `<article class="report-card">
    <p class="report-meta">${escapeHtml(report.kicker)}</p>
    <h2><a href="${absoluteUrl(`${report.slug}/`)}">${escapeHtml(report.title)}</a></h2>
    <p class="summary">${escapeHtml(report.summary)}</p>
    <div class="tag-row">
      ${(report.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>
    <ul class="bullet-list">
      ${(report.bullets || []).slice(0, 3).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  </article>`;
}

function renderReportPage(report) {
  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: report.title,
      description: report.summary,
      url: absoluteUrl(`${report.slug}/`)
    },
    null,
    0
  );

  return `<!doctype html>
<html lang="zh-CN">
<head>
${meta({
  title: `${report.title} - ${config.site.title}`,
  description: report.summary,
  canonical: absoluteUrl(`${report.slug}/`),
  jsonLd
})}
</head>
<body>
  <header class="article-top shell">
    <a class="brand" href="${absoluteUrl()}">${escapeHtml(config.site.brand)}</a>
    <a class="back-link" href="${absoluteUrl()}">返回简报首页</a>
  </header>
  <main class="shell article-layout">
    <article class="article-main">
      <p class="eyebrow">${escapeHtml(report.kicker)}</p>
      <h1>${escapeHtml(report.title)}</h1>
      <p class="article-summary">${escapeHtml(report.thesis)}</p>
      <div class="metric-grid">
        ${report.metrics.map((metric) => `<article><strong>${escapeHtml(metric.value)}</strong><span>${escapeHtml(metric.label)}</span><p>${escapeHtml(metric.note)}</p></article>`).join("")}
      </div>
      ${report.sections.map((section) => `<section class="section-block" id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></section>`).join("")}
      <section class="section-block">
        <h2>要点摘要</h2>
        <ul class="bullet-list">
          ${report.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
      <section class="section-block">
        <h2>常见问题</h2>
        <div class="faq-list">
          ${report.faqs.map((faq) => `<article><h3>${escapeHtml(faq.q)}</h3><p>${escapeHtml(faq.a)}</p></article>`).join("")}
        </div>
      </section>
    </article>
    <aside class="article-aside">
      <div class="aside-card">
        <h2>目录</h2>
        <ul>
          ${report.sections.map((section) => `<li><a href="#${escapeHtml(section.id)}">${escapeHtml(section.title)}</a></li>`).join("")}
        </ul>
      </div>
      <div class="aside-card">
        <h2>标签</h2>
        <div class="tag-row">
          ${(report.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
    </aside>
  </main>
</body>
</html>`;
}

function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("sitemap.xml")}\n`;
}

function renderSitemap() {
  const urls = [absoluteUrl(), ...config.reports.map((report) => absoluteUrl(`${report.slug}/`))];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`)
    .join("\n")}\n</urlset>\n`;
}

function renderCss() {
  return `:root {
  --bg: #0b1020;
  --panel: #131a2d;
  --panel-soft: #1a2238;
  --line: #2a3553;
  --ink: #eef2ff;
  --muted: #a8b3d1;
  --accent: #8b5cf6;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif;
  background: radial-gradient(circle at top left, #1d2742 0, #0b1020 35%, #0b1020 100%);
  color: var(--ink);
}
a { color: inherit; text-decoration: none; }
.shell { width: min(1080px, calc(100% - 32px)); margin: 0 auto; }
.hero { padding: 34px 0 24px; }
.hero-grid, .article-layout { display: grid; gap: 22px; grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr); }
.eyebrow { margin: 0 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: #a78bfa; font-weight: 800; }
h1, h2, h3 { margin: 0; line-height: 1.15; }
h1 { font-size: clamp(36px, 6vw, 56px); max-width: 720px; }
.hero-text, .lead-block p, .summary, .article-summary, .section-block p, .metric-grid p, .faq-list p, .aside-card li, .hero-note li, .bullet-list { color: var(--muted); line-height: 1.8; }
.hero-note, .lead-block, .report-card, .metric-grid article, .section-block, .aside-card, .faq-list article {
  background: rgba(19, 26, 45, 0.88);
  border: 1px solid var(--line);
  border-radius: 24px;
  backdrop-filter: blur(10px);
}
.hero-note, .lead-block, .report-card, .section-block, .aside-card, .faq-list article { padding: 24px; }
.hero-note ul, .aside-card ul, .bullet-list { padding-left: 18px; }
.analysis-home { display: grid; gap: 20px; padding: 12px 0 56px; }
.report-list, .metric-grid, .faq-list { display: grid; gap: 18px; }
.report-card h2 { margin: 6px 0 10px; }
.report-meta, .back-link { color: #a78bfa; font-weight: 700; }
.tag-row { display: flex; gap: 10px; flex-wrap: wrap; margin: 12px 0 6px; }
.tag-row span {
  padding: 7px 12px; border-radius: 999px; background: rgba(139, 92, 246, 0.16);
  color: #c4b5fd; font-size: 13px; font-weight: 700;
}
.article-top {
  display: flex; justify-content: space-between; align-items: center;
  padding: 24px 0 0;
}
.brand { font-weight: 800; font-size: 20px; }
.article-layout { align-items: start; padding: 24px 0 60px; }
.article-main, .article-aside { display: grid; gap: 18px; }
.metric-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.metric-grid article strong { font-size: 26px; color: #c4b5fd; display: block; margin-bottom: 10px; }
.section-block { display: grid; gap: 10px; }
@media (max-width: 900px) {
  .hero-grid, .article-layout, .metric-grid { grid-template-columns: 1fr; }
  .article-top { flex-direction: column; align-items: stretch; gap: 10px; }
}
`;
}
