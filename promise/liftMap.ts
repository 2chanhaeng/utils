import type { Refinement } from "types";

/**
 * ```haskell
 * liftMap::((a -> Bool), (a -> b), (a -> b)) -> a -> b
 * ```
 * Applies a filter function to a value and then applies one of two functions based on the result of the filter.
 *
 * @template T - The type of the input value.
 * @template S - The type of the output value.
 * @template U - A subtype of T that satisfies the filter predicate.
 *
 * @param filter - A predicate function that determines which of the two functions to apply.
 * @param onTrue - A function to apply if the filter predicate returns true. Can return a value or a promise.
 * @param onFalse - A function to apply if the filter predicate returns false. Can return a value or a promise.
 *
 * @returns A function that takes a value (or a promise of a value) and returns a promise of the result of either the onTrue or onFalse function.
 *
 * @example
 * ```ts
 * const isEven = (n: number): boolean => n % 2 === 0;
 * const double = (n: number): number => n * 2;
 * const triple = (n: number): number => n * 3;
 *
 * const processNumber = liftMap(isEven, double, triple);
 *
 * processNumber(4).then(console.log); // 8
 * processNumber(5).then(console.log); // 15
 * ```
 */
export default function liftMap<T, S, U extends T>(
  filter: (a: T) => Promise<ReturnType<Refinement<T, U>>>,
  onTrue: (a: U) => Promise<S> | S,
  onFalse: (b: T) => Promise<S> | S,
): (a: T | Promise<T>) => Promise<S>;
export default function liftMap<T, S>(
  filter: (a: T) => Promise<boolean>,
  onTrue: (a: T) => Promise<S> | S,
  onFalse: (b: T) => Promise<S> | S,
): (a: T | Promise<T>) => Promise<S>;
export default function liftMap<T, S, U extends T>(
  filter: (a: T) => a is U,
  onTrue: (a: U) => Promise<S> | S,
  onFalse: (b: T) => Promise<S> | S,
): (a: T | Promise<T>) => Promise<S>;
export default function liftMap<T, S>(
  filter: (a: T) => boolean,
  onTrue: (a: T) => Promise<S> | S,
  onFalse: (b: T) => Promise<S> | S,
): (a: T | Promise<T>) => Promise<S>;
export default function liftMap<T, S, U extends T>(
  filter:
    | ((a: T) => Promise<ReturnType<Refinement<T, U>>>)
    | ((a: T) => Promise<boolean>)
    | ((a: T) => a is U)
    | ((a: T) => boolean),
  onTrue: typeof filter extends ((a: T) => a is U) ? (a: U) => Promise<S> | S
    : (a: T) => Promise<S> | S,
  onFalse: (b: T) => Promise<S> | S,
): (a: T | Promise<T>) => Promise<S> {
  return (a: T | Promise<T>): Promise<S> =>
    Promise.resolve(a)
      .then(async (i) => await filter(i) ? onTrue(i as U) : onFalse(i));
}
