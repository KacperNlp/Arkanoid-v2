import { BindToHtml } from "./BindToHtml.js";
import {
  HIDE_ELEMENT,
  SHOW_ELEMENT,
  visibilityOfLayer,
} from "./VisibilityOfLayes.js";

export const DATA_LOADED_EVENT_NAME = "data-loaded";
const ELEMENTS_TO_BE_LOADED = "to-load";
const LOADED_ELEMENTS_ID = "loaded-elements";
const LOADER_ID = "loader";

class Loader extends BindToHtml {
  constructor() {
    super(LOADER_ID);

    this.counterOfElementsToLoad = 0;
    this.counterOfLoadedElements = 0;
    this.elementsToLoad = null;
    this.loadedElements = null;
    this.isAllLoaded = true;

    this.#bindHtmlElements();
  }

  #bindHtmlElements() {
    this.elementsToLoad = this.bindById(ELEMENTS_TO_BE_LOADED);
    this.loadedElements = this.bindById(LOADED_ELEMENTS_ID);
  }

  loadImage(imageUrl) {
    visibilityOfLayer.changeVisibilityOfLayer(SHOW_ELEMENT, this.layer);

    this.isAllLoaded = false;
    this.counterOfElementsToLoad++;
    this.elementsToLoad.textContent = this.counterOfElementsToLoad;

    const img = new Image();
    img.src = imageUrl;
    img.addEventListener("load", (event) => this.#itemLoaded(event), false);

    return img;
  }

  #itemLoaded(event) {
    event.target.removeEventListener(event.type, this.#itemLoaded, false);
    this.counterOfLoadedElements++;
    this.loadedElements.textContent = this.counterOfLoadedElements;

    if (this.counterOfLoadedElements === this.counterOfElementsToLoad) {
      this.#clearFlags();
      visibilityOfLayer.changeVisibilityOfLayer(HIDE_ELEMENT, this.layer);
      window.dispatchEvent(new CustomEvent(DATA_LOADED_EVENT_NAME));
    }
  }

  #clearFlags() {
    this.counterOfElementsToLoad = 0;
    this.counterOfLoadedElements = 0;
    this.isAllLoaded = true;
  }
}

export const loader = new Loader();
