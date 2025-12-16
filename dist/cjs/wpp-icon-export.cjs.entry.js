'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconExport = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-export", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.46967 2.46967C9.76256 2.17678 10.2374 2.17678 10.5303 2.46967L13.5303 5.46967C13.8232 5.76256 13.8232 6.23744 13.5303 6.53033C13.2374 6.82322 12.7626 6.82322 12.4697 6.53033L10.75 4.81066V14C10.75 14.4142 10.4142 14.75 10 14.75C9.58579 14.75 9.25 14.4142 9.25 14V4.81066L7.53033 6.53033C7.23744 6.82322 6.76256 6.82322 6.46967 6.53033C6.17678 6.23744 6.17678 5.76256 6.46967 5.46967L9.46967 2.46967Z", fill: "currentColor" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.5 13.75C3.91421 13.75 4.25 14.0858 4.25 14.5V15.5C4.25 15.9142 4.58579 16.25 5 16.25H15C15.4142 16.25 15.75 15.9142 15.75 15.5V14.5C15.75 14.0858 16.0858 13.75 16.5 13.75C16.9142 13.75 17.25 14.0858 17.25 14.5V15.5C17.25 16.7426 16.2426 17.75 15 17.75H5C3.75736 17.75 2.75 16.7426 2.75 15.5V14.5C2.75 14.0858 3.08579 13.75 3.5 13.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-export-v3-4-0"; }
};
WppIconExport.style = wppIconCss;

exports.wpp_icon_export = WppIconExport;
