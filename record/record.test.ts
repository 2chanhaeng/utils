import { assertEquals } from "@std/assert";
import { bind, bindTo, get, merge, pick } from "./mod.ts";
import pipe from "pipe";
import { tryCopy } from "atom";
import { toAsync } from "promise";

Deno.test("bind", async () => {
  const obj = { foo: "bar" } as const;
  const bound = pipe(
    tryCopy<typeof obj>,
    bind("bar", ({ foo }) => foo.length),
  )(obj);
  assertEquals(bound, { foo: "bar", bar: 3 });
  const inputPromise = await pipe(
    tryCopy<typeof obj>,
    toAsync,
    bind("bar", ({ foo }) => foo.length),
  )(obj);
  assertEquals(inputPromise, { foo: "bar", bar: 3 });
  const callbackPromise = await pipe(
    tryCopy<typeof obj>,
    bind("bar", ({ foo }) => toAsync(foo.length)),
  )(obj);
  assertEquals(callbackPromise, { foo: "bar", bar: 3 });
  const bothPromise = await pipe(
    tryCopy<typeof obj>,
    toAsync,
    bind("bar", ({ foo }) => toAsync(foo.length)),
  )(obj);
  assertEquals(bothPromise, { foo: "bar", bar: 3 });
});

Deno.test("bindTo", async () => {
  const value = "bar" as const;
  const bound = bindTo("foo")(value);
  assertEquals(bound, { foo: "bar" });
  const promiseBound = await bindTo("baz")(toAsync(bound));
  assertEquals(promiseBound, { baz: { foo: "bar" } });
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
