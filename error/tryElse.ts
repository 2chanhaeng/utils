/**
 * Executes a function and returns its result. If the function throws an error,
 * an alternative function is executed and its result is returned.
 *
 * @template T - The type of the input parameter.
 * @template S - The type of the return value.
 *
 * @param fn - The primary function to execute.
 * @param alt - The alternative function to execute if the primary function throws an error.
 * @returns A function that takes an argument of type T and returns a result of type S.
 *
 * @example
 * const primary = (x: number) => {
 *   if (x < 0) throw new Error('Negative number');
 *   return x * 2;
 * };
 *
 * const alternative = (x: number) => x + 10;
 *
 * const safeFunction = tryElse(primary, alternative);
 *
 * console.log(safeFunction(5));  // Output: 10
 * console.log(safeFunction(-5)); // Output: 5
 */
export default function tryElse<T, S>(
  fn: (a: T) => S,
  alt: (a: T) => S,
): (a: T) => S {
  return (a: T) => {
    try {
      return fn(a);
    } catch {
      return alt(a);
    }
  };
}
