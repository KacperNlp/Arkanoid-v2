import { gameLevels } from "../data/gameLevels.js";

export class GameState {
  constructor(lvl) {
    const indexOfLevel = Number(lvl) - 1;

    const gameBoard = gameLevels[indexOfLevel].gameMap.map((block) => block);
    const gameLevel = lvl;

    this.generateMap = () => gameBoard;
    this.getLevel = () => gameLevel;
  }
}
