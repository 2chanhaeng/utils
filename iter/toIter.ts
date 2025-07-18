/**
 * Convert iterable to an iterator object.
 * Alias for `Iterator.from`.
 *
 * @param {Iterable<T>} iter - The input to be converted to an iterator.
 * @return {IteratorObject<T>} `IteratorObject` of the input type.
 *
 * @example
 * ```ts
 * const items = [1, 2, 3];
 * const iterator = toIter(items);
 * console.log(iterator.next().value); // 1
 * console.log(iterator.next().value); // 2
 * console.log(iterator.next().value); // 3
 * console.log(iterator.next().done); // true
 * ```
 */
export default function toIter<T>(
  iter: Iterable<T>,
): IterableIterator<T> {
  return Iterator.from(iter);
}
