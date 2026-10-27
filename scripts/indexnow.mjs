// Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver...). The key file must be live at
// <pagesBase><key>.txt, which publish.mjs writes into the Pages root.
// Usage: node scripts/indexnow.mjs            (every URL in every published sitemap)
//        node scripts/indexnow.mjs <sitemap-url>...
import { loadSiteConfig } from "./lib.mjs";

export async function submitIndexNow(site, urls) {
  if (!site.indexNowKey || !urls.length) return null;
  const host = new URL(site.pagesBase).host;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: site.indexNowKey,
      keyLocation: new URL(`${site.indexNowKey}.txt`, site.pagesBase).toString(),
      urlList: urls.filter((u) => new URL(u).host === host).slice(0, 10000)
    })
  });
  return res.status;
}

export async function sitemapUrls(sitemapUrl) {
  const res = await fetch(sitemapUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`${sitemapUrl} returned ${res.status}`);
  return [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function allPublishedSitemaps(site) {
  const robots = await (await fetch(new URL("robots.txt", site.pagesBase), { cache: "no-store" })).text();
  return [...robots.matchAll(/^Sitemap:\s*(\S+)/gim)].map((m) => m[1]);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const site = loadSiteConfig();
  const sitemaps = process.argv.length > 2 ? process.argv.slice(2) : await allPublishedSitemaps(site);
  const urls = [...new Set((await Promise.all(sitemaps.map(sitemapUrls))).flat())];
  const status = await submitIndexNow(site, urls);
  // 200 = accepted, 202 = accepted while the key is still being verified.
  console.log(`IndexNow: submitted ${urls.length} URLs from ${sitemaps.length} sitemap(s), HTTP ${status}`);
  if (![200, 202].includes(status)) process.exitCode = 1;
}
