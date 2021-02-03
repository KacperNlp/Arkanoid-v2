import { Sprite } from "./Sprite.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./Canvas.js";
import { media } from "./Media.js";

const PADDLE_WIDTH = 232;
const PADDLE_HEIGHT = 51;
const PADDLE_POSITION_ON_X_AXIS_IN_CANVAS = CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2;
const PADDLE_POSITION_ON_Y_AXIS_IN_CANVAS = CANVAS_HEIGHT - PADDLE_HEIGHT - 10;

export class Paddle extends Sprite {
  constructor() {
    const kind = 2;
    super(
      PADDLE_POSITION_ON_X_AXIS_IN_CANVAS,
      PADDLE_POSITION_ON_Y_AXIS_IN_CANVAS,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      PADDLE_WIDTH * kind,
      0,
      media.paddleSprite
    );

    this.kind = kind;
  }

  draw() {
    super.draw(this.kind);
  }
}
