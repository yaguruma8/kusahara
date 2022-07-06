22/7/5

# PHP + Xdebug + docker + VSCode の設定の覚書

開発用の設定   
サーバーはPHPの開発用サーバを使用    
ホストの`localhost:8080`で接続できるように設定する

## 参考
[【PHP】VScodeでXdebugを使ってデバッグする](https://zenn.dev/ikeo/articles/244d6a8042bcd8c55fe9)

## ディレクトリ構成
```
.
├── docker
│   └── php
│       ├── Dockerfile
│       └── php.ini
├── docker-compose.yml
└── work
    ├── app
    └── public
        └── index.php
```

## docker
`docker-compose.yml`
```yml
version: '3'

services:
  php:
    build: ./docker/php
    ports:
      - 8080:8000
    volumes:
      - ./work:/work
      - ./docker/php/php.ini:/usr/local/etc/php/php.ini 
```

`docker/php/Dockerfile`
```dockerfile
FROM php:8.0-apache

# パッケージリストのアップデート
RUN apt-get update
# xdebugのインストールと有効化
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
# 作業ディレクトリ
WORKDIR /work
# 開発用サーバの起動（guest:8000 -> host:8080にポートフォワード）
CMD ["php", "-S", "0.0.0.0:8000", "-t", "/work/public"]
```

## PHP
`docker/php/php.ini`
```ini
[xdebug]
; リモートデバッグ有効化
xdebug.mode=debug
; リモートデバッグの自動開始
xdebug.start_with_request=yes
;　ホストの指定
xdebug.client_host=host.docker.internal
; ホスト側のポート指定
xdebug.client_port=9003

[date]
; PHPで使用される日付や時刻の標準の時間帯
date.timezone=Asia/Tokyo

[mbstring]
; デフォルト言語を日本語にする
mbstring.language=Japanese
; HTTP入力の変換機能
mbstring.encoding_translation=On
; 文字コード検出順序（UTF-8のみ）
mbstring.detect_order= UTF-8
; 無効な文字の代替出力（何もしない）
mbstring.substitute_character=none

[Core]
; ヘッダからPHPのバージョンを削除
expose_php=Off
```

## VSCode

### 拡張機能のインストール

`PHP Debug`をインストールする

### Xdebugが有効化されているか確認する
`phpinfo()`で確認    
- Xdebug の Step Debugger が `enebled`
- xdebug.start_with_request が`yes`

上記を満たしていればVSCodeでXdebugを使用可能。    

### VSCodeの設定

VSCodeのサイドメニューのデバッグの項目で最初は`create a launch.json file`とあるのでそこをクリックしてPHP用の`launch.json`を作成する。

`.vscode/launch.json`    
```json
{
  // IntelliSense を使用して利用可能な属性を学べます。
  // 既存の属性の説明をホバーして表示します。
  // 詳細情報は次を確認してください: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for Xdebug",
      "type": "php",
      "request": "launch",
      // 変更:php.ini の xdebug.client_portで指定したポート番号
      "port": 9003,
      // 追加:Dockerのドキュメントルート:ローカルのドキュメントルート
      "pathMappings": {
        "/work/public": "${workspaceRoot}/work/public"
    }
    },
    {
      "name": "Launch currently open script",
      "type": "php",
      "request": "launch",
      "program": "${file}",
      "cwd": "${fileDirname}",
      "port": 0,
      "runtimeArgs": [
        "-dxdebug.start_with_request=yes"
      ],
      "env": {
        "XDEBUG_MODE": "debug,develop",
        "XDEBUG_CONFIG": "client_port=${port}"
      }
    },
    {
      "name": "Launch Built-in web server",
      "type": "php",
      "request": "launch",
      "runtimeArgs": [
        "-dxdebug.mode=debug",
        "-dxdebug.start_with_request=yes",
        "-S",
        "localhost:0"
      ],
      "program": "",
      "cwd": "${workspaceRoot}",
      "port": 9003,
      "serverReadyAction": {
        "pattern": "Development Server \\(http://localhost:([0-9]+)\\) started",
        "uriFormat": "http://localhost:%s",
        "action": "openExternally"
      }
    }
  ]
}
```
