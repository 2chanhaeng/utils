/**
 * ```haskell
 * to :: (a -> b) -> a -> b
 * ```
 *
 * Converts a class constructor into a function that creates an instance of that class.
 * @param {T} cls - The class constructor to convert.
 * @return {(...args: ConstructorParameters<T>) => InstanceType<T>} A function that takes the same parameters as the class constructor
 */
// Use `any` cause `unknown` is not working
// deno-lint-ignore no-explicit-any
export default function to<T extends new (...args: any[]) => InstanceType<T>>(
  cls: T,
): (...args: ConstructorParameters<T>) => InstanceType<T> {
  return (...args: ConstructorParameters<T>): InstanceType<T> =>
    new cls(...args);
}
