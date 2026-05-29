'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const common = require('./common-ee802540.js');
const subscribeToTheme = require('./subscribe-to-theme-fc5de7fe.js');

const wppToggleCss = ":host{--toggle-height:var(--wpp-toggle-height, 20px);--toggle-width:var(--wpp-toggle-width, 34px);--toggle-inside-circle-size:var(--wpp-toggle-inside-circle-size, 16px);--toggle-inside-circle-bg-color:var(--wpp-toggle-inside-circle-bg-color, var(--wpp-grey-color-000));--toggle-inside-circle-margin-left:var(--wpp-toggle-inside-circle-margin-left, 2px);--toggle-border-radius:var(--wpp-toggle-border-radius, var(--wpp-border-radius-round));--toggle-label-margin:var(--wpp-toggle-label-margin, 0 0 0 8px);--toggle-label-color-disabled:var(--wpp-toggle-label-color-disabled, var(--wpp-text-color-disabled));--toggle-label-color-checked-disabled:var(--wpp-toggle-label-color-checked-disabled, var(--wpp-text-color-disabled));--toggle-bg-color:var(--wpp-toggle-bg-color, var(--wpp-grey-color-500));--toggle-bg-color-hover:var(--wpp-toggle-bg-color-hover, var(--wpp-grey-color-700));--toggle-bg-color-active:var(--wpp-toggle-bg-color-active, var(--wpp-grey-color-800));--toggle-bg-color-disabled:var(--wpp-toggle-bg-color-disabled, var(--wpp-grey-color-400));--toggle-bg-color-checked:var(--wpp-toggle-bg-color-checked, var(--wpp-brand-color));--toggle-bg-color-checked-hover:var(--wpp-toggle-bg-color-checked-hover, var(--wpp-brand-color-hover));--toggle-bg-color-checked-active:var(--wpp-toggle-bg-color-checked-active, var(--wpp-brand-color-active));--toggle-bg-color-checked-disabled:var(--wpp-toggle-bg-color-checked-disabled, var(--wpp-brand-color-disabled));--counter-first-border-color-focus:var(--wpp-counter-first-border-color-focus, var(--wpp-grey-color-000));--counter-second-border-color-focus:var(--wpp-counter-second-border-color-focus, var(--wpp-brand-color))}:host(.wpp-toggle-wrapper){position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;height:var(--toggle-height);padding-left:var(--toggle-width);cursor:pointer;outline:none}:host(.wpp-toggle-wrapper) .label{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.wpp-toggle-wrapper) .label.hide>label{display:none}:host(.wpp-toggle-wrapper) .label.with-text .internal-label-wrapper{margin:var(--toggle-label-margin)}:host(.wpp-toggle-wrapper) .label.tab-focus::before{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--counter-second-border-color-focus);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--counter-second-border-color-focus);background-color:var(--toggle-bg-color-hover)}:host(.wpp-toggle-wrapper) .label::before{position:absolute;top:0;right:0;bottom:0;left:0;width:var(--toggle-width);height:var(--toggle-height);background-color:var(--toggle-bg-color);border-radius:var(--toggle-border-radius);cursor:pointer;-webkit-transition:0.25s ease-in-out;transition:0.25s ease-in-out;content:\"\"}:host(.wpp-toggle-wrapper) .label:hover::before{background-color:var(--toggle-bg-color-hover)}:host(.wpp-toggle-wrapper) .label:active::before{background-color:var(--toggle-bg-color-active)}:host(.wpp-toggle-wrapper) .label::after{position:absolute;top:50%;left:var(--toggle-inside-circle-margin-left);width:var(--toggle-inside-circle-size);height:var(--toggle-inside-circle-size);background-color:var(--toggle-inside-circle-bg-color);border-radius:var(--wpp-border-radius-round);-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:0.25s ease-in-out;transition:0.25s ease-in-out;content:\"\"}:host(.wpp-toggle-wrapper) .label .toggle-input{position:absolute;left:0;top:0;z-index:-1;opacity:0;outline:none}:host(.wpp-toggle-wrapper) .label .toggle-input:checked~.label-wrapper .wpp-label-selector::after{-webkit-transform:translate(calc(var(--toggle-width) - (var(--toggle-inside-circle-size) + var(--toggle-inside-circle-margin-left) * 2)), -50%);transform:translate(calc(var(--toggle-width) - (var(--toggle-inside-circle-size) + var(--toggle-inside-circle-margin-left) * 2)), -50%)}:host(.wpp-toggle-wrapper):host(.wpp-disabled){cursor:not-allowed}:host(.wpp-toggle-wrapper):host(.wpp-disabled) .label{pointer-events:none}:host(.wpp-toggle-wrapper):host(.wpp-disabled) .label .internal-label-wrapper{margin-left:8px}:host(.wpp-toggle-wrapper):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--toggle-label-color-disabled)}:host(.wpp-toggle-wrapper):host(.wpp-disabled) .label::before{background-color:var(--toggle-bg-color-disabled)}:host(.wpp-checked) .label.tab-focus::before{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--counter-second-border-color-focus);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--counter-second-border-color-focus);background-color:var(--toggle-bg-color-checked-hover)}:host(.wpp-checked) .label::before{background-color:var(--toggle-bg-color-checked)}:host(.wpp-checked) .label:hover::before{background-color:var(--toggle-bg-color-checked-hover)}:host(.wpp-checked) .label:active::before{background-color:var(--toggle-bg-color-checked-active)}:host(.wpp-checked) .label::after{-webkit-transform:translate(calc(var(--toggle-width) - (var(--toggle-inside-circle-size) + var(--toggle-inside-circle-margin-left) * 2)), -50%);transform:translate(calc(var(--toggle-width) - (var(--toggle-inside-circle-size) + var(--toggle-inside-circle-margin-left) * 2)), -50%)}:host(.wpp-checked):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--toggle-label-color-checked-disabled)}:host(.wpp-checked):host(.wpp-disabled) .label::before{background-color:var(--toggle-bg-color-checked-disabled)}:host([data-wpp-theme=dark]){--toggle-inside-circle-bg-color:var(--wpp-grey-color-100)}";

