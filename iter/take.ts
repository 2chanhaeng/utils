/**
 * ```haskell
 * take::Int -> [a] -> [a]
 * ```
 * Take the first n elements of an iterable.
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
