export default function take(n: number) {
  return function* <T>(iter: Iterable<T>) {
    yield* taker(Iterator.from(iter))(n);
  };
}

function taker<T>(iter: IteratorObject<T>) {
  return function* takerInner(n: number): Generator<T> {
    if (n <= 0) return;
    const curr = iter.next();
    if (curr.done) return;
    yield curr.value;
    yield* takerInner(n - 1);
  };
}
