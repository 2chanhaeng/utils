/**
 * ```haskell
 * toArray::Iterable a -> [a]
 * ```
 * Convert iterable to array.
 * `Array.from`
 */
export default function toArray<T>(array: Iterable<T>): T[] {
  return Array.from(array);
}
