/**
 * Attempts to create a deep copy of the provided value using `structuredClone`.
 * If cloning fails (e.g., due to unsupported types), the original value is returned.
 *
 * @template T - The type of the value to be copied.
 * @param {T} x - The value to be copied.
 * @returns {T} - The deep copied value or the original value if cloning fails.
 */
export default function tryCopy<T>(x: T): T {
  try {
    return structuredClone(x);
  } catch {
    return x;
  }
}
