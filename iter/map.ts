type MapFn<T, S> = (x: T, i: number) => S;

export default function map<T, S>(
  f: MapFn<T, S>
): (iter: T[] | IteratorObject<T>) => Generator<S>;
export default function map<T, S>(
  f: MapFn<T, S>,
  iter: T[] | IteratorObject<T>
): Generator<S>;
export default function* map<T, S>(
  f: MapFn<T, S>,
  iter?: T[] | IteratorObject<T>
): Generator<S> | ((iter: T[] | IteratorObject<T>) => Generator<S>) {
  if (iter === undefined)
    return (iter: T[] | IteratorObject<T>) => map(f, iter);
  yield* iter.map(f);
}
