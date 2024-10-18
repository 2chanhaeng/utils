import { assertEquals } from "@std/assert";
import { always, identity } from "./mod.ts";

Deno.test("always", () => {
  const one = 1;
  const constOne = always(one);
  assertEquals(one, constOne());
  assertEquals(one, constOne());
  const arr = [1, 2, [3]];
  const captured = structuredClone(arr);
  const constArr = always(arr);
  assertEquals(captured, constArr());
  (arr.at(2) as number[]).push(4);
  assertEquals(captured, constArr());
});

Deno.test("identity", () => {
  const one = 1;
  assertEquals(one, identity(one));
});
