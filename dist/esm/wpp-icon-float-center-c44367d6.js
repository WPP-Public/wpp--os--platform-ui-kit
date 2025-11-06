import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFloatCenter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-float-center", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.5 5.833h5v5H7.5V5.833M2.5 2.5h15v1.667H2.5V2.5m0 10h15v1.667H2.5v-1.667m0 3.333h11.667v1.667H2.5v-1.667z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-float-center-v2-22-0"; }
};
WppIconFloatCenter.style = wppIconCss;

export { WppIconFloatCenter as W };
