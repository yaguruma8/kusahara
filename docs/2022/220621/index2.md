22/6/21
# なろう小説API簡易まとめ

[なろう小説API](https://dev.syosetu.com/man/api/)

## 出力GET

| パラメータ | 値 | 説明 |
| - | - | - |
| gzip | int 1-5 | gzip圧縮レベル |
| out | string | 出力形式　デフォルトyaml  json, jsonp, php, atom |
| lim | int 1-500 | 最大出力数 デフォルト20 |
| st | int 1-2000 | 表示開始位置 デフォルト1 |
| order | string | 出力順序　下記 |

### 出力順序
- new	新着更新順（デフォルト）
- favnovelcnt	ブックマーク数の多い順
- reviewcnt	レビュー数の多い順
- hyoka	総合ポイントの高い順
- hyokaasc	総合ポイントの低い順
- dailypoint	日間ポイントの高い順
- weeklypoint	週間ポイントの高い順
- monthlypoint	月間ポイントの高い順
- quarterpoint	四半期ポイントの高い順
- yearlypoint	年間ポイントの高い順
- impressioncnt	感想の多い順
- hyokacnt	評価者数の多い順
- hyokacntasc	評価者数の少ない順
- weekly	週間ユニークユーザの多い順（毎週火曜日早朝リセット、前週の日曜日から土曜日分）
- lengthdesc	小説本文の文字数が多い順
- lengthasc	小説本文の文字数が少ない順
- ncodedesc	新着投稿順
- old	更新が古い順

## 条件抽出GET
| パラメータ | 値 | 説明 |
| - | - | - |
| word | string | 単語 UTF-8+URLエンコード要 スペースでAND |
| notword | string | 単語除外　同上 |
| title | int | タイトルから抽出　1で有効 |
| ex | int |　あらすじから抽出 同上 |
| keyword | int | キーワードから抽出 同上 |
| wname | int | 作者名から抽出　同上 |
|  |  |
| biggenre | int string | 大ジャンル　ハイフンでOR |
| notbiggenre | int string | 大ジャンル除外　同上 |
| genre | int string | 小ジャンル　同上 |
| notgenre | int string | 小ジャンル除外　同上 |
|  |  |
| userid | int string | ユーザID ハイフンでOR |
|  |  |
| isr15 | int | R15 1で抽出 |
| isbl | int | ボーイズラブ　同上 |
| isgl | int | ガールズラブ　同上 |
| iszankoku | int | 残酷な描写あり　同上 |
| istensei | int | 異世界転生　同上 | 
| istenni | int | 異世界転移　同上 |
| istt | int | 異世界転生or異世界転移　同上 |
|  |  |
| notr15 | int | R15除外 1で除外 |
| notbl | int | ボーイズラブ除外　同上 |
| notgl | int | ガールズラブ除外　同上 |
| notzankoku | int | 残酷な描写あり除外　同上 |
| nottensei | int | 異世界転生除外　同上 | 
| nottenni | int | 異世界転移除外　同上 |
| nottt | int | 異世界転生or異世界転移除外　同上 |
|  |  |
| minlen | int | 最小文字数 |
| maxlen | int | 最大文字数 |
| length | int string | 文字数　ハイフンで範囲指定　上二つと併用不可 |
|  |  |
| kaiwaritu | int string | 会話率％　ハイフンで範囲指定 |
| sasie | int string | 挿絵の数　ハイフンで範囲指定 |
|  |  |
| mintime | int | 最低読了時間　文字数と併用不可 |
| maxtime | int | 最大読了時間　文字数と併用不可 |
| time | int string | 読了時間　ハイフンで範囲指定　文字数と併用不可 |
|  |  |
| ncode | string | Nコード　ハイフンでOR | 
| type | string | 小説タイプ　下記 |
|  |  |
| buntai | int string | 文体　ハイフンでOR 下記 |
| stop | int | 連載停止中 1:除外、2:抽出 |
|  |  |
| lastup | string | 最終掲載日　UNIXタイムスタンプ・文字列 下記 |
|  |  |
| ispickup | int | ピックアップ指定 |
|  |  |
| opt | string | 週間ユニークユーザ(weekly) |

### 小説タイプ
- t 短編
- r 連載中
- er 完結
- re 連載（連載中＋完結）
- ter 短編＋完結

### 文体
- 1 字下げなし、連続改行多い
- 2 字下げなし、改行普通
- 4 字下げあり、連続改行多い
- 6 字下げあり、改行普通

### 最終掲載日
- thisweek 今週（日曜〜）
- lastweek 先週
- sevenday 過去7日間
- thismonth 今月
- lastmonth 先月



## 出力

| パラメータ | 値 | 説明 | ofパラメータ |
| - | - | - | - |
| allcount | int | 全小説出力数 | - |
| title | string | 小説名 | t |
| ncode | string | Nコード | n |
| userid | string | ユーザID | u |
| writer | string | 作者名 | w |
| story | string | あらすじ | s |
| biggenre | int | 大ジャンル | bg |
| genre | int | 小ジャンル| g |
| gensaku | '' | (未使用項目) |  |
| keyword | string | キーワード | k |
| general_firstup | string | 初回掲載日 YYYY-MM-DD HH:MM:SS | gf |
| general_lastup | string | 最終掲載日 YYYY-MM-DD HH:MM:SS | gl |
| novel_type | int | 連載:1、短編:2 of使用の時は**noveltype** | nt |
| end | int | 短編・完結済:0、連載中: 1 | e |
| general_all_no | int | 全掲載部分数 | ga |
| length | int | 小説文字数 | l |
| time | int | 読了時間（文字数/500、切り上げ）| ti |
| isstop | int | 長期連載停止中:1 それ以外:0 | i |
| isr15 | int | R15:1、それ以外: 0 | ir |
| isbl | int | ボーイズラブ:1、それ以外:0 | ibl |
| isgl | int | ガールズラブ:1、それ以外: 0 | igl |
| iszankoku | int | 残酷な描写あり:1、それ以外:0 | izk |
| istensei | int | 異世界転生:1、それ以外:0 | its |
| istenni | int | 異世界転移:1、それ以外:0 | iti |
| pc_or_k | int | 携帯のみ:1、PCのみ:2、両方:3 | p |
| global_point | int | 総合評価ポイント（ブクマ*2+評価ポイント）| gp |
| daily_point | int | 日間ポイント | dp |
| weekly_point | int | 週間ポイント | wp |
| monthly_point | int | 月間ポイント | mp |
| quater_point | int | 四半期ポイント | qp |
| yearly_point | int | 年間ポイント | yp |
| fav_novel_cnt | int | ブックマーク数 | f |
| impression_cnt | int | 感想数 | imp |
| review_cnt | int | レビュー数 | r |
| all_point | int | 評価ポイント | a |
| all_hyoka_cnt | int | 評価者数 | ah |
| sasie_cnt | int | 挿絵の数 | sa |
| kaiwaritu | int | 会話率 | ka |
| novelupdated_at |  | 小説の更新日時 | nu |
| updated_at |   | 更新日時（システム用） | at |

最初の要素 allcount（存在する数、取得数はlimの上限まで）    
以後、作品ごとの情報

