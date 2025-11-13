'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconShapes = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-shapes", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M7.4 3.2C5.0804 3.2 3.2 5.0804 3.2 7.4C3.2 9.51588 4.76462 11.2663 6.8 11.5575V12.767C4.10003 12.4686 2 10.1795 2 7.4C2 4.41766 4.41766 2 7.4 2C10.1795 2 12.4686 4.10003 12.767 6.8H11.5575C11.2663 4.76462 9.51588 3.2 7.4 3.2ZM10.2 7.6C8.76406 7.6 7.6 8.76406 7.6 10.2V15.4C7.6 16.8359 8.76406 18 10.2 18H15.4C16.8359 18 18 16.8359 18 15.4V10.2C18 8.76406 16.8359 7.6 15.4 7.6H10.2ZM8.8 10.2C8.8 9.4268 9.4268 8.8 10.2 8.8H15.4C16.1732 8.8 16.8 9.4268 16.8 10.2V15.4C16.8 16.1732 16.1732 16.8 15.4 16.8H10.2C9.4268 16.8 8.8 16.1732 8.8 15.4V10.2Z", fill: "currentColor" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-shapes-v3-3-1"; }
};
WppIconShapes.style = wppIconCss;

exports.wpp_icon_shapes = WppIconShapes;
