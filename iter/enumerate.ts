import isIterable from "../pred/isIterable.ts";
import count from "./count.ts";
import zip from "./zip.ts";

/**
 * ```haskell
 * enumerate::[a] -> [(a, Int)]
 * ```
 * Enumerate the elements of an iterable.
 */
export default function enumerate<T>(
  iter: Iterable<T>,
): Generator<[T, number]>;
export default function enumerate<T>(
  iter: AsyncIterable<T>,
): AsyncGenerator<[T, number]>;
export default function enumerate<T>(
  iter: Iterable<T> | AsyncIterable<T>,
): Generator<[T, number]> | AsyncGenerator<[T, number]> {
  if (isIterable(iter)) {
    return enumerateSync(iter);
  } else {
    return enumerateAsync(iter);
  }
}

function* enumerateSync<T>(iter: Iterable<T>): Generator<[T, number]> {
  for (const [x, i] of zip(iter, count())) yield [x, i];
}
async function* enumerateAsync<T>(
  iter: AsyncIterable<T>,
): AsyncGenerator<[T, number]> {
  const counter = count();
  for await (const x of iter) yield [x, counter.next().value];
}
