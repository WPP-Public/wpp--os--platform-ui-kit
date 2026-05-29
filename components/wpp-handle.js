import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const wppHandleCss = ":host{display:inline-block;width:12px;height:12px;border-radius:50%;-webkit-transform:translate(-25%, -54%);transform:translate(-25%, -54%)}:host(.wpp-selected-handle.wpp-handle-source){-webkit-transform:translate(-29%, -54%);transform:translate(-29%, -54%)}:host(.wpp-selected-handle.wpp-handle-target){-webkit-transform:translate(-21%, -54%);transform:translate(-21%, -54%)}:host(.wpp-loading-handle.wpp-handle-source){-webkit-transform:translate(-34%, -54%);transform:translate(-34%, -54%)}:host(.wpp-loading-handle.wpp-handle-target){-webkit-transform:translate(-17%, -54%);transform:translate(-17%, -54%)}";

const WppHandle$1 = /*@__PURE__*/ proxyCustomElement(class WppHandle extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  static get style() { return wppHandleCss; }
}, [1, "wpp-handle", "wpp-handle-v4-1-0", {
    "type": [1],
    "isSelected": [4, "is-selected"],
    "isLoading": [4, "is-loading"],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-handle-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-handle-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppHandle$1);
      }
      break;
  } });
}

const WppHandle = WppHandle$1;
const defineCustomElement = defineCustomElement$1;

export { WppHandle, defineCustomElement };
