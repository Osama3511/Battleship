import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";
export function Player() {
  const board = GameBoard();

  const ships = {
    carrier: Ship(5),
    battleShip: Ship(4),
    submarine: Ship(3),
    cruiser: Ship(3),
    destroyer: Ship(2),
  };

  const placeOwnShip = (x, y, ship, direction) => {
    board.placeShip(x, y, ship, direction);
  };

  const attack = (x, y, board) => board.recieveAttack(x, y);

  const getOwnGameBoard = () => board;

  const resetBoard = () => {
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        board[rowIndex][colIndex] = null;
      })
    });
  }

  return {
    ships,
    placeOwnShip,
    attack,
    getOwnGameBoard,
    resetBoard,
  };
}

