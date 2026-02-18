import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var ChevronDirectionIconPath;
(function (ChevronDirectionIconPath) {
  // @deprecated: top should be removed in 4.0.0 release
  ChevronDirectionIconPath["top"] = "M4 13L10 7L16 13";
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  ChevronDirectionIconPath["up"] = "M4 13L10 7L16 13";
  ChevronDirectionIconPath["right"] = "M8 4L14 10L8 16";
  ChevronDirectionIconPath["down"] = "M16 8L10 14L4 8";
  ChevronDirectionIconPath["left"] = "M12 16L6 10L12 4";
})(ChevronDirectionIconPath || (ChevronDirectionIconPath = {}));
const WppIconChevron = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-chevron", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: ChevronDirectionIconPath[this.direction], stroke: "currentColor", "stroke-width": "2", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" })));
  }
  static get registryIs() { return "wpp-icon-chevron-v3-5-0"; }
};
WppIconChevron.style = wppIconCss;

export { WppIconChevron as W };
