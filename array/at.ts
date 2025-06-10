/**
 * ```haskell
 * at::Int -> [a] -> a
 * @param index
 * @param defaultValue
 * @returns
 */
export default function at<S>(
  index: number,
  defaultValue?: S,
): <T>(iter: ArrayLike<T>) => T | S {
  return <T>(iter: ArrayLike<T>): T | S =>
    (Array.isArray(iter) ? iter : Array.from(iter)).at(index) ?? defaultValue;
}
