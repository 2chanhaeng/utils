import { assertEquals } from "@std/assert";
import { union } from "./mod.ts";

Deno.test("union", () => {
  const set1 = new Set([1, 2, 3]);
  const set2 = new Set([3, 4, 5]);
  const unioned = union(set1)(set2);
  assertEquals(unioned, new Set([1, 2, 3, 4, 5]));
});
