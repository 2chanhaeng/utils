export default function bind<K extends PropertyKey, T extends object, S>(
  key: K,
  f: (value: T) => S
): (obj: T) => T & Record<K, S> {
  return (obj) => ({ ...obj, [key]: f(obj) } as T & Record<K, S>);
}
