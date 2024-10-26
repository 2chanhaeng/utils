import { assertEquals } from "@std/assert";
import {
  execute,
  forEach,
  forEachAsync,
  tap,
  tapAsync,
  tapError,
  tapLen,
  tapLog,
} from "./mod.ts";
import { delay } from "promise";

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

Deno.test("forEachAsync", async () => {
  const arr: number[] = [];
  const sec = () => new Date().getSeconds();

  // An async function that logs the current second after a delay.
  const secWithDelay = async (_: unknown) => {
    await delay(1000); // 1-second delay
    arr.push(sec());
  };

  arr.push(sec());
  await forEachAsync(secWithDelay)([1, 2, 3, 4, 5]);
  const result = arr.map((x, i) => (60 + x - i) % 60).reduce((a, b) =>
    a === b ? a : -1
  );
  assertEquals(result, arr[0]);
});

Deno.test("tap", () => {
  const arr = [1, 2, 3];
  const side: number[] = [];
  const pushPopped = tap((x: number[]) => side.push(x.pop()!));
  pushPopped(arr);
  assertEquals(arr, [1, 2, 3]);
  assertEquals(side, [3]);
});

Deno.test("tapAsync", async () => {
  const arr = [1, 2, 3];
  const side: number[] = [];
  const pushPopped = tapAsync((x: number[]) =>
    Promise.resolve(side.push(x.pop()!))
  );
  await pushPopped(arr);
  assertEquals(arr, [1, 2, 3]);
  assertEquals(side, [3]);
});

Deno.test("tapError", () => {
  const defaultError = console.error;
  const errors: unknown[] = [];
  console.error = (...x: unknown[]) => {
    errors.push(...x);
    defaultError!(...x);
  };
  tapError("tag")(1);
  assertEquals(errors, ["tag", 1]);
  console.error = defaultError;
});

Deno.test("tapLen", () => {
  const arr = [1, 2, 3];
  const lengths: number[] = [];
  const captureLength = tapLen((len: number) => lengths.push(len));
  const captured = Array.from(captureLength(arr));
  assertEquals(captured, [1, 2, 3]);
  assertEquals(lengths, [3]);
});

Deno.test("tapLog", () => {
  const defaultLog = console.log;
  const logs: unknown[] = [];
  console.log = (...x: unknown[]) => {
    logs.push(...x);
    defaultLog!(...x);
  };
  tapLog("tag")(1);
  assertEquals(logs, ["tag", 1]);
  console.log = defaultLog;
});
