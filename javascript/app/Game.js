import { BindToHtml } from "./BindToHtml.js";
import { canvas } from "./Canvas.js";
import { levelsLayer } from "./LevelsLayer.js";
import {
  HIDE_ELEMENT,
  SHOW_ELEMENT,
  visibilityOfLayer,
} from "./VisibilityOfLayes.js";

const GAME_LAYER_ID = "game-layer";
const RETURN_BUTTON_ID = "return-button-in-game";
const SETTINGS_BUTTON_ID = "settings-button-in-game";

class Game extends BindToHtml {
  constructor() {
    super(GAME_LAYER_ID);
    this.#init();

    this.gameState = null;
    this.paddle = null;
  }

  #init() {
    this.#handleOfReturnButton();
    this.#handleOfSettingsButton();
  }

  #handleOfReturnButton() {
    const button = this.bindById(RETURN_BUTTON_ID);
    button.addEventListener("click", () => {
      levelsLayer.generateLevelsBoard();

      visibilityOfLayer.changeVisibilityOfLayer(HIDE_ELEMENT, this.layer);
      visibilityOfLayer.changeVisibilityOfLayer(
        SHOW_ELEMENT,
        levelsLayer.layer
      );
    });
  }

  #handleOfSettingsButton() {
    const button = this.bindById(SETTINGS_BUTTON_ID);
    button.addEventListener("click", () => {
      console.log("settings");
    });
  }

  newGame(lvl) {
    canvas.drawCanvas();
  }
}

export const game = new Game();