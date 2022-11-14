/*
 * @lc app=leetcode id=20 lang=typescript
 *
 * [20] Valid Parentheses
 */

// @lc code=start
function isValid(s: string): boolean {
  const stack = [];
  const map = {
    '[': ']',
    '{': '}',
    '(': ')',
  };

  for (let i = 0; i < s.length; i += 1) {
    // if we encounter an opening bracket, push a corresponding
    // closing bracket on to the stack
    const char = s[i];
    if (map[char]) {
      stack.push(map[char]);
    } else if (char !== stack.pop()) {
      // otherwise, we found a closing bracket. Make sure it
      // matches, the last item pushed.
      return false;
    }
  }

  return stack.length === 0;
}
// @lc code=end

test('ex 1', () => {
  expect(isValid('()')).toBe(true);
  expect(isValid('[()]')).toBe(true);
  expect(isValid('{[()]}}')).toBe(false);
  expect(isValid('()[]{}')).toBe(true);
  expect(isValid(')[]{}(')).toBe(false);
  expect(isValid('(]')).toBe(false);
});
