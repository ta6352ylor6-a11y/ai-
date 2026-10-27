// Rewrite only the root analytics.js from config/site.json and push it.
// Use after adding or changing a tracking ID; no site needs to be rebuilt.
// Usage: node scripts/update-analytics.mjs
import { existsSync, realpathSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

import { renderAnalyticsJs } from "./analytics.mjs";
import { loadSiteConfig, projectRoot } from "./lib.mjs";

const site = loadSiteConfig();
const clonePath = path.join(projectRoot, ".publish", site.publishRepo.split("/")[1]);
if (!existsSync(path.join(clonePath, ".git"))) throw new Error(`No Pages checkout at ${clonePath}. Publish a site first.`);
const cloneDir = realpathSync(clonePath);
const git = (...cmd) => execFileSync("git", cmd, { cwd: cloneDir, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();

git("fetch", "origin", "main");
git("checkout", "-B", "main", "origin/main");
writeFileSync(path.join(cloneDir, "analytics.js"), renderAnalyticsJs(site));
git("add", "analytics.js");
if (git("status", "--porcelain")) {
  git("commit", "-m", "update analytics.js");
  git("push", "origin", "main");
  console.log(`Updated ${new URL("analytics.js", site.pagesBase)}`);
} else {
  console.log("analytics.js already up to date.");
}
