import { r as registerInstance, c as createEvent, h, H as Host } from './index-9177bb6d.js';

const LOCALES_DEFAULTS = {
  itemsPerPage: 'Items per page',
  of: 'of',
  items: 'items',
};

const wppPaginationCss = ":host{--pagination-text-color:var(--wpp-pagination-text-color, var(--wpp-text-color-info));--pagination-options-list-width:var(--wpp-pagination-options-list-width, 100px)}:host(.wpp-pagination-wrapper){display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}:host(.wpp-pagination-wrapper) .control-pagination-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host(.wpp-pagination-wrapper) .wpp-divider{--divider-width:1px;--divider-height:12px;margin:0 16px 0 6px}:host(.wpp-pagination-wrapper) .wpp-typography{color:var(--pagination-text-color)}:host(.wpp-pagination-wrapper) .wpp-text-select{--wpp-input-select-min-width:46px;margin-left:2px}:host(.wpp-pagination-wrapper) .wpp-text-select::part(options-list){width:var(--pagination-options-list-width)}:host(.wpp-pagination-wrapper) .wpp-text-select::part(body){display:-ms-inline-flexbox;display:inline-flex}";

const WppPagination = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  render() {
    const countPagesToDisplay = Math.ceil(this.count / this.selectedItemPerPage);
    if (this.count === 0) {
      return null;
    }
    return (h(Host, { class: this.hostCssClasses(), exportparts: "body, per-page-label, pre-page-select, per-page-item, divider, range, page-select" }, h("div", { class: "control-pagination-wrapper", part: "body" }, h("wpp-typography-v3-5-0", { type: "s-body", part: "per-page-label" }, this._locales.itemsPerPage, ":"), h("wpp-select-v3-5-0", { type: "single", isTextSelect: true, onWppChange: this.handleItemsPerPageNumberChange, value: this.selectedItemPerPage, dropdownConfig: { ...this.dropdownConfig }, dropdownWidth: "100px", part: "pre-page-select", list: this.itemsPerPage.map(item => ({
        value: item,
        label: `${item}`,
        part: 'per-page-item',
      })) }), h("wpp-divider-v3-5-0", { part: "divider" }), h("wpp-typography-v3-5-0", { type: "s-body", part: "range" }, this.getPageRange())), countPagesToDisplay && (h("wpp-pagination-select-v3-5-0", { count: countPagesToDisplay, pageSelectThreshold: this.pageSelectThreshold, onWppChange: this.handleSelectedPageChange, activePageNumber: this.activePageNumber, part: "page-select" }))));
  }
  static get registryIs() { return "wpp-pagination-v3-5-0"; }
  static get watchers() { return {
    "locales": ["onUpdateLocales"]
  }; }
};
WppPagination.style = wppPaginationCss;

export { WppPagination as wpp_pagination };
