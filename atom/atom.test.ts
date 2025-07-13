import {
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
  assertNotStrictEquals,
  assertStrictEquals,
} from "@std/assert";
import { always, identity, to, tryCopy } from "./mod.ts";

Deno.test("always", () => {
  const one = 1;
  const constOne = always(one);
  assertEquals(one, constOne());
  assertEquals(one, constOne());
  const arr = [1, 2, [3]];
  const captured = structuredClone(arr);
  const constArr = always(arr);
  assertEquals(captured, constArr());
  (arr.at(2) as number[]).push(4);
  assertEquals(captured, constArr());
});

Deno.test("identity", () => {
  const one = [1];
  assertEquals(one, identity(one));
  assertStrictEquals(one, identity(one));
});

Deno.test("to", () => {
  const url = "https://example.com/";
  const toUrl = to(URL);
  const urlInstance = toUrl(url);
  assertInstanceOf(urlInstance, URL);
  assertEquals(urlInstance.href, url);
});

Deno.test("tryCopy", () => {
  const arr = [1, 2, [3]];
  const cloned = structuredClone(arr);
  assertEquals(arr, cloned);
  assertNotStrictEquals(arr, cloned);
  (arr.at(2) as number[]).push(4);
  assertNotEquals(cloned, tryCopy(arr));
  const iter = arr.values();
  const clonedIter = tryCopy(iter);
  assertStrictEquals(iter, clonedIter);
});
