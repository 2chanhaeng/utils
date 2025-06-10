/**
 * ```haskell
 * batch::Int -> [a] -> [[a]]
 * ```
 * Split an iterable into batches of given size.
 */
export default function batch(
  size: number,
): <T>(iter: Iterable<T>) => Generator<T[]> {
  return function* <T>(iter: Iterable<T>): Generator<T[]> {
    let batch: T[] = [];
    for (const i of Iterator.from(iter)) {
      batch.push(i);
      if (batch.length === size) {
        yield batch;
        batch = [];
      }
    }
    if (batch.length) yield batch;
  };
}
