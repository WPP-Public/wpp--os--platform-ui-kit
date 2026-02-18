import { Host, h } from '@stencil/core';
import { FOCUS_TYPE } from '../../../../types/common';
/**
 * @part number - number text element
 */
export class WppPaginationItem {
  constructor() {
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
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onClick: this.handleClick, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, tabIndex: 0, exportparts: "number" }, h("wpp-typography-v3-5-0", { type: "s-body", part: "number" }, this.number)));
  }
  static get is() { return "wpp-pagination-item"; }
  static get registryIs() { return "wpp-pagination-item-v3-5-0"; }
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
}
