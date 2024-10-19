/**
 * A generator function that iterates over the provided iterable, yielding each item,
 * and then calls the provided callback function with the length of the iterable.
 *
 * @template T - The type of elements in the iterable.
 * @param {function(number): unknown} f - A callback function that receives the length of the iterable.
 * @returns {Generator<T>} A generator that yields each item from the iterable.
 */
export default function tapLen<T>(
  f: (len: number) => unknown
): (iter: Iterable<T>) => Generator<T> {
  return function* (iter: Iterable<T>): Generator<T> {
    let len = 0;
    for (const i of iter) {
      yield i;
      len++;
    }
    return f(len);
  };
}
