import { reduce } from "iter";
import apply from "apply";

/**
 * ```haskell
 * pipe::(a -> b) -> (b -> c) -> ... -> (y -> z) -> a -> z
 * ```
 * Compose functions reverse order.
 */
function pipe(): <T0 extends unknown[]>(...x: T0) => T0; // To prevent error when start to write pipe()
function pipe<T0 extends unknown[], S>(
  f0: (...x: T0) => S
): (...x: T0) => PipeReturn<[T0], S>;
function pipe<T0 extends unknown[], T1, S>(
  f0: (...x: T0) => T1,
  f1: (x: Awaited<T1>) => S
): (...x: T0) => PipeReturn<[T0, T1], S>;
function pipe<T0 extends unknown[], T1, T2, S>(
  f0: (...x: T0) => T1,
  f1: (x: Awaited<T1>) => T2,
  f2: (x: Awaited<T2>) => S
): (...x: T0) => PipeReturn<[T0, T1, T2], S>;
function pipe<T0 extends unknown[], T1, T2, T3, S>(
  f0: (...x: T0) => T1,
  f1: (x: Awaited<T1>) => T2,
  f2: (x: Awaited<T2>) => T3,
  f3: (x: Awaited<T3>) => S
): (...x: T0) => PipeReturn<[T0, T1, T2, T3], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, S>(
  f0: (...x: T0) => T1,
  f1: (x: Awaited<T1>) => T2,
  f2: (x: Awaited<T2>) => T3,
  f3: (x: Awaited<T3>) => T4,
  f4: (x: Awaited<T4>) => S
): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, S>(
  f0: (...x: T0) => T1,
  f1: (x: Awaited<T1>) => T2,
  f2: (x: Awaited<T2>) => T3,
  f3: (x: Awaited<T3>) => T4,
  f4: (x: Awaited<T4>) => T5,
  f5: (x: Awaited<T5>) => S
): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, S>(
  f0: (...x: T0) => T1,
  f1: (x: Awaited<T1>) => T2,
  f2: (x: Awaited<T2>) => T3,
  f3: (x: Awaited<T3>) => T4,
  f4: (x: Awaited<T4>) => T5,
  f5: (x: Awaited<T5>) => T6,
  f6: (x: Awaited<T6>) => S
): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, S>(
  f0: (...x: T0) => T1,
  f1: (x: Awaited<T1>) => T2,
  f2: (x: Awaited<T2>) => T3,
  f3: (x: Awaited<T3>) => T4,
  f4: (x: Awaited<T4>) => T5,
  f5: (x: Awaited<T5>) => T6,
  f6: (x: Awaited<T6>) => T7,
  f7: (x: Awaited<T7>) => S
): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, S>(
  f0: (...x: T0) => T1,
  f1: (x: Awaited<T1>) => T2,
  f2: (x: Awaited<T2>) => T3,
  f3: (x: Awaited<T3>) => T4,
  f4: (x: Awaited<T4>) => T5,
  f5: (x: Awaited<T5>) => T6,
  f6: (x: Awaited<T6>) => T7,
  f7: (x: Awaited<T7>) => T8,
  f8: (x: Awaited<T8>) => S
): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, S>(
  f0: (...x: T0) => T1,
  f1: (x: Awaited<T1>) => T2,
  f2: (x: Awaited<T2>) => T3,
  f3: (x: Awaited<T3>) => T4,
  f4: (x: Awaited<T4>) => T5,
  f5: (x: Awaited<T5>) => T6,
  f6: (x: Awaited<T6>) => T7,
  f7: (x: Awaited<T7>) => T8,
  f8: (x: Awaited<T8>) => T9,
  f9: (x: Awaited<T9>) => S
): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9], S>;
function pipe(
  ...[f0, ...fns]:
    | []
    | [(...x: unknown[]) => unknown, ...((x: unknown) => unknown)[]]
) {
  if (f0 === undefined) return (...x: unknown[]) => x;
  return (...x: Parameters<typeof f0>) =>
    reduce(apply, f0(...x), fns) as HasReturnPromise<
      Init<typeof fns>
    > extends true
      ? LastReturn<typeof fns> extends Promise<infer U>
        ? Promise<U>
        : Promise<LastReturn<typeof fns>>
      : LastReturn<typeof fns>;
}
export default pipe;

type Init<T extends unknown[]> = T extends [...infer Front, infer _]
  ? Front
  : never;
type Last<T extends unknown[]> = T extends [...infer _, infer Last]
  ? Last
  : never;

type LastReturn<T extends Array<(...args: never[]) => unknown>> = ReturnType<
  Last<T>
>;

type HasPromise<T extends unknown[]> = T extends []
  ? false
  : T extends [infer First, ...infer Rest]
  ? First extends Promise<unknown>
    ? true
    : HasPromise<Rest>
  : false;

type HasReturnPromise<T extends Array<(...args: never[]) => unknown>> =
  HasPromise<{ [K in keyof T]: ReturnType<T[K]> }>;

type PipeReturn<
  Returns extends unknown[],
  Last
> = HasPromise<Returns> extends true
  ? Last extends Promise<infer U>
    ? Promise<U>
    : Promise<Last>
  : Last;
