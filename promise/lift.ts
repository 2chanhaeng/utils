import type { Refinement } from "types";

/**
 * ```haskell
 * lift::(a -> Bool) -> Promise a -> Promise a
 * ```
 * Lifts a filter function to operate on a promise.
 *
 * @template T - The type of the value contained in the promise.
 * @param filter - A function that takes a value of type T and returns a boolean.
 * @returns A function that takes a promise of type T and returns a promise of type T.
 *          The returned promise resolves if the filter function returns true for the value,
 *          otherwise it rejects.
 *
 * @example
 * const isEven = (a) => a % 2 === 0;
 * const liftIsEven = lift(isEven);
 * console.log(await liftIsEven(Promise.resolve(2))); // Logs: 2
 * console.log(await liftIsEven(Promise.resolve(3))); // Throws an error
 */
export default function lift<T, S extends T>(
  filter: Refinement<T, S>,
): (a: Promise<T> | T) => Promise<S>;
export default function lift<T>(
  filter: (a: T) => boolean,
): (a: Promise<T> | T) => Promise<T>;
export default function lift<T, S extends T>(
  filter: Refinement<T, S>,
  a: Promise<T>,
): Promise<S>;
export default function lift<T, S extends T>(
  filter: Refinement<T, S>,
  a: T,
): Promise<S>;
export default function lift<T>(
  filter: (a: T) => boolean,
  a: Promise<T>,
): Promise<T>;
export default function lift<T>(
  filter: (a: T) => boolean,
  a: T,
): Promise<T>;
export default function lift<T, S extends T>(
  filter: Refinement<T, S> | ((a: T) => boolean),
  a?: Promise<T> | T,
):
  | (typeof filter extends Refinement<T, S> ? Promise<S> : Promise<T>)
  | ((
    a: Promise<T>,
  ) => typeof filter extends Refinement<T, S> ? Promise<S> : Promise<T>) {
  if (a === undefined) {
    return (a: Promise<T> | T) =>
      lift(
        filter as typeof filter extends Refinement<T, S> ? Refinement<T, S>
          : (a: T) => boolean,
        Promise.resolve(a),
      ) as typeof filter extends Refinement<T, S> ? Promise<S> : Promise<T>;
  }
  return Promise.resolve(a).then((i) =>
    filter(i)
      ? (i as typeof filter extends Refinement<T, S> ? S : T)
      : Promise.reject(i as T)
  );
}
