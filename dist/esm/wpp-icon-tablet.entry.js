import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTablet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-tablet", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.5 12.25C8.08579 12.25 7.75 12.5858 7.75 13C7.75 13.4142 8.08579 13.75 8.5 13.75H11.5C11.9142 13.75 12.25 13.4142 12.25 13C12.25 12.5858 11.9142 12.25 11.5 12.25H8.5Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4 3.75C2.48122 3.75 1.25 4.98122 1.25 6.5V13.5C1.25 15.0188 2.48122 16.25 4 16.25H16C17.5188 16.25 18.75 15.0188 18.75 13.5V6.5C18.75 4.98122 17.5188 3.75 16 3.75H4ZM2.75 6.5C2.75 5.80964 3.30964 5.25 4 5.25H16C16.6904 5.25 17.25 5.80964 17.25 6.5V13.5C17.25 14.1904 16.6904 14.75 16 14.75H4C3.30964 14.75 2.75 14.1904 2.75 13.5V6.5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-tablet-v3-3-1"; }
};
WppIconTablet.style = wppIconCss;

export { WppIconTablet as wpp_icon_tablet };
