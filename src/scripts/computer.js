import { GameBoard } from "./gameBoard";
import { checkAvailableSpot } from "./helperFunctions";
import { Ship } from "./ship";
export function Computer() {
  const board = GameBoard();

  const directions = ["horizontal", "vertical"];

  const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

  const placeOwnShip = () => {
    const newShips = ships.slice();
    let placed = false;
    while (!placed) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);

      let shipIndex = Math.floor(Math.random() * 5);
      let ship = newShips[shipIndex];

      let direction = directions[Math.floor(Math.random() * 2)];

      if (checkAvailableSpot(board.getBoard(), x, y, ship.getLength(), direction)) {
        board.placeShip(x, y, ships[shipIndex], direction);
        newShips.splice(shipIndex, 1);
        placed = true;
      }
    }
  };

  const attack = (board) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    board.recieveAttack(x, y);
  };

  const resetBoard = () => {
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        board[rowIndex][colIndex] = null;
      })
    });
  }

  const getOwnGameBoard = () => board;
  return {
    placeOwnShip,
    attack,
    getOwnGameBoard,
    resetBoard,
  };
}
