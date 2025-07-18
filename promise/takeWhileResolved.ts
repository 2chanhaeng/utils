import settle from "./settle.ts";

/**
 * ```haskell
 * takeWhileResolved::(T -> S) -> [T] -> [S]
 * ```
 *
 * Creates an async generator that processes an iterable of promises or values,
 * applying a function to each value and yielding the results until a promise is rejected.
 * @param {(x: T) => S} f A function that takes a value of type T and returns a value of type S.
 * @returns {(xs: Iterable<PromiseLike<T> | T>) => AsyncGenerator<Awaited<S>>} An async generator that yields the results of applying f to the input values until a promise is rejected.
 *
 * @example
 * ```ts
 * const isEven = (i: number) => i % 2 === 0 ? Promise.resolve(i) : Promise.reject("Odd");
 * const results = takeWhileResolved(isEven)([0, 2, 4, 5, 6]);
 * for await (const result of results) {
 *   console.log("Even:", result);
 * }
 * // Output:
 * // Even: 0
 * // Even: 2
 * // Even: 4
 * ```
 */
export default function takeWhileResolved<T, S>(
  f: (x: T) => S,
): (xs: Iterable<PromiseLike<T> | T>) => AsyncGenerator<Awaited<S>> {
  return async function* (
    xs: Iterable<PromiseLike<T> | T>,
  ): AsyncGenerator<Awaited<S>> {
    for await (const fx of settle(f)(xs)) {
      if (fx.status === "fulfilled") yield fx.value;
      else return;
    }
  };
}
