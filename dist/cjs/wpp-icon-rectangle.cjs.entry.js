'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRectangle = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-rectangle", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.5 13.5C3.5 14.1904 4.05964 14.75 4.75 14.75L15.25 14.75C15.9404 14.75 16.5 14.1904 16.5 13.5L16.5 6.5C16.5 5.80964 15.9404 5.25 15.25 5.25L4.75 5.25C4.05964 5.25 3.5 5.80964 3.5 6.5L3.5 13.5ZM4.75 16.25C3.23122 16.25 2 15.0188 2 13.5L2 6.5C2 4.98122 3.23122 3.75 4.75 3.75L15.25 3.75C16.7688 3.75 18 4.98122 18 6.5L18 13.5C18 15.0188 16.7688 16.25 15.25 16.25L4.75 16.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-rectangle-v2-22-0"; }
};
WppIconRectangle.style = wppIconCss;

exports.wpp_icon_rectangle = WppIconRectangle;
