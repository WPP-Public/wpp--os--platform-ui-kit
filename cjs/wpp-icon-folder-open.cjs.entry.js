'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFolderOpen = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-folder-open", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M17.3233 7.88262V7.24251C17.3233 6.18491 16.4659 5.32756 15.4083 5.32756H10.5356L8.50917 3.6425C8.16526 3.35652 7.73209 3.19995 7.28481 3.19995H3.91832C2.86098 3.19995 2.00374 4.0569 2.00338 5.11424L2 14.9017C1.99964 15.9596 2.85709 16.8173 3.91495 16.8173H3.93738C3.94088 16.8174 3.94438 16.8174 3.94788 16.8174H16.0206C16.704 16.8174 17.2997 16.3523 17.4655 15.6893L18.9548 9.73332C19.1898 8.79327 18.4789 7.88262 17.5099 7.88262H17.3233ZM3.91832 4.47658H7.28481C7.4339 4.47658 7.57829 4.52877 7.69293 4.6241L9.89677 6.45668C10.0114 6.552 10.1558 6.60419 10.3049 6.60419H15.4083C15.7609 6.60419 16.0466 6.88997 16.0466 7.24251V7.88262H5.76882C4.89008 7.88262 4.12411 8.4807 3.91103 9.33321L3.27768 11.8672L3.28 5.11468C3.28013 4.76223 3.56587 4.47658 3.91832 4.47658ZM5.14956 9.64278C5.22058 9.3586 5.47591 9.15925 5.76882 9.15925H17.5099C17.6483 9.15925 17.7499 9.28934 17.7163 9.42363L16.227 15.3796C16.2033 15.4743 16.1182 15.5407 16.0206 15.5407H3.94788C3.80947 15.5407 3.7079 15.4107 3.74146 15.2764L5.14956 9.64278Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-folder-open-v3-3-0"; }
};
WppIconFolderOpen.style = wppIconCss;

exports.wpp_icon_folder_open = WppIconFolderOpen;
