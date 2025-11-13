import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconVideoBlocked = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-video-blocked", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M11.5119 4C12.9649 4 14.1429 5.17792 14.1429 6.63095V6.771L17.2708 4.89452C17.6755 4.65156 18.1905 4.94304 18.1905 5.41505V10.322C17.8308 9.9769 17.4223 9.68237 16.9762 9.44988V6.48775L14.1429 8.18888V8.87248C13.7223 8.90447 13.3157 8.98588 12.9286 9.11093V6.63095C12.9286 5.84855 12.2943 5.21429 11.5119 5.21429H4.63095C3.84855 5.21429 3.21429 5.84855 3.21429 6.63095V13.5119C3.21429 14.2943 3.84855 14.9286 4.63095 14.9286H9.3476C9.413 15.3521 9.52891 15.759 9.68899 16.1429H4.63095C3.17792 16.1429 2 14.9649 2 13.5119V6.63095C2 5.17792 3.17792 4 4.63095 4H11.5119ZM19 14.119C19 16.578 17.0066 18.5714 14.5476 18.5714C12.0886 18.5714 10.0952 16.578 10.0952 14.119C10.0952 11.6601 12.0886 9.66667 14.5476 9.66667C17.0066 9.66667 19 11.6601 19 14.119ZM11.3095 14.119C11.3095 14.7938 11.5159 15.4204 11.869 15.939L16.3676 11.4404C15.8489 11.0873 15.2224 10.881 14.5476 10.881C12.7593 10.881 11.3095 12.3307 11.3095 14.119ZM14.5476 17.3571C16.336 17.3571 17.7857 15.9074 17.7857 14.119C17.7857 13.4443 17.5793 12.8177 17.2262 12.2991L12.7276 16.7977C13.2463 17.1508 13.8729 17.3571 14.5476 17.3571Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-video-blocked-v3-3-1"; }
};
WppIconVideoBlocked.style = wppIconCss;

export { WppIconVideoBlocked as wpp_icon_video_blocked };
