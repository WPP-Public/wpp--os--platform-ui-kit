'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconVideoOff = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-video-off", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M3.02426 2.17574C2.78995 1.94142 2.41005 1.94142 2.17574 2.17573C1.94142 2.41004 1.94142 2.78994 2.17573 3.02425L3.42929 4.27783C2.5814 4.70613 2 5.58515 2 6.59997V13.3999C2 14.8358 3.16405 15.9999 4.59998 15.9999H11.3999C12.4147 15.9999 13.2937 15.4186 13.722 14.5707L16.9754 17.8243C17.2098 18.0586 17.5896 18.0586 17.824 17.8243C18.0583 17.59 18.0583 17.2101 17.824 16.9757L3.02426 2.17574ZM12.7811 13.6299C12.6714 14.2937 12.0948 14.7999 11.3999 14.7999H4.59998C3.82679 14.7999 3.19999 14.1731 3.19999 13.3999V6.59997C3.19999 5.90504 3.70632 5.32837 4.37018 5.21875L12.7811 13.6299ZM12.7999 10.2545V6.59997C12.7999 5.82677 12.1731 5.19998 11.3999 5.19998H7.74548L6.54552 3.99999H11.3999C12.8359 3.99999 13.9999 5.16404 13.9999 6.59997V6.73837L17.091 4.88398C17.4909 4.64387 17.9999 4.93193 17.9999 5.39838V14.5999C17.9999 14.841 17.8639 15.0345 17.6773 15.1319L16.7999 14.2546V6.45845L13.9999 8.13955V11.4545L12.7999 10.2545Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-video-off-v3-3-1"; }
};
WppIconVideoOff.style = wppIconCss;

exports.wpp_icon_video_off = WppIconVideoOff;
