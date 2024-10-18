/**
 * ```haskell
 * delay:: number -> Promise<void>
 * ```
 * Returns a promise that resolves after the given milliseconds.
 */
export default function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
