import {$} from '@core/dom';

export class Player {
  constructor(selector, options = {}) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'player');

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);

      // DEBUG
      const component = new Component($el);
      // if (component.name) {
      //   window['c' + component.name] = component;
      // }

      $el.html(component.toHTML());
      $root.append($el);

      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach(comp => comp.init());
  }
}
