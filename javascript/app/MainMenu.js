import { BindToHtml } from "./BindToHtml.js";
import {
  HIDE_ELEMENT,
  SHOW_ELEMENT,
  visibilityOfLayer,
} from "./VisibilityOfLayes.js";
import { levelsLayer } from "./LevelsLayer.js";
import { settings } from "./Settings.js";
import { MUSIC_SRC, BRICK_HIT_SOUND_SRC } from "./Media.js";
import { loader } from "./Loader.js";

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
    this.#setMusicAndGameSound();
  }

  #handleStartButton() {
    const button = this.bindById(START_GAME_BUTTON_ID);
    button.addEventListener("click", () => {
      levelsLayer.generateLevelsBoard();
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
      visibilityOfLayer.changeVisibilityOfLayer(SHOW_ELEMENT, settings.layer);
    });
  }

  #setMusicAndGameSound() {
    settings.music = loader.loadAudio(MUSIC_SRC);
    settings.gameSound = loader.loadAudio(BRICK_HIT_SOUND_SRC);
    settings.playMusic();
  }
}

export const mainMenu = new MainMenu();
