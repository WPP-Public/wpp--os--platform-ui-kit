'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEditText = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-edit-text", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M16.4492 7.1559C17.4542 8.16155 17.4537 9.79152 16.4481 10.7965L10.7499 16.4851C10.5395 16.6951 10.2804 16.8497 9.99573 16.9352L6.56156 17.966C6.13841 18.093 5.69242 17.853 5.56541 17.4298C5.51882 17.2746 5.52047 17.1089 5.57013 16.9547L6.65918 13.5724C6.74689 13.3001 6.89827 13.0525 7.10077 12.8503L12.8067 7.15382C13.8132 6.14888 15.4438 6.14981 16.4492 7.1559ZM13.6544 8.00299L7.94855 13.6995C7.88105 13.7669 7.83059 13.8494 7.80135 13.9402L6.94558 16.5979L9.65076 15.7859C9.74566 15.7574 9.83203 15.7059 9.90216 15.6359L15.5994 9.94829C16.1368 9.41122 16.137 8.541 15.6005 8.0041C15.0633 7.46659 14.1922 7.46609 13.6544 8.00299ZM6.9206 2.29578L6.96098 2.37987L9.56278 8.97872L8.63725 9.90266L8.04449 8.39956H4.75431L3.95811 10.4161C3.84645 10.6986 3.54426 10.8491 3.25733 10.7783L3.1796 10.7535C2.89714 10.6418 2.74667 10.3397 2.81739 10.0527L2.84222 9.975L5.84491 2.37939C6.0332 1.90307 6.67885 1.87533 6.9206 2.29578ZM6.40216 4.23366L5.22868 7.19964H7.57092L6.40216 4.23366Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-edit-text-v3-5-0"; }
};
WppIconEditText.style = wppIconCss;

exports.wpp_icon_edit_text = WppIconEditText;
