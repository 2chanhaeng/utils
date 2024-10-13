import count from "./count.ts";
import zip from "./zip.ts";

export default function* enumerate<T>(
  iter: Iterable<T>
): Generator<[T, number]> {
  for (const [x, i] of zip(iter, count())) yield [x, i];
}
