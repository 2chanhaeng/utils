import { isObject } from "pred";

/**
 * ```haskell
 * pluck::[a] -> { a: b } -> { a: b }
 * pluck::[c] -> { a: b } -> { c: undefined }
 * pluck::[c], d -> { a: b } -> { c: d }
 * ```
 * Returns a new object with only the specified keys if the keys exist.
 * If the keys do not exist, it returns an object with those keys set to undefined.
 * Throws a TypeError if the input is not an object.
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
  [K in Key]: K extends keyof T ? (T[K] | DefaultValue) : DefaultValue;
} {
  return <T extends object>(
    obj: Partial<T>,
  ): {
    [K in Key]: K extends keyof T ? (T[K] | DefaultValue) : DefaultValue;
  } => {
    if (!isObject(obj)) throw new TypeError("Expected an object");
    return Object.fromEntries(
      Iterator.from(keys)
        .map((key) => [key, obj[key as (keyof T & Key)] ?? defaultValue]),
    ) as {
      [K in Key]: K extends keyof T ? (T[K] | DefaultValue) : DefaultValue;
    };
  };
}
