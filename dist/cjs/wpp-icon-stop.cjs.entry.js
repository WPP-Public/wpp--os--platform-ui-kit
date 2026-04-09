'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconStop = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-stop", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M15.6389 4.16667C15.7463 4.16667 15.8333 4.25372 15.8333 4.36111V15.6389C15.8333 15.7463 15.7463 15.8333 15.6389 15.8333H4.36111C4.25372 15.8333 4.16667 15.7463 4.16667 15.6389V4.36111C4.16667 4.25372 4.25372 4.16667 4.36111 4.16667H15.6389ZM4.36111 3C3.60939 3 3 3.60939 3 4.36111V15.6389C3 16.3906 3.60939 17 4.36111 17H15.6389C16.3906 17 17 16.3906 17 15.6389V4.36111C17 3.60939 16.3906 3 15.6389 3H4.36111Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-stop-v3-6-0"; }
};
WppIconStop.style = wppIconCss;

exports.wpp_icon_stop = WppIconStop;
