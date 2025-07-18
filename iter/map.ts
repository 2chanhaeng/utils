/**
 * ```haskell
 * map::(a -> b) -> [a] -> [b]
 * ```
 *
 * Map a function over an mappable object.
 *
 * @param {(x: T, i?: number) => S} f - The mapping function.
 * @return {(iter: Iterable<T>) => IterableIterator<S>} A function that takes an iterable and returns an iterable iterator.
 *
 * @example
 * ```ts
 * const items = [1, 2, 3, 4, 5];
 * const result = Array.from(map(x => x * 2)(items));
 * console.log(result); // [2, 4, 6, 8, 10]
 * ```
 */
export default function map<T, S>(
  f: {
    (x: T): S;
    (x: T, i: number): S;
  },
): (iter: Iterable<T>) => IterableIterator<S> {
  return (iter: Iterable<T>) => Iterator.from(iter).map(f);
}
