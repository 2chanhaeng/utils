/**
 * Returns the year of the given date.
 *
 * @param date - The date object from which to extract the year.
 * @returns The year of the given date.
 */
export default function getYear(date: Date): number {
  return date.getFullYear();
}
