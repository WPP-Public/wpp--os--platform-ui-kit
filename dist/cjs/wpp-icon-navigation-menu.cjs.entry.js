'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconNavigationMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-navigation-menu", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M2.2915 4.375H17.7082", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round" }), index.h("path", { d: "M2.2915 15.625H17.7082", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round" }), index.h("path", { d: "M2.2915 10H17.7082", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round" })));
  }
  static get registryIs() { return "wpp-icon-navigation-menu-v4-0-0"; }
};
WppIconNavigationMenu.style = wppIconCss;

exports.wpp_icon_navigation_menu = WppIconNavigationMenu;
