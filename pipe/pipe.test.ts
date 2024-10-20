import { assertEquals } from "@std/assert";
import pipe from "./mod.ts";

Deno.test("pipe", async () => {
  const result = pipe(
    (x: number) => x + 1,
    String,
    (x: string) => x + "0",
    Number,
  )(1);
  assertEquals(result, 20);
  const asyncResult = await pipe(
    (x: number) => Promise.resolve(x + 1),
    (x: number) => Promise.resolve(x + 1),
  )(1);
  assertEquals(asyncResult, 3);
  const multipleArgs = pipe(
    (x: number, y: number) => x + y,
    (x: number) => x + 1,
  )(1, 2);
  assertEquals(multipleArgs, 4);
});
