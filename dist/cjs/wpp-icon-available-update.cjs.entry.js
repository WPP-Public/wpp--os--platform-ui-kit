'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAvailable = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-available-update", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.92996 9.17588L4.46967 8.63617C4.76256 8.34328 5.23744 8.34328 5.53033 8.63617C5.82322 8.92907 5.82322 9.40394 5.53033 9.69683L3.65533 11.5718C3.36244 11.8647 2.88756 11.8647 2.59467 11.5718L0.71967 9.69683C0.426777 9.40394 0.426777 8.92907 0.71967 8.63617C1.01256 8.34328 1.48744 8.34328 1.78033 8.63617L2.40989 9.26574C2.77932 5.39895 6.03639 2.375 10 2.375C12.5772 2.375 14.8497 3.65707 16.2281 5.60905C16.467 5.9474 16.3864 6.41539 16.048 6.65432C15.7097 6.89325 15.2417 6.81264 15.0028 6.47429C13.892 4.90126 12.067 3.875 10 3.875C6.8966 3.875 4.33245 6.18277 3.92996 9.17588ZM18.2197 11.3638L17.5903 10.7345C17.2207 14.6011 13.9637 17.6248 10.0002 17.6248C7.42305 17.6248 5.15056 16.3428 3.77218 14.3908C3.53325 14.0524 3.61385 13.5845 3.95221 13.3455C4.29056 13.1066 4.75855 13.1872 4.99748 13.5255C6.10826 15.0986 7.93327 16.1248 10.0002 16.1248C13.1037 16.1248 15.6678 13.817 16.0703 10.8239L15.5303 11.3638C15.2374 11.6567 14.7626 11.6567 14.4697 11.3638C14.1768 11.0709 14.1768 10.5961 14.4697 10.3032L16.3447 8.42817C16.6376 8.13527 17.1124 8.13527 17.4053 8.42817L19.2803 10.3032C19.5732 10.5961 19.5732 11.0709 19.2803 11.3638C18.9874 11.6567 18.5126 11.6567 18.2197 11.3638Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-available-update-v3-4-0"; }
};
WppIconAvailable.style = wppIconCss;

exports.wpp_icon_available_update = WppIconAvailable;
