/**
 * Returns the seconds portion of a given Date object.
 *
 * @param date - The Date object from which to extract the seconds.
 * @returns The seconds portion of the given Date object.
 */
export default function getSecond(date: Date): number {
  return date.getSeconds();
}
