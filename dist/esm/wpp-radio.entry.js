import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { F as FOCUS_TYPE } from './common-69c8ea89.js';
import { k as transformToVersionedTag } from './utils-3a5af594.js';
import './consts-9fc0a13a.js';

const wppRadioCss = ":host{--radio-size:var(--wpp-radio-size, 20px);--radio-inside-circle-size:var(--wpp-radio-inside-circle-size, 8px);--radio-inside-circle-bg-color:var(--wpp-radio-inside-circle-bg-color, var(--wpp-grey-color-000));--radio-bg-color:var(--wpp-radio-bg-color, transparent);--radio-bg-color-hover:var(--wpp-radio-bg-color-hover, var(--wpp-grey-color-200));--radio-bg-color-active:var(--wpp-radio-bg-color-active, var(--wpp-grey-color-300));--radio-bg-color-checked:var(--wpp-radio-bg-color-checked, var(--wpp-brand-color));--radio-bg-color-disabled:var(--wpp-radio-bg-color-disabled, transparent);--radio-bg-color-checked-disabled:var(--wpp-radio-bg-color-checked-disabled, var(--wpp-primary-color-300));--radio-border-color:var(--wpp-radio-border-color, var(--wpp-grey-color-500));--radio-border-color-hover:var(--wpp-radio-border-color-hover, var(--wpp-grey-color-700));--radio-border-color-active:var(--wpp-radio-border-color-active, var(--wpp-grey-color-800));--radio-border-color-checked:var(--wpp-radio-border-color-checked, var(--wpp-brand-color));--radio-border-color-disabled:var(--wpp-radio-border-color-disabled, var(--wpp-grey-color-400));--radio-border-color-checked-disabled:var(--wpp-radio-border-color-checked-disabled, var(--wpp-primary-color-300));--radio-first-border-color-focus:var(--wpp-radio-first-border-color-focus, var(--wpp-grey-color-000));--radio-second-border-color-focus:var(--wpp-radio-second-border-color-focus, var(--wpp-brand-color));--radio-label-margin:var(--wpp-radio-label-margin, 0 0 0 8px);--radio-label-text-color-disabled:var(--wpp-radio-label-text-color-disabled, var(--wpp-text-color-disabled));--radio-label-text-color-checked-disabled:var(--wpp-radio-label-text-color-disabled, var(--wpp-text-color-disabled));--radio-border-width:var(--wpp-radio-border-width, var(--wpp-border-width-s));--radio-border-style:var(--wpp-radio-border-style, solid);display:-ms-inline-flexbox;display:inline-flex;outline:none}:host(.wpp-radio-wrapper){position:relative;display:-ms-inline-flexbox;display:inline-flex;height:var(--radio-size);cursor:pointer}:host(.wpp-radio-wrapper) .label{display:-ms-inline-flexbox;display:inline-flex}:host(.wpp-radio-wrapper) .label.with-text .internal-label-wrapper{margin:var(--radio-label-margin)}:host(.wpp-radio-wrapper) .label.tab-focus .circle{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--radio-first-border-color-focus), 0 0 0 3px var(--radio-second-border-color-focus);box-shadow:0 0 0 1px var(--radio-first-border-color-focus), 0 0 0 3px var(--radio-second-border-color-focus);background-color:var(--radio-bg-color-hover);border-color:var(--radio-border-color-hover)}:host(.wpp-radio-wrapper) .label .radio-input{position:absolute;cursor:pointer;opacity:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;border-radius:var(--checkbox-border-radius)}:host(.wpp-radio-wrapper) .label .radio-input.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--radio-first-border-color-focus), 0 0 0 3px var(--radio-second-border-color-focus);box-shadow:0 0 0 1px var(--radio-first-border-color-focus), 0 0 0 3px var(--radio-second-border-color-focus)}:host(.wpp-radio-wrapper) .label .circle{position:relative;display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--radio-size);height:var(--radio-size);background-color:var(--radio-bg-color);border:var(--radio-border-width) var(--radio-border-style) var(--radio-border-color);border-radius:var(--wpp-border-radius-round)}:host(.wpp-radio-wrapper) .label .circle::before{position:absolute;top:50%;left:50%;display:none;width:var(--radio-inside-circle-size);height:var(--radio-inside-circle-size);background:var(--radio-inside-circle-bg-color);border-radius:var(--wpp-border-radius-round);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);content:\"\"}:host(.wpp-radio-wrapper) .label:hover .circle,:host(.wpp-radio-wrapper) .label.hover .circle,:host(.wpp-radio-wrapper) .label.tab-focus .circle{background-color:var(--radio-bg-color-hover);border-color:var(--radio-border-color-hover)}:host(.wpp-radio-wrapper) .label:active .circle,:host(.wpp-radio-wrapper) .label.active .circle,:host(.wpp-radio-wrapper) .label.pressed .circle{background-color:var(--radio-bg-color-active);border-color:var(--radio-border-color-active)}:host(.wpp-radio-wrapper):host(.wpp-disabled){cursor:not-allowed}:host(.wpp-radio-wrapper):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--radio-label-text-color-disabled)}:host(.wpp-radio-wrapper):host(.wpp-disabled) .label .circle{background-color:var(--radio-bg-color-disabled);border-color:var(--radio-border-color-disabled)}:host(.wpp-radio-wrapper):host(.wpp-checked) .label .circle{background-color:var(--radio-bg-color-checked);border-color:var(--radio-border-color-checked)}:host(.wpp-radio-wrapper):host(.wpp-checked) .label .circle::before{display:block}:host(.wpp-radio-wrapper):host(.wpp-checked) .label.tab-focus .circle{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--radio-first-border-color-focus), 0 0 0 3px var(--radio-second-border-color-focus);box-shadow:0 0 0 1px var(--radio-first-border-color-focus), 0 0 0 3px var(--radio-second-border-color-focus)}:host(.wpp-radio-wrapper):host(.wpp-checked):host(.wpp-disabled) .label .wpp-internal-label{--label-text-color-disabled:var(--radio-label-text-color-checked-disabled)}:host(.wpp-radio-wrapper):host(.wpp-checked):host(.wpp-disabled) .label .circle{background-color:var(--radio-bg-color-checked-disabled);border-color:var(--radio-border-color-checked-disabled)}";

