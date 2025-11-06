'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-9c925efe.js');
const WrappedSlot = require('./WrappedSlot-736c2736.js');
require('./consts-255c1066.js');

const wppFloatingButtonCss = ":host{--fb-width:var(--wpp-fb-width, 40px);--fb-height:var(--wpp-fb-heigth, 40px);--fb-border-radius:var(--wpp-fb-border-radius, 50%);--fb-box-shadow:var(--wpp-fb-box-shadow, var(--wpp-box-shadow-brand));--fb-first-border-color-focus:var(--wpp-fb-first-border-color-focus, var(--wpp-grey-color-000));--fb-second-border-color-focus:var(--wpp-fb-second-border-color-focus, var(--wpp-brand-color));--fb-primary-bg-color:var(--wpp-fb-primary-bg-color, var(--wpp-brand-color));--fb-primary-bg-color-hover:var(--wpp-fb-primary-bg-color-hover, var(--wpp-brand-color-hover));--fb-primary-bg-color-active:var(--wpp-fb-primary-bg-color-active, var(--wpp-brand-color-active));--fb-primary-bg-color-disabled:var(--wpp-fb-primary-bg-color-disabled, var(--wpp-brand-color-disabled));--fb-primary-text-color:var(--wpp-fb-primary-text-color, var(--wpp-grey-color-000));--fb-primary-icon-color:var(--wpp-fb-primary-icon-color, var(--wpp-grey-color-000));display:-ms-inline-flexbox;display:inline-flex;outline:none}:host(.wpp-disabled:active),:host(.wpp-loading:active){pointer-events:none}.button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:var(--fb-width);height:var(--fb-height);margin:0;border-radius:var(--fb-border-radius);font-style:normal;line-height:var(--button-line-height);text-decoration:none;border:none;outline:0;cursor:pointer;position:relative;-webkit-box-shadow:var(--fb-box-shadow);box-shadow:var(--fb-box-shadow)}.button .content{overflow:hidden}.button .content .icon-plus{color:var(--fb-primary-icon-color)}.button .content.icon ::slotted(*){color:var(--fb-primary-icon-color)}.button .loader{position:absolute;top:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.button .content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;opacity:1}.button .content.hide{opacity:0}.button.disabled{cursor:not-allowed}.button.loading{cursor:not-allowed}.button.primary{color:var(--fb-primary-text-color);background-color:var(--fb-primary-bg-color)}.button.primary .icon-start ::slotted(*),.button.primary .icon-end ::slotted(*){color:var(--fb-primary-icon-color)}.button.primary:hover{background-color:var(--fb-primary-bg-color-hover)}.button.primary:active{background-color:var(--fb-primary-bg-color-active)}.button.primary:disabled{background-color:var(--fb-primary-bg-color-disabled)}.button.primary.loading{background-color:var(--fb-primary-bg-color)}:host(:focus-visible) .button{border-radius:var(--fb-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--fb-first-border-color-focus), 0 0 0 2px var(--fb-second-border-color-focus);box-shadow:0 0 0 1px var(--fb-first-border-color-focus), 0 0 0 2px var(--fb-second-border-color-focus);background-color:var(--fb-primary-bg-color-hover)}";

const WppFloatingButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onKeyDown = (event) => {
      if (this.disabled || this.loading)
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const clickEvent = new MouseEvent('click', { bubbles: true, composed: true });
        this.host.dispatchEvent(clickEvent);
      }
    };
    this.handleClick = (ev) => {
      if (this.disabled || this.loading) {
        ev.stopPropagation();
        return;
      }
      if (utils.hasShadowDom(this.host)) {
        const form = this.host.closest('form');
        if (form) {
          ev.preventDefault();
          const fakeButton = document.createElement('button');
          fakeButton.type = this.type;
          fakeButton.style.display = 'none';
          form.appendChild(fakeButton);
          fakeButton.click();
          fakeButton.remove();
        }
      }
    };
    this.hostCssClasses = () => ({
      'wpp-floating-button': true,
      'wpp-disabled': this.disabled,
      'wpp-loading': this.loading,
    });
    this.buttonCssClasses = () => ({
      button: true,
      loading: this.loading,
      disabled: this.disabled,
      primary: true,
    });
    this.loaderCssClasses = () => ({
      loader: true,
    });
    this.contentCssClasses = () => ({
      content: true,
      icon: true,
      hide: this.loading,
    });
    this.disabled = false;
    this.loading = false;
    this.autoFocus = false;
    this.name = undefined;
    this.form = undefined;
    this.formAction = undefined;
    this.formEncType = undefined;
    this.formMethod = undefined;
    this.formNoValidate = false;
    this.formTarget = undefined;
    this.type = 'button';
    this.value = undefined;
    this.ariaProps = {};
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), onClick: this.handleClick, onKeyDown: this.onKeyDown, exportparts: "button, spinner-wrapper, spinner, icon-plus, ws-wrapper, ws-inner", "aria-disabled": this.disabled || this.loading, tabIndex: this.disabled || this.loading ? -1 : 0 }, index.h("button", { class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled || this.loading, form: this.form, formAction: this.formAction, formEncType: this.formEncType, formMethod: this.formMethod, formNoValidate: this.formNoValidate, formTarget: this.formTarget, value: this.value, name: this.name, type: this.type, "data-testid": "wppFloatingButton", "aria-label": this.ariaProps.label, tabIndex: -1, part: "button" }, this.loading && (index.h("div", { class: this.loaderCssClasses(), part: "spinner-wrapper" }, index.h("wpp-spinner-v2-22-0", { color: 'var(--wpp-grey-color-000)', part: "spinner" }))), index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.contentCssClasses() }, index.h("wpp-icon-plus-v2-22-0", { class: "icon-plus", part: "icon-plus" })))));
  }
  static get registryIs() { return "wpp-floating-button-v2-22-0"; }
  get host() { return index.getElement(this); }
};
WppFloatingButton.style = wppFloatingButtonCss;

exports.wpp_floating_button = WppFloatingButton;
