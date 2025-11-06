import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconVr = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-vr", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M6 11C6.55228 11 7 10.5523 7 10C7 9.44772 6.55228 9 6 9C5.44772 9 5 9.44772 5 10C5 10.5523 5.44772 11 6 11Z", fill: "currentColor" }), h("path", { d: "M14 11C14.5523 11 15 10.5523 15 10C15 9.44772 14.5523 9 14 9C13.4477 9 13 9.44772 13 10C13 10.5523 13.4477 11 14 11Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M1.25 7C1.25 5.48122 2.48122 4.25 4 4.25H16C17.5188 4.25 18.75 5.48122 18.75 7V13C18.75 14.5188 17.5188 15.75 16 15.75H13.8284C13.0991 15.75 12.3996 15.4603 11.8839 14.9445L10.8839 13.9445C10.3957 13.4564 9.60427 13.4564 9.11612 13.9445L8.11612 14.9445C7.60039 15.4603 6.90092 15.75 6.17157 15.75H4C2.48122 15.75 1.25 14.5188 1.25 13V7ZM4 5.75C3.30964 5.75 2.75 6.30964 2.75 7V13C2.75 13.6904 3.30964 14.25 4 14.25H6.17157C6.50309 14.25 6.82104 14.1183 7.05546 13.8839L8.05546 12.8839C9.1294 11.8099 10.8706 11.8099 11.9445 12.8839L12.9445 13.8839C13.179 14.1183 13.4969 14.25 13.8284 14.25H16C16.6904 14.25 17.25 13.6904 17.25 13V7C17.25 6.30964 16.6904 5.75 16 5.75H4Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-vr-v2-22-0"; }
};
WppIconVr.style = wppIconCss;

export { WppIconVr as wpp_icon_vr };
