import apply from "apply";

export default function forEach<T>(f: (x: T) => unknown) {
  return (iter: Iterable<T>) => Iterator.from(iter).forEach((i) => apply(i, f));
}
