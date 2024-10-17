export default function slice(start: number, end?: number): <T>(x: T[]) => T[] {
  return <T>(x: T[]) => x.slice(start, end);
}
