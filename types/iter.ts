export type Iterables<T> = T[] | IteratorObject<T> | ReadonlyArray<T>;

export type Mapper<T, S> = (x: T, i: number) => S;
export type Mappable<T> =
  | Iterables<T>
  | { map: <U>(f: Mapper<T, U>) => Mappable<U> };

export type Predicate<T> = (x: T, i: number) => boolean;
/**
 * Function that returns any value except functions.
 * Exclude functions that return a function to prevent mistakes.
 */
export type PredicateLike<T> = (
  x: T,
  i: number
) => Exclude<unknown, (...x: unknown[]) => unknown>;
/**
 * Container that can be filtered.
 */
export type Filterable<T> =
  | Iterables<T>
  | { filter: (f: Predicate<T>) => Filterable<T> };

export type Reducer<T, U> = (
  previousValue: U,
  currentValue: T,
  currentIndex: number
) => U;
export type Reducible<T> =
  | Iterables<T>
  | { reduce: <U>(f: Reducer<T, U>, init: U) => U };

export type ItersItems<T extends Iterable<unknown>[]> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? Head extends Iterable<infer Item>
    ? Tail extends Iterable<unknown>[]
      ? [Item, ...ItersItems<Tail>]
      : [Item]
    : never
  : never;
