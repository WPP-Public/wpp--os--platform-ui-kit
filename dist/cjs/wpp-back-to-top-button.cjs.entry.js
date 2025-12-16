'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-99b83069.js');
const common = require('./common-ee802540.js');
require('./consts-779fd4ec.js');

const wppBackToTopButtonCss = ":host{--bttb-width:var(--wpp-back-to-top-button-width, 40px);--bttb-height:var(--wpp-back-to-top-button-height, 40px);--bttb-border-radius:var(--wpp-back-to-top-button-border-radius, var(--wpp-border-radius-round));--bttb-box-shadow:var(--wpp-back-to-top-button-box-shadow, var(--wpp-box-shadow-m));--bttb-border-width:var(--wpp-back-to-top-button-border-width, var(--wpp-border-width-s));--bttb-border-style:var(--wpp-back-to-top-button-border-style, solid);--bttb-border-color:var(--wpp-back-to-top-button-border-color, var(--wpp-grey-color-500));--bttb-border-color-hover:var(--wpp-back-to-top-button-border-color-hover, var(--wpp-grey-color-700));--bttb-border-color-active:var(--wpp-back-to-top-button-border-color-active, var(--wpp-grey-color-800));--bttb-first-border-color-focus:var(--wpp-back-to-top-button-first-border-color-focus, var(--wpp-grey-color-000));--bttb-second-border-color-focus:var(--wpp-back-to-top-button-second-border-color-focus, var(--wpp-brand-color));--bttb-bg-color:var(--wpp--back-to-top-button-bg-color, var(--wpp-grey-color-000));--bttb-bg-color-hover:var(--wpp--back-to-top-button-bg-color-hover, var(--wpp-grey-color-200));--bttb-bg-color-active:var(--wpp--wpp--back-to-top-button-bg-color-active, var(--wpp-grey-color-300));--bttb-icon-color:var(--wpp--back-to-top-button-icon-color, var(--wpp-primary-color-800));--bttb-icon-color-hover:var(--wpp--back-to-top-button-icon-color-hover, var(--wpp-primary-color-800));--bttb-icon-color-active:var(--wpp--back-to-top-button-icon-color-active, var(--wpp-primary-color-800));display:-ms-inline-flexbox;display:inline-flex;outline:none}:host button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:var(--bttb-width);height:var(--bttb-height);margin:0;border-radius:var(--bttb-border-radius);text-decoration:none;border:var(--bttb-border-width) var(--bttb-border-style) var(--bttb-border-color);outline:0;cursor:pointer;-webkit-box-shadow:var(--bttb-box-shadow);box-shadow:var(--bttb-box-shadow);background-color:var(--bttb-bg-color)}:host button.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--bttb-first-border-color-focus), 0 0 0 3px var(--bttb-second-border-color-focus);box-shadow:0 0 0 1px var(--bttb-first-border-color-focus), 0 0 0 3px var(--bttb-second-border-color-focus);border-color:var(--bttb-border-color-hover);background-color:var(--bttb-bg-color-hover)}:host button .icon{color:var(--bttb-icon-color)}:host button:hover{background-color:var(--bttb-bg-color-hover);border-color:var(--bttb-border-color-hover)}:host button:hover .icon{color:var(--bttb-icon-color-hover)}:host button:active,:host button.pressed{background-color:var(--bttb-bg-color-active);border-color:var(--bttb-border-color-active)}:host button:active .icon,:host button.pressed .icon{color:var(--bttb-icon-color-active)}";

const WppBackToTopButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onKeyDown = (event) => {
      if (this.focusType === common.FOCUS_TYPE.NONE)
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
      'wpp-back-to-top-button': true,
    });
    this.buttonCssClasses = () => ({
      'tab-focus': this.focusType === 'tab-focus',
      pressed: this.isPressed,
    });
    this.focusType = undefined;
    this.isPressed = false;
    this.validAriaProps = {};
    this.ariaProps = {
      label: 'Back to top',
    };
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
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "button, icon", onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, index.h("button", { ref: el => (this.buttonRef = el), onBlur: this.onBlur, class: this.buttonCssClasses(), type: "button", part: "button", "data-testid": "wppBackToTopButton", "aria-pressed": this.isPressed ? 'true' : 'false', ...this.validAriaProps }, index.h("wpp-icon-arrow-v3-4-0", { direction: "top", class: "icon", part: "icon" }))));
  }
  static get registryIs() { return "wpp-back-to-top-button-v3-4-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "ariaProps": ["onUpdateAriaProps"]
  }; }
};
WppBackToTopButton.style = wppBackToTopButtonCss;

exports.wpp_back_to_top_button = WppBackToTopButton;
