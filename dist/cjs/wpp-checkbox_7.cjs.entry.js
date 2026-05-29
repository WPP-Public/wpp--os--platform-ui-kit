'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const common = require('./common-ee802540.js');
const subscribeToTheme = require('./subscribe-to-theme-fc5de7fe.js');
const wppIconChevron = require('./wpp-icon-chevron-01139742.js');
const WppIcon = require('./WppIcon-55327707.js');
const utils = require('./utils-2231f97a.js');
require('./consts-d8f5ef98.js');

const wppCheckboxCss = ":host{--checkbox-icons-color:var(--wpp-checkbox-icons-color, var(--wpp-grey-color-000));--checkbox-size:var(--wpp-checkbox-size, 20px);--checkbox-border-radius:var(--wpp-checkbox-border-radius, var(--wpp-border-radius-xs));--checkbox-inline-message-margin:var(--wpp-checkbox-inline-message-margin, 4px 0 0 0);--checkbox-label-margin:var(--wpp-checkbox-label-margin, 0 0 0 8px);--checkbox-label-text-color-disabled:var(--wpp-checkbox-label-text-color-disabled, var(--wpp-text-color-disabled));--checkbox-label-text-color-checked-disabled:var(\n    --wpp-checkbox-label-text-color-checked-disabled,\n    var(--wpp-text-color-disabled)\n  );--checkbox-bg-color:var(--wpp-checkbox-bg-color-hover, transparent);--checkbox-bg-color-hover:var(--wpp-checkbox-bg-color-hover, rgb(240 242 245 / 75%));--checkbox-bg-color-active:var(--wpp-checkbox-bg-color-active, var(--wpp-grey-color-300));--checkbox-bg-color-disabled:var(--wpp-checkbox-bg-color-disabled, transparent);--checkbox-bg-color-checked:var(--wpp-checkbox-bg-color-checked, var(--wpp-brand-color));--checkbox-bg-color-checked-hover:var(--wpp-checkbox-bg-color-checked-hover, var(--wpp-brand-color-hover));--checkbox-bg-color-checked-active:var(--wpp-checkbox-bg-color-checked-active, var(--wpp-brand-color-active));--checkbox-bg-color-checked-disabled:var(--wpp-checkbox-bg-color-checked-disabled, var(--wpp-brand-color-disabled));--checkbox-bg-color-indeterminate:var(--wpp-checkbox-bg-color-indeterminate, var(--wpp-primary-color-100));--checkbox-bg-color-indeterminate-hover:var(\n    --wpp-checkbox-bg-color-indeterminate-hover,\n    var(--wpp-primary-color-100)\n  );--checkbox-bg-color-indeterminate-active:var(\n    --wpp-checkbox-bg-color-indeterminate-active,\n    var(--wpp-primary-color-200)\n  );--checkbox-bg-color-indeterminate-disabled:var(\n    --wpp-checkbox-bg-color-indeterminate-disabled,\n    var(--wpp-primary-color-100)\n  );--checkbox-border-color-indeterminate:var(--wpp-checkbox-border-color-indeterminate, var(--wpp-brand-color));--checkbox-border-color-indeterminate-hover:var(\n    --wpp-checkbox-border-color-indeterminate-hover,\n    var(--wpp-brand-color-hover)\n  );--checkbox-border-color-indeterminate-active:var(\n    --wpp-checkbox-border-color-indeterminate-active,\n    var(--wpp-brand-color-active)\n  );--checkbox-border-color-indeterminate-disabled:var(\n    --wpp-checkbox-border-color-indeterminate-disabled,\n    var(--wpp-brand-color-disabled)\n  );--checkbox-icon-color-indeterminate:var(--wpp-checkbox-icon-color-indeterminate, var(--wpp-brand-color));--checkbox-icon-color-indeterminate-hover:var(\n    --wpp-checkbox-icon-color-indeterminate-hover,\n    var(--wpp-brand-color-hover)\n  );--checkbox-icon-color-indeterminate-active:var(\n    --wpp-checkbox-icon-color-indeterminate-active,\n    var(--wpp-brand-color-active)\n  );--checkbox-icon-color-indeterminate-disabled:var(\n    --wpp-checkbox-icon-color-indeterminate-disabled,\n    var(--wpp-brand-color-disabled)\n  );--checkbox-border-color:var(--wpp-checkbox-border-color, var(--wpp-grey-color-500));--checkbox-border-color-hover:var(--wpp-checkbox-border-color-hover, var(--wpp-grey-color-700));--checkbox-border-color-active:var(--wpp-checkbox-border-color-active, var(--wpp-grey-color-800));--checkbox-border-color-disabled:var(--wpp-checkbox-border-color-disabled, var(--wpp-grey-color-400));--checkbox-border-color-checked:var(--wpp-checkbox-border-color-checked, var(--wpp-brand-color));--checkbox-border-color-checked-hover:var(--wpp-checkbox-border-color-checked-hover, var(--wpp-brand-color-hover));--checkbox-border-color-checked-active:var(\n    --wpp-checkbox-border-color-checked-active,\n    var(--wpp-brand-color-active)\n  );--checkbox-border-color-checked-disabled:var(\n    --wpp-checkbox-border-color-checked-disabled,\n    var(--wpp-brand-color-disabled)\n  );--checkbox-first-border-color-focus:var(--wpp-checkbox-first-border-color-focus, var(--wpp-grey-color-000));--checkbox-second-border-color-focus:var(--wpp-checkbox-second-border-color-focus, var(--wpp-brand-color));--checkbox-border-width:var(--wpp-checkbox-border-width, var(--wpp-border-width-s));--checkbox-border-style:var(--wpp-checkbox-border-style, solid)}:host(.wpp-checkbox-wrapper){position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;outline:none}:host(.wpp-checkbox-wrapper) .label{display:-ms-inline-flexbox;display:inline-flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;z-index:0}:host(.wpp-checkbox-wrapper) .label.with-text .internal-label-wrapper{margin:var(--checkbox-label-margin);height:20px}:host(.wpp-checkbox-wrapper) .label .label-wrapper{height:var(--checkbox-size);margin-bottom:0;margin-left:0}:host(.wpp-checkbox-wrapper) .label .square{-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--checkbox-size);height:var(--checkbox-size);border:var(--checkbox-border-width) var(--checkbox-border-style) var(--checkbox-border-color);border-radius:var(--checkbox-border-radius);background-color:var(--checkbox-bg-color);content:\"\"}:host(.wpp-checkbox-wrapper) .label .wpp-label-selector{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host(.wpp-checkbox-wrapper) .label .checkbox-input{position:absolute;z-index:-1;width:var(--checkbox-size);height:var(--checkbox-size);margin:0;background-color:var(--checkbox-bg-color);-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;border-radius:var(--checkbox-border-radius)}:host(.wpp-checkbox-wrapper) .label .checkbox-input.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 3px var(--checkbox-second-border-color-focus);box-shadow:0 0 0 1px var(--checkbox-first-border-color-focus), 0 0 0 3px var(--checkbox-second-border-color-focus)}:host(.wpp-checkbox-wrapper) .label:hover .square,:host(.wpp-checkbox-wrapper) .label.hover .square,:host(.wpp-checkbox-wrapper) .label.tab-focus .square{background-color:var(--checkbox-bg-color-hover);border-color:var(--checkbox-border-color-hover)}:host(.wpp-checkbox-wrapper) .label:active .square,:host(.wpp-checkbox-wrapper) .label.pressed .square{background-color:var(--checkbox-bg-color-active);border-color:var(--checkbox-border-color-active)}:host(.wpp-checkbox-wrapper):host(.wpp-disabled){cursor:not-allowed}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label{pointer-events:none}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-disabled)}:host(.wpp-checkbox-wrapper):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-disabled);border-color:var(--checkbox-border-color-disabled)}:host(.wpp-checkbox-wrapper) .wpp-icon-tick,:host(.wpp-checkbox-wrapper) .wpp-icon-dash{position:absolute;display:none;height:var(--checkbox-size);color:var(--checkbox-icons-color)}:host(.wpp-checkbox-wrapper) .wpp-inline-message{margin:var(--checkbox-inline-message-margin)}:host(.wpp-checkbox-wrapper):host(:focus-visible) .label .square{background-color:var(--checkbox-bg-color-hover);border-color:var(--checkbox-border-color-hover)}:host(.wpp-checked) .label .square{background-color:var(--checkbox-bg-color-checked);border-color:var(--checkbox-border-color-checked)}:host(.wpp-checked) .label:hover .square,:host(.wpp-checked) .label.hover .square,:host(.wpp-checked) .label.tab-focus .square{background-color:var(--checkbox-bg-color-checked-hover);border-color:var(--checkbox-border-color-checked-hover)}:host(.wpp-checked) .label:active .square,:host(.wpp-checked) .label.pressed .square{background-color:var(--checkbox-bg-color-checked-active);border-color:var(--checkbox-border-color-checked-active)}:host(.wpp-checked):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-checked-disabled)}:host(.wpp-checked):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-checked-disabled);border-color:var(--checkbox-border-color-checked-disabled)}:host(.wpp-checked):host(:focus-visible) .label .square{background-color:var(--checkbox-bg-color-checked-hover);border-color:var(--checkbox-border-color-checked-hover)}:host(.wpp-indeterminate) .label .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate)}:host(.wpp-indeterminate) .label .square{background-color:var(--checkbox-bg-color-indeterminate);border-color:var(--checkbox-border-color-indeterminate)}:host(.wpp-indeterminate) .label:hover .square,:host(.wpp-indeterminate) .label.hover .square,:host(.wpp-indeterminate) .label.tab-focus .square{background-color:var(--checkbox-bg-color-indeterminate-hover);border-color:var(--checkbox-border-color-indeterminate-hover)}:host(.wpp-indeterminate) .label:hover .wpp-icon-dash,:host(.wpp-indeterminate) .label.hover .wpp-icon-dash,:host(.wpp-indeterminate) .label.tab-focus .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-hover)}:host(.wpp-indeterminate) .label:active .square,:host(.wpp-indeterminate) .label.pressed .square{background-color:var(--checkbox-bg-color-indeterminate-active);border-color:var(--checkbox-border-color-indeterminate-active)}:host(.wpp-indeterminate) .label:active .wpp-icon-dash,:host(.wpp-indeterminate) .label.pressed .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-active)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--checkbox-label-text-color-checked-disabled)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .square{background-color:var(--checkbox-bg-color-indeterminate-disabled);border-color:var(--checkbox-border-color-indeterminate-disabled)}:host(.wpp-indeterminate):host(.wpp-disabled) .label .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-disabled)}:host(.wpp-indeterminate):host(:focus-visible) .label .square{background-color:var(--checkbox-bg-color-indeterminate-hover);border-color:var(--checkbox-border-color-indeterminate-hover)}:host(.wpp-indeterminate):host(:focus-visible) .wpp-icon-dash{color:var(--checkbox-icon-color-indeterminate-hover)}:host(.wpp-checked) .wpp-icon-tick{display:block}:host(.wpp-indeterminate) .wpp-icon-dash{display:block}:host([data-wpp-theme=dark]){--checkbox-icons-color:var(--wpp-grey-color-100)}";

const WppCheckbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppClickCheckbox = index.createEvent(this, "wppClickCheckbox", 1);
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.onClick = (event) => {
      event.preventDefault();
      if (this.controlled)
        return this.wppChange.emit({
          value: this.value,
          name: this.name,
          ...(this.indeterminate ? { indeterminate: false, checked: true } : { checked: !this.checked }),
        });
      if (this.indeterminate) {
        this.indeterminate = false;
        this.checked = true;
      }
      else {
        this.checked = !this.checked;
      }
      this.wppChange.emit({
        value: this.value,
        checked: this.checked,
        name: this.name,
      });
      this.wppClickCheckbox.emit({
        value: this.value,
        checked: this.checked,
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = common.FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
      this.isPressed = false;
    };
    this.onKeyUp = (event) => {
      // Need to check if input got focus, because label can have icon with tooltip which also can be focused.
      if (event.key === 'Tab' && this.host?.shadowRoot?.activeElement === this.inputRef)
        this.focusType = common.FOCUS_TYPE.TAB;
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.onKeyDown = (event) => {
      if (this.disabled)
        return;
      // Need to check if input got focus, because label can have icon with tooltip which also can be focused.
      if ((event.key === 'Enter' || event.key === ' ') && this.host?.shadowRoot?.activeElement === this.inputRef) {
        event.preventDefault();
        const clickEvent = new MouseEvent('click', { bubbles: true, composed: true });
        this.host.dispatchEvent(clickEvent);
        this.isPressed = true;
        this.checked = !this.checked;
      }
    };
    this.hostCssClasses = () => ({
      'wpp-checkbox': true,
      'wpp-checkbox-wrapper': true,
      'wpp-checked': this.checked && !this.indeterminate,
      'wpp-indeterminate': this.indeterminate,
      'wpp-disabled': this.disabled,
    });
    this.labelCssClasses = () => ({
      label: true,
      'with-text': !!this.labelConfig?.text,
      [this.internalState]: true,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
      pressed: this.isPressed,
    });
    this.inputCssClasses = () => ({
      'checkbox-input': true,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
    });
    this.focusType = undefined;
    this.isPressed = false;
    this.name = undefined;
    this.value = undefined;
    this.checked = false;
    this.controlled = false;
    this.indeterminate = false;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.ariaProps = {};
    this.labelConfig = undefined;
    this.internalState = '';
    this.index = 0;
    this.decorative = false;
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    if (!this.inputRef)
      return;
    this.inputRef.focus();
    this.focusType = common.FOCUS_TYPE.TAB;
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    if (this.decorative)
      return (index.h(index.Host, { class: this.hostCssClasses(), "aria-hidden": "true", role: "presentation", tabindex: "-1", exportparts: "body, input, square, icon-tick, icon-dash, message", name: this.name }, index.h("wpp-label-v4-1-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "body" }, index.h("div", { class: "square", part: "square" }), index.h("wpp-icon-tick-v4-1-0", { part: "icon-tick" }), index.h("wpp-icon-dash-v4-1-0", { part: "icon-dash" })), !!this.message && (index.h("wpp-inline-message-v4-1-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))));
    return (index.h(index.Host, { class: this.hostCssClasses(), onKeyUp: this.onKeyUp, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown, exportparts: "body, input, square, icon-tick, icon-dash, message", name: this.name }, index.h("wpp-label-v4-1-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, htmlFor: this.name, disabled: this.disabled, onClick: this.onClick, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "body" }, index.h("input", { class: this.inputCssClasses(), type: "checkbox", id: this.name, name: this.name, disabled: this.disabled, checked: this.checked || this.indeterminate, required: this.required, onFocus: this.onFocus, onBlur: this.onBlur, autoFocus: this.autoFocus, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, "aria-hidden": this.disabled ? 'true' : null, "aria-required": this.required.toString(), tabindex: this.disabled ? '-1' : this.index, part: "input" }), index.h("div", { class: "square", part: "square" }), index.h("wpp-icon-tick-v4-1-0", { part: "icon-tick" }), index.h("wpp-icon-dash-v4-1-0", { part: "icon-dash" })), !!this.message && (index.h("wpp-inline-message-v4-1-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))));
  }
  static get registryIs() { return "wpp-checkbox-v4-1-0"; }
  get host() { return index.getElement(this); }
};
WppCheckbox.style = wppCheckboxCss;

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDash = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-dash", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("line", { x1: "7", y1: "10", x2: "13", y2: "10", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" })));
  }
  static get registryIs() { return "wpp-icon-dash-v4-1-0"; }
};
WppIconDash.style = wppIconCss$2;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSuccess = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-success-color-400)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-success", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13.6067 8.89925C13.9742 8.5317 13.9742 7.93578 13.6067 7.56823C13.2391 7.20068 12.6432 7.20068 12.2757 7.56823L9.01961 10.8243L7.72433 9.52901C7.35678 9.16146 6.76086 9.16146 6.39331 9.52901C6.02576 9.89657 6.02576 10.4925 6.39331 10.86L8.35409 12.8208C8.72165 13.1884 9.31757 13.1884 9.68512 12.8208L13.6067 8.89925Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-success-v4-1-0"; }
};
WppIconSuccess.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTick = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-tick", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M6.25 10L8.5747 12.1794C8.76703 12.3597 9.06631 12.3597 9.25864 12.1794L14.25 7.5", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" })));
  }
  static get registryIs() { return "wpp-icon-tick-v4-1-0"; }
};
WppIconTick.style = wppIconCss;

