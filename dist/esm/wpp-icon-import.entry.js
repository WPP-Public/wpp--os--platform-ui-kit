import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconImport = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-import", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.5303 14.5303C10.2374 14.8232 9.76256 14.8232 9.46967 14.5303L6.46967 11.5303C6.17678 11.2374 6.17678 10.7626 6.46967 10.4697C6.76256 10.1768 7.23744 10.1768 7.53033 10.4697L9.25 12.1893L9.25 3C9.25 2.58579 9.58579 2.25 10 2.25C10.4142 2.25 10.75 2.58579 10.75 3L10.75 12.1893L12.4697 10.4697C12.7626 10.1768 13.2374 10.1768 13.5303 10.4697C13.8232 10.7626 13.8232 11.2374 13.5303 11.5303L10.5303 14.5303Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.5 13.75C3.91421 13.75 4.25 14.0858 4.25 14.5V15.5C4.25 15.9142 4.58579 16.25 5 16.25H15C15.4142 16.25 15.75 15.9142 15.75 15.5V14.5C15.75 14.0858 16.0858 13.75 16.5 13.75C16.9142 13.75 17.25 14.0858 17.25 14.5V15.5C17.25 16.7426 16.2426 17.75 15 17.75H5C3.75736 17.75 2.75 16.7426 2.75 15.5V14.5C2.75 14.0858 3.08579 13.75 3.5 13.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-import-v2-22-0"; }
};
WppIconImport.style = wppIconCss;

export { WppIconImport as wpp_icon_import };
