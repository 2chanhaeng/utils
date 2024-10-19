import { assertEquals } from "@std/assert";
import { split, trim } from "./mod.ts";

Deno.test("split", () => {
  const bySpace = split(" ");
  assertEquals(bySpace("hello world"), ["hello", "world"]);
});

Deno.test("trim", () => {
  assertEquals(trim("  hello world  "), "hello world");
});
