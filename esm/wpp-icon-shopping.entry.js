import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconShopping = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-shopping", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6 6.25C6 4.04086 7.79086 2.25 10 2.25C12.2091 2.25 14 4.04086 14 6.25H17.5C17.7183 6.25 17.9258 6.34514 18.0683 6.51058C18.2108 6.67602 18.2741 6.89534 18.2417 7.11126L16.8056 16.6854C16.7138 17.2973 16.1882 17.75 15.5694 17.75H4.4306C3.81185 17.75 3.28621 17.2973 3.19443 16.6854L1.7583 7.11126C1.72592 6.89534 1.78922 6.67602 1.9317 6.51058C2.07418 6.34514 2.28167 6.25 2.50001 6.25H6ZM7.5 6.25C7.5 4.86929 8.61929 3.75 10 3.75C11.3807 3.75 12.5 4.86929 12.5 6.25H7.5ZM6 7.75V9.5C6 9.91421 6.33579 10.25 6.75 10.25C7.16421 10.25 7.5 9.91421 7.5 9.5V7.75H12.5V9.5C12.5 9.91421 12.8358 10.25 13.25 10.25C13.6642 10.25 14 9.91421 14 9.5V7.75H16.6291L15.3541 16.25H4.6459L3.3709 7.75H6Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-shopping-v3-3-0"; }
};
WppIconShopping.style = wppIconCss;

export { WppIconShopping as wpp_icon_shopping };
