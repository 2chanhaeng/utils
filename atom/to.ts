/**
 * Converts a class constructor into a function that creates an instance of that class.
 * @param {Class} cls - The class constructor to convert.
 */
export default function to<T extends new (...args: any[]) => InstanceType<T>>(
  cls: T,
): (...args: ConstructorParameters<T>) => InstanceType<T> {
  return (...args: ConstructorParameters<T>): InstanceType<T> =>
    new cls(...args);
}
