import type { Reducible } from "types";
import isObject from "./isObject.ts";

export default function isReducible<T>(iter: unknown): iter is Reducible<T> {
  return isObject(iter) && "reduce" in iter;
}
