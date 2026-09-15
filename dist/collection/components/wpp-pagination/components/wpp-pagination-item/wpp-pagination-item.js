import { Host, h } from '@stencil/core';
import { FOCUS_TYPE } from '../../../../types/common';
import { themeSubscriptionController } from '../../../../utils/subscribe-to-theme';
/**
 * @part number - number text element
 */
export class WppPaginationItem {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.onBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    // A `role="button"` control must activate on both Enter and Space (W3C ARIA APG) — without
    // this, keyboard users can reach the page numbers but not select them.
    this.onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleClick();
      }
    };
    this.handleClick = () => {
      this.wppPageChange.emit({ page: this.number });
    };
    this.hostCssClasses = () => ({
      'wpp-pagination-item': true,
      'pagination-item-wrapper': true,
      selected: this.selected,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.focusType = undefined;
    this.number = undefined;
    this.selected = false;
    this.pageLabel = page => `Page ${page}`;
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: "button", "aria-label": this.pageLabel(this.number), "aria-current": this.selected ? 'page' : undefined, onClick: this.handleClick, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown, tabIndex: 0, exportparts: "number" }, h("wpp-typography-v4-4-0", { type: "s-body", part: "number" }, this.number)));
  }
  static get is() { return "wpp-pagination-item"; }
  static get registryIs() { return "wpp-pagination-item-v4-4-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-pagination-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-pagination-item.css"]
    };
  }
  static get properties() {
    return {
      "number": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates current page number"
        },
        "attribute": "number",
        "reflect": false
      },
      "selected": {
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
          "text": "If `true`, the component is selected"
        },
        "attribute": "selected",
        "reflect": false,
        "defaultValue": "false"
      },
      "pageLabel": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "(page: number) => string",
          "resolved": "(page: number) => string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Accessible name for the page button."
        },
        "defaultValue": "page => `Page ${page}`"
      }
    };
  }
  static get states() {
    return {
      "focusType": {}
    };
  }
  static get events() {
    return [{
        "method": "wppPageChange",
        "name": "wppPageChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted active page number"
        },
        "complexType": {
          "original": "PaginationPageChangeEventDetail",
          "resolved": "PaginationPageChangeEventDetail",
          "references": {
            "PaginationPageChangeEventDetail": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-pagination/types.ts::PaginationPageChangeEventDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
}
