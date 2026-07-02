'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-06b46408.js');
const common = require('./common-ee802540.js');
const WrappedSlot = require('./WrappedSlot-4a4ef805.js');
const WppIcon = require('./WppIcon-55327707.js');
const isEqual = require('./isEqual-c003d7ce.js');
const menuListConfig = require('./menuListConfig-205d098b.js');
const consts = require('./consts-d8f5ef98.js');
const subscribeToTheme = require('./subscribe-to-theme-1879a649.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./tippy.esm-9d703cd4.js');

const wppActionButtonCss = ":host{--ab-padding:var(--wpp-action-button-padding, 5px 8px);--ab-border-radius:var(\n    --wpp-border-radius-fully-rounded,\n    var(--wpp-action-border-radius, var(--wpp-border-radius-s))\n  );--ab-font-weight:var(--wpp-action-button-font-weight, 600);--ab-font-size:var(--wpp-action-button-font-size, 14px);--ab-line-height:var(--wpp-action-button-line-height, 22px);--ab-icon-padding:var(--wpp-action-button-icon-only-padding, 6px);--ab-bg-color:var(--wpp-action-button-bg-color, var(--wpp-btns-action-color-fill, transparent));--ab-bg-color-hover:var(--wpp-action-button-bg-color-hover, var(--wpp-grey-color-700));--ab-bg-color-active:var(--wpp-action-button-bg-color-active, var(--wpp-grey-color-800));--ab-bg-color-disabled:var(--wpp-action-button-bg-color-disabled, transparent);--ab-bg-color-loading:var(--wpp-action-button-bg-color-loading, var(--wpp-grey-color-800));--ab-bg-opacity:var(--wpp-action-button-opacity, 0);--ab-bg-opacity-hover:var(--wpp-action-button-opacity-hover, 0.12);--ab-bg-opacity-active:var(--wpp-action-button-opacity-active, 0.18);--ab-bg-opacity-disabled:var(--wpp-action-button-opacity-disabled, 0);--ab-bg-opacity-loading:var(--wpp-action-button-opacity-loading, 0.18);--ab-first-border-color-focus:var(--wpp-action-button-first-border-color-focus, var(--wpp-grey-color-000));--ab-second-border-color-focus:var(--wpp-action-button-second-border-color-focus, var(--wpp-brand-color));--ab-primary-text-color:var(--wpp-action-button-primary-text-color, var(--wpp-brand-color));--ab-primary-text-color-hover:var(--wpp-action-button-primary-text-color-hover, var(--wpp-brand-color));--ab-primary-text-color-active:var(--wpp-action-button-primary-text-color-active, var(--wpp-brand-color-active));--ab-primary-text-color-disabled:var(\n    --wpp-action-button-primary-text-color-disabled,\n    var(--wpp-brand-color-disabled)\n  );--ab-primary-icon-color:var(--wpp-action-button-primary-icon-color, var(--wpp-brand-color));--ab-primary-icon-color-hover:var(--wpp-action-button-primary-icon-color-hover, var(--wpp-brand-color));--ab-primary-icon-color-active:var(--wpp-action-button-primary-icon-color-active, var(--wpp-brand-color-active));--ab-primary-icon-color-disabled:var(\n    --wpp-action-button-primary-icon-color-disabled,\n    var(--wpp-brand-color-disabled)\n  );--ab-secondary-text-color:var(--wpp-action-button-secondary-text-color, var(--wpp-grey-color-900));--ab-secondary-text-color-hover:var(--wpp-action-button-secondary-text-color-hover, var(--wpp-grey-color-900));--ab-secondary-text-color-active:var(--wpp-action-button-secondary-text-color-active, var(--wpp-grey-color-1000));--ab-secondary-text-color-disabled:var(\n    --wpp-action-button-secondary-text-color-disabled,\n    var(--wpp-text-color-disabled)\n  );--ab-secondary-icon-color:var(--wpp-action-button-secondary-icon-color, var(--wpp-grey-color-800));--ab-secondary-icon-color-hover:var(--wpp-action-button-secondary-icon-color-hover, var(--wpp-icon-color-hover));--ab-secondary-icon-color-active:var(--wpp-action-button-secondary-icon-color-active, var(--wpp-icon-color-active));--ab-secondary-icon-color-disabled:var(\n    --wpp-action-button-secondary-icon-color-disabled,\n    var(--wpp-icon-color-disabled)\n  );--ab-inverted-text-color:var(--wpp-action-button-inverted-txt-color, var(--wpp-grey-color-000));--ab-inverted-text-color-hover:var(--wpp-action-button-inverted-txt-color-hover, var(--wpp-grey-color-000));--ab-inverted-text-color-active:var(--wpp-action-button-inverted-txt-color-active, var(--wpp-grey-color-000));--ab-inverted-text-color-disabled:var(--wpp-action-button-inverted-txt-color-disabled, var(--wpp-grey-color-500));--ab-inverted-icon-color:var(--wpp-action-button-inverted-icon-color, var(--wpp-grey-color-000));--ab-inverted-icon-color-hover:var(--wpp-action-button-inverted-icon-color-hover, var(--wpp-grey-color-000));--ab-inverted-icon-color-active:var(--wpp-action-button-inverted-icon-color-active, var(--wpp-grey-color-100));--ab-inverted-icon-color-disabled:var(--wpp-action-button-inverted-icon-color-disabled, var(--wpp-grey-color-500));--ab-inverted-bg-color:var(--wpp-action-button-inverted-bg-color, var(--wpp-grey-color-100));--ab-inverted-bg-color-hover:var(--wpp-action-button-inverted-bg-color-hover, var(--wpp-grey-color-100));--ab-inverted-bg-color-active:var(--wpp-action-button-inverted-bg-color-active, var(--wpp-grey-color-100));--ab-inverted-bg-color-disabled:var(--wpp-action-button-inverted-bg-color-disabled, transparent);--ab-inverted-bg-color-loading:var(--wpp-action-button-inverted-bg-color-loading, var(--wpp-grey-color-100));--ab-inverted-first-border-color-focus:var(\n    --wpp-action-button-inverted-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--ab-inverted-second-border-color-focus:var(\n    --wpp-action-button-inverted-second-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--ab-destructive-text-color:var(--wpp-action-button-destructive-txt-color, var(--wpp-danger-color-500));--ab-destructive-text-color-hover:var(--wpp-action-button-destructive-txt-color-hover, var(--wpp-danger-color-500));--ab-destructive-text-color-active:var(\n    --wpp-action-button-destructive-txt-color-active,\n    var(--wpp-danger-color-600)\n  );--ab-destructive-text-color-disabled:var(\n    --wpp-action-button-destructive-txt-color-disabled,\n    var(--wpp-danger-color-300)\n  );--ab-destructive-icon-color:var(--wpp-action-button-destructive-icon-color, var(--wpp-danger-color-500));--ab-destructive-icon-color-hover:var(--wpp-action-button-destructive-icon-color-hover, var(--wpp-danger-color-500));--ab-destructive-icon-color-active:var(\n    --wpp-action-button-destructive-icon-color-active,\n    var(--wpp-danger-color-600)\n  );--ab-destructive-icon-color-disabled:var(\n    --wpp-action-button-destructive-icon-color-disabled,\n    var(--wpp-danger-color-300)\n  );--ab-destructive-bg-color:var(--wpp-action-button-destructive-bg-color, transparent);--ab-destructive-bg-color-hover:var(--wpp-action-button-destructive-bg-color-hover, var(--wpp-grey-color-700));--ab-destructive-bg-color-active:var(--wpp-action-button-destructive-bg-color-active, var(--wpp-grey-color-800));--ab-destructive-bg-color-disabled:var(--wpp-action-button-destructive-bg-color-disabled, transparent);--ab-destructive-bg-color-loading:var(--wpp-action-button-destructive-bg-color-loading, var(--wpp-grey-color-800));display:-ms-inline-flexbox;display:inline-flex;outline:none;position:relative;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;vertical-align:top}:host(.wpp-disabled:active),:host(.wpp-loading:active){pointer-events:none}:host(.nowrap){white-space:nowrap}.icon-start,.icon-end{display:-ms-flexbox;display:flex}.icon-start.slot-hidden,.icon-end.slot-hidden{display:none}.icon-start{margin-right:var(--wpp-action-button-icon-start-margin, 4px)}.icon-end{margin-left:var(--wpp-action-button-icon-end-margin, 4px)}button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin:0;padding:var(--ab-padding);font-weight:var(--ab-font-weight);font-size:var(--ab-font-size);font-family:var(--wpp-font-family, system-ui, sans-serif);font-style:normal;line-height:var(--ab-line-height);background-color:var(--ab-bg-color);border:none;border-radius:var(--ab-border-radius);outline:none;z-index:1;cursor:pointer;position:relative;height:100%}button .loader{position:absolute;top:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}button .content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;opacity:1}button .content.hide{opacity:0}button.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--ab-first-border-color-focus), 0 0 0 3px var(--ab-second-border-color-focus);box-shadow:0 0 0 1px var(--ab-first-border-color-focus), 0 0 0 3px var(--ab-second-border-color-focus)}button:hover~.overlay,button.tab-focus~.overlay{background-color:var(--ab-bg-color-hover);opacity:var(--ab-bg-opacity-hover)}button:active~.overlay,button.pressed~.overlay,button[aria-expanded=true]~.overlay{background-color:var(--ab-bg-color-active);opacity:var(--ab-bg-opacity-active)}button.disabled{cursor:not-allowed}button.disabled~.overlay{background-color:var(--ab-bg-color-disabled);opacity:var(--ab-bg-opacity-disabled)}button.loading{cursor:not-allowed}button.loading~.overlay{background-color:var(--ab-bg-color-loading);opacity:var(--ab-bg-opacity-loading)}button.with-icon-only{padding:var(--ab-icon-padding)}button.with-icon-only .icon-start,button.with-icon-only .icon-end{margin:0}button.with-icon-start:not(.with-icon-only){padding-left:var(--wpp-action-button-icon-start-padding, var(--ab-icon-padding))}button.with-icon-end:not(.with-icon-only){padding-right:var(--wpp-action-button-icon-end-padding, var(--ab-icon-padding))}button.primary{color:var(--ab-primary-text-color)}button.primary .icon-start ::slotted(*),button.primary .icon-end ::slotted(*){color:var(--ab-primary-icon-color)}button.primary:hover,button.primary.tab-focus{color:var(--ab-primary-text-color-hover)}button.primary:hover .icon-start ::slotted(*),button.primary:hover .icon-end ::slotted(*),button.primary.tab-focus .icon-start ::slotted(*),button.primary.tab-focus .icon-end ::slotted(*){color:var(--ab-primary-icon-color-hover)}button.primary:active,button.primary.pressed{color:var(--ab-primary-text-color-active)}button.primary:active .icon-start ::slotted(*),button.primary:active .icon-end ::slotted(*),button.primary.pressed .icon-start ::slotted(*),button.primary.pressed .icon-end ::slotted(*){color:var(--ab-primary-icon-color-active)}button.primary.disabled{color:var(--ab-primary-text-color-disabled)}button.primary.disabled .icon-start ::slotted(*),button.primary.disabled .icon-end ::slotted(*){color:var(--ab-primary-icon-color-disabled)}button.secondary{color:var(--ab-secondary-text-color)}button.secondary .icon-start ::slotted(*),button.secondary .icon-end ::slotted(*){color:var(--ab-secondary-icon-color)}button.secondary:hover,button.secondary.tab-focus{color:var(--ab-secondary-text-color-hover)}button.secondary:hover .icon-start ::slotted(*),button.secondary:hover .icon-end ::slotted(*),button.secondary.tab-focus .icon-start ::slotted(*),button.secondary.tab-focus .icon-end ::slotted(*){color:var(--ab-secondary-icon-color-hover)}button.secondary:active,button.secondary.pressed{color:var(--ab-secondary-text-color-active)}button.secondary:active .icon-start ::slotted(*),button.secondary:active .icon-end ::slotted(*),button.secondary.pressed .icon-start ::slotted(*),button.secondary.pressed .icon-end ::slotted(*){color:var(--ab-secondary-icon-color-active)}button.secondary.disabled{color:var(--ab-secondary-text-color-disabled)}button.secondary.disabled .icon-start ::slotted(*),button.secondary.disabled .icon-end ::slotted(*){color:var(--ab-secondary-icon-color-disabled)}button.inverted{color:var(--ab-inverted-text-color)}button.inverted.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--ab-inverted-first-border-color-focus), 0 0 0 3px var(--ab-inverted-second-border-color-focus);box-shadow:0 0 0 1px var(--ab-inverted-first-border-color-focus), 0 0 0 3px var(--ab-inverted-second-border-color-focus)}button.inverted~.overlay{background-color:var(--ab-inverted-bg-color)}button.inverted .icon-start ::slotted(*),button.inverted .icon-end ::slotted(*){color:var(--ab-inverted-icon-color)}button.inverted:hover:not(.disabled):not(.loading):not(:active),button.inverted.tab-focus:not(.disabled):not(.loading):not(:active){color:var(--ab-inverted-text-color-hover)}button.inverted:hover:not(.disabled):not(.loading):not(:active)~.overlay,button.inverted.tab-focus:not(.disabled):not(.loading):not(:active)~.overlay{background-color:var(--ab-inverted-bg-color-hover)}button.inverted:hover:not(.disabled):not(.loading):not(:active) .icon-start ::slotted(*),button.inverted:hover:not(.disabled):not(.loading):not(:active) .icon-end ::slotted(*),button.inverted.tab-focus:not(.disabled):not(.loading):not(:active) .icon-start ::slotted(*),button.inverted.tab-focus:not(.disabled):not(.loading):not(:active) .icon-end ::slotted(*){color:var(--ab-inverted-icon-color-hover)}button.inverted:active,button.inverted.pressed{color:var(--ab-inverted-text-color-active)}button.inverted:active~.overlay,button.inverted.pressed~.overlay{background-color:var(--ab-inverted-bg-color-active)}button.inverted:active .icon-start ::slotted(*),button.inverted:active .icon-end ::slotted(*),button.inverted.pressed .icon-start ::slotted(*),button.inverted.pressed .icon-end ::slotted(*){color:var(--ab-inverted-icon-color-active)}button.inverted.loading~.overlay{background-color:var(--ab-inverted-bg-color-loading)}button.inverted.disabled{color:var(--ab-inverted-text-color-disabled)}button.inverted.disabled~.overlay{background-color:var(--ab-inverted-bg-color-disabled)}button.inverted.disabled .icon-start ::slotted(*),button.inverted.disabled .icon-end ::slotted(*){color:var(--ab-inverted-icon-color-disabled)}button.destructive{color:var(--ab-destructive-text-color)}button.destructive~.overlay{background-color:var(--ab-destructive-bg-color)}button.destructive .icon-start ::slotted(*),button.destructive .icon-end ::slotted(*){color:var(--ab-destructive-icon-color)}button.destructive:hover:not(.disabled):not(.loading):not(:active):not(.pressed),button.destructive.tab-focus:not(.disabled):not(.loading):not(:active):not(.pressed){color:var(--ab-destructive-text-color-hover)}button.destructive:hover:not(.disabled):not(.loading):not(:active):not(.pressed)~.overlay,button.destructive.tab-focus:not(.disabled):not(.loading):not(:active):not(.pressed)~.overlay{background-color:var(--ab-destructive-bg-color-hover)}button.destructive:hover:not(.disabled):not(.loading):not(:active):not(.pressed) .icon-start ::slotted(*),button.destructive:hover:not(.disabled):not(.loading):not(:active):not(.pressed) .icon-end ::slotted(*),button.destructive.tab-focus:not(.disabled):not(.loading):not(:active):not(.pressed) .icon-start ::slotted(*),button.destructive.tab-focus:not(.disabled):not(.loading):not(:active):not(.pressed) .icon-end ::slotted(*){color:var(--ab-destructive-icon-color-hover)}button.destructive:active,button.destructive.pressed{color:var(--ab-destructive-text-color-active)}button.destructive:active~.overlay,button.destructive.pressed~.overlay{background-color:var(--ab-destructive-bg-color-active)}button.destructive:active .icon-start ::slotted(*),button.destructive:active .icon-end ::slotted(*),button.destructive.pressed .icon-start ::slotted(*),button.destructive.pressed .icon-end ::slotted(*){color:var(--ab-destructive-icon-color-active)}button.destructive.loading~.overlay{background-color:var(--ab-destructive-bg-color-loading)}button.destructive.disabled{color:var(--ab-destructive-text-color-disabled)}button.destructive.disabled~.overlay{background-color:var(--ab-destructive-bg-color-disabled)}button.destructive.disabled .icon-start ::slotted(*),button.destructive.disabled .icon-end ::slotted(*){color:var(--ab-destructive-icon-color-disabled)}.overlay{position:absolute;width:100%;height:100%;top:0;border-radius:var(--ab-border-radius);opacity:var(--ab-bg-opacity)}";

const WppActionButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.updateSlotData = () => {
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
        start: '[slot="icon-start"]',
        end: '[slot="icon-end"]',
      });
      this.hasIconStartSlot = !emptyStates.start;
      this.hasIconEndSlot = !emptyStates.end;
      const hasSingleIcon = this.hasIconStartSlot !== this.hasIconEndSlot;
      const hasMainSlot = !emptyStates.main;
      this.isIconOnly = hasSingleIcon && !hasMainSlot;
    };
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
    this.handleClick = (e) => {
      if (this.disabled || this.loading) {
        e.stopPropagation();
        return;
      }
      if (['submit', 'reset'].includes(this.type)) {
        let formEl;
        if (this.form instanceof HTMLFormElement) {
          formEl = this.form;
        }
        else if (typeof this.form === 'string') {
          formEl = document.getElementById(this.form);
        }
        else {
          formEl = utils.closestElement('form', e.currentTarget);
        }
        if (this.type === 'submit') {
          formEl?.requestSubmit();
        }
        else {
          formEl?.reset();
        }
      }
    };
    this.onBlur = () => {
      this.focusType = common.FOCUS_TYPE.NONE;
      this.isPressed = false;
    };
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = common.FOCUS_TYPE.TAB;
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.hostCssClasses = () => ({
      'wpp-action-button': true,
      'wpp-disabled': this.disabled,
      'wpp-loading': this.loading,
    });
    this.buttonCssClasses = () => ({
      loading: this.loading,
      disabled: this.disabled,
      [`${this.variant}`]: true,
      'tab-focus': this.focusType === 'tab-focus',
      'with-icon-only': this.isIconOnly,
      'with-icon-start': this.hasIconStartSlot,
      'with-icon-end': this.hasIconEndSlot,
      pressed: this.isPressed,
    });
    this.loadingColor = () => {
      switch (this.variant) {
        case 'secondary': {
          return 'var(--wpp-grey-color-800)';
        }
        case 'inverted': {
          return 'var(--wpp-grey-color-000)';
        }
        case 'destructive': {
          return 'var(--wpp-danger-color-500)';
        }
        default: {
          return 'var(--wpp-primary-color-500)';
        }
      }
    };
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
    });
    this.iconEndCssClasses = () => ({
      'icon-end': true,
      'slot-hidden': !this.hasIconEndSlot,
    });
    this.loaderCssClasses = () => ({
      loader: true,
    });
    this.contentCssClasses = () => ({
      content: true,
      hide: this.loading,
    });
    this.hasIconStartSlot = false;
    this.hasIconEndSlot = false;
    this.isIconOnly = false;
    this.focusType = undefined;
    this.isPressed = false;
    this.validAriaProps = {};
    this.disabled = false;
    this.loading = false;
    this.variant = 'primary';
    this.autoFocus = false;
    this.name = undefined;
    this.form = undefined;
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
        this.focusType = common.FOCUS_TYPE.TAB;
      }
    }, 0);
  }
  onUpdateAriaProps() {
    this.validAriaProps = utils.getAriaProps(this.ariaProps);
  }
  onDisabledChange(newVal) {
    if (newVal) {
      // Clear pressed state when disabled to avoid lingering “active”
      this.isPressed = false;
    }
  }
  componentWillLoad() {
    this.updateSlotData();
    this.validAriaProps = utils.getAriaProps(this.ariaProps);
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), onClick: this.handleClick, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, exportparts: "button, spinner-wrapper, spinner, body, icon-start-wrapper, icon-start, icon-end-wrapper, icon-end, inner, overlay" }, index.h("button", { ref: el => (this.buttonRef = el), class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled || this.loading, value: this.value, name: this.name, type: this.type, part: "button", "data-testid": "wppActionButton", "aria-pressed": this.isPressed ? 'true' : 'false', tabindex: this.ariaProps?.tabIndex, ...this.validAriaProps }, this.loading && (index.h("div", { class: this.loaderCssClasses(), part: "spinner-wrapper" }, index.h("wpp-spinner-v4-2-0", { color: this.loadingColor(), part: "spinner" }))), index.h("div", { class: this.contentCssClasses(), part: "body" }, index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), index.h("slot", { part: "inner", onSlotchange: this.updateSlotData }), index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.iconEndCssClasses(), name: "icon-end", onSlotchange: this.updateSlotData }))), index.h("div", { class: "overlay", part: "overlay" })));
  }
  static get registryIs() { return "wpp-action-button-v4-2-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "ariaProps": ["onUpdateAriaProps"],
    "disabled": ["onDisabledChange"]
  }; }
};
WppActionButton.style = wppActionButtonCss;

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCross = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-cross", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L8.58579 10L4.29289 14.2929C3.90237 14.6834 3.90237 15.3166 4.29289 15.7071C4.68342 16.0976 5.31658 16.0976 5.70711 15.7071L10 11.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.4142 10L15.7071 5.70711C16.0976 5.31658 16.0976 4.68342 15.7071 4.29289C15.3166 3.90237 14.6834 3.90237 14.2929 4.29289L10 8.58579L5.70711 4.29289Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-cross-v4-2-0"; }
};
WppIconCross.style = wppIconCss$2;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconError = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-danger-color-400)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-error", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.6205 2.68236L17.2903 8.25996C18.2258 9.18045 18.2377 10.6847 17.3183 11.6203L11.7398 17.2904C10.8194 18.2258 9.3149 18.238 8.37946 17.3176L2.70966 11.7396C1.77419 10.8192 1.76202 9.31476 2.68236 8.37933L8.26011 2.70963C9.18053 1.77418 10.6851 1.76203 11.6205 2.68236ZM10 5.33295C10.5198 5.33295 10.9412 5.75433 10.9412 6.27413V10.98C10.9412 11.4998 10.5198 11.9212 10 11.9212C9.4802 11.9212 9.05882 11.4998 9.05882 10.98V6.27413C9.05882 5.75433 9.4802 5.33295 10 5.33295ZM10.9412 13.7647C10.9412 14.2845 10.5198 14.7059 10 14.7059C9.4802 14.7059 9.05882 14.2845 9.05882 13.7647C9.05882 13.2449 9.4802 12.8235 10 12.8235C10.5198 12.8235 10.9412 13.2449 10.9412 13.7647Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-error-v4-2-0"; }
};
WppIconError.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconWarning = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-warning-color-400)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-warning", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.83422 2.68592L1.77378 15.024C1.26617 15.9112 1.92884 17 2.97644 17H17.0978C18.1454 17 18.808 15.9112 18.3004 15.024L11.2395 2.68592C10.716 1.77136 9.35779 1.77136 8.83422 2.68592ZM10.0374 5.75C10.5552 5.74994 10.9749 6.16963 10.975 6.68739L10.9751 11.3746L9.10014 11.3749L9.09999 6.68761C9.09993 6.16984 9.51962 5.75006 10.0374 5.75ZM10.9751 11.3746C10.9751 11.8923 10.5554 12.3125 10.0376 12.3125C9.51985 12.3125 9.10013 11.8927 9.10014 11.3749L10.9751 11.3746ZM10.9746 14.1875C10.9746 14.7053 10.5549 15.125 10.0371 15.125C9.51934 15.125 9.09961 14.7053 9.09961 14.1875C9.09961 13.6697 9.51934 13.25 10.0371 13.25C10.5549 13.25 10.9746 13.6697 10.9746 14.1875Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-warning-v4-2-0"; }
};
WppIconWarning.style = wppIconCss;

