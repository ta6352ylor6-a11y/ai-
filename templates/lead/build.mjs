import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const configPath = process.env.SITE_FACTORY_CONFIG;
const outputDir = process.env.SITE_FACTORY_OUTPUT_DIR;

if (!configPath || !outputDir) {
  throw new Error("Missing SITE_FACTORY_CONFIG or SITE_FACTORY_OUTPUT_DIR for family-lead.");
}

const { default: config } = await import(pathToFileURL(configPath).href);

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(path.join(outputDir, "assets"), { recursive: true });

writeFile("index.html", renderHomePage());
writeFile("robots.txt", renderRobots());
writeFile("sitemap.xml", renderSitemap());
writeFile(path.join("assets", "lead.css"), renderCss());

for (const offer of config.offers) {
  writeFile(path.join(offer.slug, "index.html"), renderOfferPage(offer));
}

console.log(`Built family-lead site "${config.site.title}" with ${config.offers.length} offer pages.`);

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
  <meta name="robots" content="index,follow">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="stylesheet" href="${absoluteUrl("assets/lead.css")}">
${jsonLd ? `  <script type="application/ld+json">${jsonLd}</script>` : ""}`;
}

function renderHomePage() {
  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: config.site.title,
      url: absoluteUrl(),
      description: config.site.description,
      hasPart: config.offers.map((offer) => ({
        "@type": "WebPage",
        name: offer.title,
        url: absoluteUrl(`${offer.slug}/`)
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
  <div class="masthead">
  <header class="topbar">
    <div class="shell topbar-row">
      <a class="brand" href="${absoluteUrl()}">${escapeHtml(config.site.brand)}</a>
      <nav>
        <a href="#offers">方案页</a>
        <a href="#method">筛选方法</a>
        <a href="#faq">常见问题</a>
      </nav>
      <a class="button ghost" href="${escapeHtml(config.site.primaryCta.href)}">${escapeHtml(config.site.primaryCta.label)}</a>
    </div>
  </header>
    <section class="hero shell">
      <div class="hero-copy">
        <p class="eyebrow">${escapeHtml(config.site.eyebrow)}</p>
        <h1>${escapeHtml(config.site.heroTitle)}</h1>
        <p class="hero-text">${escapeHtml(config.site.heroSubtitle)}</p>
        <div class="button-row">
          <a class="button" href="#offers">${escapeHtml(config.site.primaryCta.label)}</a>
          <a class="button ghost" href="${escapeHtml(config.site.secondaryCta.href)}">${escapeHtml(config.site.secondaryCta.label)}</a>
        </div>
      </div>
      <aside class="hero-panel">
        <h2>挑选逻辑</h2>
        <ul>
          ${config.site.selectionNotes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </aside>
    </section>
  </div>
  <main>
    <section class="shell trust-row">
      ${config.site.trustPoints.map((item) => `<article>${escapeHtml(item)}</article>`).join("")}
    </section>
    <section class="shell offer-shell" id="offers">
      <div class="section-head">
        <p class="eyebrow">方案</p>
        <h2>按业务场景选方案</h2>
      </div>
      <div class="offer-grid">
        ${config.offers.map(renderOfferCard).join("")}
      </div>
    </section>
    <section class="shell method-shell" id="method">
      <div class="section-head">
        <p class="eyebrow">选型方法</p>
        <h2>先判断业务，再看方案</h2>
      </div>
      <div class="method-grid">
        ${config.site.methodSteps.map((step, index) => `<article><span>${index + 1}</span><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.body)}</p></article>`).join("")}
      </div>
    </section>
    <section class="shell faq-shell" id="faq">
      <div class="section-head">
        <p class="eyebrow">常见问题</p>
        <h2>选购前常见问题</h2>
      </div>
      <div class="faq-grid">
        ${config.site.faqs.map((faq) => `<article><h3>${escapeHtml(faq.q)}</h3><p>${escapeHtml(faq.a)}</p></article>`).join("")}
      </div>
    </section>
  </main>
${renderFooter()}
</body>
</html>`;
}

