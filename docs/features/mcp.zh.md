# MCP（模型上下文协议）

Page Assist 支持 MCP，允许您的 LLM 使用外部工具，如搜索、数据库等。您可以连接到任何支持可流式 HTTP 或 SSE 传输的 MCP 服务器。

## 支持的传输类型

- 可流式 HTTP

## 连接到远程 MCP 服务器

1. 进入设置
2. 进入 `MCP 设置`
3. 点击 `添加 MCP 服务器`
4. 输入名称和服务器 URL
5. 选择认证类型（无、Bearer 令牌或 OAuth 2.1）
6. 点击 `保存`

添加后，服务器工具将被自动获取并缓存。

## 人在环审批

您可以直接从 `设置 > MCP 设置` 启用 `运行 MCP 工具前需要审批`。

启用此设置后，Page Assist 在工具运行前会要求确认。这对于具有以下能力的 MCP 服务器特别推荐：

- 写入或删除文件
- 在数据库中创建、编辑或删除记录
- 发送消息、电子邮件或 API 变更
- 触发任何其他现实世界的副作用

启用后，您可以展开服务器并将每个工具设置为：

- `允许` 无需审批即可运行
- `人在环` 需要审批
- `禁用` 向代理隐藏工具

::: warning
如果 MCP 服务器具有写入权限，强烈建议开启人在环功能。
:::

## 使用 STDIO MCP 服务器

Page Assist 是一个浏览器扩展，因此不能直接运行基于 STDIO 的 MCP 服务器。您可以使用 [supergateway](https://github.com/supercorp-ai/supergateway) 将任何 STDIO MCP 服务器转换为 HTTP。

例如，要使用 Playwright MCP：

```bash
npx -y supergateway --stdio "npx @playwright/mcp@latest" --port 8808 --cors --outputTransport streamableHttp
```

然后在 MCP 设置中添加 `http://localhost:8808/mcp` 作为服务器 URL。

## 认证

Page Assist 支持 MCP 服务器的两种认证方法。

### API 密钥 / Bearer 令牌

如果您的 MCP 服务器需要 API 密钥或 Bearer 令牌：

1. 进入 MCP 设置
2. 点击 `添加自定义服务器`
3. 选择 `Bearer 令牌` 作为认证类型
4. 输入您的令牌
5. 点击 `保存`

令牌将作为 `Authorization: Bearer <token>` 与每个请求一起发送。

### OAuth 2.1

一些 MCP 服务器（如 Notion）需要 OAuth 2.1 授权。Page Assist 使用您的页面共享 URL 作为 OAuth 重定向端点来支持这一点。

#### 设置

1. 确保您已配置页面共享 URL（进入设置 > 管理共享）
2. 进入 MCP 设置
3. 点击 `添加自定义服务器`
4. 输入服务器名称和 URL（例如 `https://mcp.notion.com/mcp`）
5. 选择 `OAuth 2.1` 作为认证类型
6. 点击 `保存`
7. 点击操作列中的密钥图标开始 OAuth 流程
8. 在打开的浏览器标签中完成授权

::: tip
Page Assist 不会在服务器上记录或存储任何 OAuth 数据。页面共享应用仅作为重定向端点。所有令牌都存储在您的浏览器本地。
:::

#### 自托管页面共享

如果您不想使用默认的页面共享服务器进行 OAuth 重定向，您可以自托管它。请参阅 [页面共享](/features/page-share) 文档获取说明。

部署后，在设置 > 管理共享中更新您的页面共享 URL。

## 按聊天启用/禁用服务器

您可以使用聊天输入中的 MCP 图标按钮按聊天临时启用或禁用 MCP 服务器。这让您可以控制可用的工具，而无需更改全局设置。

## 自定义头

如果您的 MCP 服务器需要自定义头，您可以在 MCP 设置中创建或编辑服务器时添加它们。