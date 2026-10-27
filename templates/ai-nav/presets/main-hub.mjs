import { ctx } from "../../_shared/context.mjs";

// Each tool: slug, name, url, region (国内 / 海外), desc (card line), intro (detail page), tags, hot.
const t = (slug, name, url, region, desc, intro, tags, hot = false) => ({ slug, name, url, region, desc, intro, tags, hot });

const categories = [
  {
    slug: "ai-chat",
    name: "AI 对话助手",
    icon: "💬",
    summary: "通用大模型对话产品，适合问答、写作、翻译、总结和日常办公。",
    guide: ["先看是否需要联网搜索和长文档上传", "中文场景重点比较表达自然度和事实准确性", "团队使用要确认数据是否用于训练、能否关闭"],
    tools: [
      t("chatgpt", "ChatGPT", "https://chatgpt.com/", "海外", "OpenAI 推出的通用对话助手，支持写作、分析、识图与联网。", "ChatGPT 是使用最广的通用 AI 助手之一，覆盖写作、编程、数据分析、图像理解和语音对话，适合把它当作日常办公的第一入口。", ["对话", "写作", "多模态"], true),
      t("claude", "Claude", "https://claude.ai/", "海外", "Anthropic 推出的 AI 助手，长文档阅读、写作和编程表现突出。", "Claude 擅长处理长篇材料、结构化写作和代码任务，适合需要细致推理、阅读大量文档或撰写正式内容的场景。", ["对话", "长文档", "编程"], true),
      t("gemini", "Gemini", "https://gemini.google.com/", "海外", "Google 的多模态 AI 助手，与搜索和 Workspace 深度结合。", "Gemini 可以处理文本、图片和文件，并与 Gmail、Docs 等 Google 服务联动，适合已经在 Google 生态中工作的用户。", ["对话", "多模态", "Google"], true),
      t("deepseek", "DeepSeek", "https://chat.deepseek.com/", "国内", "深度求索推出的大模型对话产品，推理与编程能力强。", "DeepSeek 以推理和代码能力见长，支持深度思考模式和联网搜索，中文问答体验好，也提供开放的模型与 API。", ["对话", "推理", "开源模型"], true),
      t("doubao", "豆包", "https://www.doubao.com/", "国内", "字节跳动推出的 AI 助手，覆盖对话、写作、识图和语音。", "豆包提供网页、桌面和手机端，支持写作、翻译、图片理解和语音通话，日常使用门槛低。", ["对话", "语音", "写作"], true),
      t("kimi", "Kimi", "https://www.kimi.com/", "国内", "月之暗面推出的智能助手，擅长长文本阅读与联网搜索。", "Kimi 以长上下文和文件解析著称，适合一次上传多份 PDF、网页或报告后进行总结、对比和提问。", ["对话", "长文本", "搜索"], true),
      t("qianwen", "千问", "https://www.qianwen.com/", "国内", "阿里巴巴推出的 AI 助手（原通义），支持对话、文档解读和音视频总结。", "千问由原通义升级而来，基于通义千问大模型，可以做问答写作、长文档解读和音视频转写总结，适合办公与学习场景。", ["对话", "文档", "阿里"]),
      t("yiyan", "文心一言", "https://yiyan.baidu.com/", "国内", "百度推出的大模型对话产品，中文知识问答与创作。", "文心一言基于百度文心大模型，覆盖知识问答、文案创作和多模态生成，与百度搜索生态结合紧密。", ["对话", "中文", "百度"]),
      t("yuanbao", "腾讯元宝", "https://yuanbao.tencent.com/", "国内", "腾讯推出的 AI 助手，可联网搜索公众号等内容。", "腾讯元宝支持多模型切换和联网搜索，能引用微信公众号等内容源，适合资讯检索和日常问答。", ["对话", "搜索", "腾讯"]),
      t("chatglm", "智谱清言", "https://chatglm.cn/", "国内", "智谱 AI 推出的对话助手，基于 GLM 系列大模型。", "智谱清言支持对话、写作、数据分析和智能体，背后的 GLM 系列模型也有开源版本，适合开发者和办公用户。", ["对话", "智能体", "GLM"]),
      t("grok", "Grok", "https://grok.com/", "海外", "xAI 推出的 AI 助手，可结合 X 平台实时信息。", "Grok 由 xAI 开发，能够结合 X（原 Twitter）上的实时讨论回答问题，适合追踪热点和舆情。", ["对话", "实时信息"]),
      t("copilot", "Microsoft Copilot", "https://copilot.microsoft.com/", "海外", "微软的 AI 助手，集成到 Windows、Edge 和 Office。", "Microsoft Copilot 可以在浏览器、Windows 和 Microsoft 365 中直接使用，适合在微软办公环境中处理文档和邮件。", ["对话", "办公", "微软"])
    ]
  },
  {
    slug: "ai-search",
    name: "AI 搜索",
    icon: "🔍",
    summary: "用大模型总结搜索结果并给出来源引用，适合快速调研。",
    guide: ["优先选择会标注引用来源的产品", "学术调研看是否支持论文库检索", "重要结论务必点开原始来源核对"],
    tools: [
      t("perplexity", "Perplexity", "https://www.perplexity.ai/", "海外", "带引用来源的 AI 搜索引擎，适合快速调研。", "Perplexity 会实时检索网页并在答案中标注来源，支持追问和专题整理，是做信息调研的常用工具。", ["搜索", "引用", "调研"], true),
      t("metaso", "秘塔 AI 搜索", "https://metaso.cn/", "国内", "无广告的中文 AI 搜索，可生成大纲和脑图。", "秘塔 AI 搜索提供简洁、深入、研究等模式，能把搜索结果整理成结构化答案、大纲和脑图，中文资料覆盖较好。", ["搜索", "中文", "脑图"], true),
      t("tiangong", "天工 AI", "https://www.tiangong.cn/", "国内", "昆仑万维推出的 AI 搜索与智能体平台。", "天工 AI 提供 AI 搜索、深度研究和多种智能体能力，适合中文资料检索与报告整理。", ["搜索", "智能体"]),
      t("notebooklm", "NotebookLM", "https://notebooklm.google.com/", "海外", "Google 的资料笔记助手，基于你上传的文档回答问题。", "NotebookLM 只根据你提供的文档、网页和视频作答，并能生成音频概览，适合做学习笔记和项目资料库。", ["笔记", "资料库", "Google"]),
      t("felo", "Felo", "https://felo.ai/", "海外", "多语言 AI 搜索，可一键生成演示文稿和脑图。", "Felo 支持跨语言检索，能把搜索结果整理成脑图或演示文稿，适合需要查阅外文资料的用户。", ["搜索", "多语言"])
    ]
  },
  {
    slug: "ai-writing",
    name: "AI 写作",
    icon: "✍️",
    summary: "文案、润色、翻译和学术写作类工具，适合内容团队和学生。",
    guide: ["营销文案关注模板与品牌语气设置", "学术写作关注引用规范和查重风险", "生成内容需人工审校事实与版权"],
    tools: [
      t("notion-ai", "Notion AI", "https://www.notion.com/product/ai", "海外", "内置在 Notion 中的写作与知识库助手。", "Notion AI 可以在笔记和知识库里直接续写、总结、翻译和问答，适合已经用 Notion 管理文档的团队。", ["写作", "知识库", "协作"], true),
      t("grammarly", "Grammarly", "https://www.grammarly.com/", "海外", "英文语法检查与润色助手，支持浏览器插件。", "Grammarly 能实时检查英文拼写、语法和语气，并给出改写建议，适合写英文邮件、论文和商务文档。", ["英文", "润色", "插件"]),
      t("deepl-write", "DeepL Write", "https://www.deepl.com/write", "海外", "DeepL 推出的写作润色工具，改写自然流畅。", "DeepL Write 专注于改善措辞和句式，支持英文、德文等多种语言，适合在发送前打磨正式文本。", ["润色", "多语言"]),
      t("xiezuocat", "秘塔写作猫", "https://xiezuocat.com/", "国内", "中文写作校对与改写工具，适合公文和新媒体。", "秘塔写作猫提供中文错别字检查、改写润色和 AI 写作，适合公文、报告和新媒体稿件的校对。", ["中文", "校对", "改写"]),
      t("jasper", "Jasper", "https://www.jasper.ai/", "海外", "面向营销团队的 AI 文案平台，支持品牌语气。", "Jasper 提供广告、博客、邮件等营销模板，可设置品牌语气和知识库，适合市场团队批量产出文案。", ["营销", "文案", "团队"]),
      t("copy-ai", "Copy.ai", "https://www.copy.ai/", "海外", "营销与销售文案生成，支持工作流自动化。", "Copy.ai 除了生成文案，还能把调研、写作和分发串成工作流，适合销售和增长团队。", ["营销", "工作流"])
    ]
  },
  {
    slug: "ai-image",
    name: "AI 绘画",
    icon: "🎨",
    summary: "文生图、图生图和图像编辑工具，适合设计、电商和内容配图。",
    guide: ["商用前确认生成图片的版权与授权条款", "电商图重点看抠图、换背景和一致性", "中文提示词支持程度差异很大"],
    tools: [
      t("midjourney", "Midjourney", "https://www.midjourney.com/", "海外", "高质量文生图工具，艺术风格表现出色。", "Midjourney 以画面质感和艺术风格著称，支持网页端创作和风格参考，是插画、概念设计的常用工具。", ["文生图", "艺术", "设计"], true),
      t("jimeng", "即梦 AI", "https://jimeng.jianying.com/", "国内", "字节跳动旗下的 AI 图片与视频创作平台。", "即梦 AI 支持文生图、图生图和 AI 视频，中文提示词理解好，适合短视频配图和创意海报。", ["文生图", "视频", "中文"], true),
      t("ideogram", "Ideogram", "https://ideogram.ai/", "海外", "擅长在图片中准确生成文字的文生图工具。", "Ideogram 对图片内文字排版的还原度高，适合做海报、Logo 草图和带标题的社媒配图。", ["文生图", "文字排版"]),
      t("leonardo", "Leonardo.Ai", "https://leonardo.ai/", "海外", "面向游戏与设计素材的 AI 图像生成平台。", "Leonardo.Ai 提供多种微调模型和画布编辑功能，适合游戏素材、角色设定和产品概念图。", ["文生图", "游戏素材"]),
      t("firefly", "Adobe Firefly", "https://firefly.adobe.com/", "海外", "Adobe 的生成式 AI，可在 Photoshop 中使用。", "Adobe Firefly 与 Photoshop、Illustrator 等软件集成，主打商业使用相对安全的训练数据，适合专业设计流程。", ["文生图", "设计", "Adobe"]),
      t("krea", "Krea", "https://www.krea.ai/", "海外", "实时生成与图像增强工具，支持画面放大。", "Krea 提供实时绘图、图像放大和多模型生成，适合快速迭代视觉草图。", ["实时生成", "放大"]),
      t("liblib", "LiblibAI", "https://www.liblib.art/", "国内", "中文 AI 绘画模型社区，提供在线生图。", "LiblibAI 汇集大量 Stable Diffusion 等模型和 LoRA，可在线生图和训练模型，适合想精细控制风格的用户。", ["模型社区", "在线生图"]),
      t("recraft", "Recraft", "https://www.recraft.ai/", "海外", "可生成矢量图和图标的 AI 设计工具。", "Recraft 能生成可编辑的矢量插画、图标和品牌风格素材，适合设计系统和 UI 配图。", ["矢量", "图标"])
    ]
  },
  {
    slug: "ai-video",
    name: "AI 视频",
    icon: "🎬",
    summary: "文生视频、图生视频、数字人和视频剪辑工具。",
    guide: ["对比时长上限、清晰度和画面一致性", "数字人注意肖像授权和平台规范", "先用短片段试效果再批量生成"],
    tools: [
      t("kling", "可灵 AI", "https://klingai.com/", "国内", "快手推出的视频生成大模型，动作自然。", "可灵 AI 支持文生视频和图生视频，在人物动作和物理效果上表现突出，适合短视频创作。", ["文生视频", "图生视频"], true),
      t("hailuo", "海螺 AI", "https://hailuoai.com/", "国内", "MiniMax 推出的视频与对话产品。", "海螺 AI 提供视频生成、语音和对话能力，视频画面表现力强，适合创意短片。", ["文生视频", "MiniMax"]),
      t("vidu", "Vidu", "https://www.vidu.cn/", "国内", "生数科技推出的视频生成模型，支持参考生视频。", "Vidu 支持多主体参考和角色一致性，适合动画短片和人物类视频创作。", ["文生视频", "角色一致"]),
      t("runway", "Runway", "https://runway.com/", "海外", "专业 AI 视频生成与编辑平台。", "Runway 提供视频生成、运动笔刷、抠像等工具，常用于广告和影视前期创作。", ["视频生成", "剪辑"], true),
      t("pika", "Pika", "https://pika.art/", "海外", "轻量的 AI 视频生成工具，特效玩法丰富。", "Pika 支持文生视频和多种趣味特效，上手简单，适合社交媒体短视频。", ["文生视频", "特效"]),
      t("luma", "Luma Dream Machine", "https://lumalabs.ai/", "海外", "Luma AI 的视频生成工具，画面真实流畅。", "Dream Machine 可根据文字或图片生成镜头运动自然的视频，适合产品展示和创意片段。", ["文生视频", "3D"]),
      t("heygen", "HeyGen", "https://www.heygen.com/", "海外", "AI 数字人视频平台，支持多语言口型同步。", "HeyGen 可以用数字人播报脚本，并把视频翻译成多种语言同时对口型，适合营销和培训视频。", ["数字人", "翻译配音"]),
      t("capcut", "剪映", "https://www.capcut.cn/", "国内", "字节跳动的视频剪辑工具，内置大量 AI 功能。", "剪映提供智能字幕、AI 配音、一键成片等功能，是短视频剪辑的常用工具。", ["剪辑", "字幕", "配音"], true)
    ]
  },
  {
    slug: "ai-audio",
    name: "AI 音频",
    icon: "🎵",
    summary: "AI 作曲、语音合成、配音和语音转文字工具。",
    guide: ["配音关注音色自然度和多语言支持", "音乐生成注意商用授权条款", "会议转写关注说话人区分和导出格式"],
    tools: [
      t("suno", "Suno", "https://suno.com/", "海外", "输入描述即可生成带人声的完整歌曲。", "Suno 能根据歌词或风格描述生成包含旋律、人声和伴奏的歌曲，适合创意音乐和短视频配乐。", ["AI 作曲", "人声"], true),
      t("udio", "Udio", "https://www.udio.com/", "海外", "高保真 AI 音乐生成，支持延展和混音。", "Udio 生成的音乐细节丰富，支持片段延展和重混，适合音乐爱好者做创作草稿。", ["AI 作曲"]),
      t("elevenlabs", "ElevenLabs", "https://elevenlabs.io/", "海外", "高自然度的 AI 语音合成与声音克隆。", "ElevenLabs 提供多语言语音合成、声音克隆和配音翻译，常用于有声书、播客和视频配音。", ["语音合成", "配音"], true),
      t("iflyrec", "讯飞听见", "https://www.iflyrec.com/", "国内", "科大讯飞的语音转文字与会议记录工具。", "讯飞听见支持录音转写、实时字幕和会议纪要，中文识别准确，适合会议与采访整理。", ["语音转文字", "会议"]),
      t("tingwu", "通义听悟", "https://tingwu.aliyun.com/", "国内", "阿里的音视频转写与总结工具。", "通义听悟可以转写音视频、区分发言人并生成要点总结，适合课程、会议和播客整理。", ["转写", "总结"]),
      t("otter", "Otter.ai", "https://otter.ai/", "海外", "英文会议实时转写与纪要助手。", "Otter.ai 能接入 Zoom、Teams 等会议实时转写英文内容并生成摘要，适合跨国团队。", ["英文转写", "会议"])
    ]
  },
  {
    slug: "ai-coding",
    name: "AI 编程",
    icon: "💻",
    summary: "代码补全、AI IDE、编程智能体和应用生成工具。",
    guide: ["先确认支持的编辑器和语言", "企业代码关注隐私策略和私有部署", "生成代码务必经过测试和代码评审"],
    tools: [
      t("cursor", "Cursor", "https://cursor.com/", "海外", "以 AI 为核心的代码编辑器，支持整库理解。", "Cursor 基于 VS Code，提供代码补全、对话改代码和智能体模式，能理解整个代码库后再修改。", ["AI IDE", "补全", "智能体"], true),
      t("claude-code", "Claude Code", "https://claude.com/product/claude-code", "海外", "Anthropic 的编程智能体，可在终端和 IDE 中完成开发任务。", "Claude Code 能阅读代码库、修改文件、运行命令并提交代码，适合把多步骤开发任务交给 AI 完成。", ["编程智能体", "终端"], true),
      t("github-copilot", "GitHub Copilot", "https://github.com/features/copilot", "海外", "GitHub 的 AI 编程助手，支持主流编辑器。", "GitHub Copilot 提供代码补全、对话和代码评审能力，支持 VS Code、JetBrains 等编辑器。", ["补全", "代码评审"], true),
      t("trae", "Trae", "https://www.trae.cn/", "国内", "字节跳动推出的 AI 原生 IDE。", "Trae 提供中文友好的 AI 对话编程和智能体模式，适合国内开发者快速上手 AI 编程。", ["AI IDE", "中文"]),
      t("lingma", "通义灵码", "https://lingma.aliyun.com/", "国内", "阿里云的智能编码助手，支持多种 IDE。", "通义灵码提供代码补全、单元测试生成和代码解释，支持 VS Code 和 JetBrains，适合企业团队。", ["补全", "IDE 插件"]),
      t("v0", "v0", "https://v0.app/", "海外", "Vercel 推出的 AI 应用与界面生成工具。", "v0 可以用自然语言生成 React 界面和完整 Web 应用，并一键部署到 Vercel。", ["界面生成", "前端"]),
      t("bolt", "Bolt.new", "https://bolt.new/", "海外", "在浏览器中用对话生成并运行全栈应用。", "Bolt.new 在浏览器内搭建开发环境，通过对话生成、运行和部署全栈 Web 应用。", ["应用生成", "全栈"]),
      t("replit", "Replit", "https://replit.com/", "海外", "在线编程平台，内置 AI 智能体搭建应用。", "Replit 提供在线 IDE 和 AI 智能体，可以从一句需求开始生成、托管和发布应用。", ["在线 IDE", "部署"])
    ]
  },
  {
    slug: "ai-office",
    name: "AI 办公",
    icon: "📊",
    summary: "AI 生成 PPT、表格处理、思维导图和会议效率工具。",
    guide: ["PPT 工具重点看模板质量和导出格式", "表格分析注意数据隐私", "生成后检查数据和图表是否准确"],
    tools: [
      t("gamma", "Gamma", "https://gamma.app/", "海外", "输入主题即可生成演示文稿、文档和网页。", "Gamma 能根据大纲或文档一键生成排版精美的演示文稿，并支持在线分享和导出 PPT。", ["PPT", "演示"], true),
      t("aippt", "AiPPT", "https://www.aippt.cn/", "国内", "中文 AI 生成 PPT 工具，模板丰富。", "AiPPT 支持输入主题或上传文档生成 PPT，提供大量中文模板，适合工作汇报和课件制作。", ["PPT", "中文模板"]),
      t("wps-ai", "WPS AI", "https://ai.wps.cn/", "国内", "金山办公的 AI 助手，覆盖文字、表格和演示。", "WPS AI 集成在 WPS 中，可以起草文档、处理表格公式、生成 PPT，适合日常办公。", ["文档", "表格", "PPT"], true),
      t("mindshow", "MindShow", "https://www.mindshow.fun/", "国内", "把大纲快速转换为演示文稿的工具。", "MindShow 可以把 Markdown 或大纲内容一键转成 PPT，适合快速出汇报初稿。", ["PPT", "大纲"]),
      t("xmind-ai", "Xmind AI", "https://xmind.ai/", "海外", "AI 辅助生成和扩展思维导图。", "Xmind AI 能根据主题自动生成思维导图并扩展分支，适合头脑风暴和知识梳理。", ["思维导图", "头脑风暴"]),
      t("feishu-ai", "飞书智能伙伴", "https://www.feishu.cn/product/ai", "国内", "飞书内置的 AI 助手，覆盖文档、会议和多维表格。", "飞书智能伙伴可以总结群聊和会议、撰写文档、处理多维表格，适合使用飞书协作的团队。", ["协作", "会议纪要"])
    ]
  },
  {
    slug: "ai-design",
    name: "AI 设计",
    icon: "🖌️",
    summary: "抠图、修图、海报、UI 设计和品牌素材类 AI 工具。",
    guide: ["电商设计关注批量处理能力", "UI 设计关注能否导出可编辑图层", "品牌素材注意字体与图片版权"],
    tools: [
      t("canva", "Canva 可画", "https://www.canva.cn/", "国内", "在线设计平台，内置 AI 生图与排版功能。", "Canva 可画提供海量模板和 AI 设计工具，可快速做海报、社媒图和演示文稿，适合非专业设计人员。", ["在线设计", "模板"], true),
      t("figma", "Figma", "https://www.figma.com/", "海外", "协作式 UI 设计工具，提供 AI 辅助功能。", "Figma 是主流的界面设计与原型工具，内置 AI 功能可以生成界面草稿、重命名图层和改写文案。", ["UI 设计", "协作"]),
      t("removebg", "remove.bg", "https://www.remove.bg/", "海外", "一键自动抠图，去除图片背景。", "remove.bg 可以在几秒内自动去除图片背景，适合证件照、商品图和设计素材处理。", ["抠图", "去背景"]),
      t("photoroom", "Photoroom", "https://www.photoroom.com/", "海外", "电商商品图 AI 编辑，抠图换背景。", "Photoroom 支持批量抠图、生成商品场景背景，适合电商卖家快速制作主图。", ["电商", "商品图"]),
      t("gaoding", "稿定设计", "https://www.gaoding.com/", "国内", "在线平面设计平台，提供 AI 抠图和设计。", "稿定设计提供营销海报、电商图模板以及 AI 抠图、AI 消除等功能，适合运营和电商团队。", ["平面设计", "电商"]),
      t("clipdrop", "Clipdrop", "https://clipdrop.co/", "海外", "图像处理工具集，支持去除杂物、放大和重打光。", "Clipdrop 提供去背景、去除物体、图片放大和重新打光等工具，适合快速修图。", ["修图", "放大"])
    ]
  },
  {
    slug: "ai-agent",
    name: "AI 智能体",
    icon: "🤖",
    summary: "搭建 AI 智能体、工作流和自动化任务的平台。",
    guide: ["先明确要接入的数据源和渠道", "关注插件生态和发布渠道", "复杂流程先用小任务验证稳定性"],
    tools: [
      t("coze", "扣子 Coze", "https://www.coze.cn/", "国内", "字节跳动的 AI 智能体搭建平台，零代码发布。", "扣子提供插件、知识库和工作流，可以零代码搭建智能体并发布到飞书、微信等渠道。", ["智能体", "零代码"], true),
      t("dify", "Dify", "https://dify.ai/", "海外", "开源的大模型应用开发平台，支持私有部署。", "Dify 提供可视化工作流、知识库检索和模型管理，可自托管，适合企业搭建内部 AI 应用。", ["开源", "工作流", "私有部署"], true),
      t("n8n", "n8n", "https://n8n.io/", "海外", "开源工作流自动化工具，可接入 AI 节点。", "n8n 支持连接数百种应用并加入大模型节点，可自托管，适合搭建自动化业务流程。", ["自动化", "开源"]),
      t("manus", "Manus", "https://manus.im/", "海外", "通用 AI 智能体，可自主完成调研与执行任务。", "Manus 能自主规划并执行多步骤任务，例如资料调研、数据整理和生成报告。", ["通用智能体"]),
      t("poe", "Poe", "https://poe.com/", "海外", "聚合多家大模型的对话平台，可创建机器人。", "Poe 在一个界面中提供多家模型，并允许用户创建和分享自定义机器人。", ["多模型", "机器人"])
    ]
  },
  {
    slug: "ai-dev",
    name: "AI 开发平台",
    icon: "🧩",
    summary: "模型社区、API 平台和本地运行大模型的工具。",
    guide: ["对比模型效果、价格和速率限制", "本地部署关注显存和硬件要求", "生产环境注意数据合规与日志"],
    tools: [
      t("huggingface", "Hugging Face", "https://huggingface.co/", "海外", "全球最大的开源模型与数据集社区。", "Hugging Face 托管大量开源模型、数据集和在线 Demo，是查找和试用开源 AI 模型的首选平台。", ["模型社区", "开源"], true),
      t("modelscope", "魔搭社区", "https://www.modelscope.cn/", "国内", "阿里达摩院发起的中文模型开源社区。", "魔搭社区提供大量中文开源模型和在线推理、训练环境，国内访问速度快。", ["模型社区", "中文"]),
      t("anthropic-console", "Claude 开发平台", "https://platform.claude.com/", "海外", "Anthropic 的 API 控制台，接入 Claude 模型。", "在 Claude 开发平台可以创建 API Key、调试提示词并接入 Claude 模型，用于构建自己的 AI 应用。", ["API", "Claude"]),
      t("openai-platform", "OpenAI 开发平台", "https://platform.openai.com/", "海外", "OpenAI 的 API 平台，提供 GPT 等模型接口。", "OpenAI 开发平台提供模型 API、调试工具和用量管理，适合开发者接入 GPT 系列模型。", ["API", "OpenAI"]),
      t("openrouter", "OpenRouter", "https://openrouter.ai/", "海外", "统一接口调用多家大模型的路由平台。", "OpenRouter 用一个 API 调用多家厂商的模型，方便比较价格和效果、切换供应商。", ["API", "多模型"]),
      t("ollama", "Ollama", "https://ollama.com/", "海外", "在本地电脑一键运行开源大模型。", "Ollama 可以用一条命令下载并在本地运行 Llama、Qwen 等开源模型，适合离线使用和隐私敏感场景。", ["本地部署", "开源模型"]),
      t("lmstudio", "LM Studio", "https://lmstudio.ai/", "海外", "图形界面的本地大模型运行工具。", "LM Studio 提供图形界面来下载和运行本地模型，并可开启兼容 OpenAI 的本地接口。", ["本地部署", "桌面应用"])
    ]
  },
  {
    slug: "ai-translate",
    name: "AI 翻译",
    icon: "🌐",
    summary: "文档翻译、网页双语对照和实时翻译工具。",
    guide: ["专业文档关注术语表支持", "网页翻译关注双语对照体验", "敏感文件注意是否上传到云端"],
    tools: [
      t("deepl", "DeepL 翻译", "https://www.deepl.com/translator", "海外", "以译文自然著称的机器翻译工具。", "DeepL 翻译支持文本和文档翻译，译文流畅自然，可设置术语表，适合商务和学术文档。", ["翻译", "文档"], true),
      t("immersive-translate", "沉浸式翻译", "https://immersivetranslate.com/", "海外", "网页与 PDF 双语对照翻译插件。", "沉浸式翻译可以在网页、PDF 和视频字幕中显示双语对照，并支持接入多种大模型翻译。", ["双语对照", "浏览器插件"], true),
      t("youdao", "有道翻译", "https://fanyi.youdao.com/", "国内", "网易有道的翻译工具，支持文档与 AI 润色。", "有道翻译提供文本、文档和图片翻译以及 AI 改写，中文用户使用方便。", ["翻译", "中文"]),
      t("bing-translator", "必应翻译", "https://www.bing.com/translator", "海外", "微软的在线翻译服务，支持百余种语言。", "必应翻译覆盖大量语言，支持文本和语音翻译，适合多语种日常使用。", ["翻译", "多语言"])
    ]
  },
  {
    slug: "ai-learning",
    name: "AI 学习",
    icon: "📚",
    summary: "学习 AI 知识、提示词技巧和大模型课程的资源。",
    guide: ["入门先看官方文档和免费课程", "提示词技巧结合自己的任务练习", "关注模型更新带来的方法变化"],
    tools: [
      t("anthropic-academy", "Anthropic Academy", "https://academy.claude.com/", "海外", "Anthropic 官方的 Claude 使用与开发课程。", "Anthropic Academy 提供使用 Claude 和构建 AI 应用的官方课程与指南，适合从入门到开发进阶。", ["课程", "官方文档"]),
      t("deeplearning-ai", "DeepLearning.AI", "https://www.deeplearning.ai/", "海外", "吴恩达创办的 AI 课程平台，含大量短课程。", "DeepLearning.AI 提供机器学习、大模型应用和提示工程等课程，其中不少短课程可免费学习。", ["课程", "大模型"]),
      t("learnprompting", "Learn Prompting", "https://learnprompting.org/", "海外", "系统的提示词工程学习指南。", "Learn Prompting 从基础到进阶讲解提示词技巧和案例，适合想系统提升提示词能力的用户。", ["提示词", "教程"]),
      t("kaggle", "Kaggle", "https://www.kaggle.com/", "海外", "数据科学竞赛与学习社区，提供免费算力。", "Kaggle 提供数据集、竞赛、免费 Notebook 算力和入门课程，适合动手学习机器学习。", ["数据科学", "竞赛"])
    ]
  }
];

const site = {
  title: `${ctx.brand} AI 工具导航`,
  description: "精选国内外 AI 工具：AI 对话、AI 搜索、AI 写作、AI 绘画、AI 视频、AI 音频、AI 编程、AI 办公、AI 设计、智能体与开发平台，按场景分类，附使用建议。",
  baseUrl: ctx.baseUrl,
  brand: `${ctx.brand}`,
  brandShort: ctx.brandShort,
  tagline: "AI 工具导航",
  heroTitle: "发现好用的 AI 工具",
  heroSubtitle: "按使用场景整理国内外 AI 工具，每个工具都写清楚适合做什么、怎么选。",
  hotKeywords: ["对话", "PPT", "文生图", "文生视频", "编程", "翻译", "配音", "智能体"],
  promo: {
    title: "AI 应用上线需要服务器？",
    body: "部署智能体、模型 API 代理或网站，可以看看海外与香港服务器方案。",
    label: "查看服务器方案",
    href: ctx.leadTarget
  },
  updated: "2026-10"
};

export default { site, categories };
