import { camelize } from './utils/string';

export default class Channel {
  constructor({ socket, name, events = [], args = {} }) {
    this.name = name;
    this._channel = socket.channel(name, args);

    events.forEach(eventName => this._bindEvent(eventName));
  }

  join() {
    this._channel.join()
      .receive('ok', this.didJoin.bind(this))
      .receive('error', this.didNotJoin.bind(this));
  }

  didJoin(ack) {
    console.debug(`Joinned channel "${this.name}"`, ack);
  }

  didNotJoin(error) {
    console.debug(`Unable to join channel "${this.name}"`, error);
  }

  /**
   * @private
   */
  _bindEvent(eventName) {
    const handlerName = camelize(`on-${eventName}`);

    this._channel.on(eventName, this[handlerName].bind(this));    
  }
}