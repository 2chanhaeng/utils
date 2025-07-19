/**
 * ```haskell
 * trim :: string -> string
 * ```
 *
 * Trims whitespace from both ends of a string.
 *
 * @param {string} str - The string to trim.
 * @returns {string} The trimmed string.
 *
 * @example
 * ```ts
 * const result = trim("  Hello, World!  ");
 * console.log(result); // Output: "Hello, World!"
 * ```
 */
export default function trim(str: string): string {
  return str.trim();
}
