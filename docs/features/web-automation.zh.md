# 使用 OpenCLI 和 Page-Agent 进行网页自动化

Page Assist 现在集成了 OpenCLI 和 Page-Agent，提供强大的网页自动化功能。这使 AI 代理能够控制网页界面，执行复杂的浏览器操作，并通过自然语言与网站进行交互。

## 概述

该集成结合了两个强大的工具：

- **OpenCLI**：一个命令行工具，可将任何网站、Electron 应用或本地工具转换为命令行界面。它提供浏览器自动化功能，如点击、输入、提取内容和截图。

- **Page-Agent**：一个在网页中运行的 GUI 代理，允许您通过自然语言命令控制网页界面。

## 设置

### OpenCLI 设置

1. 全局安装 OpenCLI：
   ```bash
   npm install -g @jackwener/opencli
   ```

2. 安装 OpenCLI 浏览器桥接扩展：
   - 从 [GitHub Releases](https://github.com/jackwener/opencli/releases) 页面下载最新的 `opencli-extension.zip`
   - 解压缩文件并在 Chrome/Chromium 中打开 `chrome://extensions`
   - 启用开发者模式（右上角开关）
   - 点击 "加载已解压的扩展程序" 并选择解压后的文件夹

3. 验证 OpenCLI 安装：
   ```bash
   opencli doctor
   ```

### Page-Agent 设置

Page-Agent 作为 Page Assist 的依赖项自动安装。您需要使用 LLM 设置配置它：

1. 在 Page Assist 设置中，导航到 "网页自动化" 部分
2. 启用 Page-Agent
3. 输入您的 LLM 模型详细信息：
   - 模型名称（例如，`qwen3.5-plus`）
   - API 基础 URL（例如，`https://dashscope.aliyuncs.com/compatible-mode/v1`）
   - API 密钥

## 使用

### 网页自动化工具

Page Assist 提供了一组统一的网页自动化工具，结合了 OpenCLI 和 Page-Agent 的功能：

#### `web_automation_open`

在浏览器中打开网页。

**参数：**
- `url`：要打开的网页 URL

**示例：**
```javascript
await agent.executeTool('web_automation_open', {
  url: 'https://www.example.com'
});
```

#### `web_automation_click`

点击网页上的元素。

**参数：**
- `selector`：要点击的元素的 CSS 选择器

**示例：**
```javascript
await agent.executeTool('web_automation_click', {
  selector: 'button.login'
});
```

#### `web_automation_type`

在输入元素中输入文本。

**参数：**
- `selector`：输入元素的 CSS 选择器
- `text`：要输入到输入框中的文本

**示例：**
```javascript
await agent.executeTool('web_automation_type', {
  selector: 'input.username',
  text: 'user123'
});
```

#### `web_automation_get`

从元素中提取内容。

**参数：**
- `selector`：要从中提取内容的元素的 CSS 选择器

**示例：**
```javascript
const result = await agent.executeTool('web_automation_get', {
  selector: 'div.product-title'
});
console.log(result); // 提取的内容："产品名称"
```

#### `web_automation_screenshot`

拍摄当前页面的截图。

**参数：**
- `path`：保存截图的路径（可选，默认为 "screenshot.png"）

**示例：**
```javascript
await agent.executeTool('web_automation_screenshot', {
  path: 'page.png'
});
```

#### `web_automation_execute`

执行自然语言命令来控制网页。

**参数：**
- `command`：要执行的自然语言命令
- `model`：LLM 模型名称（可选，如果尚未初始化）
- `baseURL`：LLM API 基础 URL（可选，如果尚未初始化）
- `apiKey`：LLM API 密钥（可选，如果尚未初始化）

**示例：**
```javascript
const result = await agent.executeTool('web_automation_execute', {
  command: '点击登录按钮并输入用户名 "user123" 和密码 "password123"'
});
console.log(result); // 网页自动化执行结果："登录表单提交成功"
```

## 示例

### 示例 1：登录网站

```javascript
// 打开登录页面
await agent.executeTool('web_automation_open', {
  url: 'https://example.com/login'
});

// 输入用户名
await agent.executeTool('web_automation_type', {
  selector: 'input[name="username"]',
  text: 'user123'
});

// 输入密码
await agent.executeTool('web_automation_type', {
  selector: 'input[name="password"]',
  text: 'password123'
});

// 点击登录按钮
await agent.executeTool('web_automation_click', {
  selector: 'button[type="submit"]'
});

// 提取欢迎信息
const welcomeMessage = await agent.executeTool('web_automation_get', {
  selector: 'div.welcome-message'
});

console.log(welcomeMessage);
```

### 示例 2：自然语言控制

```javascript
// 初始化 Page-Agent（如果尚未在设置中完成）
await agent.executeTool('web_automation_execute', {
  command: '打开 GitHub 并搜索 "page-assist" 仓库',
  model: 'qwen3.5-plus',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiKey: 'YOUR_API_KEY'
});

// 拍摄搜索结果的截图
await agent.executeTool('web_automation_screenshot', {
  path: 'github-search-results.png'
});
```

## 故障排除

### OpenCLI 问题

- **扩展未连接**：确保 OpenCLI 浏览器桥接扩展已安装并在 Chrome/Chromium 中启用。
- **守护进程未运行**：运行 `opencli daemon start` 启动 OpenCLI 守护进程。
- **权限错误**：确保您有运行 OpenCLI 命令的必要权限。

### Page-Agent 问题

- **LLM 连接失败**：检查 Page Assist 设置中的 LLM 模型设置。
- **执行失败**：确保您的 LLM API 密钥有效且有足够的 credits。
- **命令不被理解**：尝试重新表述您的自然语言命令，使其更具体。

## 限制

- OpenCLI 需要 Chrome 或 Chromium 浏览器
- Page-Agent 需要有效的 LLM API 配置
- 一些网站可能有反自动化措施，可能会阻止这些工具
- 性能可能因网络速度和 LLM 响应时间而异

## 最佳实践

- 使用特定的 CSS 选择器以更可靠地定位元素
- 保持自然语言命令清晰简洁
- 使用截图验证网页状态
- 在生产环境中使用之前，在受控环境中测试您的自动化工作流
- 尊重网站服务条款和 robots.txt 指南