export const BALL_SPRITE_SRC = "/assets/Balls/ballsSprite (1).png";
export const BRICKS_SPRITE_SRC = "/assets/Bricks/bricksSprite.png";
export const PADDLE_SPRITE_SRC = "/assets/Bats/batsSprite.png";
export const MUSIC_SRC = "/assets/sounds/music-background.mp3";
export const BRICK_HIT_SOUND_SRC = "/assets/sounds/brick-hit-sound.wav";

class Media {
  constructor() {
    this.ballsSprite = null;
    this.bricksSprite = null;
    this.canvasBg = null;
    this.paddleSprite = null;
  }
}

export const media = new Media();
