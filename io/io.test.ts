import { assertEquals } from "@std/assert";
import { tap, tapLog } from "./mod.ts";

Deno.test("tap", () => {
  const arr: number[] = [];
  const push = tap((x: number) => arr.push(x));
  assertEquals(push(1), 1);
  assertEquals(arr, [1]);
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
