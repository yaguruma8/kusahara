22/6/30

# VPS環境構築を色々説明しているサイトのまとめ

Heroku以外にも選択肢を広げたい。    
レンタルサーバーはFlaskとかが動かないので     
レンタルサーバーで何か考えるならPHPとWordPressでないとほとんど自由がなさそう    
PythonのCGIモード + cron で済むことならレンタルサーバの方が圧倒的に安い。


## [さくらVPSで Apache + Pipenv + Flask + SQLAlchemy をサクっと構築](https://qiita.com/daijin_tororohamburger/items/d67a9853e2a97f262c5f)
  - 2020/01
  - さくらのVPS
  - CentOS7 + Apache
  - MySQL
  - Python3.8 + Flask + sqlAlchemy + gunicorn

最短でWebアプリをVPSに構築するという趣旨でセキュリティに関する言及はほぼなし。   
ただその分簡潔明快で全体の流れはとてもわかりやすい 

## [CentOSにApacheをインストールしてFlaskアプリケーションをデプロイする](https://qiita.com/sti320a/items/c196387d405272cce46e)
  - 2019/07
  - さくらのVPS
  - CentOS7 + Apache
  - DBなし
  - Python3.7 + Flask1.1 + gunicorn

セキュリティ詳しめに書いてある。    
OSの設定（一般ユーザーの設定、SSH接続、公開鍵認証への変更など）割と詳しめに書いてある。    
サーバーの設定もfirewallの設定などのセキュリティ面が記載されている。    
Herokuのようにgitでデプロイしてアプリを起動する手順が書いてあるので良い。    
データベース関連の記載がないのが惜しい

## [Flask + uWSGI + Nginx でハローワールドするまで @ さくらのVPS (CentOS 6.6)](https://qiita.com/morinokami/items/e0efb2ae2aa04a1b148b)
  - 2015/06
  - さくらのVPS
  - CentOS6 + nginx
  - DBなし
  - Flask + uwsgi

情報は古いがnginxを使っているので    
OSのインストールなどは一切省略    
nginxおよびuWSGI（gunicornではない。まだ出てない？）の基本的な設定とサーバー(nginx)とアプリ(Flask)の接続が中心の記事    
`Flask <-> uwsgi <-> socket <-> Nginx <-> Client`    
という接続のイメージが書いてあってそれを実現するための設定、という感じで書いてあるので、イマイチよくわからなかったサーバの接続がなんとなくおぼろげに掴めた感じはした。    

## [さくらのVPS入門ガイド](https://vps.sakura.ad.jp/guide/)
  - 2017年
  - CentOS7 + Apache
  - MariaDB
  - PHP + WordPress

さくらのVPS公式のVPS設定記事。    
さくらのVPSの設定、コントロールパネルの説明などが豊富。    
さくらのVPSでできるセキュリティ設定なども細かく書いてあるし、記事を書いた後の新しいセキュリティ機能についても言及がある。

## [Webアプリケーション開発 - 株式会社日本ビューシステム](https://view-s.co.jp/product/webapp/)
  - さくらのVPS
  - CentOS7 + nginx
  - PostgreSQL
  - Django

企業のページだけど、やたら詳しくOSインストールからWebアプリを動かすまで書いてある。社員の学習用？    
サーバをどう繋げるか、サーバ間の接続のイメージなどがかなり丁寧に書いてある。    
複数のWebアプリをnginxで振り分けて一つのサーバで動かすための設定など面白いと思う


## [初めて VPS で Flask アプリをデプロイしてみた](https://zenn.dev/suyaa/articles/68061ae038e02d)
  - 2022/06
  - さくらのVPS
  - Ubuntu

スクレイピングする人のデプロイ記事っぽい。   
覚書という感じで書いてあることの半分もわからないのが正直なところ    
ただUbuntuでやってるのは面白いのと、Chromiumドライバーを入れてスクレイピングやってるので今後何か役に立つことがあるかもしれない。    
記事によればChromium入れてスクレイピングやる場合は一番安いプランだとダメっぽい。

