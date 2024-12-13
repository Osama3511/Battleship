export function updateComputerBoard(board) {
  const computerBoardDiv = document.querySelector(".computerBoardDiv");
  computerBoardDiv.textContent = "";

  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const colButton = document.createElement("button");
      colButton.classList.add("cell");

      colButton.dataset.row = rowIndex;
      colButton.dataset.column = colIndex;
      colButton.textContent = col === "hit" ? "X" : col === "miss" ? "O" : "";
      computerBoardDiv.appendChild(colButton);
    });
  });
}
