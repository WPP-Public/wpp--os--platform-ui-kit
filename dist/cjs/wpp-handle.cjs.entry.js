'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const wppHandleCss = ":host{display:inline-block;width:12px;height:12px;border-radius:50%;-webkit-transform:translate(-25%, -54%);transform:translate(-25%, -54%)}:host(.wpp-selected-handle.wpp-handle-source){-webkit-transform:translate(-29%, -54%);transform:translate(-29%, -54%)}:host(.wpp-selected-handle.wpp-handle-target){-webkit-transform:translate(-21%, -54%);transform:translate(-21%, -54%)}:host(.wpp-loading-handle.wpp-handle-source){-webkit-transform:translate(-34%, -54%);transform:translate(-34%, -54%)}:host(.wpp-loading-handle.wpp-handle-target){-webkit-transform:translate(-17%, -54%);transform:translate(-17%, -54%)}";

const WppHandle = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.getHostClasses = () => ({
      'wpp-handle': true,
      'wpp-selected-handle': this.isSelected,
      [`wpp-handle-${this.type}`]: true,
      'wpp-loading-handle': this.isLoading,
    });
    this.type = undefined;
    this.isSelected = undefined;
    this.isLoading = false;
    this.color = 'var(--wpp-grey-color-600)';
  }
  render() {
    return index.h(index.Host, { class: this.getHostClasses(), style: { backgroundColor: this.color } });
  }
  static get registryIs() { return "wpp-handle-v4-1-0"; }
};
WppHandle.style = wppHandleCss;

exports.wpp_handle = WppHandle;
