import { Sprite } from "./Sprite.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./Canvas.js";
import { media } from "./Media.js";

const KINDS_OF_PADDLE = 5;
const PADDLE_WIDTH = 232;
export const PADDLE_HEIGHT = 51;
const PADDLE_POSITION_ON_X_AXIS_IN_CANVAS = CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2;
export const PADDLE_POSITION_ON_Y_AXIS_IN_CANVAS =
  CANVAS_HEIGHT - PADDLE_HEIGHT - 10;

export class Paddle extends Sprite {
  constructor() {
    const kind = Math.floor(Math.random() * KINDS_OF_PADDLE);
    super(
      PADDLE_POSITION_ON_X_AXIS_IN_CANVAS,
      PADDLE_POSITION_ON_Y_AXIS_IN_CANVAS,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      PADDLE_WIDTH,
      0,
      media.paddleSprite
    );

    this.kind = kind;
  }

  draw() {
    super.draw(this.kind);
  }
}
