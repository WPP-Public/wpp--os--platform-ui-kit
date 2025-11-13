'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEnlarge = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-enlarge", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16.457 2.79297H10.625C10.2108 2.79297 9.875 3.12876 9.875 3.54297C9.875 3.95718 10.2108 4.29297 10.625 4.29297H14.6464L4.29297 14.6464V10.625C4.29297 10.2108 3.95718 9.875 3.54297 9.875C3.12876 9.875 2.79297 10.2108 2.79297 10.625V16.457C2.79297 16.5579 2.81289 16.6542 2.84901 16.742C2.88561 16.8313 2.94016 16.9149 3.01264 16.9874C3.08626 17.061 3.17139 17.1161 3.26223 17.1527C3.34079 17.1844 3.42362 17.2022 3.50699 17.2062C3.51898 17.2068 3.53097 17.207 3.54297 17.207H3.54585H9.375C9.78922 17.207 10.125 16.8713 10.125 16.457C10.125 16.0428 9.78922 15.707 9.375 15.707H5.35363L15.707 5.35363V9.375C15.707 9.78922 16.0428 10.125 16.457 10.125C16.8713 10.125 17.207 9.78922 17.207 9.375V3.54585M17.207 3.54297C17.207 3.52935 17.2067 3.51583 17.206 3.50239C17.1964 3.32419 17.1235 3.14876 16.9874 3.01264C16.9149 2.94016 16.8313 2.88561 16.742 2.84901C16.6542 2.81289 16.5579 2.79297 16.457 2.79297", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-enlarge-v3-3-1"; }
};
WppIconEnlarge.style = wppIconCss;

exports.wpp_icon_enlarge = WppIconEnlarge;
