import { assertEquals } from "@std/assert";
import {
  accumulate,
  append,
  batch,
  chain,
  count,
  drop,
  dropWhile,
  enumerate,
  filter,
  flat,
  fold,
  map,
  prepend,
  range,
  reduce,
  scan,
  take,
  takeWhile,
  toIter,
  zip,
} from "./mod.ts";
import { toArray } from "array";

Deno.test("accumulate", () => {
  const items = [1, 2, 3, 4, 5];
  const initResult = Array.from(
    accumulate((acc, curr: number) => acc + curr, 10)(items),
  );
  assertEquals(initResult, [10, 11, 13, 16, 20, 25]);
  const indexResult = Array.from(
    accumulate((acc, curr: number, index) => acc + curr + index, 10)(items),
  );
  assertEquals(indexResult, [10, 11, 14, 19, 26, 35]);
  const otherType = Array.from(
    accumulate((acc, curr) => `${acc}${curr}`, "10")(items),
  );
  assertEquals(otherType, ["10", "101", "1012", "10123", "101234", "1012345"]);
  const asyncResult = Promise.all(
    accumulate(
      async (acc: Promise<number>, curr: number) => (await acc) + curr,
      Promise.resolve(0),
    )(items),
  );
  asyncResult.then((res) => assertEquals(res, [0, 1, 3, 6, 10, 15]));
  const asyncItems = items.map((i) => Promise.resolve(i));
  const asyncItemsResult = Promise.all(
    accumulate(
      async (acc: Promise<number>, curr: Promise<number>) =>
        (await acc) + (await curr),
      Promise.resolve(0),
    )(asyncItems),
  );
  asyncItemsResult.then((res) => assertEquals(res, [0, 1, 3, 6, 10, 15]));
});

Deno.test("append", () => {
  const items = [1, 2, 3];
  const appended = Array.from(append(4)(items));
  assertEquals(appended, [1, 2, 3, 4]);
});

Deno.test("batch", () => {
  const items = [1, 2, 3, 4, 5];
  const batched = Array.from(batch(2)(items));
  assertEquals(batched, [[1, 2], [3, 4], [5]]);
});

Deno.test("chain", () => {
  const items1 = [1, 2, 3];
  const items2 = "abc";
  const chained = Array.from(chain([items1, items2]));
  assertEquals(chained, [1, 2, 3, "a", "b", "c"]);
  const items3 = Iterator.from([true, false]);
  const chained2 = Array.from(chain([items1, items2, items3]));
  assertEquals(chained2, [1, 2, 3, "a", "b", "c", true, false]);
});

Deno.test("count", () => {
  const counter = count(-10, 5);
  for (let i = -10; i < 10; i += 5) assertEquals(i, counter.next().value);
});

Deno.test("drop", () => {
  const items = [1, 2, 3, 4, 5];
  const dropped = Array.from(drop(2)(items));
  assertEquals(dropped, [3, 4, 5]);
  const empty = Array.from(drop(6)(items));
  assertEquals(empty, []);
});

Deno.test("dropWhile", () => {
  const items = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  const result = Array.from(dropWhile((x: number) => x < 4)(items));
  assertEquals(result, [4, 5, 4, 3, 2, 1]);
  const resultWithIndex = Array.from(
    dropWhile((x: number, i: number) => x + i < 4)(items),
  );
  assertEquals(resultWithIndex, [3, 4, 5, 4, 3, 2, 1]);
  const empty = Array.from(dropWhile((x: number) => x < 6)(items));
  assertEquals(empty, []);
});

Deno.test("enumerate", () => {
  const items = ["a", "b", "c"];
  const enumerated = enumerate(items);
  let index = 0;
  for (const [item, i] of enumerated) {
    assertEquals(i, index);
    assertEquals(item, items[index]);
    index++;
  }
});

Deno.test("filter", () => {
  const items = [1, 2, 3, 4, 5];
  const result = Array.from(filter((x: number) => x % 2 === 0)(items));
  assertEquals(result, [2, 4]);
  const refinementItems = [{ foo: 1 }, { foo: 2, bar: 2 }, { bar: 2 }, {}];
  const refinementResult = Array.from(
    filter((x: object): x is { foo: number } => "foo" in x)(refinementItems),
  );
  assertEquals(refinementResult, [{ foo: 1 }, { foo: 2, bar: 2 }]);
  const setResult = toArray(filter((x: number) => x % 2 === 0)(new Set(items)));
  assertEquals(setResult, [2, 4]);
});

Deno.test("flat", () => {
  const nestedArrays = () =>
    [[[[[3]]], "45"], Iterator.from([true, false] as const)] as const;
  const flat1 = Array.from(flat(1)(nestedArrays()));
  assertEquals(flat1, [[[[3]]], "45", true, false]);
  const flat2 = Array.from(flat(2)(nestedArrays()));
  assertEquals(flat2, [[[3]], "4", "5", true, false]);
  const flatAll = Array.from(flat()(nestedArrays()));
  assertEquals(flatAll, [3, "4", "5", true, false]);
});

