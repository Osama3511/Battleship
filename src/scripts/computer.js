import { Player } from "./player";

export function Computer() {
  const computer = Player();

  // Override attack method
  computer.attack = (board) => {
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

  return computer;
}