const LOCALES_DEFAULTS = {
  close: 'Close inline message button',
};

const wppInlineMessageCss = ":host{--im-m-icon-gap:var(--wpp-inline-message-m-icon-gap, 4px);--im-l-icon-gap:var(--wpp-inline-message-l-icon-gap, 8px);--im-m-padding:var(--wpp-inline-message-m-padding, 5px 8px);--im-l-padding:var(--wpp-inline-message-l-padding, 12px 12px 12px 16px);--im-line-height:var(--wpp-inline-message-line-height, 22px);--im-border-radius:var(--wpp-inline-message-border-radius, var(--wpp-border-radius-s));--im-text-color:var(--wpp-inline-message-text-color, var(--wpp-grey-color-1000));--im-empty-type-text-color:var(--wpp-inline-message-empty-type-text-color, var(--wpp-grey-color-800));--im-warning-text-color:var(--wpp-inline-message-warning-text-color, var(--wpp-text-color-warning));--im-error-text-color:var(--wpp-inline-message-error-text-color, var(--wpp-text-color-danger));--im-information-text-color:var(--wpp-inline-message-information-text-color, var(--wpp-text-color-info));--im-success-text-color:var(--wpp-inline-message-success-text-color, var(--wpp-text-color-success));--im-warning-background-color:var(--wpp-inline-message-warning-background-color, var(--wpp-warning-color-200));--im-error-background-color:var(--wpp-inline-message-error-background-color, var(--wpp-danger-color-200));--im-information-background-color:var(--wpp-inline-message-information-background-color, var(--wpp-grey-color-300));--im-success-background-color:var(--wpp-inline-message-success-background-color, var(--wpp-success-color-200));--im-l-min-width:var(--wpp-l-inline-message-min-width, 376px);--im-l-action-btn-padding:var(--wpp-inline-message-l-action-btn-padding, 5px 6px);--im-l-action-btn-margin-right:var(--wpp-inline-message-l-action-btn-margin-right, 4px);--im-l-body-padding-left:var(--wpp-inline-message-l-body-padding-left, 30px);--im-l-header-gap:var(--wpp-inline-message-l-header-gap, 3px)}.inline-message-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:var(--im-width);color:var(--im-text-color)}.inline-message-wrapper.size-s{font-size:var(--wpp-typography-xs-midi-font-size, 12px);line-height:var(--wpp-typography-xs-midi-line-height, 20px);font-weight:var(--wpp-typography-xs-midi-font-weight, 500);color:var(--wpp-typography-xs-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-midi-letter-spacing, 0)}.inline-message-wrapper.size-s.warning-message{color:var(--im-warning-text-color)}.inline-message-wrapper.size-s.error-message{color:var(--im-error-text-color)}.inline-message-wrapper.size-s.information-message{color:var(--im-information-text-color)}.inline-message-wrapper.size-s.success-message{color:var(--im-success-text-color)}.inline-message-wrapper:not(.warning-message,.error-message,.information-message,.success-message){color:var(--im-empty-type-text-color)}.inline-message-wrapper.size-l,.inline-message-wrapper.size-m{padding:var(--im-m-padding);border-radius:var(--im-border-radius);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.inline-message-wrapper.size-l.warning-message,.inline-message-wrapper.size-m.warning-message{background-color:var(--im-warning-background-color)}.inline-message-wrapper.size-l.error-message,.inline-message-wrapper.size-m.error-message{background-color:var(--im-error-background-color)}.inline-message-wrapper.size-l.information-message,.inline-message-wrapper.size-m.information-message{background-color:var(--im-information-background-color);background-color:color-mix(in srgb, var(--im-information-background-color) 60%, transparent)}.inline-message-wrapper.size-l.success-message,.inline-message-wrapper.size-m.success-message{background-color:var(--im-success-background-color)}.inline-message-wrapper.size-l .message,.inline-message-wrapper.size-m .message{line-height:var(--im-line-height)}.inline-message-wrapper .left-icon{display:-ms-inline-flexbox;display:inline-flex}.inline-message-wrapper.size-m .message-block .wpp-icon{margin-top:1px}.inline-message-wrapper.size-l{padding:var(--im-l-padding);min-width:var(--im-l-min-width);-webkit-box-sizing:border-box;box-sizing:border-box}.inline-message-wrapper.size-l .container{display:-ms-flexbox;display:flex;gap:24px;-ms-flex-wrap:nowrap;flex-wrap:nowrap;width:100%}.inline-message-wrapper.size-l .container-content{display:-ms-flexbox;display:flex;width:100%;gap:var(--im-l-icon-gap);padding:4px 0}.inline-message-wrapper.size-l .container-content .wpp-icon{margin-top:2px}.inline-message-wrapper.size-l .container .title{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.inline-message-wrapper.size-l .container-actions{display:-ms-flexbox;display:flex;-ms-flex-item-align:start;align-self:flex-start}.inline-message-wrapper.size-l .container-actions .action-btn{width:-webkit-max-content;width:-moz-max-content;width:max-content;--wpp-action-button-padding:var(--im-l-action-btn-padding);margin-right:var(--im-l-action-btn-margin-right)}.inline-message-wrapper.size-l .container-actions .close-btn{--wpp-action-button-padding:6px}.inline-message-wrapper.size-l .container-body .tooltip:hover{cursor:pointer}.inline-message-wrapper.size-l .content-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:var(--im-l-header-gap);width:100%}.inline-message-wrapper.size-l .container-body{width:100%}.inline-message-wrapper.size-l .container-content.no-title .content-wrapper{gap:1px}.inline-message-wrapper .message-block{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;gap:var(--im-m-icon-gap);border-radius:var(--im-border-radius);outline:none}.inline-message-wrapper .message-block.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.inline-message-wrapper .message-block.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.inline-message-wrapper .message-block.tooltip-maxlength-auto{display:grid;grid-auto-flow:column;-ms-flex-pack:start;justify-content:flex-start;width:100%;gap:var(--im-m-icon-gap)}.inline-message-wrapper .message-block.tooltip-maxlength-auto .message{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.inline-message-wrapper .message-block.truncated{cursor:pointer}.inline-message-wrapper .message-block .message{width:100%;word-break:break-word}.inline-message-wrapper .message{border-radius:var(--im-border-radius);outline:none}.inline-message-wrapper .message.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host(.wpp-information.wpp-size-l),:host(.wpp-information.wpp-size-m){background-color:white;border-radius:var(--im-border-radius)}:host(.wpp-information.wpp-size-l[data-wpp-theme=dark]) .inline-message-wrapper,:host(.wpp-information.wpp-size-m[data-wpp-theme=dark]) .inline-message-wrapper{background:var(--wpp-grey-color-300)}";

