export default function get<T extends PropertyKey>(key: T) {
  return <S>(obj: { [K in T]: S }) => obj[key];
}
