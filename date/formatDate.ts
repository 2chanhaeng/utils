import splitDate from "./splitDate.ts";

/**
 * Formats a given date according to the specified string pattern.
 *
 * The pattern can include the following placeholders:
 * - `yyyy`: Full year (e.g., 2024)
 * - `yy`: Last two digits of the year (e.g., 24)
 * - `mm`: Month with leading zero (e.g., 04)
 * - `m`: Month without leading zero (e.g., 4)
 * - `dd`: Day with leading zero (e.g., 09)
 * - `d`: Day without leading zero (e.g., 9)
 * - `HH`: Hour with leading zero (e.g., 08)
 * - `H`: Hour without leading zero (e.g., 8)
 * - `MM`: Minute with leading zero (e.g., 05)
 * - `M`: Minute without leading zero (e.g., 5)
 * - `SS`: Second with leading zero (e.g., 07)
 * - `S`: Second without leading zero (e.g., 7)
 *
 * @param string - The pattern string to format the date.
 * @returns A function that takes a Date object and returns the formatted date string.
 *
 * @example
 * const format = formatDate("yyyy-mm-dd HH:MM:SS");
 * console.log(format(new Date())); // Outputs: "2024-04-09 08:05:07"
 *
 * @example
 * const format = formatDate("yy/m/d H:M:S");
 * console.log(format(new Date())); // Outputs: "24/4/9 8:5:7"
 */
export default function formatDate(string: string): (date: Date) => string {
  return (date: Date) => {
    const [year, month, day, hour, minute, second] = splitDate(date).map(
      (num) => num.toString(),
    );
    const result = string
      .replace("yyyy", year)
      .replace("yy", year.slice(2))
      .replace("mm", month.padStart(2, "0"))
      .replace("m", month)
      .replace("dd", day.padStart(2, "0"))
      .replace("d", day)
      .replace("HH", hour.padStart(2, "0"))
      .replace("H", hour)
      .replace("MM", minute.padStart(2, "0"))
      .replace("M", minute)
      .replace("SS", second.padStart(2, "0"))
      .replace("S", second);
    return result;
  };
}
