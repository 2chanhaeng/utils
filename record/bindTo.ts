export default function bindTo<K extends PropertyKey>(key: K) {
  return <T>(value: T) => ({ [key]: value } as { [P in K]: T });
}
