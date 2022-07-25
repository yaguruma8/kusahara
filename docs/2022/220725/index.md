2022/7/25

# zshのエイリアスの作り方について

## 環境    
macOS Monterey (12.4)   
zsh

## 書き込む場所

`.zshrc`に書き込む

```zsh
vim ~/.zshrc
```

## 引数なしの場合

例）gitHubにpushする`git push origin HEAD`をエイリアス`kusa`にする

`.zshrc`
```shell
alias kusa="git push origin HEAD"
```

## 引数を渡す場合

例) git のログ（一行）を見る`git log --oneline  -n 5`のエイリアス`glog`の作成    
デフォルトでは5コミット分、数字のを渡して任意の数のコミットを表示する


`.zshrc`
```shell
function g-log() {
git log --oneline -n ${1:-5}
}
alias glog=g-log
```
- エイリアスでは引数を外から渡せるようにはできないので関数を設定する
- `${1:-5}` : `一番目の引数 ${1}`が空の場合は`5`を代入する、の意味
- `glog` : `git log --oneline -n 5`
  - 5件のコミットを表示
- `glog 10` : `git log --oneline -n 10`
  - 10件のコミットを表示

## シェルスクリプトの変数について

（参考）: [ステップ・バイ・ステップ・シェルスクリプト(5) シェルの変数に慣れる](https://atmarkit.itmedia.co.jp/ait/articles/0010/19/news003.html)

```shell
${name:-value}
```
`name`が空の時に`value`をセットする

```shell
${name:+value}
```
`name`に値が入っている時に`value`をセットする

```shell
${name:?value}
```
`name`が空の時に`value`を標準エラー出力に出力してシェルスクリプトを終了する