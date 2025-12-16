'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPreviousFilled = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-previous-filled", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M14.8688 3.24061C15.772 2.62173 16.9992 3.26846 16.9992 4.36337V15.6366C16.9992 16.7358 15.7634 17.3816 14.861 16.754L6.69598 11.0753C5.9141 10.5315 5.91814 9.3735 6.70379 8.83518L14.8688 3.24061Z", fill: "currentColor" }), index.h("path", { d: "M3.5833 3C3.26115 3 3 3.26115 3 3.5833V16.4159C3 16.7381 3.26115 16.9992 3.5833 16.9992C3.90545 16.9992 4.1666 16.7381 4.1666 16.4159V3.5833C4.1666 3.26115 3.90545 3 3.5833 3Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-previous-filled-v3-4-0"; }
};
WppIconPreviousFilled.style = wppIconCss;

exports.wpp_icon_previous_filled = WppIconPreviousFilled;
