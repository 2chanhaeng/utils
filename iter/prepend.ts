/**
 * ```haskell
 * append::a -> [b] -> [a, [b]]
 * ```
 *
 * Prepends an element to the start of an iterable.
 *
 * @param {T} x - The element to prepend.
 * @return {(iter: Iterable<S>) => Generator<T | S>} A function that takes an iterable and returns a generator yielding the prepended element followed by the elements of the iterable.
 *
 * @example
 * ```ts
 * const items = [2, 3, 4];
 * const result = prepend(1)(items);
 * console.log(Array.from(result)); // [1, 2, 3, 4]
 * ```
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
