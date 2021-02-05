import { Ball, BALL_SIZE } from "./Ball.js";
import { BindToHtml } from "./BindToHtml.js";
import { canvas, CANVAS_WIDTH } from "./Canvas.js";
import { GameState } from "./GameState.js";
import { levelsLayer } from "./LevelsLayer.js";
import { Paddle, PADDLE_SPEED } from "./Paddle.js";
import {
  HIDE_ELEMENT,
  SHOW_ELEMENT,
  visibilityOfLayer,
} from "./VisibilityOfLayes.js";
import { keyboardControle, MOVE_LEFT, MOVE_RIGHT } from "./KeyboardControl.js";

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
    this.#ballAnimation();
    this.#paddleHandle();

    window.requestAnimationFrame(this.#animation);
  };

  #drawElementsOnCanvas() {
    canvas.drawCanvas();
    this.#drawBricks();
    this.paddle.draw();
    this.ball.draw();
  }

  #ballAnimation() {
    this.#collisionWithMapEdges();
    this.#collisionWithBricksAndMove();
    this.#collisionWithPaddle();
  }

  #paddleHandle() {
    const { keyCode } = keyboardControle;

    switch (keyCode) {
      case MOVE_RIGHT:
        for (
          let i = PADDLE_SPEED;
          i && this.paddle.isPaddleOnRightEdge();
          i--
        ) {
          this.paddle.posX++;
        }
        break;

      case MOVE_LEFT:
        for (let i = PADDLE_SPEED; i && this.paddle.isPaddleOnLeftEdge(); i--) {
          this.paddle.posX--;
        }
        break;
    }
  }

  #drawBricks() {
    this.gameState.getGameBoard().forEach((brick) => brick.draw());
  }

  #collisionWithMapEdges() {
    const { posX, posY } = this.ball;

    if (posX <= 0 || posX + BALL_SIZE >= CANVAS_WIDTH) {
      this.ball.changeDirectionX();
    }

    if (posY <= 0) {
      this.ball.changeDirectionY();
    }
  }

  #collisionWithBricksAndMove() {
    const { directionX, directionY } = this.ball;
    const hitBricks = [];

    const vectores = {
      directionX,
      directionY,
    };

    this.ball.posX += directionX;

    this.gameState.getGameBoard().forEach((brick, id) => {
      if (this.ball.colissionWithAnotherSprite(vectores, brick)) {
        hitBricks.push(id);
        this.ball.changeDirectionX();
      }
    });

    this.ball.posY += directionY;

    this.gameState.getGameBoard().forEach((brick, id) => {
      if (this.ball.colissionWithAnotherSprite(vectores, brick)) {
        if (!hitBricks.includes(id)) {
          hitBricks.push(id);
        }
        this.ball.changeDirectionY();
      }
    });

    if (hitBricks.length) console.log(hitBricks);

    this.#displayBricks(hitBricks, this.gameState.getGameBoard());
  }

  #collisionWithPaddle() {
    const { directionX, directionY } = this.ball;

    if (directionY < 0) return;

    const vectores = {
      directionX,
      directionY,
    };

    if (this.ball.colissionWithAnotherSprite(vectores, this.paddle)) {
      this.ball.changeDirectionY();
    }
  }

  #displayBricks(hitBricksArray, blocks) {
    hitBricksArray.forEach((id) => {
      blocks[id].hp--;
      if (!blocks[id].hp) {
        blocks.splice(id, 1);
      }
    });
  }
}

export const game = new Game();
