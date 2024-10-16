import tap from "./tap.ts";

export default function tapLog<T>(tag: unknown) {
  return tap((x: T) => console.log(tag, x));
}
