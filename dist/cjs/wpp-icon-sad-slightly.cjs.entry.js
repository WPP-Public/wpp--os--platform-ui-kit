'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSadSlightly = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-sad-slightly", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M8.59854 8.39922C8.59854 7.84733 8.15115 7.39994 7.59927 7.39994C7.04738 7.39994 6.59999 7.84733 6.59999 8.39922C6.59999 8.9511 7.04738 9.39849 7.59927 9.39849C8.15115 9.39849 8.59854 8.9511 8.59854 8.39922ZM13.3978 8.39922C13.3978 7.84733 12.9504 7.39994 12.3985 7.39994C11.8466 7.39994 11.3992 7.84733 11.3992 8.39922C11.3992 8.9511 11.8466 9.39849 12.3985 9.39849C12.9504 9.39849 13.3978 8.9511 13.3978 8.39922ZM12.9981 11.5984C12.3178 11.5984 11.593 11.7698 10.9651 12.0142C10.3444 12.2558 9.75472 12.5935 9.37437 12.9739C9.14009 13.2082 9.14009 13.588 9.37437 13.8223C9.60865 14.0566 9.98849 14.0566 10.2228 13.8223C10.4423 13.6027 10.865 13.3406 11.4003 13.1323C11.9285 12.9267 12.5035 12.7982 12.9981 12.7982H13.478C13.8093 12.7982 14.0779 12.5296 14.0779 12.1983C14.0779 11.867 13.8093 11.5984 13.478 11.5984H12.9981ZM17.9985 9.99902C17.9985 5.58075 14.4168 1.99902 9.99854 1.99902C5.58026 1.99902 1.99854 5.58075 1.99854 9.99902C1.99854 14.4173 5.58026 17.999 9.99854 17.999C14.4168 17.999 17.9985 14.4173 17.9985 9.99902ZM3.19835 9.99902C3.19835 6.24338 6.2429 3.19884 9.99854 3.19884C13.7542 3.19884 16.7987 6.24338 16.7987 9.99902C16.7987 13.7547 13.7542 16.7992 9.99854 16.7992C6.2429 16.7992 3.19835 13.7547 3.19835 9.99902Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-sad-slightly-v4-1-0"; }
};
WppIconSadSlightly.style = wppIconCss;

exports.wpp_icon_sad_slightly = WppIconSadSlightly;
