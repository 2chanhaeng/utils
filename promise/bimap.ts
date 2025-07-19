/**
 * ```haskell
 * bimap::((a -> b), (c -> b)) -> Promise a -> Promise b
 * Transforms the result of a promise by applying one of two functions depending on whether the promise is resolved or rejected.
 *
 * @template T - The type of the value that the input promise resolves to.
 * @template S - The type of the value that the resulting promise resolves to.
 * @param onResolved - A function to handle the resolved value of the input promise. It can return either a value of type `S` or a promise that resolves to `S`.
 * @param onRejected - A function to handle the rejected value of the input promise. It can return either a value of type `S` or a promise that resolves to `S`.
 * @returns A function that takes a promise of type `T` and returns a promise of type `S`, applying the appropriate transformation based on whether the input promise is resolved or rejected.
 *
 * @example
 * ```ts
 * const doubleOrZero = bimap((a) => a * 2, () => 0);
 * console.log(await doubleOrZero(Promise.resolve(3))); // Logs: 6
 * console.log(await doubleOrZero(Promise.reject("error"))); // Logs: 0
 * ```
 */
export default function bimap<T, S, U>(
  onResolved: (a: T) => Promise<S> | S,
  onRejected: (b: U) => Promise<S> | S,
): (a: T | Promise<T>) => Promise<S> {
  return (a: T | Promise<T>): Promise<S> =>
    Promise.resolve(a).then(onResolved).catch(onRejected);
}
