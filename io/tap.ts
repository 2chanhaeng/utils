import apply from "../apply/mod.ts";
import tryCopy from "../atom/tryCopy.ts";

/**
 * ```haskell
 * tap::a -> (a -> b) -> a
 * ```
 * Execute a function and return the original value.
 */
export default function tap<T>(f: (x: T) => unknown): (x: T) => T {
  return (x: T) => {
    apply(tryCopy(x), f);
    return x;
  };
}
