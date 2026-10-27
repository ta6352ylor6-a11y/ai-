// Publish one built site to the GitHub Pages repo and record it in SITE-LINK-REGISTRY.md.
// Usage: node scripts/publish.mjs --slug ta6352ylor6-a11y-dev-tools --family nav --preset dev-tools
//        node scripts/publish.mjs --main --family ai-nav --preset main-hub     (main site at the Pages root)
// Sub-sites and main previews (main-v02/...) are never overwritten: build a new --version instead.
// The main site replaces only the root entries it owns, listed in .main-files.json.
import { appendFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

import { MAIN_DIST, loadSiteConfig, parseArgs, projectRoot } from "./lib.mjs";

const OWNED_LIST = ".main-files.json";

const args = parseArgs(process.argv.slice(2));
const site = loadSiteConfig();
const { family, preset } = args;
const isMainRoot = Boolean(args.main);
const slug = isMainRoot ? "" : args.slug;
if ((!isMainRoot && !slug) || !family || !preset) {
  throw new Error("Usage: (--slug <slug> | --main) --family <family> --preset <preset>");
}

const sourceDir = path.join(projectRoot, "dist", slug || MAIN_DIST);
if (!existsSync(path.join(sourceDir, "index.html"))) throw new Error(`Nothing built at ${sourceDir}. Run scripts/build.mjs first.`);

const git = (cwd, ...cmd) => execFileSync("git", cmd, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();

const clonePath = path.join(projectRoot, ".publish", site.publishRepo.split("/")[1]);
if (!existsSync(path.join(clonePath, ".git"))) {
  mkdirSync(path.dirname(clonePath), { recursive: true });
  git(projectRoot, "clone", `https://github.com/${site.publishRepo}.git`, clonePath);
}
// .publish/<repo> may be a symlink to an existing checkout; cpSync needs the real directory.
const cloneDir = realpathSync(clonePath);
// A brand-new Pages repo has no main branch yet.
if (git(cloneDir, "ls-remote", "--heads", "origin", "main")) {
  git(cloneDir, "fetch", "origin", "main");
  git(cloneDir, "checkout", "-B", "main", "origin/main");
} else {
  git(cloneDir, "checkout", "--orphan", "main");
}

const ownedPath = path.join(cloneDir, OWNED_LIST);
const mainOwned = existsSync(ownedPath) ? JSON.parse(readFileSync(ownedPath, "utf8")) : [];

if (isMainRoot) {
  const incoming = readdirSync(sourceDir);
  const clash = incoming.filter((entry) => !mainOwned.includes(entry) && existsSync(path.join(cloneDir, entry)) && entry !== "robots.txt");
  if (clash.length) throw new Error(`Main site would overwrite entries it does not own: ${clash.join(", ")}`);
  for (const entry of mainOwned) rmSync(path.join(cloneDir, entry), { recursive: true, force: true });
  cpSync(sourceDir, cloneDir, { recursive: true });
  writeFileSync(ownedPath, `${JSON.stringify(incoming.sort(), null, 2)}\n`);
} else {
  if (mainOwned.includes(slug)) throw new Error(`${slug} is a path the main site uses. Pick another --name.`);
  const targetDir = path.join(cloneDir, slug);
  if (existsSync(targetDir)) {
    throw new Error(`${slug}/ is already published. Build a new version (--version N) instead of overwriting it.`);
  }
  cpSync(sourceDir, targetDir, { recursive: true });
}

if (!existsSync(path.join(cloneDir, ".nojekyll"))) writeFileSync(path.join(cloneDir, ".nojekyll"), "");
// GitHub Pages reads the custom domain from a root CNAME file.
if (site.customDomain) writeFileSync(path.join(cloneDir, "CNAME"), `${site.customDomain}\n`);
writeRootIndexes();

git(cloneDir, "add", "-A");
if (git(cloneDir, "status", "--porcelain")) {
  git(cloneDir, "commit", "-m", isMainRoot ? "publish main site" : `publish ${slug}`);
  git(cloneDir, "push", "origin", "main");
} else {
  console.error("Nothing changed; skipped the commit.");
}

const url = new URL(slug ? `${slug}/` : "", site.pagesBase).toString();
const registry = path.join(projectRoot, "SITE-LINK-REGISTRY.md");
const date = new Date().toISOString().slice(0, 10);
const label = isMainRoot ? "(主站)" : slug;
if (isMainRoot || !readFileSync(registry, "utf8").includes(`| ${slug} |`)) {
  appendFileSync(registry, `| ${date} | ${label} | ${family} | ${preset} | ${url} | 待确认 |\n`);
}

console.log(url);

// sites.json feeds the main page's sub-site list; robots.txt is only read at the root,
// so it has to point crawlers at every published sitemap.
function writeRootIndexes() {
  const owned = existsSync(ownedPath) ? JSON.parse(readFileSync(ownedPath, "utf8")) : [];
  const subsites = readdirSync(cloneDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith(".") && !owned.includes(d.name))
    .filter((d) => existsSync(path.join(cloneDir, d.name, "index.html")))
    .map((d) => {
      const html = readFileSync(path.join(cloneDir, d.name, "index.html"), "utf8");
      return {
        slug: d.name,
        title: decode(html.match(/<title>([^<]*)<\/title>/)?.[1] || d.name),
        description: decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || ""),
        url: new URL(`${d.name}/`, site.pagesBase).toString(),
        sitemap: existsSync(path.join(cloneDir, d.name, "sitemap.xml")) ? new URL(`${d.name}/sitemap.xml`, site.pagesBase).toString() : null
      };
    })
    .filter((s) => !/^main-v\d+$/.test(s.slug));

  if (!owned.length) return;

  writeFileSync(
    path.join(cloneDir, "sites.json"),
    `${JSON.stringify(subsites.map(({ title, description, url: siteUrl }) => ({ title, description, url: siteUrl })), null, 2)}\n`
  );
  const sitemaps = [new URL("sitemap.xml", site.pagesBase).toString(), ...subsites.map((s) => s.sitemap).filter(Boolean)];
  writeFileSync(path.join(cloneDir, "robots.txt"), `User-agent: *\nAllow: /\n\n${sitemaps.map((s) => `Sitemap: ${s}`).join("\n")}\n`);
}

function decode(text) {
  return text.replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
}
