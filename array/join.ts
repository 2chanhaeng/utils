/**
 * ```haskell
 * join::String -> [a] -> String
 * ```
 * Join array of strings with separator.
 * `Array.prototype.join`
 */
export default function join<T>(separator: string): (x: T[]) => string {
  return (x: T[]) => x.join(separator);
}
