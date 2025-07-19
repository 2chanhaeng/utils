/**
 * ```haskell
 * join::String -> [a] -> String
 * ```
 *
 * Join array of strings with separator.
 * `Array.prototype.join`
 *
 * @param {string} separator - The string to separate each element.
 * @return {(x: T[]) => string} A function that takes an array and returns a joined string.
 *
 * @example
 * ```ts
 * const items = ['apple', 'banana', 'cherry'];
 * const result = join(', ')(items);
 * console.log(result); // "apple, banana, cherry"
 * ```
 */
export default function join<T>(separator: string): (x: T[]) => string {
  return (x: T[]) => x.join(separator);
}
