/*
 * binary search
 * n > n+1 === T/F
 */

function findThePeak(arr) {
  let left = 0;
  let right = arr.length - 1;
  let boundaryIndex = 0;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] > arr[mid + 1]) {
      // remove right half
      boundaryIndex = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return boundaryIndex;
}

test('simple tests', () => {
  expect(findThePeak([0, 1, 2, 3, 2, 1, 0])).toEqual(3);
  expect(findThePeak([0, 10, 3, 2, 1, 0])).toEqual(1);
  expect(findThePeak([0, 10, 0])).toEqual(1);
  expect(findThePeak([0, 1, 2, 12, 22, 32, 42, 52, 62, 72, 82, 92, 102, 112, 122, 132, 133, 132, 111, 0])).toEqual(16);
});
