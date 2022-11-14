/*
 * binary search
 */

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      // discard left half
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

test('simple tests', () => {
  expect(binarySearch([1, 2, 3, 4, 5, 6, 7], 0)).toEqual(-1);
  expect(binarySearch([2, 8, 89, 120, 1000], 120)).toEqual(3);
});
