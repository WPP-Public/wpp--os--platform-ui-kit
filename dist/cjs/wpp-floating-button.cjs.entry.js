'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7d205426.js');
const utils = require('./utils-8b2c3bc1.js');
const common = require('./common-ee802540.js');
const WrappedSlot = require('./WrappedSlot-1f8b2d26.js');
const subscribeToTheme = require('./subscribe-to-theme-f2fa6289.js');
require('./consts-d8f5ef98.js');
require('./theme-observer-4179316e.js');

const LOCALES_DEFAULTS = {
  label: 'Add',
};

const wppFloatingButtonCss = ":host{--fb-width:var(--wpp-fb-width, 40px);--fb-height:var(--wpp-fb-heigth, 40px);--fb-border-radius:var(--wpp-fb-border-radius, 50%);--fb-box-shadow:var(--wpp-fb-box-shadow, var(--wpp-box-shadow-brand));--fb-first-border-color-focus:var(--wpp-fb-first-border-color-focus, var(--wpp-grey-color-000));--fb-second-border-color-focus:var(--wpp-fb-second-border-color-focus, var(--wpp-brand-color));--fb-primary-bg-color:var(--wpp-fb-primary-bg-color, var(--wpp-brand-color));--fb-primary-bg-color-hover:var(--wpp-fb-primary-bg-color-hover, var(--wpp-brand-color-hover));--fb-primary-bg-color-active:var(--wpp-fb-primary-bg-color-active, var(--wpp-brand-color-active));--fb-primary-bg-color-disabled:var(--wpp-fb-primary-bg-color-disabled, var(--wpp-brand-color-disabled));--fb-primary-text-color:var(--wpp-fb-primary-text-color, var(--wpp-grey-color-000));--fb-primary-icon-color:var(--wpp-fb-primary-icon-color, var(--wpp-grey-color-000));display:-ms-inline-flexbox;display:inline-flex;outline:none}:host(.wpp-disabled:active),:host(.wpp-loading:active){pointer-events:none}.button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:var(--fb-width);height:var(--fb-height);margin:0;border-radius:var(--fb-border-radius);font-style:normal;line-height:var(--button-line-height);text-decoration:none;border:none;outline:0;cursor:pointer;position:relative;-webkit-box-shadow:var(--fb-box-shadow);box-shadow:var(--fb-box-shadow)}.button.tab-focus{border-radius:var(--fb-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--fb-first-border-color-focus), 0 0 0 3px var(--fb-second-border-color-focus);box-shadow:0 0 0 1px var(--fb-first-border-color-focus), 0 0 0 3px var(--fb-second-border-color-focus);background-color:var(--fb-primary-bg-color-hover)}.button .content{overflow:hidden}.button .content .icon-plus{color:var(--fb-primary-icon-color)}.button .content.icon ::slotted(*){color:var(--fb-primary-icon-color)}.button .loader{position:absolute;top:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.button .content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;opacity:1}.button .content.hide{opacity:0}.button.disabled{cursor:not-allowed}.button.loading{cursor:not-allowed}.button.primary{color:var(--fb-primary-text-color);background-color:var(--fb-primary-bg-color)}.button.primary .icon-start ::slotted(*),.button.primary .icon-end ::slotted(*){color:var(--fb-primary-icon-color)}.button.primary.tab-focus,.button.primary:hover{background-color:var(--fb-primary-bg-color-hover)}.button.primary:active,.button.primary.pressed{background-color:var(--fb-primary-bg-color-active)}.button.primary:disabled{background-color:var(--fb-primary-bg-color-disabled)}.button.primary.loading{background-color:var(--fb-primary-bg-color)}:host([data-wpp-theme=dark]) .button .wpp-spinner::part(circle){stroke:var(--wpp-grey-color-1000)}:host([data-wpp-theme=dark]) .button .content.icon ::slotted(*){color:var(--wpp-grey-color-1000)}";

const WppFloatingButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.onKeyDown = (event) => {
      if (this.disabled || this.loading)
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const clickEvent = new MouseEvent('click', { bubbles: true, composed: true });
        this.host.dispatchEvent(clickEvent);
        this.isPressed = true;
      }
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = common.FOCUS_TYPE.TAB;
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.onBlur = () => {
      this.focusType = common.FOCUS_TYPE.NONE;
      this.isPressed = false;
    };
    // The ring is a stateful class rather than `:focus-visible`, and blur clears it. Focus moved here by
    // script after a key press, or handed back by another window, never sees a Tab keyup, so take the
    // ring from what the browser itself decided.
    this.onFocus = () => {
      if (typeof this.buttonRef?.matches === 'function' && this.buttonRef.matches(':focus-visible')) {
        this.focusType = common.FOCUS_TYPE.TAB;
      }
    };
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
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
    // The name is set as `aria-label` in render, so `label` and `labelledby` are not passed through.
    this.getButtonAriaProps = () => utils.getAriaProps({ ...this.ariaProps, label: undefined, labelledby: undefined });
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
      'tab-focus': this.focusType === 'tab-focus',
      pressed: this.isPressed,
    });
    this.loaderCssClasses = () => ({
      loader: true,
    });
    this.contentCssClasses = () => ({
      content: true,
      icon: true,
      hide: this.loading,
    });
    this.focusType = undefined;
    this.isPressed = false;
    this.validAriaProps = {};
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
    this.locales = {};
  }
  /**
   * Method that sets focus on the native button.
   */
  async setFocus() {
    setTimeout(() => {
      if (this.buttonRef) {
        this.buttonRef.focus();
        this.focusType = common.FOCUS_TYPE.TAB;
      }
    }, 0);
  }
  onUpdateAriaProps() {
    this.validAriaProps = this.getButtonAriaProps();
  }
  componentWillLoad() {
    this.validAriaProps = this.getButtonAriaProps();
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  get _locales() {
    return utils.mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), onClick: this.handleClick, exportparts: "button, spinner-wrapper, spinner, icon-plus, ws-wrapper, ws-inner", onBlur: this.onBlur, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, index.h("button", { ref: el => (this.buttonRef = el), class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled || this.loading, form: this.form, formAction: this.formAction, formEncType: this.formEncType, formMethod: this.formMethod, formNoValidate: this.formNoValidate, formTarget: this.formTarget, value: this.value, name: this.name, type: this.type, "data-testid": "wppFloatingButton", "aria-label": utils.getLabelledbyText(this.host, this.ariaProps?.labelledby) || this.ariaProps?.label || this._locales.label, ...this.validAriaProps, part: "button" }, this.loading && (index.h("div", { class: this.loaderCssClasses(), part: "spinner-wrapper" }, index.h("wpp-spinner-v4-7-0", { color: 'var(--wpp-grey-color-000)', part: "spinner" }))), index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.contentCssClasses() }, index.h("wpp-icon-plus-v4-7-0", { class: "icon-plus", part: "icon-plus" })))));
  }
  static get registryIs() { return "wpp-floating-button-v4-7-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "ariaProps": ["onUpdateAriaProps"]
  }; }
};
WppFloatingButton.style = wppFloatingButtonCss;

exports.wpp_floating_button = WppFloatingButton;
