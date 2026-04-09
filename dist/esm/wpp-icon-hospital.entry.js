import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconHospital = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-hospital", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.25 5C2.25 3.48122 3.48122 2.25 5 2.25H15C16.5188 2.25 17.75 3.48122 17.75 5V15C17.75 16.5188 16.5188 17.75 15 17.75H5C3.48122 17.75 2.25 16.5188 2.25 15V5ZM5 3.75C4.30964 3.75 3.75 4.30964 3.75 5V15C3.75 15.6904 4.30964 16.25 5 16.25H15C15.6904 16.25 16.25 15.6904 16.25 15V5C16.25 4.30964 15.6904 3.75 15 3.75H5Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.5 5.25C7.91421 5.25 8.25 5.58579 8.25 6V9.25H11.75V6C11.75 5.58579 12.0858 5.25 12.5 5.25C12.9142 5.25 13.25 5.58579 13.25 6V14C13.25 14.4142 12.9142 14.75 12.5 14.75C12.0858 14.75 11.75 14.4142 11.75 14V10.75H8.25V14C8.25 14.4142 7.91421 14.75 7.5 14.75C7.08579 14.75 6.75 14.4142 6.75 14V6C6.75 5.58579 7.08579 5.25 7.5 5.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-hospital-v4-0-0"; }
};
WppIconHospital.style = wppIconCss;

export { WppIconHospital as wpp_icon_hospital };
