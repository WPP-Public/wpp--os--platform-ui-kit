import { r as registerInstance, h } from './index-93f63aaa.js';
import { W as WppIcon } from './WppIcon-a0bcacb1.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSidebar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-sidebar", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15.2559 2.5127C16.5164 2.64082 17.5 3.70566 17.5 5V15L17.4873 15.2559C17.3677 16.4323 16.4323 17.3677 15.2559 17.4873L15 17.5H5L4.74414 17.4873C3.56772 17.3677 2.63227 16.4323 2.5127 15.2559L2.5 15V5C2.5 3.61929 3.61929 2.5 5 2.5H15L15.2559 2.5127ZM5 3.91699C4.40169 3.91699 3.91699 4.40169 3.91699 5V15C3.91699 15.5983 4.40169 16.083 5 16.083H6.75V3.91699H5ZM8.25 16.083H15C15.5983 16.083 16.083 15.5983 16.083 15V5C16.083 4.40169 15.5983 3.91699 15 3.91699H8.25V16.083Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-sidebar-v4-3-0"; }
};
WppIconSidebar.style = wppIconCss;

export { WppIconSidebar as wpp_icon_sidebar };
