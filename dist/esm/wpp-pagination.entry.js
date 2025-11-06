import { r as registerInstance, c as createEvent, h, H as Host } from './index-9177bb6d.js';

const wppPaginationCss = ":host{--pagination-text-color:var(--wpp-pagination-text-color, var(--wpp-text-color-info));--pagination-options-list-width:var(--wpp-pagination-options-list-width, 100px)}:host(.wpp-pagination-wrapper){display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}:host(.wpp-pagination-wrapper) .control-pagination-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host(.wpp-pagination-wrapper) .wpp-divider{--divider-width:1px;--divider-height:12px;margin:0 16px 0 6px}:host(.wpp-pagination-wrapper) .wpp-typography{color:var(--pagination-text-color)}:host(.wpp-pagination-wrapper) .wpp-text-select{--wpp-input-select-min-width:46px;margin-left:2px}:host(.wpp-pagination-wrapper) .wpp-text-select::part(options-list){width:var(--pagination-options-list-width)}:host(.wpp-pagination-wrapper) .wpp-text-select::part(body){display:-ms-inline-flexbox;display:inline-flex}";

const WppPagination = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
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
        return `${min}-${max} ${this.locales.of} ${totalPages} ${this.locales.items}`;
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
    this.locales = {
      itemsPerPage: 'Items per page',
      of: 'of',
      items: 'items',
    };
  }
  componentWillLoad() {
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "body, per-page-label, pre-page-select, per-page-item, divider, range, page-select" }, h("div", { class: "control-pagination-wrapper", part: "body" }, h("wpp-typography-v2-22-0", { type: "s-body", part: "per-page-label" }, this.locales.itemsPerPage, ":"), h("wpp-select-v2-22-0", { type: "text", onWppChange: this.handleItemsPerPageNumberChange, value: this.selectedItemPerPage, dropdownConfig: { ...this.dropdownConfig, appendTo: 'parent' }, part: "pre-page-select" }, this.itemsPerPage.map(item => (h("wpp-list-item-v2-22-0", { value: item, part: "per-page-item" }, h("span", { slot: "label" }, item))))), h("wpp-divider-v2-22-0", { part: "divider" }), h("wpp-typography-v2-22-0", { type: "s-body", part: "range" }, this.getPageRange())), countPagesToDisplay && (h("wpp-pagination-select-v2-22-0", { count: countPagesToDisplay, pageSelectThreshold: this.pageSelectThreshold, onWppChange: this.handleSelectedPageChange, activePageNumber: this.activePageNumber, part: "page-select" }))));
  }
  static get registryIs() { return "wpp-pagination-v2-22-0"; }
};
WppPagination.style = wppPaginationCss;

export { WppPagination as wpp_pagination };
