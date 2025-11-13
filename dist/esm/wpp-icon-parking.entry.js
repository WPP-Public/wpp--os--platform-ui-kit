import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconParking = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-parking", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.75 5.25C7.33579 5.25 7 5.58579 7 6V14C7 14.4142 7.33579 14.75 7.75 14.75C8.16421 14.75 8.5 14.4142 8.5 14V11.75H10.25C10.7867 11.75 11.575 11.5952 12.2507 11.1087C12.9647 10.5946 13.5 9.74444 13.5 8.5C13.5 7.25556 12.9647 6.4054 12.2507 5.89135C11.575 5.40484 10.7867 5.25 10.25 5.25H7.75ZM10.25 10.25H8.5V6.75H10.25C10.5466 6.75 11.0083 6.84516 11.3743 7.10865C11.702 7.3446 12 7.74444 12 8.5C12 9.25556 11.702 9.6554 11.3743 9.89135C11.0083 10.1548 10.5466 10.25 10.25 10.25Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5 2.25C3.48122 2.25 2.25 3.48122 2.25 5V15C2.25 16.5188 3.48122 17.75 5 17.75H15C16.5188 17.75 17.75 16.5188 17.75 15V5C17.75 3.48122 16.5188 2.25 15 2.25H5ZM3.75 5C3.75 4.30964 4.30964 3.75 5 3.75H15C15.6904 3.75 16.25 4.30964 16.25 5V15C16.25 15.6904 15.6904 16.25 15 16.25H5C4.30964 16.25 3.75 15.6904 3.75 15V5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-parking-v3-3-1"; }
};
WppIconParking.style = wppIconCss;

export { WppIconParking as wpp_icon_parking };
