/*
 * @lc app=leetcode id=1 lang=typescript
 *
 * [1] Two Sum
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i += 1) {
    // if target minus the current number exists in the array,
    // we have a sum match between the two.
    const match = nums.indexOf(target - nums[i]);

    // also ensure we're not using the same index twice
    if (match > -1 && match !== i) {
      return [i, match];
    }
  }

  return [];
}
// @lc code=end

test('1.two-sum', () => {
  expect(twoSum([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
  expect(twoSum([3, 2, 4], 6)).toStrictEqual([1, 2]);
  expect(twoSum([3, 3], 6)).toStrictEqual([0, 1]);
  expect(twoSum([2, 7, 11, 15], 26)).toStrictEqual([2, 3]);
});
