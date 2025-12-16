import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableSortAscPressed = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-grey-color-600)';
    this.upArrowColor = 'var(--wpp-grey-color-900)';
    this.downArrowColor = 'var(--wpp-grey-color-600)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-table-sort-asc-pressed", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 4L13.4641 8.5H6.5359L10 4Z", fill: this.upArrowColor }), h("path", { d: "M10 16L13.4641 11.5H6.5359L10 16Z", fill: this.downArrowColor })));
  }
  static get registryIs() { return "wpp-icon-table-sort-asc-pressed-v3-4-0"; }
};
WppIconTableSortAscPressed.style = wppIconCss;

export { WppIconTableSortAscPressed as wpp_icon_table_sort_asc_pressed };
