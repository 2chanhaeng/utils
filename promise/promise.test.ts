import { assertEquals } from "@std/assert";
import { asyncBatches, delay, toAsync } from "./mod.ts";
import { map } from "iter/mod.ts";
import pipe from "pipe/mod.ts";

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
  const nonPromise = 1;
  const resultNonPromise = await toAsync(nonPromise);
  assertEquals(resultNonPromise, 1);
  const promise = Promise.resolve(1);
  const resultPromise = await toAsync(promise);
  assertEquals(resultPromise, 1);
  const promises = [Promise.resolve(1), Promise.resolve(2)];
  const resultPromises = await toAsync(promises);
  assertEquals(resultPromises, [1, 2]);
  const promiseIter = Iterator.from(promises);
  const result1 = await toAsync(promiseIter);
  assertEquals(result1, [1, 2]);
  const promisesArray = [[Promise.resolve(1)], [Promise.resolve(2)]];
  const resultWithMapMethod = await toAsync(promisesArray.map(toAsync));
  assertEquals(resultWithMapMethod, [[1], [2]]);
  const resultWithPipe = await pipe(
    map(toAsync<Promise<number>[]>),
    toAsync
  )(promisesArray);
  assertEquals(resultWithPipe, [[1], [2]]);
});
