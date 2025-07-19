import type _scan from "./scan.ts";

/**
 * ```haskell
 * accumulate::(a -> b -> a) -> [b] -> [a]
 * accumulate::(a -> b -> Int -> a) -> [b] -> [a]
 * ```
 *
 * Returns an iterator that accumulates the elements of the iterable.
 * Synonyms for {@link _scan scan}, but it uses the provided initial value.
 *
 * @param {(acc: S, curr: T, index: number) => T} f - The accumulator function.
 * @param {S} init - The initial value for the accumulator.
 * @return {Generator<S>} An iterator that yields the accumulated values.
 *
 * @example
 * ```ts
 * Array.from(accumulate((acc, curr) => acc + curr, 0, [1, 2, 3, 4, 5]));
 * // [0, 1, 3, 6, 10, 15]
 * ```
 */
export default function accumulate<T, S>(
  f: (acc: S, curr: T, index: number) => S,
  init: S,
): (iter: Iterable<T>) => Generator<S> {
  return function* (
    iter: Iterable<T>,
  ): Generator<S> {
    let acc: S = init;
    yield acc;
    const iterator = Iterator.from(iter)
      .map((value, index) => [value, index] as const);
    for (const [value, index] of iterator) {
      yield acc = f(acc, value, index);
    }
  };
}
