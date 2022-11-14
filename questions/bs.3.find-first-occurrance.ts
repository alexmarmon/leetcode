/*
 * binary search
 */

function findFirstOccurance(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let firstOccurance = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      firstOccurance = mid;
      // discard right side
      right = mid - 1;
    } else if (arr[mid] > target) {
      // also discard right side
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return firstOccurance;
}

test('simple tests', () => {
  expect(findFirstOccurance([1, 3, 3, 3, 3, 6, 10, 10, 10, 100], 3)).toEqual(1);
  expect(findFirstOccurance([2, 3, 5, 7, 11, 13, 17, 19], 6)).toEqual(-1);
  expect(findFirstOccurance([2, 3, 5, 7, 11], 2)).toEqual(0);
});
