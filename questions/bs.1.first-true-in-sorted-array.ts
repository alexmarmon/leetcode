/*
 * binary search
 */

function findBoundary(arr) {
  let left = 0;
  let right = arr.length - 1;
  let boundaryIndex = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (!arr[mid]) {
      // discard left side
      left = mid + 1;
    } else {
      boundaryIndex = mid;
      right = mid - 1;
    }
  }

  return boundaryIndex;
}

test('simple tests', () => {
  expect(findBoundary([false, false, true, true, true])).toEqual(2);
  expect(findBoundary([true])).toEqual(0);
  expect(findBoundary([false, false, false])).toEqual(-1);
  expect(findBoundary([true, true, true, true, true])).toEqual(0);
  expect(findBoundary([false, true])).toEqual(1);
  expect(findBoundary([false, false, false, false, false, false, false, false, true])).toEqual(8);
});
