import { BindToHtml } from "./BindToHtml.js";
import { game } from "./Game.js";
import { levelsLayer } from "./LevelsLayer.js";
import {
  HIDE_ELEMENT,
  SHOW_ELEMENT,
  visibilityOfLayer,
} from "./VisibilityOfLayes.js";

const GAME_RESULT_CONTAINER_ID = "message-result";
const MESSAGE_LAYER_ID = "message-container";
const RETURN_BUTTON_ID = "return-message-btn";
const TRY_AGAIN_BUTTON_ID = "try-again-message-btn";
const TYPE_OF_MESSAGES = {
  won: "You Won!",
  lost: "You lost... :/",
};

class Message extends BindToHtml {
  constructor() {
    super(MESSAGE_LAYER_ID);
    this.#initButtonsHandle();
  }

  #initButtonsHandle() {
    this.#handleReturnButton();
    this.#handleTryAgainButton();
  }

  #handleReturnButton() {
    const button = this.bindById(RETURN_BUTTON_ID);

    button.addEventListener("click", () => {
      levelsLayer.generateLevelsBoard();

      visibilityOfLayer.changeVisibilityOfLayer(
        SHOW_ELEMENT,
        levelsLayer.layer
      );
      visibilityOfLayer.changeVisibilityOfLayer(HIDE_ELEMENT, game.layer);
      this.#hideMessageLayer();
    });
  }

  #handleTryAgainButton() {
    const button = this.bindById(TRY_AGAIN_BUTTON_ID);

    button.addEventListener("click", () => {
      const level = Number(game.gameState.getLevel());
      game.newGame(level);
      this.#hideMessageLayer();
    });
  }

  showMessage(result) {
    const { won, lost } = TYPE_OF_MESSAGES;
    const resultContainer = this.bindById(GAME_RESULT_CONTAINER_ID);

    if (result) {
      resultContainer.textContent = won;
    } else {
      resultContainer.textContent = lost;
    }
  }

  #hideMessageLayer() {
    visibilityOfLayer.changeVisibilityOfLayer(HIDE_ELEMENT, this.layer);
  }
}

export const message = new Message();
