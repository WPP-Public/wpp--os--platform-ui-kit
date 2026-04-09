import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFont = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-font", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.99801 2C6.30891 2.00001 6.58757 2.19184 6.69856 2.48226L8.96808 8.42079C8.98759 8.46066 9.00366 8.50252 9.01592 8.54598L9.05372 8.64489L8.26077 10.7719L7.77471 9.5H4.22062L3.44808 11.521C3.30018 11.9079 2.86663 12.1016 2.47972 11.9537C2.09281 11.8058 1.89906 11.3723 2.04696 10.9854L5.29742 2.4822C5.40843 2.19179 5.6871 1.99999 5.99801 2ZM4.79402 8H7.20146L5.99789 4.85069L4.79402 8ZM12.7027 5.48972C12.5933 5.19626 12.3131 5.00166 12 5.00165C11.6868 5.00163 11.4066 5.19621 11.2972 5.48966L7.19241 16.5L6.7546 16.5C6.34038 16.5 6.00459 16.8358 6.00458 17.25C6.00457 17.6642 6.34035 18 6.75456 18L9.25456 18C9.66877 18.0001 10.0046 17.6643 10.0046 17.2501C10.0046 16.8358 9.66881 16.5001 9.2546 16.5L8.79325 16.5L9.54015 14.4966H14.4589L15.2056 16.5H14.75C14.3358 16.5 14 16.8358 14 17.25C14 17.6642 14.3358 18 14.75 18L17.2497 18C17.6639 18 17.9997 17.6642 17.9997 17.25C17.9997 16.8358 17.6639 16.5 17.2497 16.5H16.8064L12.7027 5.48972ZM13.8998 12.9966H10.0994L11.9998 7.8989L13.8998 12.9966Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-font-v3-6-0"; }
};
WppIconFont.style = wppIconCss;

export { WppIconFont as wpp_icon_font };
