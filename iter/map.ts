import type { Mapper } from "types";
import enumerate from "./enumerate.ts";
import { isAsyncIterable, isMappable } from "pred";

/**
 * ```haskell
 * map::(a -> b) -> [a] -> [b]
 * ```
 * Map a function over an mappable object.
 */

export default function map<T, S>(
  f: Mapper<T, S>,
): {
  (iter: AsyncIterable<T>): AsyncGenerator<S>;
  (iter: Iterable<T>): Generator<S>;
};
export default function map<T, S>(
  f: Mapper<T, S>,
  iter: Iterable<T>,
): Generator<S>;
export default function map<T, S>(
  f: Mapper<T, S>,
  iter: AsyncIterable<T>,
): AsyncGenerator<S>;
export default function map<T, S>(
  f: Mapper<T, S>,
  iter?: Iterable<T> | AsyncIterable<T>,
):
  | Generator<S>
  | AsyncGenerator<S>
  | ((iter: Iterable<T>) => Generator<S>)
  | ((iter: AsyncIterable<T>) => AsyncGenerator<S>)
  | ((
    iter: Iterable<T> | AsyncIterable<T>,
  ) => Generator<S> | AsyncGenerator<S>) {
  return (iter === undefined)
    ? ((iter: Iterable<T> | AsyncIterable<T>) =>
      isAsyncIterable(iter) ? mapAsyncGen(f, iter) : mapGen(f, iter))
    : isAsyncIterable(iter)
    ? mapAsyncGen(f, iter)
    : mapGen(f, iter);
}

function* mapGen<T, S>(f: Mapper<T, S>, iter: Iterable<T>): Generator<S> {
  if (isMappable<T>(iter)) yield* Iterator.from(iter).map(f);
  else for (const [x, i] of enumerate(iter)) yield f(x, i);
}
async function* mapAsyncGen<T, S>(
  f: Mapper<T, S>,
  iter: AsyncIterable<T>,
): AsyncGenerator<S> {
  for await (const [x, i] of enumerate(iter)) yield f(x, i);
}
