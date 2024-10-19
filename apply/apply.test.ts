import { assertEquals } from "@std/assert";
import apply from "./mod.ts";
import { isPromise } from "pred";

Deno.test("apply", async () => {
  const result = [
    apply(1)((x) => x + 1),
    await apply(Promise.resolve(1))((x) => x + 1),
    await apply(1)((x) => Promise.resolve(x + 1)),
    await apply(Promise.resolve(1))((x) => Promise.resolve(x + 1)),
    apply(1, (x) => x + 1),
    await apply(1, (x) => Promise.resolve(x + 1)),
    await apply(Promise.resolve(1), (x) => x + 1),
    await apply(Promise.resolve(1), (x) => Promise.resolve(x + 1)),
  ].every((x) => x === 2);
  assertEquals(result, true);
  const notPromises = [apply(1, (x) => x + 1), apply(1)((x) => x + 1)].every(
    (x) => x === 2,
  );
  assertEquals(notPromises, true);

  const promises = [
    apply(1, (x) => Promise.resolve(x + 1)),
    apply(Promise.resolve(1), (x) => x + 1),
    apply(Promise.resolve(1), (x) => Promise.resolve(x + 1)),
    apply(1)((x) => Promise.resolve(x + 1)),
    apply(Promise.resolve(1))((x) => x + 1),
    apply(Promise.resolve(1))((x) => Promise.resolve(x + 1)),
  ].every(isPromise);
  assertEquals(promises, true);
});
