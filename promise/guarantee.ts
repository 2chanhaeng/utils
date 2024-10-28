import lift from "./lift.ts";

/**
 * Ensures that a given value is not null or undefined, returning a Promise that resolves with the value.
 *
 * @template T - The type of the value to be guaranteed.
 * @param {T | null | undefined} a - The value to be checked and guaranteed.
 * @returns {Promise<T>} A Promise that resolves with the value if it is not null or undefined.
 *
 * @example
 * const value = 42;
 * guarantee(value).then(console.log); // 42
 * guarantee(null).then(console.log); // Uncaught (in promise): null
 */
export default function guarantee<T>(a: T | null | undefined): Promise<T> {
  return lift<T | null | undefined, T>((a) => a !== null && a !== undefined)(a);
}
