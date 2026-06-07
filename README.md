# AI协会工作门户

公司 AI协会内部工作门户。

## 重要说明

本仓库包含标注为“内部使用”的工作资料、项目数据和调研汇总，不得未经授权公开发布或对外传播。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建结果位于 `dist/`，并会复制门户资料到 `dist/resources/`。

## 公司服务器部署

先构建静态门户，再启动内置 Node 服务：

```bash
npm run build
LEDGER_EDIT_PASSWORD=请替换为编辑口令 npm run serve:portal
```

服务会同时提供门户页面和台账 API。默认台账数据文件位于
`server/data/ledger-scenes.json`，也可以通过 `LEDGER_DATA_FILE=/path/to/file.json`
指定。所有写入接口需要 `LEDGER_EDIT_PASSWORD` 口令；GitHub Pages 等静态部署环境会自动退回到本机浏览器保存模式。

## GitHub Pages

`docs/` 是准备好的 GitHub Pages 发布目录。启用 Pages 会使站点可能对互联网公开，启用前必须确认资料权限和访问控制要求。
