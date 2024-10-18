import { assertEquals } from "@std/assert";
import { asyncBatches, delay, toAsync } from "./mod.ts";

Deno.test("asyncBatches", async () => {
  const sec = () => new Date().getSeconds();

  // An async function that logs the current second after a delay.
  const secWithDelay = async (_: unknown) => {
    await delay(1000); // 1-second delay
    return sec();
  };

  const iters = [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8],
  ];
  const start = sec();
  const results = (await Array.fromAsync(asyncBatches(secWithDelay)(iters)))
    .map((x) => x.reduce((a, b) => (a === b ? a : NaN)))
    .map((x) => (x - start) % 60);
  assertEquals(results, [1, 2, 3]);
});

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
