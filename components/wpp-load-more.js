import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$4 } from './wpp-button2.js';
import { d as defineCustomElement$3 } from './wpp-progress-indicator2.js';
import { d as defineCustomElement$2 } from './wpp-spinner2.js';

const PROGRESS_WIDTH = 200;
const TOTAL_ITEMS = 100;
const ITEMS_LOADED = 0;
const INCREASE_BY = 10;

const wppLoadMoreCss = ":host{--load-more-progress-text-color:var(--wpp-load-more-progress-text-color, var(--wpp-grey-color-700));--load-more-progress-text-color-disabled:var(--wpp-load-more-progress-text-color-disabled, var(--wpp-text-color-disabled));--load-more-progress-bar-color-disabled:var(--wpp-load-more-progress-bar-color-disabled, var(--wpp-brand-color-disabled));--load-more-button-width:var(--wpp-load-more-button-width, 200px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;gap:16px;width:var(--load-more-button-width)}.progress-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;gap:8px}.progress-container.disabled{cursor:not-allowed}.progress-container.disabled .progress-indicator::part(body){--pi-linear-bg-color:var(--load-more-progress-bar-color-disabled)}.progress-text{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);color:var(--load-more-progress-text-color)}.progress-text.disabled{color:var(--load-more-progress-text-color-disabled)}.load-more-button::part(button){width:var(--load-more-button-width)}";

const WppLoadMore$1 = /*@__PURE__*/ proxyCustomElement(class WppLoadMore extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppClickLoadMore = createEvent(this, "wppClickLoadMore", 7);
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
    return (h(Host, { class: this.hostCssClasses(), onKeyDown: this.onKeyDown, exportparts: "container, progress-text, button" }, this.showProgressBar && (h("div", { class: this.progressContainerCssClasses(), part: "container" }, h("span", { id: "wpp-progress-indicator-label", class: this.progressTextCssClasses(), part: "progress-text" }, Math.max(0, Math.min(this.itemsLoaded, this.totalItems)), " of ", Math.max(0, this.totalItems), " items"), h("wpp-progress-indicator-v3-6-0", { class: "progress-indicator", value: this.progressPercentage, width: PROGRESS_WIDTH, ariaProps: { labelledby: 'wpp-progress-indicator-label' } }))), h("wpp-button-v3-6-0", { ref: refEl => (this.loadBtnRef = refEl), class: "load-more-button", variant: "secondary", loading: this.loading && !this.isDisabled(), part: "button", disabled: this.isDisabled(), size: "s", onClick: this.handleClick, ariaProps: this.ariaProps }, "Load more")));
  }
  static get registryIs() { return "wpp-load-more-v3-6-0"; }
  static get watchers() { return {
    "itemsLoaded": ["updateProgress"],
    "totalItems": ["updateProgress"],
    "incrementBy": ["updateProgress"]
  }; }
  static get style() { return wppLoadMoreCss; }
}, [1, "wpp-load-more", "wpp-load-more-v3-6-0", {
    "totalItems": [2, "total-items"],
    "itemsLoaded": [2, "items-loaded"],
    "showProgressBar": [4, "show-progress-bar"],
    "loading": [4],
    "disabled": [516],
    "incrementBy": [2, "increment-by"],
    "ariaProps": [16],
    "progressPercentage": [32],
    "setFocus": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-load-more-v3-6-0", "wpp-button-v3-6-0", "wpp-progress-indicator-v3-6-0", "wpp-spinner-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-load-more-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppLoadMore$1);
      }
      break;
    case "wpp-button-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-progress-indicator-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-spinner-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppLoadMore = WppLoadMore$1;
const defineCustomElement = defineCustomElement$1;

export { WppLoadMore, defineCustomElement };
