import apply from "apply";

/**
 * ```haskell
 * tap::a -> (a -> b) -> a
 * ```
 * Execute a function and return the original value.
 */
export default function tap<T>(f: (x: T) => unknown) {
  return (x: T) => {
    apply(structuredClone(x), f);
    return x;
  };
}
