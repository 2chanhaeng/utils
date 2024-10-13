import { assertEquals } from "@std/assert";
import {
  count,
  enumerate,
  filter,
  fold,
  map,
  range,
  reduce,
  zip,
} from "./mod.ts";

Deno.test("count", () => {
  const counter = count(-10, 5);
  for (let i = -10; i < 10; i += 5) assertEquals(i, counter.next().value);
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
  console.log(result);
  assertEquals(result, [2, 4]);
});

Deno.test("fold", () => {
  const items = [1, 2, 3, 4, 5];
  const result = fold((acc: number, x: number) => acc + x)(items);
  assertEquals(result, 15);
});

Deno.test("map", () => {
  const items = [1, 2, 3, 4, 5];
  const result = Array.from(map((x: number) => x * 2)(items));
  assertEquals(result, [2, 4, 6, 8, 10]);
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
  const result = reduce((acc: number, x: number) => acc + x, 10)(items);
  assertEquals(result, 25);
  const stringResult = reduce((acc: string, x: number) => acc + x, "")(items);
  assertEquals(stringResult, "12345");
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
