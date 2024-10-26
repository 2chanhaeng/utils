/**
 * Raises an error with the provided message.
 *
 * @param message - The error message to be thrown.
 * @throws {Error} Always throws an error with the given message.
 *
 * @example
 * ```typescript
 * raise("This is an error message");
 * // Throws: Error: This is an error message
 * ```
 */
export default function raise(message: string): never {
  throw new Error(message);
}
