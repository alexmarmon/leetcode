/*
 * @lc app=leetcode id=300 lang=typescript
 *
 * [300] Longest Increasing Subsequence
 */

// @lc code=start
function lengthOfLIS(nums: number[]): number {
  const sortedArr = [...nums].sort((a, b) => a - b);
  let longestTempArr = 1;

  sortedArr.forEach((value, index) => {
    let numsValueIndex = nums.indexOf(value);
    const slicedSortedArr = sortedArr.slice(index + 1);
    const tempArr = [value];
    slicedSortedArr.forEach((val) => {
      const numsSecondValIndex = nums.indexOf(val);
      if (numsSecondValIndex > numsValueIndex) {
        numsValueIndex = numsSecondValIndex;
        tempArr.push(val);
      }
    });
    if (tempArr.length > longestTempArr) {
      longestTempArr = tempArr.length;
    }
  });

  return longestTempArr;
}
// @lc code=end

test('300.longest-increasing-subsequence', () => {
  expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toStrictEqual(4);
  expect(lengthOfLIS([0, 1, 0, 3, 2, 3])).toStrictEqual(4);
  expect([7, 7, 7, 7, 7, 7, 7]).toStrictEqual(1);
});
