/**
 * ```haskell
 * get:: a -> { a: b } -> b
 * ```
 * Returns the value of the key in the object.
 */
export default function get<T extends PropertyKey>(
  key: T,
): <S extends { [K in T]: S[T] }>(obj: S) => S[T];
export default function get<T extends PropertyKey>(
  key: T,
): <S extends { [K in T]: S[T] }>(obj: S) => S[T] {
  return <S extends { [K in T]: S[T] }>(obj: S) => obj[key];
}
