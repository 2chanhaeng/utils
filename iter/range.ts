/**
 * ```haskell
 * range::(Int) -> [Int]
 * range::(Int, Int) -> [Int]
 * range::(Int, Int, Int) -> [Int]
 * ```
 *
 * Range of integers from start to end with step.
 * Inspired by Python's `range` function.
 * [Proposal stage 2](https://github.com/tc39/proposal-iterator.range) on TC39.
 *
 * @param {number} start - The starting value of the range.
 * @param {number} [end] - The ending value of the range. If not provided, `start` is used as the end and `0` as the start.
 * @param {number} [step=1] - The step value for the range.
 * @return {Generator<number>} A generator that yields numbers in the specified range.
 *
 * @example
 * ```ts
 * const rangeGen = range(1, 5, 2);
 * console.log(Array.from(rangeGen)); // [1, 3]
 * ```
 */
export default function range(end: number): Generator<number>;
export default function range(start: number, end: number): Generator<number>;
export default function range(
  start: number,
  end: number,
  step: number,
): Generator<number>;
export default function* range(start: number, end?: number, step = 1) {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) yield i;
}
