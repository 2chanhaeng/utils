import isPromise from "pred/isPromise.ts";

/**
 * ```haskell
 * bindTo::a -> b -> { [a]: b }
 * ```
 * Returns a new object with the key bound to the value.
 */
export default function bindTo<K extends PropertyKey>(
  key: K,
): <T>(
  value: T,
) => T extends Promise<infer S> ? Promise<{ [P in K]: Awaited<S> }>
  : ({ [P in K]: T }) {
  return (<T>(value: T) => {
    if (isPromise<T extends Promise<infer S> ? S : never>(value)) {
      return value.then((value) => ({ [key]: value }));
    }
    return ({ [key]: value } as { [P in K]: T });
  }) as <T>(
    value: T,
  ) => T extends Promise<infer S> ? Promise<{ [P in K]: Awaited<S> }>
    : ({ [P in K]: T });
}
