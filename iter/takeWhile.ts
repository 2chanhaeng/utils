import enumerate from "./enumerate.ts";

export default function takeWhile<T>(
  f: (x: T, i: number) => boolean
): (iter: Iterable<T>) => Generator<T> {
  return function* (iter: Iterable<T>): Generator<T> {
    yield* takeWhileGen(f, enumerate(iter));
  };
}

function* takeWhileGen<T>(
  f: (x: T, i: number) => boolean,
  iter: IteratorObject<[T, number]>
): Generator<T> {
  const curr = iter.next();
  if (curr.done || !f(...curr.value)) return;
  yield curr.value[0];
  yield* takeWhileGen(f, iter);
}
