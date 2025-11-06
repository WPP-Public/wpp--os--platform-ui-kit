'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSmartwatch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-smartwatch", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M6.75 3V4.26121C5.34838 4.38752 4.25 5.56549 4.25 7V13C4.25 14.4345 5.34837 15.6125 6.75 15.7388V17C6.75 17.9665 7.5335 18.75 8.5 18.75H11.5C12.4665 18.75 13.25 17.9665 13.25 17V15.7388C14.6516 15.6125 15.75 14.4345 15.75 13V10C16.1642 10 16.5 9.66421 16.5 9.25V7.75C16.5 7.33579 16.1642 7 15.75 7C15.75 5.56549 14.6516 4.38752 13.25 4.26121V3C13.25 2.0335 12.4665 1.25 11.5 1.25H8.5C7.5335 1.25 6.75 2.0335 6.75 3ZM8.5 2.75C8.36193 2.75 8.25 2.86193 8.25 3V4.25H11.75V3C11.75 2.86193 11.6381 2.75 11.5 2.75H8.5ZM13 5.75C13.6904 5.75 14.25 6.30964 14.25 7V13C14.25 13.6904 13.6904 14.25 13 14.25H7C6.30964 14.25 5.75 13.6904 5.75 13V7C5.75 6.30964 6.30964 5.75 7 5.75H13ZM11.75 15.75V17C11.75 17.1381 11.6381 17.25 11.5 17.25H8.5C8.36193 17.25 8.25 17.1381 8.25 17V15.75H11.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-smartwatch-v2-22-0"; }
};
WppIconSmartwatch.style = wppIconCss;

exports.wpp_icon_smartwatch = WppIconSmartwatch;
