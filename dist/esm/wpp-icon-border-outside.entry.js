import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBorderOutside = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-border-outside", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4.5C5.17157 4.5 4.5 5.17157 4.5 6V14C4.5 14.8284 5.17157 15.5 6 15.5H14C14.8284 15.5 15.5 14.8284 15.5 14V6C15.5 5.17157 14.8284 4.5 14 4.5H6Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-border-outside-v4-1-0"; }
};
WppIconBorderOutside.style = wppIconCss;

export { WppIconBorderOutside as wpp_icon_border_outside };
