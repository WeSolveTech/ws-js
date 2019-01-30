import DOMElement from './dom-element';
import { camelize } from './utils/string';

const EVENT_NAMES = ['blur', 'change', 'click', 'focus', 'submit'];

export default class Component extends DOMElement {
  constructor({ element }) {
    super();
    this.element = element;
  }

  static mountComponents() {
    document.querySelectorAll('[data-ws-component]').forEach((element) => {
      const componentName = element.dataset.wsComponent;
      const Component = require(`App/components/${componentName}`);
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
    const eventListenerName = element.dataset[camelize(`ws-on-${eventName}`)];

    if (eventListenerName) {
      element.addEventListener(eventName, this[eventListenerName].bind(this));
    }
  }
};

