// Publish one built site as a subfolder of the GitHub Pages repo and record it in SITE-LINK-REGISTRY.md.
// Usage: node scripts/publish.mjs --slug ta6352ylor6-a11y-dev-tools --family nav --preset dev-tools
// Refuses to overwrite an existing folder: publish a new version (--version 2 at build time) instead.
import { appendFileSync, cpSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

import { loadSiteConfig, parseArgs, projectRoot } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const site = loadSiteConfig();
const { slug, family, preset } = args;
if (!slug || !family || !preset) throw new Error("Usage: --slug <slug> --family <family> --preset <preset>");

const sourceDir = path.join(projectRoot, "dist", slug);
if (!existsSync(path.join(sourceDir, "index.html"))) throw new Error(`Nothing built at ${sourceDir}. Run scripts/build.mjs first.`);

const git = (cwd, ...cmd) => execFileSync("git", cmd, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();

const cloneDir = path.join(projectRoot, ".publish", site.publishRepo.split("/")[1]);
if (existsSync(path.join(cloneDir, ".git"))) {
  git(cloneDir, "pull", "--ff-only", "origin", "main");
} else {
  mkdirSync(path.dirname(cloneDir), { recursive: true });
  git(projectRoot, "clone", `https://github.com/${site.publishRepo}.git`, cloneDir);
}

const targetDir = path.join(cloneDir, slug);
if (existsSync(targetDir)) {
  throw new Error(`${slug}/ is already published. Build a new version (--version N) instead of overwriting it.`);
}

cpSync(sourceDir, targetDir, { recursive: true });
const nojekyll = path.join(cloneDir, ".nojekyll");
if (!existsSync(nojekyll)) appendFileSync(nojekyll, "");

git(cloneDir, "add", "-A");
git(cloneDir, "commit", "-m", `publish ${slug}`);
git(cloneDir, "push", "origin", "HEAD:main");

const url = new URL(`${slug}/`, site.pagesBase).toString();
const registry = path.join(projectRoot, "SITE-LINK-REGISTRY.md");
const date = new Date().toISOString().slice(0, 10);
if (!readFileSync(registry, "utf8").includes(`| ${slug} |`)) {
  appendFileSync(registry, `| ${date} | ${slug} | ${family} | ${preset} | ${url} | 待确认 |\n`);
}

console.log(url);
