2022/7/29

# PHP + Dockerで環境変数を扱う方法

環境
- macOS Monterey (12.4)
- Docker 4.9.1
  - php:8.0-apache

## `.env`ファイルの作成

`.env`を作成して環境変数を書き込む  
例）  
```
PHP_HELLO=hello
```

## `.env`をDockerコンテナで読み込めるようにする
`docker-compose.yml`
```yml
version: '3'

services:
  php:
    build: ./docker/php
    env_file: ./.env
    ports:
      - 8080:8000
    volumes:
      - ./work:/work
      - ./docker/php/php.ini:/usr/local/etc/php/php.ini
```
- `env_file`に`.env`のパスを記述

## `php.ini`の設定
環境変数を読み込むかどうかは`variables_order`が`EGPCS`である必要がある   
`phpinfo()`で設定を確認可能
```ini
[Core]
; 環境変数を読み込めるようにする
variables_order=EGPCS
```
## Dockerコンテナの再起動
停止
```
docker-compose down
```
起動
```
docker-compose up -d
```

## 環境変数へのアクセス
`$_ENV`グローバル変数でアクセスする
```php
echo $_ENV['PHP_HELLO'];
```

## 注意点
環境変数の読み込みは**Dockerのコンテナ立ち上げ**の時に行われる。   

新しい環境変数を追加した時はコンテナを再起動すること。   





