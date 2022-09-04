22/9/4

# 同じネットワーク内のiOS実機からMacのlocalhostに接続する方法

(Slackに溜めてたtips等を移行)

参考 : [iOS 実機から MacBook のローカルホストを参照する方法](https://neos21.net/blog/2018/11/03-01.html)

環境 : macOS Monterey   

※ iPhoneやiPadはMacと同じネットワークに接続していること

## 接続方法

Macのコントロールパネルから「共有」を開く。

コンピュータ名の下に書いてある、
  > ローカルネットワーク上のコンピュータから、次のアドレスでこのコンピュータにアクセスできます: imac.local

という記述を確認する。

何も設定していなければ `コンピュータ名:local` だが、編集で好きな名前にも設定できる。

とりあえず今回は`imac.local`だとする。

Mac（開発機）の方で、`localhost:8080` を開いていた場合、

Mac : `http://localhost:8080`

iPhone : `http://imac.local:8080`

で接続できる。

ウェブアプリの実機確認などに便利。
