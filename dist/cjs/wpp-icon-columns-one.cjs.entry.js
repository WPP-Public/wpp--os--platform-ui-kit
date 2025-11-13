'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconColumnsOne = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-columns-one", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.5 3.5C5.80964 3.5 5.25 4.05964 5.25 4.75V15.25C5.25 15.9404 5.80964 16.5 6.5 16.5H13.5C14.1904 16.5 14.75 15.9404 14.75 15.25V4.75C14.75 4.05964 14.1904 3.5 13.5 3.5H6.5ZM3.75 4.75C3.75 3.23122 4.98122 2 6.5 2H13.5C15.0188 2 16.25 3.23122 16.25 4.75V15.25C16.25 16.7688 15.0188 18 13.5 18H6.5C4.98122 18 3.75 16.7688 3.75 15.25V4.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-columns-one-v3-3-1"; }
};
WppIconColumnsOne.style = wppIconCss;

exports.wpp_icon_columns_one = WppIconColumnsOne;
