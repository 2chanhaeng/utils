/**
 * ```haskell
 * accumulate::((a, b) -> a) -> a -> [b] -> [a]
 * accumulate::((a, b, Int) -> a) -> a -> [b] -> [a]
 * ```
 *
 * Returns an iterator that accumulates the elements of the iterable.
 *
 * @param {(acc: S, curr: T, index: number) => T} f - The accumulator function.
 * @param {S} init - The initial value for the accumulator.
 * @return {Generator<S>} An iterator that yields the accumulated values.
 *
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
export default function accumulate<T>(
  f: (acc: T, curr: T, index: number) => T,
  init: T,
): (iter: Iterable<T>) => Generator<T>;
export default function accumulate<T, S, R = S | T>(
  f: (acc: R extends S ? S : T, curr: T, index: number) => R extends S ? S : T,
  init?: R extends S ? S : T,
): (iter: Iterable<T>) => R extends S ? Generator<S> : Generator<T> {
  if (init === undefined) {
    return function (iter: Iterable<T>): R extends S ? Generator<never>
      : Generator<T> {
      const iterator = Iterator.from(iter);
      const init = iterator.next();
      if (init.done) {
        return (function* () {})() as R extends S ? Generator<never>
          : Generator<never>;
      }
      return accumulate<T>(
        f as unknown as (acc: T, curr: T, index: number) => T,
        init.value,
      )(iterator) as R extends S ? Generator<never> : Generator<T>;
    };
  }
  return function* (
    iter: Iterable<T>,
    // @ts-ignore: TypeScript cannot properly infer the conditional return type
  ): R extends S ? Generator<S> : Generator<T> {
    let acc: R extends S ? S : T = init;
    yield acc;
    const iterator = Iterator.from(iter)
      .map((value, index) => [value, index] as const);
    for (const [value, index] of iterator) {
      yield acc = f(acc, value, index);
    }
  };
}
