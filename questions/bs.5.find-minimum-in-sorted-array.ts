/*
 * binary search
 */

function minInSortedArr(arr) {
  let left = 0;
  let right = arr.length - 1;
  let min = 0;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] > arr[arr.length - 1]) {
      // remove everything to the left
      left = mid + 1;
    } else {
      min = mid;
      right = mid - 1;
    }
  }

  return min;
}

test('simple tests', () => {
  expect(minInSortedArr([30, 40, 50, 10, 20])).toEqual(3);
  expect(minInSortedArr([3, 5, 7, 11, 13, 17, 19, 2])).toEqual(7);
});