const wppInternalTooltipCss = ":host{display:-ms-inline-flexbox;display:inline-flex;width:100%}.tooltip-wrapper{width:100%;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:center;justify-content:center;padding:6px 8px;border-radius:var(--wpp-border-radius-s);overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto;-moz-hyphens:auto;-ms-hyphens:auto;-webkit-box-sizing:border-box;box-sizing:border-box}.tooltip-wrapper .content-with-icon{display:-ms-flexbox;display:flex;gap:4px;-ms-flex-align:start;align-items:flex-start}.tooltip-wrapper .content-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.tooltip-wrapper .text{width:100%;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.tooltip-wrapper .header{width:100%;margin-bottom:2px;font-size:var(--wpp-typography-m-strong-font-size, 16px);line-height:var(--wpp-typography-m-strong-line-height, 24px);font-weight:var(--wpp-typography-m-strong-font-weight, 700);color:var(--wpp-typography-m-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-m-strong-letter-spacing, 0)}.tooltip-wrapper .value{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0)}.tooltip-wrapper.with-header{padding:8px 12px}.tooltip-wrapper.with-header .content-with-icon .icon-wrapper .left-icon{padding-top:2px}.tooltip-wrapper.with-value{padding:6px 12px}.tooltip-wrapper.dark{background-color:var(--wpp-text-color-info)}.tooltip-wrapper.dark .text{color:var(--wpp-grey-color-000)}.tooltip-wrapper.dark .header{color:var(--wpp-grey-color-000)}.tooltip-wrapper.dark.with-header .header{color:var(--wpp-grey-color-000)}.tooltip-wrapper.dark.with-header .text{color:var(--wpp-grey-color-100)}.tooltip-wrapper.dark.with-value .text{color:var(--wpp-grey-color-200)}.tooltip-wrapper.dark.with-value .value{color:var(--wpp-grey-color-000)}.tooltip-wrapper.dark .value{color:var(--wpp-grey-color-000)}.tooltip-wrapper.dark:not(.with-header):not(.with-value) .text{color:var(--wpp-grey-color-000)}.tooltip-wrapper.light{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--wpp-grey-color-000)}.tooltip-wrapper.light .text{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.light .header{color:var(--wpp-text-color)}.tooltip-wrapper.light.with-header .header{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.light.with-header .text{color:var(--wpp-grey-color-800)}.tooltip-wrapper.light.with-value .text{color:var(--wpp-grey-color-800)}.tooltip-wrapper.light.with-value .value{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.light .value{color:var(--wpp-text-color)}.tooltip-wrapper.light:not(.with-header):not(.with-value) .text{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.error,.tooltip-wrapper.warning{position:relative;background-color:var(--wpp-danger-color-200);-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.tooltip-wrapper.error.with-value .text,.tooltip-wrapper.warning.with-value .text{color:var(--wpp-grey-color-800)}.tooltip-wrapper.error.with-value .value,.tooltip-wrapper.warning.with-value .value{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.error .header,.tooltip-wrapper.warning .header{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.error .text,.tooltip-wrapper.warning .text{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.error.with-header .header,.tooltip-wrapper.warning.with-header .header{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.error.with-header .text,.tooltip-wrapper.warning.with-header .text{color:var(--wpp-grey-color-800)}.tooltip-wrapper.error:not(.with-header):not(.with-value) .text,.tooltip-wrapper.warning:not(.with-header):not(.with-value) .text{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.warning{background-color:var(--wpp-warning-color-200)}:host([data-wpp-theme=dark]) .tooltip-wrapper.dark:not(.warning):not(.error){background:var(--wpp-grey-color-200)}:host([data-wpp-theme=dark]) .tooltip-wrapper.dark:not(.warning):not(.error) .text{color:var(--wpp-text-color)}";

