import type { ItersItems } from "types";

/**
 * ```haskell
 * zip::([a], [b], ...) -> [a, b, ...]
 * ```
 * Zip iterables together.
 */
export default function* zip<T extends Iterable<unknown>[]>(
  ...iters: T
): Generator<ItersItems<T>> {
  const iterators = iters.map(Iterator.from);
  while (true) {
    const results = iterators.map((iterator) => iterator.next());
    if (results.some((result) => result.done)) return;
    yield results.map((result) => result.value) as ItersItems<T>;
  }
}
