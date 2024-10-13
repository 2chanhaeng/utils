import { assertEquals } from "@std/assert";
import { toArray } from "./mod.ts";

Deno.test("toArray", () => {
  const items = [1, 2, 3];
  const gen = function* () {
    yield* items;
  };
  const result = toArray(gen());
  assertEquals(result, items);
});
