import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableSortDesc = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-table-sort-desc", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 4L13.4641 8.5H6.5359L10 4Z", fill: "#C1C7CD" }), h("path", { d: "M10 16L13.4641 11.5H6.5359L10 16Z", fill: "#343A3F" })));
  }
  static get registryIs() { return "wpp-icon-table-sort-desc-v2-22-0"; }
};
WppIconTableSortDesc.style = wppIconCss;

export { WppIconTableSortDesc as wpp_icon_table_sort_desc };
