import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconShieldDismiss = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-shield-dismiss", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10.36 2.12C12.3937 3.64522 14.4693 4.4 16.6 4.4C16.9314 4.4 17.2 4.66863 17.2 5V9.2C17.2 13.201 14.834 16.1406 10.22 17.9582C10.0786 18.0139 9.92146 18.0139 9.78013 17.9582C5.1661 16.1406 2.80005 13.201 2.80005 9.2V5C2.80005 4.66863 3.06868 4.4 3.40005 4.4C5.53078 4.4 7.60642 3.64522 9.64005 2.12C9.85338 1.96 10.1467 1.96 10.36 2.12ZM10 3.34225C8.06472 4.71063 6.06193 5.46068 4.00005 5.58234V9.2C4.00005 12.6045 5.96274 15.1031 10 16.7535C14.0374 15.1031 16 12.6045 16 9.2V5.58234C13.9382 5.46068 11.9354 4.71063 10 3.34225ZM7.82478 6.97727L10.0032 9.156L12.183 6.97727C12.3958 6.76452 12.7287 6.74518 12.9633 6.91924L13.0305 6.97727C13.2432 7.19001 13.2626 7.52292 13.0885 7.75752L13.0305 7.82473L10.8512 10.0032L13.0305 12.183C13.2645 12.417 13.2645 12.7964 13.0305 13.0304C12.7965 13.2645 12.417 13.2645 12.183 13.0304L10.0032 10.8512L7.82478 13.0304C7.61203 13.2432 7.27912 13.2625 7.04452 13.0885L6.97731 13.0304C6.76457 12.8177 6.74523 12.4848 6.91929 12.2502L6.97731 12.183L9.15605 10.0032L6.97731 7.82473C6.74329 7.59071 6.74329 7.21129 6.97731 6.97727C7.21133 6.74325 7.59076 6.74325 7.82478 6.97727Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-shield-dismiss-v4-1-0"; }
};
WppIconShieldDismiss.style = wppIconCss;

export { WppIconShieldDismiss as wpp_icon_shield_dismiss };
