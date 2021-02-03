import { BindToHtml } from "./BindToHtml.js";
import {
  HIDE_ELEMENT,
  SHOW_ELEMENT,
  visibilityOfLayer,
} from "./VisibilityOfLayes.js";
import { levelsLayer } from "./LevelsLayer.js";

const MAIN_MENU_LAYER_ID = "main-menu";
const SETTINGS_BUTTON_ID = "settings-button";
const START_GAME_BUTTON_ID = "start-game-button";

class MainMenu extends BindToHtml {
  constructor() {
    super(MAIN_MENU_LAYER_ID);
    this.#init();
  }

  #init() {
    this.#handleStartButton();
    this.#handleSettingsButton();
  }

  #handleStartButton() {
    const button = this.bindById(START_GAME_BUTTON_ID);
    button.addEventListener("click", () => {
      visibilityOfLayer.changeVisibilityOfLayer(HIDE_ELEMENT, this.layer);
      visibilityOfLayer.changeVisibilityOfLayer(
        SHOW_ELEMENT,
        levelsLayer.layer
      );
    });
  }

  #handleSettingsButton() {
    const button = this.bindById(SETTINGS_BUTTON_ID);
    button.addEventListener("click", () => {
      console.log("settings");
    });
  }
}

export const mainMenu = new MainMenu();
