/**
 * ```haskell
 * every :: (a -> Bool) -> [a] -> Bool
 * ```
 *
 * Returns true if every value in the iterable satisfies the predicate function.
 * @param {(x: T, i: number) => boolean} f - The predicate function to test each element.
 * @returns {(iter: Iterable<T>) => boolean} A function that takes an iterable and returns true if every element satisfies the predicate.
 */
export default function every<T>(
  f: (x: T, i: number) => boolean,
): (iter: Iterable<T>) => boolean {
  return (iter: Iterable<T>): boolean => {
    let i = 0;
    for (const x of iter) {
      if (!f(x, i++)) return false;
    }
    return true;
  };
}
