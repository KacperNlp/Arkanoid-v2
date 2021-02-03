import { BindToHtml } from "./BindToHtml.js";
import { mainMenu } from "./MainMenu.js";
import {
  HIDE_ELEMENT,
  SHOW_ELEMENT,
  visibilityOfLayer,
} from "./VisibilityOfLayes.js";
import { tagsGenerator } from "./TagsGenerator.js";
import { gameLevels } from "../data/gameLevels.js";
import { game } from "./Game.js";
import { loader, DATA_LOADED_EVENT_NAME } from "./Loader.js";
import { CANVAS_BACKGROUND_SRC } from "./Canvas.js";
import { BRICKS_SPRITE_SRC, media, PADDLE_SPRITE_SRC } from "./Media.js";

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
      const button = this.#levelButtonGenerate(level, unlocked);

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

  #levelButtonGenerate(lvl, isUnlocked) {
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
      this.#levelButtonHandle(lvl);
    });

    return button;
  }

  #levelButtonHandle(lvl) {
    this.#loadLevel(lvl);
    visibilityOfLayer.changeVisibilityOfLayer(HIDE_ELEMENT, this.layer);
    visibilityOfLayer.changeVisibilityOfLayer(SHOW_ELEMENT, game.layer);
  }

  #loadLevel(lvl) {
    if (media.canvasBg && media.bricksSprite && media.paddleSprite) {
      game.newGame(lvl);
      return;
    }

    if (!media.canvasBg) {
      media.canvasBg = loader.loadImage(CANVAS_BACKGROUND_SRC);
    }

    if (!media.bricksSprite) {
      media.bricksSprite = loader.loadImage(BRICKS_SPRITE_SRC);
    }

    if (!media.paddleSprite) {
      media.paddleSprite = loader.loadImage(PADDLE_SPRITE_SRC);
    }

    window.addEventListener(DATA_LOADED_EVENT_NAME, () => game.newGame(lvl));
  }
}

export const levelsLayer = new LevelsLayer();
