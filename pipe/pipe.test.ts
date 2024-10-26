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
  const empty = pipe();
  const noInput = empty();
  assertEquals(noInput, undefined);
  const oneInput = empty(1);
  assertEquals(oneInput, 1);
  const multiInput = empty(1, 2);
  assertEquals(multiInput, [1, 2]);
});
