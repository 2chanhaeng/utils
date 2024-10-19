/**
 * ```haskell
 * append::a -> [b] -> [a, [b]]
 * ```
 * Prepends an element to the start of an iterable.
 */
export default function prepend<T>(x: T): (iter: Iterable<T>) => Generator<T>;
export default function prepend<T, S>(
  x: T,
): (iter: Iterable<S>) => Generator<T | S>;
export default function prepend<T, S>(
  x: T,
): (iter: Iterable<S>) => Generator<T | S> {
  return function* (iter: Iterable<S>) {
    yield x;
    yield* iter;
  };
}
