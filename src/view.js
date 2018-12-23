import DOMElement from './dom-element';
import Component from './component';
import Session from './session';

export default class View extends DOMElement {
  mount() {
    super.mount();
    this.session = new Session();
    Component.mountComponents();
  }
};
