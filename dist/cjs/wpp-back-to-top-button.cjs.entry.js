'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const wppBackToTopButtonCss = ":host{--bttb-width:var(--wpp-back-to-top-button-width, 40px);--bttb-height:var(--wpp-back-to-top-button-height, 40px);--bttb-border-radius:var(--wpp-back-to-top-button-border-radius, var(--wpp-border-radius-round));--bttb-box-shadow:var(--wpp-back-to-top-button-box-shadow, var(--wpp-box-shadow-brand));--bttb-border-width:var(--wpp-back-to-top-button-border-width, var(--wpp-border-width-s));--bttb-border-style:var(--wpp-back-to-top-button-border-style, solid);--bttb-border-color:var(--wpp-back-to-top-button-border-color, var(--wpp-brand-color));--bttb-border-color-hover:var(--wpp-back-to-top-button-border-color-hover, var(--wpp-brand-color));--bttb-border-color-active:var(--wpp-back-to-top-button-border-color-active, var(--wpp-brand-color-active));--bttb-first-border-color-focus:var(--wpp-back-to-top-button-first-border-color-focus, var(--wpp-grey-color-000));--bttb-second-border-color-focus:var(--wpp-back-to-top-button-second-border-color-focus, var(--wpp-brand-color));--bttb-bg-color:var(--wpp--back-to-top-button-bg-color, transparent);--bttb-bg-color-hover:var(--wpp--back-to-top-button-bg-color-hover, var(--wpp-primary-color-100));--bttb-bg-color-active:var(--wpp--wpp--back-to-top-button-bg-color-active, var(--wpp-primary-color-200));--bttb-icon-color:var(--wpp--back-to-top-button-icon-color, var(--wpp-brand-color));--bttb-icon-color-hover:var(--wpp--back-to-top-button-icon-color-hover, var(--wpp-brand-color));--bttb-icon-color-active:var(--wpp--back-to-top-button-icon-color-active, var(--wpp-brand-color-active));display:-ms-inline-flexbox;display:inline-flex;outline:none}:host button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:var(--bttb-width);height:var(--bttb-height);margin:0;border-radius:var(--bttb-border-radius);text-decoration:none;border:var(--bttb-border-width) var(--bttb-border-style) var(--bttb-border-color);outline:0;cursor:pointer;-webkit-box-shadow:var(--bttb-box-shadow);box-shadow:var(--bttb-box-shadow);background-color:var(--bttb-bg-color)}:host button .icon{color:var(--bttb-icon-color)}:host button:hover{background-color:var(--bttb-bg-color-hover);border-color:var(--bttb-border-color-hover)}:host button:hover .icon{color:var(--bttb-icon-color-hover)}:host button:active{background-color:var(--bttb-bg-color-active);border-color:var(--bttb-border-color-active)}:host button:active .icon{color:var(--bttb-icon-color-active)}:host(:focus-visible) button{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--bttb-first-border-color-focus), 0 0 0 2px var(--bttb-second-border-color-focus);box-shadow:0 0 0 1px var(--bttb-first-border-color-focus), 0 0 0 2px var(--bttb-second-border-color-focus);border-color:var(--bttb-border-color-hover);background-color:var(--bttb-bg-color-hover)}";

const WppBackToTopButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-back-to-top-button': true,
    });
    this.ariaProps = {};
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "button, icon", tabIndex: 0 }, index.h("button", { type: "button", part: "button", "data-testid": "wppBackToTopButton", "aria-label": this.ariaProps.label }, index.h("wpp-icon-arrow-v2-22-0", { direction: "top", class: "icon", part: "icon" }))));
  }
  static get registryIs() { return "wpp-back-to-top-button-v2-22-0"; }
};
WppBackToTopButton.style = wppBackToTopButtonCss;

exports.wpp_back_to_top_button = WppBackToTopButton;
