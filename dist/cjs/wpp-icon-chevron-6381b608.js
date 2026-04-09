'use strict';

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var ChevronDirectionIconPath;
(function (ChevronDirectionIconPath) {
  ChevronDirectionIconPath["up"] = "M4 13L10 7L16 13";
  ChevronDirectionIconPath["right"] = "M8 4L14 10L8 16";
  ChevronDirectionIconPath["down"] = "M16 8L10 14L4 8";
  ChevronDirectionIconPath["left"] = "M12 16L6 10L12 4";
})(ChevronDirectionIconPath || (ChevronDirectionIconPath = {}));
const WppIconChevron = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-chevron", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: ChevronDirectionIconPath[this.direction], stroke: "currentColor", "stroke-width": "2", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" })));
  }
  static get registryIs() { return "wpp-icon-chevron-v4-0-0"; }
};
WppIconChevron.style = wppIconCss;

exports.WppIconChevron = WppIconChevron;
