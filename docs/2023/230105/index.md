2023/1/5

# URLのGETパラメータの取得に関する覚書: JavaScriptとPHP

## 取得方法の基本

URL例 : `https://example.com/?data1=hoge&data2=12345`

### PHP
`filter_input()`

https://www.php.net/manual/ja/function.filter-input.php

```php
// URL例) https://example.com/?data1=hoge&data2=12345

// data1の値を取得
filter_input(INPUT_GET, 'data1'); // 'hoge'
filter_input(INPUT_GET, 'data2'); // '12345'
```

### JavaScript
`new URL(document.location).searchParams`

https://developer.mozilla.org/ja/docs/Web/API/URL/searchParams

https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams

```javascript
// URL例) https://example.com/?data1=hoge&data2=12345

// data1の値を取得
// 現在のURLからsearchParamsオブジェクトを取得
const params = new URL(document.location).searchParams
// searchParamsオブジェクトからキーを指定して値を取得
const data1 = params.get('data1');  //  'hoge'
const data2 = params.get('data2');  //  '12345'

```

## 存在しないキーの場合

URL例 : `https://example.com/?data2=12345`

### PHP
```php
filter_input(INPUT_GET, 'data1'); // NULL
```

### JavaScript
```javascript
const params = new URL(document.location).searchParams;
const data1 = params.get('data1');  // null
```

PHP, JavaScript共に、存在しないキーの値を取得しようとした場合は`null`を返却する

## キーは存在するが空白の場合

URL例 : `https://example.com/?data1=&data2=12345`

### PHP
```php
filter_input(INPUT_GET, 'data1'); // ''
```

### JavaScript
```javascript
const params = new URL(document.location).searchParams;
const data1 = params.get('data1');  // ''
```
PHP, JavaScript共に空文字`''`を返却する


