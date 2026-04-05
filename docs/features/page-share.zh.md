# 页面共享

页面共享是一项允许您与他人共享聊天的功能，类似于 ChatGPT 的共享功能。此功能默认与互联网交互，您可以使用 page assist 服务器来共享您的聊天。

但出于隐私考虑，最好自托管页面共享服务器。您可以按照以下步骤执行此操作。


## 自托管

您可以使用两种方法自托管页面共享：

- Railway
- Docker

### Railway

点击下面的按钮将代码部署到 Railway。

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/VbiS2Q?referralCode=olbszX)

### Docker

1. 克隆存储库


```bash
git clone https://github.com/n4ze3m/page-share-app.git
cd page-share-app
```


2. 运行服务器


```bash
docker-compose up
```


3. 打开应用

在浏览器中导航到 [http://localhost:3000](http://localhost:3000)。


部署服务器后，您可以通过进入设置并管理共享来更改页面共享。

![Page Share](https://pub-35424b4473484be483c0afa08c69e7da.r2.dev/Screenshot%202025-02-19%20210635.png)