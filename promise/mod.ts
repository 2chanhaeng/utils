/**
 * @module promise
 *
 * Utilities for working with promises.
 *
 * @example
 * delay(1000).then(() => console.log("Hello, world!")); // Logs "Hello, world!" after 1 second
 */
export { default as asyncBatches } from "./asyncBatches.ts";
export { default as bimap } from "./bimap.ts";
export { default as delay } from "./delay.ts";
export { default as guarantee } from "./guarantee.ts";
export { default as lift } from "./lift.ts";
export { default as liftMap } from "./liftMap.ts";
export { default as toAsync } from "./toAsync.ts";
