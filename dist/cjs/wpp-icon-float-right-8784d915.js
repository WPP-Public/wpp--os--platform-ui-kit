'use strict';

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFloatRight = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-float-right", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M12.5 5.833h5v5h-5V5.833M2.5 2.5h15v1.667H2.5V2.5m8.333 3.333v1.667H2.5V5.833h8.333m-3.333 3.333v1.667H2.5v-1.667h5m-5 3.333h11.667v1.667H2.5v-1.667m0 3.333h15v1.667H2.5v-1.667z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-float-right-v2-22-0"; }
};
WppIconFloatRight.style = wppIconCss;

exports.WppIconFloatRight = WppIconFloatRight;
