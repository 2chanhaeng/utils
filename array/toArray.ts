/**
 * Convert iterable to array.
 * Alias for `Array.from`.
 *
 * @param {Iterable<T>} iter - The iterable to convert to an array.
 * @return {T[]} An array containing the elements of the iterable.
 * @example
 * ```ts
 * const items = new Set([1, 2, 3]);
 * const array = toArray(items);
 * console.log(array); // [1, 2, 3]
 * ```
 */
export default function toArray<T>(iter: Iterable<T>): T[] {
  return Array.from(iter);
}
