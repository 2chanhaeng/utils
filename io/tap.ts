import apply from "apply";

export default function tap<T>(f: (x: T) => unknown) {
  return (x: T) => {
    apply(x, f);
    return x;
  };
}
