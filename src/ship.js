export function Ship(l) {
  let length = l;
  let hits = null;
  let sunk = null;

  const hit = () => (hits += 1);

  const isSunk = () => hits === length;

  return {
    hit,
    isSunk,
  }
}
