import isChar from "../pred/isChar.ts";
import isIterable from "../pred/isIterable.ts";
import type { ItemsItem, RecursiveFlat } from "../types/iter.ts";
import type { Inferior, Inferiors } from "../types/number.ts";

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
 * ```ts
 * const nestedArrays = [[1, 2], [3, [4, 5]]];
 * const flatGenerator = flat(1)(nestedArrays);
 * console.log([...flatGenerator]); // Output: [1, 2, 3, [4, 5]]
 * ```
 */
export default function flat<N extends number>(
  depth: N = Infinity as N,
): <T extends Iterable<unknown>>(
  iters: T,
) => Generator<FlatArrayOrRecursion<T, N>> {
  return function* <T extends Iterable<unknown>>(
    iters: T,
  ): Generator<FlatArrayOrRecursion<T, N>> {
    yield* flatter(depth, iters) as Iterable<FlatArrayOrRecursion<T, N>>;
  };
}

function* flatter<N extends number, T>(
  depth: N,
  iters: T,
): Generator<T | FlatArrayOrRecursion<T, N>> {
  if (isChar(iters)) yield iters;
  else if (!isIterable<FlatArrayOrRecursion<T, N>>(iters)) yield iters;
  else if (depth <= 0) yield* iters;
  else {
    for (const iter of iters) {
      yield* flatter(depth - 1, iter) as Iterable<FlatArrayOrRecursion<T, N>>;
    }
  }
}

type FlatArrayOrRecursion<T, N> = N extends Inferiors[number]
  ? FlatIterable<ItemsItem<T>[], N>
  : RecursiveFlat<T>;
type FlatIterable<Arr, Depth extends number> = {
  done: Arr;
  recur: Arr extends string ? string
    : Arr extends Iterable<infer InnerArr>
      ? FlatIterable<InnerArr, Inferior<Depth>>
    : Arr;
}[Depth extends -1 ? "done" : "recur"];
