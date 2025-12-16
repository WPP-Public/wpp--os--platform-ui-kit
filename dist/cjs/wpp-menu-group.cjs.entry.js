'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const wppMenuGroupCss = ":host{--menu-group-title-margin:var(--wpp-menu-group-title-margin, 8px 0 0px 8px);--menu-group-title-color:var(--wpp-menu-group-title-color, var(--wpp-grey-color-1000));--menu-group-divider-margin:var(--wpp-menu-group-divider-margin, 8px 0px 4px 0px)}.wpp-typography{display:-ms-flexbox;display:flex;margin:var(--menu-group-title-margin);color:var(--menu-group-title-color)}.wpp-divider{display:-ms-flexbox;display:flex;margin:var(--menu-group-divider-margin)}";

const WppMenuGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-menu-group': true,
    });
    this.header = undefined;
    this.withDivider = false;
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "header, divider" }, this.header && (index.h("wpp-typography-v3-4-0", { type: "2xs-strong", part: "header" }, this.header)), index.h("slot", null), this.withDivider && index.h("wpp-divider-v3-4-0", { class: "slot-divider", part: "divider" })));
  }
  static get registryIs() { return "wpp-menu-group-v3-4-0"; }
};
WppMenuGroup.style = wppMenuGroupCss;

exports.wpp_menu_group = WppMenuGroup;
