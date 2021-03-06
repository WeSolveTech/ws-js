import Config from './config.js';
const EventBus = require('eventbusjs');

window.EventBus = EventBus;

export default class Application {
  static start() {
    const app = new this();
    window.addEventListener('DOMContentLoaded', () => app.start(), false);
    window.addEventListener('unload', () => app.stop(), false);
  }

  static get config() {
    return Config.load(); // TODO: memoize
  }

  start() {
    const viewName = document.querySelector('body').dataset.wsView;
    let View;

    try {
      View = require(`App/views/${viewName}`);

      this.currentView = new View();
      this.currentView.mount();
    } catch(e) {
      console.debug(`Cannot require View ${viewName}`);
      console.debug(e);
      this.currentView = null;
    }
  }

  stop() {
    if (this.currentView) this.currentView.unmount();
  }
}
