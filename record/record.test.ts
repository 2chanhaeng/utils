import { assertEquals } from "@std/assert";
import { bind, bindTo, get, merge, pick } from "./mod.ts";
import pipe from "pipe";

Deno.test("bind", () => {
  const obj = { foo: "bar" } as const;
  const bound = pipe(
    () => obj,
    bind("bar", ({ foo }) => foo.length)
  )();
  assertEquals(bound, { foo: "bar", bar: 3 });
});

Deno.test("bindTo", () => {
  const value = "bar" as const;
  const bound = bindTo("foo")(value);
  assertEquals(bound, { foo: "bar" });
  const bound2 = bindTo("baz")(bound);
  assertEquals(bound2, { baz: { foo: "bar" } });
});

Deno.test("get", () => {
  const obj = { foo: "bar" as const };
  const foo = get("foo")(obj);
  assertEquals(foo, "bar");
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
