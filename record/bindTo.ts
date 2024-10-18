/**
 * ```haskell
 * bindTo::a -> b -> { [a]: b }
 * ```
 * Returns a new object with the key bound to the value.
 */
export default function bindTo<K extends PropertyKey>(key: K) {
  return <T>(value: T) => ({ [key]: value } as { [P in K]: T });
}
