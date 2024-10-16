import { assertEquals } from "@std/assert";
import { slice, toArray } from "./mod.ts";

Deno.test("slice", () => {
  const arr = [1, 2, 3, 4, 5];
  assertEquals(slice(1)(arr), [2, 3, 4, 5]);
  assertEquals(slice(1, 3)(arr), [2, 3]);
});

Deno.test("toArray", () => {
  const items = [1, 2, 3];
  const gen = function* () {
    yield* items;
  };
  const result = toArray(gen());
  assertEquals(result, items);
});
