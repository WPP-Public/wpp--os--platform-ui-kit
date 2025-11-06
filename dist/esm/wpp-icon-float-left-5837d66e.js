import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFloatLeft = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-float-left", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.5 5.833h5v5H2.5V5.833m0-3.333h15v1.667H2.5V2.5m15 3.333v1.667H9.167V5.833h8.333m0 3.333v1.667H9.167v-1.667h8.333M2.5 12.5h11.667v1.667H2.5v-1.667m0 3.333h15v1.667H2.5v-1.667z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-float-left-v2-22-0"; }
};
WppIconFloatLeft.style = wppIconCss;

export { WppIconFloatLeft as W };
