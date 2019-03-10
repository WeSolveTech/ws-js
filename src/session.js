const decodeJWT = require('jwt-decode');

export default class Session {
  constructor() {
    const tokenMetaElement = document.querySelector('meta[name="wss"]');

    if (tokenMetaElement) {
      const token = tokenMetaElement.getAttribute('content');

      if (token) {
        const { wss } = decodeJWT(token);

        this.data = wss;
        this.token = token;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    }
  }
}