function renderOfferCard(offer) {
  return `<article class="offer-card">
    <p class="offer-audience">${escapeHtml(offer.audience)}</p>
    <h3>${escapeHtml(offer.title)}</h3>
    <p class="offer-summary">${escapeHtml(offer.summary)}</p>
    <ul class="signal-list">
      ${offer.signals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
    <div class="button-row compact">
      <a class="button" href="${absoluteUrl(`${offer.slug}/`)}">查看方案</a>
      <a class="text-link" href="${escapeHtml(offer.cta.href)}">${escapeHtml(offer.cta.label)}</a>
    </div>
  </article>`;
}

function renderOfferPage(offer) {
  const jsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: offer.title,
      url: absoluteUrl(`${offer.slug}/`),
      description: offer.summary,
      audience: { "@type": "Audience", audienceType: offer.audience }
    },
    null,
    0
  );

  return `<!doctype html>
<html lang="zh-CN">
<head>
${renderMeta({
  title: `${offer.title} - ${config.site.title}`,
  description: offer.summary,
  canonical: absoluteUrl(`${offer.slug}/`),
  jsonLd
})}
</head>
<body>
  <div class="masthead">
  <header class="topbar">
    <div class="shell topbar-row">
      <a class="brand" href="${absoluteUrl()}">${escapeHtml(config.site.brand)}</a>
      <nav><a href="${absoluteUrl()}#offers">返回方案目录</a></nav>
      <a class="button ghost" href="${escapeHtml(offer.cta.href)}">${escapeHtml(offer.cta.label)}</a>
    </div>
  </header>
  </div>
  <main class="shell offer-detail">
    <section class="detail-copy">
      <p class="eyebrow">${escapeHtml(offer.audience)}</p>
      <h1>${escapeHtml(offer.title)}</h1>
      <p class="hero-text">${escapeHtml(offer.promise)}</p>
      <div class="compare-grid">
        ${offer.compare.map((item) => `<article><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></article>`).join("")}
      </div>
      ${offer.sections.map((section) => `<section class="content-block"><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></section>`).join("")}
      <section class="content-block">
        <h2>常见判断信号</h2>
        <ul class="signal-list">
          ${offer.signals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
      <section class="content-block">
        <h2>常见问题</h2>
        <div class="faq-grid">
          ${offer.faqs.map((faq) => `<article><h3>${escapeHtml(faq.q)}</h3><p>${escapeHtml(faq.a)}</p></article>`).join("")}
        </div>
      </section>
    </section>
    <aside class="offer-sidebar">
      <div class="sidebar-card">
        <h2>适合对象</h2>
        <p>${escapeHtml(offer.summary)}</p>
      </div>
      <div class="sidebar-card">
        <h2>重点收益</h2>
        <ul class="signal-list">
          ${offer.benefits.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
      <div class="sidebar-card">
        <a class="button" href="${escapeHtml(offer.cta.href)}">${escapeHtml(offer.cta.label)}</a>
      </div>
    </aside>
  </main>
${renderFooter()}
</body>
</html>`;
}

// Links back to the main site at the domain root so every sub-site feeds the hub.
function renderFooter() {
  const home = new URL("/", config.site.baseUrl).toString();
  return `  <footer class="footer shell">
    <p><strong>${escapeHtml(config.site.title)}</strong> · 方案仅供选型参考，具体配置与价格以服务商页面为准。</p>
    <p><a href="${home}">更多 AI 工具与专题 →</a></p>
  </footer>`;
}

