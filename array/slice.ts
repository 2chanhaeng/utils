/**
 * ```haskell
 * slice::Int -> [a] -> [a]
 * slice::(Int, Int) -> [a] -> [a]
 * ```
 *
 * Returns a new array containing the elements from the original array starting from the given index.
 * `Array.prototype.slice`
 *
 * @param {number} start - The index at which to start slicing the array.
 * @param {number} [end] - The index at which to end slicing the array. If not provided, it slices to the end of the array.
 * @return {(x: T[]) => T[]} A function that takes an array and returns a new array containing the sliced elements
 *
 * @example
 * ```ts
 * const items = [1, 2, 3, 4, 5];
 * const result = slice(1, 3)(items);
 * console.log(result); // [2, 3]
 * ```
 */
export default function slice(start: number, end?: number): <T>(x: T[]) => T[] {
  return <T>(x: T[]) => x.slice(start, end);
}
