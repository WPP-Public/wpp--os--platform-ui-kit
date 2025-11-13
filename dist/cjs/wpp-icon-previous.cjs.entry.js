'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPrevious = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-previous", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M16.9992 4.36337C16.9992 3.26846 15.772 2.62173 14.8688 3.24061L6.70379 8.83518C5.91814 9.3735 5.9141 10.5315 6.69598 11.0753L14.861 16.754C15.7634 17.3816 16.9992 16.7358 16.9992 15.6366V4.36337ZM15.5282 4.20298C15.6572 4.11456 15.8325 4.20696 15.8325 4.36337V15.6366C15.8325 15.7936 15.656 15.8859 15.5271 15.7962L7.36207 10.1176C7.25038 10.0399 7.25096 9.87445 7.36319 9.79755L15.5282 4.20298ZM3 3.5833C3 3.26115 3.26115 3 3.5833 3C3.90545 3 4.1666 3.26115 4.1666 3.5833V16.4159C4.1666 16.7381 3.90545 16.9992 3.5833 16.9992C3.26115 16.9992 3 16.7381 3 16.4159V3.5833Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-previous-v3-3-1"; }
};
WppIconPrevious.style = wppIconCss;

exports.wpp_icon_previous = WppIconPrevious;
