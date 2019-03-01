export default class Channel {
  static get events() {
    return this._EVENT_NAMES.reduce((map, eventName) => {
      map[eventName] = `${this.name}:${eventName}`;

      return map;
    }, {});
  }

  /**
   * @protected
   */
  static get _EVENT_NAMES() {
    return [];
  }

  constructor({ socket, name, args = {} }) {
    this.name = name;
    this._channel = socket.channel(name, args);

    this.constructor._EVENT_NAMES.forEach(eventName => this._bindEvent(eventName));
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
    const fullEventName = `${this.constructor.name}:${eventName}`;

    this._channel.on(eventName, event => window.EventBus.dispatch(fullEventName, this, event));
  }
}
