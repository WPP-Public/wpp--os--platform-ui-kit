import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPhone = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-phone", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M6.29372 2.65333C5.45122 2.9025 4.79122 3.57584 4.5708 4.41084C4.0158 6.51667 4.64122 9.12542 6.4308 12.1642C8.21788 15.1988 10.2066 17.0338 12.3408 17.6179C13.1933 17.8513 14.1229 17.6254 14.7654 17.0283L15.5154 16.3321C16.127 15.7642 16.2166 14.8308 15.7237 14.1604L14.64 12.6883C14.2166 12.1133 13.4683 11.8658 12.7762 12.0738L11.075 12.5833C10.6312 12.7129 10.2458 12.3771 10.1 12.2508C9.74747 11.9446 9.3608 11.435 8.94955 10.7375C8.06788 9.24042 8.13205 8.67833 8.15288 8.49375C8.17538 8.29625 8.26913 8.11292 8.41788 7.9775L9.68247 6.82167C10.2116 6.33792 10.3675 5.57834 10.0708 4.93167L9.30788 3.26792C8.96122 2.51167 8.08788 2.1225 7.27997 2.36125L6.29372 2.65333Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10" })));
  }
  static get registryIs() { return "wpp-icon-phone-v3-3-0"; }
};
WppIconPhone.style = wppIconCss;

export { WppIconPhone as wpp_icon_phone };
