'use strict';

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
