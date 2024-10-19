/**
 * Iterable types with helper methods(e.g. map, filter, ...).
 * Array and IteratorObject(Iterator in JS).
 */
export type Iterables<T> = T[] | IteratorObject<T> | ReadonlyArray<T>;

/**
 * Function that maps a value to another value.
 */
export type Mapper<T, S> = (x: T, i: number) => S;
/**
 * Container that can be mapped over.
 */
export type Mappable<T> =
  | Iterables<T>
  | { map: <U>(f: Mapper<T, U>) => Mappable<U> };

/**
 * Function that returns a boolean value.
 */
export type Predicate<T> = (x: T, i: number) => boolean;
/**
 * Function that returns any value except functions.
 * Exclude functions that return a function to prevent mistakes.
 */
export type PredicateLike<T> = (
  x: T,
  i: number,
) => Exclude<unknown, (...x: unknown[]) => unknown>;
/**
 * Container that can be filtered.
 */
export type Filterable<T> =
  | Iterables<T>
  | { filter: (f: Predicate<T>) => Filterable<T> };

/**
 * Function that takes two arguments(and index) and returns a value.
 */
export type Reducer<T, U> = (
  previousValue: U,
  currentValue: T,
  currentIndex: number,
) => U;
/**
 * Container that can be reduced.
 */
export type Reducible<T> =
  | Iterables<T>
  | { reduce: <U>(f: Reducer<T, U>, init: U) => U };

/**
 * Genric type to represent the types of the items in iterables.
 */
export type ItersItems<T extends Iterable<unknown>[]> = T extends [] ? []
  : T extends [infer Head, ...infer Tail]
    ? Head extends Iterable<infer Item>
      ? Tail extends Iterable<unknown>[] ? [Item, ...ItersItems<Tail>]
      : [Item]
    : never
  : never;

export type RecursiveFlat<T> = T extends string ? string
  : T extends Iterable<infer S> ? RecursiveFlat<S>
  : T;
export type Item<T> = T extends Iterable<infer S> ? S : never;
export type ItemsItem<T> = T extends Iterable<infer S>
  ? S extends Iterable<infer U> ? U[]
  : S
  : never;
