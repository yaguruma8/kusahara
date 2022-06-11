22/6/9
# Reactで本番用にbuildすると画面が真っ白になる場合の修正方法

## 現象

`npm run build`すると`dist`ディレクトリに静的ファイルが作成される

(下記はviteの初期設定の場合)
```
.
├── assets
│   ├── favicon.17e50649.svg
│   ├── index.3ada781c.js
│   └── index.458f9883.css
└── index.html
```
しかし`index.html`を開いても真っ白

## 原因
```html
<!-- dist/index.html -->
<link rel="stylesheet" href="/assets/index.458f9883.css">
```
リンクが（これ以外も）`/asset/index.xxxxxx.css`のようにrootからのパスになっているのが原因

`./asset/index.xxxxxx.css`のように`index.html`に対しての相対パスにする必要がある

## 対処

### `create-react-app`を使っている場合

```js
//package.json
{
  "name": "router-tutorial",
  "private": true,
  "homepage": "./", // 追加
  // ...
}
```
`package.json` に `"homepage": "./"` を追加

### `vite`を使っている場合
```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: './',   // 追加
})
```
`vite.config.js` に `base: './'` を追加
