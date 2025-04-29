export default function symDiff<T>(
  set1: Set<T>,
): <S>(...sets: Set<S>[]) => Set<T | S> {
  return <S>(...sets: Set<S>[]) => {
    return sets.reduce(
      (acc, set2) => acc.symmetricDifference(set2),
      set1 as Set<T | S>,
    );
  };
}
