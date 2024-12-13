import { Player } from "./player";
import { Computer } from "./computer";
import { checkGameOver} from "./helperFunctions";

export function GameController() {
  const player = Player();
  const computer = Computer();

  const playerGameBoard = player.getOwnGameBoard();
  const computerGameBoard = computer.getOwnGameBoard();

  const printBoards = () => {
    const playerBoard = JSON.parse(JSON.stringify(playerGameBoard.getBoard()));
    const computerBoard = JSON.parse(
      JSON.stringify(computerGameBoard.getBoard())
    );

    console.log(playerBoard);
    console.log(computerBoard);
  };

  player.placeOwnShip();
  computer.placeOwnShip();

  printBoards();

  const resetGame = () => {
    player.resetBoard();
    computer.resetBoard();

    player.placeOwnShip();
    computer.placeOwnShip();

    printBoards();
  };

  const playRound = (x, y) => {
    if (!player.attack(x, y, computerGameBoard)) return;

    if (checkGameOver(computerGameBoard)) {
      printBoards();
      console.log("Player wins!!!");
      resetGame();
      return "player";
    }

    computer.attack(playerGameBoard);

    if (checkGameOver(playerGameBoard)) {
      printBoards();
      console.log("Computer wins!");
      resetGame();
      return "computer";
    }

    printBoards();
    return null;
  };

  const getBoards = () => {
    return { playerBoard: playerGameBoard, computerBoard: computerGameBoard };
  };

  const refreshPlayerBoard = () => {
    player.resetBoard();
    player.placeOwnShip();
  };

  return {
    playRound,
    resetGame,
    getBoards,
    refreshPlayerBoard,
  };
}
