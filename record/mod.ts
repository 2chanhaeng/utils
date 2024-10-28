/**
 * @module record
 *
 * Utilities for working with records.
 *
 * @example
 * console.log(get("foo")({ foo: 42 })); // Logs: 42
 */
export { default as bind } from "./bind.ts";
export { default as bindTo } from "./bindTo.ts";
export { default as get } from "./get.ts";
export { default as merge } from "./merge.ts";
export { default as method } from "./method.ts";
export { default as omit } from "./omit.ts";
export { default as pick } from "./pick.ts";
