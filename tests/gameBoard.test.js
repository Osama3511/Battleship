const { GameBoard } = require("../src/gameBoard");

describe("GameBoard", () => {
  let gameBoard;

  // Initialize a new GameBoard before each test
  beforeEach(() => {
    gameBoard = GameBoard();
  });

  test("places a ship horizontally on the board", () => {
    gameBoard.placeShip(0, 0, 3, "horizontal");
    const board = gameBoard.getBoard();

    expect(board[0][0]).not.toBe(null); // Expect a ship at (0, 0)
    expect(board[0][1]).not.toBe(null); // Expect a ship at (0, 1)
    expect(board[0][2]).not.toBe(null); // Expect a ship at (0, 2)
    expect(board[0][3]).toBe(null); // Expect no ship at (0, 3)
  });

  test("places a ship vertically on the board", () => {
    gameBoard.placeShip(0, 0, 3, "vertical");
    const board = gameBoard.getBoard();

    expect(board[0][0]).not.toBe(null); // Expect a ship at (0, 0)
    expect(board[1][0]).not.toBe(null); // Expect a ship at (1, 0)
    expect(board[2][0]).not.toBe(null); // Expect a ship at (2, 0)
    expect(board[3][0]).toBe(null); // Expect no ship at (3, 0)
  });

  test("throws an error for out-of-bounds placement", () => {
    expect(() => {
      gameBoard.placeShip(9, 9, 3, "horizontal");
    }).toThrow("invalid ship placement");

    expect(() => {
      gameBoard.placeShip(8, 8, 3, "vertical");
    }).toThrow("invalid ship placement");
  });

  test("throws an error for overlapping ship placement", () => {
    gameBoard.placeShip(0, 0, 3, "horizontal");

    expect(() => {
      gameBoard.placeShip(0, 1, 3, "vertical");
    }).toThrow("invalid ship placement");
  });

  test("does not modify the board for invalid placement", () => {
    try {
      gameBoard.placeShip(9, 9, 3, "horizontal");
    } catch (error) {
      // Ignore the error
    }
    const board = gameBoard.getBoard();

    // Ensure the board remains unchanged
    expect(board[9][9]).toBe(null);
  });
});