const WppToggle = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.onClick = (event) => {
      if (this.disabled)
        return;
      event.preventDefault();
      this.setFocus();
      if (!this.controlled) {
        this.checked = !this.checked;
        this.wppChange.emit({
          value: this.value,
          checked: this.checked,
          name: this.name,
        });
      }
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = common.FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = common.FOCUS_TYPE.TAB;
    };
    this.hostCssClasses = () => ({
      'wpp-toggle': true,
      'wpp-toggle-wrapper': true,
      'wpp-disabled': this.disabled,
      'wpp-checked': this.checked,
    });
    this.labelCssClasses = () => ({
      label: true,
      'with-text': !!this.labelConfig?.text,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
      hide: !this.labelConfig?.text,
    });
    this.onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.onClick(event);
      }
    };
    this.focusType = undefined;
    this.name = undefined;
    this.value = undefined;
    this.checked = false;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.size = 'm';
    this.controlled = false;
    this.ariaProps = {};
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    const inputId = this.name || 'wpp-toggle';
    const labelId = `${inputId}-label`;
    const hasLabel = !!this.labelConfig?.text;
    const labelText = this.labelConfig?.text || this.ariaProps.label;
    // Only pass aria-label/aria-labelledby if there is NO label
    const ariaProps = !hasLabel && (this.ariaProps?.label || this.ariaProps?.labelledby)
      ? {
        ...(this.ariaProps.label ? { 'aria-label': this.ariaProps.label } : {}),
        ...(this.ariaProps.labelledby ? { 'aria-labelledby': this.ariaProps.labelledby } : {}),
      }
      : {};
    return (index.h(index.Host, { onClick: this.onClick, class: this.hostCssClasses(), exportparts: "label, input" }, index.h("wpp-label-v4-1-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, htmlFor: inputId, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label", labelId: labelId }, index.h("input", { type: "checkbox", name: this.name, id: inputId, value: this.value, disabled: this.disabled, checked: this.checked, required: this.required, autoFocus: this.autoFocus, ref: inputRef => (this.inputRef = inputRef), class: "toggle-input", part: "input", ...ariaProps, title: labelText, "aria-checked": this.checked ? 'true' : 'false', "aria-hidden": this.disabled ? 'true' : null, role: "switch", tabIndex: this.disabled ? -1 : 0, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown }))));
  }
  static get registryIs() { return "wpp-toggle-v4-1-0"; }
  get host() { return index.getElement(this); }
};
WppToggle.style = wppToggleCss;

exports.wpp_toggle = WppToggle;
