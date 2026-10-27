// Verifies that a built site only points at its own publish address.
// Usage: node scripts/check.mjs <dist/slug> <baseUrl>
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { walkFiles } from "./lib.mjs";

const foreignPages = /https?:\/\/(?!ta6352ylor6-a11y\.github\.io)[a-z0-9-]+\.github\.io/gi;

export function checkSite(dir, baseUrl) {
  const problems = [];
  for (const required of ["index.html", "robots.txt", "sitemap.xml"]) {
    if (!existsSync(path.join(dir, required))) problems.push(`missing ${required}`);
  }

  for (const file of walkFiles(dir)) {
    const rel = path.relative(dir, file);
    const text = readFileSync(file, "utf8");

    for (const match of text.match(foreignPages) || []) problems.push(`${rel}: link to another account's site ${match}`);

    if (rel.endsWith(".html") && rel !== "404.html") {
      const expected = new URL(rel.replace(/index\.html$/, ""), baseUrl).toString();
      const canonical = text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      const ogUrl = text.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
      if (canonical !== expected) problems.push(`${rel}: canonical ${canonical} != ${expected}`);
      if (ogUrl !== expected) problems.push(`${rel}: og:url ${ogUrl} != ${expected}`);
    }
  }

  if (existsSync(path.join(dir, "sitemap.xml"))) {
    const locs = [...readFileSync(path.join(dir, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (!locs.length) problems.push("sitemap.xml has no <loc> entries");
    for (const loc of locs) if (!loc.startsWith(baseUrl)) problems.push(`sitemap.xml: ${loc} is outside ${baseUrl}`);
  }
  if (existsSync(path.join(dir, "robots.txt"))) {
    const robots = readFileSync(path.join(dir, "robots.txt"), "utf8");
    const sitemap = robots.match(/Sitemap:\s*(\S+)/i)?.[1];
    if (sitemap !== `${baseUrl}sitemap.xml`) problems.push(`robots.txt: Sitemap ${sitemap} != ${baseUrl}sitemap.xml`);
  }
  return problems;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [dir, baseUrl] = process.argv.slice(2);
  const problems = checkSite(path.resolve(dir), baseUrl);
  console.log(problems.length ? problems.join("\n") : "OK");
  process.exitCode = problems.length ? 1 : 0;
}
