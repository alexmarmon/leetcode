/*
 * binary search
 */

function sqrtApprox(n) {
  if (n === 0) return 0;
  let left = 0;
  let right = n;
  let currentApprox = 0;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (mid * mid === n) {
      return mid;
    }

    if (mid * mid > n) {
      currentApprox = mid;
      // discard right hand side
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return currentApprox - 1;
}

test('simple tests', () => {
  expect(sqrtApprox(16)).toEqual(4);
  expect(sqrtApprox(8)).toEqual(2);
});
