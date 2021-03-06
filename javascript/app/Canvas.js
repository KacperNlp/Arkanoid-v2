import { BindToHtml } from "./BindToHtml.js";
import { loader } from "./Loader.js";
import { media } from "./Media.js";

export const CANVAS_BACKGROUND_SRC = "/assets/Background/background.jpg";
const CANVAS_ID = "canvas";
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

class Canvas extends BindToHtml {
  constructor() {
    super(CANVAS_ID);
    this.ctx = null;

    this.#init();
  }

  #init() {
    this.ctx = this.layer.getContext("2d");
    this.ctx.canvas.width = CANVAS_WIDTH;
    this.ctx.canvas.height = CANVAS_HEIGHT;
  }

  drawCanvas() {
    this.ctx.drawImage(media.canvasBg, 0, 0);
  }
}

export const canvas = new Canvas();
