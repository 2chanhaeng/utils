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
 * Refine type A to type B.
 */
export interface Refinement<A, B extends A> {
  (a: A): a is B;
  (a: A, i: number): a is B;
}
export type PromiseRefinement<T, U extends T> = (
  a: T,
) => Promise<ReturnType<Refinement<T, U>>>;
