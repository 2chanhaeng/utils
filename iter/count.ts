/**
 * ```haskell
 * count::(Int, Int) -> [Int]
 * ```
 * Count from start to infinity by step.
 */
export default function* count(start = 0, step = 1): Generator<number> {
  for (let i = start; ; i += step) yield i;
}