const WppTooltip$1 = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.cssClasses = () => ({
      'tooltip-wrapper': true,
      [`${this.theme}`]: true,
      'with-header': !!this.header,
      'with-value': !!this.value,
      error: this.error,
      warning: this.warning,
    });
    this.hostCssClasses = () => ({
      'wpp-internal-tooltip': true,
      [`${this.externalClass}`]: true,
    });
    this.headerCssClasses = () => ({
      header: !!this.header,
    });
    this.textCssClasses = () => ({
      text: !!this.text,
    });
    this.valueCssClasses = () => ({
      value: !!this.value,
    });
    this.getIconBasedOnProps = () => {
      if (this.error) {
        return index.h("wpp-icon-error-v4-2-0", { class: "left-icon", part: "icon-error" });
      }
      if (this.warning) {
        return index.h("wpp-icon-warning-v4-2-0", { color: "var(--wpp-warning-color-400)", class: "left-icon" });
      }
      return null;
    };
    this.getTextLines = () => {
      if (!this.text)
        return null;
      return this.text
        .trim()
        .split('\n')
        .map((line) => (index.h(index.Fragment, null, line, index.h("br", null))));
    };
    this.cssStyle = undefined;
    this.header = undefined;
    this.text = undefined;
    this.wordBreak = 'break-word';
    this.value = undefined;
    this.error = false;
    this.warning = false;
    this.theme = 'dark';
    this.externalClass = '';
    this.ariaProp = {};
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), style: this.cssStyle, exportparts: "tooltip-content" }, index.h("div", { class: this.cssClasses(), style: { wordBreak: this.wordBreak }, part: "tooltip-content" }, index.h("div", { class: "content-with-icon", id: this.ariaProp.describedby }, this.getIconBasedOnProps() && index.h("div", { class: "icon-wrapper" }, this.getIconBasedOnProps()), index.h("div", { class: "content-wrapper" }, !!this.header && (index.h("span", { class: this.headerCssClasses(), part: "header" }, this.header)), !!this.text && (index.h("span", { class: this.textCssClasses(), part: "text" }, this.getTextLines())), !!this.value && (index.h("span", { class: this.valueCssClasses(), part: "value" }, this.value)))))));
  }
  static get registryIs() { return "wpp-internal-tooltip-v4-2-0"; }
  get host() { return index.getElement(this); }
};
WppTooltip$1.style = wppInternalTooltipCss;

