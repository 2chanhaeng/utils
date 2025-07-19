import type _accumulate from "./accumulate.ts";

/**
 * ```haskell
 * scan::(a -> a -> a) -> [a] -> [a]
 * scan::(a -> a -> Int -> a) -> [a] -> [a]
 * ```
 *
 * Returns an iterator that accumulates the elements of the iterable.
 * Synonyms for {@link _accumulate accumulate}, but it uses the first element
 * of the iterable as the initial value.
 *
 * @param {(acc: T, curr: T, index: number) => T} f - The accumulator function.
 * @return {Generator<S>} An iterator that yields the accumulated values.
 *
 * @example
 * ```ts
 * Array.from(scan((acc, curr) => acc + curr, [1, 2, 3, 4, 5]));
 * // [1, 3, 6, 10, 15]
 * ```
 */
export default function scan<T>(
  f: (acc: T, curr: T, index: number) => T,
): (iter: Iterable<T>) => Generator<T> {
  return function* (iter: Iterable<T>): Generator<T> {
    const iterator = Iterator.from(iter)
      .map((value, index) => [value, index] as const);
    const { done, value } = iterator.next();
    if (done) return (function* () {})();
    let acc: T;
    yield acc = value[0];
    for (const [value, index] of iterator) {
      yield acc = f(acc, value, index);
    }
  };
}
