'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f5af6a9.js');
const WppIcon = require('./WppIcon-86481908.js');

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconMicOn = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-mic-on", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M15 9.2C15.3038 9.2 15.5548 9.42572 15.5945 9.71858L15.6 9.8V10.2C15.6 13.0475 13.396 15.3803 10.6008 15.5854L10.6 17.4C10.6 17.7314 10.3314 18 10 18C9.69627 18 9.44523 17.7743 9.4055 17.4814L9.40002 17.4L9.40004 15.5854C6.66661 15.3853 4.49829 13.1504 4.40327 10.3891L4.40002 10.2V9.8C4.40002 9.46863 4.66865 9.2 5.00002 9.2C5.30378 9.2 5.55482 9.42572 5.59455 9.71858L5.60002 9.8V10.2C5.60002 12.4616 7.38758 14.3057 9.6269 14.3965L9.80002 14.4H10.2C12.4616 14.4 14.3057 12.6124 14.3965 10.3731L14.4 10.2V9.8C14.4 9.46863 14.6687 9.2 15 9.2ZM10 2C11.7673 2 13.2 3.43269 13.2 5.2V10C13.2 11.7673 11.7673 13.2 10 13.2C8.23271 13.2 6.80002 11.7673 6.80002 10V5.2C6.80002 3.43269 8.23271 2 10 2ZM10 3.2C8.89545 3.2 8.00002 4.09543 8.00002 5.2V10C8.00002 11.1046 8.89545 12 10 12C11.1046 12 12 11.1046 12 10V5.2C12 4.09543 11.1046 3.2 10 3.2Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-mic-on-v4-3-0"; }
};
WppIconMicOn.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconStop = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-stop", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M10 3.2C6.24446 3.2 3.2 6.24446 3.2 10C3.2 13.7555 6.24446 16.8 10 16.8C13.7555 16.8 16.8 13.7555 16.8 10C16.8 6.24446 13.7555 3.2 10 3.2ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM6.8 8C6.8 7.33726 7.33726 6.8 8 6.8H12C12.6627 6.8 13.2 7.33726 13.2 8V12C13.2 12.6627 12.6627 13.2 12 13.2H8C7.33726 13.2 6.8 12.6627 6.8 12V8Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-stop-v4-3-0"; }
};
WppIconStop.style = wppIconCss;

exports.wpp_icon_mic_on = WppIconMicOn;
exports.wpp_icon_stop = WppIconStop;
