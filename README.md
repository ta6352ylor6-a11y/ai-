# ai-

ai导航站：手动驱动的静态站生成与发布工厂。一条命令只生成并发布一个站，发布到 `https://ta6352ylor6-a11y.github.io/<slug>/`。

## 目录

- `config/site.json`：账号、发布仓库、发布地址、slug 前缀、品牌名、引流目标（`https://www.1bgp.com/`）
- `templates/<family>/build.mjs`：模板（ai-nav AI 工具导航 / nav 导航站 / tool 工具站 / lead 引流站 / analysis 分析站），CSS 内嵌在模板里
- `templates/<family>/presets/*.mjs`：站点内容预设；网址、品牌都从 `templates/_shared/context.mjs` 读取，不写死
- `scripts/build.mjs`：构建一个站到 `dist/<slug>/`，构建后自动检查
- `scripts/check.mjs`：检查 canonical、og:url、sitemap、robots 都指向当前发布地址，且没有其他账号的链接
- `scripts/publish.mjs`：把一个站发布到 Pages 仓库的子目录，不覆盖已有目录，并写入 `SITE-LINK-REGISTRY.md`
- `docs/TEMPLATES.md`：模板与 preset 清单
- `docs/REFERENCES.md`：导航站设计参考

## 用法

```bash
# 构建（v1 无后缀，v2 起为 <slug>-v02）
node scripts/build.mjs --family nav --preset dev-tools
node scripts/build.mjs --family nav --preset dev-tools --version 2

# 主站：发布到根目录；新版本先预览到 main-v02/
node scripts/build.mjs --family ai-nav --preset main-hub --main
node scripts/publish.mjs --main --family ai-nav --preset main-hub

# 发布这一个站
node scripts/publish.mjs --slug ta6352ylor6-a11y-dev-tools --family nav --preset dev-tools
```
