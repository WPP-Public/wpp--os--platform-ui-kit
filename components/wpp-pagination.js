import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$p } from './wpp-action-button2.js';
import { d as defineCustomElement$o } from './wpp-checkbox2.js';
import { d as defineCustomElement$n } from './wpp-divider2.js';
import { d as defineCustomElement$m } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$l } from './wpp-icon-cross2.js';
import { d as defineCustomElement$k } from './wpp-icon-dash2.js';
import { d as defineCustomElement$j } from './wpp-icon-error2.js';
import { d as defineCustomElement$i } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$h } from './wpp-icon-search2.js';
import { d as defineCustomElement$g } from './wpp-icon-success2.js';
import { d as defineCustomElement$f } from './wpp-icon-tick2.js';
import { d as defineCustomElement$e } from './wpp-icon-warning2.js';
import { d as defineCustomElement$d } from './wpp-inline-message2.js';
import { d as defineCustomElement$c } from './wpp-input2.js';
import { d as defineCustomElement$b } from './wpp-internal-label2.js';
import { d as defineCustomElement$a } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$9 } from './wpp-label2.js';
import { d as defineCustomElement$8 } from './wpp-list-item2.js';
import { d as defineCustomElement$7 } from './wpp-pagination-item2.js';
import { d as defineCustomElement$6 } from './wpp-pagination-select2.js';
import { d as defineCustomElement$5 } from './wpp-select2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const LOCALES_DEFAULTS = {
  itemsPerPage: 'Items per page',
  of: 'of',
  items: 'items',
};

const wppPaginationCss = ":host{--pagination-text-color:var(--wpp-pagination-text-color, var(--wpp-text-color-info));--pagination-options-list-width:var(--wpp-pagination-options-list-width, 100px)}:host(.wpp-pagination-wrapper){display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}:host(.wpp-pagination-wrapper) .control-pagination-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host(.wpp-pagination-wrapper) .wpp-divider{--divider-width:1px;--divider-height:12px;margin:0 16px 0 6px}:host(.wpp-pagination-wrapper) .wpp-typography{color:var(--pagination-text-color)}:host(.wpp-pagination-wrapper) .single-item-per-page{margin-left:10px;color:var(--pagination-text-color)}:host(.wpp-pagination-wrapper) .wpp-text-select{--wpp-input-select-min-width:46px;margin-left:2px}:host(.wpp-pagination-wrapper) .wpp-text-select::part(options-list){width:var(--pagination-options-list-width)}:host(.wpp-pagination-wrapper) .wpp-text-select::part(body){display:-ms-inline-flexbox;display:inline-flex}";

const WppPagination$1 = /*@__PURE__*/ proxyCustomElement(class WppPagination extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
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
  get hasSingleItemPerPageOption() {
    return this.itemsPerPage.length === 1;
  }
  render() {
    const countPagesToDisplay = Math.ceil(this.count / this.selectedItemPerPage);
    if (this.count === 0) {
      return null;
    }
    return (h(Host, { class: this.hostCssClasses(), exportparts: "body, per-page-label, pre-page-select, per-page-item, divider, range, page-select" }, h("div", { class: "control-pagination-wrapper", part: "body" }, h("wpp-typography-v4-0-0", { type: "s-body", part: "per-page-label" }, this._locales.itemsPerPage, ":"), this.hasSingleItemPerPageOption ? (h("wpp-typography-v4-0-0", { type: "s-body", class: "single-item-per-page", part: "pre-page-select" }, this.selectedItemPerPage)) : (h("wpp-select-v4-0-0", { type: "single", isTextSelect: true, onWppChange: this.handleItemsPerPageNumberChange, value: this.selectedItemPerPage, dropdownConfig: { ...this.dropdownConfig }, dropdownWidth: "100px", part: "pre-page-select", list: this.itemsPerPage.map(item => ({
        value: item,
        label: `${item}`,
        part: 'per-page-item',
      })) })), h("wpp-divider-v4-0-0", { part: "divider" }), h("wpp-typography-v4-0-0", { type: "s-body", part: "range" }, this.getPageRange())), countPagesToDisplay && (h("wpp-pagination-select-v4-0-0", { count: countPagesToDisplay, pageSelectThreshold: this.pageSelectThreshold, onWppChange: this.handleSelectedPageChange, activePageNumber: this.activePageNumber, part: "page-select" }))));
  }
  static get registryIs() { return "wpp-pagination-v4-0-0"; }
  static get watchers() { return {
    "locales": ["onUpdateLocales"]
  }; }
  static get style() { return wppPaginationCss; }
}, [1, "wpp-pagination", "wpp-pagination-v4-0-0", {
    "count": [2],
    "itemsPerPage": [16],
    "selectedItemPerPage": [1026, "selected-item-per-page"],
    "pageSelectThreshold": [2, "page-select-threshold"],
    "activePageNumber": [1538, "active-page-number"],
    "dropdownConfig": [16],
    "locales": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-pagination-v4-0-0", "wpp-action-button-v4-0-0", "wpp-checkbox-v4-0-0", "wpp-divider-v4-0-0", "wpp-icon-chevron-v4-0-0", "wpp-icon-cross-v4-0-0", "wpp-icon-dash-v4-0-0", "wpp-icon-error-v4-0-0", "wpp-icon-info-message-v4-0-0", "wpp-icon-search-v4-0-0", "wpp-icon-success-v4-0-0", "wpp-icon-tick-v4-0-0", "wpp-icon-warning-v4-0-0", "wpp-inline-message-v4-0-0", "wpp-input-v4-0-0", "wpp-internal-label-v4-0-0", "wpp-internal-tooltip-v4-0-0", "wpp-label-v4-0-0", "wpp-list-item-v4-0-0", "wpp-pagination-item-v4-0-0", "wpp-pagination-select-v4-0-0", "wpp-select-v4-0-0", "wpp-spinner-v4-0-0", "wpp-tooltip-v4-0-0", "wpp-typography-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-pagination-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppPagination$1);
      }
      break;
    case "wpp-action-button-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "wpp-checkbox-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "wpp-divider-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "wpp-icon-chevron-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "wpp-icon-cross-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-icon-dash-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-error-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-info-message-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-search-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-success-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-tick-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-warning-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-inline-message-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-input-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-internal-label-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-internal-tooltip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-label-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-list-item-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-pagination-item-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-pagination-select-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-select-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppPagination = WppPagination$1;
const defineCustomElement = defineCustomElement$1;

export { WppPagination, defineCustomElement };
