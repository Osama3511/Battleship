import { GameBoard } from "./gameBoard";
import { checkAvailableSpot } from "./helperFunctions";
import { Ship } from "./ship";

export function Computer() {
  const board = GameBoard();

  const directions = ["horizontal", "vertical"];

  const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

  const placeOwnShip = () => {
    const newShips = ships.slice();
    let shipCount = newShips.length;

    while (shipCount) {
      let placed = false;

      while (!placed) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        let shipIndex = Math.floor(Math.random() * shipCount);
        let ship = newShips[shipIndex];

        let direction = directions[Math.floor(Math.random() * directions.length)];

        if (
          checkAvailableSpot(
            board.getBoard(),
            x,
            y,
            ship.getLength(),
            direction
          )
        ) {
          board.placeShip(x, y, newShips[shipIndex], direction);
          newShips.splice(shipIndex, 1);
          shipCount = shipCount - 1;
          placed = true;
        }
      }
    }
  };

  const attack = (board) => {
    const arrayBoard = board.getBoard();
    let attacked = false;
    while (!attacked) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (arrayBoard[y][x] === null || typeof arrayBoard[y][x] === "object") {
        board.recieveAttack(x, y);
        attacked = true;
      }
    }
  };

  const resetBoard = () => {
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        board[rowIndex][colIndex] = null;
      });
    });
  };

  const getOwnGameBoard = () => board;
  return {
    placeOwnShip,
    attack,
    getOwnGameBoard,
    resetBoard,
  };
}
