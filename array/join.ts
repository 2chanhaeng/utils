export default function join<T>(separator: string): (x: T[]) => string {
  return (x: T[]) => x.join(separator);
}
