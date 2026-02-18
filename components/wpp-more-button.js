import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { x as getAriaProps } from './utils.js';
import { d as defineCustomElement$3 } from './wpp-icon-more2.js';
import { d as defineCustomElement$2 } from './wpp-spinner2.js';

const wppMoreButtonCss = ":host{display:-ms-inline-flexbox;display:inline-flex;--wpp-icon-color:var(--wpp-primary-color-500)}:host button{border:1px solid var(--wpp-primary-color-500);border-radius:var(--wpp-border-radius-m);background-color:var(--wpp-white-color);height:20px;width:20px;-webkit-box-sizing:content-box;box-sizing:content-box;outline:none;overflow:hidden}:host button.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host button.tab-focus{background-color:var(--wpp-primary-color-100)}:host button.size-m{padding:10px}:host button.size-s{padding:6px}:host button:hover{cursor:pointer;background-color:var(--wpp-primary-color-100)}:host button:active,:host button.pressed{background-color:var(--wpp-primary-color-200);border:1px solid var(--wpp-primary-color-600);--wpp-icon-color:var(--wpp-primary-color-600)}:host button.disabled{border:1px solid var(--wpp-primary-color-300);background-color:var(--wpp-white-color);--wpp-icon-color:var(--wpp-primary-color-300)}:host button.disabled:hover{cursor:not-allowed;border:1px solid var(--wpp-primary-color-300);background-color:var(--wpp-white-color);--wpp-icon-color:var(--wpp-primary-color-300)}:host button.loading:hover{cursor:not-allowed;border:1px solid var(--wpp-primary-color-500);background-color:var(--wpp-white-color);--wpp-icon-color:var(--wpp-primary-color-500)}";

const WppMoreButton$1 = /*@__PURE__*/ proxyCustomElement(class WppMoreButton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
        this.focusType = FOCUS_TYPE.TAB;
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.onBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
      this.isPressed = false;
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
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
        this.focusType = FOCUS_TYPE.TAB;
      }
    }, 0);
  }
  onUpdateAriaProps() {
    this.validAriaProps = getAriaProps(this.ariaProps);
  }
  componentWillLoad() {
    this.validAriaProps = getAriaProps(this.ariaProps);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, h("button", { class: this.buttonCssClasses(), disabled: this.disabled || this.loading, name: this.name, type: "button", "data-testid": "wpp-more-button", "aria-pressed": this.isPressed, ...this.validAriaProps }, this.loading && !this.disabled ? (h("wpp-spinner-v3-5-0", { size: "s" })) : (h("wpp-icon-more-v3-5-0", { direction: 'horizontal' })))));
  }
  static get registryIs() { return "wpp-more-button-v3-5-0"; }
  get host() { return this; }
  static get watchers() { return {
    "ariaProps": ["onUpdateAriaProps"]
  }; }
  static get style() { return wppMoreButtonCss; }
}, [1, "wpp-more-button", "wpp-more-button-v3-5-0", {
    "name": [1],
    "size": [513],
    "disabled": [516],
    "loading": [516],
    "ariaProps": [16],
    "isPressed": [32],
    "focusType": [32],
    "validAriaProps": [32],
    "setFocus": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-more-button-v3-5-0", "wpp-icon-more-v3-5-0", "wpp-spinner-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-more-button-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppMoreButton$1);
      }
      break;
    case "wpp-icon-more-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-spinner-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppMoreButton = WppMoreButton$1;
const defineCustomElement = defineCustomElement$1;

export { WppMoreButton, defineCustomElement };
