# taro-plugin-tailwind-weapp

> Taro 中使用 tailwind

## 安装


```bash
$ npm i taro-plugin-tailwind-weapp --save
```
Or
```bash
$ yarn add taro-plugin-tailwind-weapp
```


## 使用

### 引入插件

请确保 Taro CLI 已升级至 Taro 3.1 及以上。

1. 创建一个 `tailwind.css` 文件
```css
@tailwind utilities;
```
2. 在 `app.ts` 中引入该样式文件

3. 修改项目 `config/index.js` 中的 plugins 配置为如下

```js
const config = {
  ...
  plugins: [
    ...其余插件

    'taro-plugin-tailwind-weapp',
    // 或者使用include，只处理特定的文件
    ['taro-plugin-tailwind-weapp', {
      include: [/tailwind/],
    }]
  ]
  ...
}
```

4. 原则上，插件会在构建开始时自动创建配置文件，但是你也可以选择运行 
```bash
taro tailwind --init
```
在项目根目录生成一个 `tailwind.config.js` 配置文件，也可以直接复制 [我的配置文件](https://github.com/wenxiangdong/tarojs-plugin-tailwind/blob/master/src/tailwind.config.js)
### 参数

插件可以接受如下参数：

| 参数项 | 类型 | 是否可选 | 用途 |
| :-----| :---- | :---- | :---- |
| include | string | 是 | 同postcss的include |
| exclude | number | 是 | 同postcss的exclude |

## 参考
本插件实现过程中参考了 [taro-plugin-tailwind](https://github.com/pcdotfan/taro-plugin-tailwind) 和 [tailwind-taro](https://github.com/yeyan1996/tailwind-taro).
前者需要安装特定的 Windi CSS Intellisense，后者是一个postcss插件，而且强行去掉了所有的媒体查询功能。
