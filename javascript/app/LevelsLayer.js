import { BindToHtml } from "./BindToHtml.js";
import { mainMenu } from "./MainMenu.js";
import {
  HIDE_ELEMENT,
  SHOW_ELEMENT,
  visibilityOfLayer,
} from "./VisibilityOfLayes.js";

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
  }

  #buttonsHandle() {
    this.#returnButtonHandle();
    this.#settingsButtonHandle();
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
}

export const levelsLayer = new LevelsLayer();
