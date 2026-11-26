'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7d205426.js');
const common = require('./common-ee802540.js');
const utils = require('./utils-8b2c3bc1.js');
require('./consts-d8f5ef98.js');

const LOCALES_DEFAULTS = {
  label: 'More options',
};

const wppMoreButtonCss = ":host{display:-ms-inline-flexbox;display:inline-flex;--wpp-icon-color:var(--wpp-primary-color-500)}:host button{border:1px solid var(--wpp-primary-color-500);border-radius:var(--wpp-border-radius-m);background-color:transparent;height:20px;width:20px;-webkit-box-sizing:content-box;box-sizing:content-box;outline:none;overflow:hidden}:host button.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host button.tab-focus{background-color:var(--wpp-primary-color-100)}:host button.size-m{padding:10px}:host button.size-s{padding:6px}:host button:hover{cursor:pointer;background-color:var(--wpp-primary-color-100)}:host button:active,:host button.pressed{background-color:var(--wpp-primary-color-200);border:1px solid var(--wpp-primary-color-600);--wpp-icon-color:var(--wpp-primary-color-600)}:host button.disabled{border:1px solid var(--wpp-primary-color-300);background-color:var(--wpp-white-color);--wpp-icon-color:var(--wpp-primary-color-300)}:host button.disabled:hover{cursor:not-allowed;border:1px solid var(--wpp-primary-color-300);background-color:var(--wpp-white-color);--wpp-icon-color:var(--wpp-primary-color-300)}:host button.loading:hover{cursor:not-allowed;border:1px solid var(--wpp-primary-color-500);background-color:var(--wpp-white-color);--wpp-icon-color:var(--wpp-primary-color-500)}";

const WppMoreButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    // The name is set as `aria-label` in render, so `label` and `labelledby` are not passed through.
    this.getButtonAriaProps = () => utils.getAriaProps({ ...this.ariaProps, label: undefined, labelledby: undefined });
    this.hostCssClasses = () => ({
      'wpp-more-button': true,
      'wpp-disabled': this.disabled,
    });
    this.buttonCssClasses = () => ({
      button: true,
      disabled: this.disabled,
      loading: this.loading,
      'tab-focus': this.focusType === 'tab-focus',
      [`size-${this.size}`]: true,
      pressed: this.isPressed,
    });
    this.isPressed = false;
    this.focusType = undefined;
    this.validAriaProps = {};
    this.name = undefined;
    this.size = 'm';
    this.disabled = false;
    this.loading = false;
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
  get _locales() {
    return utils.mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), onBlur: this.onBlur, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, index.h("button", { ref: el => (this.buttonRef = el), class: this.buttonCssClasses(), disabled: this.disabled || this.loading, name: this.name, type: "button", "data-testid": "wpp-more-button", "aria-label": utils.getLabelledbyText(this.host, this.ariaProps?.labelledby) || this.ariaProps?.label || this._locales.label, ...this.validAriaProps }, this.loading && !this.disabled ? (index.h("wpp-spinner-v4-7-0", { size: "s" })) : (index.h("wpp-icon-more-v4-7-0", { direction: 'horizontal' })))));
  }
  static get registryIs() { return "wpp-more-button-v4-7-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "ariaProps": ["onUpdateAriaProps"]
  }; }
};
WppMoreButton.style = wppMoreButtonCss;

exports.wpp_more_button = WppMoreButton;
