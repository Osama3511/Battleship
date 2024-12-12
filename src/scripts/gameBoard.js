import { createBoard, checkAvailableSpot } from "./helperFunctions";

export function GameBoard() {
  const board = createBoard();

  const placeShip = (startX, startY, ship, direction) => {
    const length = ship.getLength();

    if (!checkAvailableSpot(board, startX, startY, length, direction)) {
      throw new Error("invalid ship placement");
    }

    for (let i = 0; i < length; i++) {
      const x = direction === "horizontal" ? startX + i: startX;
      const y = direction === "vertical" ? startY + i: startY;

      board[y][x] = ship;
    }
  };

  const recieveAttack = (x, y) => {
    if(x >= board.length || y >= board.length) throw new Error("Attack out of bounds");
    
    const target = board[y][x] || null;
    
    if (!target) {
      console.log("You missed!");
      board[y][x] = "miss";
      return false;
    }

    if (typeof target === "object") {
      target.hit();
      board[y][x] = "hit";
      if (target.isSunk()) {
        console.log("A ship has sunk!");
        return true;
      }

      console.log("You hit a ship!");
      return true;
    }

    console.log("You already attacked this coordinate!");
  };

  const getBoard = () => board;

  return {
    placeShip,
    recieveAttack,
    getBoard,
  };
}

