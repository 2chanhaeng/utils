import { assertEquals, assertThrows } from "@std/assert";
import { raise, tryCatch, tryElse } from "./mod.ts";

Deno.test("raise", () => {
  assertThrows(
    () => raise("This is an error message"),
    Error,
    "This is an error message",
  );
});

Deno.test("tryCatch", () => {
  const div = (a: number) => (b: number) =>
    a !== 0 ? b / a : raise("Division by zero");
  const div4 = tryCatch(
    (a: number) => div(a)(4),
    (error) => {
      console.error((error as Error)?.message);
      return 42;
    },
  );
  const div4with2 = div4(2);
  assertEquals(div4with2, 2);
  const div4with0 = div4(0);
  assertEquals(div4with0, 42);
});

Deno.test("tryElse", () => {
  const div = (a: number) => (b: number) =>
    a !== 0 ? b / a : raise("Division by zero");
  const div4 = tryElse((a: number) => div(a)(4), (a) => a + 42);
  const div4with2 = div4(2);
  assertEquals(div4with2, 2);
  const div4with0 = div4(0);
  assertEquals(div4with0, 42);
});
