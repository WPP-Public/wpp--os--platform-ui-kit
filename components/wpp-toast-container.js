import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { u as uuidv4 } from './utils.js';
import { D as DEFAULT_STAGGER_INTERVAL, A as ANIMATION_DURATION, d as defineCustomElement$3 } from './wpp-toast2.js';
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
    this.toastsQueue = [];
    this.lastDisplayedAt = 0;
    this.hideTimers = new Map();
    this.handleToastComplete = (e) => {
      this.removeToastById(e.detail.currentIndex);
    };
    this.canDisplayNow = () => {
      // Honor FIFO: if anything is already queued, the new toast must wait its turn
      // even if a slot is open and the stagger window has elapsed. Otherwise late
      // arrivals could jump in front of toasts that have been waiting.
      if (this.toastsQueue.length > 0)
        return false;
      if (this.toasts.length >= this.maxToastsToDisplay)
        return false;
      if (this.staggerInterval <= 0)
        return true;
      return Date.now() - this.lastDisplayedAt >= this.staggerInterval;
    };
    this.displayToast = (toast) => {
      this.toasts = [...this.toasts, toast];
      this.lastDisplayedAt = Date.now();
    };
    this.scheduleNextPromotion = () => {
      if (this.displayTimer)
        return;
      if (this.toastsQueue.length === 0)
        return;
      if (this.toasts.length >= this.maxToastsToDisplay)
        return;
      const elapsed = Date.now() - this.lastDisplayedAt;
      const delay = Math.max(0, this.staggerInterval - elapsed);
      this.displayTimer = setTimeout(() => {
        this.displayTimer = undefined;
        if (!this.isHostConnected())
          return;
        this.promoteFromQueue();
      }, delay);
      WppToastContainer.unrefTimer(this.displayTimer);
    };
    this.promoteFromQueue = () => {
      if (this.toastsQueue.length === 0)
        return;
      if (this.toasts.length >= this.maxToastsToDisplay)
        return;
      const [next, ...rest] = this.toastsQueue;
      this.toastsQueue = rest;
      this.displayToast(next);
      // Chain the next promotion if more queue items exist and slots are still available
      if (this.toastsQueue.length > 0 && this.toasts.length < this.maxToastsToDisplay) {
        this.scheduleNextPromotion();
      }
    };
    this.removeToastById = (id) => {
      const existsInToasts = this.toasts.some(toast => toast.id === id);
      if (!existsInToasts) {
        const queueIndex = this.toastsQueue.findIndex(toast => toast.id === id);
        if (queueIndex !== -1) {
          this.toastsQueue = this.toastsQueue.filter(toast => toast.id !== id);
        }
        return;
      }
      const hideTimer = this.hideTimers.get(id);
      if (hideTimer) {
        clearTimeout(hideTimer);
        this.hideTimers.delete(id);
      }
      this.toasts = this.toasts.filter(toast => toast.id !== id);
      if (this.toastsQueue.length === 0)
        return;
      // Promote next from queue — synchronously when staggering is disabled,
      // otherwise schedule respecting the stagger interval
      if (this.staggerInterval <= 0) {
        this.promoteFromQueue();
      }
      else {
        this.scheduleNextPromotion();
      }
    };
    this.hostCssClasses = () => ({
      'wpp-toast-container': true,
    });
    this.toasts = [];
    this.maxToastsToDisplay = 4;
    this.zIndex = Z_INDEX.TOAST;
    this.staggerInterval = DEFAULT_STAGGER_INTERVAL;
  }
  componentWillLoad() {
    this.hostElement = this.host;
  }
  connectedCallback() {
    this.hostElement = this.host;
  }
  disconnectedCallback() {
    if (this.displayTimer) {
      clearTimeout(this.displayTimer);
      this.displayTimer = undefined;
    }
    this.hideTimers.forEach(timer => clearTimeout(timer));
    this.hideTimers.clear();
  }
  isHostConnected() {
    return this.hostElement?.isConnected ?? false;
  }
  static unrefTimer(timer) {
    if (typeof timer === 'object' && timer !== null && 'unref' in timer) {
      const unref = timer.unref;
      if (typeof unref === 'function') {
        unref.call(timer);
      }
    }
  }
  /**
   * Method for adding toasts to `toast-container`.
   */
  async addToast(data) {
    const newToast = { ...data, id: uuidv4() };
    if (this.canDisplayNow()) {
      this.displayToast(newToast);
    }
    else {
      this.toastsQueue = [...this.toastsQueue, newToast];
      this.scheduleNextPromotion();
    }
    return newToast.id;
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
    const existingTimer = this.hideTimers.get(id);
    if (existingTimer)
      clearTimeout(existingTimer);
    const timer = setTimeout(() => {
      this.hideTimers.delete(id);
      if (!this.isHostConnected())
        return;
      this.removeToastById(id);
    }, ANIMATION_DURATION);
    this.hideTimers.set(id, timer);
    WppToastContainer.unrefTimer(timer);
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
    return (h(Host, { class: this.hostCssClasses(), style: { zIndex: this.zIndex.toString() }, exportparts: "item" }, toasts.map(toast => (h("wpp-toast-v4-1-0", { key: toast.id, index: toast.id, message: toast.message, type: toast.type, header: toast.header, duration: toast.duration, primaryBtn: toast.primaryBtn, maxMessageLines: toast.maxMessageLines, icon: toast.icon, part: "item", onWppToastComplete: this.handleToastComplete })))));
  }
  static get registryIs() { return "wpp-toast-container-v4-1-0"; }
  get host() { return this; }
  static get style() { return wppToastContainerCss; }
}, [1, "wpp-toast-container", "wpp-toast-container-v4-1-0", {
    "maxToastsToDisplay": [2, "max-toasts-to-display"],
    "zIndex": [2, "z-index"],
    "staggerInterval": [2, "stagger-interval"],
    "toasts": [32],
    "addToast": [64],
    "hideToast": [64],
    "updateToast": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-toast-container-v4-1-0", "wpp-action-button-v4-1-0", "wpp-icon-cross-v4-1-0", "wpp-icon-error-v4-1-0", "wpp-icon-info-message-v4-1-0", "wpp-icon-success-v4-1-0", "wpp-icon-warning-v4-1-0", "wpp-spinner-v4-1-0", "wpp-toast-v4-1-0", "wpp-typography-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-toast-container-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppToastContainer$1);
      }
      break;
    case "wpp-action-button-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-cross-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-error-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-info-message-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-success-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-warning-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-toast-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppToastContainer = WppToastContainer$1;
const defineCustomElement = defineCustomElement$1;

export { WppToastContainer, defineCustomElement };
