# craco-plugin-svg-sprite

[![NPM version](https://img.shields.io/npm/v/craco-plugin-svg-sprite)](https://www.npmjs.com/package/craco-plugin-svg-sprite)
![Downloads](https://img.shields.io/npm/dw/craco-plugin-svg-sprite)
[![License](https://img.shields.io/npm/l/craco-plugin-svg-sprite)](./LICENSE)

> craco-plugin for creatin SVG sprites.

Motivation: How to use SVG sprites in a project.

## prerequisite

You have to learn what SVG sprites.

- [未来必热：SVG Sprites技术介绍](https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/?spm=a313x.7781069.1998910419.50)

then,Learn how to use SVGO to compress SVG.

- [SVG精简压缩工具svgo简介和初体验](https://www.zhangxinxu.com/wordpress/2016/02/svg-compress-tool-svgo-experience/)

Finally, summarize the application in the project

- [手摸手，带你优雅的使用 icon](https://juejin.cn/post/6844903517564436493#heading-8)

Three package involved：

- [svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader#readme)
- [svgo-loader](https://github.com/rpominov/svgo-loader)
- [svgo](https://github.com/svg/svgo)


## Usage

```bash
npm install craco-plugin-svg-sprite --save-dev
```

... or with Yarn

```bash
yarn add craco-plugin-svg-sprite -D
```

## Configuration

```js
// craco.config.js   => plugins
const cracoPluginSvgSprite = require("craco-plugin-svg-sprite");

{
    plugin: cracoPluginSvgSprite,
    options: {
        include: "src",                 // required
        compress: true,                 // option
        svgoConfig: {                   // option

        },
        spriteLoaderConfig: {           // option

        },
        svgPrefixName: "icon"           // option
    },
}
```

configuration parameter:

|Property|Description|Type|Default|Option|
|:---:|:---:|:---:|:---:|:---:|
|include|files to include|`string`|-|required|
|svgPrefixName|svg file prefix name|`string`|-|option|
|compress|is a svgo used|`boolean`|true|option|
|svgoConfig|svgo-loader config|`object`|-|option|
|spriteLoaderConfig|svg-sprite-loader config|`object`|-|option|

## reference

[在 create-react-app 创建的项目中使用 svg-sprite-loader](https://blog.ihanai.com/2018/03/use-svg-sprite-loader-in-project-created-by-create-react-app.html)