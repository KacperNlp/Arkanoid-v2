import { media } from "./Media.js";
import { Sprite } from "./Sprite.js";

export const BRICK_WIDTH = 116;
export const BRICK_HEIGHT = 52;

export class Brick extends Sprite {
  constructor(row, column, kind) {
    super(
      column * BRICK_WIDTH,
      row * BRICK_HEIGHT,
      BRICK_WIDTH,
      BRICK_HEIGHT,
      BRICK_WIDTH,
      BRICK_HEIGHT,
      media.bricksSprite
    );
    this.hp = kind + 2;
    this.kind = kind;
  }

  draw() {
    let posX,
      posY = 0;

    if (this.hp > 1) {
      posX = this.kind;
    } else {
      posY = 1;
    }

    super.draw(posX, posY);
  }
}
