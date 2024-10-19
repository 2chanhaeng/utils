/**
 * ```haskell
 * append::a -> [b] -> [[b], a]
 * ```
 * Appends an element to the end of an iterable.
 */
export default function append<T>(x: T): (iter: Iterable<T>) => Generator<T>;
export default function append<T, S>(
  x: T,
): (iter: Iterable<S>) => Generator<T | S>;
export default function append<T, S>(
  x: T,
): (iter: Iterable<S>) => Generator<T | S> {
  return function* (iter: Iterable<S>) {
    yield* iter;
    yield x;
  };
}
