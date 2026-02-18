'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCircle = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-circle", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M10 3.2C6.24446 3.2 3.2 6.24446 3.2 10C3.2 13.7555 6.24446 16.8 10 16.8C13.7555 16.8 16.8 13.7555 16.8 10C16.8 6.24446 13.7555 3.2 10 3.2ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-circle-v4-0-0"; }
};
WppIconCircle.style = wppIconCss;

exports.wpp_icon_circle = WppIconCircle;
