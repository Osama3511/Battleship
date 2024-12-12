const { experiments } = require("webpack");
const { Player } = require("../src/scripts/player");

describe("Player", () => {
  let player;

  beforeEach(() => {
    player = Player();
  });

  afterEach(() => {
    player = null;
  })

  test("Places ships horizontally", () => {
    player.placeOwnShip(2, 3, player.ships.destroyer, "horizontal");
    const board = player.getOwnGameBoard().getBoard();
    expect(board[3][2]).not.toBeNull();
    expect(board[3][3]).not.toBeNull();
  });

  test("places ships vertically", () => {
    player.placeOwnShip(3, 2, player.ships.destroyer, "vertical");
    const board = player.getOwnGameBoard().getBoard();

    expect(board[2][3]).not.toBeNull();
    expect(board[3][3]).not.toBeNull();
  });

  test("attacks other boards", () => {
    const newPlayer = Player();
    newPlayer.placeOwnShip(3, 2, newPlayer.ships.destroyer, "horizontal");

    expect(player.attack(3, 2, newPlayer.getOwnGameBoard())).toBeTruthy();
  });
});
