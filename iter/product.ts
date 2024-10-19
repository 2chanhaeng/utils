import type { ItersItems } from "types";

/**
 * ```haskell
 * product::[[a], [b], ...] -> [[a, b, ...]]
 * ```
 * Cartesian product of the input iterables.
 */
export default function* product<T extends Iterable<unknown>[]>(
  ...[head, ...tail]: T
): Generator<ItersItems<T>> {
  if (!head) yield [] as ItersItems<T>;
  else {
    for (const x of head) {
      for (const xs of product(...tail)) yield [x, ...xs] as ItersItems<T>;
    }
  }
}
