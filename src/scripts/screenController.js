import { GameController } from "./gameController";

export function screenController() {
  const game = GameController();

  const playerBoardDiv = document.querySelector(".playerBoardDiv");
  const computerBoardDiv = document.querySelector(".computerBoardDiv");

  const updateBoards = () => {
    const updatePlayerBoard = () => {
      playerBoardDiv.textContent = "";
      const board = game.getBoards().playerBoard.getBoard();

      board.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          const colButton = document.createElement("button");
          colButton.classList.add("cell");

          colButton.dataset.row = rowIndex;
          colButton.dataset.column = colIndex;

          colButton.textContent = col === "hit" ? "X" : "O";
          if (!col) colButton.textContent = "";

          if (typeof col === "object" && col !== null) {
            colButton.classList.add("ship");
          }

          playerBoardDiv.appendChild(colButton);
        });
      });
    };

    const updateComputerBoard = () => {
      computerBoardDiv.textContent = "";
      const board = game.getBoards().computerBoard.getBoard();

      board.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          const colButton = document.createElement("button");
          colButton.classList.add("cell");

          colButton.dataset.row = rowIndex;
          colButton.dataset.column = colIndex;
          colButton.textContent =
            col === "hit" ? "X" : col === "miss" ? "O" : "";
          computerBoardDiv.appendChild(colButton);
        });
      });
    };

    updateComputerBoard();
    updatePlayerBoard();
  };

  const clickHandler = (e) => {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if (!selectedColumn || !selectedRow) return; // prevents from clicking the edges;

    game.playRound(selectedColumn, selectedRow);
    updateBoards();
  };

  playerBoardDiv.addEventListener("click", clickHandler);
  computerBoardDiv.addEventListener("click", clickHandler);

  updateBoards();
}
