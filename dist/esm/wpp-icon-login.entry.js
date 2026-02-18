import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLogin = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-login", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15.7358 16.4851C16.15 16.4851 16.4858 16.1493 16.4858 15.7351V4.26488C16.4858 3.85067 16.15 3.51488 15.7358 3.51488H8.71796C8.30375 3.51488 7.96796 3.85067 7.96796 4.26488V6.10417C7.96796 6.51838 7.63217 6.85417 7.21796 6.85417C6.80375 6.85417 6.46796 6.51838 6.46796 6.10417V4.26488C6.46796 3.02224 7.47532 2.01488 8.71796 2.01488H15.7358C16.9785 2.01488 17.9858 3.02224 17.9858 4.26488V15.7351C17.9858 16.9778 16.9785 17.9851 15.7358 17.9851H8.71796C7.47532 17.9851 6.46796 16.9778 6.46796 15.7351V13.8958C6.46796 13.4816 6.80375 13.1458 7.21796 13.1458C7.63217 13.1458 7.96796 13.4816 7.96796 13.8958V15.7351C7.96796 16.1493 8.30375 16.4851 8.71796 16.4851H15.7358Z", fill: "currentColor" }), h("path", { d: "M9.85973 10.75L8.91387 11.6959C8.62097 11.9888 8.62097 12.4636 8.91387 12.7565C9.20676 13.0494 9.68163 13.0494 9.97453 12.7565L12.2007 10.5303C12.3414 10.3897 12.4204 10.1989 12.4204 10C12.4204 9.80109 12.3414 9.61033 12.2007 9.46968L9.97453 7.24349C9.68163 6.95059 9.20676 6.95059 8.91387 7.24349C8.62097 7.53638 8.62097 8.01125 8.91387 8.30415L9.85972 9.25H2.76562C2.35141 9.25 2.01562 9.58579 2.01562 10C2.01562 10.4142 2.35141 10.75 2.76562 10.75H9.85973Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-login-v3-5-0"; }
};
WppIconLogin.style = wppIconCss;

export { WppIconLogin as wpp_icon_login };
