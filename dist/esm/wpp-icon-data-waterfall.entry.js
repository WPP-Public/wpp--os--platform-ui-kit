import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDataWaterfall = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-waterfall", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M1 2.675C1 2.30221 1.30221 2 1.675 2H7.525C8.64338 2 9.55 2.90662 9.55 4.025V9.2H15.175C16.2934 9.2 17.2 10.1066 17.2 11.225V16.85H18.325C18.6978 16.85 19 17.1522 19 17.525C19 17.8978 18.6978 18.2 18.325 18.2H12.475C11.3566 18.2 10.45 17.2934 10.45 16.175V10.55H4.825C3.70662 10.55 2.8 9.64338 2.8 8.525V3.35H1.675C1.30221 3.35 1 3.04779 1 2.675ZM15.85 16.85V11.225C15.85 10.8522 15.5478 10.55 15.175 10.55H11.8V16.175C11.8 16.5478 12.1022 16.85 12.475 16.85H15.85ZM8.2 4.025C8.2 3.65221 7.89779 3.35 7.525 3.35H4.15V8.525C4.15 8.89779 4.45221 9.2 4.825 9.2H8.2V4.025Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-data-waterfall-v4-1-0"; }
};
WppIconDataWaterfall.style = wppIconCss;

export { WppIconDataWaterfall as wpp_icon_data_waterfall };
