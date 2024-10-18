import { assertEquals } from "@std/assert";
import { identity } from "./mod.ts";

Deno.test("identity", () => {
  const one = 1;
  assertEquals(one, identity(one));
});
