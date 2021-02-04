import { Ball } from "./Ball.js";
import { BindToHtml } from "./BindToHtml.js";
import { canvas } from "./Canvas.js";
import { GameState } from "./GameState.js";
import { levelsLayer } from "./LevelsLayer.js";
import { Paddle } from "./Paddle.js";
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
    this.ball = null;
  }

  //return and settings buttons init and handle

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

  //game

  newGame(lvl) {
    this.gameState = new GameState(lvl);
    this.paddle = new Paddle();
    this.ball = new Ball();

    this.#animation();
  }

  #animation = () => {
    this.#drawElementsOnCanvas();

    window.requestAnimationFrame(this.#animation);
  };

  #drawElementsOnCanvas() {
    canvas.drawCanvas();
    this.#drawBricks();
    this.paddle.draw();
    this.ball.draw();
  }

  #drawBricks() {
    this.gameState.getGameBoard().forEach((brick) => brick.draw());
  }
}

export const game = new Game();
