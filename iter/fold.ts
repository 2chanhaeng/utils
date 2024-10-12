import reduce from "./reduce.ts";

export default function fold<T>(
  f: (acc: T, x: T, i: number) => T
): (iter: T[] | IteratorObject<T>) => T;
export default function fold<T>(
  f: (acc: T, x: T, i: number) => T,
  iter: T[] | IteratorObject<T>
): T;
export default function fold<T>(
  f: (acc: T, x: T, i: number) => T,
  iter?: T[] | IteratorObject<T>
): T | ((iter: IteratorObject<T>) => T) {
  if (iter === undefined)
    return (iter: T[] | IteratorObject<T>) => fold(f, iter);
  if (Array.isArray(iter)) return reduce(f, iter[0], iter.slice(1));
  return reduce<T, T>(f, iter.next().value as T, iter);
}
