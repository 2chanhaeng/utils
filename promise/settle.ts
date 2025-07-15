/**
 * ```haskell
 * settle::(T -> S) -> [T] -> [Either S Error]
 * ```
 * Creates a generator that processes an iterable of promises or values,
 * applying a function to each value and returning a promise that resolves
 * to the result of that function. The generator yields promises that
 * resolve to the results of applying the function,
 * wrapped in a `PromiseSettledResult` object.
 * Inspired by `Promise.allSettled`.
 * @param {(x: T) => S} f A function that takes a value of type T and returns a value of type S.
 * @returns {(xs: Iterable<PromiseLike<T> | T>) => Generator<Promise<PromiseSettledResult<Awaited<S>>>>} A generator that yields promises that resolve to the results of applying f to the input values.
 *
 * @example
 * ```ts
 * const isEven = (i: number) => i % 2 === 0 ? i : raise("Odd");
 * const settled = settle(isEven)([0, 1, 2, 3, 4]);
 * const results = await toArray(settled);
 * results.forEach((i) =>
 *   i.status === "fulfilled"
 *     ? console.log("Even:", i.value)
 *     : console.error(i.reason)
 * );
 * // Output:
 * // Even: 0
 * // Error: Odd // Error stacks
 * // Even: 2
 * // Error: Odd // Error stacks
 * // Even: 4
 * ```
 */
export default function settle<T, S>(f: (x: T) => S): (
  xs: Iterable<PromiseLike<T> | T>,
) => Generator<Promise<PromiseSettledResult<Awaited<S>>>> {
  return function* (
    xs: Iterable<PromiseLike<T> | T>,
  ): Generator<Promise<PromiseSettledResult<Awaited<S>>>> {
    for (const x of xs) {
      yield (Promise.resolve(x).then(f) as Promise<Awaited<S>>).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason }),
      );
    }
  };
}
