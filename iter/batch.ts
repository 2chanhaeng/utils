import { toArray } from "array";
import take from "./take.ts";

/**
 * ```haskell
 * batch::Int -> [a] -> [[a]]
 * ```
 * Split an iterable into batches of given size.
 */
export default function batch(
  size: number,
): <T>(iter: Iterable<T>) => Generator<T[]> {
  return function* <T>(iter: Iterable<T>): Generator<T[]> {
    yield* batcher(size, Iterator.from(iter));
  };
}

function* batcher<T>(size: number, iter: IteratorObject<T>): Generator<T[]> {
  while (true) {
    const batch = toArray(take(size)(iter));
    if (!batch.length) return;
    yield batch;
  }
}
