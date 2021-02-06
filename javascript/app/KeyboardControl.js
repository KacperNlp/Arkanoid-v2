export const MOVE_RIGHT = 39;
export const MOVE_LEFT = 37;
export const PAUSE_KEY_CODE = 80;
export const SETTINGS_KEY_CODE = 83;

class KeyboardControle {
  constructor() {
    this.keyCode = null;
    this.#eventsHandle();
  }

  #eventsHandle() {
    this.#moveHandle();
    this.#stopMoveHandle();
  }

  #moveHandle() {
    window.addEventListener("keydown", ({ keyCode }) => {
      this.keyCode = keyCode;
    });
  }

  #stopMoveHandle() {
    window.addEventListener("keyup", () => {
      this.keyCode = null;
    });
  }
}

export const keyboardControle = new KeyboardControle();
