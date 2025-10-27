import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDownload = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-download", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.46967 14.5303C9.76256 14.8232 10.2374 14.8232 10.5303 14.5303L13.5303 11.5303C13.8232 11.2374 13.8232 10.7626 13.5303 10.4697C13.2374 10.1768 12.7626 10.1768 12.4697 10.4697L10.75 12.1893L10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3L9.25 12.1893L7.53033 10.4697C7.23744 10.1768 6.76256 10.1768 6.46967 10.4697C6.17678 10.7626 6.17678 11.2374 6.46967 11.5303L9.46967 14.5303Z", fill: "currentColor" }), h("path", { d: "M3.5 16.25C3.08579 16.25 2.75 16.5858 2.75 17C2.75 17.4142 3.08579 17.75 3.5 17.75L16.5 17.75C16.9142 17.75 17.25 17.4142 17.25 17C17.25 16.5858 16.9142 16.25 16.5 16.25L3.5 16.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-download-v3-3-0"; }
};
WppIconDownload.style = wppIconCss;

export { WppIconDownload as wpp_icon_download };
