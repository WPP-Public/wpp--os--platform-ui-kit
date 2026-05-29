import { h, Host } from '@stencil/core';
import { PROGRESS_WIDTH, INCREASE_BY, ITEMS_LOADED, TOTAL_ITEMS } from './const';
/**
 * @part container - Container element
 * @part progress-text - Progress text element
 * @part button - Load more button element
 */
export class WppLoadMore {
  constructor() {
    this.hasToggledBtn = false;
    this.handleClick = (e) => {
      if (this.isDisabled()) {
        e.stopPropagation();
        return;
      }
      const newItemsLoaded = Math.min(this.itemsLoaded + this.incrementBy, this.totalItems);
      this.wppClickLoadMore.emit({ newItemsLoaded, incrementBy: this.incrementBy });
    };
    this.onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        this.hasToggledBtn = true;
      }
    };
    this.hostCssClasses = () => ({
      'wpp-load-more': true,
      'wpp-disabled': this.isDisabled(),
    });
    this.progressTextCssClasses = () => ({
      'progress-text': true,
      disabled: this.isDisabled(),
    });
    this.progressContainerCssClasses = () => ({
      'progress-container': true,
      disabled: this.isDisabled(),
    });
    this.progressPercentage = 0;
    this.totalItems = TOTAL_ITEMS;
    this.itemsLoaded = ITEMS_LOADED;
    this.showProgressBar = false;
    this.loading = false;
    this.disabled = false;
    this.incrementBy = INCREASE_BY;
    this.ariaProps = {};
  }
  updateProgress() {
    this.progressPercentage =
      (Math.max(0, Math.min(this.itemsLoaded, this.totalItems)) / Math.max(0, this.totalItems)) * 100;
  }
  /**
   * Method that sets focus on the load button.
   */
  async setFocus() {
    if (this.loadBtnRef) {
      this.loadBtnRef.setFocus();
    }
  }
  componentDidRender() {
    if (!this.loading && this.hasToggledBtn && !this.isDisabled()) {
      this.hasToggledBtn = false;
      this.setFocus();
    }
  }
  componentWillLoad() {
    this.updateProgress();
  }
  isDisabled() {
    return this.disabled || this.itemsLoaded >= this.totalItems;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onKeyDown: this.onKeyDown, exportparts: "container, progress-text, button" }, this.showProgressBar && (h("div", { class: this.progressContainerCssClasses(), part: "container" }, h("span", { id: "wpp-progress-indicator-label", class: this.progressTextCssClasses(), part: "progress-text" }, Math.max(0, Math.min(this.itemsLoaded, this.totalItems)), " of ", Math.max(0, this.totalItems), " items"), h("wpp-progress-indicator-v4-1-0", { class: "progress-indicator", value: this.progressPercentage, width: PROGRESS_WIDTH, ariaProps: { labelledby: 'wpp-progress-indicator-label' } }))), h("wpp-button-v4-1-0", { ref: refEl => (this.loadBtnRef = refEl), class: "load-more-button", variant: "secondary", loading: this.loading && !this.isDisabled(), part: "button", disabled: this.isDisabled(), size: "s", onClick: this.handleClick, ariaProps: this.ariaProps }, "Load more")));
  }
  static get is() { return "wpp-load-more"; }
  static get registryIs() { return "wpp-load-more-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-load-more.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-load-more.css"]
    };
  }
  static get properties() {
    return {
      "totalItems": {
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
          "text": "The total number of items."
        },
        "attribute": "total-items",
        "reflect": false,
        "defaultValue": "TOTAL_ITEMS"
      },
      "itemsLoaded": {
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
          "text": "The number of items that have been loaded."
        },
        "attribute": "items-loaded",
        "reflect": false,
        "defaultValue": "ITEMS_LOADED"
      },
      "showProgressBar": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Determines whether to show the progress bar."
        },
        "attribute": "show-progress-bar",
        "reflect": false,
        "defaultValue": "false"
      },
      "loading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Determines whether the component is in a loading state."
        },
        "attribute": "loading",
        "reflect": false,
        "defaultValue": "false"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Determines whether the component is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "incrementBy": {
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
          "text": "Defines the amount by which to increment the itemsLoaded when the button is clicked."
        },
        "attribute": "increment-by",
        "reflect": false,
        "defaultValue": "INCREASE_BY"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Aria properties that will be applied on the button only."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "progressPercentage": {}
    };
  }
  static get events() {
    return [{
        "method": "wppClickLoadMore",
        "name": "wppClickLoadMore",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the \"Load more\" button is clicked."
        },
        "complexType": {
          "original": "LoadMoreChangeEventDetail",
          "resolved": "LoadMoreChangeEventDetail",
          "references": {
            "LoadMoreChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-load-more/types.ts::LoadMoreChangeEventDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "setFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method that sets focus on the load button.",
          "tags": []
        }
      }
    };
  }
  static get watchers() {
    return [{
        "propName": "itemsLoaded",
        "methodName": "updateProgress"
      }, {
        "propName": "totalItems",
        "methodName": "updateProgress"
      }, {
        "propName": "incrementBy",
        "methodName": "updateProgress"
      }];
  }
}
