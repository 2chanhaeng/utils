import tap from "./tap.ts";

/**
 * Logs something as an error in console with a specified tag and returns the original value.
 *
 * @template T - The type of the value being processed.
 * @param {unknown} tag - The tag to be logged with the error.
 * @returns {(x: T) => T} A function that logs the error and returns the original value.
 *
 * @example
 * const result = tapError('ErrorTag')(someValue);
 * // Logs: ErrorTag someValue
 * // result === someValue
 */
export default function tapError<T>(tag: unknown): (x: T) => T {
  return tap((x: T) => console.error(tag, x));
}
