/**
 * ```haskell
 * get:: a -> { a: b } -> b
 * ```
 * Returns the value of the key in the object.
 */
export default function get<T extends PropertyKey>(key: T) {
  return <S>(obj: { [K in T]: S }) => obj[key];
}
