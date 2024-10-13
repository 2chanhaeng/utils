import type { Iterables } from "types";

export default function isIterable<T>(iter: unknown): iter is Iterables<T> {
  return (
    Array.isArray(iter) ||
    (typeof iter === "object" && iter !== null && Symbol.iterator in iter)
  );
}
