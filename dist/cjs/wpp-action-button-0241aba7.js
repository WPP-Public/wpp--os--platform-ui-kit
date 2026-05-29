'use strict';

const index = require('./index-ecf423ba.js');
const utils = require('./utils-2231f97a.js');
const common = require('./common-ee802540.js');
const WrappedSlot = require('./WrappedSlot-4a4ef805.js');

const wppActionButtonCss = ":host{--ab-padding:var(--wpp-action-button-padding, 5px 8px);--ab-border-radius:var(\n    --wpp-border-radius-fully-rounded,\n    var(--wpp-action-border-radius, var(--wpp-border-radius-s))\n  );--ab-font-weight:var(--wpp-action-button-font-weight, 600);--ab-font-size:var(--wpp-action-button-font-size, 14px);--ab-line-height:var(--wpp-action-button-line-height, 22px);--ab-icon-padding:var(--wpp-action-button-icon-only-padding, 6px);--ab-bg-color:var(--wpp-action-button-bg-color, var(--wpp-btns-action-color-fill, transparent));--ab-bg-color-hover:var(--wpp-action-button-bg-color-hover, var(--wpp-grey-color-700));--ab-bg-color-active:var(--wpp-action-button-bg-color-active, var(--wpp-grey-color-800));--ab-bg-color-disabled:var(--wpp-action-button-bg-color-disabled, transparent);--ab-bg-color-loading:var(--wpp-action-button-bg-color-loading, var(--wpp-grey-color-800));--ab-bg-opacity:var(--wpp-action-button-opacity, 0);--ab-bg-opacity-hover:var(--wpp-action-button-opacity-hover, 0.12);--ab-bg-opacity-active:var(--wpp-action-button-opacity-active, 0.18);--ab-bg-opacity-disabled:var(--wpp-action-button-opacity-disabled, 0);--ab-bg-opacity-loading:var(--wpp-action-button-opacity-loading, 0.18);--ab-first-border-color-focus:var(--wpp-action-button-first-border-color-focus, var(--wpp-grey-color-000));--ab-second-border-color-focus:var(--wpp-action-button-second-border-color-focus, var(--wpp-brand-color));--ab-primary-text-color:var(--wpp-action-button-primary-text-color, var(--wpp-brand-color));--ab-primary-text-color-hover:var(--wpp-action-button-primary-text-color-hover, var(--wpp-brand-color));--ab-primary-text-color-active:var(--wpp-action-button-primary-text-color-active, var(--wpp-brand-color-active));--ab-primary-text-color-disabled:var(\n    --wpp-action-button-primary-text-color-disabled,\n    var(--wpp-brand-color-disabled)\n  );--ab-primary-icon-color:var(--wpp-action-button-primary-icon-color, var(--wpp-brand-color));--ab-primary-icon-color-hover:var(--wpp-action-button-primary-icon-color-hover, var(--wpp-brand-color));--ab-primary-icon-color-active:var(--wpp-action-button-primary-icon-color-active, var(--wpp-brand-color-active));--ab-primary-icon-color-disabled:var(\n    --wpp-action-button-primary-icon-color-disabled,\n    var(--wpp-brand-color-disabled)\n  );--ab-secondary-text-color:var(--wpp-action-button-secondary-text-color, var(--wpp-grey-color-900));--ab-secondary-text-color-hover:var(--wpp-action-button-secondary-text-color-hover, var(--wpp-grey-color-900));--ab-secondary-text-color-active:var(--wpp-action-button-secondary-text-color-active, var(--wpp-grey-color-1000));--ab-secondary-text-color-disabled:var(\n    --wpp-action-button-secondary-text-color-disabled,\n    var(--wpp-text-color-disabled)\n  );--ab-secondary-icon-color:var(--wpp-action-button-secondary-icon-color, var(--wpp-grey-color-800));--ab-secondary-icon-color-hover:var(--wpp-action-button-secondary-icon-color-hover, var(--wpp-icon-color-hover));--ab-secondary-icon-color-active:var(--wpp-action-button-secondary-icon-color-active, var(--wpp-icon-color-active));--ab-secondary-icon-color-disabled:var(\n    --wpp-action-button-secondary-icon-color-disabled,\n    var(--wpp-icon-color-disabled)\n  );--ab-inverted-text-color:var(--wpp-action-button-inverted-txt-color, var(--wpp-grey-color-000));--ab-inverted-text-color-hover:var(--wpp-action-button-inverted-txt-color-hover, var(--wpp-grey-color-000));--ab-inverted-text-color-active:var(--wpp-action-button-inverted-txt-color-active, var(--wpp-grey-color-000));--ab-inverted-text-color-disabled:var(--wpp-action-button-inverted-txt-color-disabled, var(--wpp-grey-color-500));--ab-inverted-icon-color:var(--wpp-action-button-inverted-icon-color, var(--wpp-grey-color-000));--ab-inverted-icon-color-hover:var(--wpp-action-button-inverted-icon-color-hover, var(--wpp-grey-color-000));--ab-inverted-icon-color-active:var(--wpp-action-button-inverted-icon-color-active, var(--wpp-grey-color-100));--ab-inverted-icon-color-disabled:var(--wpp-action-button-inverted-icon-color-disabled, var(--wpp-grey-color-500));--ab-inverted-bg-color:var(--wpp-action-button-inverted-bg-color, var(--wpp-grey-color-100));--ab-inverted-bg-color-hover:var(--wpp-action-button-inverted-bg-color-hover, var(--wpp-grey-color-100));--ab-inverted-bg-color-active:var(--wpp-action-button-inverted-bg-color-active, var(--wpp-grey-color-100));--ab-inverted-bg-color-disabled:var(--wpp-action-button-inverted-bg-color-disabled, transparent);--ab-inverted-bg-color-loading:var(--wpp-action-button-inverted-bg-color-loading, var(--wpp-grey-color-100));--ab-inverted-first-border-color-focus:var(\n    --wpp-action-button-inverted-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--ab-inverted-second-border-color-focus:var(\n    --wpp-action-button-inverted-second-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--ab-destructive-text-color:var(--wpp-action-button-destructive-txt-color, var(--wpp-danger-color-500));--ab-destructive-text-color-hover:var(--wpp-action-button-destructive-txt-color-hover, var(--wpp-danger-color-500));--ab-destructive-text-color-active:var(\n    --wpp-action-button-destructive-txt-color-active,\n    var(--wpp-danger-color-600)\n  );--ab-destructive-text-color-disabled:var(\n    --wpp-action-button-destructive-txt-color-disabled,\n    var(--wpp-danger-color-300)\n  );--ab-destructive-icon-color:var(--wpp-action-button-destructive-icon-color, var(--wpp-danger-color-500));--ab-destructive-icon-color-hover:var(--wpp-action-button-destructive-icon-color-hover, var(--wpp-danger-color-500));--ab-destructive-icon-color-active:var(\n    --wpp-action-button-destructive-icon-color-active,\n    var(--wpp-danger-color-600)\n  );--ab-destructive-icon-color-disabled:var(\n    --wpp-action-button-destructive-icon-color-disabled,\n    var(--wpp-danger-color-300)\n  );--ab-destructive-bg-color:var(--wpp-action-button-destructive-bg-color, transparent);--ab-destructive-bg-color-hover:var(--wpp-action-button-destructive-bg-color-hover, var(--wpp-grey-color-700));--ab-destructive-bg-color-active:var(--wpp-action-button-destructive-bg-color-active, var(--wpp-grey-color-800));--ab-destructive-bg-color-disabled:var(--wpp-action-button-destructive-bg-color-disabled, transparent);--ab-destructive-bg-color-loading:var(--wpp-action-button-destructive-bg-color-loading, var(--wpp-grey-color-800));display:-ms-inline-flexbox;display:inline-flex;outline:none;position:relative;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;vertical-align:top}:host(.wpp-disabled:active),:host(.wpp-loading:active){pointer-events:none}:host(.nowrap){white-space:nowrap}.icon-start,.icon-end{display:-ms-flexbox;display:flex}.icon-start.slot-hidden,.icon-end.slot-hidden{display:none}.icon-start{margin-right:4px}.icon-end{margin-left:4px}button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin:0;padding:var(--ab-padding);font-weight:var(--ab-font-weight);font-size:var(--ab-font-size);font-family:var(--wpp-font-family);font-style:normal;line-height:var(--ab-line-height);background-color:var(--ab-bg-color);border:none;border-radius:var(--ab-border-radius);outline:none;z-index:1;cursor:pointer;position:relative;height:100%}button .loader{position:absolute;top:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}button .content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;opacity:1}button .content.hide{opacity:0}button.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--ab-first-border-color-focus), 0 0 0 3px var(--ab-second-border-color-focus);box-shadow:0 0 0 1px var(--ab-first-border-color-focus), 0 0 0 3px var(--ab-second-border-color-focus)}button:hover~.overlay,button.tab-focus~.overlay{background-color:var(--ab-bg-color-hover);opacity:var(--ab-bg-opacity-hover)}button:active~.overlay,button.pressed~.overlay{background-color:var(--ab-bg-color-active);opacity:var(--ab-bg-opacity-active)}button.disabled{cursor:not-allowed}button.disabled~.overlay{background-color:var(--ab-bg-color-disabled);opacity:var(--ab-bg-opacity-disabled)}button.loading{cursor:not-allowed}button.loading~.overlay{background-color:var(--ab-bg-color-loading);opacity:var(--ab-bg-opacity-loading)}button.with-icon-only{padding:var(--ab-icon-padding)}button.with-icon-only .icon-start,button.with-icon-only .icon-end{margin:0}button.with-icon-start:not(.with-icon-only){padding-left:var(--ab-icon-padding)}button.with-icon-end:not(.with-icon-only){padding-right:var(--ab-icon-padding)}button.primary{color:var(--ab-primary-text-color)}button.primary .icon-start ::slotted(*),button.primary .icon-end ::slotted(*){color:var(--ab-primary-icon-color)}button.primary:hover,button.primary.tab-focus{color:var(--ab-primary-text-color-hover)}button.primary:hover .icon-start ::slotted(*),button.primary:hover .icon-end ::slotted(*),button.primary.tab-focus .icon-start ::slotted(*),button.primary.tab-focus .icon-end ::slotted(*){color:var(--ab-primary-icon-color-hover)}button.primary:active,button.primary.pressed{color:var(--ab-primary-text-color-active)}button.primary:active .icon-start ::slotted(*),button.primary:active .icon-end ::slotted(*),button.primary.pressed .icon-start ::slotted(*),button.primary.pressed .icon-end ::slotted(*){color:var(--ab-primary-icon-color-active)}button.primary.disabled{color:var(--ab-primary-text-color-disabled)}button.primary.disabled .icon-start ::slotted(*),button.primary.disabled .icon-end ::slotted(*){color:var(--ab-primary-icon-color-disabled)}button.secondary{color:var(--ab-secondary-text-color)}button.secondary .icon-start ::slotted(*),button.secondary .icon-end ::slotted(*){color:var(--ab-secondary-icon-color)}button.secondary:hover,button.secondary.tab-focus{color:var(--ab-secondary-text-color-hover)}button.secondary:hover .icon-start ::slotted(*),button.secondary:hover .icon-end ::slotted(*),button.secondary.tab-focus .icon-start ::slotted(*),button.secondary.tab-focus .icon-end ::slotted(*){color:var(--ab-secondary-icon-color-hover)}button.secondary:active,button.secondary.pressed{color:var(--ab-secondary-text-color-active)}button.secondary:active .icon-start ::slotted(*),button.secondary:active .icon-end ::slotted(*),button.secondary.pressed .icon-start ::slotted(*),button.secondary.pressed .icon-end ::slotted(*){color:var(--ab-secondary-icon-color-active)}button.secondary.disabled{color:var(--ab-secondary-text-color-disabled)}button.secondary.disabled .icon-start ::slotted(*),button.secondary.disabled .icon-end ::slotted(*){color:var(--ab-secondary-icon-color-disabled)}button.inverted{color:var(--ab-inverted-text-color)}button.inverted.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--ab-inverted-first-border-color-focus), 0 0 0 3px var(--ab-inverted-second-border-color-focus);box-shadow:0 0 0 1px var(--ab-inverted-first-border-color-focus), 0 0 0 3px var(--ab-inverted-second-border-color-focus)}button.inverted~.overlay{background-color:var(--ab-inverted-bg-color)}button.inverted .icon-start ::slotted(*),button.inverted .icon-end ::slotted(*){color:var(--ab-inverted-icon-color)}button.inverted:hover:not(.disabled):not(.loading):not(:active),button.inverted.tab-focus:not(.disabled):not(.loading):not(:active){color:var(--ab-inverted-text-color-hover)}button.inverted:hover:not(.disabled):not(.loading):not(:active)~.overlay,button.inverted.tab-focus:not(.disabled):not(.loading):not(:active)~.overlay{background-color:var(--ab-inverted-bg-color-hover)}button.inverted:hover:not(.disabled):not(.loading):not(:active) .icon-start ::slotted(*),button.inverted:hover:not(.disabled):not(.loading):not(:active) .icon-end ::slotted(*),button.inverted.tab-focus:not(.disabled):not(.loading):not(:active) .icon-start ::slotted(*),button.inverted.tab-focus:not(.disabled):not(.loading):not(:active) .icon-end ::slotted(*){color:var(--ab-inverted-icon-color-hover)}button.inverted:active,button.inverted.pressed{color:var(--ab-inverted-text-color-active)}button.inverted:active~.overlay,button.inverted.pressed~.overlay{background-color:var(--ab-inverted-bg-color-active)}button.inverted:active .icon-start ::slotted(*),button.inverted:active .icon-end ::slotted(*),button.inverted.pressed .icon-start ::slotted(*),button.inverted.pressed .icon-end ::slotted(*){color:var(--ab-inverted-icon-color-active)}button.inverted.loading~.overlay{background-color:var(--ab-inverted-bg-color-loading)}button.inverted.disabled{color:var(--ab-inverted-text-color-disabled)}button.inverted.disabled~.overlay{background-color:var(--ab-inverted-bg-color-disabled)}button.inverted.disabled .icon-start ::slotted(*),button.inverted.disabled .icon-end ::slotted(*){color:var(--ab-inverted-icon-color-disabled)}button.destructive{color:var(--ab-destructive-text-color)}button.destructive~.overlay{background-color:var(--ab-destructive-bg-color)}button.destructive .icon-start ::slotted(*),button.destructive .icon-end ::slotted(*){color:var(--ab-destructive-icon-color)}button.destructive:hover:not(.disabled):not(.loading):not(:active):not(.pressed),button.destructive.tab-focus:not(.disabled):not(.loading):not(:active):not(.pressed){color:var(--ab-destructive-text-color-hover)}button.destructive:hover:not(.disabled):not(.loading):not(:active):not(.pressed)~.overlay,button.destructive.tab-focus:not(.disabled):not(.loading):not(:active):not(.pressed)~.overlay{background-color:var(--ab-destructive-bg-color-hover)}button.destructive:hover:not(.disabled):not(.loading):not(:active):not(.pressed) .icon-start ::slotted(*),button.destructive:hover:not(.disabled):not(.loading):not(:active):not(.pressed) .icon-end ::slotted(*),button.destructive.tab-focus:not(.disabled):not(.loading):not(:active):not(.pressed) .icon-start ::slotted(*),button.destructive.tab-focus:not(.disabled):not(.loading):not(:active):not(.pressed) .icon-end ::slotted(*){color:var(--ab-destructive-icon-color-hover)}button.destructive:active,button.destructive.pressed{color:var(--ab-destructive-text-color-active)}button.destructive:active~.overlay,button.destructive.pressed~.overlay{background-color:var(--ab-destructive-bg-color-active)}button.destructive:active .icon-start ::slotted(*),button.destructive:active .icon-end ::slotted(*),button.destructive.pressed .icon-start ::slotted(*),button.destructive.pressed .icon-end ::slotted(*){color:var(--ab-destructive-icon-color-active)}button.destructive.loading~.overlay{background-color:var(--ab-destructive-bg-color-loading)}button.destructive.disabled{color:var(--ab-destructive-text-color-disabled)}button.destructive.disabled~.overlay{background-color:var(--ab-destructive-bg-color-disabled)}button.destructive.disabled .icon-start ::slotted(*),button.destructive.disabled .icon-end ::slotted(*){color:var(--ab-destructive-icon-color-disabled)}.overlay{position:absolute;width:100%;height:100%;top:0;border-radius:var(--ab-border-radius);opacity:var(--ab-bg-opacity)}";

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
    return (index.h(index.Host, { class: this.hostCssClasses(), onClick: this.handleClick, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, exportparts: "button, spinner-wrapper, spinner, body, icon-start-wrapper, icon-start, icon-end-wrapper, icon-end, inner, overlay" }, index.h("button", { ref: el => (this.buttonRef = el), class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled || this.loading, value: this.value, name: this.name, type: this.type, part: "button", "data-testid": "wppActionButton", "aria-pressed": this.isPressed ? 'true' : 'false', tabindex: this.ariaProps?.tabIndex, ...this.validAriaProps }, this.loading && (index.h("div", { class: this.loaderCssClasses(), part: "spinner-wrapper" }, index.h("wpp-spinner-v4-1-0", { color: this.loadingColor(), part: "spinner" }))), index.h("div", { class: this.contentCssClasses(), part: "body" }, index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), index.h("slot", { part: "inner", onSlotchange: this.updateSlotData }), index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.iconEndCssClasses(), name: "icon-end", onSlotchange: this.updateSlotData }))), index.h("div", { class: "overlay", part: "overlay" })));
  }
  static get registryIs() { return "wpp-action-button-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "ariaProps": ["onUpdateAriaProps"],
    "disabled": ["onDisabledChange"]
  }; }
};
WppActionButton.style = wppActionButtonCss;

exports.WppActionButton = WppActionButton;
