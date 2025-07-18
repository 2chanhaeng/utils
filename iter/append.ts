/**
 * ```haskell
 * append::a -> [b] -> [...[b], a]
 * ```
 *
 * Appends an element to the end of an iterable.
 *
 * @param {T} x - The element to append.
 * @return {Generator<T | S>} An iterator that yields the original elements followed by the appended element.
 *
 * @example
 * ```ts
 * Array.from(append(4, [1, 2, 3]));
 * // [1, 2, 3, 4]
 * ```
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
