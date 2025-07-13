/**
 * @module atom
 * Utilities for working with atomic values.
 *
 * @example
 * always(5)(); // Returns: 5
 * identity(5); // Returns: 5
 * tryCopy(5); // Returns: 5
 */
export { default as always } from "./always.ts";
export { default as identity } from "./identity.ts";
export { default as to } from "./to.ts";
export { default as tryCopy } from "./tryCopy.ts";
