'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDesktop = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-desktop", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M1.25 5C1.25 3.48122 2.48122 2.25 4 2.25H16C17.5188 2.25 18.75 3.48122 18.75 5V12C18.75 13.5188 17.5188 14.75 16 14.75H10.75V16.25H13C13.4142 16.25 13.75 16.5858 13.75 17C13.75 17.4142 13.4142 17.75 13 17.75H7C6.58579 17.75 6.25 17.4142 6.25 17C6.25 16.5858 6.58579 16.25 7 16.25H9.25V14.75H4C2.48122 14.75 1.25 13.5188 1.25 12V5ZM16 13.25C16.6904 13.25 17.25 12.6904 17.25 12V5C17.25 4.30964 16.6904 3.75 16 3.75H4C3.30964 3.75 2.75 4.30964 2.75 5V12C2.75 12.6904 3.30964 13.25 4 13.25H16Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-desktop-v3-5-0"; }
};
WppIconDesktop.style = wppIconCss;

exports.wpp_icon_desktop = WppIconDesktop;
