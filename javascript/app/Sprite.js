import { canvas } from "./Canvas.js";

const VALUE_OF_ALPHA = 255;

export class Sprite {
  constructor(
    posXOnCanvas,
    posYOnCanvas,
    width,
    height,
    positionXOnSprite,
    positionYOnSprite,
    sprite
  ) {
    this.alpha = VALUE_OF_ALPHA;
    this.posX = posXOnCanvas;
    this.posY = posYOnCanvas;
    this.width = width;
    this.height = height;
    this.spritePosX = positionXOnSprite;
    this.spritePosY = positionYOnSprite;
    this.sprite = sprite;
  }

  draw(posX = 0, posY = 0) {
    if (this.alpha !== VALUE_OF_ALPHA) {
      canvas.ctx.globalAlpha = this.alpha / VALUE_OF_ALPHA;
    }

    const posXOfSprite = this.spritePosX * posX;
    const posYOfSprite = this.spritePosY * posY;

    canvas.ctx.drawImage(
      this.sprite,
      posXOfSprite,
      posYOfSprite,
      this.width,
      this.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );

    if (this.alpha !== VALUE_OF_ALPHA) {
      canvas.ctx.globalAlpha = 1;
    }
  }

  colissionWithAnotherSprite(vectors, anotherSprite) {
    const [directionX, directionY] = this.getDirectionsOfCurrentSprite(vectors);

    if (
      anotherSprite.posX < directionX &&
      anotherSprite.posX + anotherSprite.width > directionX &&
      anotherSprite.posY < directionY &&
      anotherSprite.posY + anotherSprite.height > directionY
    ) {
      return true;
    }

    return false;
  }

  getDirectionsOfCurrentSprite(vectors) {
    const { directionX, directionY } = vectors;

    const vectorDirectionX =
      directionX < 0 ? this.posX : this.posX + this.width;
    const vectorDirectionY =
      directionY < 0 ? this.posY : this.posY + this.height;

    return [vectorDirectionX, vectorDirectionY];
  }
}
