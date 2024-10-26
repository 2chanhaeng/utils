import { assertEquals, assertRejects } from "@std/assert";
import { asyncBatches, bimap, delay, lift, toAsync } from "./mod.ts";
import { map } from "iter";
import pipe from "pipe";

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

Deno.test("bimap", async () => {
  const doubleOrZero = bimap((a: number) => a * 2, () => 0);
  const resolved = await doubleOrZero(Promise.resolve(3));
  assertEquals(resolved, 6);
  const rejected = await doubleOrZero(Promise.reject("error"));
  assertEquals(rejected, 0);
});

Deno.test("delay", async () => {
  const start = Date.now();
  await delay(100);
  const end = Date.now();
  assertEquals(end - start >= 100, true);
});

Deno.test("lift", async () => {
  const isEven = (a: number) => a % 2 === 0;
  const liftIsEven = lift(isEven);
  const resolvedFromSync = await liftIsEven(2);
  assertEquals(resolvedFromSync, 2);
  const resolvedFromAsync = await liftIsEven(Promise.resolve(4));
  assertEquals(resolvedFromAsync, 4);
  const rejectedFromSync = () => liftIsEven(3);
  assertRejects(rejectedFromSync);
  const rejectedFromAsync = () => liftIsEven(Promise.resolve(5));
  assertRejects(rejectedFromAsync);
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
    toAsync,
  )(promisesArray);
  assertEquals(resultWithPipe, [[1], [2]]);
  async function* asyncGen() {
    yield await Promise.resolve(1 as const);
    yield await Promise.resolve(2 as const);
    yield await Promise.resolve(3 as const);
  }
  const resultAsyncGen = await toAsync(asyncGen());
  assertEquals(resultAsyncGen, [1, 2, 3]);
});
