// const { GameBoard } = require("../src/scripts/gameBoard");
// const { Ship } = require("../src/scripts/ship");

describe("GameBoard", () => {
  let gameBoard;

  // Initialize a new GameBoard before each test
  beforeEach(() => {
    gameBoard = GameBoard();
  });

  test("places a ship horizontally on the board", () => {
    const ship = Ship(3); // Create a ship with length 3
    gameBoard.placeShip(0, 0, ship, "horizontal");
    const board = gameBoard.getBoard();

    expect(board[0][0]).not.toBe(null); // Expect a ship at (0, 0)
    expect(board[0][1]).not.toBe(null); // Expect a ship at (0, 1)
    expect(board[0][2]).not.toBe(null); // Expect a ship at (0, 2)
    expect(board[0][3]).toBe(null); // Expect no ship at (0, 3)
  });

  test("places a ship vertically on the board", () => {
    const ship = Ship(3); // Create a ship with length 3
    gameBoard.placeShip(0, 0, ship, "vertical");
    const board = gameBoard.getBoard();

    expect(board[0][0]).not.toBe(null); // Expect a ship at (0, 0)
    expect(board[1][0]).not.toBe(null); // Expect a ship at (1, 0)
    expect(board[2][0]).not.toBe(null); // Expect a ship at (2, 0)
    expect(board[3][0]).toBe(null); // Expect no ship at (3, 0)
  });

  test("throws an error for out-of-bounds placement", () => {
    const ship = Ship(3); // Create a ship with length 3

    expect(() => {
      gameBoard.placeShip(9, 9, ship, "horizontal");
    }).toThrow("invalid ship placement");

    expect(() => {
      gameBoard.placeShip(8, 8, ship, "vertical");
    }).toThrow("invalid ship placement");
  });

  test("throws an error for overlapping ship placement", () => {
    const ship1 = Ship(3); // Create a ship with length 3
    const ship2 = Ship(3); // Create another ship with length 3

    gameBoard.placeShip(0, 0, ship1, "horizontal");

    expect(() => {
      gameBoard.placeShip(0, 0, ship2, "vertical");
    }).toThrow("invalid ship placement");
  });

  test("does not modify the board for invalid placement", () => {
    const ship = Ship(3); // Create a ship with length 3

    try {
      gameBoard.placeShip(9, 9, ship, "horizontal");
    } catch (error) {
      // Ignore the error
    }

    const board = gameBoard.getBoard();

    // Ensure the board remains unchanged
    expect(board[9][9]).toBe(null);
  });

  test("recieve attack miss", () => {
    expect(gameBoard.recieveAttack(1, 1)).toBeTruthy();
  });

  test("recieve attack hit", () => {
    const ship = Ship(3);
    gameBoard.placeShip(1, 2, ship, "horizontal");

    expect(gameBoard.recieveAttack(1, 2)).toBeTruthy();
    expect(gameBoard.recieveAttack(2, 2)).toBeTruthy();
    expect(gameBoard.recieveAttack(3, 2)).toBeTruthy();
  });

  test("recieve attack out of bounds", () => {
    expect(() => gameBoard.recieveAttack(10, 2)).toThrow(
      "Attack out of bounds"
    );
  });
});
