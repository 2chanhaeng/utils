import isPromise from "../pred/isPromise.ts";

/**
 * @module apply
 * /**
 * ```haskell
 * apply::a -> (a -> b) -> b
 * apply::Promise a -> (a -> b) -> Promise b
 * apply::a -> (a -> Promise b) -> Promise b
 * apply::Promise a -> (a -> Promise b) -> Promise b
 * ```
 *
 * Apply a value to a function. If the value is a promise, the function will be applied to the resolved value of the promise.
 *
 * @template T - The type of the input value.
 * @template U - The type of the output value.
 *
 * @param {T | Promise<T>} x - The input value or a promise of the input value.
 * @param {(arg: Awaited<T>) => U | Promise<U>} [f] - The function to apply to the input value.
 *
 * @returns {U | Promise<Awaited<U>> | ((f: (arg: Awaited<T>) => U | Promise<U>) => U | Promise<Awaited<U>>)}
 * - The result of applying the function to the input value, or a function that takes a function and returns the result of applying it to the input value.
 *
 * @example
 * ```typescript
 * const result = apply(Promise.resolve(5), x => x * 2); // Promise<number>
 * const result = apply(5, x => x * 2); // number
 * const result = apply(Promise.resolve(5))(x => x * 2); // Promise<number>
 * const result = apply(5)(x => x * 2); // number
 * ```
 */
function apply<T, U>(
  x: Promise<T>,
  f: (arg: Awaited<T>) => Promise<U>,
): Promise<Awaited<U>>;
function apply<T, U>(
  x: Promise<T>,
  f: (arg: Awaited<T>) => U,
): Promise<Awaited<U>>;
function apply<T, U>(
  x: T,
  f: (arg: Awaited<T>) => Promise<U>,
): Promise<Awaited<U>>;
function apply<T, U>(x: T, f: (arg: Awaited<T>) => U): U;
function apply<T, U>(
  x: Promise<T>,
): {
  (f: (arg: Awaited<T>) => Promise<U>): Promise<Awaited<U>>;
  (f: (arg: Awaited<T>) => U): Promise<Awaited<U>>;
};
function apply<T, U>(
  x: T,
): {
  (f: (arg: Awaited<T>) => Promise<U>): Promise<Awaited<U>>;
  (f: (arg: Awaited<T>) => U): U;
};
function apply<T, U>(
  x: T | Promise<T>,
  f?: (arg: Awaited<T>) => U | Promise<U>,
):
  | U
  | Promise<Awaited<U>>
  | ((f: (arg: Awaited<T>) => U | Promise<U>) => U | Promise<Awaited<U>>) {
  if (f === undefined) {
    return (fn: (arg: Awaited<T>) => U | Promise<U>) =>
      isPromise(x)
        ? apply(x, fn)
        : (fn(x as Awaited<T>) as U | Promise<Awaited<U>>);
  }
  if (isPromise(x)) {
    return (x as Promise<T>).then((value) => f(value as Awaited<T>)) as Promise<
      Awaited<U>
    >;
  }
  return f(x as Awaited<T>) as U;
}

export default apply;
