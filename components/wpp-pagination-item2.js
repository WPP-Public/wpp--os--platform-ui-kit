import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const wppPaginationItemCss = ":host{--pagination-item-padding:var(--wpp-pagination-item-padding, 5px 1px);--pagination-item-size:var(--wpp-pagination-item-size, 32px);--pagination-item-border-radius:var(--wpp-pagination-item-border-radius, var(--wpp-border-radius-xs));--pagination-item-first-border-color-focus:var(\n    --wpp-pagination-item-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--pagination-item-second-border-color-focus:var(\n    --wpp-pagination-item-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--pagination-item-text-color:var(--wpp-pagination-item-text-color, var(--wpp-text-color-info));--pagination-item-text-color-hover:var(--wpp-pagination-item-text-color-hover, var(--wpp-text-color));--pagination-item-text-color-active:var(--wpp-pagination-item-text-color-active, var(--wpp-text-color));--pagination-item-bg-color-hover:var(--wpp-pagination-item-bg-color-hover, var(--wpp-grey-color-200));--pagination-item-bg-color-active:var(--wpp-pagination-item-bg-color-active, var(--wpp-grey-color-300));--pagination-item-text-color-selected:var(--wpp-pagination-item-text-color-selected, var(--wpp-brand-color));--pagination-item-bg-color-selected:var(--wpp-pagination-item-bg-color-selected, var(--wpp-primary-color-100))}:host(.pagination-item-wrapper){display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--pagination-item-size);height:var(--pagination-item-size);padding:var(--pagination-item-padding);border-radius:var(--pagination-item-border-radius);cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:none}:host(.pagination-item-wrapper) .wpp-typography{color:var(--pagination-item-text-color)}:host(.pagination-item-wrapper):host(:focus-visible){border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--pagination-item-first-border-color-focus), 0 0 0 3px var(--pagination-item-second-border-color-focus);box-shadow:0 0 0 1px var(--pagination-item-first-border-color-focus), 0 0 0 3px var(--pagination-item-second-border-color-focus);position:relative;z-index:1}:host(.pagination-item-wrapper:hover){background-color:var(--pagination-item-bg-color-hover)}:host(.pagination-item-wrapper:hover):host(:not(.selected)) .wpp-typography{color:var(--pagination-item-text-color-hover)}:host(.pagination-item-wrapper:active){background-color:var(--pagination-item-bg-color-active)}:host(.pagination-item-wrapper:active):host(:not(.selected)) .wpp-typography{color:var(--pagination-item-text-color-active)}:host(.pagination-item-wrapper:focus-visible){background-color:var(--pagination-item-bg-color-hover)}:host(.pagination-item-wrapper:focus-visible):host(:not(.selected)) .wpp-typography{color:var(--pagination-item-text-color-hover)}:host(.selected){background-color:var(--pagination-item-bg-color-selected)}:host(.selected) .wpp-typography{color:var(--pagination-item-text-color-selected)}:host(.selected) .wpp-typography::part(typography){font-weight:600}:host(.selected:active){background-color:var(--pagination-item-bg-color-selected)}:host(.selected:hover){background-color:var(--pagination-item-bg-color-selected)}:host(.selected:focus-visible){background-color:var(--wpp-primary-color-100)}";

const WppPaginationItem = /*@__PURE__*/ proxyCustomElement(class WppPaginationItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppPageChange = createEvent(this, "wppPageChange", 1);
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
    return (h(Host, { class: this.hostCssClasses(), onClick: this.handleClick, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, tabIndex: 0, exportparts: "number" }, h("wpp-typography-v4-0-0", { type: "s-body", part: "number" }, this.number)));
  }
  static get registryIs() { return "wpp-pagination-item-v4-0-0"; }
  static get style() { return wppPaginationItemCss; }
}, [1, "wpp-pagination-item", "wpp-pagination-item-v4-0-0", {
    "number": [2],
    "selected": [4],
    "focusType": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-pagination-item-v4-0-0", "wpp-typography-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-pagination-item-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppPaginationItem);
      }
      break;
    case "wpp-typography-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppPaginationItem as W, defineCustomElement as d };
