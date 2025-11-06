import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTriangle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-triangle", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.21689 3.03447C8.97743 1.65495 10.9602 1.65524 11.7203 3.03497L18.3313 15.0347C19.0657 16.3678 18.1014 18 16.5795 18H3.35295C1.83077 18 0.866478 16.3673 1.60138 15.0342L8.21689 3.03447ZM10.6422 3.62891C10.3499 3.09824 9.5873 3.09813 9.29478 3.62871L2.67927 15.6285C2.39661 16.1412 2.7675 16.7692 3.35295 16.7692H16.5795C17.1649 16.7692 17.5357 16.1414 17.2533 15.6287L10.6422 3.62891Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-triangle-v2-22-0"; }
};
WppIconTriangle.style = wppIconCss;

export { WppIconTriangle as wpp_icon_triangle };
