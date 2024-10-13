import isObject from "./isObject.ts";

export default function isIterator<T>(
  iter: unknown
): iter is IteratorObject<T> {
  return isObject(iter) && iter instanceof Iterator;
}
