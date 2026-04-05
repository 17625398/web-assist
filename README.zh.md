# 网智助手 (Web Assist)

网智助手是一个强大的浏览器扩展，让您可以使用本地运行的 AI 模型来辅助您的网页浏览。它提供了一个直观的网页界面，让您可以轻松地与您的 AI 模型进行交互，而无需离开浏览器。

## 功能特点

- 🤖 **本地 AI 模型集成** - 支持 Ollama、OpenAI 兼容 API 等多种本地 AI 模型
- 🌐 **网页聊天** - 与当前网页内容进行智能对话
- 📝 **Copilot 功能** - 选择文本并执行 AI 驱动的操作，如总结、解释、翻译等
- 🔍 **互联网搜索** - 集成多种搜索引擎，获取最新信息
- 📚 **知识库** - 上传文档并与文档内容进行对话
- 🖼️ **视觉能力** - 分析网页截图，理解视觉内容
- 🎙️ **语音功能** - 语音转文本和文本转语音
- 🔧 **MCP 工具集成** - 连接外部工具，扩展 AI 能力
- 🤖 **网页自动化** - 通过 OpenCLI 和 Page-Agent 实现网页自动化操作

## 系统要求

- **浏览器**：Chrome、Firefox、Edge 等现代浏览器
- **Node.js**：>= 20.0.0（仅开发环境需要）
- **本地 AI 模型**：推荐使用 Ollama 或其他兼容的本地 AI 模型

## 安装方法

### 从浏览器扩展商店安装

- **Chrome Web Store**：[点击安装](https://chromewebstore.google.com/detail/page-assist/jfgfiigpkhlkbnfnbobbkinehhfdhndo)
- **Firefox Add-ons**：[点击安装](https://addons.mozilla.org/en-US/firefox/addon/page-assist/)
- **Edge Add-ons**：[点击安装](https://microsoftedge.microsoft.com/addons/detail/page-assist-a-web-ui-fo/ogkogooadflifpmmidmhjedogicnhooa)

### 从源码构建

1. 克隆仓库：
   ```bash
   git clone https://github.com/n4ze3m/page-assist.git
   cd page-assist
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 构建扩展：
   ```bash
   npm run build:chrome  # 构建 Chrome 版本
   # 或
   npm run build:firefox  # 构建 Firefox 版本
   # 或
   npm run build:edge  # 构建 Edge 版本
   ```

4. 加载扩展：
   - Chrome/Edge：打开 `chrome://extensions`，启用开发者模式，点击 "加载已解压的扩展程序"，选择 `build/chrome-mv3` 目录
   - Firefox：打开 `about:debugging`，点击 "此 Firefox"，点击 "临时载入附加组件"，选择 `build/firefox-mv2/manifest.json` 文件

## 快速开始

1. **安装扩展**：从浏览器扩展商店或源码构建安装

2. **配置 AI 模型**：
   - 打开扩展设置
   - 选择您的 AI 模型提供商（Ollama、OpenAI 兼容 API 等）
   - 配置模型参数

3. **使用扩展**：
   - 点击浏览器工具栏中的网智助手图标，打开 Web UI
   - 或使用快捷键 `Ctrl+Shift+Y` 打开侧边栏
   - 开始与您的 AI 模型对话

## 网页自动化功能

网智助手集成了 OpenCLI 和 Page-Agent，提供强大的网页自动化能力：

### OpenCLI

OpenCLI 允许您通过命令行控制网页，支持以下操作：
- 打开网页
- 点击元素
- 输入文本
- 提取内容
- 截图

### Page-Agent

Page-Agent 允许您通过自然语言命令控制网页，无需编写代码。

### 使用方法

1. 在扩展设置中启用网页自动化功能
2. 配置 Page-Agent 的 LLM 模型
3. 在聊天界面中使用网页自动化工具

## 高级功能

### 知识库

1. 打开扩展设置 > 管理知识库
2. 点击 "添加新知识" 上传文档
3. 处理完成后，在聊天界面中选择知识库
4. 开始与文档内容对话

### 互联网搜索

1. 在聊天界面中启用 "搜索网络" 开关
2. 输入您的问题
3. 网智助手会搜索网络并基于搜索结果回答您的问题

### Copilot

1. 在网页中选择文本
2. 右键单击，选择 "Page Assist" 上下文菜单
3. 选择您想要执行的操作（总结、解释、翻译等）

## 配置选项

网智助手提供了丰富的配置选项，您可以根据自己的需求进行调整：

- **一般设置**：语言、主题、界面设置等
- **模型设置**：模型选择、参数调整等
- **RAG 设置**：知识库配置、嵌入模型等
- **搜索设置**：搜索引擎选择、搜索结果数量等
- **网页自动化设置**：OpenCLI 和 Page-Agent 配置

## 常见问题

### Q: 如何解决 Ollama 连接问题？

A: 请参考 [Ollama 连接问题](/connection-issue.md) 指南。

### Q: 如何使用自定义 OpenAI 兼容 API？

A: 打开扩展设置 > OpenAI 兼容 API，添加您的 API 配置。

### Q: 如何自托管页面共享服务？

A: 请参考 [页面共享](/features/page-share.md) 文档。

## 贡献

我们欢迎社区贡献！如果您有任何建议或改进，请在 GitHub 仓库中打开 issue 或提交 pull request。

## 许可证

MIT License

## 鸣谢

- [Page Assist](https://github.com/n4ze3m/page-assist) - 基础项目框架，由 n4ze3m 开发
- [Ollama](https://ollama.com) - 本地 AI 模型运行时
- [OpenCLI](https://github.com/jackwener/opencli) - 网页自动化工具
- [Page-Agent](https://github.com/alibaba/page-agent) - 自然语言网页控制
- 所有贡献者和支持者

## 支持

如果您喜欢网智助手，请考虑通过以下方式支持项目：

- 在 GitHub 上给项目加星 ⭐
- 在浏览器扩展商店中留下好评
- 通过 [Ko-fi](https://ko-fi.com/n4ze3m) 或 [GitHub Sponsors](https://github.com/sponsors/n4ze3m) 提供资金支持

---

**网智助手** - 让本地 AI 模型成为您的网页浏览助手！