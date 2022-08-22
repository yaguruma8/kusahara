2022/8/22

# 小説家になろうのncodeを数値に変換する

小説家になろうのAPIで取得できる小説ごとに付与されている作品番号（ncode）は`NxxxxYZ`形式だが、レビュー・感想欄のURLは数値が使用されているため、これらのURLを取得するにはncodeから数値のコードに変換する必要がある。   

参考: [なろう小説APIとNコード](https://syosetu.com/bbstopic/top/topicid/2733/)

## ncodeの仕様と変換方法

形式：`NxxxxYZ`
- `N` 頭文字
- `xxxx` 数値（4桁）
- `YZ` 文字（2字）a~z

`YZ`の部分を数値に変換して`xxxx`と足し合わせる。

a=0, b=1, c=2 ... z=25 に文字から数字に変換して

`Y` : 9999 * 26 ** (2 - 1) * 文字から変換した数字

`Z` : 9999 * 26 ** (1 - 1) * 文字から変換した数字

## JavaScriptでの実装
```javascript
function ncodeToNum(ncode) {
  // ncodeを分解する。NxxxxYZ -> N + xxxx + Y + Z
  const X = Number(ncode.slice(1, 5));
  const Y = ncode.slice(5, 6).toLowerCase();
  const Z = ncode.slice(6).toLowerCase();
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';

  const YtoNum = 9999 * 26 ** (2 - 1) * alphabets.indexOf(Y);
  const ZtoNum = 9999 * 26 ** (1 - 1) * alphabets.indexOf(Z);

  return X + YtoNum + ZtoNum;
}
```