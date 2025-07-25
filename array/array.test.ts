import { assertEquals } from "@std/assert";
import { at, join, slice, toArray } from "./mod.ts";

Deno.test("at", () => {
  const arr = [1, 2, 3, 4, 5];
  assertEquals(at(2)(arr), 3);
  assertEquals(at(-1)(arr), 5);
  assertEquals(at(6, "none")(arr), "none");
});

Deno.test("join", () => {
  const arr = [1, 2, 3];
  assertEquals(join(", ")(arr), "1, 2, 3");
});

Deno.test("slice", () => {
  const arr = [1, 2, 3, 4, 5];
  assertEquals(slice(1)(arr), [2, 3, 4, 5]);
  assertEquals(slice(1, 3)(arr), [2, 3]);
});

Deno.test("toArray", () => {
  const items = [1, 2, 3, 4, 5];
  assertEquals(items, toArray(items.slice()));
  const fromIter = toArray((function* () {
    yield* items;
  })());
  assertEquals(items, fromIter);
  const fromSet = toArray(new Set(items));
  assertEquals(items, fromSet);
});
