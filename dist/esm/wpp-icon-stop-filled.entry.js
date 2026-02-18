import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconStopFilled = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-stop-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 4.36111C3 3.60939 3.60939 3 4.36111 3H15.6389C16.3906 3 17 3.60939 17 4.36111V15.6389C17 16.3906 16.3906 17 15.6389 17H4.36111C3.60939 17 3 16.3906 3 15.6389V4.36111Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-stop-filled-v3-5-0"; }
};
WppIconStopFilled.style = wppIconCss;

export { WppIconStopFilled as wpp_icon_stop_filled };
