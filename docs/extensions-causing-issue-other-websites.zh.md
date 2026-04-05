# 扩展导致其他网站出现问题

由于 Page Assist 会重写 Origin 头以避免 Ollama API 上的 CORS 问题，此功能会导致一些用户或网站出现问题。

当前已知问题：

- 破坏 Intel® 驱动程序和支持助手
- Box Tools 网站

因此，我们添加了一个设置来禁用此功能。

## 如何禁用该功能

1. 点击浏览器工具栏中的 Page Assist 图标。
2. 点击设置图标。
3. 点击 "Ollama 设置" 选项卡。
4. 展开 "高级 Ollama URL 配置"
5. 关闭 "启用或禁用自动 Ollama CORS 修复" 选项。
6. 点击 "保存" 按钮。

![image](https://pub-35424b4473484be483c0afa08c69e7da.r2.dev/Screenshot%202025-02-17%20185214.png)

这将禁用该功能并防止 Page Assist 重写 Origin 头。

但是，您的 Ollama 可能会开始抛出 403 错误。要解决这个问题，您需要在 Ollama 配置文件中添加以下行。

## 如何修复 403 错误

您可以设置 OLLAMA_ORIGIN=* 以允许来自任何源的连接。以下是在不同操作系统上的操作方法：

### Windows
1. 打开开始菜单并搜索 "环境变量"
2. 点击 "编辑系统环境变量"
3. 点击 "环境变量" 按钮
4. 在 "系统变量" 下点击 "新建"
5. 设置变量名：`OLLAMA_ORIGIN` 和变量值：`*`
6. 点击确定保存
7. 重启 Ollama 服务

### MacOS

1. 打开终端
2. 运行以下命令：

```bash
launchctl setenv OLLAMA_ORIGIN "*"
```

3. 重启 Ollama 服务

### Linux
1. 打开终端
2. 运行以下命令：

```bash
export OLLAMA_ORIGIN="*"
```

3. 重启 Ollama 服务

对于使用 systemd 的 Linux 系统，您还可以将环境变量添加到服务文件中。以下是 systemd 单元文件的示例（ credit: Axel Schwarzer）：

```bash
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
#  - see docker.serice for an example
#
# EnvironmentFile=/etc/sysconfig/ollama
Environment="OLLAMA_HOST=192.168.4.67:11434"
Environment="OLLAMA_MAX_LOADED_MODELS=4"
# Environment="OLLAMA_ORIGINS=*"
ExecStart=/usr/local/bin/ollama serve
User=ollama
Group=ollama
Restart=always
RestartSec=3
Environment="PATH=/usr/local/sbin:/sbin:/usr/sbin:/root/bin:/usr/local/bin:/bin:/usr/bin:"

[Install]
WantedBy=default.target
```

要使用此配置，请取消注释 `Environment="OLLAMA_ORIGINS=*"` 行。

_这将允许来自任何源的连接。希望这能解决连接问题。_