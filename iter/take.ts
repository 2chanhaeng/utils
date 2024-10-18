/**
 * ```haskell
 * take::Int -> [a] -> [a]
 * ```
 * Take the first n elements of an iterable.
 */
export default function take(
  n: number
): <T>(iter: Iterable<T>) => Generator<T> {
  return function* <T>(iter: Iterable<T>): Generator<T> {
    yield* taker(Iterator.from(iter))(n);
  };
}

function taker<T>(iter: IteratorObject<T>): (n: number) => Generator<T> {
  return function* takerInner(n: number): Generator<T> {
    if (n <= 0) return;
    const curr = iter.next();
    if (curr.done) return;
    yield curr.value;
    yield* takerInner(n - 1);
  };
}
