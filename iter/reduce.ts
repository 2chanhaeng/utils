import type { Reducer } from "types";
import { isIterable, isIterator, isReducible } from "pred";
import enumerate from "./enumerate.ts";

/**
 * ```haskell
 * reduce::(a -> b -> a) -> a -> [b] -> [a]
 * ```
 * Reduce an reducible object to a single value.
 */
export default function reduce<T, S>(
  f: Reducer<T, S>,
): {
  (init: S): {
    (iter: AsyncIterable<T>): Promise<S>;
    (iter: Iterable<T>): S;
  };
  (init: S, iter: AsyncIterable<T>): Promise<S>;
  (init: S, iter: Iterable<T>): S;
};
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init: S,
): (iter: Iterable<T>) => S;
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init: S,
): (iter: AsyncIterable<T>) => Promise<S>;
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init: S,
  iter: Iterable<T>,
): S;
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init: S,
  iter: AsyncIterable<T>,
): Promise<S>;
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init?: S,
  iter?: Iterable<T> | AsyncIterable<T>,
):
  | S
  | Promise<S>
  | ((iter: Iterable<T>) => S)
  | ((iter: AsyncIterable<T>) => Promise<S>)
  | ((init: S, iter?: Iterable<T>) => S | ((iter: Iterable<T>) => S))
  | ((
    init: S,
    iter?: AsyncIterable<T>,
  ) => Promise<S> | ((iter: AsyncIterable<T>) => Promise<S>)) {
  if (init === undefined) {
    return (init: S, iter?: Iterable<T>) =>
      iter === undefined
        ? (iter: Iterable<T>) => reduce(f, init, iter)
        : reduce(f, init, iter);
  }
  if (iter === undefined) return (iter: Iterable<T>) => reduce(f, init, iter);
  if (isIterable(iter)) return reduceSync(f, init, iter);
  return reduceAsync(f, init, iter);
}

function reduceSync<T, S>(
  f: Reducer<T, S>,
  init: S,
  iter: Iterable<T>,
): S {
  if (isReducible<T>(iter)) {
    if (Array.isArray(iter)) return iter.reduce(f, init);
    if (isIterator(iter)) return iter.reduce(f, init);
    return iter.reduce(f, init);
  } else return Iterator.from(iter).reduce(f, init);
}

async function reduceAsync<T, S>(
  f: Reducer<T, S>,
  init: S,
  iter: AsyncIterable<T>,
): Promise<S> {
  let acc = init;
  for await (const [x, i] of enumerate(iter)) acc = f(acc, x, i);
  return acc;
}
