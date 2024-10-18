import tap from "./tap.ts";

/**
 * ```haskell
 * tapLog::a -> b -> a
 * ```
 * Log the value with tag and return the original value.
 * `console.log`
 */
export default function tapLog<T>(tag: unknown) {
  return tap((x: T) => console.log(tag, x));
}
