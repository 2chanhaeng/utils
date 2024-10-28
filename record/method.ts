/**
 * A utility function that invokes a method on a given record with specified arguments.
 *
 * @template K - The type of the property key.
 * @template Arg - The type of a single argument.
 * @template Args - The type of the arguments array.
 * @template Return - The return type of the method.
 * @template T - The type of the record containing the method.
 *
 * @param {K} key - The key of the method to invoke on the record.
 * @param {...Args} args - The arguments to pass to the method.
 * @returns {(record: T) => Return} - A function that takes a record and invokes the specified method with the provided arguments.
 *
 * @example
 * // Define a record with a method
 * const record = {
 *   greet: (name: string) => `Hello, ${name}!`
 * };
 *
 * // Create a function that invokes the 'greet' method with the argument 'World'
 * const greetWorld = method('greet', 'World');
 *
 * // Invoke the method on the record
 * console.log(greetWorld(record)); // Output: "Hello, World!"
 */
export default function method<K extends PropertyKey, Arg, Args extends Arg[]>(
  key: K,
  ...args: Args
) {
  return <
    Return,
    T extends {
      [key in K]: (
        ...args: Args
      ) => Return;
    },
  >(record: T) => record[key](...args);
}
