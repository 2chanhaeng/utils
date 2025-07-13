import { assertEquals } from "@std/assert";
import { all, any, not, some } from "./mod.ts";

Deno.test("all", () => {
  assertEquals(all([1, 2, 3]), true);
  assertEquals(all([1, 0, 3]), false);
});

Deno.test("any", () => {
  assertEquals(any([0, 1, 0]), true);
  assertEquals(any([0, 0, 0]), false);
});

Deno.test("some", () => {
  const isEven = (x: number) => x % 2 === 0;
  const isOdd = (x: number) => x % 2 !== 0;

  assertEquals(some(isEven)([1, 3, 5]), false);
  assertEquals(some(isEven)([1, 2, 3]), true);
  assertEquals(some(isOdd)([2, 4, 6]), false);
  assertEquals(some(isOdd)([1, 2, 3]), true);
});

Deno.test("not", () => {
  const isEven = (x: number) => x % 2 === 0;
  const isOdd = not(isEven);
  assertEquals(isOdd(3), true);
  assertEquals(isOdd(4), false);

  type User = { id: number };
  type UserWithRole = User & { role: string };
  const isUserWithRole = (user: User): user is UserWithRole => "role" in user;
  const isUserWithoutRole = not(isUserWithRole);
  const userWithRole: UserWithRole = { id: 1, role: "admin" };
  const userWithoutRole: User = { id: 2 };
  assertEquals(isUserWithoutRole(userWithRole), false);
  assertEquals(isUserWithoutRole(userWithoutRole), true);
});
