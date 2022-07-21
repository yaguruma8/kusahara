22/7/21

# PHPのDateTimeオブジェクトに関する覚書

公式:    
[DateTime クラス](https://www.php.net/manual/ja/class.datetime.php)    
[DateTimeImmutable クラス](https://www.php.net/manual/ja/class.datetimeimmutable.php)


## DateTime（DateTimeImmutable)オブジェクト

```php
$date = new DateTime();
var_dump($date);
// object(DateTime)#3 (3) {    
//   ["date"]=>    
//   string(26) "2022-07-21 12:28:46.436049"    
//   ["timezone_type"]=>    
//   int(3)    
//   ["timezone"]=>    
//   string(3) "UTC"    
// }
```
- 引数なしの場合は現在時刻（timezoneに従う）
- timezoneはphp.iniで設定している場合はその設定に従う

`php.ini`
```ini
[date]
; PHPで使用される日付や時刻の標準の時間帯
date.timezone=Asia/Tokyo
```

```php
$date = new DateTime();
var_dump($date);
// object(DateTime)#1 (3) {
//   ["date"]=>
//   string(26) "2022-07-21 21:31:19.032836"
//   ["timezone_type"]=>
//   int(3)
//   ["timezone"]=>
//   string(10) "Asia/Tokyo"
// }
```
## DateTimeとDateTimeImmutableの違い

### DateTime : ミュータブル
```php
$date1 = new DateTime();
var_dump($date1);
// object(DateTime)#2 (3) {
//   ["date"]=>
//   string(26) "2022-07-21 12:35:27.574108"
//   略
// }
$date2 = $date1->modify('+1 days');
var_dump($date1 === $date2);
// bool(true)
// $date1のデータが in place で modify される
var_dump($date1);
// object(DateTime)#2 (3) {
//   ["date"]=>
//   string(26) "2022-07-22 12:35:27.574108" // +1 day
//   略
// }
```

### DateTimeImmutable : イミュータブル
```php
$date1 = new DateTimeImmutable();
 var_dump($date1);
// object(DateTimeImmutable)#3 (3) {
//   ["date"]=>
//   string(26) "2022-07-21 12:39:15.030887"
//   略
// }
$date2 = $date1->modify('+1 days');
var_dump($date1 === $date2);
// bool(false)
// $date1を modify した新しいDateTimeImmutableオブジェクトを作成
var_dump($date1);
// object(DateTimeImmutable)#3 (3) {
//   ["date"]=>
//   string(26) "2022-07-21 12:39:15.030887"  // 変化なし
//   略
// }
```

- 近頃のトレンド考えるとなるべくDateTimeImmutableを使って新しいオブジェクトを作成する方が良いと思う

## DateTime(DateTimeImmutable)に渡す初期値について
```php
$date1 = new DateTime('20220101');
$date1 = new DateTime('2022/01/01');
$date1 = new DateTime('2022-01-01');
$date1 = new DateTime('22-01-01');
// object(DateTime)#2 (3) {
//   ["date"]=>
//   string(26) "2022-01-01 00:00:00.000000"  // 22年1月1日
//   ["timezone_type"]=>
//   int(3)
//   ["timezone"]=>
//   string(3) "UTC"
// }

$date1 = new DateTime('220101');
$date1 = new DateTime('22:01:01');
$date1 = new DateTime('22:1:1');
// object(DateTime)#2 (3) {
//   ["date"]=>
//   string(26) "2022-07-21 22:01:01.000000"  // 22時1分1秒
//   ["timezone_type"]=>
//   int(3)
//   ["timezone"]=>
//   string(3) "UTC"
// }

$date1 = new DateTime('0101');
$date1 = new DateTime('01:01');
$date1 = new DateTime('1:1');
// object(DateTime)#3 (3) {
//   ["date"]=>
//   string(26) "2022-07-21 01:01:00.000000"  // 1時1分
//   ["timezone_type"]=>
//   int(3)
//   ["timezone"]=>
//   string(3) "UTC"
// }

$date1 = new DateTime('22/01/01');  // エラー
$date1 = new DateTime('2022/1/1');  // エラー

```
