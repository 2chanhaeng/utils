import { assertEquals } from "@std/assert";
import { split } from "./mod.ts";

Deno.test("split", () => {
  const bySpace = split(" ");
  assertEquals(bySpace("hello world"), ["hello", "world"]);
});
