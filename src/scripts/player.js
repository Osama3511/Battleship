import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";
import { checkAvailableSpot, getRandomFromRange } from "./helperFunctions";
export function Player() {
  const gameBoard = GameBoard();

  const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

  const placeOwnShip = () => {
    const newShips = ships.slice();
    let shipCount = newShips.length;
    const directions = ['horizontal', 'vertical'];
    while (shipCount) {
      let placed = false;

      while (!placed) {
        let x = getRandomFromRange(10);
        let y = getRandomFromRange(10);

        let shipIndex = getRandomFromRange(shipCount);
        let ship = newShips[shipIndex];

        let directionIndex = getRandomFromRange(2);
        let direction = directions[directionIndex];

        if (
          checkAvailableSpot(
            gameBoard.getBoard(),
            x,
            y,
            ship.getLength(),
            direction
          )
        ) {
          gameBoard.placeShip(x, y, ship, direction);
          newShips.splice(shipIndex, 1);
          shipCount = shipCount - 1;
          placed = true;
        }
      }
    }
  };

  const attack = (x, y, board) => board.recieveAttack(x, y);

  const getOwnGameBoard = () => gameBoard;

  const resetBoard = () => {
    const board = gameBoard.getBoard();
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        board[rowIndex][colIndex] = null;
      });
    });
  };


  return {
    ships,
    placeOwnShip,
    attack,
    getOwnGameBoard,
    resetBoard,
  };
}
