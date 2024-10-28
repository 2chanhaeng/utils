/**
 * Separates the properties of an object into two objects based on the provided keys.
 *
 * @template K - The type of the keys to be separated.
 * @template S - The type of the values in the object.
 * @template T - The type of the object being separated.
 *
 * @param {K[]} keys - An array of keys to be picked from the object.
 * @returns {(obj: T) => [{ [P in K]: T[P] }, { [P in Exclude<keyof T, K>]: T[P] }]}
 *          A function that takes an object and returns a tuple of two objects:
 *          - The first object contains the picked properties.
 *          - The second object contains the remaining properties.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const [picked, omitted] = separate(['a', 'c'])(obj);
 * console.log(picked); // { a: 1, c: 3 }
 * console.log(omitted); // { b: 2 }
 */
export default function separate<K extends string>(
  keys: K[],
): <S, T extends { [key in string]: S }>(
  obj: T,
) => [{ [P in K]: T[P] }, { [P in Exclude<keyof T, K>]: T[P] }] {
  return <S, T extends { [key in string]: S }>(
    obj: T,
  ): [{ [P in K]: T[P] }, { [P in Exclude<keyof T, K>]: T[P] }] => {
    const picked = {} as { [P in K]: T[P] };
    const omitted = { ...obj };
    for (const key of keys) {
      picked[key] = obj[key];
      delete omitted[key];
    }
    return [picked, omitted as { [P in Exclude<keyof T, K>]: T[P] }];
  };
}
