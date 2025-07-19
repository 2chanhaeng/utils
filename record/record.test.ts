import { assertEquals } from "@std/assert";
import {
  bind,
  bindTo,
  bucket,
  get,
  merge,
  method,
  omit,
  pick,
  pluck,
  separate,
} from "./mod.ts";
import pipe from "pipe";
import { tryCopy } from "atom";

Deno.test("bind", async () => {
  const obj = { foo: "bar" } as const;
  const bound = pipe(
    tryCopy<typeof obj>,
    bind("bar", ({ foo }) => foo.length),
  )(obj);
  assertEquals(bound, { foo: "bar", bar: 3 });
  const inputPromise = await pipe(
    tryCopy<typeof obj>,
    (x) => Promise.resolve(x),
    bind("bar", ({ foo }) => foo.length),
  )(obj);
  assertEquals(inputPromise, { foo: "bar", bar: 3 });
  const callbackPromise = await pipe(
    tryCopy<typeof obj>,
    bind("bar", ({ foo }) => Promise.resolve(foo.length)),
  )(obj);
  assertEquals(callbackPromise, { foo: "bar", bar: 3 });
  const bothPromise = await pipe(
    tryCopy<typeof obj>,
    (x) => Promise.resolve(x),
    bind("bar", ({ foo }) => Promise.resolve(foo.length)),
  )(obj);
  assertEquals(bothPromise, { foo: "bar", bar: 3 });
});

Deno.test("bindTo", async () => {
  const value = "bar" as const;
  const bound = bindTo("foo")(value);
  assertEquals(bound, { foo: "bar" });
  const promiseBound = await bindTo("baz")(Promise.resolve(bound));
  assertEquals(promiseBound, { baz: { foo: "bar" } });
});

Deno.test("bucket", () => {
  const items = [1, 2, 3, 4, 5, 6, 7];
  const bucketed = bucket((x: number) => (x % 2 === 0 ? "even" : "odd"))(items);
  assertEquals(bucketed, { even: [2, 4, 6], odd: [1, 3, 5, 7] });

  const bucketedWithValidation = bucket(
    (x: number) => (x % 2 === 0 ? "even" : "odd"),
    (x) => x % 3 !== 0,
  )(items);
  assertEquals(bucketedWithValidation, { even: [2, 4], odd: [1, 5, 7] });
});

Deno.test("get", () => {
  const obj = { foo: "bar" as const, baz: "qux" as const };
  const foo = get("foo")(obj);
  assertEquals(foo, "bar");
  pipe(
    bindTo("foo")<"bar">,
    get("foo"),
    (foo) => assertEquals(foo, "bar"),
  )("bar");
});

Deno.test("merge", () => {
  const obj1 = { foo: "bar" } as const;
  const obj2 = { baz: "qux" } as const;
  const merged1 = merge(obj1, obj2);
  assertEquals(merged1, { foo: "bar", baz: "qux" });
  const obj3 = { qwe: "rty", asd: "fgh" } as const;
  const obj4 = { zxc: "vbn", asd: "jkl" } as const;
  const merged2 = merge(obj3)(obj4);
  assertEquals(merged2, { qwe: "rty", asd: "jkl", zxc: "vbn" });
});

Deno.test("method", () => {
  const obj = {
    foo: "bar",
    baz: "qux",
    method: (a: number, b: number) => a + b,
  } as const;
  const result = method("method", 1, 2)(obj);
  assertEquals(result, 3);
});

Deno.test("omit", () => {
  const obj = {
    foo: "bar",
    baz: "qux",
    qwe: "rty",
    asd: "fgh",
    zxc: "vbn",
  } as const;
  const omitted = omit(["foo", "asd"])(obj);
  assertEquals(omitted, { baz: "qux", qwe: "rty", zxc: "vbn" });
});

Deno.test("pick", () => {
  const obj = {
    foo: "bar",
    baz: "qux",
    qwe: "rty",
    asd: "fgh",
    zxc: "vbn",
  } as const;
  const picked = pick(["foo", "asd"])(obj);
  assertEquals(picked, { foo: "bar", asd: "fgh" });
});

Deno.test("pluck", () => {
  const obj = { a: 1, b: 2, c: 3 } as const;
  const plucked = pluck(["a", "c", "d"])(obj);
  assertEquals(plucked, { a: 1, c: 3, d: undefined });
  const pluckedWithDefaultValue = pluck(["a", "c", "d"], 4 as const)(obj);
  assertEquals(pluckedWithDefaultValue, { a: 1, c: 3, d: 4 });

  interface PluckTest {
    a: number;
    b?: number;
    c: number | undefined;
  }
  const pluckTest: PluckTest = { a: 1, c: undefined };
  const pluckedTest = pluck(["a", "b", "c"], 0)(pluckTest);
  assertEquals(pluckedTest, { a: 1, b: 0, c: 0 });
});

Deno.test("separate", () => {
  const obj = { a: 1, b: 2, c: 3 } as const;
  const [picked, omitted] = separate(["a", "c"])(obj);
  assertEquals(picked, { a: 1, c: 3 });
  assertEquals(omitted, { b: 2 });
});
