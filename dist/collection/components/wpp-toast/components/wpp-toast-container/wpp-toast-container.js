import { Host, h } from '@stencil/core';
import { uuidv4 } from '../../../../utils/utils';
import { ANIMATION_DURATION } from '../../const';
import { Z_INDEX } from '../../../../common/consts';
/**
 * @part item - toast item
 */
export class WppToastContainer {
  constructor() {
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
    return (h(Host, { class: this.hostCssClasses(), style: { zIndex: this.zIndex.toString() }, exportparts: "item" }, toasts.map(toast => (h("wpp-toast-v3-5-0", { key: toast.id, index: toast.id, message: toast.message, type: toast.type, header: toast.header, duration: toast.duration, primaryBtn: toast.primaryBtn, maxMessageLines: toast.maxMessageLines, icon: toast.icon, part: "item", onWppToastComplete: this.handleToastComplete })))));
  }
  static get is() { return "wpp-toast-container"; }
  static get registryIs() { return "wpp-toast-container-v3-5-0"; }
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
      }
    };
  }
  static get states() {
    return {
      "toasts": {},
      "toastsQueue": {}
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
