export default function accumulate<T>(
  f: (acc: T, curr: T) => T
): (iter: Iterable<T>) => Generator<T>;
export default function accumulate<T>(
  f: (acc: T, curr: T) => T,
  init: T
): (iter: Iterable<T>) => Generator<T>;
export default function accumulate<T, S>(
  f: (acc: S, curr: T) => S,
  init?: S
): (iter: Iterable<T>) => Generator<S>;
export default function accumulate<T, S>(
  f: (acc: S | T, curr: T) => S | T,
  init?: S | T
) {
  if (init === undefined)
    return function* (iter: Iterable<T>) {
      const iterator = Iterator.from(iter);
      const first = iterator.next();
      if (first.done) return;
      yield* accumulator(f as (acc: T, curr: T) => T, first.value, iterator);
    };
  return function* (iter: Iterable<T>) {
    yield* accumulator(f, init, Iterator.from(iter));
  };
}
function* accumulator<T, S>(
  f: (acc: S, curr: T) => S,
  prev: S,
  iter: IteratorObject<T>
): Generator<S> {
  yield prev;
  const curr = iter.next();
  if (curr.done) return;
  yield* accumulator(f, f(prev, curr.value), iter);
}
