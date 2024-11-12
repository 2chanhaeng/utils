/**
 * Defer function execution.
 *
 * If parameters are provided, returns a function that, when called, invokes `f` with the provided parameters.
 *
 * If no parameters are provided, returns a function that accepts parameters and returns a function that, when called, invokes `f` with those parameters.
 *
 * This is useful for deferring function execution, such as in `useEffect` hooks where an effect callback should not return a Promise.
 *
 * @template P - The type of the parameters of the deferred function.
 * @template R - The return type of the deferred function.
 * @param f - The function to defer.
 * @param args - Optional parameters to pass to `f` when the deferred function is invoked.
 * @returns If `args` are provided: Returns a function that, when called, invokes `f` with the provided `args`. Else, returns a function that accepts parameters `args` and returns a function that, when called, invokes `f` with those `args`.
 *
 * @example
 * import { useEffect } from 'react';
 *
 * async function fetchData(params: Params): Promise<unknown> { ... }
 *
 * useEffect(fetchData, []); // This will not work because `fetchData` returns a Promise.
 * useEffect(defer(fetchData)(params), []); // Equivalent to useEffect(() => { fetchData(); }, []);
 */
export default function defer<P extends unknown[], R>(
  f: (...args: P) => R,
): (...args: P) => () => void;

export default function defer<P extends unknown[], R>(
  f: (...args: P) => R,
  ...args: P
): () => void;

export default function defer<P extends unknown[], R>(
  f: (...args: P) => R,
  ...args: P
): ((...args: P) => () => void) | (() => void) {
  if (args.length > 0) {
    return () => {
      f(...args);
    };
  } else {
    return (...args: P) => () => {
      f(...args);
    };
  }
}
