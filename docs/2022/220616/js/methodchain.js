'use strict';

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
