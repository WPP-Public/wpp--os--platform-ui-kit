'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-9c925efe.js');
const common = require('./common-ee802540.js');
const WrappedSlot = require('./WrappedSlot-736c2736.js');
require('./consts-255c1066.js');

const wppButtonCss = ":host{--button-font-weight:var(--wpp-button-font-weight, 600);--button-font-size:var(--wpp-button-font-size, 14px);--button-line-height:var(--wpp-button-line-height, 22px);--button-padding-m:var(--wpp-button-padding-m, 9px 20px);--button-padding-s:var(--wpp-button-padding-s, 5px 16px);--button-icon-padding-m:var(--wpp-button-icon-padding-m, calc(10px - var(--button-border-width)));--button-icon-padding-s:var(--wpp-button-icon-padding-s, calc(6px - var(--button-border-width)));--button-border-width:var(--wpp-button-border-width, var(--wpp-border-width-s));--button-border-style:var(--wpp-button-border-style, solid);--button-button-width:auto;--button-first-border-color-focus:var(--wpp-button-first-border-color-focus, var(--wpp-grey-color-000));--button-second-border-color-focus:var(--wpp-button-second-border-color-focus, var(--wpp-brand-color));--button-primary-bg-color:var(--wpp-button-primary-bg-color, var(--wpp-brand-color));--button-primary-bg-color-hover:var(--wpp-button-primary-bg-color-hover, var(--wpp-brand-color-hover));--button-primary-bg-color-active:var(--wpp-button-primary-bg-color-active, var(--wpp-brand-color-active));--button-primary-bg-color-disabled:var(--wpp-button-primary-bg-color-disabled, var(--wpp-brand-color-disabled));--button-primary-text-color:var(--wpp-button-primary-text-color, var(--wpp-grey-color-000));--button-primary-icon-color:var(--wpp-button-primary-icon-color, var(--wpp-grey-color-000));--button-secondary-padding-m:var(--wpp-button-secondary-padding-m, calc(9px - var(--button-border-width)) calc(20px - var(--button-border-width)));--button-secondary-padding-s:var(--wpp-button-secondary-padding-s, calc(5px - var(--button-border-width)) calc(16px - var(--button-border-width)));--button-secondary-bg-color-hover:var(--wpp-button-secondary-bg-color-hover, var(--wpp-primary-color-100));--button-secondary-bg-color-active:var(--wpp-button-secondary-bg-color-active, var(--wpp-primary-color-200));--button-secondary-bg-color-disabled:var(--wpp-button-secondary-bg-color-disabled, transparent);--button-secondary-border-color:var(--wpp-button-secondary-border-color, var(--wpp-brand-color));--button-secondary-border-color-active:var(--wpp-button-secondary-border-color-active, var(--wpp-brand-color-active));--button-secondary-border-color-disabled:var(\n    --wpp-button-secondary-border-color-disabled,\n    var(--wpp-brand-color-disabled)\n  );--button-secondary-text-color:var(--wpp-button-secondary-text-color, var(--wpp-brand-color));--button-secondary-text-color-active:var(--wpp-button-secondary-text-color-active, var(--wpp-brand-color-active));--button-secondary-text-color-disabled:var(\n    --wpp-button-secondary-text-color-disabled,\n    var(--wpp-brand-color-disabled)\n  );--button-secondary-icon-color:var(--wpp-button-secondary-icon-color, var(--wpp-brand-color));--button-secondary-icon-color-active:var(--wpp-button-secondary-icon-color-active, var(--wpp-brand-color-active));--button-secondary-icon-color-disabled:var(\n    --wpp-button-secondary-icon-color-disabled,\n    var(--wpp-brand-color-disabled)\n  );--button-destructive-secondary-padding-m:var(--wpp-button-destructive-secondary-padding-m, calc(9px - var(--button-border-width)) calc(20px - var(--button-border-width)));--button-destructive-secondary-padding-s:var(--wpp-button-destructive-secondary-padding-s, calc(5px - var(--button-border-width)) calc(16px - var(--button-border-width)));--button-destructive-secondary-bg-color:var(--wpp-button-destructive-secondary-bg-color, transparent);--button-destructive-secondary-bg-color-hover:var(--wpp-button-destructive-secondary-bg-color-hover, var(--wpp-danger-color-100));--button-destructive-secondary-bg-color-active:var(--wpp-button-destructive-secondary-bg-color-active, var(--wpp-danger-color-200));--button-destructive-secondary-bg-color-disabled:var(--wpp-button-destructive-secondary-bg-color-disabled, transparent);--button-destructive-secondary-bg-color-loading:var(--wpp-button-destructive-secondary-bg-color-loading, transparent);--button-destructive-secondary-border-color:var(--wpp-button-destructive-secondary-border-color, var(--wpp-danger-color-500));--button-destructive-secondary-border-color-hover:var(--wpp-button-destructive-secondary-border-color-hover, var(--wpp-danger-color-500));--button-destructive-secondary-border-color-active:var(--wpp-button-destructive-secondary-border-color-active, var(--wpp-danger-color-600));--button-destructive-secondary-border-color-disabled:var(--wpp-button-destructive-secondary-border-color-disabled, var(--wpp-danger-color-300));--button-destructive-secondary-border-color-loading:var(--wpp-button-destructive-secondary-border-color-loading, var(--wpp-danger-color-500));--button-destructive-secondary-text-color:var(--wpp-button-destructive-secondary-text-color, var(--wpp-danger-color-500));--button-destructive-secondary-text-color-disabled:var(--wpp-button-destructive-secondary-text-color-disabled, var(--wpp-danger-color-300));--button-destructive-secondary-icon-color:var(--wpp-button-destructive-secondary-icon-color, var(--wpp-danger-color-500));--button-inverted-primary-bg-color:var(--wpp-button-inverted-primary-bg-color, var(--wpp-grey-color-000));--button-inverted-primary-disabled-bg-color:var(--wpp-button-inverted-primary-disabled-bg-color, var(--wpp-grey-color-000));--button-inverted-primary-hover-opacity:var(--wpp-button-inverted-primary-hover-opacity, 88%);--button-inverted-primary-active-opacity:var(--wpp-button-inverted-primary-active-opacity, 80%);--button-inverted-primary-loading-opacity:var(--wpp-button-inverted-primary-loading-opacity, 80%);--button-inverted-primary-text-color:var(--wpp-button-inverted-primary-text-color, var(--wpp-grey-color-1000));--button-inverted-primary-text-color-disabled:var(--wpp-button-inverted-primary-text-color-disabled, var(--wpp-grey-color-500));--button-inverted-primary-icon-color:var(--wpp-button-inverted-primary-icon-color, var(--wpp-grey-color-1000));--button-inverted-primary-icon-color-disabled:var(--wpp-button-inverted-primary-icon-color-disabled, var(--wpp-grey-color-500));--button-inverted-secondary-bg-color:var(--wpp-button-inverted-secondary-bg-color, var(--wpp-grey-color-900));--button-inverted-secondary-bg-color-disabled:var(--wpp-button-inverted-secondary-bg-color-disabled, var(--wpp-grey-color-900));--button-inverted-secondary-hover-opacity:var(--wpp-button-inverted-secondary-hover-opacity, 12%);--button-inverted-secondary-active-opacity:var(--wpp-button-inverted-secondary-active-opacity, 18%);--button-inverted-secondary-loading-opacity:var(--wpp-button-inverted-secondary-loading-opacity, 18%);--button-inverted-secondary-text-color:var(--wpp-button-inverted-secondary-text-color, var(--wpp-grey-color-000));--button-inverted-secondary-text-color-disabled:var(--wpp-button-inverted-secondary-text-color-disabled, var(--wpp-grey-color-500));--button-inverted-secondary-icon-color:var(--wpp-button-inverted-secondary-icon-color, var(--wpp-grey-color-000));--button-inverted-secondary-icon-color-disabled:var(--wpp-button-inverted-secondary-icon-color-disabled, var(--wpp-grey-color-500));--button-inverted-secondary-border-color:var(--wpp-button-inverted-secondary-border-color, var(--wpp-grey-color-000));--button-inverted-secondary-border-color-disabled:var(--wpp-button-inverted-secondary-border-color-disabled, var(--wpp-grey-color-500));display:-ms-inline-flexbox;display:inline-flex;outline:none;vertical-align:top}:host(.wpp-disabled:active),:host(.wpp-loading:active){pointer-events:none}.icon-start,.icon-end{display:-ms-flexbox;display:flex}.icon-start.slot-hidden,.icon-end.slot-hidden{display:none}.icon-start{margin-right:8px}.icon-end{margin-left:8px}.icon-end ::slotted(.wpp-icon-chevron[direction=down]){-webkit-transition:-webkit-transform 0.15s ease-out;transition:-webkit-transform 0.15s ease-out;transition:transform 0.15s ease-out;transition:transform 0.15s ease-out, -webkit-transform 0.15s ease-out}:host([aria-expanded=true]) .icon-end ::slotted(.wpp-icon-chevron[direction=down]){-webkit-transform:rotate(180deg);transform:rotate(180deg)}.button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;margin:0;font-weight:var(--button-font-weight);font-size:var(--button-font-size);font-family:var(--wpp-font-family);font-style:normal;line-height:var(--button-line-height);text-decoration:none;border:none;outline:0;cursor:pointer;position:relative}.button .truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.button .content{overflow:hidden}.button .loader{position:absolute;top:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.button .content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;opacity:1}.button .content.hide{opacity:0}.button.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--button-first-border-color-focus), 0 0 0 2px var(--button-second-border-color-focus);box-shadow:0 0 0 1px var(--button-first-border-color-focus), 0 0 0 2px var(--button-second-border-color-focus)}.button.disabled{cursor:not-allowed}.button.size-m{padding:var(--button-padding-m);border-radius:var(--wpp-border-radius-fully-rounded, var(--wpp-border-radius-m))}.button.size-s{padding:var(--button-padding-s);border-radius:var(--wpp-border-radius-fully-rounded, var(--wpp-border-radius-s))}.button.loading{cursor:not-allowed}.button.with-icon-only.secondary .icon-start,.button.with-icon-only.secondary .icon-end,.button.with-icon-only .destructive-secondary .icon-start,.button.with-icon-only .destructive-secondary .icon-end{margin:0}.button.with-icon-only.secondary.size-m,.button.with-icon-only .destructive-secondary.size-m{padding:var(--button-icon-padding-m)}.button.with-icon-only.secondary.size-s,.button.with-icon-only .destructive-secondary.size-s{padding:var(--button-icon-padding-s)}.button.with-icon-start:not(.with-icon-only).size-m{padding-left:16px}.button.with-icon-start:not(.with-icon-only).size-s{padding-left:12px}.button.with-icon-end:not(.with-icon-only).size-m{padding-right:16px}.button.with-icon-end:not(.with-icon-only).size-s{padding-right:12px}.button.primary{color:var(--button-primary-text-color);background-color:var(--button-primary-bg-color)}.button.primary .icon-start ::slotted(*),.button.primary .icon-end ::slotted(*){color:var(--button-primary-icon-color)}.button.primary:hover,.button.primary.tab-focus{background-color:var(--button-primary-bg-color-hover)}.button.primary:active{background-color:var(--button-primary-bg-color-active)}.button.primary:disabled{background-color:var(--button-primary-bg-color-disabled)}.button.primary.loading{background-color:var(--button-primary-bg-color)}.button.destructive{color:var(--wpp-grey-color-000);background-color:var(--wpp-danger-color-500)}.button.destructive .icon-start ::slotted(*),.button.destructive .icon-end ::slotted(*){color:var(--wpp-grey-color-000)}.button.destructive:hover,.button.destructive.tab-focus{background-color:var(--wpp-danger-color-400)}.button.destructive:active{background-color:var(--wpp-danger-color-600)}.button.destructive:disabled{background-color:var(--wpp-danger-color-300)}.button.destructive.loading{background-color:var(--wpp-danger-color-500)}.button.destructive-secondary{color:var(--button-destructive-secondary-text-color);background-color:var(--button-destructive-secondary-bg-color);border:var(--button-border-width) var(--button-border-style) var(--button-destructive-secondary-border-color)}.button.destructive-secondary .icon-start ::slotted(*),.button.destructive-secondary .icon-end ::slotted(*){color:var(--button-destructive-secondary-icon-color)}.button.destructive-secondary.size-s{padding:var(--button-destructive-secondary-padding-s)}.button.destructive-secondary.size-m{padding:var(--button-destructive-secondary-padding-m)}.button.destructive-secondary:hover,.button.destructive-secondary.tab-focus{background-color:var(--button-destructive-secondary-bg-color-hover);border-color:var(--button-destructive-secondary-border-color-hover)}.button.destructive-secondary:active,.button.destructive-secondary.tab-focus{background-color:var(--button-destructive-secondary-bg-color-active);border-color:var(--button-destructive-secondary-border-color-active)}.button.destructive-secondary:disabled{color:var(--button-destructive-secondary-text-color-disabled);border-color:var(--button-destructive-secondary-border-color-disabled);background-color:var(--button-destructive-secondary-bg-color-disabled)}.button.destructive-secondary:disabled .icon-start ::slotted(*),.button.destructive-secondary:disabled .icon-end ::slotted(*){color:var(--button-destructive-secondary-text-color-disabled)}.button.destructive-secondary.loading{border-color:var(--button-destructive-secondary-border-color-loading);background-color:var(--button-destructive-secondary-bg-color-loading)}.button.secondary{color:var(--button-secondary-text-color);background-color:var(--button-secondary-bg-color);border:var(--button-border-width) var(--button-border-style) var(--button-secondary-border-color)}.button.secondary .icon-start ::slotted(*),.button.secondary .icon-end ::slotted(*){color:var(--button-secondary-icon-color)}.button.secondary.size-s{padding:var(--button-secondary-padding-s)}.button.secondary.size-m{padding:var(--button-secondary-padding-m)}.button.secondary:hover,.button.secondary.tab-focus{background-color:var(--button-secondary-bg-color-hover)}.button.secondary:active{background-color:var(--button-secondary-bg-color-active);border-color:var(--button-secondary-border-color-active);color:var(--button-secondary-text-color-active)}.button.secondary:active .icon-start ::slotted(*),.button.secondary:active .icon-end ::slotted(*){color:var(--button-secondary-icon-color-active)}.button.secondary:disabled{color:var(--button-secondary-text-color-disabled);background-color:var(--button-secondary-bg-color-disabled);border:var(--button-border-width) var(--button-border-style) var(--button-secondary-border-color-disabled)}.button.secondary:disabled .icon-start ::slotted(*),.button.secondary:disabled .icon-end ::slotted(*){color:var(--button-secondary-icon-color-disabled)}.button.secondary.loading{background-color:var(--button-secondary-bg-color);border:var(--button-border-width) var(--button-border-style) var(--button-secondary-border-color)}.button.inverted.primary{color:var(--button-inverted-primary-text-color);background-color:var(--button-inverted-primary-bg-color)}.button.inverted.primary .icon-start ::slotted(*),.button.inverted.primary .icon-end ::slotted(*){color:var(--button-inverted-primary-icon-color)}.button.inverted.primary:hover,.button.inverted.primary.tab-focus{background-color:rgba(255, 255, 255, var(--button-inverted-primary-hover-opacity))}.button.inverted.primary:active{background-color:rgba(255, 255, 255, var(--button-inverted-primary-active-opacity))}.button.inverted.primary:disabled{opacity:1;color:var(--button-inverted-primary-text-color-disabled);background-color:var(--button-inverted-primary-disabled-bg-color)}.button.inverted.primary:disabled .icon-start ::slotted(*),.button.inverted.primary:disabled .icon-end ::slotted(*){color:var(--button-inverted-primary-icon-color-disabled)}.button.inverted.primary.loading{background-color:rgba(255, 255, 255, var(--button-inverted-primary-loading-opacity))}.button.inverted.secondary{color:var(--button-inverted-secondary-text-color);background-color:var(--button-inverted-secondary-bg-color);border:var(--button-border-width) var(--button-border-style) var(--button-inverted-secondary-border-color)}.button.inverted.secondary .icon-start ::slotted(*),.button.inverted.secondary .icon-end ::slotted(*){color:var(--button-inverted-secondary-icon-color)}.button.inverted.secondary:hover,.button.inverted.secondary.tab-focus{background-color:rgba(248, 249, 251, var(--button-inverted-secondary-hover-opacity))}.button.inverted.secondary:active{background-color:rgba(248, 249, 251, var(--button-inverted-secondary-active-opacity))}.button.inverted.secondary:disabled{color:var(--button-inverted-secondary-text-color-disabled);border:var(--button-border-width) var(--button-border-style) var(--button-inverted-secondary-border-color-disabled);background-color:var(--button-inverted-secondary-bg-color-disabled);opacity:1}.button.inverted.secondary:disabled .icon-start ::slotted(*),.button.inverted.secondary:disabled .icon-end ::slotted(*){color:var(--button-inverted-secondary-icon-color-disabled)}.button.inverted.secondary.loading{background-color:rgba(248, 249, 251, var(--button-inverted-secondary-loading-opacity))}";