const WppInlineMessage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClickActionBtn = index.createEvent(this, "wppClickActionBtn", 1);
    this.wppClickCloseBtn = index.createEvent(this, "wppClickCloseBtn", 1);
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this._locales = LOCALES_DEFAULTS;
    this.getMessage = () => {
      if (this.showTooltipFrom === 'auto')
        return this.message;
      this.isTruncated = this.message.length > this.showTooltipFrom;
      return this.isTruncated ? this.message.substring(0, this.showTooltipFrom) + ' ...' : this.message;
    };
    this.onBlur = () => {
      this.focusType = common.FOCUS_TYPE.NONE;
    };
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab' && this.host.shadowRoot?.activeElement === this.messageRef)
        this.focusType = common.FOCUS_TYPE.TAB;
    };
    this.inlineMessageWrapperCssClasses = () => ({
      'inline-message-wrapper': true,
      [`size-${this.size}`]: true,
      [`${this.type}-message`]: !!this.type,
    });
    this.messageBlockCssClasses = () => ({
      'message-block': true,
      truncated: this.isTruncated,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
      'tooltip-maxlength-auto': this.showTooltipFrom === 'auto',
    });
    this.hostCssClasses = () => ({
      'wpp-inline-message': true,
      [`wpp-${this.type}`]: !!this.type,
      [`wpp-size-${this.size}`]: true,
    });
    this.messageCssClasses = () => ({
      message: true,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
    });
    this.titleCssClasses = () => ({
      title: true,
    });
    this.getMessageTypesIcons = () => {
      if (this.type === 'warning')
        return index.h("wpp-icon-warning-v4-1-0", { class: "left-icon", part: "message-icon", role: "presentation" });
      if (this.type === 'error')
        return index.h("wpp-icon-error-v4-1-0", { class: "left-icon", part: "message-icon", role: "presentation" });
      if (this.type === 'information')
        return (index.h("wpp-icon-info-message-v4-1-0", { color: "var(--wpp-grey-color-700)", class: "left-icon", part: "message-icon", role: "presentation" }));
      if (this.type === 'success')
        return index.h("wpp-icon-success-v4-1-0", { class: "left-icon", part: "message-icon", role: "presentation" });
      return null;
    };
    this.handleClickClose = () => {
      const wrapper = this.host.shadowRoot?.querySelector('[part="wrapper"]');
      if (wrapper) {
        const wrapperEl = wrapper;
        wrapperEl.style.display = 'none';
      }
      this.wppClickCloseBtn.emit();
    };
    this.handleClickActionBtn = () => {
      this.wppClickActionBtn.emit();
    };
    this.getContainerContentCssClasses = () => ({
      'container-content': true,
      'no-title': !this.hasTitle,
    });
    this.renderContent = () => {
      const message = this.getMessage();
      return this.size === 'l' ? (index.h("div", { class: "container", part: "container" }, index.h("div", { class: this.getContainerContentCssClasses() }, this.getMessageTypesIcons(), index.h("div", { class: "content-wrapper" }, index.h("wpp-typography-v4-1-0", { class: this.titleCssClasses(), tag: "h4", type: "m-strong", part: "title" }, this.titleText), index.h("div", { class: "container-body" }, this.isTruncated ? (index.h("wpp-tooltip-v4-1-0", { class: "tooltip", text: this.message, config: { placement: 'bottom', triggerTarget: this.messageRef, ...this.tooltipConfig }, part: "tooltip" }, index.h("span", { ref: ref => (this.messageRef = ref), class: this.messageCssClasses(), tabIndex: 0, part: "message", onBlur: this.onBlur }, message))) : (index.h("span", { class: "message", part: "message" }, message))))), this.actionBtnText || !this.hideCloseBtn ? (index.h("div", { class: "container-actions" }, this.actionBtnText?.length > 0 && (index.h("wpp-action-button-v4-1-0", { part: "action-btn", class: "action-btn", variant: "secondary", onClick: this.handleClickActionBtn }, this.actionBtnText)), !this.hideCloseBtn && (index.h("wpp-action-button-v4-1-0", { class: "close-btn", ariaProps: { label: this._locales.close }, variant: "secondary", onClick: this.handleClickClose }, index.h("wpp-icon-cross-v4-1-0", { color: "var(--ab-secondary-text-color)", size: "m" }))))) : null)) : this.isTruncated ? (index.h("wpp-tooltip-v4-1-0", { text: this.message, config: { placement: 'bottom', ...this.tooltipConfig }, part: "tooltip" }, index.h("div", { class: this.messageBlockCssClasses(), part: "message-block", ref: ref => (this.messageRef = ref), onBlur: this.onBlur, tabIndex: 0 }, this.getMessageTypesIcons(), index.h("span", { class: "message", part: "message" }, message)))) : (index.h("div", { class: this.messageBlockCssClasses(), part: "message-block" }, this.getMessageTypesIcons(), index.h("span", { class: "message", part: "message" }, message)));
    };
    this.getExportParts = () => {
      let defaultParts = 'wrapper, message-icon, message';
      if (this.size === 'l') {
        this.isTruncated ? (defaultParts += ',tooltip') : (defaultParts += '');
        defaultParts += ', container, title, action-btn';
      }
      else {
        this.isTruncated ? (defaultParts += ',tooltip, message-block') : (defaultParts += ', message-block');
      }
      return defaultParts;
    };
    this.isTruncated = false;
    this.hasTitle = false;
    this.focusType = undefined;
    this.titleText = '';
    this.actionBtnText = '';
    this.message = '';
    this.type = undefined;
    this.size = 's';
    this.tooltipConfig = {};
    this.showTooltipFrom = 'auto';
    this.hideCloseBtn = false;
    this.locales = {};
  }
  onUpdateTitleText() {
    this.hasTitle = this.size === 'l' && this.titleText.length > 0;
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    this.hasTitle = this.size === 'l' && this.titleText.length > 0;
  }
  componentDidLoad() {
    this.setupResizeObserver();
    requestAnimationFrame(() => {
      this.checkTruncation();
    });
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.resizeObserver)
      this.resizeObserver.disconnect();
  }
  setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(utils.debounce(() => {
      this.checkTruncation();
    }, 50));
    if (this.resizeObserver)
      this.resizeObserver.observe(this.host);
  }
  checkTruncation() {
    const messageSpan = (this.host?.shadowRoot).querySelector('.message');
    if (!messageSpan)
      return;
    this.isTruncated = messageSpan.clientWidth < messageSpan.scrollWidth;
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), onBlur: this.onBlur, onKeyUp: this.onKeyUp, exportparts: this.getExportParts() }, index.h("div", { class: this.inlineMessageWrapperCssClasses(), part: "wrapper" }, this.renderContent())));
  }
  static get registryIs() { return "wpp-inline-message-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "titleText": ["onUpdateTitleText"],
    "locales": ["onUpdateLocales"]
  }; }
};
WppInlineMessage.style = wppInlineMessageCss;

