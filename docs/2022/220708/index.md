22/7/8

# SQLite3のカラムに使用できるデータタイプ

公式 
[SQLite](https://sqlite.org/index.html)    
[SQLite Documentation](https://sqlite.org/docs.html)    
[Datatypes In SQLite](https://sqlite.org/datatype3.html)

## 基本

### SQLiteの型クラス
- **NULL** NULL値
- **INTEGER** 符号付き整数 値の大きさに応じて0、1、2、3、4、6、または8バイトで格納される
- **REAL** 浮動小数点数 8バイトのIEEE浮動小数点数として格納される
- **TEXT** テキスト文字列 データベースエンコーディング(UTF-8、UTF-16BE、またはUTF-16LE)を使用して保存される
- **BLOB** データの塊で、入力されたとおりに格納される

### 真偽値
真偽値のデータクラスはないがTRUE/FALSEキーワードは認識する。ただし格納されるのは整数リテラル。
- 1 : TRUE
- 0 : FALSE

### Date
組み込みの日付・時間関数は TEXT, REAL, INTEGER に対応する。
- TEXT : ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS")
- INTEGER: UNIX Timeの秒数(1970/1/1 UTC〜)
- REAL : 先発グレゴリオ暦

参考 : [Date And Time Functions](https://sqlite.org/lang_datefunc.html)

## カラムの型親和性

通常、他のデータベースではカラムに格納される型は厳密に定義されているが、SQLiteにおいては型は推奨されるものであって必須**ではない**。    
基本的にカラムにはどのようなデータ型でも格納できるが、選択肢がある場合は指定した型を優先する。これを型親和性という。

それぞれのカラムには下記のいずれかの型親和性が割り当てられる。
- TEXT
- NUMERIC
- INTEGER
- REAL
- BLOB

![img](img/affinity_Name%20_examples.png)

※ SQLiteではたとえば`VARCHAR(100)`と指定した場合でも、それ以上の文字を格納することができる。あくまで推奨に過ぎないことに注意する。    
※ 厳密に型を割り当てるテーブルを作成することも可能。（CREATE TABLE 時に指定）
[STRICT Tables](https://sqlite.org/stricttables.html)

続く