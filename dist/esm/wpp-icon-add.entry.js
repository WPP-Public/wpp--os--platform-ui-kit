import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAdd = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-cross", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M11 4C11 3.44772 10.5523 3 10 3C9.44772 3 9 3.44772 9 4V9H4C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H9V16C9 16.5523 9.44772 17 10 17C10.5523 17 11 16.5523 11 16V11H16C16.5523 11 17 10.5523 17 10C17 9.44772 16.5523 9 16 9H11V4Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-add-v2-22-0"; }
};
WppIconAdd.style = wppIconCss;

export { WppIconAdd as wpp_icon_add };
