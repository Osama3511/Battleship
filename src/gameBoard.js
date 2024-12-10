import { Ship } from "./ship";
import { createBoard, checkAvailableSpot } from "./gameBoardHelper";

export function GameBoard() {
  const board = createBoard();

  const placeShip = (startX, startY, length, direction) => {
    const ship = Ship(length);

    if (!checkAvailableSpot(board, startX, startY, length, direction)) {
      throw new Error("invalid ship placement");
    }

    for (let i = 0; i < length; i++) {
      const x = direction === "horizontal" ? startX : startX + i;
      const y = direction === "vertical" ? startY : startY + i;

      board[x][y] = ship;
    }
  };

  const recieveAttack = (x, y) => {
    const target = board[x][y];

    if (!target) {
      console.log("You missed!");
      board[x][y] = "miss";
      return;
    }

    if (typeof target === "object") {
      target.hit();
      board[x][y] = "hit";
      if (target.isSunk()) {
        console.log("A ship has sunk!");
        return;
      }

      console.log("You hit a ship!");
      return;
    }

    console.log("You already attacked this coordinate!");
  };

  const getBoard = () => board;

  return {
    placeShip,
    getBoard,
  };
}

module.exports = { GameBoard };
