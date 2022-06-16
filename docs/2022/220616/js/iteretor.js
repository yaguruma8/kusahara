'use strict';

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
