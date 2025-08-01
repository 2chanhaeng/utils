/**
 * @module iter
 *
 * Utilities for working with iterables.
 *
 * @example
 * import { map, range, reduce } from "./mod.ts";
 * reduce((a, b) => a + b, 0)(map((x) => x * x)(range(1, 5))); // Returns: 30
 */
export { default as accumulate } from "./accumulate.ts";
export { default as append } from "./append.ts";
export { default as batch } from "./batch.ts";
export { default as chain } from "./chain.ts";
export { default as count } from "./count.ts";
export { default as drop } from "./drop.ts";
export { default as dropWhile } from "./dropWhile.ts";
export { default as enumerate } from "./enumerate.ts";
export { default as filter } from "./filter.ts";
export { default as flat } from "./flat.ts";
export { default as fold } from "./fold.ts";
export { default as map } from "./map.ts";
export { default as prepend } from "./prepend.ts";
export { default as range } from "./range.ts";
export { default as reduce } from "./reduce.ts";
export { default as scan } from "./scan.ts";
export { default as take } from "./take.ts";
export { default as takeWhile } from "./takeWhile.ts";
export { default as toIter } from "./toIter.ts";
export { default as zip } from "./zip.ts";
