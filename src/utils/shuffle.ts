/**
 * Fisher-Yates shuffle.
 * Shuffles a shallow clone of the array.
 * @export
 * @template T
 * @param {T[]} arr The array to be shuffled
 * @returns {T[]} A shuffled shallow clone of the array
 */
export function shuffle<T>(arr: T[]): T[] {
  const shuffledArr = [...arr];
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = shuffledArr[i];
    shuffledArr[i] = shuffledArr[j];
    shuffledArr[j] = x;
  }
  return shuffledArr;
}
