'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var MaximiseDirectionIconPath;
(function (MaximiseDirectionIconPath) {
  MaximiseDirectionIconPath["vertical"] = "M9.57574 1.33308C9.81005 1.09877 10.1899 1.09877 10.4243 1.33308L12.5456 3.45441C12.7799 3.68872 12.7799 4.06862 12.5456 4.30293C12.3113 4.53725 11.9314 4.53725 11.6971 4.30293L10.6001 3.20597V7.49997C10.6001 7.83134 10.3315 8.09997 10.0001 8.09997C9.66873 8.09997 9.4001 7.83134 9.4001 7.49997V3.20578L8.30294 4.30293C8.06863 4.53725 7.68873 4.53725 7.45442 4.30293C7.2201 4.06862 7.2201 3.68872 7.45442 3.45441L9.57574 1.33308ZM3.8999 9.99997C3.8999 9.6686 4.16853 9.39997 4.4999 9.39997H15.4999C15.8313 9.39997 16.0999 9.6686 16.0999 9.99997C16.0999 10.3313 15.8313 10.6 15.4999 10.6H4.4999C4.16853 10.6 3.8999 10.3313 3.8999 9.99997ZM10.5999 16.7942L10.5999 12.5C10.5999 12.1686 10.3313 11.9 9.9999 11.9C9.66853 11.9 9.3999 12.1686 9.3999 12.5L9.3999 16.794L8.30294 15.697C8.06863 15.4627 7.68873 15.4627 7.45442 15.697C7.2201 15.9313 7.2201 16.3112 7.45442 16.5455L9.57574 18.6669C9.81005 18.9012 10.1899 18.9012 10.4243 18.6669L12.5456 16.5455C12.7799 16.3112 12.7799 15.9313 12.5456 15.697C12.3113 15.4627 11.9314 15.4627 11.6971 15.697L10.5999 16.7942Z";
})(MaximiseDirectionIconPath || (MaximiseDirectionIconPath = {}));
const WppIconMaximise = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'vertical';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-maximise", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: MaximiseDirectionIconPath[this.direction], fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-maximise-v4-0-0"; }
};
WppIconMaximise.style = wppIconCss;

exports.wpp_icon_maximise = WppIconMaximise;
