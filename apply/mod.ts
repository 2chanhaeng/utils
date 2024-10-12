const isPromise = <T>(x: Promise<T> | T) => x instanceof Promise;
const applyNotCurried = <T, S>(
  x: T,
  f: (x: T extends Promise<infer R> ? R : T) => S
) =>
  (isPromise(x)
    ? (x as Promise<T>).then(f as (x: T) => S)
    : f(x as T extends Promise<infer P> ? P : T)) as T extends Promise<unknown>
    ? S extends Promise<infer U>
      ? Promise<U>
      : Promise<S>
    : S;

function apply<T>(x: Promise<T>): <S>(f: (x: T) => Promise<S>) => Promise<S>;
function apply<T>(x: Promise<T>): <S>(f: (x: T) => S) => Promise<S>;
function apply<T, S>(x: Promise<T>, f: (x: T) => Promise<S>): Promise<S>;
function apply<T, S>(x: Promise<T>, f: (x: T) => S): Promise<S>;
function apply<T>(x: T): <S>(f: (x: T) => Promise<S>) => Promise<S>;
function apply<T, S>(x: T, f: (x: T) => Promise<S>): Promise<S>;
function apply<T>(x: T): <S>(f: (x: T) => S) => S;
function apply<T, S>(x: T, f: (x: T) => S): S;
function apply<T, S>(x: T, f?: (x: T extends Promise<infer R> ? R : T) => S) {
  return f === undefined
    ? (f: (x: T extends Promise<infer R> ? R : T) => S) =>
        applyNotCurried<T, ReturnType<typeof f>>(x, f)
    : applyNotCurried(x, f);
}
export default apply;
