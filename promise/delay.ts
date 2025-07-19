/**
 * Returns a promise that resolves after the given milliseconds.
 *
 * @param {number} ms - The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 *
 * @example
 * ```ts
 * console.log(new Date().getSeconds()); // e.g., 30
 * await delay(2000); // Wait for 2 seconds
 * console.log(new Date().getSeconds()); // e.g., 32
 * ```
 */
export default function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
