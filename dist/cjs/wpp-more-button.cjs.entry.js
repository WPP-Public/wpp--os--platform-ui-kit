'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const common = require('./common-ee802540.js');
const utils = require('./utils-15defa44.js');
require('./consts-dba6e6dd.js');

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
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
    };
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
    this.validAriaProps = utils.getAriaProps(this.ariaProps);
  }
  componentWillLoad() {
    this.validAriaProps = utils.getAriaProps(this.ariaProps);
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, index.h("button", { class: this.buttonCssClasses(), disabled: this.disabled || this.loading, name: this.name, type: "button", "data-testid": "wpp-more-button", "aria-pressed": this.isPressed, ...this.validAriaProps }, this.loading && !this.disabled ? (index.h("wpp-spinner-v4-0-0", { size: "s" })) : (index.h("wpp-icon-more-v4-0-0", { direction: 'horizontal' })))));
  }
  static get registryIs() { return "wpp-more-button-v4-0-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "ariaProps": ["onUpdateAriaProps"]
  }; }
};
WppMoreButton.style = wppMoreButtonCss;

exports.wpp_more_button = WppMoreButton;
