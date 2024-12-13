export function updatePlayerBoard(board) {

  const playerBoardDiv = document.querySelector(".playerBoardDiv");
  playerBoardDiv.textContent = "";

  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const colButton = document.createElement("button");
      colButton.classList.add("cell");

      colButton.dataset.row = rowIndex;
      colButton.dataset.column = colIndex;

      colButton.textContent = col === "hit" ? "X" : "O";
      if (!col) colButton.textContent = "";

      if (typeof col === "object" && col !== null) {
        colButton.textContent = '';
        colButton.classList.add("ship");
      }

      playerBoardDiv.appendChild(colButton);
    });
  });
}
