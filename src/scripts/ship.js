export function Ship(l) {
  let length = l;
  let hits = null;

  const hit = () => (hits += 1);
  const getLength = () => length;
  const isSunk = () => hits === length;

  return {
    getLength,
    hit,
    isSunk,
  }
}
