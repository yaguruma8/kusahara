22/7/14

# PHPのPDOクラスに関する覚書

公式 : [PHP Data Objects](https://www.php.net/manual/ja/book.pdo.php)

## テスト用のデータベース
```php
<?
try {
  $pdo = new PDO(
    'sqlite:test.db', // DSN
    null, // ユーザー名(MySQLなどの場合は指定)
    null, // パスワード(MySQLなどの場合は指定)
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,  // PDOException例外を投げる
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // 結果セットの配列のキーをSQLのカラム名にする
      PDO::ATTR_EMULATE_PREPARES => false,  // エミュレートモードのオフ＝SQLで設定した型で値を受け取る
    ]
  );
  $pdo->query("DROP TABLE IF EXISTS posts");
  $pdo->query(
    "CREATE TABLE posts (
        id INT NOT NULL,
        message TEXT,
        day DATE NOT NULL
      )"
  );
  $pdo->query(
    "INSERT INTO posts (id, message, day) VALUES
        (1, 'Hello!', '2022-07-01'),
        (2, 'good-morning!', '2022-07-04'),
        (3, 'yaaah!', '2022-06-29'),
        (4, 'bye!', '2022-07-20')
      "
  );
} catch (PDOException $e) {
  echo $e->getMessage() . PHP_EOL;
  exit;
}
```
- DSN(Data Source Name)
  - データベースの接続先
  - 例）MySQL　mysql:host=db;dbname=myapp;charset=utf8mb4

## クエリの実行と値の取得
```php
$stmt = $pdo->query("SELECT * FROM posts");
$post = $stmt->fetch();
$posts = $stmt->fetchAll();
```
- `fetch()` : 結果セットの最初の一行のみを取得（配列）
  - array(3)    
    {   
      ["id"]=> string(1) "1" ["message"]=> string(6) "Hello!" ["day"]=> string(10) "2022-07-01"   
    }   

- `fetchAll()` : 結果セットを配列の配列で返却する
  - array(4)    
    {    
      [0]=> array(3) { ["id"]=> string(1) "1" ["message"]=> string(6) "Hello!" ["day"]=> string(10) "2022-07-01" }    
      [1]=> array(3) { ["id"]=> string(1) "2" ["message"]=> string(13) "good-morning!" ["day"]=> string(10) "2022-07-04" }    
      [2]=> array(3) { ["id"]=> string(1) "3" ["message"]=> string(6) "yaaah!" ["day"]=> string(10) "2022-06-29" }    
      [3]=> array(3) { ["id"]=> string(1) "4" ["message"]=> string(4) "bye!" ["day"]=> string(10) "2022-07-20" }    
    }

### `fetchAll()`は常に配列の配列で返却する
```php
$stmt = $pdo->query("SELECT * FROM posts WHERE id=4;");
$posts = $stmt->fetchAll();
```
- array(1)    
 {     
  [0]=> array(3) { ["id"]=> string(1) "4" ["message"]=> string(4) "bye!" ["day"]=> string(10) "2022-07-20" }    
  }

### 結果セットが存在しない場合
```php
$stmt = $pdo->query("SELECT * FROM posts WHERE id=5");
$post = $stmt->fetch();
var_dump($post);  // bool(false)
$posts = $stmt->fetchAll();
var_dump($posts); // array(0) { }
```
- `fetch()` の場合は真偽値の`false`
- `fetchAll()` の場合は空の配列 `[]` **PHP8.0以降**



## 結果セットをクラスで受け取る
```php
class Post {
  // カラムの名前と対応させる
  public $id;
  public $message;
  public $day;
}

$stmt = $pdo->query("SELECT * FROM posts;");
$posts = $stmt->fetchAll(PDO::FETCH_CLASS, 'Post');
```
- `PDO::FETCH_CLASS` : 結果セットを指定したクラスのインスタンスの配列にして返却する
  - array(4)     
  {     
    [0]=> object(Post)#3 (3) { ["id"]=> string(1) "1" ["message"]=> string(6) "Hello!" ["day"]=> string(10) "2022-07-01" }     
    [1]=> object(Post)#4 (3) { ["id"]=> string(1) "2" ["message"]=> string(13) "good-morning!" ["day"]=> string(10) "2022-07-04" }     
    [2]=> object(Post)#5 (3) { ["id"]=> string(1) "3" ["message"]=> string(6) "yaaah!" ["day"]=> string(10) "2022-06-29" }     
    [3]=> object(Post)#6 (3) { ["id"]=> string(1) "4" ["message"]=> string(4) "bye!" ["day"]=> string(10) "2022-07-20" }     
  }

## プレースホルダの使用
```php
$stmt = $pdo->prepare("SELECT * FROM posts WHRER id=?");
$post = $stmt->execute([4]);
```
- プレースホルダに値を渡すときは配列で渡す

## プレースホルダに名前をつける
```php
$stmt = $pdo->prepare("SELECT * FROM posts WHRER id=:id");
$post = $stmt->execute([":id" => 4]);
```
- プレースホルダにはコロン(:)をつける
- 紐づけるときの名前はコロンがあってもなくてもOK

## プレースホルダに値を紐づける
```php
$id = 3;
$stmt = $pdo->prepare("SELECT * FROM posts WHERE id=:id;");
$stmt->bindValue(':id', $id, PDO::PARAM_INT);
$stmt->execute();
$post = $stmt->fetch();
```
- `bindValue()`
  - プレースホルダ名 `:id`、値 `$id`、値の型の指定 `PDO::PARAM_INT`

## プレースホルダに変数を紐づける
```php
$id = 2;
$stmt = $pdo->prepare("SELECT * FROM posts WHERE id=:id;");
$stmt->bindParam('id', $id, PDO::PARAM_INT);
$stmt->execute();
$posts = $stmt->fetch();

$id = 3;  // 値の更新
$stmt->execute(); // 更新した値でクエリを実行
$posts = $stmt->fetch();

```
- `bindParam()`
  - プレースホルダ名 `:id`、変数 `$id`、値の型の指定 `PDO::PARAM_INT`
- 変数を紐づけ、`execute()`のたびに変数を評価してクエリを実行する

## LIKEで抽出する場合の注意事項
```php
$day = "2022-07%";  // 前方一致の部分検索
$stmt = $pdo->prepare("SELECT * FROM posts WHERE day LIKE :day");
$stmt->execute([":day" => $day]);
$posts = $stmt->fetchAll();
```
- LIKEで検索する場合はプレースホルダの方ではなく値にキーワードをつける