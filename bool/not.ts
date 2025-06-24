import type { Refinement } from "../types/pred.ts";

/**
 * Returns a function that negates the result of the given predicate.
 * ```haskell
 * not :: (a -> Boolean) -> (a -> Boolean)
 * ```
 * @param f - The predicate function to negate.
 * @returns A new function that returns the negation of the predicate.
 * @example
 * ```ts
 * isEven = (x: number) => x % 2 === 0;
 * isOdd = not(isEven);
 * isOdd(3); // true
 * ```
 */
export default function not<T, S extends T>(
  f: Refinement<T, S>,
): (args: T) => args is Exclude<T, S>;
export default function not<T>(
  f: (...args: T[]) => unknown,
): (...args: T[]) => boolean;
export default function not<T>(
  f: (...args: T[]) => unknown,
): (...args: T[]) => boolean {
  return (...args: T[]) => !f(...args);
}
