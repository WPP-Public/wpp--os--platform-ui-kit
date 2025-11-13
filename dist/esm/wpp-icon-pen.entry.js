import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPen = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-pen", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M6.39995 1.6C6.39995 1.26863 6.13132 1 5.79995 1C5.46858 1 5.19995 1.26863 5.19995 1.6V4C5.19995 4.71718 5.73922 5.30841 6.43439 5.39031L5.6218 7.39434C5.2955 8.19907 5.33091 9.14024 5.71639 9.90843L8.90828 16.2693C9.1354 16.7219 9.55085 17 9.99995 17C10.4491 17 10.8645 16.7219 11.0916 16.2693L14.2835 9.90843C14.669 9.14024 14.7044 8.19907 14.3781 7.39434L13.5655 5.39031C14.2607 5.30841 14.8 4.71718 14.8 4V1.6C14.8 1.26863 14.5313 1 14.2 1C13.8686 1 13.6 1.26863 13.6 1.6V4C13.6 4.11046 13.5104 4.2 13.4 4.2H6.59995C6.48949 4.2 6.39995 4.11046 6.39995 4V1.6ZM12.2745 5.4L13.266 7.84525C13.4641 8.33376 13.4397 8.91434 13.211 9.37023L10.6 14.5736V9.23946C10.9586 9.03198 11.2 8.64417 11.2 8.2C11.2 7.53726 10.6627 7 9.99995 7C9.33721 7 8.79995 7.53726 8.79995 8.2C8.79995 8.64417 9.04127 9.03198 9.39995 9.23946V14.5736L6.78893 9.37023C6.56016 8.91434 6.53578 8.33376 6.73386 7.84525L7.72536 5.4H12.2745Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pen-v3-3-1"; }
};
WppIconPen.style = wppIconCss;

export { WppIconPen as wpp_icon_pen };
