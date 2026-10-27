// Per-build values injected by scripts/build.mjs. Presets read these instead of hardcoding URLs or brand names.
function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Build sites with scripts/build.mjs instead of calling a template directly.`);
  }
  return value;
}

export const ctx = {
  baseUrl: required("SITE_BASE_URL"),
  brand: required("SITE_BRAND"),
  brandShort: required("SITE_BRAND_SHORT"),
  leadTarget: required("SITE_LEAD_TARGET")
};
