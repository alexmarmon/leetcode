/*
 * @lc app=leetcode id=13 lang=typescript
 *
 * [13] Roman to Integer
 */

// @lc code=start
type RomanChar = 'I' | 'V' | 'X' | 'L' | 'C' | 'D' | 'M';
type RomanCombo = 'IV' | 'IX' | 'XL' | 'XC' | 'CD' | 'CM';
type RomanPair = [RomanChar, number];
type RomanSubPair = [RomanCombo, number];

const pairs: RomanPair[] = [
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
];

const subPairs: RomanSubPair[] = [
  ['IV', 4],
  ['IX', 9],
  ['XL', 40],
  ['XC', 90],
  ['CD', 400],
  ['CM', 900],
];

function romanToInt(s: string): number {
  const finalValueArray: number[] = [];
  let roman: string = s;

  // check for combos
  for (const [, [romanCombo, value]] of subPairs.entries()) {
    if (roman.includes(romanCombo)) {
      roman = roman.replace(romanCombo, '');
      finalValueArray.push(value);
    }
  }

  // grab remaining values
  roman.split('').forEach((symbol) => {
    const [, value] = pairs.find(([sym]) => sym === symbol);
    finalValueArray.push(value);
  });

  // return the sum
  return finalValueArray.reduce((a, b) => a + b, 0);
}
// @lc code=end

test('1.two-sum', () => {
  expect(romanToInt('III')).toStrictEqual(3);
  expect(romanToInt('LVIII')).toStrictEqual(58);
  expect(romanToInt('MCMXCIV')).toStrictEqual(1994);
});
