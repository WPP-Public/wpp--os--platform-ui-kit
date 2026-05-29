'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');
const wppInput = require('./wpp-input-533c8118.js');
require('./common-ee802540.js');
require('./utils-2231f97a.js');
require('./consts-d8f5ef98.js');
require('./WrappedSlot-4a4ef805.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSearch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-search", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.875 8.54167C3.875 5.96434 5.96434 3.875 8.54167 3.875C11.119 3.875 13.2083 5.96434 13.2083 8.54167C13.2083 9.82314 12.6918 10.984 11.8556 11.8273C11.8508 11.8319 11.846 11.8366 11.8413 11.8413C11.8365 11.846 11.8319 11.8508 11.8273 11.8556C10.9839 12.6918 9.82312 13.2083 8.54167 13.2083C5.96434 13.2083 3.875 11.119 3.875 8.54167ZM12.3396 13.4003C11.2927 14.2198 9.97424 14.7083 8.54167 14.7083C5.13591 14.7083 2.375 11.9474 2.375 8.54167C2.375 5.13591 5.13591 2.375 8.54167 2.375C11.9474 2.375 14.7083 5.13591 14.7083 8.54167C14.7083 9.97427 14.2198 11.2928 13.4003 12.3397L17.4052 16.3446C17.6981 16.6375 17.6981 17.1124 17.4052 17.4053C17.1124 17.6982 16.6375 17.6982 16.3446 17.4053L12.3396 13.4003Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-search-v4-1-0"; }
};
WppIconSearch.style = wppIconCss;

exports.wpp_input = wppInput.WppInput;
exports.wpp_icon_search = WppIconSearch;
