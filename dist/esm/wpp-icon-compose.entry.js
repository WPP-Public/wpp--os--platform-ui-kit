import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCompose = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-compose", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M17.7805 3.28016C18.0733 2.98718 18.0732 2.5123 17.7802 2.2195C17.4872 1.9267 17.0124 1.92685 16.7196 2.21984L9.21956 9.72459L9 11L10.2806 10.7849L17.7805 3.28016ZM5.75 3C4.23122 3 3 4.23122 3 5.75V14.25C3 15.7688 4.23122 17 5.75 17H14.25C15.7688 17 17 15.7688 17 14.25V8.74755C17 8.33333 16.6642 7.99755 16.25 7.99755C15.8358 7.99755 15.5 8.33333 15.5 8.74755V14.25C15.5 14.9404 14.9404 15.5 14.25 15.5H5.75C5.05964 15.5 4.5 14.9404 4.5 14.25V5.75C4.5 5.05964 5.05964 4.5 5.75 4.5H11.2408C11.655 4.5 11.9908 4.16421 11.9908 3.75C11.9908 3.33579 11.655 3 11.2408 3H5.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-compose-v3-6-0"; }
};
WppIconCompose.style = wppIconCss;

export { WppIconCompose as wpp_icon_compose };
