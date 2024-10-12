export default function* zip<T, S>(
  // TODO: approve type safety
  ...iters: (T[] | IteratorObject<T>)[]
): Generator<[T, ...S[]]> {
  const iterators = iters.map((iter) =>
    Array.isArray(iter) ? Iterator.from(iter) : iter
  );
  while (true) {
    const nexts = iterators.map((iter) => iter.next());
    if (nexts.some(({ done }) => done)) break;
    yield nexts.map(({ value }) => value) as [T, ...S[]];
  }
}
