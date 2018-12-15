import DOMElement from './dom-element';
import Component from './component';

export default class View extends DOMElement {
  mount() {
    super.mount();
    Component.mountComponents();
  }
};
