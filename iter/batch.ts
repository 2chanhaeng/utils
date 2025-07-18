/**
 * ```haskell
 * batch::Int -> [a] -> [[a]]
 * ```
 *
 * Split an iterable into batches of given size.
 *
 * @param {number} size - The size of each batch.
 * @return {Generator<T[]>} An iterator that yields batches of elements.
 *
 * @example
 * ```ts
 * Array.from(batch(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]));
 * // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 * ```
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
