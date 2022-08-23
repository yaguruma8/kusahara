22/8/23

# 小説家になろう作品URL関連まとめ

変数部分はJavaScriptのテンプレートリテラルで記述する。

- `ncode` : Nコード
- `Nnum` : Nコード→数値変換
  - 参考: [小説家になろうのncodeを数値に変換する](../220822/index.md)
- `episode` : 話数

| ページ | URL |
| -- | -- |
| 小説トップ | `https://ncode.syosetu.com/${ncode}/` |
| 小説各話 | `https://ncode.syosetu.com/${ncode}/${episode}/` |
| 小説情報 | `https://ncode.syosetu.com/novelview/infotop/ncode/${ncode}/` |
| 感想（全て） | `https://novelcom.syosetu.com/impression/list/ncode/${Nnum}/` |
| 感想（各話） | `https://novelcom.syosetu.com/impression/list/ncode/${Nnum}/no/${episode}/`|
| レビュー | `https://novelcom.syosetu.com/novelreview/list/ncode/${Nnum}/` |
| 縦書きPDF | `https://pdfnovels.net/${ncode}/` |
| TXTダウンロード | `https://ncode.syosetu.com/txtdownload/top/ncode/${Nnum}/` |
| アクセス解析(総合) | `https://kasasagi.hinaproject.com/access/top/ncode/${ncode}/` |
| アクセス解析(部分別) | `https://kasasagi.hinaproject.com/access/chapter/ncode/${ncode}/` |
| アクセス解析(日別PV) | `https://kasasagi.hinaproject.com/access/daypv/ncode/${ncode}/` |
| アクセス解析(日別ユニーク) | `https://kasasagi.hinaproject.com/access/dayunique/ncode/${ncode}/` |
| アクセス解析(月別PV) | `https://kasasagi.hinaproject.com/access/monthpv/ncode/${ncode}/` |
| アクセス解析(月別ユニーク) | `https://kasasagi.hinaproject.com/access/monthunique/ncode/${ncode}/` |
