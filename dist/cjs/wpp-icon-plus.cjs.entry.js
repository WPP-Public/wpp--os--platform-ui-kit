'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPlus = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-plus", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11 4C11 3.44772 10.5523 3 10 3C9.44772 3 9 3.44772 9 4V9H4C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H9V16C9 16.5523 9.44772 17 10 17C10.5523 17 11 16.5523 11 16V11H16C16.5523 11 17 10.5523 17 10C17 9.44772 16.5523 9 16 9H11V4Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-plus-v3-6-0"; }
};
WppIconPlus.style = wppIconCss;

exports.wpp_icon_plus = WppIconPlus;
