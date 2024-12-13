import { GameController } from "./gameController";
import { updateComputerBoard } from "./loadComputerBoard";
import { updatePlayerBoard } from "./loadPlayerBoard";
import { showPopup, hidePopup } from "./popup";

export function screenController() {
  const game = GameController();
  const computerBoardDiv = document.querySelector(".computerBoardDiv");
  let gameStarted = false;

  const updateBoards = () => {
    updatePlayerBoard(game.getBoards().playerBoard.getBoard());
    updateComputerBoard(game.getBoards().computerBoard.getBoard());
  };

  const clickHandler = (e) => {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if (!selectedColumn || !selectedRow) return; // prevents from clicking the edges;
    if (!gameStarted) return; // prevents from clicking if start hasn't been clicked
    const message = game.playRound(selectedColumn, selectedRow);

    if (message) {
      updateBoards();
      endGame(message);
      return;
    }

    updateBoards();
  };

  computerBoardDiv.addEventListener("click", clickHandler);

  const resetPlayerBoard = () => {
    game.refreshPlayerBoard();
    updateBoards();
  };

  const refreshPlayerBoardBtn = document.querySelector(".refresh-player-board");
  refreshPlayerBoardBtn.addEventListener("click", resetPlayerBoard);

  const startGame = () => {
    const refreshPlayerBoardBtn = document.querySelector(
      ".refresh-player-board"
    );
    refreshPlayerBoardBtn.remove();
    gameStarted = true;
  };

  const startGameBtn = document.querySelector(".start-game");
  startGameBtn.addEventListener("click", startGame);

  const restartGame = () => {
    const refreshPlayerBoardBtn = document.createElement("button");
    refreshPlayerBoardBtn.classList.add("refresh-player-board");
    refreshPlayerBoardBtn.textContent = "Refresh Board";
    refreshPlayerBoardBtn.addEventListener("click", resetPlayerBoard);

    const playerBoardSection = document.querySelector(".player-section");
    playerBoardSection.appendChild(refreshPlayerBoardBtn);
    hidePopup();
    gameStarted = false;
    updateBoards();
  };

  const endGame = (message) => {
    showPopup(message);
    const restartBtn = document.querySelector(".restart-game");
    restartBtn.addEventListener("click", restartGame);
  };

  updateBoards();
}
