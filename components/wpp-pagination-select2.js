import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { d as defineCustomElement$4 } from './wpp-divider2.js';
import { d as defineCustomElement$3 } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$2 } from './wpp-pagination-item2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const wppPaginationSelectCss = ":host{--pagination-icons-color:var(--wpp-pagination-icons-color, var(--wpp-icon-color));--pagination-icons-color-hover:var(--wpp-pagination-icons-color-hover, var(--wpp-icon-color-hover));--pagination-icons-color-active:var(--wpp-pagination-icons-color-active, var(--wpp-icon-color-active));--pagination-icons-color-disabled:var(\n    --wpp-pagination-icons-color-disabled,\n    var(--wpp-icon-color-disabled)\n  );--pagination-icons-first-border-color-focus:var(--wpp-pagination-icons-first-border-color-focus, var(--wpp-grey-color-000));--pagination-icons-second-border-color-focus:var(--wpp-pagination-icons-second-border-color-focus, var(--wpp-brand-color));--pagination-total-count-color:var(--wpp-pagination-total-count-color, var(--wpp-text-color-info));--pagination-input-border-color:var(--wpp-pagination-input-border-color, var(--wpp-grey-color-600));--pagination-input-border-color-hover:var(--wpp-pagination-input-border-color-hover, var(--wpp-grey-color-700));--pagination-input-border-color-active:var(--wpp-pagination-input-border-color-active, var(--wpp-grey-color-800));--pagination-input-border-width:var(--wpp-pagination-input-border-width, var(--wpp-border-width-s));--pagination-input-border-style:var(--wpp-pagination-input-border-style, solid);--pagination-input-first-border-color-focus:var(--wpp-pagination-input-first-border-color-focus, var(--wpp-grey-color-000));--pagination-input-second-border-color-focus:var(--wpp-pagination-input-second-border-color-focus, var(--wpp-brand-color))}:host(.pagination-select-wrapper){display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box}.icon-start{margin-right:4px;-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.icon-end{margin-left:4px}.icon-start,.icon-end{display:-ms-inline-flexbox;display:inline-flex;color:var(--pagination-icons-color);cursor:pointer;outline:none}.icon-start:active,.icon-end:active{color:var(--pagination-icons-color-active)}.icon-start:hover:not(:active),.icon-end:hover:not(:active){color:var(--pagination-icons-color-hover)}.icon-start.disabled,.icon-end.disabled{color:var(--pagination-icons-color-disabled);pointer-events:none}.icon-start.tab-focus,.icon-end.tab-focus{border-radius:3px;outline:none;-webkit-box-shadow:0 0 0 1px var(--pagination-icons-first-border-color-focus), 0 0 0 2px var(--pagination-icons-second-border-color-focus);box-shadow:0 0 0 1px var(--pagination-icons-first-border-color-focus), 0 0 0 2px var(--pagination-icons-second-border-color-focus);background-color:var(--wpp-grey-color-000);color:var(--pagination-icons-color-hover)}.wpp-pagination-item:not(:last-child){margin-right:2px}.page-numeric{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}.page-numeric .input-page{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);-webkit-box-sizing:border-box;box-sizing:border-box;width:40px;height:32px;padding:5px 0;text-align:center;border-radius:var(--wpp-border-radius-s);outline:none;border:var(--pagination-input-border-width) var(--pagination-input-border-style) var(--pagination-input-border-color)}.page-numeric .input-page::-webkit-outer-spin-button,.page-numeric .input-page::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;appearance:none}.page-numeric .input-page[type=number]{-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.page-numeric .input-page:focus{border:var(--pagination-input-border-width) var(--pagination-input-border-style) var(--pagination-input-border-color-active)}.page-numeric .input-page:hover:not(:focus){background:var(--wpp-grey-color-200);border:var(--pagination-input-border-width) var(--pagination-input-border-style) var(--pagination-input-border-color-hover)}.page-numeric .input-page:active{border:var(--pagination-input-border-width) var(--pagination-input-border-style) var(--pagination-input-border-color-active)}.page-numeric .input-page.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--pagination-input-first-border-color-focus), 0 0 0 2px var(--pagination-input-second-border-color-focus);box-shadow:0 0 0 1px var(--pagination-input-first-border-color-focus), 0 0 0 2px var(--pagination-input-second-border-color-focus);background:var(--wpp-grey-color-200);border:var(--pagination-input-border-width) var(--pagination-input-border-style) var(--pagination-input-border-color-hover)}.page-numeric .total-pages{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;min-width:40px;color:var(--pagination-total-count-color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.page-numeric .wpp-divider{--divider-width:1px;--divider-height:12px;margin:0 8px}";

const getInitFocusInfo = () => ({
  'left-chevron': FOCUS_TYPE.NONE,
  'right-chevron': FOCUS_TYPE.NONE,
  input: FOCUS_TYPE.NONE,
});
const WppPaginationSelect = /*@__PURE__*/ proxyCustomElement(class WppPaginationSelect extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "icon-left, page-select, page-item, page-numeric, input, divider, total, icon-right" }, h("wpp-icon-chevron-v2-22-0", { class: this.leftArrowCssClasses(), onClick: () => this.handleLeftArrowClick(), tabIndex: this.activePageNumber === 1 ? -1 : 0, onBlur: () => this.onBlur('left-chevron'), onMouseDown: () => this.onMouseDown('left-chevron'), onKeyUp: (event) => this.onKeyUp(event, 'left-chevron'), part: "icon-left" }), this.count <= this.pageSelectThreshold ? (h("div", { class: "page-select", part: "page-select" }, this.getPageItems().map(page => (h("wpp-pagination-item-v2-22-0", { number: page, selected: this.activePageNumber === page, part: "page-item", onWppPageChange: this.handlePageClick }))))) : (h("div", { class: "page-numeric", part: "page-numeric" }, h("input", { type: "number", class: { 'input-page': true, [this.focusType['input']]: true }, value: this.activePageNumber, onChange: this.handlePageNumberChange, onInput: () => (this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE)), onBlur: () => this.onBlur('input'), onMouseDown: () => this.onMouseDown('input'), onKeyUp: (event) => this.onKeyUp(event, 'input'), part: "input", title: "" }), h("wpp-divider-v2-22-0", { part: "divider" }), h("div", { class: "total-pages", part: "total" }, this.count))), h("wpp-icon-chevron-v2-22-0", { class: this.rightArrowCssClasses(), onClick: () => this.handleRightArrowClick(), onBlur: () => this.onBlur('right-chevron'), onMouseDown: () => this.onMouseDown('right-chevron'), onKeyUp: (event) => this.onKeyUp(event, 'right-chevron'), tabIndex: this.activePageNumber === this.count ? -1 : 0, part: "icon-right" })));
  }
  static get registryIs() { return "wpp-pagination-select-v2-22-0"; }
  static get style() { return wppPaginationSelectCss; }
}, [1, "wpp-pagination-select", "wpp-pagination-select-v2-22-0", {
    "count": [2],
    "pageSelectThreshold": [2, "page-select-threshold"],
    "activePageNumber": [1538, "active-page-number"],
    "focusType": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-pagination-select-v2-22-0", "wpp-divider-v2-22-0", "wpp-icon-chevron-v2-22-0", "wpp-pagination-item-v2-22-0", "wpp-typography-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-pagination-select-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppPaginationSelect);
      }
      break;
    case "wpp-divider-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-icon-chevron-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-pagination-item-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppPaginationSelect as W, defineCustomElement as d };
