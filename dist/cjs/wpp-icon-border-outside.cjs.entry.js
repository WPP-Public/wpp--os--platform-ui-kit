'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBorderOutside = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-border-outside", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4.5C5.17157 4.5 4.5 5.17157 4.5 6V14C4.5 14.8284 5.17157 15.5 6 15.5H14C14.8284 15.5 15.5 14.8284 15.5 14V6C15.5 5.17157 14.8284 4.5 14 4.5H6Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-border-outside-v2-22-0"; }
};
WppIconBorderOutside.style = wppIconCss;

exports.wpp_icon_border_outside = WppIconBorderOutside;
