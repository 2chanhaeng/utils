export default function* enumerate<T>(
  iter: T[] | IteratorObject<T>
): Generator<[T, number]> {
  yield* iter.map((x, i) => [x, i]);
}
