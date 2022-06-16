'use strict';

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
