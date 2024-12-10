export function createBoard() {
  const boardSize = 10;
  const board = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(null)
  );

  return board;
}

export function checkAvailableSpot(board, x, y, shipLength, direction) {
  const start = direction === "horizontal" ? x : y;

  if (start + shipLength >= board.length) return false;

  for (let i = 0; i < shipLength; i++) {
    const startX = direction === "horizontal" ? x : x + i;
    const startY = direction === "vertical" ? y : y + i;

    if(board[startX][startY] !== null) {
        return false;
    }
  }
  return true;
}
