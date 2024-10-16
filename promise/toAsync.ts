export default function toAsync<T>(promise: Iterable<Promise<T>>) {
  return Promise.all(promise);
}
