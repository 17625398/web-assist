# 互联网搜索

Page Assist 支持互联网搜索，可与您的 LLM 一起使用。它的工作方式类似于 ChatGPT 的互联网搜索。

## 支持的搜索引擎

- Google（支持区域）
- DuckDuckGo
- 搜狗
- 百度
- Brave
- Searxng
- Brave Search API
- Tavily Search API
- Bing
- Stract
- Startpage
- Exa
- Firecrawl
- Ollama Web 搜索
- Kagi Search API（私人测试版 - 需要 API 访问权限）
- Perplexity Search API

## 如何使用互联网搜索

侧边栏和 Web UI 都支持互联网搜索。您可以通过切换右侧带有地球图标的开关来使用它。

![Internet Search](https://pub-35424b4473484be483c0afa08c69e7da.r2.dev/Screenshot%202025-02-19%20203546.png)

## 更新搜索提示词

您可以通过进入设置 > RAG 设置来更新搜索提示词。向下滚动，您会找到 `配置 RAG 提示词` 选项。选择 `Web` 选项卡并更新提示词。

![Update Search Prompt](https://pub-35424b4473484be483c0afa08c69e7da.r2.dev/Screenshot%202025-02-19%20204314.png)

- `{search_results}` - 这将被搜索结果替换。（不要删除此内容）
- `{current_date_time}` - 这将被当前日期和时间替换。
- `{query}` - 这将被搜索查询替换。

## 从消息中访问网站

此功能默认启用。如果您想禁用它，可以在设置中进行操作。

### 它如何工作？

当您启用互联网搜索并在输入框中输入网页 URL 并发送时，Page Assist 将访问该网站并从中提取文本。然后它会将文本发送到 LLM。

## 深度搜索模式

默认情况下，`执行简单互联网搜索` 已启用。如果您想使用深度搜索模式，需要禁用它。

深度搜索模式将访问网站并从中提取文本。然后它会将文本发送到 LLM。

::: warning
当前的深度搜索与 ChatGPT 的 DeepSearch 不同。它是一个非常基本的实现。
:::


## 默认启用互联网搜索

您可以通过以下步骤默认启用互联网搜索：

1. 进入设置
2. 在 `通用设置` 部分下
3. 向下滚动到 `管理网络搜索`
4. 启用 `默认开启互联网搜索`
5. 点击 `保存设置`