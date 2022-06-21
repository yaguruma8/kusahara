22/6/21
# なろうユーザ検索API簡易まとめ

[なろうユーザ検索API](https://dev.syosetu.com/man/userapi/)

## 出力GET

| パラメータ | 値 | 説明 |
| - | - | - |
| gzip | int 1-5 | gzip圧縮レベル |
| out | string | ファイル形式 デフォルトyaml json,jsonp, php |
| lim | int 1-500 | 最大出力数 デフォルト20 |
| st | int 1-2000 | 表示開始位置 デフォルト1 |
| order | string | 出力順序 下記 |

出力順序    
- new ユーザIDの新しい順（デフォルト）
- novelcnt 小説投稿数の多い順
- reviewcnt レビュー投稿数の多い順
- novellength 小説累計文字数の多い順
- sumglobalpoint 総合評価ポイント合計の多い順
- old ユーザIDの古い順

## 条件抽出GET

| パラメータ | 値 | 説明 |
| - | - | - |
| word | string | 単語 UTF-8+URLエンコード スペース区切りでAND |
| notword | string | 除外単語 UTF-8+URLエンコード スペース区切りでAND |
| userid | int | ユーザID |
| name1st | string | 頭文字指定 濁音・半濁音も清音で抽出 |
| minnovel | int | 最低小説投稿数 | 
| maxnovel | int | 最高小説投稿数 |
| minreview | int | 最低レビュー投稿数 |
| maxreview | int | 最高レビュー投稿数 |

## 出力

| パラメータ | 値 | 説明 | ofパラメータ |
| - | - | - | - |
| allcount | int | 全ユーザ情報出力数| - |
| userid | int | ユーザID | u |
| name | string | ユーザ名 | n |
| yomikata| string | ユーザ名のフリガナ | y |
| name1st | string | 頭文字 | 1 |
| novel_cnt | int | 小説投稿数 | nc |
| review_cnt | int | レビュー投稿数 | rc |
| novel_length | int | 小説累計文字数 | nl |
| sum_global_point | int | 総合評価ポイント合計 | sg |

最初の要素 allcount    
以降 ユーザごとの情報
