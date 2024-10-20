/**
 * Returns the hour for the given date.
 *
 * @param date - The date object from which to extract the hour.
 * @returns The hour (0-23) of the given date.
 */
export default function getHour(date: Date): number {
  return date.getHours();
}