const wppSpinnerCss = ":host{--spinner-padding-s:var(--wpp-spinner-padding-s, 3px);--spinner-padding-m:var(--wpp-spinner-padding-m, 8px);--spinner-padding-l:var(--wpp-spinner-padding-l, 8px);display:-ms-inline-flexbox;display:inline-flex}:host(.wpp-size-s){padding:var(--spinner-padding-s)}:host(.wpp-size-m){padding:var(--spinner-padding-m)}:host(.wpp-size-l){padding:var(--spinner-padding-l)}.spinner{-webkit-animation:rotate-spinner 3s linear infinite;animation:rotate-spinner 3s linear infinite}@-webkit-keyframes spinner-s{0%{stroke-dashoffset:9.24}50%{stroke-dashoffset:43.96}100%{stroke-dashoffset:0.66}}@keyframes spinner-s{0%{stroke-dashoffset:9.24}50%{stroke-dashoffset:43.96}100%{stroke-dashoffset:0.66}}@-webkit-keyframes spinner-m{0%{stroke-dashoffset:21.12}50%{stroke-dashoffset:100.48}100%{stroke-dashoffset:0.66}}@keyframes spinner-m{0%{stroke-dashoffset:21.12}50%{stroke-dashoffset:100.48}100%{stroke-dashoffset:0.66}}@-webkit-keyframes spinner-l{0%{stroke-dashoffset:42.24}50%{stroke-dashoffset:200.96}100%{stroke-dashoffset:0.66}}@keyframes spinner-l{0%{stroke-dashoffset:42.24}50%{stroke-dashoffset:200.96}100%{stroke-dashoffset:0.66}}.spinner.size-s{width:14px;height:14px;-webkit-transform-origin:7px 7px 0;transform-origin:7px 7px 0}.spinner.size-s circle{-webkit-animation:spinner-s 3s linear infinite;animation:spinner-s 3s linear infinite;stroke-dasharray:43.96px;stroke-dashoffset:14;stroke-width:2}.spinner.size-m{width:32px;height:32px;-webkit-transform-origin:16px 16px 0;transform-origin:16px 16px 0}.spinner.size-m circle{-webkit-animation:spinner-m 3s linear infinite;animation:spinner-m 3s linear infinite;stroke-dasharray:100.48px;stroke-dashoffset:32;stroke-width:4}.spinner.size-l{width:64px;height:64px;-webkit-transform-origin:32px 32px 0;transform-origin:32px 32px 0}.spinner.size-l circle{-webkit-animation:spinner-l 3s linear infinite;animation:spinner-l 3s linear infinite;stroke-dasharray:200.96px;stroke-dashoffset:64;stroke-width:6}@-webkit-keyframes rotate-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}100%{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@keyframes rotate-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}100%{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@media (prefers-reduced-motion: reduce){:host .spinner{-webkit-animation:none !important;animation:none !important;}}";

