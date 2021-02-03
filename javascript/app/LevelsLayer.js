import { BindToHtml } from "./BindToHtml.js";
import { mainMenu } from "./MainMenu.js";
import {
  HIDE_ELEMENT,
  SHOW_ELEMENT,
  visibilityOfLayer,
} from "./VisibilityOfLayes.js";
import { tagsGenerator } from "./TagsGenerator.js";
import { gameLevels } from "../data/gameLevels.js";

const LEVEL_BUTTON_CLASS = {
  basic: "button",
  lvlButton: "button--level",
  locked: "fas fa-lock",
};
const LEVELS_BOARD_ID = "levels-board";
const LEVELS_LAYER_ID = "levels-layer";
const RETURN_BUTTON_ID = "return-button-in-levels-layer";
const SETTINGS_BUTTON_ID = "settings-button-in-levels-layer";

class LevelsLayer extends BindToHtml {
  constructor() {
    super(LEVELS_LAYER_ID);
    this.#init();
  }

  #init() {
    this.#buttonsHandle();
    this.generateLevelsBoard();
  }

  #buttonsHandle() {
    this.#returnButtonHandle();
    this.#settingsButtonHandle();
  }

  generateLevelsBoard() {
    const levelsBoard = this.bindById(LEVELS_BOARD_ID);
    this.#clearBoard(levelsBoard);

    gameLevels.forEach((lvl) => {
      const { level, unlocked } = lvl;
      const button = this.#levelButtonHandle(level, unlocked);

      levelsBoard.appendChild(button);
    });
  }

  #returnButtonHandle() {
    const button = this.bindById(RETURN_BUTTON_ID);
    button.addEventListener("click", () => {
      visibilityOfLayer.changeVisibilityOfLayer(HIDE_ELEMENT, this.layer);
      visibilityOfLayer.changeVisibilityOfLayer(SHOW_ELEMENT, mainMenu.layer);
    });
  }

  #settingsButtonHandle() {
    const button = this.bindById(SETTINGS_BUTTON_ID);
    button.addEventListener("click", () => {
      console.log("settings");
    });
  }

  #clearBoard(board) {
    while (board.firstChild) {
      board.removeChild(board.lastChild);
    }
  }

  #levelButtonHandle(lvl, isUnlocked) {
    const { basic, lvlButton, locked } = LEVEL_BUTTON_CLASS;

    const button = tagsGenerator.createTag("button");
    button.setAttribute("class", `${basic} ${lvlButton}`);

    button.textContent = lvl;

    if (!isUnlocked) {
      const padlock = tagsGenerator.createTag("span");
      padlock.setAttribute("class", locked);

      button.appendChild(padlock);
    }

    button.addEventListener("click", () => {
      console.log(lvl);
    });

    return button;
  }
}

export const levelsLayer = new LevelsLayer();
