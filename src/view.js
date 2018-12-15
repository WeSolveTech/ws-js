import DOMElement from './dom-element';
import Component from './component';

module.exports = class View extends DOMElement {
  mount() {
    super.mount();
    Component.mountComponents();
  }
};
