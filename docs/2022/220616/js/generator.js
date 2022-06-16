'use strict';

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
