/**
 * ```haskell
 * execute::(() -> a) -> a
 * ```
 * Execute a function.
 */
export default function execute<T>(f: () => T) {
  return f();
}
