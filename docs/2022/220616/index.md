2022/6/16
# FizzBuzz色々

## FizzBuzzの説明

[Fizz Buzz - Wikipedia](https://ja.wikipedia.org/wiki/Fizz_Buzz)

1から整数を順番に表示する。ただし、
- 3の倍数の時は数字の代わりに「Fizz」を表示する。
- 5の倍数の時は数字の代わりに「Buzz」を表示する。
- 15の倍数の時は数字の代わりに「FizzBuzz」を表示する。

## 条件

言語はJavaScript(strict mode)    
開始と終了の値を指定可能にする        
カンマ区切りの文字列で返却する

## [普通](js/normal.js)

```js
function doFizzBuzz(start = 1, end = 100) {
  let result = '';
  for (let i = start; i <= end; i++) {
    if (i % 15 === 0) {
      result += 'FizzBuzz';
    } else if (i % 5 === 0) {
      result += 'Buzz';
    } else if (i % 3 === 0) {
      result += 'Fizz';
    } else {
      result += `${i}`;
    }
    result += ',';
  }
  return result.slice(0, -1);
}

doFizzBuzz();
```

## [配列](js/array.js)
```js
function doFizzBuzz(start = 1, end = 100) {
  const result = Array.from([...new Array(end + 1)].keys());
  for (let i = 0; i <= end; i += 3) {
    result[i] = 'Fizz';
  }
  for (let i = 0; i <= end; i += 5) {
    result[i] = 'Buzz';
  }
  for (let i = 0; i <= end; i += 15) {
    result[i] = 'FizzBuzz'
  }
  return result.slice(start).toString()
}

doFizzBuzz();
```

## [配列とfillとmap](js/arrayfillmap.js)
```js
function doFizzBuzz(start = 1, end = 100) {
  return new Array(end + 1)
    .fill('')
    .map((v, i) => {
      if (i % 3 === 0) {
        v += 'Fizz';
      }
      if (i % 5 === 0) {
        v += 'Buzz';
      }
      if (!v) {
        v = `${i}`;
      }
      return v;
    })
    .slice(start)
    .toString();
}

doFizzBuzz();
```

## [三項演算子の三段重ね](js/ternary_operator.js)
```js
function doFizzBuzz(start = 1, end = 100) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(
      i % 15 === 0
        ? 'FizzBuzz'
        : i % 5 === 0
        ? 'Buzz'
        : i % 3 === 0
        ? 'Fizz'
        : `${i}`
    );
  }
  return result.toString();
}

doFizzBuzz();
```

## [クラスとメソッドチェーン](js/methodchain.js)
```js
class FizzBuzz {
  constructor(start = 1, end = 100) {
    this._start = start;
    this._end = end;
    this._fbArray = [...new Array(this._end - this._start + 1)].map((_, i) => {
      return i + this._start;
    });
  }

  fizz() {
    this._change(3, 'Fizz')
    return this;
  }

  buzz() {
    this._change(5, 'Buzz');
    return this;
  }

  fizzbuzz() {
    this._change(15, 'FizzBuzz');
    return this;
  }

  _change(num, str) {
    for (const [index, value] of this._fbArray.entries()) {
      if (value % num === 0) {
        this._fbArray[index] = str;
      }
    }
  }

  toString() {
    return this._fbArray.toString();
  }
}

new FizzBuzz().fizzbuzz().buzz().fizz().toString();
```

## [イテレータ](js/iteretor.js)
```js
class FizzBuzz {
  constructor(start = 1, end = 100) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      if (i % 15 === 0) {
        yield 'FizzBuzz';
      } else if (i % 5 === 0) {
        yield 'Buzz';
      } else if (i % 3 === 0) {
        yield 'Fizz';
      } else {
        yield `${i}`;
      }
    }
  }
}

function doFizzBuzz(start = 1, end = 100) {
  const result = [];
  for (const value of new FizzBuzz(start, end)) {
    result.push(value);
  }
  return result.toString();
}

doFizzBuzz();
```

## [ジェネレータで移譲](js/generator.js)
```js
function* fizzbuzz(num) {
  if (num % 15 === 0) {
    yield 'FizzBuzz';
  } else {
    yield* buzz(num);
  }
}

function* buzz(num) {
  if (num % 5 === 0) {
    yield 'Buzz';
  } else {
    yield* fizz(num);
  }
}

function* fizz(num) {
  if (num % 3 === 0) {
    yield 'Fizz';
  } else {
    yield num;
  }
}

function doFizzBuzz(start = 1, end = 100) {
  const result = [];
  for (let i = start; i <= end; i++) {
    for (const fb of fizzbuzz(i)) {
      result.push(fb);
    }
  }
  return result.toString();
}

doFizzBuzz();
```
