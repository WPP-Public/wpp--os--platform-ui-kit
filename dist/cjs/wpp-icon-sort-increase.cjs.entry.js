'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSortIncrease = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-sort-increase", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M13.428 2.59467C13.7209 2.30178 14.1957 2.30178 14.4886 2.59467L17.4053 5.51134C17.6982 5.80423 17.6982 6.2791 17.4053 6.572C17.1124 6.86489 16.6375 6.86489 16.3446 6.572L14.7084 4.93574V13.7498C14.7084 14.1641 14.3726 14.4998 13.9584 14.4998C13.5442 14.4998 13.2084 14.1641 13.2084 13.7498V4.93558L11.572 6.572C11.2791 6.86489 10.8042 6.86489 10.5113 6.572C10.2184 6.2791 10.2184 5.80423 10.5113 5.51134L13.428 2.59467ZM3.125 16.125C2.71079 16.125 2.375 16.4608 2.375 16.875C2.375 17.2892 2.71079 17.625 3.125 17.625H11.0417C11.4559 17.625 11.7917 17.2892 11.7917 16.875C11.7917 16.4608 11.4559 16.125 11.0417 16.125H3.125ZM2.375 13.5415C2.375 13.1273 2.71079 12.7915 3.125 12.7915H9.375C9.78921 12.7915 10.125 13.1273 10.125 13.5415C10.125 13.9557 9.78921 14.2915 9.375 14.2915H3.125C2.71079 14.2915 2.375 13.9557 2.375 13.5415ZM3.125 9.4585C2.71079 9.4585 2.375 9.79428 2.375 10.2085C2.375 10.6227 2.71079 10.9585 3.125 10.9585H7.70833C8.12255 10.9585 8.45833 10.6227 8.45833 10.2085C8.45833 9.79428 8.12255 9.4585 7.70833 9.4585H3.125ZM2.375 6.875C2.375 6.46079 2.71079 6.125 3.125 6.125H6.04167C6.45588 6.125 6.79167 6.46079 6.79167 6.875C6.79167 7.28921 6.45588 7.625 6.04167 7.625H3.125C2.71079 7.625 2.375 7.28921 2.375 6.875ZM3.125 2.7915C2.71079 2.7915 2.375 3.12729 2.375 3.5415C2.375 3.95572 2.71079 4.2915 3.125 4.2915H4.375C4.78921 4.2915 5.125 3.95572 5.125 3.5415C5.125 3.12729 4.78921 2.7915 4.375 2.7915H3.125Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-sort-increase-v3-6-0"; }
};
WppIconSortIncrease.style = wppIconCss;

exports.wpp_icon_sort_increase = WppIconSortIncrease;
