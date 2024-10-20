import { toArray } from "array";
import { tryCopy } from "atom";
import tap from "./tap.ts";
import { map } from "iter";
import pipe from "pipe";

/**
 * Applies a given function to each element of an iterable for side effects and returns the iterable.
 *
 * @template T - The type of elements in the iterable.
 * @param f - A function to apply to each element of the iterable.
 * @returns A function that takes an iterable and returns the same iterable after applying the function to each element.
 *
 * @example
 * const log = (x: number) => console.log(x);
 * const numbers = [1, 2, 3];
 * forEach(log)(numbers); // Logs: 1, 2, 3
 *
 * @example
 * const double = (x: number) => x * 2;
 * const numbers = [1, 2, 3];
 * const result = forEach(double)(numbers); // result is [1, 2, 3], but each element was doubled in the side effect
 */
export default function forEach<T>(
  f: (x: T) => unknown,
): (x: Iterable<T>) => Iterable<T> {
  return tap<Iterable<T>>(pipe(tryCopy, map(f), toArray));
}
