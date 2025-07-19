/**
 * ```haskell
 * merge:: a -> b -> a & b
 * ```
 *
 * Merges two objects into one.
 * Later keys override earlier keys.
 *
 * @param {T} obj1 - The first object to merge.
 * @returns {(obj2: S) => { [K in keyof T | keyof S]: K extends keyof S ? S[K]
 *   : K extends keyof T ? T[K]
 *   : never; }} A function that takes the second object and returns a new object with the merged properties.
 * @returns {{ [K in keyof T | keyof S]: K extends keyof
 */
export default function merge<T>(obj1: T): <S>(obj2: S) => {
  [K in keyof T | keyof S]: K extends keyof S ? S[K]
    : K extends keyof T ? T[K]
    : never;
};
export default function merge<T, S>(
  obj1: T,
  obj2: S,
): {
  [K in keyof T | keyof S]: K extends keyof S ? S[K]
    : K extends keyof T ? T[K]
    : never;
};
export default function merge<
  T,
  S,
  M = {
    [K in keyof T | keyof S]: K extends keyof S ? S[K]
      : K extends keyof T ? T[K]
      : never;
  },
>(obj1: T, obj2?: S): M | ((obj2: S) => M) {
  if (obj2) return Object.assign({}, obj1, obj2) as M;
  return (obj2: S) => Object.assign({}, obj1, obj2) as M;
}
