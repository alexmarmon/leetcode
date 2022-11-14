/*
 * @lc app=leetcode id=2 lang=typescript
 *
 * [2] Add Two Numbers
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 */

class ListNode {
  val: number;

  // eslint-disable-next-line no-use-before-define
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

//

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {}
// @lc code=end
