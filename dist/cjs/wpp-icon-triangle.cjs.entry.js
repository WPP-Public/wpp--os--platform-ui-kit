'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTriangle = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-triangle", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M8.21689 3.03447C8.97743 1.65495 10.9602 1.65524 11.7203 3.03497L18.3313 15.0347C19.0657 16.3678 18.1014 18 16.5795 18H3.35295C1.83077 18 0.866478 16.3673 1.60138 15.0342L8.21689 3.03447ZM10.6422 3.62891C10.3499 3.09824 9.5873 3.09813 9.29478 3.62871L2.67927 15.6285C2.39661 16.1412 2.7675 16.7692 3.35295 16.7692H16.5795C17.1649 16.7692 17.5357 16.1414 17.2533 15.6287L10.6422 3.62891Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-triangle-v3-3-1"; }
};
WppIconTriangle.style = wppIconCss;

exports.wpp_icon_triangle = WppIconTriangle;
