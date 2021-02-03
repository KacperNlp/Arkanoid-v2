const HIDDEN_CLASS = "hidden";
export const HIDE_ELEMENT = true;
export const SHOW_ELEMENT = false;

class VisibilityOfLayer {
  changeVisibilityOfLayer(hide, layer) {
    if (hide === HIDE_ELEMENT) {
      layer.classList.add(HIDDEN_CLASS);
    } else {
      layer.classList.remove(HIDDEN_CLASS);
    }
  }
}

export const visibilityOfLayer = new VisibilityOfLayer();
