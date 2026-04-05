# Markdown 扩展示例

本页演示了 VitePress 提供的一些内置 Markdown 扩展。

## 语法高亮

VitePress 提供了由 [Shiki](https://github.com/shikijs/shiki) 支持的语法高亮，具有行高亮等附加功能：

**输入**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 自定义容器

**输入**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**输出**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 更多

查看 [完整的 Markdown 扩展列表](https://vitepress.dev/guide/markdown) 文档。