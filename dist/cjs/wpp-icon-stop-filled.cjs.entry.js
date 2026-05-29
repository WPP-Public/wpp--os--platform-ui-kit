'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconStopFilled = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-stop-filled", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M3 4.36111C3 3.60939 3.60939 3 4.36111 3H15.6389C16.3906 3 17 3.60939 17 4.36111V15.6389C17 16.3906 16.3906 17 15.6389 17H4.36111C3.60939 17 3 16.3906 3 15.6389V4.36111Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-stop-filled-v4-1-0"; }
};
WppIconStopFilled.style = wppIconCss;

exports.wpp_icon_stop_filled = WppIconStopFilled;
