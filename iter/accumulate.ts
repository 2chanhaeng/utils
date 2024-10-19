import enumerate from "./enumerate.ts";

/**
 * ```haskell
 * accumulate::((a, b) -> a) -> a -> [b] -> [a]
 * accumulate::((a, b, Int) -> a) -> a -> [b] -> [a]
 * ```
 * Returns an iterator that accumulates the elements of the iterable.
 */
export default function accumulate<T>(
  f: (acc: T, curr: T, index: number) => T,
): (iter: Iterable<T>) => Generator<T>;
export default function accumulate<T>(
  f: (acc: T, curr: T, index: number) => T,
  init: T,
): (iter: Iterable<T>) => Generator<T>;
export default function accumulate<T, S>(
  f: (acc: S, curr: T, index: number) => S,
  init?: S,
): (iter: Iterable<T>) => Generator<S>;
export default function accumulate<T, S>(
  f: (acc: S | T, curr: T, index: number) => S | T,
  init?: S | T,
) {
  if (init === undefined) {
    return function* (iter: Iterable<T>) {
      const iterator = Iterator.from(iter);
      const first = iterator.next();
      if (first.done) return;
      yield* accumulator(
        f as (acc: T, curr: T, index: number) => T,
        first.value,
        enumerate(iterator),
      );
    };
  }
  return function* (iter: Iterable<T>) {
    yield* accumulator(f, init, enumerate(iter));
  };
}
function* accumulator<T, S>(
  f: (acc: S, curr: T, index: number) => S,
  prev: S,
  iter: IteratorObject<[T, number]>,
): Generator<S> {
  yield prev;
  const curr = iter.next();
  if (curr.done) return;
  yield* accumulator(f, f(prev, ...curr.value), iter);
}
