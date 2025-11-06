'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconUpload = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-upload", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L13.5303 8.46967C13.8232 8.76256 13.8232 9.23744 13.5303 9.53033C13.2374 9.82322 12.7626 9.82322 12.4697 9.53033L10.75 7.81066L10.75 17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17L9.25 7.81066L7.53033 9.53033C7.23744 9.82322 6.76256 9.82322 6.46967 9.53033C6.17678 9.23744 6.17678 8.76256 6.46967 8.46967L9.46967 5.46967Z", fill: "currentColor" }), index.h("path", { d: "M3.5 3.75C3.08579 3.75 2.75 3.41421 2.75 3C2.75 2.58579 3.08579 2.25 3.5 2.25L16.5 2.25C16.9142 2.25 17.25 2.58578 17.25 3C17.25 3.41421 16.9142 3.75 16.5 3.75L3.5 3.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-upload-v2-22-0"; }
};
WppIconUpload.style = wppIconCss;

exports.wpp_icon_upload = WppIconUpload;