function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("sitemap.xml")}\n`;
}

function renderSitemap() {
  const urls = [absoluteUrl(), ...config.offers.map((offer) => absoluteUrl(`${offer.slug}/`))];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`)
    .join("\n")}\n</urlset>\n`;
}

function renderCss() {
  return `:root {
  --bg: #f8f8fb;
  --ink: #101223;
  --muted: #6b7085;
  --accent: #0f172a;
  --accent-2: #4f46e5;
  --card: #ffffff;
  --line: #e3e6f0;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif;
  background: var(--bg);
  color: var(--ink);
}
a { color: inherit; text-decoration: none; }
.shell { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
.masthead { background: #0f172a; color: #fff; }
.topbar { padding: 20px 0; color: #fff; }
.topbar-row, nav, .button-row, .trust-row { display: flex; gap: 14px; align-items: center; }
.topbar-row { justify-content: space-between; }
nav { color: rgba(255,255,255,0.78); flex-wrap: wrap; }
.brand { font-weight: 800; font-size: 20px; }
.button, .text-link {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 44px; padding: 0 18px; border-radius: 999px; font-weight: 700;
}
.button { background: var(--accent-2); color: #fff; }
.button.ghost { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); }
.hero { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr); gap: 24px; align-items: start; padding: 34px 0 48px; color: #fff; }
.eyebrow { margin: 0 0 10px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent-2); font-weight: 800; }
.masthead .eyebrow { color: #a5b4fc; }
h1, h2, h3 { margin: 0; line-height: 1.15; }
h1 { font-size: clamp(30px, 5vw, 50px); max-width: 700px; }
.hero-text, .offer-summary, .faq-grid p, .content-block p, .signal-list, .hero-panel li { color: var(--muted); line-height: 1.8; }
.hero .hero-text { color: rgba(255,255,255,0.78); }
.hero-panel, .offer-card, .method-grid article, .faq-grid article, .sidebar-card, .content-block, .compare-grid article, .trust-row article {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 24px;
  box-shadow: 0 18px 36px rgba(16, 18, 35, 0.08);
}
.hero-panel { padding: 24px; color: var(--ink); }
.hero-panel ul, .signal-list { padding-left: 18px; margin: 0; }
.trust-row { flex-wrap: wrap; padding: 24px 0 18px; }
.trust-row article { flex: 1 1 180px; padding: 18px 20px; }
.offer-shell, .method-shell, .faq-shell { padding: 24px 0; }
.section-head { display: grid; gap: 8px; margin-bottom: 18px; }
.offer-grid, .method-grid, .faq-grid { display: grid; gap: 18px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.offer-card, .method-grid article, .faq-grid article, .content-block, .sidebar-card { padding: 24px; }
.offer-audience { color: var(--accent-2); font-weight: 700; margin: 0 0 8px; }
.compact { justify-content: space-between; flex-wrap: wrap; margin-top: 18px; }
.text-link { padding: 0; min-height: auto; color: var(--muted); }
.method-grid article span, .compare-grid strong { font-size: 28px; font-weight: 800; color: var(--accent-2); }
.offer-detail { display: grid; grid-template-columns: minmax(0, 1.4fr) 320px; gap: 22px; padding: 30px 0 56px; }
.detail-copy { display: grid; gap: 18px; }
.compare-grid { display: grid; gap: 14px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.compare-grid article { padding: 18px; display: grid; gap: 10px; }
.content-block { display: grid; gap: 12px; }
.offer-sidebar { display: grid; gap: 16px; align-content: start; position: sticky; top: 16px; height: fit-content; }
.footer { padding: 24px 0 40px; border-top: 1px solid var(--line); color: var(--muted); font-size: 14px; }
.footer p { margin: 6px 0; }
.footer a { color: var(--accent-2); font-weight: 700; }
@media (max-width: 900px) {
  .hero, .offer-grid, .method-grid, .faq-grid, .offer-detail, .compare-grid { grid-template-columns: 1fr; }
  .topbar-row, nav, .button-row, .trust-row { flex-direction: column; align-items: stretch; }
  .trust-row article { flex: none; }
  .topbar nav { flex-direction: row; gap: 18px; }
}
`;
}
