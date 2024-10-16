import { assertEquals } from "@std/assert";
import { bind, get, pick } from "./mod.ts";
import pipe from "pipe";

Deno.test("bind", () => {
  const obj = { foo: "bar" } as const;
  const bound = pipe(
    () => obj,
    bind("bar", ({ foo }) => foo.length)
  )();
  assertEquals(bound, { foo: "bar", bar: 3 });
});

Deno.test("get", () => {
  const obj = { foo: "bar" as const };
  const foo = get("foo")(obj);
  assertEquals(foo, "bar");
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
