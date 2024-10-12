export default function* product<T, S = T>(
  iter: IteratorObject<T>,
  ...iters: IteratorObject<S>[]
): Generator<[T, ...S[]]> {
  if (iters.length === 0) for (const x of iter) yield [x];
  else
    for (const x of iter)
      for (const xs of product<S>(iters[0], ...iters.slice(1)))
        yield [x, ...xs];
}
