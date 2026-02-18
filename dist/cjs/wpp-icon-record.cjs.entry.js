'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRecord = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-record", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M10 14.8C12.651 14.8 14.8 12.651 14.8 10C14.8 7.34903 12.651 5.2 10 5.2C7.34903 5.2 5.2 7.34903 5.2 10C5.2 12.651 7.34903 14.8 10 14.8ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3.2 10C3.2 6.24446 6.24446 3.2 10 3.2C13.7555 3.2 16.8 6.24446 16.8 10C16.8 13.7555 13.7555 16.8 10 16.8C6.24446 16.8 3.2 13.7555 3.2 10Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-record-v4-0-0"; }
};
WppIconRecord.style = wppIconCss;

exports.wpp_icon_record = WppIconRecord;
