import { assertThrows } from "@std/assert";
import { raise } from "./mod.ts";

Deno.test("raise", () => {
  assertThrows(
    () => raise("This is an error message"),
    Error,
    "This is an error message",
  );
});
