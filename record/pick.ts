import isObject from "../pred/isObject.ts";

export default function pick<Key extends PropertyKey>(keys: Key[]) {
  return <T extends { [K in Key]: Pick<T, Key>[K] }>(
    obj: T
  ): { [K in Key]: Pick<T, Key>[K] } => {
    if (!isObject(obj)) throw new TypeError("Expected an object");
    const keyset = new Set<PropertyKey>(keys);
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => keyset.has(key))
    ) as { [K in Key]: Pick<T, Key>[K] };
  };
}
