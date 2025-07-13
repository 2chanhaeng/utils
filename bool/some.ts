/**
 * ```haskell
 * some :: (a -> Bool) -> [a] -> Bool
 * ```
 *
 * Returns true if at least one value in the iterable satisfies the predicate function.
 * @param {(x: T, i: number) => boolean} f - The predicate function to test each element.
 * @returns {(iter: Iterable<T>) => boolean} A function that takes an iterable and returns true if at least one element satisfies the predicate.
 */
export default function some<T>(
  f: (x: T, i: number) => boolean,
): (iter: Iterable<T>) => boolean {
  return (iter: Iterable<T>): boolean => {
    let i = 0;
    for (const x of iter) {
      if (f(x, i++)) return true;
    }
    return false;
  };
}
