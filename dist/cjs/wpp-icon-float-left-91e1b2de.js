'use strict';

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFloatLeft = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-float-left", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M2.5 5.833h5v5H2.5V5.833m0-3.333h15v1.667H2.5V2.5m15 3.333v1.667H9.167V5.833h8.333m0 3.333v1.667H9.167v-1.667h8.333M2.5 12.5h11.667v1.667H2.5v-1.667m0 3.333h15v1.667H2.5v-1.667z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-float-left-v2-22-0"; }
};
WppIconFloatLeft.style = wppIconCss;

exports.WppIconFloatLeft = WppIconFloatLeft;
