'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const PROGRESS_WIDTH = 200;
const TOTAL_ITEMS = 100;
const ITEMS_LOADED = 0;
const INCREASE_BY = 10;

const wppLoadMoreCss = ":host{--load-more-progress-text-color:var(--wpp-load-more-progress-text-color, var(--wpp-grey-color-700));--load-more-progress-text-color-disabled:var(--wpp-load-more-progress-text-color-disabled, var(--wpp-text-color-disabled));--load-more-progress-bar-color-disabled:var(--wpp-load-more-progress-bar-color-disabled, var(--wpp-brand-color-disabled));--load-more-button-width:var(--wpp-load-more-button-width, 200px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;gap:16px;width:var(--load-more-button-width)}.progress-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;gap:8px}.progress-container.disabled{cursor:not-allowed}.progress-container.disabled .progress-indicator::part(body){--pi-linear-bg-color:var(--load-more-progress-bar-color-disabled)}.progress-text{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);color:var(--load-more-progress-text-color)}.progress-text.disabled{color:var(--load-more-progress-text-color-disabled)}.load-more-button::part(button){width:var(--load-more-button-width)}";

const WppLoadMore = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClickLoadMore = index.createEvent(this, "wppClickLoadMore", 7);
    this.handleClick = (e) => {
      if (this.isDisabled()) {
        e.stopPropagation();
        return;
      }
      const newItemsLoaded = Math.min(this.itemsLoaded + this.incrementBy, this.totalItems);
      this.wppClickLoadMore.emit({ newItemsLoaded, incrementBy: this.incrementBy });
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
  }
  updateProgress() {
    this.progressPercentage =
      (Math.max(0, Math.min(this.itemsLoaded, this.totalItems)) / Math.max(0, this.totalItems)) * 100;
  }
  componentWillLoad() {
    this.updateProgress();
  }
  isDisabled() {
    return this.disabled || this.itemsLoaded >= this.totalItems;
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "container, progress-text, button", "aria-disabled": this.isDisabled() }, this.showProgressBar && (index.h("div", { class: this.progressContainerCssClasses(), part: "container" }, index.h("span", { class: this.progressTextCssClasses(), part: "progress-text" }, Math.max(0, Math.min(this.itemsLoaded, this.totalItems)), " of ", Math.max(0, this.totalItems), " items"), index.h("wpp-progress-indicator-v2-22-0", { class: "progress-indicator", value: this.progressPercentage, width: PROGRESS_WIDTH }))), index.h("wpp-button-v2-22-0", { class: "load-more-button", variant: "secondary", loading: this.loading && !this.isDisabled(), part: "button", disabled: this.isDisabled(), size: "s", onClick: this.handleClick }, "Load more")));
  }
  static get registryIs() { return "wpp-load-more-v2-22-0"; }
  static get watchers() { return {
    "itemsLoaded": ["updateProgress"],
    "totalItems": ["updateProgress"],
    "incrementBy": ["updateProgress"]
  }; }
};
WppLoadMore.style = wppLoadMoreCss;

exports.wpp_load_more = WppLoadMore;
