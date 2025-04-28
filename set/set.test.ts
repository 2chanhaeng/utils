import { assertEquals } from "@std/assert";
import { diff, intersection, union } from "./mod.ts";

Deno.test("diff", () => {
  const set1 = new Set([1, 2, 3]);
  const set2 = new Set([3, 4, 5]);
  const diffed = diff(set1)(set2);
  assertEquals(diffed, new Set([1, 2]));
  const set3 = new Set([2, 4, 8]);
  const diffed2 = diff(set1)(set2, set3);
  assertEquals(diffed2, new Set([1]));
});

Deno.test("intersection", () => {
  const set1 = new Set([1, 2, 3]);
  const set2 = new Set([3, 4, 5]);
  const intersected = intersection(set1)(set2);
  assertEquals(intersected, new Set([3]));
  const set3 = new Set([2, 4, 8]);
  const intersected2 = intersection(set1)(set2, set3);
  assertEquals(intersected2, new Set([]));
});

Deno.test("union", () => {
  const set1 = new Set([1, 2, 3]);
  const set2 = new Set([3, 4, 5]);
  const unioned = union(set1)(set2);
  assertEquals(unioned, new Set([1, 2, 3, 4, 5]));
  const set3 = new Set([2, 4, 8]);
  const unioned2 = union(set1)(set2, set3);
  assertEquals(unioned2, new Set([1, 2, 3, 4, 5, 8]));
});
