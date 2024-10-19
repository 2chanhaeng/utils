import type chain from "./chain.ts";
import type { Item, RecursiveFlat } from "types";

/**
 * ```haskell
 * flat::Int -> [[a]] -> [a]
 * ```
 *
 * Flattens an array of arrays up to the specified depth.
 * Use {@link chain} when the depth is `1`.
 *
 * @param depth - The maximum depth to flatten. Defaults to `Infinity`.
 * @returns A generator that yields the flattened elements.
 *
 * @example
 * const nestedArrays = [[1, 2], [3, [4, 5]]];
 * const flatGenerator = flat(1)(nestedArrays);
 * console.log([...flatGenerator]); // Output: [1, 2, 3, [4, 5]]
 */
export default function flat<N extends number>(depth: N = Infinity as N) {
  return function* <T extends Iterable<unknown>>(
    iters: T
  ): Generator<FlatArrayOrRecursion<T, N>> {
    yield* Array.from(iters).flat(depth) as Iterable<
      FlatArrayOrRecursion<T, N>
    >;
  };
}

/**
 * @wtf
 * At first I wanted to implement `FlatArrayOrRecursion` like this:
 * `type FlatArrayOrRecursion<T, N> = N extends Infinity ? RecursiveFlat<T> : FlatArray<Item<T>[], N>`.
 * But TypeScript doesn't treat `Infinity` as a type, even though integers are. So,
 * I thought about it the other way around:
 * Let's limit `N` to the number of `N` we can put in a {@link FlatArray}.
 * The `N' of `FlatArray` could only be integers in the range -1 to 20,
 * so I decided to type these numbers as `FlatArrayNumber',
 * and use {@link RecursiveFlat} to recurse over them if there were more than `FlatArrayNumber'.
 * In the end, it doesn't look pretty, but it works anyway.
 */
type FlatArrayOrRecursion<T, N> = N extends FlatArrayNumber
  ? FlatArray<Item<T>[], N>
  : RecursiveFlat<T>;
type FlatArrayNumber =
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;
