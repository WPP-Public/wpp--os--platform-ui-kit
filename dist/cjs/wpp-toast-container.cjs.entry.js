'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-ce5c8ac5.js');
const _const = require('./const-cfc205bf.js');
const consts = require('./consts-dba6e6dd.js');

const wppToastContainerCss = ":host(.wpp-toast-container){--toast-margin-bottom:var(--wpp-toast-margin-bottom, 8px);display:-ms-inline-flexbox;display:inline-flex;position:fixed;top:16px;right:16px;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start}:host(.wpp-toast-container) .wpp-toast:not(:last-child){margin-bottom:var(--toast-margin-bottom)}";

const WppToastContainer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    this.zIndex = consts.Z_INDEX.TOAST;
  }
  /**
   * Method for adding toasts to `toast-container`.
   */
  async addToast(data) {
    const toastsList = [...this.toasts, ...this.toastsQueue, { ...data, id: utils.uuidv4() }];
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
    setTimeout(() => this.removeToastById(id), _const.ANIMATION_DURATION);
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
    return (index.h(index.Host, { class: this.hostCssClasses(), style: { zIndex: this.zIndex.toString() }, exportparts: "item" }, toasts.map(toast => (index.h("wpp-toast-v4-0-0", { key: toast.id, index: toast.id, message: toast.message, type: toast.type, header: toast.header, duration: toast.duration, primaryBtn: toast.primaryBtn, maxMessageLines: toast.maxMessageLines, icon: toast.icon, part: "item", onWppToastComplete: this.handleToastComplete })))));
  }
  static get registryIs() { return "wpp-toast-container-v4-0-0"; }
  get host() { return index.getElement(this); }
};
WppToastContainer.style = wppToastContainerCss;

exports.wpp_toast_container = WppToastContainer;
