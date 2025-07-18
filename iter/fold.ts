/**
 * ```haskell
 * fold::(a, a) -> [a] -> a
 * fold::(a, a, Int) -> [a] -> a
 * ```
 *
 * Fold an iterable to a single value.
 * {@link reduce} with the first element as the initial value.
 *
 * @param {(acc: T, x: T, i: number) => T} f - The folding function.
 * @return {(iter: Iterable<T>) => T} A function that takes an iterable and returns the folded value.
 *
 * @example
 * ```ts
 * const items = [1, 2, 3, 4, 5];
 * const result = fold((acc, x) => acc + x)(items);
 * console.log(result); // 15
 * ```
 */
export default function fold<T>(
  f: (acc: T, x: T, i: number) => T,
): (iter: Iterable<T>) => T {
  return (iter: Iterable<T>) => Iterator.from(iter).reduce(f);
}
