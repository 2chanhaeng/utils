// deno-fmt-ignore-file
import apply from "../apply/mod.ts";

/**
 * @module pipe
 *
 * ```haskell
 * pipe::(a -> b) -> (b -> c) -> ... -> (y -> z) -> a -> z
 * ```
 * Compose functions reverse order.
 * The `pipe` function allows you to compose multiple functions, where the output of each function
 * is passed as the input to the next function. The functions are executed from left to right.
 *
 * @example
 * const add = (a: number, b: number) => a + b;
 * const square = (x: number) => x * x;
 * const toString = (x: number) => x.toString();
 *
 * const addSquareToString = pipe(add, square, toString);
 *
 * console.log(addSquareToString(2, 3)); // "25"
 *
 * @template T0 - The initial argument types.
 * @template T1 - The return type of the first function.
 * @template T2 - The return type of the second function.
 * @template T3 - The return type of the third function.
 * @template T4 - The return type of the fourth function.
 * @template T5 - The return type of the fifth function.
 * @template T6 - The return type of the sixth function.
 * @template T7 - The return type of the seventh function.
 * @template T8 - The return type of the eighth function.
 * @template T9 - The return type of the ninth function.
 * @template T10 - The return type of the tenth function.
 * @template T11 - The return type of the eleventh function.
 * @template T12 - The return type of the twelfth function.
 * @template T13 - The return type of the thirteenth function.
 * @template T14 - The return type of the fourteenth function.
 * @template T15 - The return type of the fifteenth function.
 * @template T16 - The return type of the sixteenth function.
 * @template T17 - The return type of the seventeenth function.
 * @template T18 - The return type of the eighteenth function.
 * @template T19 - The return type of the nineteenth function.
 * @template T20 - The return type of the twentieth function.
 * @template S - The final return type.
 *
 * @param {...Function} fns - The functions to compose.
 * @returns {Function} A function that takes the initial arguments and returns the result of the composed functions.
 */
function pipe(): <T0 extends unknown[]>(...x: T0) => T0 extends [] ? undefined : T0 extends [infer U] ? U : unknown[]; // To prevent error when start to write pipe()
function pipe<T0 extends unknown[], S>(f0: (...x: T0) => S, ): (...x: T0) => PipeReturn<[T0], S>;
function pipe<T0 extends unknown[], T1, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => S, ): (...x: T0) => PipeReturn<[T0, T1], S>;
function pipe<T0 extends unknown[], T1, T2, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2], S>;
function pipe<T0 extends unknown[], T1, T2, T3, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => T11, f11: (x: Awaited<T11>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => T11, f11: (x: Awaited<T11>) => T12, f12: (x: Awaited<T12>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => T11, f11: (x: Awaited<T11>) => T12, f12: (x: Awaited<T12>) => T13, f13: (x: Awaited<T13>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => T11, f11: (x: Awaited<T11>) => T12, f12: (x: Awaited<T12>) => T13, f13: (x: Awaited<T13>) => T14, f14: (x: Awaited<T14>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => T11, f11: (x: Awaited<T11>) => T12, f12: (x: Awaited<T12>) => T13, f13: (x: Awaited<T13>) => T14, f14: (x: Awaited<T14>) => T15, f15: (x: Awaited<T15>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => T11, f11: (x: Awaited<T11>) => T12, f12: (x: Awaited<T12>) => T13, f13: (x: Awaited<T13>) => T14, f14: (x: Awaited<T14>) => T15, f15: (x: Awaited<T15>) => T16, f16: (x: Awaited<T16>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => T11, f11: (x: Awaited<T11>) => T12, f12: (x: Awaited<T12>) => T13, f13: (x: Awaited<T13>) => T14, f14: (x: Awaited<T14>) => T15, f15: (x: Awaited<T15>) => T16, f16: (x: Awaited<T16>) => T17, f17: (x: Awaited<T17>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => T11, f11: (x: Awaited<T11>) => T12, f12: (x: Awaited<T12>) => T13, f13: (x: Awaited<T13>) => T14, f14: (x: Awaited<T14>) => T15, f15: (x: Awaited<T15>) => T16, f16: (x: Awaited<T16>) => T17, f17: (x: Awaited<T17>) => T18, f18: (x: Awaited<T18>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => T11, f11: (x: Awaited<T11>) => T12, f12: (x: Awaited<T12>) => T13, f13: (x: Awaited<T13>) => T14, f14: (x: Awaited<T14>) => T15, f15: (x: Awaited<T15>) => T16, f16: (x: Awaited<T16>) => T17, f17: (x: Awaited<T17>) => T18, f18: (x: Awaited<T18>) => T19, f19: (x: Awaited<T19>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19], S>;
function pipe<T0 extends unknown[], T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, S>(f0: (...x: T0) => T1, f1: (x: Awaited<T1>) => T2, f2: (x: Awaited<T2>) => T3, f3: (x: Awaited<T3>) => T4, f4: (x: Awaited<T4>) => T5, f5: (x: Awaited<T5>) => T6, f6: (x: Awaited<T6>) => T7, f7: (x: Awaited<T7>) => T8, f8: (x: Awaited<T8>) => T9, f9: (x: Awaited<T9>) => T10, f10: (x: Awaited<T10>) => T11, f11: (x: Awaited<T11>) => T12, f12: (x: Awaited<T12>) => T13, f13: (x: Awaited<T13>) => T14, f14: (x: Awaited<T14>) => T15, f15: (x: Awaited<T15>) => T16, f16: (x: Awaited<T16>) => T17, f17: (x: Awaited<T17>) => T18, f18: (x: Awaited<T18>) => T19, f19: (x: Awaited<T19>) => T20, f20: (x: Awaited<T20>) => S, ): (...x: T0) => PipeReturn<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20], S>;
function pipe(
  ...[f0, ...fns]:
    | []
    | [(...x: unknown[]) => unknown, ...((x: unknown) => unknown)[]]
) {
  if (f0 === undefined) {
    return (...x: unknown[]) =>
      (x.length === 0
        ? undefined
        : x.length === 1
        ? x[0]
        : x) as typeof x extends [] ? undefined : typeof x extends [infer U] ? U
        : unknown[];
  }
  return (...x: Parameters<typeof f0>) =>
    fns.reduce(apply, f0(...x)) as HasReturnPromise<
      Init<typeof fns>
    > extends true
      ? LastReturn<typeof fns> extends Promise<infer U> ? Promise<U>
      : Promise<LastReturn<typeof fns>>
      : LastReturn<typeof fns>;
}
export default pipe;

type Init<T extends unknown[]> = T extends [...infer Front, infer _] ? Front
  : never;
type Last<T extends unknown[]> = T extends [...infer _, infer Last] ? Last
  : never;

type LastReturn<T extends Array<(...args: never[]) => unknown>> = ReturnType<
  Last<T>
>;

type HasPromise<T extends unknown[]> = T extends [] ? false
  : T extends [infer First, ...infer Rest]
    ? First extends Promise<unknown> ? true
    : HasPromise<Rest>
  : false;

type HasReturnPromise<T extends Array<(...args: never[]) => unknown>> =
  HasPromise<{ [K in keyof T]: ReturnType<T[K]> }>;

type PipeReturn<
  Returns extends unknown[],
  Last,
> = HasPromise<Returns> extends true
  ? Last extends Promise<infer U> ? Promise<U>
  : Promise<Last>
  : Last;
