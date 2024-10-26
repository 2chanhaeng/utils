/**
 * @module error
 *
 * Utilities for working with errors.
 *
 * @example
 * raise("This is an error message"); // Throws: Error: This is an error message
 */
export { default as raise } from "./raise.ts";
export { default as tryCatch } from "./tryCatch.ts";
export { default as tryElse } from "./tryElse.ts";
