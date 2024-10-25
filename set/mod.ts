/**
 * @module set
 *
 * Utilities for working with sets.
 *
 * @example
 * console.log(diff(new Set([1, 2, 3]), new Set([2, 3, 4]))); // Logs: Set { 1 }
 */
export { default as diff } from "./diff.ts";
export { default as union } from "./union.ts";
