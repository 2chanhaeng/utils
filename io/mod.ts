/**
 * @module io
 * Utilities for working with side effects.
 *
 * @example
 * tapLog("five")(5); // Outputs: five 5
 */
export { default as defer } from "./defer.ts";
export { default as execute } from "./execute.ts";
export { default as forEach } from "./forEach.ts";
export { default as forEachAsync } from "./forEachAsync.ts";
export { default as tap } from "./tap.ts";
export { default as tapAsync } from "./tapAsync.ts";
export { default as tapError } from "./tapError.ts";
export { default as tapLen } from "./tapLen.ts";
export { default as tapLog } from "./tapLog.ts";
