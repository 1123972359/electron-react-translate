# Electron 百度翻译

这是一款基于`Electron`+`react`开发的翻译软件，目的是快速翻译文本。

## 使用前置条件

登录百度翻译开放平台，拿到你的`appid`和`密钥`，填进软件主界面

## 安装依赖

```js
npm i
```

## 启动

1. 启动`react`

    ```js
    npm run react-start
    ```

2. 启动`Electron`

    ```js
    npm run start
    ```

## 构建

1. 构建`react`

    ```js
    npm run build
    ```

2. 构建`Electron`

    ```js
    npm run make
    ```

## 环境变量

- `.env.prod`
- `.env.test`

```js
// 全局搜索这段代码, `test`根据自己的本地变更
  const win = createBrowserWindow({
    loadURL: {
      prod: path.resolve(app.getAppPath(), './build/index.html'),
      test: 'http://localhost:3001/'
    }
  });
```

## 快捷键

- 翻译成英文

    ```js
        ctrl+c+1
    ```

- 翻译成中文

    ```js
        ctrl+c+2
    ```
