'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSortDecrease = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-sort-decrease", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.125 2.7915C2.71079 2.7915 2.375 3.12729 2.375 3.5415C2.375 3.95572 2.71079 4.2915 3.125 4.2915H11.0417C11.4559 4.2915 11.7917 3.95572 11.7917 3.5415C11.7917 3.12729 11.4559 2.7915 11.0417 2.7915H3.125ZM13.9584 5.9165C14.3726 5.9165 14.7084 6.25229 14.7084 6.6665V15.4809L16.3446 13.8447C16.6375 13.5518 17.1124 13.5518 17.4053 13.8447C17.6982 14.1376 17.6982 14.6124 17.4053 14.9053L14.4886 17.822C14.1957 18.1149 13.7209 18.1149 13.428 17.822L10.5113 14.9053C10.2184 14.6124 10.2184 14.1376 10.5113 13.8447C10.8042 13.5518 11.2791 13.5518 11.572 13.8447L13.2084 15.4811V6.6665C13.2084 6.25229 13.5442 5.9165 13.9584 5.9165ZM2.375 6.875C2.375 6.46079 2.71079 6.125 3.125 6.125H9.375C9.78921 6.125 10.125 6.46079 10.125 6.875C10.125 7.28921 9.78921 7.625 9.375 7.625H3.125C2.71079 7.625 2.375 7.28921 2.375 6.875ZM3.125 9.4585C2.71079 9.4585 2.375 9.79428 2.375 10.2085C2.375 10.6227 2.71079 10.9585 3.125 10.9585H7.70833C8.12255 10.9585 8.45833 10.6227 8.45833 10.2085C8.45833 9.79428 8.12255 9.4585 7.70833 9.4585H3.125ZM2.375 13.5415C2.375 13.1273 2.71079 12.7915 3.125 12.7915H6.04167C6.45588 12.7915 6.79167 13.1273 6.79167 13.5415C6.79167 13.9557 6.45588 14.2915 6.04167 14.2915H3.125C2.71079 14.2915 2.375 13.9557 2.375 13.5415ZM3.125 16.125C2.71079 16.125 2.375 16.4608 2.375 16.875C2.375 17.2892 2.71079 17.625 3.125 17.625H4.375C4.78921 17.625 5.125 17.2892 5.125 16.875C5.125 16.4608 4.78921 16.125 4.375 16.125H3.125Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-sort-decrease-v4-0-0"; }
};
WppIconSortDecrease.style = wppIconCss;

exports.wpp_icon_sort_decrease = WppIconSortDecrease;
