'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFlagOff = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-flag-off", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M3.03886 2.17824L17.644 16.7834C17.8817 17.0211 17.8817 17.4064 17.644 17.644C17.4064 17.8817 17.0211 17.8817 16.7834 17.644L12.6756 13.5365L4.66165 13.5374V17.3915C4.66165 17.6995 4.43271 17.9541 4.13568 17.9944L4.0531 18C3.74502 18 3.49041 17.7711 3.45011 17.474L3.44456 17.3915L3.44429 4.30518L2.17824 3.03886C1.94059 2.8012 1.94059 2.41589 2.17824 2.17824C2.41589 1.94059 2.8012 1.94059 3.03886 2.17824ZM5.16229 2.5815L17.4445 2.58195C17.946 2.58195 18.2322 3.15451 17.9313 3.55568L14.5524 8.05988L17.9313 12.5641C18.2322 12.9653 17.946 13.5378 17.4445 13.5378L16.1186 13.537L14.9015 12.3199L16.2272 12.3207L13.3048 8.42506C13.1425 8.20867 13.1425 7.9111 13.3048 7.6947L16.2272 3.79905L6.37938 3.7986L5.16229 2.5815ZM4.66138 5.52228L4.66165 12.3207L11.4585 12.3194L4.66138 5.52228Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-flag-off-v3-3-1"; }
};
WppIconFlagOff.style = wppIconCss;

exports.wpp_icon_flag_off = WppIconFlagOff;
