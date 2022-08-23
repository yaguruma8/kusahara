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

a=0, b=1, c=2 ... z=25 に文字から数値に変換

右から数えた桁数(`Z`= 1, `Y` = 2) で計算する    

`Y` : 9999 * 26 ** (2 - 1) * 文字から変換した数値

`Z` : 9999 * 26 ** (1 - 1) * 文字から変換した数値

## JavaScriptでの実装
```javascript
function ncodeToNnum(ncode) {
  // ncodeを分解する。NxxxxYZ -> N + xxxx + Y + Z
  // N + xxxx + Y の場合もあるのでその対応もする
  const X = Number(ncode.slice(1, 5));
  const Y = ncode.slice(5, 6).toLowerCase();
  const Z = ncode.slice(6).toLowerCase() || 'a';
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';

  const YtoNum = 9999 * 26 ** (2 - 1) * alphabets.indexOf(Y);
  const ZtoNum = 9999 * 26 ** (1 - 1) * alphabets.indexOf(Z);

  return X + YtoNum + ZtoNum;
}
```
## JavaScriptでもうちょっと汎用的にした版(8/23)
エラー処理もつけた。無効な引数ならTypeError投げる
```javascript
function ncodeToNnum(ncode) {
  if (!/^[Nn]\d{4}[A-Za-z]{1,3}$/.test(ncode)) {
    throw new TypeError('This argument is not a valid');
  }
  // ncodeを分解する。NxxxxYZ -> N + xxxx + YZ
  const X = Number(ncode.slice(1, 5));
  const YZ = ncode.slice(5).toLowerCase().split('').reverse();
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';

  let result = X;
  YZ.forEach((str, i) => {
    const toNum = 9999 * 26 ** i * alphabets.indexOf(str);
    result += toNum;
  });
  return result;
}
```
なろうの小説の管理がどうなってるのかはよくわからないが、連番であるとするなら、

`N9999ZZ` : 6,759,324    

なので、末尾の文字列が三桁になるのは先と思われる。

※ 2022/8/23AMの時点での新規投稿からのNcode→数値変換が 2,025,500 あたり。現状の存在する作品数が約98万（トップページより）で、これまで投稿作品の約半分は削除されているというデータをなろうのデータ分析系のサイトで見たことがあるので、連番と判断するのが妥当と思う

三桁になるのがあり得ない数ではないので正規表現での末尾文字列の桁チェックは`{1,3}`にしている。

ちなみに三桁の最大値は

`N9999ZZZ` : 175,742,424

流石に1.7億投稿を超えることはないだろう……と思う。