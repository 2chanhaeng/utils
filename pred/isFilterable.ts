import type { Filterable } from "types";
import isObject from "./isObject.ts";

export default function isFilterable<T>(iter: unknown): iter is Filterable<T> {
  return isObject(iter) && "filter" in iter;
}
