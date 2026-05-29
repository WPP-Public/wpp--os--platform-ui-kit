import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconHeadphones = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-headphones", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M18 10V15.6C18 16.8781 17.0009 17.9229 15.741 17.9959L15.6 18H13.2C12.7897 18 12.4516 17.6912 12.4054 17.2933L12.4 17.2V12.4C12.4 11.9897 12.7088 11.6516 13.1067 11.6054L13.2 11.6H16.8V10C16.8 6.24446 13.7555 3.2 10 3.2C6.24446 3.2 3.2 6.24446 3.2 10V11.6H6.8C7.24183 11.6 7.6 11.9582 7.6 12.4V17.2C7.6 17.6418 7.24183 18 6.8 18H4.4C3.07452 18 2 16.9255 2 15.6V10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10V15.6V10ZM6.4 12.8H3.2V15.6C3.2 16.2627 3.73726 16.8 4.4 16.8H6.4V12.8ZM16.8 12.8H13.6V16.8H15.6C16.2238 16.8 16.7364 16.3241 16.7945 15.7156L16.8 15.6V12.8Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-headphones-v4-1-0"; }
};
WppIconHeadphones.style = wppIconCss;

export { WppIconHeadphones as wpp_icon_headphones };
