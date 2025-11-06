'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const wppSortButtonCss = ":host{--sort-button-height:var(--wpp-sort-button-height, 32px);--sort-button-padding:var(--wpp-sort-button-padding, calc(5px - var(--sort-button-border-width)) calc(16px - var(--sort-button-border-width)) calc(5px - var(--sort-button-border-width)) calc(12px - var(--sort-button-border-width)));--sort-button-bg-color:var(--wpp-sort-button-bg-color, transparent);--sort-button-bg-color-hover:var(--wpp-sort-button-bg-color-hover, var(--wpp-grey-color-200));--sort-button-bg-color-active:var(--wpp-sort-button-bg-color-active, var(--wpp-grey-color-300));--sort-button-bg-color-disabled:var(--wpp-sort-button-bg-color-disabled, var(--wpp-grey-color-100));--sort-button-border-color:var(--wpp-sort-button-border-color, var(--wpp-grey-color-600));--sort-button-border-color-hover:var(--wpp-sort-button-border-color-hover, var(--wpp-grey-color-700));--sort-button-border-color-active:var(--wpp-sort-button-border-color-active, var(--wpp-grey-color-800));--sort-button-border-color-disabled:var(--wpp-sort-button-border-color-disabled, var(--wpp-grey-color-400));--sort-button-first-border-color-focus:var(--wpp-sort-button-first-border-color-focus, var(--wpp-grey-color-000));--sort-button-second-border-color-focus:var(--wpp-sort-button-second-border-color-focus, var(--wpp-brand-color));--sort-button-text-margin:var(--wpp-sort-button-text-margin, 0 0 0 8px);--sort-button-text-color:var(--wpp-sort-button-text-color, var(--wpp-grey-color-900));--sort-button-text-color-hover:var(--wpp-sort-button-text-color-hover, var(--wpp-grey-color-900));--sort-button-text-color-active:var(--wpp-sort-button-text-color-active, var(--wpp-grey-color-1000));--sort-button-text-color-disabled:var(--wpp-sort-button-text-color-disabled, var(--wpp-text-color-disabled));--sort-button-icon-color:var(--wpp-sort-button-icon-color, var(--wpp-grey-color-800));--sort-button-icon-color-hover:var(--wpp-sort-button-icon-color-hover, var(--wpp-icon-color-hover));--sort-button-icon-color-active:var(--wpp-sort-button-icon-color-active, var(--wpp-icon-color-active));--sort-button-icon-color-disabled:var(--wpp-sort-button-icon-color-disabled, var(--wpp-icon-color-disabled));--sort-button-border-radius:var(--wpp-sort-button-border-radius, var(--wpp-border-radius-s));--sort-button-border-width:var(--wpp-sort-button-border-width, var(--wpp-border-width-s));--sort-button-border-style:var(--wpp-sort-button-border-style, solid);--sort-button-width:auto;display:-ms-inline-flexbox;display:inline-flex;outline:none}:host(.wpp-disabled){cursor:not-allowed}:host(.wpp-disabled:active){pointer-events:none}.button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:var(--sort-button-height);margin:0;padding:var(--sort-button-padding);border-radius:var(--sort-button-border-radius);background-color:var(--sort-button-bg-color);border:var(--sort-button-border-width) var(--sort-button-border-style) var(--sort-button-border-color);outline:none;cursor:pointer}.button .icon{color:var(--sort-button-icon-color)}.button .text{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);color:var(--sort-button-text-color);margin:var(--sort-button-text-margin);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.button:hover{background-color:var(--sort-button-bg-color-hover);border-color:var(--sort-button-border-color-hover)}.button:hover .icon{color:var(--sort-button-icon-color-hover)}.button:hover .text{color:var(--sort-button-text-color-hover)}.button:active{background-color:var(--sort-button-bg-color-active);border-color:var(--sort-button-border-color-active)}.button:active .icon{color:var(--sort-button-icon-color-active)}.button:active .text{color:var(--sort-button-text-color-active)}.button:disabled{pointer-events:none;background-color:var(--sort-button-bg-color-disabled);border-color:var(--sort-button-border-color-disabled)}.button:disabled .icon{color:var(--sort-button-icon-color-disabled)}.button:disabled .text{color:var(--sort-button-text-color-disabled)}:host(:focus-visible) .button{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--sort-button-first-border-color-focus), 0 0 0 2px var(--sort-button-second-border-color-focus);box-shadow:0 0 0 1px var(--sort-button-first-border-color-focus), 0 0 0 2px var(--sort-button-second-border-color-focus);background-color:var(--sort-button-bg-color-hover);border-color:var(--sort-button-border-color-hover)}:host(:focus-visible) .button .icon{color:var(--sort-button-icon-color-hover)}:host(:focus-visible) .button .text{color:var(--sort-button-text-color-hover)}";

const WppSortButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-sort-button': true,
      'wpp-disabled': this.disabled,
    });
    this.buttonCssClasses = () => ({
      button: true,
      disabled: this.disabled,
    });
    this.name = undefined;
    this.ariaProps = {};
    this.disabled = false;
    this.autoFocus = false;
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "button, icon, text, inner", "aria-disabled": this.disabled, tabIndex: this.disabled ? -1 : 0 }, index.h("button", { class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled, name: this.name, type: "button", "data-testid": "wppSortButton", "aria-label": this.ariaProps.label, tabIndex: -1, part: "button" }, index.h("wpp-icon-sort-v2-22-0", { class: "icon", part: "icon" }), index.h("span", { class: "text", part: "text" }, index.h("slot", { part: "inner" })))));
  }
  static get registryIs() { return "wpp-sort-button-v2-22-0"; }
};
WppSortButton.style = wppSortButtonCss;

exports.wpp_sort_button = WppSortButton;
