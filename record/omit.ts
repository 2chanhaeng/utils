/**
 * Omit specified keys from an object.
 *
 * @template K - The type of keys to omit.
 * @template S - The type of the values in the object.
 * @template T - The type of the object.
 *
 * @param {K[]} keys - An array of keys to omit from the object.
 * @returns {function(T): Omit<T, K>} A function that takes an object and returns a new object with the specified keys omitted.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = omit(['a', 'c'])(obj);
 * console.log(result); // { b: 2 }
 */
export default function omit<K extends string>(
  keys: K[],
): <S, T extends { [key in string]: S }>(
  obj: T,
) => { [P in Exclude<keyof T, K>]: T[P] } /* Omit<T, K> */ {
  return <S, T extends { [key in string]: S }>(
    obj: T,
  ): { [P in Exclude<keyof T, K>]: T[P] } => {
    const result = { ...obj };
    for (const key of keys) {
      delete result[key];
    }
    return result;
  };
}
