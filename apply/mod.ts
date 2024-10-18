import { isPromise } from "pred";

/**
 * ```haskell
 * apply::a -> (a -> b) -> b
 * apply::Promise a -> (a -> b) -> Promise b
 * apply::a -> (a -> Promise b) -> Promise b
 * apply::Promise a -> (a -> Promise b) -> Promise b
 * ```
 *
 * Apply a value to a function. If the value is a promise, the function will be applied to the resolved value of the promise.
 */
function apply<T, U>(
  x: Promise<T>,
  f: (arg: Awaited<T>) => Promise<U>
): Promise<Awaited<U>>;
function apply<T, U>(
  x: Promise<T>,
  f: (arg: Awaited<T>) => U
): Promise<Awaited<U>>;
function apply<T, U>(
  x: T,
  f: (arg: Awaited<T>) => Promise<U>
): Promise<Awaited<U>>;
function apply<T, U>(x: T, f: (arg: Awaited<T>) => U): U;
function apply<T, U>(
  x: Promise<T>
): {
  (f: (arg: Awaited<T>) => Promise<U>): Promise<Awaited<U>>;
  (f: (arg: Awaited<T>) => U): Promise<Awaited<U>>;
};
function apply<T, U>(
  x: T
): {
  (f: (arg: Awaited<T>) => Promise<U>): Promise<Awaited<U>>;
  (f: (arg: Awaited<T>) => U): U;
};
function apply<T, U>(
  x: T | Promise<T>,
  f?: (arg: Awaited<T>) => U | Promise<U>
):
  | U
  | Promise<Awaited<U>>
  | ((f: (arg: Awaited<T>) => U | Promise<U>) => U | Promise<Awaited<U>>) {
  if (f === undefined)
    return (fn: (arg: Awaited<T>) => U | Promise<U>) =>
      isPromise(x)
        ? apply(x, fn)
        : (fn(x as Awaited<T>) as U | Promise<Awaited<U>>);
  if (isPromise(x))
    return (x as Promise<T>).then((value) => f(value as Awaited<T>)) as Promise<
      Awaited<U>
    >;
  return f(x as Awaited<T>) as U;
}

export default apply;
