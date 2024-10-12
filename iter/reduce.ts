type Reducer<T, S> = (initial: S, current: T, index: number) => S;

export default function reduce<T>(
  f: Reducer<T, T>,
  init: T
): (iter: T[] | IteratorObject<T>) => T;
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init: S
): (iter: T[] | IteratorObject<T>) => S;
export default function reduce<T>(
  f: Reducer<T, T>,
  init: T,
  iter: T[] | IteratorObject<T>
): T;
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init: S,
  iter: T[] | IteratorObject<T>
): S;
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init: S,
  iter?: T[] | IteratorObject<T>
): S | ((iter: T[] | IteratorObject<T>) => S) {
  if (iter === undefined)
    return (iter: T[] | IteratorObject<T>) => reduce(f, init, iter);
  return Array.isArray(iter) ? iter.reduce(f, init) : iter.reduce(f, init);
}
