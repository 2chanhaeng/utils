/**
 * Returns the day of the month for the specified date.
 *
 * @param date - The date object from which to extract the day of the month.
 * @returns The day of the month as a number.
 */
export default function getDate(date: Date): number {
  return date.getDate();
}
