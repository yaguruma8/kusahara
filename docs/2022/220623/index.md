22/6/23
# Node.jsの管理ツールをnodebrewからVoltaに乗り換えた

Voltaは最近出てきたRust製のめちゃくちゃ早いNode.js管理ツールらしい。    
`package.json`にnode.jsのバージョンを書き込むだけで自動的にインストールしてプロジェクトごとにバージョン固定ができる、らしい。   

先日、Progate Pathのβ版に通ったので学習を始めているのだが、`node.js`のインストールで`nodenv`を入れることを勧められたので、その時に下記参考サイトの記事を読んだのを思い出し、どうせならVoltaを入れてみようと思った。    
Progate Pathによれば実務に近いのは`nodenv`らしいが……（Voltaは2021年に正式リリースらしいので実務で使用するのはまだ新しすぎるのかもしれない）    
なんとなくVoltaの方が好みぽかった。問題が出てくるようならその時に考える。    
Prpgate Pathの進行は`node.js`が入っているのが重要で管理ツールが何であるかはおそらく関係ない。    
(`nodebrew`でインストールしていた`node.js`でも環境確認テストに通ったので）    

公式    
[Volta](https://volta.sh)

参考サイト    
[nodebrewやめてVoltaにのりかえてみた](https://o-kun.com/archives/3057/changed-from-nodebrew-to-volta/)

環境
- macOS Monterey 12.4
- Homebrew 3.5.2
- volta 1.0.8

# nodebrewのアンインストール

Homebrewでインストールしていたので`brew`コマンドでアンインストールする

Homebrewのインストール一覧の確認    
(Homebrewでインストールしていればこの中にnodebrewがある)
```sh
brew list
```

## Homebrewからnodebrewをアンインストール
```sh
brew uninstall nodebrew
```

## ディレクトリの削除
ホームディレクトリの直下に`.nodebrew`ディレクトリがあるので削除する
```sh
rm -rf ~/.nodebrew
```

## パスの削除
`.zshrc`のnodebrewのパスを削除する
```sh
# 削除
export PATH=$HOME/.nodebrew/current/bin:$PATH
```

# Voltaのインストール

公式では直接インストールしているが`Homebrew`経由でインストールできるらしいので（参考サイト）、それでインストールする。

## VoltaをHomebrewでインストール
```sh
brew install volta
```

## パスを通す
[Getting Started - Volta](https://docs.volta.sh/guide/getting-started)

> Set the VOLTA_HOME variable to $HOME/.volta    
>Add $VOLTA_HOME/bin to the beginning of your PATH variable

↑ と書いてある通りに`.zshrc`にパスを通す    

```sh
VOLTA_HOME=$HOME/.volta
export PATH=$VOLTA_HOME/bin:$PATH
```

公式の説明の通りにインストールするのだとこのへん自動で設定してくれるぽい？

## 確認
```sh
source ~/.zshrc
volta --version
```

## node.jsのインストール

最新のLTS版のインストール
```shell
volta install node
```

`node@version`でバージョンを指定してインストールできる。
- 例えば`node@14`と指定すればバージョン14の最後のマイナーバージョンをインストールする

## package.jsonでの設定

```json
{
  "volta": {
    "node": "16.13.1",
    "yarn": "1.22.1"
  }
}
```
パッケージマネージャー(`npm`, `yarn`)も指定可能    
`package.json`に上記のように書いて`npm install`するだけで自動的にそのプロジェクト内では指定のnode.jsが設定される（ローカルになければ自動的にインストールされる）

# 感想
動作がキビキビしているというか、`node.js`のインストールがめちゃくちゃ早くてびっくりした。    
公式サイトを最初は読まずにやっていたので少し手こずった。    
やはり公式は（英語でも）最初に見るべき。    
全体的にはインストールも難しいところもさほどなくすんなりと乗り換えできた。    
