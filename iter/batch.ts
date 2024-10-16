import { toArray } from "array";
import take from "./take.ts";

export default function batch(size: number) {
  return function* <T>(iter: Iterable<T>) {
    yield* batcher(size)(Iterator.from(iter));
  };
}

function batcher(size: number) {
  return function* batcherInner<T>(iter: IteratorObject<T>): Generator<T[]> {
    const batch = toArray(take(size)(iter));
    if (!batch.length) return;
    yield batch;
    yield* batcherInner(iter);
  };
}
