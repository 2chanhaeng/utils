import { assertEquals } from "@std/assert";
import { execute, forEach, tap, tapAsync, tapLog } from "./mod.ts";

Deno.test("execute", () => {
  const const1 = () => 1;
  assertEquals(execute(const1), 1);
});

Deno.test("forEach", () => {
  const arr: number[] = [];
  const push = forEach((x: number) => arr.push(x));
  push([1, 2, 3]);
  assertEquals(arr, [1, 2, 3]);
});

Deno.test("tap", () => {
  const arr: number[] = [];
  const push = tap((x: number) => arr.push(x));
  assertEquals(push(1), 1);
  assertEquals(arr, [1]);

Deno.test("tapAsync", async () => {
  const arr = [1, 2, 3];
  const side: number[] = [];
  const pushPopped = tapAsync(async (x: number[]) => side.push(x.pop()!));
  await pushPopped(arr);
  assertEquals(arr, [1, 2, 3]);
  assertEquals(side, [3]);
});

declare global {
  interface Console {
    defaultLog?: typeof console.log;
  }
}

Deno.test("tapLog", () => {
  console.defaultLog = console.log;
  const logs: unknown[] = [];
  console.log = (...x: unknown[]) => {
    logs.push(...x);
    console.defaultLog!(...x);
  };
  tapLog("tag")(1);
  assertEquals(logs, ["tag", 1]);
  console.log = console.defaultLog;
  delete console.defaultLog;
});
