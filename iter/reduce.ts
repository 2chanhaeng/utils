/**
 * ```haskell
 * reduce::(a -> b -> a) -> a -> [b] -> [a]
 * ```
 *
 * Reduce an reducible object to a single value.
 *
 * @param {(prev: S, x: T, i: number) => S} f - The reducer function.
 * @param {S} init - The initial value for the accumulator.
 * @return {(iter: Iterable<T>) => S} A function that takes an iterable and returns the reduced value.
 *
 * @example
 * ```ts
 * const items = [1, 2, 3, 4, 5];
 * const result = reduce((acc, x) => acc + x, 0)(items);
 * console.log(result); // 15
 * ```
 */
export default function reduce<T, S>(
  f: (prev: S, x: T, i: number) => S,
  init: S,
): (iter: Iterable<T>) => S {
  return (iter: Iterable<T>) => Iterator.from(iter).reduce<S>(f, init);
}
