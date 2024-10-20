/**
 * Returns the month of the given date as a number (1-12).
 *
 * @param date - The date object from which to extract the month.
 * @returns The month of the given date, where January is 1 and December is 12.
 */
export default function getMonth(date: Date): number {
  return date.getMonth() + 1;
}
