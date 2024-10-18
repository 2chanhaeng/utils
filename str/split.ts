/**
 * ```haskell
 * split::string -> string -> string[]
 * ```
 * Splits a string by a separator.
 */
export default function split(separator: string): (x: string) => string[] {
  return (x: string) => x.split(separator);
}
