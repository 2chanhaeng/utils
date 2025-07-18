/**
 * ```haskell
 * take::Int -> [a] -> [a]
 * ```
 *
 * Take the first n elements of an iterable.
 *
 * @param {number} n - The number of elements to take.
 * @return {(iter: Iterable<T>) => Generator<T>} A function that takes an iterable and returns a generator yielding the first n elements.
 *
 * @example
 * ```ts
 * const items = [1, 2, 3, 4, 5];
 * const firstTwo = take(2)(items);
 * console.log(Array.from(firstTwo)); // [1, 2]
 * ```
 */
export default function take(
  n: number,
): <T>(iter: Iterable<T>) => Generator<T> {
  return function* <T>(iter: Iterable<T>): Generator<T> {
    for (const item of iter) {
      if (n-- > 0) yield item;
      else return;
    }
  };
}
