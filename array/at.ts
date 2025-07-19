/**
 * ```haskell
 * at::Int -> [a] -> a
 * at::(Int, a) -> [a] -> a
 * ```
 *
 * Returns the element at the specified index in the array, or a default value if the index is out of bounds.
 * If the index is negative, it counts from the end of the array.
 * `Array.prototype.at`
 *
 * @param {number} index - The index of the element to retrieve.
 * @param {S} [defaultValue] - The value to return if the index is out of bounds.
 * @return {(iter: ArrayLike<T>) => T | S} A function that takes an iterable and returns the element at the specified index or the default value.
 *
 * @example
 * ```ts
 * const items = [1, 2, 3, 4, 5];
 * const result = at(2)(items);
 * console.log(result); // 3
 * ```
 */
export default function at<S>(
  index: number,
  defaultValue?: S,
): <T>(iter: ArrayLike<T>) => T | S {
  return <T>(iter: ArrayLike<T>): T | S =>
    (Array.isArray(iter) ? iter : Array.from(iter)).at(index) ?? defaultValue;
}
