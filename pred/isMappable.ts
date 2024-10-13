import type { Mappable } from "types";
import isObject from "./isObject.ts";

export default function isMappable<T>(iter: unknown): iter is Mappable<T> {
  return isObject(iter) && "map" in iter;
}
