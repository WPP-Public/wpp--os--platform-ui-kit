import { Host, h } from '@stencil/core';
import { LOCALES_DEFAULTS } from './const';
/**
 * @part body - Main content wrapper
 * @part per-page-label - per-page label text element
 * @part pre-page-select - per-page select element
 * @part per-page-item - per-page item element
 * @part divider - divider element
 * @part range - pagination range text element
 * @part page-select - page select element
 */
export class WppPagination {
  constructor() {
    this._locales = LOCALES_DEFAULTS;
    this.handleItemsPerPageNumberChange = (e) => {
      this.activePageNumber = 1;
      this.selectedItemPerPage = Number(e.detail.value);
      this.wppChange.emit({
        page: this.activePageNumber,
        itemsPerPage: this.selectedItemPerPage,
      });
    };
    this.handleSelectedPageChange = (e) => {
      this.activePageNumber = e.detail.page;
      this.wppChange.emit({
        page: this.activePageNumber,
        itemsPerPage: Number(this.selectedItemPerPage),
      });
    };
    this.getPageRange = () => {
      if (this.selectedItemPerPage) {
        const min = (this.activePageNumber - 1) * this.selectedItemPerPage + 1;
        const max = Math.min(this.activePageNumber * this.selectedItemPerPage, this.count);
        const totalPages = this.count;
        return `${min}-${max} ${this._locales.of} ${totalPages} ${this._locales.items}`;
      }
    };
    this.hostCssClasses = () => ({
      'wpp-pagination': true,
      'wpp-pagination-wrapper': true,
    });
    this.count = undefined;
    this.itemsPerPage = [5, 10, 20, 50];
    this.selectedItemPerPage = undefined;
    this.pageSelectThreshold = 8;
    this.activePageNumber = 1;
    this.dropdownConfig = {};
    this.locales = {};
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    if (!this.selectedItemPerPage) {
      this.selectedItemPerPage = this.itemsPerPage[0];
      this.wppChange.emit({ page: this.activePageNumber, itemsPerPage: this.selectedItemPerPage });
    }
  }
  render() {
    const countPagesToDisplay = Math.ceil(this.count / this.selectedItemPerPage);
    if (this.count === 0) {
      return null;
    }
    return (h(Host, { class: this.hostCssClasses(), exportparts: "body, per-page-label, pre-page-select, per-page-item, divider, range, page-select" }, h("div", { class: "control-pagination-wrapper", part: "body" }, h("wpp-typography-v3-3-0", { type: "s-body", part: "per-page-label" }, this._locales.itemsPerPage, ":"), h("wpp-select-v3-3-0", { type: "single", isTextSelect: true, onWppChange: this.handleItemsPerPageNumberChange, value: this.selectedItemPerPage, dropdownConfig: { ...this.dropdownConfig }, dropdownWidth: "100px", part: "pre-page-select", list: this.itemsPerPage.map(item => ({
        value: item,
        label: `${item}`,
        part: 'per-page-item',
      })) }), h("wpp-divider-v3-3-0", { part: "divider" }), h("wpp-typography-v3-3-0", { type: "s-body", part: "range" }, this.getPageRange())), countPagesToDisplay && (h("wpp-pagination-select-v3-3-0", { count: countPagesToDisplay, pageSelectThreshold: this.pageSelectThreshold, onWppChange: this.handleSelectedPageChange, activePageNumber: this.activePageNumber, part: "page-select" }))));
  }
  static get is() { return "wpp-pagination"; }
  static get registryIs() { return "wpp-pagination-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-pagination.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-pagination.css"]
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
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "number[]",
          "resolved": "number[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the menu items."
        },
        "defaultValue": "[5, 10, 20, 50]"
      },
      "selectedItemPerPage": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines a menu item that serves as the initial value."
        },
        "attribute": "selected-item-per-page",
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
      },
      "dropdownConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Dropdown config, under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<PaginationLocales>",
          "resolved": "{ itemsPerPage?: string | undefined; of?: string | undefined; items?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "PaginationLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pagination/types.ts::PaginationLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for pagination component"
        },
        "defaultValue": "{}"
      }
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
          "text": "Emitted when selected page or number of items per page changes"
        },
        "complexType": {
          "original": "PaginationChangeEventDetail",
          "resolved": "PaginationChangeEventDetail",
          "references": {
            "PaginationChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pagination/types.ts::PaginationChangeEventDetail"
            }
          }
        }
      }];
  }
  static get watchers() {
    return [{
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}
