// Build exactly one site into dist/<slug>/.
// Usage: node scripts/build.mjs --family nav --preset dev-tools [--name dev-tools] [--version 2]
import { execFileSync } from "node:child_process";
import path from "node:path";

import { checkSite } from "./check.mjs";
import { families, listPresets, loadSiteConfig, parseArgs, projectRoot, resolveSlug } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const site = loadSiteConfig();

if (!families.includes(args.family)) {
  throw new Error(`--family must be one of: ${families.join(", ")}`);
}
const presets = listPresets(args.family);
if (!presets.includes(args.preset)) {
  throw new Error(`--preset for ${args.family} must be one of: ${presets.join(", ")}`);
}

const slug = resolveSlug({ prefix: site.slugPrefix, name: args.name || args.preset, version: args.version || 1 });
const baseUrl = new URL(`${slug}/`, site.pagesBase).toString();
const outputDir = path.join(projectRoot, "dist", slug);

execFileSync("node", [path.join(projectRoot, "templates", args.family, "build.mjs")], {
  cwd: projectRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    SITE_FACTORY_CONFIG: path.join(projectRoot, "templates", args.family, "presets", `${args.preset}.mjs`),
    SITE_FACTORY_OUTPUT_DIR: outputDir,
    SITE_BASE_URL: baseUrl,
    SITE_BRAND: site.brand,
    SITE_BRAND_SHORT: site.brandShort,
    SITE_LEAD_TARGET: site.leadTarget
  }
});

const problems = checkSite(outputDir, baseUrl);
if (problems.length) {
  console.error(problems.map((p) => `  - ${p}`).join("\n"));
  throw new Error(`Build check failed for ${slug} (${problems.length} problems).`);
}

console.log(JSON.stringify({ slug, family: args.family, preset: args.preset, baseUrl, outputDir }, null, 2));