const wppLabelCss = ".sc-wpp-label-h{display:-ms-flexbox;display:flex}.sc-wpp-label-h .internal-label-wrapper.sc-wpp-label{display:-ms-flexbox;display:flex;margin:0}";

const WppLabel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-label': true,
    });
    this.renderContent = () => (index.h("wpp-internal-label-v4-1-0", { labelText: this.config?.text, description: this.config?.description, optional: this.optional, typography: this.typography, disabled: this.disabled, locales: this.config?.locales, tooltipConfig: this.tooltipConfig, part: "content", id: this.labelId }, this.config?.icon && index.h(utils.transformToVersionedTag(this.config?.icon), { slot: 'icon', part: 'icon' })));
    this.description = undefined;
    this.htmlFor = undefined;
    this.optional = false;
    this.typography = 's-strong';
    this.disabled = false;
    this.config = undefined;
    this.tag = 'label';
    this.tooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.labelId = undefined;
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "wrapper, content, icon" }, index.h(this.tag, { class: "internal-label-wrapper", part: "wrapper", ...(this.tag === 'label' && { htmlFor: this.htmlFor, 'aria-label': this.htmlFor }) }, this.renderContent())));
  }
  static get registryIs() { return "wpp-label-v4-1-0"; }
};
WppLabel.style = wppLabelCss;

exports.wpp_icon_chevron = wppIconChevron.WppIconChevron;
exports.wpp_checkbox = WppCheckbox;
exports.wpp_icon_dash = WppIconDash;
exports.wpp_icon_success = WppIconSuccess;
exports.wpp_icon_tick = WppIconTick;
exports.wpp_inline_message = WppInlineMessage;
exports.wpp_label = WppLabel;
