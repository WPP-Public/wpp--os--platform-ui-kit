import { r as registerInstance, c as createEvent, h, H as Host } from './index-9177bb6d.js';

const PROGRESS_WIDTH = 200;
const TOTAL_ITEMS = 100;
const ITEMS_LOADED = 0;
const INCREASE_BY = 10;

const wppLoadMoreCss = ":host{--load-more-progress-text-color:var(--wpp-load-more-progress-text-color, var(--wpp-grey-color-700));--load-more-progress-text-color-disabled:var(--wpp-load-more-progress-text-color-disabled, var(--wpp-text-color-disabled));--load-more-progress-bar-color-disabled:var(--wpp-load-more-progress-bar-color-disabled, var(--wpp-brand-color-disabled));--load-more-button-width:var(--wpp-load-more-button-width, 200px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;gap:16px;width:var(--load-more-button-width)}.progress-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;gap:8px}.progress-container.disabled{cursor:not-allowed}.progress-container.disabled .progress-indicator::part(body){--pi-linear-bg-color:var(--load-more-progress-bar-color-disabled)}.progress-text{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);color:var(--load-more-progress-text-color)}.progress-text.disabled{color:var(--load-more-progress-text-color-disabled)}.load-more-button::part(button){width:var(--load-more-button-width)}";

const WppLoadMore = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, { class: this.hostCssClasses(), onKeyDown: this.onKeyDown, exportparts: "container, progress-text, button" }, this.showProgressBar && (h("div", { class: this.progressContainerCssClasses(), part: "container" }, h("span", { id: "wpp-progress-indicator-label", class: this.progressTextCssClasses(), part: "progress-text" }, Math.max(0, Math.min(this.itemsLoaded, this.totalItems)), " of ", Math.max(0, this.totalItems), " items"), h("wpp-progress-indicator-v3-4-0", { class: "progress-indicator", value: this.progressPercentage, width: PROGRESS_WIDTH, ariaProps: { labelledby: 'wpp-progress-indicator-label' } }))), h("wpp-button-v3-4-0", { ref: refEl => (this.loadBtnRef = refEl), class: "load-more-button", variant: "secondary", loading: this.loading && !this.isDisabled(), part: "button", disabled: this.isDisabled(), size: "s", onClick: this.handleClick, ariaProps: this.ariaProps }, "Load more")));
  }
  static get registryIs() { return "wpp-load-more-v3-4-0"; }
  static get watchers() { return {
    "itemsLoaded": ["updateProgress"],
    "totalItems": ["updateProgress"],
    "incrementBy": ["updateProgress"]
  }; }
};
WppLoadMore.style = wppLoadMoreCss;

export { WppLoadMore as wpp_load_more };
