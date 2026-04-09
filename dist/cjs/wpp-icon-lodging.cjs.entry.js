'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLodging = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-lodging", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.5 3C4.25736 3 3.25 4.00736 3.25 5.25V7.93747C2.22566 8.3375 1.5 9.33401 1.5 10.5V16.5C1.5 16.9142 1.83579 17.25 2.25 17.25C2.66421 17.25 3 16.9142 3 16.5V14.75H17V16.5C17 16.9142 17.3358 17.25 17.75 17.25C18.1642 17.25 18.5 16.9142 18.5 16.5V10.5C18.5 9.33401 17.7743 8.3375 16.75 7.93747V5.25C16.75 4.00736 15.7426 3 14.5 3H5.5ZM15.75 9.25H4.25C3.55964 9.25 3 9.80964 3 10.5V13.25H17V10.5C17 9.80964 16.4404 9.25 15.75 9.25ZM15.25 7.75V5.25C15.25 4.83579 14.9142 4.5 14.5 4.5H5.5C5.08579 4.5 4.75 4.83579 4.75 5.25V7.75H6V7.5C6 7.08579 6.33579 6.75 6.75 6.75H8.5C8.91421 6.75 9.25 7.08579 9.25 7.5V7.75H10.75V7.5C10.75 7.08579 11.0858 6.75 11.5 6.75H13.25C13.6642 6.75 14 7.08579 14 7.5V7.75H15.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-lodging-v3-6-0"; }
};
WppIconLodging.style = wppIconCss;

exports.wpp_icon_lodging = WppIconLodging;
