import { gameLevels } from "../data/gameLevels.js";
import { Brick } from "./Brick.js";

export class GameState {
  constructor(lvl) {
    const indexOfLevel = Number(lvl) - 1;

    const gameBoard = gameLevels[indexOfLevel].gameMap.map(
      ({ row, column, kind }) => new Brick(row, column, kind)
    );
    const gameLevel = lvl;

    this.isInGame = false;

    this.getGameBoard = () => gameBoard;
    this.getLevel = () => gameLevel;
  }
}
