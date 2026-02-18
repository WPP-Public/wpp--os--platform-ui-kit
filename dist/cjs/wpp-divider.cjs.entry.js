'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const wppDividerCss = ":host{--divider-width:var(--wpp-divider-width, 100%);--divider-height:var(--wpp-divider-height, 1px);--divider-border-radius:var(--wpp-divider-border-radius, 2px);--divider-bg-color:var(--wpp-divider-bg-color, var(--wpp-grey-color-300));--divider-hover-bg-color:var(--wpp-divider-hover-bg-color, var(--wpp-grey-color-600));display:block}:host .wpp-divider-line{width:var(--divider-width);height:var(--divider-height);background-color:var(--divider-bg-color);border-radius:var(--divider-border-radius)}:host .wpp-divider-line.resizable:hover{--divider-height:var(--wpp-divider-height, 2px);background-color:var(--divider-hover-bg-color);cursor:row-resize}:host .wpp-divider-line.vertical{--divider-width:var(--wpp-divider-width, 1px);--divider-height:var(--wpp-divider-height, 100%)}:host .wpp-divider-line.vertical.resizable:hover{--divider-width:var(--wpp-divider-width, 2px);--divider-height:var(--wpp-divider-height, 100%);cursor:col-resize}";

const WppDivider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-divider': true,
    });
    this.dividerCssClasses = () => ({
      'wpp-divider-line': true,
      resizable: this.resizable,
      vertical: this.vertical,
    });
    this.vertical = false;
    this.resizable = false;
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), role: "separator", "aria-orientation": this.vertical ? 'vertical' : 'horizontal', exportparts: "body" }, index.h("div", { class: this.dividerCssClasses(), part: "body" })));
  }
  static get registryIs() { return "wpp-divider-v3-5-0"; }
  get host() { return index.getElement(this); }
};
WppDivider.style = wppDividerCss;

exports.wpp_divider = WppDivider;
