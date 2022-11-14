/*
 * binary search
 */

function findFirstEl(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let firstEl = 0;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      firstEl = mid;
      right = mid - 1;
    }
  }

  return firstEl;
}

test('simple tests', () => {
  expect(findFirstEl([1, 3, 3, 5, 8, 8, 10], 2)).toEqual(1);
  expect(findFirstEl([2, 3, 5, 7, 11, 13, 17, 19], 6)).toEqual(3);
});
