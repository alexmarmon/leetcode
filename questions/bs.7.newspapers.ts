/*
 * You've begun working in the one and only Umbristan, and it is part of your job duty to organize newspapers. Every morning, your fellow coworkers will dilligently read through the newspapers to examine its contents. It is your job to organize the newspapers into piles and hand them out to your coworkers to read through.
 * Each newspaper is marked with the time it would take to read through its contents. The newspapers are carefully laid out in a line in a particular order that must not be broken when assigning the newspapers. You cannot pick and choose newspapers randomly from the line to assign to a co-worker. Instead, you must take newspapers from a particular subsection of the line, make a pile and give that to a co-worker.
 * What is the minimum amount of time it would take to have your coworkers go through all the newspapers?
 *
 * Constraints
 * 1 <= newspapers_read_times.length <= 10^5
 * 1 <= newspapers_read_times[i] <= 10^5
 * 1 <= num_coworkers <= 10^5
 */

/*
 * Notes:
 * expect(findTotalTime([7, 2, 5, 10, 8], 2)).toEqual(18);
 * Minimum = max(readTimesArr) = 10
 * Max = sum(readTimesArr) = 32
 * Target Value = Minimum < X < Max = [10, 11, 12, ..., 31, 32]
 */

function someFeasibleFunc({ readTimesArr, coworkers, mid }): boolean {
  let time = 0;
  let numWorkers = 0;

  for (const readTime of readTimesArr) {
    if (time + readTime > mid) {
      time = 0;
      numWorkers += 1;
    }

    time += readTime;
  }

  if (time !== 0) {
    numWorkers += 1;
  }

  return numWorkers <= coworkers;
}

function findTotalTime(readTimesArr: number[], coworkers: number) {
  let minimumTime = Math.max(...readTimesArr);
  let maximumTime = readTimesArr.reduce((a, b) => a + b, 0);
  let actualMinimum = minimumTime;

  while (minimumTime <= maximumTime) {
    const mid = minimumTime + Math.floor((maximumTime - minimumTime) / 2);
    if (someFeasibleFunc({ readTimesArr, coworkers, mid })) {
      // remove right side aka all "true's" that direction
      actualMinimum = mid;
      maximumTime = mid - 1;
    } else {
      minimumTime = mid + 1;
    }
  }

  return actualMinimum;
}

test('simple tests', () => {
  expect(findTotalTime([7, 2, 5, 10, 8], 2)).toEqual(18);
  // expect(findTotalTime([2, 3, 5, 7], 3)).toEqual(7);
});
