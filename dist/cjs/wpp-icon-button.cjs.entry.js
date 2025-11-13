'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const wppIconButtonCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host([disabled]:not([disabled=false]):active),:host([loading]:not([loading=false]):active){pointer-events:none}";

const WppIconButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-icon-button': true,
    });
    this.size = 'm';
    this.disabled = false;
    this.loading = false;
    this.name = undefined;
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-button component is deprecated. Please, use wpp-action-button instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner" }, index.h("wpp-button-v3-3-1", { variant: "secondary", size: this.size, disabled: this.disabled, loading: this.loading, name: this.name, "data-testid": "wppIconButton", part: "wrapper" }, index.h("slot", { slot: "icon-start", part: "inner" }))));
  }
  static get registryIs() { return "wpp-icon-button-v3-3-1"; }
};
WppIconButton.style = wppIconButtonCss;

exports.wpp_icon_button = WppIconButton;
