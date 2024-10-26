/**
 * Executes a function and catches any errors, providing an alternative function to handle errors.
 *
 * @template T - The type of the input parameter for the main function.
 * @template S - The type of the return value for both the main and alternative functions.
 *
 * @param {function(T): S} fn - The main function to execute.
 * @param {function(unknown): S} alt - The alternative function to execute if an error occurs in the main function.
 *
 * @returns {function(T): S} A function that takes an input of type T and returns a result of type S, either from the main function or the alternative function if an error occurs.
 *
 * @example
 * const safeParse = tryCatch(
 *   (str: string) => JSON.parse(str),
 *   (e) => ({ error: 'Invalid JSON' })
 * );
 *
 * const result1 = safeParse('{"key": "value"}'); // { key: "value" }
 * const result2 = safeParse('invalid json'); // { error: 'Invalid JSON' }
 */
export default function tryCatch<T, S>(
  fn: (a: T) => S,
  alt: (e: unknown) => S,
): (a: T) => S {
  return (a: T) => {
    try {
      return fn(a);
    } catch (e) {
      return alt(e);
    }
  };
}
