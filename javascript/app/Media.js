export const BALL_SPRITE_SRC = "/assets/Balls/ballsSprite (1).png";
export const BRICKS_SPRITE_SRC = "/assets/Bricks/bricksSprite.png";
export const PADDLE_SPRITE_SRC = "/assets/Bats/batsSprite.png";

class Media {
  constructor() {
    this.ballsSprite = null;
    this.bricksSprite = null;
    this.canvasBg = null;
    this.paddleSprite = null;
    //sounds
    this.gameSound = 0.3;
    this.music = 0.3;
  }

  changeGameSound(volume) {
    this.gameSound = volume;
  }

  changeMusic(volume) {
    this.music = volume;
  }
}

export const media = new Media();
