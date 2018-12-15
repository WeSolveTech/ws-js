export default class DOMElement {
  mount() {
    console.debug(`${this.constructor.name} mounted`);
  }

  unmount() {
    console.debug(`${this.constructor.name} unmounted`);
  }
};
