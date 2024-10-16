export default function union<T>(set1: Set<T>) {
  return (set2: Set<T>) => set1.union(set2);
}
