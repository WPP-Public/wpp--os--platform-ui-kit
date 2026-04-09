import { r as registerInstance, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { h as hasShadowDom, y as getAriaProps } from './utils-45d1949f.js';
import { F as FOCUS_TYPE } from './common-69c8ea89.js';
import { W as WrappedSlot } from './WrappedSlot-629d3e4f.js';
import './consts-9fc0a13a.js';

const wppFloatingButtonCss = ":host{--fb-width:var(--wpp-fb-width, 40px);--fb-height:var(--wpp-fb-heigth, 40px);--fb-border-radius:var(--wpp-fb-border-radius, 50%);--fb-box-shadow:var(--wpp-fb-box-shadow, var(--wpp-box-shadow-brand));--fb-first-border-color-focus:var(--wpp-fb-first-border-color-focus, var(--wpp-grey-color-000));--fb-second-border-color-focus:var(--wpp-fb-second-border-color-focus, var(--wpp-brand-color));--fb-primary-bg-color:var(--wpp-fb-primary-bg-color, var(--wpp-brand-color));--fb-primary-bg-color-hover:var(--wpp-fb-primary-bg-color-hover, var(--wpp-brand-color-hover));--fb-primary-bg-color-active:var(--wpp-fb-primary-bg-color-active, var(--wpp-brand-color-active));--fb-primary-bg-color-disabled:var(--wpp-fb-primary-bg-color-disabled, var(--wpp-brand-color-disabled));--fb-primary-text-color:var(--wpp-fb-primary-text-color, var(--wpp-grey-color-000));--fb-primary-icon-color:var(--wpp-fb-primary-icon-color, var(--wpp-grey-color-000));display:-ms-inline-flexbox;display:inline-flex;outline:none}:host(.wpp-disabled:active),:host(.wpp-loading:active){pointer-events:none}.button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:var(--fb-width);height:var(--fb-height);margin:0;border-radius:var(--fb-border-radius);font-style:normal;line-height:var(--button-line-height);text-decoration:none;border:none;outline:0;cursor:pointer;position:relative;-webkit-box-shadow:var(--fb-box-shadow);box-shadow:var(--fb-box-shadow)}.button.tab-focus{border-radius:var(--fb-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--fb-first-border-color-focus), 0 0 0 3px var(--fb-second-border-color-focus);box-shadow:0 0 0 1px var(--fb-first-border-color-focus), 0 0 0 3px var(--fb-second-border-color-focus);background-color:var(--fb-primary-bg-color-hover)}.button .content{overflow:hidden}.button .content .icon-plus{color:var(--fb-primary-icon-color)}.button .content.icon ::slotted(*){color:var(--fb-primary-icon-color)}.button .loader{position:absolute;top:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.button .content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;opacity:1}.button .content.hide{opacity:0}.button.disabled{cursor:not-allowed}.button.loading{cursor:not-allowed}.button.primary{color:var(--fb-primary-text-color);background-color:var(--fb-primary-bg-color)}.button.primary .icon-start ::slotted(*),.button.primary .icon-end ::slotted(*){color:var(--fb-primary-icon-color)}.button.primary.tab-focus,.button.primary:hover{background-color:var(--fb-primary-bg-color-hover)}.button.primary:active,.button.primary.pressed{background-color:var(--fb-primary-bg-color-active)}.button.primary:disabled{background-color:var(--fb-primary-bg-color-disabled)}.button.primary.loading{background-color:var(--fb-primary-bg-color)}";

const WppFloatingButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    this.handleClick = (ev) => {
      if (this.disabled || this.loading) {
        ev.stopPropagation();
        return;
      }
      if (hasShadowDom(this.host)) {
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
    return (h(Host, { class: this.hostCssClasses(), onClick: this.handleClick, exportparts: "button, spinner-wrapper, spinner, icon-plus, ws-wrapper, ws-inner", onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, h("button", { ref: el => (this.buttonRef = el), class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled || this.loading, form: this.form, formAction: this.formAction, formEncType: this.formEncType, formMethod: this.formMethod, formNoValidate: this.formNoValidate, formTarget: this.formTarget, value: this.value, name: this.name, type: this.type, "data-testid": "wppFloatingButton", "aria-pressed": this.isPressed ? 'true' : 'false', ...this.validAriaProps, part: "button" }, this.loading && (h("div", { class: this.loaderCssClasses(), part: "spinner-wrapper" }, h("wpp-spinner-v4-0-0", { color: 'var(--wpp-grey-color-000)', part: "spinner" }))), h(WrappedSlot, { wrapperClass: this.contentCssClasses() }, h("wpp-icon-plus-v4-0-0", { class: "icon-plus", part: "icon-plus" })))));
  }
  static get registryIs() { return "wpp-floating-button-v4-0-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "ariaProps": ["onUpdateAriaProps"]
  }; }
};
WppFloatingButton.style = wppFloatingButtonCss;

export { WppFloatingButton as wpp_floating_button };
