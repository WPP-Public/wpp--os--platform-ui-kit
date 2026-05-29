'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var AutofitDirectionIconPath;
(function (AutofitDirectionIconPath) {
  AutofitDirectionIconPath["up"] = "M15.7121 5.23289L15.0027 4.49838V17.25C15.0027 17.6642 14.667 18 14.2527 18C13.8385 18 13.5027 17.6642 13.5027 17.25V4.49433L12.7895 5.23289C12.5017 5.53084 12.0269 5.53911 11.729 5.25137C11.431 4.96362 11.4228 4.48882 11.7105 4.19087L13.5315 2.30532C13.9246 1.89823 14.577 1.89823 14.9701 2.30532L16.7911 4.19087C17.0788 4.48882 17.0705 4.96362 16.7726 5.25137C16.4746 5.53911 15.9998 5.53084 15.7121 5.23289ZM5 3C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H11.25C11.6642 17 12 16.6642 12 16.25C12 15.8358 11.6642 15.5 11.25 15.5H5C4.72386 15.5 4.5 15.2761 4.5 15V5C4.5 4.72386 4.72386 4.5 5 4.5H9.25C9.66421 4.5 10 4.16421 10 3.75C10 3.33579 9.66421 3 9.25 3H5Z";
  AutofitDirectionIconPath["down"] = "M15.7121 14.7671L15.0027 15.5016V2.75C15.0027 2.33579 14.667 2 14.2527 2C13.8385 2 13.5027 2.33579 13.5027 2.75V15.5057L12.7895 14.7671C12.5017 14.4692 12.0269 14.4609 11.729 14.7486C11.431 15.0364 11.4228 15.5112 11.7105 15.8091L13.5315 17.6947C13.9246 18.1018 14.577 18.1018 14.9701 17.6947L16.7911 15.8091C17.0788 15.5112 17.0705 15.0364 16.7726 14.7486C16.4746 14.4609 15.9998 14.4692 15.7121 14.7671ZM5 17C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H11.25C11.6642 3 12 3.33579 12 3.75C12 4.16421 11.6642 4.5 11.25 4.5H5C4.72386 4.5 4.5 4.72386 4.5 5V15C4.5 15.2761 4.72386 15.5 5 15.5H9.25C9.66421 15.5 10 15.8358 10 16.25C10 16.6642 9.66421 17 9.25 17H5Z";
})(AutofitDirectionIconPath || (AutofitDirectionIconPath = {}));
const WppIconAutofit = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'up';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-autofit", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: AutofitDirectionIconPath[this.direction], fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-autofit-v4-1-0"; }
};
WppIconAutofit.style = wppIconCss;

exports.wpp_icon_autofit = WppIconAutofit;
