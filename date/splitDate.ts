import getYear from "./getYear.ts";
import getMonth from "./getMonth.ts";
import getDate from "./getDate.ts";
import getHour from "./getHour.ts";
import getMinute from "./getMinute.ts";
import getSecond from "./getSecond.ts";
import apply from "apply";

export default function splitDate(
  date: Date,
): [number, number, number, number, number, number] {
  return [getYear, getMonth, getDate, getHour, getMinute, getSecond].map(
    apply(date),
  ) as [number, number, number, number, number, number];
}