const SPINNER_SIZES = {
  s: 7,
  m: 16,
  l: 32,
};
const SPINNER_RADIUS = {
  s: 6,
  m: 14,
  l: 29,
};
const WppSpinner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-spinner': true,
      [`wpp-size-${this.size}`]: true,
    });
    this.spinnerCssClasses = () => ({
      spinner: true,
      [`size-${this.size}`]: true,
    });
    this.color = 'var(--wpp-primary-color-500)';
    this.size = 's';
    this.ariaProps = undefined;
  }
  render() {
    const isAnnounced = this.ariaProps?.label && this.ariaProps?.label !== '';
    return (index.h(index.Host, { class: this.hostCssClasses(), role: isAnnounced ? 'status' : null, "aria-hidden": isAnnounced ? null : 'true', "aria-live": isAnnounced ? 'polite' : null, "aria-label": isAnnounced ? this.ariaProps?.label : null, exportparts: "circle" }, index.h("svg", { class: this.spinnerCssClasses(), "aria-hidden": "true", focusable: "false" }, index.h("circle", { cx: SPINNER_SIZES[this.size], cy: SPINNER_SIZES[this.size], r: SPINNER_RADIUS[this.size], fill: "transparent", stroke: this.color, "stroke-linecap": "round", part: "circle" }))));
  }
  static get registryIs() { return "wpp-spinner-v4-2-0"; }
};
WppSpinner.style = wppSpinnerCss;

const ARROW_COLORS = {
  dark: 'var(--wpp-text-color-info)',
  light: 'var(--wpp-grey-color-000)',
  error: 'var(--wpp-danger-color-200)',
  warning: 'var(--wpp-warning-color-200)',
};

const defaultTooltipConfig = {
  placement: 'top',
  offset: [0, 7.2],
  trigger: 'mouseenter focus',
  zIndex: consts.Z_INDEX.TOOLTIP,
  popperOptions: {
    modifiers: [
      {
        name: 'arrow',
        options: {
          padding: 0,
        },
      },
    ],
  },
  appendTo: () => utils.getHighestContainerInDOM(),
};

const wppTooltipCss = ":host{display:-ms-inline-flexbox;display:inline-flex;width:-webkit-fit-content}:host .anchor{display:-ms-inline-flexbox;display:inline-flex;max-width:100%}:host .content-wrapper.hidden{position:absolute;display:none}:host .tooltip-custom-content{width:100%;background-color:var(--wpp-text-color-info);padding:6px 8px;border-radius:var(--wpp-border-radius-s);overflow-wrap:break-word}:host .tooltip-custom-content.light{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--wpp-grey-color-000)}";

const WppTooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => (this.config.allowHTML ? this.customContentEl : this.contentEl), () => this.updateTippyProps({ arrow: this.arrowSVG() }));
    this.handleSlotChange = () => {
      if (this.slotRef) {
        // Get all assigned elements from the slot
        const slot = this.slotRef;
        const assignedElements = slot.assignedElements();
        this.anchorRef = assignedElements[0];
      }
    };
    this.updateTippyProps = (props) => {
      this.tippyInstance?.setProps({ ...props });
      this.tippyInstance?.popperInstance?.update();
    };
    this.arrowSVG = () => {
      const arrowSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrowSVG.setAttribute('width', '8');
      arrowSVG.setAttribute('height', '4');
      const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      arrowPath.setAttribute('fill', this.getArrowBgColor());
      arrowPath.setAttribute('fill-rule', 'evenodd');
      arrowPath.setAttribute('clip-rule', 'evenodd');
      arrowPath.setAttribute('d', 'M3.29289 0.707106C3.68342 0.316582 4.31658 0.316583 4.70711 0.707107L8 4L0 4L3.29289 0.707106Z');
      arrowSVG.appendChild(arrowPath);
      return arrowSVG;
    };
    this.createTippyInstance = () => {
      if (this.disabled) {
        return;
      }
      const content = this.config.allowHTML ? this.customContentEl : this.contentEl;
      if (this.anchorRef && content) {
        this.tippyInstance = menuListConfig.menuListConfig({
          anchor: this.anchorRef,
          content,
          triggerElementWidth: false,
          arrow: this.arrowSVG(),
          hideOnEsc: true,
          aria: {
            expanded: undefined,
          },
          ...defaultTooltipConfig,
          ...this.config,
          // Duration and Delay are not configurable,
          duration: [150, 100],
          delay: [500, 30],
          onMount(instance) {
            const referenceElement = instance.reference;
            if (!referenceElement)
              return;
            if (utils.isWppElement(referenceElement)) {
              referenceElement.ariaProps = {
                ...referenceElement.ariaProps,
                describedby: `tippy-${instance.id}`,
              };
            }
            else {
              referenceElement.setAttribute('aria-describedby', `tippy-${instance.id}`);
            }
          },
          onHide(instance) {
            const referenceElement = instance.reference;
            if (!referenceElement)
              return;
            if (utils.isWppElement(referenceElement)) {
              const { describedby, ...restProps } = referenceElement.ariaProps;
              referenceElement.ariaProps = restProps;
            }
            else {
              referenceElement.removeAttribute('aria-describedby');
            }
          },
          onShow: (instance) => {
            if (this.dropdownWidth !== 'auto') {
              instance.popper.style.width = this.dropdownWidth;
              instance.popper.style.maxWidth = this.dropdownWidth;
            }
            else {
              instance.popper.style.maxWidth = '350px';
            }
            if (this.config.onShow) {
              return this.config.onShow(instance);
            }
          },
          popperOptions: {
            strategy: 'fixed',
            ...(this.config.popperOptions || {}),
            modifiers: [
              {
                name: 'autoUpdate',
                enabled: true,
              },
              ...(this.config.popperOptions?.modifiers || []),
            ],
          },
        });
      }
    };
    this.getArrowBgColor = () => {
      const isDarkTheme = subscribeToTheme.themeObserver.getThemeAttribute() === 'dark';
      if (isDarkTheme && !this.warning && !this.error) {
        return 'var(--wpp-grey-color-200)';
      }
      const currColor = this.error ? 'error' : this.warning ? 'warning' : this.theme;
      return ARROW_COLORS[currColor];
    };
    this.hostCssClasses = () => ({
      'wpp-tooltip': true,
    });
    this.contentWrapperCssClasses = () => ({
      'content-wrapper': true,
      hidden: this.hidden || this.disabled,
    });
    this.hidden = true;
    this.style = {};
    this.disabled = false;
    this.header = undefined;
    this.text = undefined;
    this.value = undefined;
    this.error = false;
    this.warning = false;
    this.wordBreak = 'break-word';
    this.theme = 'dark';
    this.config = {};
    this.externalClass = '';
    this.dropdownWidth = 'auto';
    this.ariaProps = {};
    this.anchorTabIndex = 0;
  }
  updateConfig(newConfig, oldConfig) {
    if (!isEqual.isEqual_1(newConfig, oldConfig)) {
      this.config = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  updateTheme() {
    this.updateTippyProps({ arrow: this.arrowSVG() });
  }
  textChanged(newText, oldText) {
    if (newText !== oldText && this.contentEl) {
      const contentEl = this.contentEl;
      contentEl.text = newText;
      requestAnimationFrame(() => {
        this.tippyInstance?.setProps({
          placement: this.config.placement || 'top',
        });
        this.tippyInstance?.popperInstance?.update();
      });
    }
  }
  handleDisabledChange(newDisabled) {
    if (newDisabled) {
      if (this.tippyInstance) {
        this.tippyInstance.destroy();
        this.tippyInstance = undefined;
      }
    }
    else {
      this.createTippyInstance();
    }
  }
  componentDidLoad() {
    this.themeSubscription.start();
    setTimeout(() => {
      this.createTippyInstance();
      this.hidden = false;
    }, 0);
    if (this.config.allowHTML) {
      const content = this.host.querySelector('[slot="tooltip-content"]');
      if (content && this.customContentEl) {
        this.customContentEl.appendChild(content);
      }
    }
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.tippyInstance?.destroy();
  }
  connectedCallback() {
    this.themeSubscription.start();
    this.tippyInstance?.setProps({
      arrow: this.arrowSVG(),
    });
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  render() {
    // Use ariaProps.role if provided; otherwise for elements with aria-label,
    // use 'img' role for non-interactive content (per ARIA specs, aria-label
    // is not well-supported on a div without a valid role)
    const hasAriaLabel = Boolean(this.ariaProps?.label);
    const anchorRole = this.ariaProps?.role ?? (hasAriaLabel ? 'img' : undefined);
    return (index.h(index.Host, { class: this.hostCssClasses(), role: "presentation" }, index.h("div", { "aria-label": this.ariaProps?.label, role: anchorRole, part: "anchor", class: "anchor", ...(this.anchorTabIndex ? { tabIndex: this.anchorTabIndex } : {}) }, index.h("slot", { part: "inner", ref: (slotRef) => (this.slotRef = slotRef), onSlotchange: this.handleSlotChange })), index.h("div", { class: this.contentWrapperCssClasses() }, !this.config.allowHTML ? (index.h("wpp-internal-tooltip-v4-2-0", { cssStyle: this.style, ref: contentEl => (this.contentEl = contentEl), header: this.header, text: this.text, value: this.value, error: this.error, wordBreak: this.wordBreak, warning: this.warning, theme: this.theme, externalClass: this.externalClass, ariaProp: this.ariaProps })) : (index.h("div", { ref: customContentEl => (this.customContentEl = customContentEl), class: `tooltip-custom-content ${this.theme}`, id: this.ariaProps?.describedby })))));
  }
  static get registryIs() { return "wpp-tooltip-v4-2-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "config": ["updateConfig"],
    "theme": ["updateTheme"],
    "error": ["updateTheme"],
    "warning": ["updateTheme"],
    "text": ["textChanged"],
    "disabled": ["handleDisabledChange"]
  }; }
};
WppTooltip.style = wppTooltipCss;

const wppTypographyCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--typography-color)}:host .type-5xl{font-weight:var(--wpp-typography-5xl-display-font-weight, 600);font-size:var(--wpp-typography-5xl-display-font-size, 48px);line-height:var(--wpp-typography-5xl-display-line-height, 62px);letter-spacing:var(--wpp-typography-5xl-display-letter-spacing, 0px);font-family:var(--wpp-typography-5xl-display-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-5xl-display-light{font-weight:400}:host .wpp-typography-5xl-display-strong{font-weight:700}:host .type-4xl{font-weight:var(--wpp-typography-4xl-display-font-weight, 600);font-size:var(--wpp-typography-4xl-display-font-size, 36px);line-height:var(--wpp-typography-4xl-display-line-height, 48px);letter-spacing:var(--wpp-typography-4xl-display-letter-spacing, 0px);font-family:var(--wpp-typography-4xl-display-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-4xl-display-light{font-weight:400}:host .wpp-typography-4xl-display-strong{font-weight:700}:host .type-3xl{font-weight:var(--wpp-typography-3xl-heading-font-weight, 600);font-size:var(--wpp-typography-3xl-heading-font-size, 28px);line-height:var(--wpp-typography-3xl-heading-line-height, 40px);letter-spacing:var(--wpp-typography-3xl-heading-letter-spacing, 0px);font-family:var(--wpp-typography-3xl-heading-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-3xl-display-light{font-weight:400}:host .wpp-typography-3xl-display-strong{font-weight:700}:host .type-2xl{font-weight:var(--wpp-typography-2xl-heading-font-weight, 600);font-size:var(--wpp-typography-2xl-heading-font-size, 24px);line-height:var(--wpp-typography-2xl-heading-line-height, 32px);letter-spacing:var(--wpp-typography-2xl-heading-letter-spacing, 0px);font-family:var(--wpp-typography-2xl-heading-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-2xl-display-light{font-weight:400}:host .wpp-typography-2xl-display-strong{font-weight:700}:host .type-xl{font-weight:var(--wpp-typography-xl-heading-font-weight, 600);font-size:var(--wpp-typography-xl-heading-font-size, 20px);line-height:var(--wpp-typography-xl-heading-line-height, 32px);letter-spacing:var(--wpp-typography-xl-heading-letter-spacing, 0px);font-family:var(--wpp-typography-xl-heading-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-xl-display-light{font-weight:400}:host .wpp-typography-xl-display-strong{font-weight:700}:host .wpp-typography-l-body,:host .wpp-typography-l-emphasis,:host .wpp-typography-l-light{font-weight:var(--wpp-typography-l-body-font-weight, 400);font-size:var(--wpp-typography-l-body-font-size, 18px);line-height:var(--wpp-typography-l-body-line-height, 28px);letter-spacing:var(--wpp-typography-l-body-letter-spacing, 0px);font-family:var(--wpp-typography-l-body-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-l-midi{font-weight:var(--wpp-typography-l-midi-font-weight, 500);font-size:var(--wpp-typography-l-midi-font-size, 18px);line-height:var(--wpp-typography-l-midi-line-height, 28px);letter-spacing:var(--wpp-typography-l-midi-letter-spacing, 0px);font-family:var(--wpp-typography-l-midi-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-l-strong{font-weight:var(--wpp-typography-l-strong-font-weight, 600);font-size:var(--wpp-typography-l-strong-font-size, 18px);line-height:var(--wpp-typography-l-strong-line-height, 28px);letter-spacing:var(--wpp-typography-l-strong-letter-spacing, 0px);font-family:var(--wpp-typography-l-strong-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-l-light{font-weight:300}:host .wpp-typography-m-body,:host .wpp-typography-m-emphasis,:host .wpp-typography-m-light{font-weight:var(--wpp-typography-m-body-font-weight, 400);font-size:var(--wpp-typography-m-body-font-size, 16px);line-height:var(--wpp-typography-m-body-line-height, 24px);letter-spacing:var(--wpp-typography-m-body-letter-spacing, 0px);font-family:var(--wpp-typography-m-body-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-m-midi{font-weight:var(--wpp-typography-m-midi-font-weight, 500);font-size:var(--wpp-typography-m-midi-font-size, 16px);line-height:var(--wpp-typography-m-midi-line-height, 24px);letter-spacing:var(--wpp-typography-m-midi-letter-spacing, 0px);font-family:var(--wpp-typography-m-midi-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-m-strong{font-weight:var(--wpp-typography-m-strong-font-weight, 600);font-size:var(--wpp-typography-m-strong-font-size, 16px);line-height:var(--wpp-typography-m-strong-line-height, 24px);letter-spacing:var(--wpp-typography-m-strong-letter-spacing, 0px);font-family:var(--wpp-typography-m-strong-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-m-light{font-weight:300}:host .wpp-typography-s-body,:host .wpp-typography-s-emphasis,:host .wpp-typography-s-light{font-weight:var(--wpp-typography-s-body-font-weight, 400);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-s-midi{font-weight:var(--wpp-typography-s-midi-font-weight, 500);font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-s-strong{font-weight:var(--wpp-typography-s-strong-font-weight, 600);font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-s-light{font-weight:300}:host .wpp-typography-xs-body,:host .wpp-typography-xs-emphasis,:host .wpp-typography-xs-light{font-weight:var(--wpp-typography-xs-body-font-weight, 400);font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0px);font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-xs-midi{font-weight:var(--wpp-typography-xs-midi-font-weight, 500);font-size:var(--wpp-typography-xs-midi-font-size, 12px);line-height:var(--wpp-typography-xs-midi-line-height, 20px);letter-spacing:var(--wpp-typography-xs-midi-letter-spacing, 0px);font-family:var(--wpp-typography-xs-midi-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-xs-strong{font-weight:var(--wpp-typography-xs-strong-font-weight, 600);font-size:var(--wpp-typography-xs-strong-font-size, 12px);line-height:var(--wpp-typography-xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-xs-strong-letter-spacing, 0px);font-family:var(--wpp-typography-xs-strong-font-family, var(--wpp-font-family, system-ui, sans-serif))}:host .wpp-typography-xs-light{font-weight:300}:host .wpp-typography-2xs-strong{font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 5%);font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));text-transform:uppercase}:host .italic{padding-right:0.12em;font-style:italic}.typography{margin:0;overflow:hidden;text-overflow:ellipsis;color:currentcolor}";

const WppTypography = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.typographyCssClasses = () => ({
      typography: true,
      italic: this.type.includes('emphasis'),
      [`type-${this.type.split('-')[0]}`]: this.type.includes('xl'),
      [`wpp-typography-${this.type}`]: true,
    });
    this.type = 'm-body';
    this.tag = 'span';
    this.color = 'var(--wpp-text-color)';
  }
  render() {
    const TypographyTag = this.tag;
    return (index.h(index.Host, { class: "wpp-typography", exportparts: "typography, inner", style: { '--typography-color': this.color } }, index.h(TypographyTag, { class: this.typographyCssClasses(), part: "typography", exportparts: "typography" }, index.h("slot", { part: "inner" }))));
  }
  static get registryIs() { return "wpp-typography-v4-2-0"; }
  get host() { return index.getElement(this); }
};
WppTypography.style = wppTypographyCss;

exports.wpp_action_button = WppActionButton;
exports.wpp_icon_cross = WppIconCross;
exports.wpp_icon_error = WppIconError;
exports.wpp_icon_warning = WppIconWarning;
exports.wpp_internal_tooltip = WppTooltip$1;
exports.wpp_spinner = WppSpinner;
exports.wpp_tooltip = WppTooltip;
exports.wpp_typography = WppTypography;
