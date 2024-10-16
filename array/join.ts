export default function join<T>(separator: string) {
  return (x: T[]) => x.join(separator);
}
