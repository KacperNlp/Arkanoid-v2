import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./Canvas.js";
import { Sprite } from "./Sprite.js";
import { PADDLE_POSITION_ON_Y_AXIS_IN_CANVAS } from "./Paddle.js";
import { media } from "./Media.js";

export const BALL_SIZE = 25;
const INITNIAL_POSITION_ON_X_AXIS_ON_CANVAS = CANVAS_WIDTH / 2 - BALL_SIZE / 2;
const INITNIAL_POSITION_ON_Y_AXIS_ON_CANVAS =
  PADDLE_POSITION_ON_Y_AXIS_IN_CANVAS - BALL_SIZE;
const KINDS_OF_BALL = 6;

export class Ball extends Sprite {
  constructor() {
    const kind = Math.floor(Math.random() * KINDS_OF_BALL);
    super(
      INITNIAL_POSITION_ON_X_AXIS_ON_CANVAS,
      INITNIAL_POSITION_ON_Y_AXIS_ON_CANVAS,
      BALL_SIZE,
      BALL_SIZE,
      BALL_SIZE,
      0,
      media.ballsSprite
    );

    this.kind = kind;
    this.directionX = -6;
    this.directionY = -5;
  }

  draw() {
    super.draw(this.kind);
  }

  changeDirectionX() {
    this.directionX = -this.directionX;
  }

  changeDirectionY() {
    this.directionY = -this.directionY;
  }

  ballIsOutsideTheMap() {
    return this.posY > CANVAS_HEIGHT;
  }
}
