/**
 * ```haskell
 * split::string -> string -> string[]
 * ```
 *
 * Splits a string by a separator.
 *
 * @param {string} separator - The separator to split the string by.
 * @returns {(x: string) => string[]} A function that takes a string and returns an array of strings.
 *
 * @example
 * ```ts
 * const result = split(",")("foo,bar,baz");
 * console.log(result); // Output: ["foo", "bar", "baz"]
 * ```
 */
export default function split(separator: string): (x: string) => string[] {
  return (x: string) => x.split(separator);
}
