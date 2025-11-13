import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDataTransfer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-transfer", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.4887 2.17817C14.1958 1.88527 13.7209 1.88527 13.428 2.17817C13.1352 2.47106 13.1352 2.94593 13.428 3.23883L15.4807 5.2915H2.70837C2.29416 5.2915 1.95837 5.62729 1.95837 6.0415C1.95837 6.45572 2.29416 6.7915 2.70837 6.7915H15.4814L13.428 8.84483C13.1352 9.13773 13.1352 9.6126 13.428 9.90549C13.7209 10.1984 14.1958 10.1984 14.4887 9.90549L17.822 6.57216C18.1149 6.27927 18.1149 5.80439 17.822 5.5115L14.4887 2.17817ZM6.57204 11.1553L4.51887 13.2085H17.2917C17.7059 13.2085 18.0417 13.5443 18.0417 13.9585C18.0417 14.3727 17.7059 14.7085 17.2917 14.7085H4.5192L6.57204 16.7613C6.86493 17.0542 6.86493 17.5291 6.57204 17.822C6.27914 18.1149 5.80427 18.1149 5.51138 17.822L2.17804 14.4887C1.88515 14.1958 1.88515 13.7209 2.17804 13.428L5.51138 10.0947C5.80427 9.80178 6.27914 9.80178 6.57204 10.0947C6.86493 10.3876 6.86493 10.8624 6.57204 11.1553Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-data-transfer-v3-3-1"; }
};
WppIconDataTransfer.style = wppIconCss;

export { WppIconDataTransfer as wpp_icon_data_transfer };
