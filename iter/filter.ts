import type {
  FilterAttached,
  Predicate,
  PredicateLike,
  Refinement,
} from "types";
import { isFilterable, isIterable } from "pred";
import enumerate from "./enumerate.ts";

/**
 * ```haskell
 * filter::(a -> Bool) -> [a] -> [a]
 * filter::(a -> Truthy | Falsy) -> [a] -> [a] -- TODO: Implement this
 * ```
 * Filter the elements of an iterable.
 */
export default function filter<T, S extends T>(
  f: Refinement<T, S>,
): FilterAttached<T, S>;
export default function filter<T>(
  f: Predicate<T>,
): FilterAttached<T, T>;
export default function filter<T>(
  f: PredicateLike<T>,
): FilterAttached<T, T>;
export default function filter<T, S extends T>(
  f: Refinement<T, S>,
  iter: Iterable<T>,
): Generator<S>;
export default function filter<T, S extends T>(
  f: Refinement<T, S>,
  iter: AsyncIterable<T>,
): AsyncGenerator<S>;
export default function filter<T>(
  f: Predicate<T>,
  iter: Iterable<T>,
): Generator<T>;
export default function filter<T>(
  f: Predicate<T>,
  iter: AsyncIterable<T>,
): AsyncGenerator<T>;
export default function filter<T>(
  f: PredicateLike<T>,
  iter: Iterable<T>,
): Generator<T>;
export default function filter<T>(
  f: PredicateLike<T>,
  iter: AsyncIterable<T>,
): AsyncGenerator<T>;
export default function filter<T, S extends T>(
  f: Predicate<T> | PredicateLike<T> | Refinement<T, S>,
  iter?: Iterable<T> | AsyncIterable<T>,
):
  | Generator<T>
  | AsyncGenerator<T>
  | ((iter: Iterable<T>) => Generator<T> | Generator<S>)
  | ((iter: AsyncIterable<T>) => AsyncGenerator<T> | AsyncGenerator<S>)
  | ((
    iter: Iterable<T> | AsyncIterable<T>,
  ) => Generator<T> | AsyncGenerator<T> | Generator<S> | AsyncGenerator<S>) {
  if (iter === undefined) {
    return ((iter: Iterable<T> | AsyncIterable<T>) =>
      isIterable(iter) ? filterSync(f, iter) : filterAsync(f, iter));
  }
  if (isIterable(iter)) return filterSync(f, iter);
  return filterAsync(f, iter);
}

function filterSync<T, S extends T>(
  f: Refinement<T, S>,
  iter: Iterable<T>,
): Generator<S>;
function filterSync<T>(f: Predicate<T>, iter: Iterable<T>): Generator<T>;
function filterSync<T>(f: PredicateLike<T>, iter: Iterable<T>): Generator<T>;
function* filterSync<T, S extends T>(
  f: Predicate<T> | PredicateLike<T> | Refinement<T, S>,
  iter: Iterable<T>,
): Generator<T> | Generator<S> {
  if (isFilterable<T>(iter)) yield* iter.filter(f);
  else for (const [x, i] of enumerate(iter)) if (f(x, i)) yield x;
}

function filterAsync<T, S extends T>(
  f: Refinement<T, S>,
  iter: AsyncIterable<T>,
): AsyncGenerator<S>;
function filterAsync<T>(
  f: Predicate<T>,
  iter: AsyncIterable<T>,
): AsyncGenerator<T>;
function filterAsync<T>(
  f: PredicateLike<T>,
  iter: AsyncIterable<T>,
): AsyncGenerator<T>;
async function* filterAsync<T, S extends T>(
  f: Predicate<T> | PredicateLike<T> | Refinement<T, S>,
  iter: AsyncIterable<T>,
): AsyncGenerator<T> | AsyncGenerator<S> {
  for await (const [x, i] of enumerate(iter)) if (f(x, i)) yield x;
}
