# Ollama 连接问题

连接问题可能由多种原因引起。以下是一些常见问题及其在 Page Assist 上的解决方案。如果存在连接问题，您会看到以下错误消息：

### 1. 直接连接错误
![直接连接错误](https://image.pageassist.xyz/Screenshot%202024-05-13%20001742.png)

### 2. 发送消息时的 `403` 错误
![发送消息时的 403 错误](https://image.pageassist.xyz/Screenshot%202024-05-13%20001940.png)

这个问题是由 CORS（跨源资源共享）问题引起的。由于 Page Assist 是一个浏览器扩展，它需要通过浏览器与服务器通信。然而，浏览器限制了不同源之间的通信。要解决这个问题，您可以尝试以下解决方案：

## 1. 解决方案

由于 Ollama 在从浏览器扩展直接访问时存在连接问题，Page Assist 会重写请求头以使其正常工作。然而，自动重写头仅在 `http://127.0.0.1:*` 和 `http://localhost:*` URL 上有效。要解决连接问题，您可以尝试以下解决方案：

1. 进入 Page Assist 并点击 `设置` 图标。

2. 点击 `Ollama 设置` 选项卡。

3. 您会看到 `高级 Ollama URL 配置` 选项。您需要展开它。

![高级 Ollama URL 配置](https://image.pageassist.xyz/Screenshot%202024-05-13%20003123.png)

4. 启用 `启用或禁用自定义源 URL` 选项。

![启用或禁用自定义源 URL](https://image.pageassist.xyz/Screenshot%202024-05-13%20003225.png)

:::tip
如果 Ollama 在不同的端口上运行，请在 `自定义源 URL` 字段中更改 URL；否则，保持原样。不要将 URL 更改为 Ollama 服务器 URL，例如
:::

5. 确保点击 `保存` 按钮保存更改。

_这将解决连接问题，您将能够在 Page Assist 上无问题地使用 Ollama_

## 2. 解决方案

您可以设置 OLLAMA_ORIGINS=* 以允许来自任何源的连接。以下是在不同操作系统上的操作方法：

### Windows
1. 打开开始菜单并搜索 "环境变量"
2. 点击 "编辑系统环境变量"
3. 点击 "环境变量" 按钮
4. 在 "系统变量" 下点击 "新建"
5. 设置变量名：`OLLAMA_ORIGINS` 和变量值：`*`
6. 点击确定保存
7. 重启 Ollama 服务


### MacOS

1. 打开终端
2. 运行以下命令：

```bash
launchctl setenv OLLAMA_ORIGINS "*"
```
3. 重启 Ollama 服务

### Linux
1. 打开终端
2. 运行以下命令：

```bash
export OLLAMA_ORIGINS="*"
```
3. 重启 Ollama 服务

_这将允许来自任何源的连接。希望这能解决连接问题。_



如果您仍然遇到任何问题，请随时在 [这里](https://github.com/n4ze3m/page-assist/issues/new) 联系我们，我们将很乐意为您提供帮助。