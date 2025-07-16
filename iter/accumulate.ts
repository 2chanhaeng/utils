import enumerate from "./enumerate.ts";

/**
 * ```haskell
 * accumulate::((a, b) -> a) -> a -> [b] -> [a]
 * accumulate::((a, b, Int) -> a) -> a -> [b] -> [a]
 * ```
 *
 * Returns an iterator that accumulates the elements of the iterable.
 * @param {(acc: S, curr: T, index: number) => T} f - The accumulator function.
 * @param {S} init - The initial value for the accumulator.
 * @return {Generator<S>} An iterator that yields the accumulated values.
 * @example
 * ```ts
 * Array.from(accumulate((acc, curr) => acc + curr, 0, [1, 2, 3, 4, 5]));
 * // [0, 1, 3, 6, 10, 15]
 * ```
 */
export default function accumulate<T>(
  f: (acc: T, curr: T, index: number) => T,
): (iter: Iterable<T>) => Generator<T>;
export default function accumulate<T, S>(
  f: (acc: S, curr: T, index: number) => S,
  init: S,
): (iter: Iterable<T>) => Generator<S>;
export default function accumulate<T, S>(
  f: (acc: S | T, curr: T, index: number) => S | T,
  init?: S,
): (iter: Iterable<T>) => Generator<S | T> {
  if (init === undefined) {
    return function (iter: Iterable<T>): Generator<T> {
      const iterator = Iterator.from(iter);
      const init = iterator.next();
      if (init.done) return (function* () {})();
      return accumulate(f, init.value)(iterator) as Generator<T>;
    };
  }
  return function* (iter: Iterable<T>): Generator<S> {
    let acc: S;
    yield acc = init;
    for (const [value, index] of enumerate(iter)) {
      yield acc = f(acc, value, index) as S;
    }
  };
}
