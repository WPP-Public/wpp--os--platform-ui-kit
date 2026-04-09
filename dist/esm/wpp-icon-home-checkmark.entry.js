import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconHomeCheckmark = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-home-checkmark", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.79835 2.40911C9.44284 1.86422 10.3863 1.86356 11.0316 2.40754L16.2324 6.79208C16.6226 7.12097 16.8477 7.60524 16.8477 8.1155V15.6537C16.8477 16.3972 16.2449 17 15.5014 17H4.34631C3.60276 17 3 16.3972 3 15.6537V8.11452C3 7.6051 3.22439 7.12155 3.61341 6.79266L8.79835 2.40911ZM10.2878 3.28982C10.0727 3.1085 9.75821 3.10872 9.54338 3.29034L4.35845 7.6739C4.22877 7.78353 4.15398 7.94471 4.15398 8.11452V15.6537C4.15398 15.7599 4.24008 15.846 4.34631 15.846H15.5014C15.6076 15.846 15.6937 15.7599 15.6937 15.6537V8.1155C15.6937 7.94541 15.6187 7.78399 15.4886 7.67436L10.2878 3.28982ZM12.8347 8.70392C13.06 8.92924 13.06 9.29457 12.8347 9.5199L9.37021 12.9845C9.262 13.0927 9.11524 13.1535 8.96221 13.1535C8.80919 13.1535 8.66243 13.0927 8.55422 12.9845L7.01558 11.4459C6.79026 11.2205 6.79026 10.8552 7.01558 10.6299C7.24091 10.4045 7.60624 10.4045 7.83157 10.6299L8.96221 11.7605L12.0187 8.70392C12.2441 8.47859 12.6094 8.47859 12.8347 8.70392Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-home-checkmark-v3-6-0"; }
};
WppIconHomeCheckmark.style = wppIconCss;

export { WppIconHomeCheckmark as wpp_icon_home_checkmark };
