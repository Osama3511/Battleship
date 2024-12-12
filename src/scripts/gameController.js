import { Player } from "./player";
import { Computer } from "./computer";
import { checkGameOver } from "./helperFunctions";

export function GameController() {
  const player = Player();
  const computer = Computer();

  const playerGameBoard = player.getOwnGameBoard();
  const computerGameBoard = computer.getOwnGameBoard();

  const printBoards = () => {
    const playerBoard = JSON.parse(JSON.stringify(playerGameBoard.getBoard()));
    const computerBoard = JSON.parse(JSON.stringify(computerGameBoard.getBoard()));
  
    console.log(playerBoard);
    console.log(computerBoard);
  };

  const placePlayerShips = () => {
    player.placeOwnShip(0, 0, player.ships.battleShip, "vertical");
    player.placeOwnShip(1, 1, player.ships.submarine, "vertical");
    player.placeOwnShip(2, 2, player.ships.carrier, "vertical");
    player.placeOwnShip(3, 3, player.ships.cruiser, "vertical");
    player.placeOwnShip(4, 4, player.ships.destroyer, "vertical");
  };

  placePlayerShips();

  const placeComputerShips = () => {
    for (let i = 0; i < 5; i++) {
      computer.placeOwnShip();
    }
  };

  placeComputerShips();
  printBoards();

  const resetGame = () => {
    player.resetBoard();
    computer.resetBoard();

    placeComputerShips();
    placePlayerShips();

    printBoards();
  }

  const playRound = (x, y) => {
    player.attack(x, y, computerGameBoard);

    if (checkGameOver(computerGameBoard)) {
      printBoards();
      console.log("Player wins!!!");
      resetGame();
      return true;
    }

    computer.attack(playerGameBoard);

    if (checkGameOver(playerGameBoard)) {
      printBoards();
      console.log("Computer wins!");
      resetGame();
      return true;
    }

    printBoards();
  };

  return {
    playRound,
    resetGame,
  };
}
