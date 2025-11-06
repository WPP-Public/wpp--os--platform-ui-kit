import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTextAlignmentCenter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-text-alignment-center", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4 4.25C4 3.83579 4.33579 3.5 4.75 3.5H15.25C15.6642 3.5 16 3.83579 16 4.25C16 4.66421 15.6642 5 15.25 5H4.75C4.33579 5 4 4.66421 4 4.25ZM2 9.25C2 8.83579 2.33579 8.5 2.75 8.5H17.25C17.6642 8.5 18 8.83579 18 9.25C18 9.66421 17.6642 10 17.25 10H2.75C2.33579 10 2 9.66421 2 9.25ZM6.75 13.5C6.33579 13.5 6 13.8358 6 14.25C6 14.6642 6.33579 15 6.75 15H13.25C13.6642 15 14 14.6642 14 14.25C14 13.8358 13.6642 13.5 13.25 13.5H6.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-text-alignment-center-v2-22-0"; }
};
WppIconTextAlignmentCenter.style = wppIconCss;

export { WppIconTextAlignmentCenter as W };
