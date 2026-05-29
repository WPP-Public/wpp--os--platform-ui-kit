import { r as registerInstance, h, H as Host } from './index-9177bb6d.js';

const wppHandleCss = ":host{display:inline-block;width:12px;height:12px;border-radius:50%;-webkit-transform:translate(-25%, -54%);transform:translate(-25%, -54%)}:host(.wpp-selected-handle.wpp-handle-source){-webkit-transform:translate(-29%, -54%);transform:translate(-29%, -54%)}:host(.wpp-selected-handle.wpp-handle-target){-webkit-transform:translate(-21%, -54%);transform:translate(-21%, -54%)}:host(.wpp-loading-handle.wpp-handle-source){-webkit-transform:translate(-34%, -54%);transform:translate(-34%, -54%)}:host(.wpp-loading-handle.wpp-handle-target){-webkit-transform:translate(-17%, -54%);transform:translate(-17%, -54%)}";

const WppHandle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return h(Host, { class: this.getHostClasses(), style: { backgroundColor: this.color } });
  }
  static get registryIs() { return "wpp-handle-v4-1-0"; }
};
WppHandle.style = wppHandleCss;

export { WppHandle as wpp_handle };
