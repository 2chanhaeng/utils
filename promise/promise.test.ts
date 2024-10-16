import { assertEquals } from "@std/assert";
import { delay, toAsync } from "./mod.ts";

Deno.test("delay", async () => {
  const start = Date.now();
  await delay(100);
  const end = Date.now();
  assertEquals(end - start >= 100, true);
});

Deno.test("toAsync", async () => {
  const promises = [Promise.resolve(1), Promise.resolve(2)];
  const result = await toAsync(promises);
  assertEquals(result, [1, 2]);
  const promiseses = [[Promise.resolve(1)], [Promise.resolve(2)]];
  const result2 = await toAsync(promiseses.map(toAsync));
  assertEquals(result2, [[1], [2]]);
});