const WppButton = class {
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
    this.onBlur = () => {
      this.focusType = common.FOCUS_TYPE.NONE;
    };
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = common.FOCUS_TYPE.TAB;
    };
    this.onKeyDown = (event) => {
      if (this.disabled || this.loading)
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const clickEvent = new MouseEvent('click', { bubbles: true, composed: true });
        this.host.dispatchEvent(clickEvent);
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
    this.getSpinnerColor = () => {
      if (this.inverted && (this.variant === 'primary' || this.variant === 'secondary')) {
        return this.variant === 'primary' ? 'var(--wpp-grey-color-1000)' : 'var(--wpp-grey-color-000)';
      }
      switch (this.variant) {
        case 'secondary':
          return 'var(--wpp-primary-color-500)';
        case 'destructive-secondary':
          return 'var(--wpp-danger-color-500)';
        default:
          return 'var(--wpp-grey-color-000)';
      }
    };
    this.hostCssClasses = () => ({
      'wpp-button': true,
      'wpp-disabled': this.disabled,
      'wpp-loading': this.loading,
    });
    this.buttonCssClasses = () => ({
      button: true,
      loading: this.loading,
      disabled: this.disabled,
      inverted: this.inverted && (this.variant === 'primary' || this.variant === 'secondary'),
      [`${this.variant}`]: true,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
      'with-icon-start': this.hasIconStartSlot,
      'with-icon-end': this.hasIconEndSlot,
      'with-icon-only': this.isIconOnly,
      'size-s': this.size === 's',
      'size-m': this.size === 'm',
    });
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
    this.size = 'm';
    this.disabled = false;
    this.loading = false;
    this.variant = 'primary';
    this.inverted = false;
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
  componentWillLoad() {
    this.updateSlotData();
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), onClick: this.handleClick, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown, onBlur: this.onBlur, onMouseDown: this.onMouseDown, exportparts: "button, spinner-wrapper, spinner, text, inner, icon-start, icon-end, icon-start-wrapper, icon-end-wrapper", "aria-disabled": this.disabled || this.loading, tabIndex: this.disabled || this.loading ? -1 : 0 }, index.h("button", { class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled || this.loading, formAction: this.formAction, formEncType: this.formEncType, formMethod: this.formMethod, formNoValidate: this.formNoValidate, formTarget: this.formTarget, value: this.value, name: this.name, type: this.type, part: "button", "data-testid": "wppButton", "aria-label": this.ariaProps.label, tabIndex: -1 }, this.loading && (index.h("div", { class: this.loaderCssClasses(), part: "spinner-wrapper" }, index.h("wpp-spinner-v2-22-0", { color: this.getSpinnerColor(), part: "spinner" }))), index.h("div", { class: this.contentCssClasses() }, index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), index.h("span", { class: "truncate", part: "text" }, index.h("slot", { onSlotchange: this.updateSlotData, part: "inner" })), index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.iconEndCssClasses(), name: "icon-end", onSlotchange: this.updateSlotData })))));
  }
  static get registryIs() { return "wpp-button-v2-22-0"; }
  get host() { return index.getElement(this); }
};
WppButton.style = wppButtonCss;

exports.wpp_button = WppButton;
