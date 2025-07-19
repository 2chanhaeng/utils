/**
 * ```haskell
 * pluck::[a] -> { a: b } -> { a: b }
 * pluck::[c] -> { a: b } -> { c: undefined }
 * pluck::[c], d -> { a: b } -> { c: d }
 * ```
 *
 * Returns a new object with only the specified keys if the keys exist.
 * If the keys do not exist, it returns an object with those keys set to undefined.
 *
 * @param {Key[]} keys - An array of keys to pluck from the object.
 * @param {DefaultValue} [defaultValue] - A default value to use if the key does not exist in the object.
 * @returns {(obj: Partial<T>) => (Record<Key, K extends keyof T ? (T[K] | DefaultValue) : DefaultValue>} A new object with the specified keys and their values from the original object, or the default value if the key does not exist.
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: 2 };
 * const plucked = pluck(['a', 'c'], 0)(obj);
 * console.log(plucked); // { a: 1, c: 0 }
 * ```
 */
export default function pluck<
  Key extends PropertyKey,
  DefaultValue,
>(
  keys: Key[] | IterableIterator<Key>,
  defaultValue?: DefaultValue,
): <T extends object>(
  obj: Partial<T>,
) => {
  [K in Key]: K extends keyof T ? T[K] : DefaultValue;
} {
  return <T extends object>(obj: Partial<T>): {
    [K in Key]: K extends keyof T ? T[K] : DefaultValue;
  } => {
    return Object.fromEntries(
      Iterator.from(keys)
        .map((key) => [key, obj[key as (keyof T & Key)] ?? defaultValue]),
    ) as {
      [K in Key]: K extends keyof T ? T[K] : DefaultValue;
    };
  };
}
