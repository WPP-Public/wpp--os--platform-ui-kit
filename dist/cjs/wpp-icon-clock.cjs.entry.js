'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconClock = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-clock", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.04163 9.99996C3.04163 6.15698 6.15698 3.04163 9.99996 3.04163C13.8429 3.04163 16.9583 6.15698 16.9583 9.99996C16.9583 13.8429 13.8429 16.9583 9.99996 16.9583C6.15698 16.9583 3.04163 13.8429 3.04163 9.99996ZM9.99996 1.54163C5.32855 1.54163 1.54163 5.32855 1.54163 9.99996C1.54163 14.6714 5.32855 18.4583 9.99996 18.4583C14.6714 18.4583 18.4583 14.6714 18.4583 9.99996C18.4583 5.32855 14.6714 1.54163 9.99996 1.54163ZM10.5416 5.625C10.5416 5.21079 10.2058 4.875 9.79163 4.875C9.37741 4.875 9.04163 5.21079 9.04163 5.625V10.625C9.04163 11.0392 9.37741 11.375 9.79163 11.375H13.125C13.5392 11.375 13.875 11.0392 13.875 10.625C13.875 10.2108 13.5392 9.875 13.125 9.875H10.5416V5.625Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-clock-v3-3-1"; }
};
WppIconClock.style = wppIconCss;

exports.wpp_icon_clock = WppIconClock;
