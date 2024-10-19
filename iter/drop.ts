/**
 * ```haskell
 * drop::Int -> [a] -> [a]
 * ```
 * Drop the first n elements of an iterable.
 */
export default function drop(
  n: number,
): <T>(iter: Iterable<T>) => Generator<T> {
  return function* <T>(iter: Iterable<T>): Generator<T> {
    yield* dropper(Iterator.from(iter))(n);
  };
}

function dropper<T>(iter: IteratorObject<T>): (n: number) => Generator<T> {
  return function* dropInner(n: number): Generator<T> {
    if (n <= 0) yield* iter;
    else if (iter.next().done) return;
    else yield* dropInner(n - 1);
  };
}
