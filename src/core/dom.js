export class Dom {
  constructor(selector) {
    this.$el = typeof selector == 'string'
      ? document.querySelector(selector)
      : this.$el = selector;
  }

  closest(selector) {
    const el = this.$el.closest(selector)
    return el ? $(el) : null;
  }

  get data() {
    return this.$el.dataset;
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  html(template) {
    if (typeof template === 'string') {
      this.$el.innerHTML = template;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
    return this;
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
    return this;
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    this.$el.append(node instanceof Dom ? node.$el : node);
    return this;
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  find(selector) {
    const el = this.$el.querySelector(selector);

    return el ? $(el) : null;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);

  classes && el.classList.add(classes);
  return $(el);
}
