import { Host, h } from '@stencil/core';
import { FOCUS_TYPE } from '../../../../types/common';
const getInitFocusInfo = () => ({
  'left-chevron': FOCUS_TYPE.NONE,
  'right-chevron': FOCUS_TYPE.NONE,
  input: FOCUS_TYPE.NONE,
});
/**
 * @part input - Pagination input element
 * @part icon-left - icon left element
 * @part page-select - page select wrapper element
 * @part page-item - page item element
 * @part page-numeric - page numeric wrapper element
 * @part divider - divider element
 * @part total - total text element
 * @part icon-right - icon right element
 */
export class WppPaginationSelect {
  constructor() {
    this.getPageItems = () => Array.from({ length: this.count }, (_, i) => i + 1);
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.onBlur = (type) => {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.NONE);
    };
    this.onMouseDown = (type) => {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.MOUSE);
    };
    this.onKeyUp = (event, type) => {
      if (event.key === 'Tab') {
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
      }
    };
    this.handlePageNumberChange = (event) => {
      const target = event.target;
      const inputValue = Math.round(Number(target.value));
      this.activePageNumber = Math.max(1, Math.min(this.count, inputValue));
      target.value = String(this.activePageNumber);
      this.wppChange.emit({ page: this.activePageNumber });
    };
    this.handlePageClick = (e) => {
      this.activePageNumber = e.detail.page;
      this.wppChange.emit({ page: this.activePageNumber });
    };
    this.handleLeftArrowClick = () => {
      this.activePageNumber = Math.max(this.activePageNumber - 1, 1);
      this.wppChange.emit({ page: this.activePageNumber });
    };
    this.handleRightArrowClick = () => {
      this.activePageNumber = Math.min(this.activePageNumber + 1, this.count);
      this.wppChange.emit({ page: this.activePageNumber });
    };
    this.leftArrowCssClasses = () => ({
      'icon-start': true,
      disabled: this.activePageNumber === 1,
      [this.focusType['left-chevron']]: true,
    });
    this.rightArrowCssClasses = () => ({
      'icon-end': true,
      disabled: this.activePageNumber === this.count,
      [this.focusType['right-chevron']]: true,
    });
    this.hostCssClasses = () => ({
      'wpp-pagination-select': true,
      'pagination-select-wrapper': true,
    });
    this.focusType = getInitFocusInfo();
    this.count = undefined;
    this.pageSelectThreshold = 8;
    this.activePageNumber = 1;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "icon-left, page-select, page-item, page-numeric, input, divider, total, icon-right" }, h("wpp-icon-chevron-v3-3-1", { class: this.leftArrowCssClasses(), onClick: () => this.handleLeftArrowClick(), tabIndex: this.activePageNumber === 1 ? -1 : 0, onBlur: () => this.onBlur('left-chevron'), onMouseDown: () => this.onMouseDown('left-chevron'), onKeyUp: (event) => this.onKeyUp(event, 'left-chevron'), part: "icon-left" }), this.count <= this.pageSelectThreshold ? (h("div", { class: "page-select", part: "page-select" }, this.getPageItems().map(page => (h("wpp-pagination-item-v3-3-1", { number: page, selected: this.activePageNumber === page, part: "page-item", onWppPageChange: this.handlePageClick }))))) : (h("div", { class: "page-numeric", part: "page-numeric" }, h("input", { type: "number", class: { 'input-page': true, [this.focusType['input']]: true }, value: this.activePageNumber, onChange: this.handlePageNumberChange, onInput: () => (this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE)), onBlur: () => this.onBlur('input'), onMouseDown: () => this.onMouseDown('input'), onKeyUp: (event) => this.onKeyUp(event, 'input'), part: "input", title: "" }), h("wpp-divider-v3-3-1", { part: "divider" }), h("div", { class: "total-pages", part: "total" }, this.count))), h("wpp-icon-chevron-v3-3-1", { class: this.rightArrowCssClasses(), onClick: () => this.handleRightArrowClick(), onBlur: () => this.onBlur('right-chevron'), onMouseDown: () => this.onMouseDown('right-chevron'), onKeyUp: (event) => this.onKeyUp(event, 'right-chevron'), tabIndex: this.activePageNumber === this.count ? -1 : 0, part: "icon-right" })));
  }
  static get is() { return "wpp-pagination-select"; }
  static get registryIs() { return "wpp-pagination-select-v3-3-1"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-pagination-select.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-pagination-select.css"]
    };
  }
  static get properties() {
    return {
      "count": {
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
          "text": "Defines the total number of items."
        },
        "attribute": "count",
        "reflect": false
      },
      "pageSelectThreshold": {
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
          "text": "Defines a threshold for pages to display. When the number of pages to display exceeds this value, the component displays a numeric selector instead of the page list."
        },
        "attribute": "page-select-threshold",
        "reflect": false,
        "defaultValue": "8"
      },
      "activePageNumber": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the active page number."
        },
        "attribute": "active-page-number",
        "reflect": true,
        "defaultValue": "1"
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
        "method": "wppChange",
        "name": "wppChange",
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
