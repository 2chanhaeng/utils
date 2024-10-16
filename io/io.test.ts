import { assertEquals } from "@std/assert";
import { tap } from "./mod.ts";

Deno.test("tap", () => {
  const arr: number[] = [];
  const push = tap((x: number) => arr.push(x));
  assertEquals(push(1), 1);
  assertEquals(arr, [1]);
});
