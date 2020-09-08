import {DOMListener} from '@core/DomListener';

export class PlayerComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || ''
  }
  // Возвращает шаблон компонента
  toHTML() {
    return '<div>Component</div>';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDomListeners();
  }
}
