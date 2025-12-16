'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconArrow = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-help", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M9.99999 17.7083C14.2572 17.7083 17.7083 14.2572 17.7083 9.99999C17.7083 5.74279 14.2572 2.29166 9.99999 2.29166C5.74279 2.29166 2.29166 5.74279 2.29166 9.99999C2.29166 14.2572 5.74279 17.7083 9.99999 17.7083Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" }), index.h("path", { d: "M9.99999 15C10.4602 15 10.8333 14.6269 10.8333 14.1667C10.8333 13.7064 10.4602 13.3333 9.99999 13.3333C9.53975 13.3333 9.16666 13.7064 9.16666 14.1667C9.16666 14.6269 9.53975 15 9.99999 15Z", fill: "currentColor" }), index.h("path", { d: "M10 11.4583C10 9.61291 11.875 10.2083 11.875 7.91666C11.875 6.88124 11.0354 6.04166 10 6.04166C8.96458 6.04166 8.125 6.88124 8.125 7.91666V8.12499", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" })));
  }
  static get registryIs() { return "wpp-icon-help-v3-4-0"; }
};
WppIconArrow.style = wppIconCss;

exports.wpp_icon_help = WppIconArrow;
