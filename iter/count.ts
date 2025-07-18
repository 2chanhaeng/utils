/**
 * ```haskell
 * count::() -> [Int]
 * count::(Int) -> [Int]
 * count::(Int, Int) -> [Int]
 * ```
 *
 * Count from start to infinity by step.
 * Alias for `range` with `end=Infinity`.
 *
 * @param {number} start - The starting number.
 * @param {number} step - The step size.
 * @return {Generator<number>} An iterator that yields the counted numbers.
 *
 * @example
 * ```ts
 * for (const i of count(0, 2)) {
 *   console.log(i);
 * }
 * // 0, 2, 4, 6, 8, ...
 * ```
 */
export default function* count(start = 0, step = 1): Generator<number> {
  for (let i = start;; i += step) yield i;
}
