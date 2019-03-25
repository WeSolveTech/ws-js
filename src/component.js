import DOMElement from './dom-element';
import { camelize } from './utils/string';

const EVENT_NAMES = ['blur', 'change', 'click', 'focus', 'submit', 'keypress'];

export default class Component extends DOMElement {
  constructor({ element }) {
    super();
    this.element = element;
  }

  static mountComponents() {
    document.querySelectorAll('[data-ws-component]').forEach((element) => {
      let Component;
      try {
        const componentName = element.dataset.wsComponent;
        Component = require(`App/components/${componentName}`);
      } catch(e) {
      }

      new Component({ element }).mount();
    });
  }

  mount() {
    super.mount();
    EVENT_NAMES.forEach(eventName => this._addAllEventListeners(eventName));
  }

  _addAllEventListeners(eventName) {
    this._addEventListener(this.element, eventName);

    const nestedElements = this.element.querySelectorAll(`[data-ws-on-${eventName}]`);

    nestedElements.forEach(element => this._addEventListener(element, eventName));
  }

  _addEventListener(element, eventName) {
    const eventHandlerName = element.dataset[camelize(`ws-on-${eventName}`)];

    if (eventHandlerName) {
      const eventHandler = this[eventHandlerName];

      if (eventHandler) {
        element.addEventListener(eventName, eventHandler.bind(this), false);
      } else {
        console.debug(`${this.constructor.name} does not implement event handler "${eventHandlerName}"`);
      }
    }
  }
};
