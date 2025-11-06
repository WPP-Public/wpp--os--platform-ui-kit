'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableSortAscHover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-table-sort-asc-hover", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M10 4L13.4641 8.5H6.5359L10 4Z", fill: "#343A3F" }), index.h("path", { d: "M10 16L13.4641 11.5H6.5359L10 16Z", fill: "#A2A9B0" })));
  }
  static get registryIs() { return "wpp-icon-table-sort-asc-hover-v2-22-0"; }
};
WppIconTableSortAscHover.style = wppIconCss;

exports.wpp_icon_table_sort_asc_hover = WppIconTableSortAscHover;
