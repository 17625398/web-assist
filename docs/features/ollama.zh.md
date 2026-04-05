# Ollama

Page Assist 设计用于与 Ollama 一起工作。以下是您可以使用 Page Assist 为 Ollama 实例执行的一些操作。

## 管理 Ollama 模型

您可以从设置中的 `管理模型` 部分管理 Ollama 模型。

1. 进入 `设置`
2. 进入 `管理模型`
3. 您将看到所有已拉取的模型
4. 您可以从那里删除模型

![Manage Models](https://pub-35424b4473484be483c0afa08c69e7da.r2.dev/Screenshot%202025-02-19%20230330.png)

## 拉取 Ollama 模型

您可以使用三种方法无需进入终端即可为 Ollama 拉取模型。

### 方法 1：从 Web UI

1. 进入 `设置`
2. 进入 `管理模型`
3. 点击 `添加新模型` 按钮
4. 添加模型名称并点击 `拉取模型`

![Pull Model](https://pub-35424b4473484be483c0afa08c69e7da.r2.dev/Screenshot%202025-02-19%20225356.png)

### 方法 2：从 Ollama.com

当您浏览 Ollama.com 时，您可以直接从网站拉取模型。

1. 进入 Ollama.com
2. 进入任何模型页面
3. 复制图标旁边会有一个拉取图标
4. 点击后，会要求确认
5. 下载进度可以在 Page Assist 图标中看到

![Pull Model](https://pub-35424b4473484be483c0afa08c69e7da.r2.dev/brave_vczba7pnUo.gif)

### 方法 3：从 huggingface.com

您可以从 huggingface.com 拉取 `gguf` 模型。

1. 进入 huggingface.com
2. 进入任何模型页面
3. 右侧会有 `Use this model` 并选择 `Ollama`
![Pull Model](https://pub-35424b4473484be483c0afa08c69e7da.r2.dev/Screenshot%202025-02-19%20225915.png)
4. 在 Huggingface 弹出窗口中会有一个 `Pull from Page Assist` 按钮，点击它
![Pull Model](https://pub-35424b4473484be483c0afa08c69e7da.r2.dev/Screenshot%202025-02-19%20230049.png)
5. 其余过程与方法 2 相同