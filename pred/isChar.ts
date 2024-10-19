import isString from "./isString.ts";

export default function isChar(a: unknown): a is string {
  return isString(a) && a.length === 1;
}
