import { assertEquals } from "@std/assert";
import {
  formatDate,
  getDate,
  getHour,
  getMinute,
  getMonth,
  getSecond,
  getYear,
  splitDate,
} from "./mod.ts";

const exampleDate = new Date("2024-10-20T21:25:30");

Deno.test("formatDate", () => {
  const format = formatDate("yyyy-mm-dd HH:MM:SS");
  const formattedDate = format(exampleDate);
  assertEquals(formattedDate, "2024-10-20 21:25:30");
});

Deno.test("getDate", () => {
  const date = getDate(exampleDate);
  assertEquals(date, 20);
});

Deno.test("getHour", () => {
  const hour = getHour(exampleDate);
  assertEquals(hour, 21);
});

Deno.test("getMinute", () => {
  const minute = getMinute(exampleDate);
  assertEquals(minute, 25);
});

Deno.test("getMonth", () => {
  const month = getMonth(exampleDate);
  assertEquals(month, 10);
});

Deno.test("getSecond", () => {
  const second = getSecond(exampleDate);
  assertEquals(second, 30);
});

Deno.test("getYear", () => {
  const year = getYear(exampleDate);
  assertEquals(year, 2024);
});

Deno.test("splitDate", () => {
  const date = splitDate(exampleDate);
  assertEquals(date, [2024, 10, 20, 21, 25, 30]);
});
