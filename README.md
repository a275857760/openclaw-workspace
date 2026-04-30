# openclaw-workspace

OpenClaw 工作区模板 — 配置文件、采集脚本、实用技能包。

> ✅ **无个人信息** — 所有 Token 已清空，USER.md 为空白模板，可直接使用

---

## 📁 目录结构

```
old/
├── SOUL.md           Agent 灵魂 & 行为准则
├── USER.md           用户信息（需填写）
├── AGENTS.md         工作区说明 & 记忆规则
├── IDENTITY.md       Agent 身份模板
├── TOOLS.md          工具配置（Token 已清空）
├── BOOTSTRAP.md      首次启动脚本
├── HEARTBEAT.md      定期后台任务模板
└── scripts/          12个数据采集脚本

skills/               技能包（开箱即用）
├── mental-health-assistant/   专业心理健康助手
├── 技能查找/                     技能搜索工具
└── 技能中心/                     技能管理策略
```

---

## 🧠 技能清单

### ✅ 已在仓库中（可直接用）

| 技能名 | 说明 | 触发词 |
|--------|------|--------|
| `mental-health-assistant` | 专业心理健康支持，含PHQ-9/GAD-7量表、CBT技术、危机干预、放松冥想 | 心理、焦虑、抑郁、压力、失眠、倾诉、想聊聊 |
| `技能查找` | 技能搜索工具，优先 skillhub | 找技能、安装技能、find-skill、install skill |
| `技能中心` | 技能管理策略，skillhub 优先、clawhub 兜底 | 技能、插件、能力扩展 |

### 🔒 需要自行下载

| 技能名 | 来源 | 安装命令 |
|--------|------|----------|
| `天气顾问` | SkillHub | `skillhub install 天气顾问` |
| `浏览器自动化` | SkillHub | `skillhub install 浏览器自动化` |
| `PDF处理` | SkillHub | `skillhub install PDF处理` |
| `Word文档` | SkillHub | `skillhub install Word文档` |
| `Excel表格` | SkillHub | `skillhub install Excel表格` |
| `在线搜索` | SkillHub | `skillhub install 在线搜索` |
| `新闻摘要` | SkillHub | `skillhub install 新闻摘要` |
| `定时任务` | SkillHub | `skillhub install 定时任务` |
| `笔记知识库` | SkillHub | `skillhub install 笔记知识库` |
| `深度讲解` | SkillHub | `skillhub install 深度讲解` |
| `学习打卡` | SkillHub | `skillhub install 学习打卡` |
| `GitHub集成` | SkillHub | `skillhub install GitHub集成` |
| `腾讯文档` | SkillHub | `skillhub install 腾讯文档` |
| `邮箱收发` | SkillHub | `skillhub install 邮箱收发` |
| `SlackGIF` | SkillHub | `skillhub install SlackGIF` |
| `前端设计` | SkillHub | `skillhub install 前端设计` |
| `网页构建器` | SkillHub | `skillhub install 网页构建器` |
| `Web测试` | SkillHub | `skillhub install Web测试` |
| `GUI自动化` | SkillHub | `skillhub install GUI自动化` |
| `环境配置` | SkillHub | `skillhub install 环境配置` |
| `企业微信` | SkillHub | `skillhub install 企业微信` |
| `知识框架` | SkillHub | `skillhub install 知识框架` |
| `主题工厂` | SkillHub | `skillhub install 主题工厂` |
| `内容工厂` | SkillHub | `skillhub install 内容工厂` |
| `自我提升` | SkillHub | `skillhub install 自我提升` |
| `金融数据搜索` | SkillHub | `skillhub install 金融数据搜索` |
| `腾讯问卷` | SkillHub | `skillhub install 腾讯问卷` |
| `金山文档` | SkillHub | `skillhub install 金山文档` |
| `营养顾问` | SkillHub | `skillhub install 营养顾问` |
| `科技新闻` | SkillHub | `skillhub install 科技新闻` |
| `文件整理` | SkillHub | `skillhub install 文件整理` |
| `文本文件` | SkillHub | `skillhub install 文本文件` |
| `云端备份` | SkillHub | `skillhub install 云端备份` |
| `微云网盘` | SkillHub | `skillhub install 微云网盘` |
| `技能创建器` | SkillHub | `skillhub install 技能创建器` |
| `技能审查` | SkillHub | `skillhub install 技能审查` |
| `系统规则` | SkillHub | `skillhub install 系统规则` |
| `画布设计` | SkillHub | `skillhub install 画布设计` |
| `睡眠顾问` | SkillHub | `skillhub install night-owl-shrimp` |
| `MBTI配对` | SkillHub | `skillhub install mbti-matcher` |
| `协作文档(腾讯)` | SkillHub | `skillhub install youdaonote` |

> 💡 **提示**：运行 `skillhub search <关键词>` 可搜索更多技能

---

## 🚀 快速部署

1. 下载 Release 的 **Source code (zip)**
2. `old/` 下的所有文件 → 复制到你的 OpenClaw workspace
3. `skills/` 下的所有目录 → 复制到 workspace `skills/` 目录
4. 填写 `old/USER.md` 和 `old/TOOLS.md`
5. 重启 OpenClaw

---

## 📡 部署脚本（一键安装 Skills）

```bash
# 示例：安装常用 Skills（mental-health-assistant 已在仓库中，无需重复安装）
skillhub install 天气顾问
skillhub install 在线搜索
skillhub install 定时任务
skillhub install 浏览器自动化
skillhub install PDF处理
# ... 按需添加，运行 skillhub search <关键词> 搜索更多
```

---

## 📝 scripts/ 采集脚本说明

| 脚本 | 用途 |
|------|------|
| `scrape_page*.js` | 通用页面采集 |
| `scrape_search*.js` | 搜索结果采集 |
| `scrape_api.js` | API 接口采集 |
| `scrape_bili*.js` | B站视频/专栏采集 |
| `scrape_upload*.js` | 上传/发布脚本 |

> ⚠️ 使用前请填写 `old/TOOLS.md` 中的相关凭证

---

## 📄 License

MIT — 可自由使用、修改、分发
