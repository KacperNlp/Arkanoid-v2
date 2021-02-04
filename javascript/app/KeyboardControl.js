export const MOVE_RIGHT = 39;
export const MOVE_LEFT = 37;

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
