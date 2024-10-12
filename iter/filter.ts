type FilterFn<T> = (x: T, i: number) => boolean;

export default function filter<T>(
  f: FilterFn<T>
): (iter: T[] | IteratorObject<T>) => Generator<T>;
export default function filter<T>(
  f: FilterFn<T>,
  iter: T[] | IteratorObject<T>
): Generator<T>;
export default function* filter<T>(
  f: FilterFn<T>,
  iter?: T[] | IteratorObject<T>
): Generator<T> | ((iter: IteratorObject<T>) => Generator<T>) {
  if (iter === undefined) return (iter: IteratorObject<T>) => filter(f, iter);
  yield* iter.filter(f);
}
