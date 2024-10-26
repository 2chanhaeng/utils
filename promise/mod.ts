/**
 * @module promise
 *
 * Utilities for working with promises.
 *
 * @example
 * delay(1000).then(() => console.log("Hello, world!")); // Logs "Hello, world!" after 1 second
 */
export { default as asyncBatches } from "./asyncBatches.ts";
export { default as delay } from "./delay.ts";
export { default as lift } from "./lift.ts";
export { default as toAsync } from "./toAsync.ts";
