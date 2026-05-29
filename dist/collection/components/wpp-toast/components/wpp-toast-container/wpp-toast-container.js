import { Host, h } from '@stencil/core';
import { uuidv4 } from '../../../../utils/utils';
import { ANIMATION_DURATION, DEFAULT_STAGGER_INTERVAL } from '../../const';
import { Z_INDEX } from '../../../../common/consts';
/**
 * @part item - toast item
 */
export class WppToastContainer {
  constructor() {
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
  static get is() { return "wpp-toast-container"; }
  static get registryIs() { return "wpp-toast-container-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-toast-container.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-toast-container.css"]
    };
  }
  static get properties() {
    return {
      "maxToastsToDisplay": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the maximum number of toasts to display at once."
        },
        "attribute": "max-toasts-to-display",
        "reflect": false,
        "defaultValue": "4"
      },
      "zIndex": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the z-index of the WppToastContainer."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.TOAST"
      },
      "staggerInterval": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Minimum delay (ms) between two successive toasts becoming visible.\nWhen toasts are added in rapid succession (or promoted from the queue back-to-back),\nthis prevents them from entering and exiting in batched \"waves\" \u2014 instead each toast\nappears on its own timeline, creating a continuous, smooth flow.\nSet to 0 to disable staggering (toasts appear immediately as slots open up)."
        },
        "attribute": "stagger-interval",
        "reflect": false,
        "defaultValue": "DEFAULT_STAGGER_INTERVAL"
      }
    };
  }
  static get states() {
    return {
      "toasts": {}
    };
  }
  static get methods() {
    return {
      "addToast": {
        "complexType": {
          "signature": "(data: ToastState) => Promise<string>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "ToastState": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-toast/components/wpp-toast-container/types.ts::ToastState"
            }
          },
          "return": "Promise<string>"
        },
        "docs": {
          "text": "Method for adding toasts to `toast-container`.",
          "tags": []
        }
      },
      "hideToast": {
        "complexType": {
          "signature": "(id: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "ShadowRoot": {
              "location": "global",
              "id": "global::ShadowRoot"
            },
            "HTMLWppToastElement": {
              "location": "global",
              "id": "global::HTMLWppToastElement"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method for hiding toasts from `toast-container`.",
          "tags": []
        }
      },
      "updateToast": {
        "complexType": {
          "signature": "(id: string, updatedData: Partial<Omit<ToastState, 'duration'>>) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "Omit": {
              "location": "global",
              "id": "global::Omit"
            },
            "ToastState": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-toast/components/wpp-toast-container/types.ts::ToastState"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method for updating toast from `toast-container`.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
}
