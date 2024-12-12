export function createBoard() {
  const boardSize = 10;
  const board = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(null)
  );

  return board;
}

export function checkAvailableSpot(board, x, y, shipLength, direction) {
  const boardHeight = board.length; 
  const boardWidth = board[0].length; 

  if (
    (direction === "horizontal" && x + shipLength >= boardWidth) ||
    (direction === "vertical" && y + shipLength >= boardHeight)
  ) {
    return false;
  }

  for (let i = 0; i < shipLength; i++) {
    const startX = direction === "horizontal" ? x + i : x;
    const startY = direction === "vertical" ? y + i : y;

    if (
      startX >= boardWidth || 
      startY >= boardHeight || 
      board[startY][startX] !== null 
    ) {
      return false;
    }
  }
  return true;
}

export function checkGameOver(gameBoard) {
  const board = gameBoard.getBoard();

  for(const row of board) {
    for(const cell of row) {
      if(typeof cell === 'object') return false;
     }
  }
  
  return true;
}