Deno.test("fold", () => {
  const items = [1, 2, 3, 4, 5];
  const result = fold((acc: number, x: number) => acc + x)(items);
  assertEquals(result, 15);
  const iteratorResult = fold((acc: number, x: number) => acc + x)(
    Iterator.from(items),
  );
  assertEquals(iteratorResult, 15);
  const setResult = fold((acc: number, x: number) => acc + x)(new Set(items));
  assertEquals(setResult, 15);
});

Deno.test("map", () => {
  const items = [1, 2, 3, 4, 5];
  const mapDouble = map((x: number) => x * 2);
  const mapFnResult = Array.from(mapDouble(items));
  assertEquals(mapFnResult, [2, 4, 6, 8, 10]);
  const setResult = toArray(map((x: number) => x * 2)(new Set(items)));
  assertEquals(setResult, [2, 4, 6, 8, 10]);
});

Deno.test("prepend", () => {
  const items = [1, 2, 3];
  const appended = Array.from(prepend(0)(items));
  assertEquals(appended, [0, 1, 2, 3]);
});

Deno.test("range", () => {
  const endOnly = Array.from(range(5));
  assertEquals(endOnly, [0, 1, 2, 3, 4]);
  const startEnd = Array.from(range(5, 10));
  assertEquals(startEnd, [5, 6, 7, 8, 9]);
  const startEndStep = Array.from(range(5, 10, 2));
  assertEquals(startEndStep, [5, 7, 9]);
});

Deno.test("reduce", () => {
  const items = [1, 2, 3, 4, 5];
  const genIters = () => [items.slice(), Iterator.from(items), new Set(items)];
  const reduceFn = reduce((acc: number, x: number) => acc + x, 10);
  const reduceFnWithoutIterResult = genIters().map(reduceFn);
  assertEquals(reduceFnWithoutIterResult, [25, 25, 25]);
  const reduceFnInit = reduce((acc: number, x: number) => acc + x, 10);
  const reduceFnInitResult = genIters().map(reduceFnInit);
  assertEquals(reduceFnInitResult, [25, 25, 25]);
  const reducible = {
    [Symbol.iterator]: function* () {
      yield* items;
    },
  };
  const reducibleResult = reduce(
    (acc: number, x: number) => acc + x,
    10,
  )(
    reducible,
  );
  assertEquals(reducibleResult, 25);
  const stringResult = reduce((acc: string, x: number) => acc + x, "")(items);
  assertEquals(stringResult, "12345");
  const initPromiseResult = reduce(
    async (a, b: number) => (await a) + b,
    Promise.resolve(0),
  )(Iterator.from(items));
  initPromiseResult.then((res) => assertEquals(res, 15));
  const promiseItems = items.map((i) => Promise.resolve(i));
  const itemPromiseResult2 = reduce(
    async (a, b: Promise<number>) => (await a) + (await b),
    Promise.resolve(0),
  )(promiseItems);
  itemPromiseResult2.then((res) => assertEquals(res, 15));
});

Deno.test("take", () => {
  const items = [1, 2, 3, 4, 5];
  const result = Array.from(take(3)(items));
  assertEquals(result, [1, 2, 3]);
  const lesserItems = Array.from(take(6)(items));
  assertEquals(lesserItems, [1, 2, 3, 4, 5]);
});

Deno.test("scan", () => {
  const items = [1, 2, 3, 4, 5];
  const notInitResult = Array.from(
    scan((acc: number, curr) => acc + curr)(items),
  );
  assertEquals(notInitResult, [1, 3, 6, 10, 15]);
  const emptyResult = Array.from(
    scan((acc: number, curr) => acc + curr)([]),
  );
  assertEquals(emptyResult, []);
});

Deno.test("takeWhile", () => {
  const items = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  const result = Array.from(takeWhile((x: number) => x < 4)(items));
  assertEquals(result, [1, 2, 3]);
  const empty = Array.from(takeWhile((x: number) => x < 0)(items));
  assertEquals(empty, []);
});

Deno.test("toIter", () => {
  const array = [1, 2, 3];
  const iter = toIter(array);
  assertEquals(Array.from(iter), array);

  const set = new Set([1, 2, 3]);
  const iterSet = toIter(set);
  assertEquals(Array.from(iterSet), Array.from(set));

  const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ]);
  const iterMap = toIter(map);
  assertEquals(Array.from(iterMap), Array.from(map));

  const string = "abc";
  const iterString = toIter(string);
  assertEquals(Array.from(iterString), Array.from(string));

  const generator = function* () {
    yield 1;
    yield 2;
    yield 3;
  };
  const iterGenerator = toIter(generator());
  assertEquals(Array.from(iterGenerator), [1, 2, 3]);
});

Deno.test("zip", () => {
  const items1 = [1, 2, 3];
  const items2 = ["a", "b", "c"];
  const result = Array.from(zip(items1, items2));
  assertEquals(result, [
    [1, "a"],
    [2, "b"],
    [3, "c"],
  ]);
  const items3 = [true, false];
  const result2 = Array.from(zip(items1, items2, items3));
  assertEquals(result2, [
    [1, "a", true],
    [2, "b", false],
  ]);
});
