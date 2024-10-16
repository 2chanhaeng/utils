import { assertEquals } from "@std/assert";
import { get } from "./mod.ts";

Deno.test("get", () => {
  const obj = { foo: "bar" as const };
  const foo = get("foo")(obj);
  assertEquals(foo, "bar");
});
