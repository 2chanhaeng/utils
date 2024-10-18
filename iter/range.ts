/**
 * ```haskell
 * range::(Int, Int, Int) -> [Int]
 * ```
 * Range of integers from start to end with step.
 */
export default function range(start: number): Generator<number>;
export default function range(start: number, end: number): Generator<number>;
export default function range(
  start: number,
  end: number,
  step: number
): Generator<number>;
export default function* range(start: number, end?: number, step = 1) {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) yield i;
}
