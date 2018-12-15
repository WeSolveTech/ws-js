import DOMElement from './dom-element';
import { camelize } from './utils/string';

module.exports = class Component extends DOMElement {
  constructor({ element }) {
    super();
    this.element = element;
  }

  static mountComponents() {
    document.querySelectorAll('[data-ws-component]').forEach((element) => {
      const componentName = element.dataset.wsComponent;
      const Component = require(`app/components/${componentName}`);
      new Component({ element }).mount();
    });
  }

  mount() {
    super.mount();
    ['blur', 'change', 'click', 'focus', 'submit'].forEach(
      name => listenToElementEvent(this, name)
    );
  }
};

function listenToElementEvent(view, eventName) {
  const elements = view.element.querySelectorAll(`[data-ws-on-${eventName}]`);

  elements.forEach((element) => {
    const eventHandlerName = element.dataset[camelize(`ws-on-${eventName}`)];

    element.addEventListener(eventName, (...args) => view[eventHandlerName](args));
  });
}
