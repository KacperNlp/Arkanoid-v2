import { gameLevels } from "../data/gameLevels.js";

class LevelsStorage {
  constructor() {
    if (localStorage.length < gameLevels.length) {
      gameLevels.forEach((lvl) => {
        const { level, unlocked } = lvl;
        this.#generateLevelsInStorage(level, unlocked);
      });
    }
  }

  #generateLevelsInStorage(level, isUnlocke) {
    localStorage.setItem(level, JSON.stringify({ unlocked: isUnlocke }));
  }

  addLevelToStorage(level) {
    const levelToUnlock = Number(level) + 1;
    if (
      this.getLevelFromStorage(levelToUnlock) ||
      levelToUnlock > gameLevels.length
    )
      return;
    localStorage.setItem(levelToUnlock, JSON.stringify({ unlocked: true }));
  }

  getLevelFromStorage(level) {
    const choosenLevel = localStorage.getItem(level);

    const { unlocked } = JSON.parse(choosenLevel);

    return unlocked;
  }
}

export const levelsStorage = new LevelsStorage();
