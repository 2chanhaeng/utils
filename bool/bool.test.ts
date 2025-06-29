import { assertEquals } from "@std/assert";
import { all, not } from "./mod.ts";

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

Deno.test("all", () => {
  assertEquals(all([1, 2, 3]), true);
  assertEquals(all([1, 0, 3]), false);
});
