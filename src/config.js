export default class Config {
  static load() {
    let configMetaElement = document.querySelector('meta[name="ws-config"]');

    try {
      let encodedConfig = configMetaElement.getAttribute('content');
      let config = JSON.parse(atob(encodedConfig));

      return config;
    } catch(error) {
      console.error('Can not load app configuration. Check your <meta name="ws-config">');

      return {};
    }
  }
}
