'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableSortHover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-grey-color-800)';
    this.upArrowColor = 'var(--wpp-grey-color-800)';
    this.downArrowColor = 'var(--wpp-grey-color-800)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-table-sort-hover", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M10 4L13.4641 8.5H6.5359L10 4Z", fill: this.upArrowColor }), index.h("path", { d: "M10 16L13.4641 11.5H6.5359L10 16Z", fill: this.downArrowColor })));
  }
  static get registryIs() { return "wpp-icon-table-sort-hover-v3-6-0"; }
};
WppIconTableSortHover.style = wppIconCss;

exports.wpp_icon_table_sort_hover = WppIconTableSortHover;
