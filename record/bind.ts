import apply from "apply";
import { isPromise } from "pred";

/**
 * ```haskell
 * bind:: (a, b -> c) -> b -> b & {[a]: c}
 * ```
 * Binds a property to an object based on the result of a function applied to the object.
 *
 * @template K - The type of the property key.
 * @template T - The type of the object.
 * @template S - The type of the function result.
 *
 * @param {K} key - The key of the property to bind.
 * @param {(value: T) => S} f - The function to apply to the object.
 *
 * @returns {(obj: T) => S extends Promise<infer U> ? Promise<T & Record<K, Awaited<U>>> : T & Record<K, S>}
 * A function that takes an object and returns a new object with the bound property.
 * If the function result is a promise, the returned object will be a promise that resolves to the new object.
 * @example
 * // Synchronous function example
 * const addAge = bind('age', (person) => new Date().getFullYear() - person.birthYear);
 * const person = { name: 'John', birthYear: 1990 };
 * const updatedPerson = addAge(person);
 * console.log(updatedPerson); // { name: 'John', birthYear: 1990, age: 34 }
 *
 * @example
 * // Asynchronous function example
 * const fetchAge = bind('age', async (person) => {
 *   const response = await fetch(`https://api.example.com/age/${person.id}`);
 *   const data = await response.json();
 *   return data.age;
 * });
 * const person = { name: 'John', id: 1 };
 * const updatedPerson = fetchAge(person);
 * console.log(updatedPerson); // { name: 'John', id: 1, age: 34 };
 */
export default function bind<K extends PropertyKey, T extends object, S>(
  key: K,
  f: (value: T) => S,
): (
  obj: T,
) => S extends Promise<infer U> ? Promise<
    {
      [P in K | keyof T]: P extends K ? Awaited<U>
        : P extends keyof T ? T[P]
        : never;
    }
  >
  : ({
    [P in K | keyof T]: P extends K ? S : P extends keyof T ? T[P] : never;
  }) {
  return ((obj) => {
    const result = apply(obj, f);
    if (isPromise<S extends Promise<infer U> ? U : never>(result)) {
      return result.then((value) => ({ ...obj, [key]: value }));
    }
    return ({ ...obj, [key]: result });
  }) as (
    obj: T,
  ) => S extends Promise<infer U> ? Promise<
      {
        [P in K | keyof T]: P extends K ? Awaited<U>
          : P extends keyof T ? T[P]
          : never;
      }
    >
    : ({
      [P in K | keyof T]: P extends K ? S : P extends keyof T ? T[P] : never;
    });
}
