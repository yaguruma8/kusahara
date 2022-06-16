'use strict';

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
