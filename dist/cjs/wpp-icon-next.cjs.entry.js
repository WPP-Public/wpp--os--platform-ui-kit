'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconNext = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-next", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M3 4.36337C3 3.26846 4.22712 2.62173 5.13034 3.24061L13.2954 8.83518C14.081 9.3735 14.085 10.5315 13.3032 11.0753L5.13815 16.754C4.23572 17.3816 3 16.7358 3 15.6366V4.36337ZM4.47094 4.20298C4.3419 4.11456 4.1666 4.20696 4.1666 4.36337V15.6366C4.1666 15.7936 4.34313 15.8859 4.47205 15.7962L12.6371 10.1176C12.7488 10.0399 12.7482 9.87445 12.636 9.79755L4.47094 4.20298ZM16.9992 3.5833C16.9992 3.26115 16.738 3 16.4159 3C16.0937 3 15.8325 3.26115 15.8325 3.5833V16.4159C15.8325 16.7381 16.0937 16.9992 16.4159 16.9992C16.738 16.9992 16.9992 16.7381 16.9992 16.4159V3.5833Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-next-v4-0-0"; }
};
WppIconNext.style = wppIconCss;

exports.wpp_icon_next = WppIconNext;
