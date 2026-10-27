import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const families = ["nav", "tool", "lead", "analysis"];

export function loadSiteConfig() {
  return JSON.parse(readFileSync(path.join(projectRoot, "config", "site.json"), "utf8"));
}

export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--")) throw new Error(`Unexpected argument: ${key}`);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      args[key.slice(2)] = true;
    } else {
      args[key.slice(2)] = next;
      i += 1;
    }
  }
  return args;
}

// v1 has no suffix; v2+ publish to a sibling folder so earlier versions stay online.
export function resolveSlug({ prefix, name, version = 1 }) {
  const n = Number(version);
  if (!Number.isInteger(n) || n < 1) throw new Error(`Invalid --version: ${version}`);
  const base = prefix ? `${prefix}-${name}` : name;
  return n === 1 ? base : `${base}-v${String(n).padStart(2, "0")}`;
}

export function listPresets(family) {
  return readdirSync(path.join(projectRoot, "templates", family, "presets"))
    .filter((file) => file.endsWith(".mjs"))
    .map((file) => file.replace(/\.mjs$/, ""))
    .sort();
}

export function walkFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    return statSync(full).isDirectory() ? walkFiles(full) : [full];
  });
}
