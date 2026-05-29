'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconJoin = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-join", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M3 5.75C3 5.33579 3.33579 5 3.75 5H5.50736C6.50192 5 7.45575 5.39509 8.15901 6.09835L10.6516 8.59099C11.0736 9.01295 11.6459 9.25 12.2426 9.25H15.4393L12.4697 6.28033C12.1768 5.98744 12.1768 5.51256 12.4697 5.21967C12.7626 4.92678 13.2374 4.92678 13.5303 5.21967L17.7803 9.46967C18.0732 9.76256 18.0732 10.2374 17.7803 10.5303L13.5303 14.7803C13.2374 15.0732 12.7626 15.0732 12.4697 14.7803C12.1768 14.4874 12.1768 14.0126 12.4697 13.7197L15.4393 10.75H12.2426C11.6459 10.75 11.0736 10.9871 10.6516 11.409L8.15901 13.9017C7.45575 14.6049 6.50192 15 5.50736 15H3.75C3.33579 15 3 14.6642 3 14.25C3 13.8358 3.33579 13.5 3.75 13.5H5.50736C6.1041 13.5 6.67639 13.2629 7.09835 12.841L9.59099 10.3484C9.7172 10.2221 9.85148 10.1059 9.99262 10C9.85148 9.89414 9.7172 9.77786 9.59099 9.65165L7.09835 7.15901C6.67639 6.73705 6.1041 6.5 5.50736 6.5H3.75C3.33579 6.5 3 6.16421 3 5.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-join-v4-1-0"; }
};
WppIconJoin.style = wppIconCss;

exports.wpp_icon_join = WppIconJoin;
