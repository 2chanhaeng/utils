import { assertEquals } from "@std/assert";
import { delay } from "./mod.ts";

Deno.test("delay", async () => {
  const start = Date.now();
  await delay(100);
  const end = Date.now();
  assertEquals(end - start >= 100, true);
});
