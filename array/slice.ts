export default function slice(start: number, end?: number) {
  return <T>(x: T[]) => x.slice(start, end);
}
