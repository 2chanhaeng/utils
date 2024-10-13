export default function toArray<T>(array: Iterable<T>): T[] {
  return Array.from(array);
}
