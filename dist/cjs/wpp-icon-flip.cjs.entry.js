'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var FlipDirectionIconPath;
(function (FlipDirectionIconPath) {
  FlipDirectionIconPath["horizontal"] = "M17.9045 16.1249C17.794 16.2964 17.604 16.4001 17.4 16.4001L11.4 16.4001C11.0686 16.4001 10.8 16.1314 10.8 15.8001L10.8 2.60006C10.8 2.31764 10.997 2.07345 11.273 2.01366C11.549 1.95387 11.8294 2.09467 11.9462 2.35178L17.9462 15.5518C18.0306 15.7375 18.0149 15.9534 17.9045 16.1249ZM12 5.37002L12 15.2001L16.4682 15.2001L12 5.37002ZM2.4 16.4C2.26306 16.4 2.13564 16.33 2.06227 16.2144C1.98889 16.0987 1.97976 15.9536 2.03807 15.8297L8.43807 2.22972C8.51782 2.06026 8.70448 1.96882 8.88726 2.00967C9.07004 2.05053 9.2 2.21275 9.2 2.40004L9.2 16C9.2 16.221 9.02091 16.4 8.8 16.4L2.4 16.4Z";
  FlipDirectionIconPath["vertical"] = "M16.1249 2.09554C16.2964 2.20598 16.4001 2.396 16.4001 2.6V8.6C16.4001 8.93137 16.1314 9.2 15.8001 9.2H2.60006C2.31764 9.2 2.07345 9.00304 2.01366 8.72702C1.95387 8.451 2.09467 8.17065 2.35178 8.05378L15.5518 2.05378C15.7375 1.96937 15.9534 1.98509 16.1249 2.09554ZM5.37003 8H15.2001V3.5318L5.37003 8ZM16.4 17.6C16.4 17.7369 16.33 17.8644 16.2144 17.9377C16.0987 18.0111 15.9536 18.0202 15.8297 17.9619L2.22972 11.5619C2.06026 11.4822 1.96882 11.2955 2.00967 11.1127C2.05053 10.93 2.21275 10.8 2.40004 10.8H16C16.221 10.8 16.4 10.9791 16.4 11.2V17.6Z";
})(FlipDirectionIconPath || (FlipDirectionIconPath = {}));
const WppIconFlip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'vertical';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-flip", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: FlipDirectionIconPath[this.direction], fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-flip-v4-0-0"; }
};
WppIconFlip.style = wppIconCss;

exports.wpp_icon_flip = WppIconFlip;
