/**
 * ```haskell
 * slice::Int -> [a] -> [a]
 * slice::(Int, Int) -> [a] -> [a]
 * ```
 * Returns a new array containing the elements from the original array starting from the given index.
 * `Array.prototype.slice`
 */
export default function slice(start: number, end?: number): <T>(x: T[]) => T[] {
  return <T>(x: T[]) => x.slice(start, end);
}
