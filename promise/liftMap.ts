import type { Refinement } from "types";

/**
 * ```haskell
 * liftMap::((a -> Bool), (a -> b), (unknown -> b)) -> Promise a -> Promise b
 * ```
 *
 * Lifts a filtering function and resolution/rejection handlers to operate on a Promise.
 *
 * @template T - The type of the input value.
 * @template S - The type of the resolved value.
 *
 * @param filter - A function that takes a value of type T and returns a boolean indicating whether the value passes the filter.
 * @param onResolved - A function that takes a value of type T and returns either a Promise of type S or a value of type S.
 * @param onRejected - A function that takes an unknown value and returns either a Promise of type S or a value of type S.
 *
 * @returns A function that takes a Promise of type T and returns a Promise of type S.
 *
 * @example
 * const isEven = (a) => a % 2 === 0;
 * const divideByTwo = (a) => a / 2;
 * const liftMapIsEven = liftMap(isEven, divideByTwo, () => 0);
 * console.log(await liftMapIsEven(Promise.resolve(2))); // Logs: 1
 * console.log(await liftMapIsEven(Promise.resolve(3))); // Logs: 0
 */
export default function liftMap<T, S>(
  filter: (a: T) => boolean,
  onResolved: (a: T) => Promise<S> | S,
  onRejected: (b: unknown) => Promise<S> | S,
): (a: T | Promise<T>) => Promise<S>;
export default function liftMap<T, S, U extends T>(
  filter: Refinement<T, U>,
  onResolved: (a: U) => Promise<S> | S,
  onRejected: (b: unknown) => Promise<S> | S,
): (a: T | Promise<T>) => Promise<S>;
export default function liftMap<T, S, U extends T>(
  filter: Refinement<T, U> | ((a: T) => boolean),
  onResolved: typeof filter extends Refinement<T, U> ? (a: U) => Promise<S> | S
    : (a: T) => Promise<S> | S,
  onRejected: (b: unknown) => Promise<S> | S,
): (a: T | Promise<T>) => Promise<S> {
  return (a: T | Promise<T>): Promise<S> =>
    Promise.resolve(a)
      .then((i) => filter(i) ? i : Promise.reject(i)).then(onResolved).catch(
        onRejected,
      );
}
