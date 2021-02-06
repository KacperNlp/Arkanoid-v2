import { BindToHtml } from "./BindToHtml.js";
import { media } from "./Media.js";
import { HIDE_ELEMENT, visibilityOfLayer } from "./VisibilityOfLayes.js";

const SETTINGS_CLOSE_BUTTON_ID = "settings-close-btn";
const SETTINGS_GAME_SOUND_INPUT_ID = "game-sounds-volume";
const SETTINGS_LAYER_ID = "settings-layer";
const SETTINGS_MUSIC_INPUT_ID = "music-sounds-volume";

class Settings extends BindToHtml {
  constructor() {
    super(SETTINGS_LAYER_ID);
    this.#init();
  }

  #init() {
    this.#closeButtonHandle();
    this.#addEventOnBar(SETTINGS_GAME_SOUND_INPUT_ID);
    this.#addEventOnBar(SETTINGS_MUSIC_INPUT_ID);
  }

  #closeButtonHandle() {
    const button = this.bindById(SETTINGS_CLOSE_BUTTON_ID);

    button.addEventListener("click", () => {
      visibilityOfLayer.changeVisibilityOfLayer(HIDE_ELEMENT, this.layer);
    });
  }

  #addEventOnBar(id) {
    const bar = this.bindById(id);

    bar.addEventListener("change", this.#handleChangesInSettings);
  }

  #handleChangesInSettings = (event) => {
    const { target } = event;
    const volume = target.value / 100;
    const inputId = target.getAttribute("id");

    if (inputId === SETTINGS_MUSIC_INPUT_ID) {
      media.changeMusic(volume);
    } else if (inputId === SETTINGS_GAME_SOUND_INPUT_ID) {
      media.changeGameSound(volume);
    }
  };
}

export const settings = new Settings();
