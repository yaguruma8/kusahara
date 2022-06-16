'use strict';

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
