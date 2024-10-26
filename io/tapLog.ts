import tap from "./tap.ts";

/**
 * Logs something in console with a specified tag and returns the original value.
 *
 * @template T - The type of the value being processed.
 * @param {unknown} tag - The tag to be logged with the value.
 * @returns {(x: T) => T} A function that logs the value and returns the original value.
 *
 * @example
 * const result = tapLog('Tag')(someValue);
 * // Logs: Tag someValue
 * // result === someValue
 */
export default function tapLog<T>(tag: unknown): (x: T) => T {
  return tap((x: T) => console.log(tag, x));
}
