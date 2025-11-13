import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { u as uuidv4 } from './utils.js';
import { A as ANIMATION_DURATION, d as defineCustomElement$3 } from './wpp-toast2.js';
import { Z as Z_INDEX } from './consts.js';
import { d as defineCustomElement$a } from './wpp-action-button2.js';
import { d as defineCustomElement$9 } from './wpp-icon-cross2.js';
import { d as defineCustomElement$8 } from './wpp-icon-error2.js';
import { d as defineCustomElement$7 } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$6 } from './wpp-icon-success2.js';
import { d as defineCustomElement$5 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppToastContainerCss = ":host(.wpp-toast-container){--toast-margin-bottom:var(--wpp-toast-margin-bottom, 8px);display:-ms-inline-flexbox;display:inline-flex;position:fixed;top:16px;right:16px;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start}:host(.wpp-toast-container) .wpp-toast:not(:last-child){margin-bottom:var(--toast-margin-bottom)}";

const WppToastContainer$1 = /*@__PURE__*/ proxyCustomElement(class WppToastContainer extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.handleToastComplete = (e) => {
      this.removeToastById(e.detail.currentIndex);
    };
    this.removeToastById = (id) => {
      const toastListWithoutRemovedToast = [...this.toasts].filter(toast => toast.id !== id);
      const toastsList = [...toastListWithoutRemovedToast, ...this.toastsQueue];
      this.toasts = toastsList.slice(0, this.maxToastsToDisplay);
      this.toastsQueue = toastsList.slice(this.maxToastsToDisplay);
    };
    this.hostCssClasses = () => ({
      'wpp-toast-container': true,
    });
    this.toasts = [];
    this.toastsQueue = [];
    this.maxToastsToDisplay = 4;
    this.zIndex = Z_INDEX.TOAST;
  }
  /**
   * Method for adding toasts to `toast-container`.
   */
  async addToast(data) {
    const toastsList = [...this.toasts, ...this.toastsQueue, { ...data, id: uuidv4() }];
    this.toasts = toastsList.slice(0, this.maxToastsToDisplay);
    this.toastsQueue = toastsList.slice(this.maxToastsToDisplay);
    return toastsList[toastsList.length - 1].id;
  }
  /**
   * Method for hiding toasts from `toast-container`.
   */
  async hideToast(id) {
    const toastsInShadowDom = this.host.shadowRoot.querySelectorAll('.wpp-toast') || [];
    for (let i = 0; i < toastsInShadowDom.length; i++) {
      if (toastsInShadowDom[i].index === id) {
        toastsInShadowDom[i].classList.add('hide');
      }
    }
    setTimeout(() => this.removeToastById(id), ANIMATION_DURATION);
  }
  /**
   * Method for updating toast from `toast-container`.
   */
  async updateToast(id, updatedData) {
    const toastIndex = this.toasts.findIndex(toast => toast.id === id);
    const toastsCopy = [...this.toasts];
    toastsCopy[toastIndex] = {
      ...toastsCopy[toastIndex],
      ...updatedData,
    };
    this.toasts = toastsCopy;
  }
  render() {
    const { toasts } = this;
    return (h(Host, { class: this.hostCssClasses(), style: { zIndex: this.zIndex.toString() }, exportparts: "item" }, toasts.map(toast => (h("wpp-toast-v3-3-1", { key: toast.id, index: toast.id, message: toast.message, type: toast.type, header: toast.header, duration: toast.duration, primaryBtn: toast.primaryBtn, maxMessageLines: toast.maxMessageLines, icon: toast.icon, part: "item", onWppToastComplete: this.handleToastComplete })))));
  }
  static get registryIs() { return "wpp-toast-container-v3-3-1"; }
  get host() { return this; }
  static get style() { return wppToastContainerCss; }
}, [1, "wpp-toast-container", "wpp-toast-container-v3-3-1", {
    "maxToastsToDisplay": [2, "max-toasts-to-display"],
    "zIndex": [2, "z-index"],
    "toasts": [32],
    "toastsQueue": [32],
    "addToast": [64],
    "hideToast": [64],
    "updateToast": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-toast-container-v3-3-1", "wpp-action-button-v3-3-1", "wpp-icon-cross-v3-3-1", "wpp-icon-error-v3-3-1", "wpp-icon-info-message-v3-3-1", "wpp-icon-success-v3-3-1", "wpp-icon-warning-v3-3-1", "wpp-spinner-v3-3-1", "wpp-toast-v3-3-1", "wpp-typography-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-toast-container-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppToastContainer$1);
      }
      break;
    case "wpp-action-button-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-cross-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-error-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-info-message-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-success-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-warning-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-toast-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppToastContainer = WppToastContainer$1;
const defineCustomElement = defineCustomElement$1;

export { WppToastContainer, defineCustomElement };
