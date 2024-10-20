/**
 * Returns the minutes of a given date.
 *
 * @param date - The date object from which to extract the minutes.
 * @returns The minutes of the given date.
 */
export default function getMinute(date: Date): number {
  return date.getMinutes();
}
