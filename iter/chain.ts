/**
 * ```haskell
 * flat::[[a]] -> [a]
 * ```
 * Flat multiple iterables into one.
 */
export default function* chain<T extends Iterable<unknown>[]>(
  iters: T
): Generator<T extends Iterable<infer U>[] ? U : never> {
  for (const iter of iters)
    yield* iter as Iterable<T extends Iterable<infer U>[] ? U : never>;
}