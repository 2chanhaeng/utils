import isObject from "./isObject.ts";

export default function isPromise<T = unknown>(
  value: unknown
): value is Promise<T> {
  return (
    isObject(value) && typeof (value as PromiseLike<T>).then === "function"
  );
}
