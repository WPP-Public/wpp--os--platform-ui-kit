'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLocation = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-location", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M5.042 4.042C7.76467 1.31933 12.179 1.31933 14.9017 4.042C17.6243 6.76467 17.6243 11.179 14.9017 13.9017L13.9513 14.8416C13.2508 15.5291 12.3419 16.413 11.2242 17.4936C10.5258 18.1689 9.41783 18.1688 8.71954 17.4934L5.92426 14.7744C5.57294 14.4294 5.27888 14.1385 5.042 13.9017C2.31933 11.179 2.31933 6.76467 5.042 4.042ZM14.0524 4.89126C11.7988 2.63762 8.1449 2.63762 5.89126 4.89126C3.63762 7.1449 3.63762 10.7988 5.89126 13.0524L7.08194 14.2274C7.73763 14.8691 8.56191 15.6701 9.55451 16.6301C9.78727 16.8552 10.1566 16.8553 10.3894 16.6302L13.1076 13.9867C13.4831 13.6182 13.7981 13.3067 14.0524 13.0524C16.306 10.7988 16.306 7.1449 14.0524 4.89126ZM9.97183 6.78889C11.2991 6.78889 12.3751 7.86489 12.3751 9.1922C12.3751 10.5195 11.2991 11.5955 9.97183 11.5955C8.64452 11.5955 7.56852 10.5195 7.56852 9.1922C7.56852 7.86489 8.64452 6.78889 9.97183 6.78889ZM9.97183 7.98992C9.30783 7.98992 8.76956 8.5282 8.76956 9.1922C8.76956 9.85619 9.30783 10.3945 9.97183 10.3945C10.6358 10.3945 11.1741 9.85619 11.1741 9.1922C11.1741 8.5282 10.6358 7.98992 9.97183 7.98992Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-location-v2-22-0"; }
};
WppIconLocation.style = wppIconCss;

exports.wpp_icon_location = WppIconLocation;
