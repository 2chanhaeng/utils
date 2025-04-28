/**
 * ```haskell
 * drop::Int -> [a] -> [a]
 * ```
 * Drop the first n elements of an iterable.
 */
export default function drop(
  n: number,
): <T>(iter: Iterable<T>) => Generator<T> {
  return function* <T>(iter: Iterable<T>): Generator<T> {
    yield* Iterator.from(iter).filter((_, i) => i >= n);
  };
}
