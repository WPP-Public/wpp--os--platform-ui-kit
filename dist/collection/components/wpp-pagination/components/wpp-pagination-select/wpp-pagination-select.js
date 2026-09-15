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
    this.getPageItems = () => Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
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
      this.activePageNumber = Math.max(1, Math.min(this.numberOfPages, inputValue));
      target.value = String(this.activePageNumber);
      this.wppChange.emit({ page: this.activePageNumber, itemsPerPage: this.itemsPerPage });
    };
    this.handlePageClick = (e) => {
      this.activePageNumber = e.detail.page;
      this.wppChange.emit({ page: this.activePageNumber, itemsPerPage: this.itemsPerPage });
    };
    this.handleLeftArrowClick = () => {
      if (this.activePageNumber === 1)
        return;
      this.activePageNumber = Math.max(this.activePageNumber - 1, 1);
      this.wppChange.emit({ page: this.activePageNumber, itemsPerPage: this.itemsPerPage });
    };
    this.handleRightArrowClick = () => {
      if (this.activePageNumber === this.numberOfPages)
        return;
      this.activePageNumber = Math.min(this.activePageNumber + 1, this.numberOfPages);
      this.wppChange.emit({ page: this.activePageNumber, itemsPerPage: this.itemsPerPage });
    };
    // The chevrons are `role="button"` controls, so they must activate on both Enter and Space
    // (W3C ARIA APG) — without this, keyboard users can reach them but not change the page.
    this.handleArrowKeyDown = (event, handler) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handler();
      }
    };
    this.leftArrowCssClasses = () => ({
      'icon-start': true,
      disabled: this.activePageNumber === 1,
      [this.focusType['left-chevron']]: true,
    });
    this.rightArrowCssClasses = () => ({
      'icon-end': true,
      disabled: this.activePageNumber === this.numberOfPages,
      [this.focusType['right-chevron']]: true,
    });
    this.hostCssClasses = () => ({
      'wpp-pagination-select': true,
      'pagination-select-wrapper': true,
    });
    this.focusType = getInitFocusInfo();
    this.numberOfPages = undefined;
    this.count = undefined;
    this.itemsPerPage = 1;
    this.pageSelectThreshold = 8;
    this.activePageNumber = 1;
    this.previousPageLabel = 'Previous page';
    this.nextPageLabel = 'Next page';
    this.pageInputLabel = 'Page number';
    this.pageLabel = page => `Page ${page}`;
  }
  onUpdateCountOrItemsPerPage() {
    this.numberOfPages = Math.ceil(this.count / this.itemsPerPage);
  }
  componentWillLoad() {
    this.numberOfPages = Math.ceil(this.count / this.itemsPerPage);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "icon-left, page-select, page-item, page-numeric, input, divider, total, icon-right" }, h("wpp-icon-chevron-v4-4-0", { class: this.leftArrowCssClasses(), role: "button", "aria-label": this.previousPageLabel, "aria-disabled": this.activePageNumber === 1 ? 'true' : 'false', onClick: () => this.handleLeftArrowClick(), onKeyDown: (event) => this.handleArrowKeyDown(event, this.handleLeftArrowClick), tabIndex: this.activePageNumber === 1 ? -1 : 0, onBlur: () => this.onBlur('left-chevron'), onMouseDown: () => this.onMouseDown('left-chevron'), onKeyUp: (event) => this.onKeyUp(event, 'left-chevron'), part: "icon-left" }), this.numberOfPages <= this.pageSelectThreshold ? (h("div", { class: "page-select", part: "page-select" }, this.getPageItems().map(page => (h("wpp-pagination-item-v4-4-0", { number: page, selected: this.activePageNumber === page, pageLabel: this.pageLabel, part: "page-item", onWppPageChange: this.handlePageClick }))))) : (h("div", { class: "page-numeric", part: "page-numeric" }, h("input", { type: "number", class: { 'input-page': true, [this.focusType['input']]: true }, value: this.activePageNumber, min: "1", max: this.numberOfPages, "aria-label": this.pageInputLabel, "aria-describedby": "total-pages", onChange: this.handlePageNumberChange, onInput: () => (this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE)), onBlur: () => this.onBlur('input'), onMouseDown: () => this.onMouseDown('input'), onKeyUp: (event) => this.onKeyUp(event, 'input'), part: "input" }), h("wpp-divider-v4-4-0", { part: "divider" }), h("div", { class: "total-pages", part: "total", id: "total-pages" }, this.numberOfPages))), h("wpp-icon-chevron-v4-4-0", { class: this.rightArrowCssClasses(), role: "button", "aria-label": this.nextPageLabel, "aria-disabled": this.activePageNumber === this.numberOfPages ? 'true' : 'false', onClick: () => this.handleRightArrowClick(), onKeyDown: (event) => this.handleArrowKeyDown(event, this.handleRightArrowClick), onBlur: () => this.onBlur('right-chevron'), onMouseDown: () => this.onMouseDown('right-chevron'), onKeyUp: (event) => this.onKeyUp(event, 'right-chevron'), tabIndex: this.activePageNumber === this.numberOfPages ? -1 : 0, part: "icon-right" })));
  }
  static get is() { return "wpp-pagination-select"; }
  static get registryIs() { return "wpp-pagination-select-v4-4-0"; }
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
      "itemsPerPage": {
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
          "text": "Defines how many items to display per page. The number of pages is calculated by dividing the total number of items by the number of itemsPerPage."
        },
        "attribute": "items-per-page",
        "reflect": false,
        "defaultValue": "1"
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
      },
      "previousPageLabel": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Accessible name for the previous-page control."
        },
        "attribute": "previous-page-label",
        "reflect": false,
        "defaultValue": "'Previous page'"
      },
      "nextPageLabel": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Accessible name for the next-page control."
        },
        "attribute": "next-page-label",
        "reflect": false,
        "defaultValue": "'Next page'"
      },
      "pageInputLabel": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Accessible name for the page-number input shown above the page-select threshold."
        },
        "attribute": "page-input-label",
        "reflect": false,
        "defaultValue": "'Page number'"
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
          "text": "Accessible name for a page button."
        },
        "defaultValue": "page => `Page ${page}`"
      }
    };
  }
  static get states() {
    return {
      "focusType": {},
      "numberOfPages": {}
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
          "text": "Contains the active page number and itemsPerPage value."
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
  static get watchers() {
    return [{
        "propName": "count",
        "methodName": "onUpdateCountOrItemsPerPage"
      }, {
        "propName": "itemsPerPage",
        "methodName": "onUpdateCountOrItemsPerPage"
      }];
  }
}
