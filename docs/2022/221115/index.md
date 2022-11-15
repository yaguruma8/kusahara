2022/11/15

# JavaScriptでの閏年の判定方法

## 普通に

```javascript
function isLeapYear(year) {
  return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
}
```
- 閏年の条件は
  - 4で割り切れて、かつ、100で割り切れない
  - または、400で割り切れる


## JavaScriptのDateオブジェクトを利用する

```javascript
function isLeapYear(year) {
  return new Date(year, 2, 0).getDate() === 29;
}
```

- `new Date(year, month, date)`
- `year` : 判定したい年を引数で渡す
- `month` : 2
  - JavaScriptでは月は0始まりのため3月
- `date` : 0
  - `month` の0日目 = 前の月の最終日

よってこの条件で作成されたDateオブジェクトから`getDate()`することにより、その年の2月の最終日の日付が返ってくる


日付が29であるならば閏年、そうでなければ平年