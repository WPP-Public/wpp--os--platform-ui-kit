import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDataHistogram = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-histogram", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.08333 4.3584C7.08333 3.32286 7.9228 2.4834 8.95833 2.4834H11.0417C12.0772 2.4834 12.9167 3.32286 12.9167 4.3584V5.8334H15.625C16.6605 5.8334 17.5 6.67286 17.5 7.7084V16.8751C17.5 17.2202 17.2202 17.5001 16.875 17.5001H3.125C2.77982 17.5001 2.5 17.2202 2.5 16.8751V10.2084C2.5 9.17286 3.33947 8.3334 4.375 8.3334H7.08333V4.3584ZM8.33333 16.2501H11.6667V4.3584C11.6667 4.01322 11.3868 3.7334 11.0417 3.7334H8.95833C8.61315 3.7334 8.33333 4.01322 8.33333 4.3584V16.2501ZM7.08333 9.5834H4.375C4.02982 9.5834 3.75 9.86322 3.75 10.2084V16.2501H7.08333V9.5834ZM12.9167 16.2501H16.25V7.7084C16.25 7.36322 15.9702 7.0834 15.625 7.0834H12.9167V16.2501Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-data-histogram-v3-3-0"; }
};
WppIconDataHistogram.style = wppIconCss;

export { WppIconDataHistogram as wpp_icon_data_histogram };