const WppRadio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.wppClickRadio = createEvent(this, "wppClickRadio", 1);
    this.onClick = () => {
      if (this.disabled)
        return;
      this.checked = true;
      this.wppChange.emit({
        value: this.value,
        checked: this.checked,
        name: this.name,
      });
      this.wppClickRadio.emit({
        value: this.value,
        checked: this.checked,
      });
    };
    // private onInput = () => {
    //   if (this.disabled) return
    //
    //   this.setFocus()
    // }
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.tippyInstance?.hide();
      this.wppBlur.emit(event);
      this.isPressed = false;
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
        this.checked = true;
      }
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = FOCUS_TYPE.TAB;
        this.tippyInstance?.show();
      }
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.hostCssClasses = () => ({
      'wpp-radio': true,
      'wpp-radio-wrapper': true,
      'wpp-disabled': this.disabled,
      'wpp-checked': this.checked,
    });
    this.labelCssClasses = () => ({
      label: true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
      'with-text': !!this.labelConfig?.text,
      [this.internalState]: true,
      pressed: this.isPressed,
    });
    this.inputCssClasses = () => ({
      'radio-input': true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.focusType = undefined;
    this.isPressed = false;
    this.name = undefined;
    this.value = undefined;
    this.checked = false;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.size = 'm';
    this.ariaProps = {};
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.internalState = '';
    this.index = 0;
    this.decorative = false;
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.focus();
    this.focusType = FOCUS_TYPE.TAB;
    this.tippyInstance?.show();
  }
  componentWillLoad() {
    const radioGroup = this.host.closest(transformToVersionedTag('wpp-radio-group'));
    if (radioGroup) {
      this.checked = this.value === radioGroup.value;
    }
  }
  render() {
    if (this.decorative) {
      return (h(Host, { class: this.hostCssClasses(), "aria-hidden": "true", role: "presentation", tabindex: "-1", exportparts: "label, content, inner", name: this.name }, h("wpp-label-v3-5-0", { class: this.labelCssClasses(), part: "label" }, h("div", { class: "circle", part: "circle" }))));
    }
    return (h(Host, { class: this.hostCssClasses(), onKeyUp: this.onKeyUp, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown, exportparts: "label, content, inner", name: this.name }, h("wpp-label-v3-5-0", { class: this.labelCssClasses(), typography: "s-body", htmlFor: this.name, disabled: this.disabled, optional: !this.required, config: this.labelConfig, onClick: this.onClick, tooltipConfig: {
        ...{
          onCreate: (instance) => {
            this.tippyInstance = instance;
          },
          tabIndex: -1,
        },
        ...this.labelTooltipConfig,
      }, part: "label" }, h("input", { class: this.inputCssClasses(), type: "radio", name: this.name, id: this.name, value: this.value, disabled: this.disabled, checked: this.checked, required: this.required, autoFocus: this.autoFocus, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, "aria-hidden": this.disabled ? 'true' : null, "aria-required": this.required.toString(), tabindex: this.disabled ? '-1' : this.index, part: "input" }), h("div", { class: "circle", part: "circle" }))));
  }
  static get registryIs() { return "wpp-radio-v3-5-0"; }
  get host() { return getElement(this); }
};
WppRadio.style = wppRadioCss;

export { WppRadio as wpp_radio };
