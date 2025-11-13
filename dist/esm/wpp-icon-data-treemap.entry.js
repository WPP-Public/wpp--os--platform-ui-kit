import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDataTreemap = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-treemap", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 5.52778C3 4.13172 4.13172 3 5.52778 3H14.4722C15.8683 3 17 4.13172 17 5.52778V14.4722C17 15.8683 15.8683 17 14.4722 17H5.52778C4.13172 17 3 15.8683 3 14.4722V5.52778ZM5.52778 4.16667C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778V14.4722C4.16667 15.2239 4.77606 15.8333 5.52778 15.8333H7.66667V4.16667H5.52778ZM8.83333 4.16667V11.5556H15.8333V5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667H8.83333ZM15.8333 12.7222H8.83333V15.8333H14.4722C15.2239 15.8333 15.8333 15.2239 15.8333 14.4722V12.7222Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-data-treemap-v3-3-1"; }
};
WppIconDataTreemap.style = wppIconCss;

export { WppIconDataTreemap as wpp_icon_data_treemap };
