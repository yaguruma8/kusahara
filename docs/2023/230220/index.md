2023/2/20

# ブラウザのアドレスバーのURLを書き換える方法

参考
- [JavaScriptで履歴を扱う「History」、URLを扱う「Location」などの基本](https://atmarkit.itmedia.co.jp/ait/articles/1609/01/news080.html)
- [ページ移動せずにアドレスバーのURLを変更する](https://gray-code.com/javascript/change-url-at-address-bar/)
- [Location API (MDN)](https://developer.mozilla.org/ja/docs/Web/API/Location)
- [History API (MDN)](https://developer.mozilla.org/ja/docs/Web/API/History)

## `location`オブジェクト

ブラウザのURLを管理するオブジェクト

### `window.location.href`

- 現在のURLを **書き換える**
- ブラウザバックすると書き換える前のURLに戻る。

### `window.location.replace(newUrl)`
- 現在のURLを **書き換えずに** 新しいURLに置換する。
- 履歴には追加 **されない** 。

```javascript
// 現在いるURL: 2.html
// その前にいたURL: 1.html

// location.href
window.location.href = './3.html'
// 3.htmlに移動する（履歴に記録される）
// ブラウザバッグで2.htmlに戻る

// location.replace()
window.location.replace('./3.html')
// 3.htmlに移動する（履歴には記録されない）
// ブラウザバッグで1.htmlに戻る
```

## `history`オブジェクト

ブラウザの履歴を管理するオブジェクト

### `window.histroy.pushState()`

- ブラウザの履歴に **残る**
- ページ移動はしない

### `window.history.replaceState()`

- ブラウザの履歴に **残らない**
- ページ移動はしない

```javascript
// 現在いるURL: 2.html
// その前にいたURL: 1.html

// history.pushState()
window.history.pushState({}, '', './3.html')
// アドレスバーは 3.html に変更される。履歴に3.htmlが記録される
// ブラウザバッグで2.htmlに戻る

// history.replaceState()
window.history.replaceState({}, '', './3.html')
// アドレスバーは　3.html に変更される。履歴には 3.html が記録されない。
// ブラウザバックで1.htmlに戻る

// 3.htmlに移動する
window.history.go(0)
```