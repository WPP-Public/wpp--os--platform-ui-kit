import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { n as autoFocusElement } from './utils.js';
import { d as defineCustomElement$e } from './wpp-action-button2.js';
import { d as defineCustomElement$d } from './wpp-icon-cross2.js';
import { d as defineCustomElement$c } from './wpp-icon-error2.js';
import { d as defineCustomElement$b } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$a } from './wpp-icon-success2.js';
import { d as defineCustomElement$9 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$8 } from './wpp-inline-message2.js';
import { d as defineCustomElement$7 } from './wpp-internal-label2.js';
import { d as defineCustomElement$6 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$5 } from './wpp-label2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const LOCALES_DEFAULTS = {
  charactersEntered: 'Characters',
};

const wppTextareaInputCss = ":host{--textarea-padding:var(--wpp-text-area-padding, 9px 12px);--textarea-border-radius:var(--wpp-text-area-border-radius, var(--wpp-border-radius-m));--textarea-height:var(--wpp-text-area-border-radius, 106px);--textarea-label-color:var(--wpp-text-area-label-color, var(--wpp-text-color-info));--textarea-characters-limit-label-color:var(--wpp-textarea-characters-limit-label-color, var(--wpp-grey-color-800));--text-area-label-margin:var(--wpp-text-area-label-margin, 0 0 8px 0);--textarea-inline-message-margin:var(--wpp-text-area-inline-message-margin, 4px 0 0 0);--textarea-placeholder-color:var(--wpp-text-area-placeholder-color, var(--wpp-grey-color-700));--textarea-text-color-disabled:var(--wpp-text-area-text-color-disabled, var(--wpp-text-color-disabled));--textarea-characters-limit-font-weight:var(--wpp-textarea-characters-limit-font-weight, 400);--textarea-warning-charecters-limit-color:var(--wpp-text-area-border-radius, var(--wpp-warning-color-500));--textarea-error-charecters-limit-color:var(--wpp-text-area-border-radius, var(--wpp-danger-color-500));--textarea-bg-color:var(--wpp-text-area-bg-color, transparent);--textarea-bg-color-hover:var(--wpp-text-area-bg-color-hover, var(--wpp-grey-color-200));--textarea-bg-color-active:var(--wpp-text-area-bg-color-active, transparent);--textarea-bg-color-disabled:var(--wpp-text-area-bg-color-disabled, var(--wpp-grey-color-100));--textarea-border-color:var(--wpp-text-area-border-color, var(--wpp-grey-color-600));--textarea-border-color-hover:var(--wpp-text-area-border-color-hover, var(--wpp-grey-color-700));--textarea-border-color-active:var(--wpp-text-area-border-color-active, var(--wpp-grey-color-800));--textarea-border-color-disabled:var(--wpp-text-area-border-color-disabled, var(--wpp-grey-color-400));--counter-first-border-color-focus:var(--wpp-counter-first-border-color-focus, var(--wpp-grey-color-000));--counter-second-border-color-focus:var(--wpp-counter-second-border-color-focus, var(--wpp-brand-color));--textarea-border-width:var(--wpp-text-area-border-width, var(--wpp-border-width-s));--textarea-border-style:var(--wpp-text-area-border-style, solid)}:host([disabled]:not([disabled=false]):active){pointer-events:none}:host(.wpp-textarea-wrapper){display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0)}:host(.wpp-textarea-wrapper) .label .label-text{color:var(--textarea-label-color)}:host(.wpp-textarea-wrapper) .label{margin:var(--text-area-label-margin)}:host(.wpp-textarea-wrapper) textarea{-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--textarea-padding);overflow-y:auto;background-color:var(--textarea-bg-color);border:var(--textarea-border-width) var(--textarea-border-style) var(--textarea-border-color);border-radius:var(--textarea-border-radius);resize:none;outline:none;height:var(--text-area-height-by-rows, var(--textarea-height));scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host(.wpp-textarea-wrapper) textarea.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--counter-second-border-color-focus);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--counter-second-border-color-focus)}:host(.wpp-textarea-wrapper) textarea::-webkit-scrollbar{width:4px;height:4px}:host(.wpp-textarea-wrapper) textarea::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}:host(.wpp-textarea-wrapper) textarea:hover{background:var(--textarea-bg-color-hover);border:var(--textarea-border-width) var(--textarea-border-style) var(--textarea-border-color-hover)}:host(.wpp-textarea-wrapper) textarea:active{border:var(--textarea-border-width) var(--textarea-border-style) var(--textarea-border-color-active)}:host(.wpp-textarea-wrapper) textarea::-webkit-input-placeholder{color:var(--textarea-placeholder-color)}:host(.wpp-textarea-wrapper) textarea::-moz-placeholder{color:var(--textarea-placeholder-color)}:host(.wpp-textarea-wrapper) textarea:-ms-input-placeholder{color:var(--textarea-placeholder-color)}:host(.wpp-textarea-wrapper) textarea::-ms-input-placeholder{color:var(--textarea-placeholder-color)}:host(.wpp-textarea-wrapper) textarea::placeholder{color:var(--textarea-placeholder-color)}:host(.wpp-textarea-wrapper) textarea:focus{background:var(--textarea-bg-color-active);border:var(--textarea-border-width) var(--textarea-border-style) var(--textarea-border-color-active)}:host(.wpp-textarea-wrapper) textarea:disabled{color:var(--textarea-text-color-disabled);background:var(--textarea-bg-color-disabled);border:var(--textarea-border-width) var(--textarea-border-style) var(--textarea-border-color-disabled);cursor:not-allowed}:host(.wpp-textarea-wrapper) textarea:disabled::-webkit-input-placeholder{color:var(--textarea-text-color-disabled);-webkit-transition:0.5s ease-in-out;transition:0.5s ease-in-out}:host(.wpp-textarea-wrapper) textarea:disabled::-moz-placeholder{color:var(--textarea-text-color-disabled);-moz-transition:0.5s ease-in-out;transition:0.5s ease-in-out}:host(.wpp-textarea-wrapper) textarea:disabled:-ms-input-placeholder{color:var(--textarea-text-color-disabled);-ms-transition:0.5s ease-in-out;transition:0.5s ease-in-out}:host(.wpp-textarea-wrapper) textarea:disabled::-ms-input-placeholder{color:var(--textarea-text-color-disabled);-ms-transition:0.5s ease-in-out;transition:0.5s ease-in-out}:host(.wpp-textarea-wrapper) textarea:disabled::placeholder{color:var(--textarea-text-color-disabled);-webkit-transition:0.5s ease-in-out;transition:0.5s ease-in-out}:host(.wpp-textarea-wrapper) textarea.warning,:host(.wpp-textarea-wrapper) textarea.warning:hover{border:var(--textarea-border-width) var(--textarea-border-style) var(--wpp-warning-color-400)}:host(.wpp-textarea-wrapper) textarea.error,:host(.wpp-textarea-wrapper) textarea.error:hover{border:var(--textarea-border-width) var(--textarea-border-style) var(--wpp-danger-color-400)}:host(.wpp-textarea-wrapper) .characters-limit{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;margin-left:32px}:host(.wpp-textarea-wrapper) .characters-limit.warning .wpp-typography{color:var(--textarea-warning-charecters-limit-color)}:host(.wpp-textarea-wrapper) .characters-limit.warning .wpp-typography:first-child::part(typography){color:var(--textarea-warning-charecters-limit-color)}:host(.wpp-textarea-wrapper) .characters-limit.error .wpp-typography{color:var(--textarea-error-charecters-limit-color)}:host(.wpp-textarea-wrapper) .characters-limit.error .wpp-typography:first-child::part(typography){color:var(--textarea-error-charecters-limit-color)}:host(.wpp-textarea-wrapper) .characters-limit .wpp-typography:first-child{--wpp-typography-color:$labelColor;white-space:nowrap}:host(.wpp-textarea-wrapper) .characters-limit .wpp-typography:first-child::part(typography){color:var(--textarea-characters-limit-label-color);font-weight:var(--textarea-characters-limit-font-weight)}:host(.wpp-textarea-wrapper) .characters-limit .entered-characters{margin-left:2px;white-space:nowrap}:host(.wpp-textarea-wrapper) .messages-wrapper{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;margin:var(--textarea-inline-message-margin)}:host(.wpp-textarea-wrapper) .messages-wrapper.without-text-message{-ms-flex-pack:end;justify-content:flex-end}";

const WppTextareaInput$1 = /*@__PURE__*/ proxyCustomElement(class WppTextareaInput extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this._locales = LOCALES_DEFAULTS;
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.onInput = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.value = event.target.value;
      if (this.charactersLimit) {
        this.enteredCharacters = this.value.length;
      }
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.hostCssClasses = () => ({
      'wpp-textarea-input': true,
      'wpp-textarea-wrapper': true,
    });
    this.textAreaCssClasses = () => ({
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
      [`${this.messageType}`]: Boolean(this.messageType),
    });
    this.charLimitCssClasses = () => ({
      'characters-limit': true,
      warning: Boolean(this.charactersLimit &&
        this.enteredCharacters >= this.warningThreshold &&
        this.enteredCharacters <= this.charactersLimit),
      error: Boolean(this.charactersLimit && this.enteredCharacters > this.charactersLimit),
    });
    this.messageCssClasses = () => ({
      'messages-wrapper': true,
      'without-text-message': !!this.charactersLimit && !this.message,
    });
    this.focusType = undefined;
    this.name = undefined;
    this.value = undefined;
    this.placeholder = undefined;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.rows = undefined;
    this.size = 'm';
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.charactersLimit = undefined;
    this.warningThreshold = 20;
    this.ariaProps = {};
    this.locales = {};
    this.enteredCharacters = undefined;
  }
  /**
   * Method that selects all the text in an element
   */
  async select() {
    this.inputRef?.select();
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  /**
   * Method that sets input value.
   */
  async setValue(value) {
    this.value = value;
    this.wppChange.emit({
      value,
      name: this.name,
    });
  }
  /**
   * Method that returns current input value.
   */
  async getValue() {
    return this.value;
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    if (this.charactersLimit) {
      this.updateEnteredCharacters();
    }
  }
  componentDidLoad() {
    autoFocusElement(this.autoFocus, this.inputRef);
  }
  updateEnteredCharacters() {
    this.enteredCharacters = this.value?.length ?? 0;
  }
  onValueChange() {
    this.updateEnteredCharacters();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  render() {
    const style = {
      '--text-area-height-by-rows': this.rows ? 'auto' : '',
    };
    return (h(Host, { class: this.hostCssClasses(), "aria-disabled": this.disabled, "aria-required": this.required, exportparts: "label, textarea, message-wrapper, message, limit-wrapper, limit-label, limit-text", onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp }, this.labelConfig?.text && (h("wpp-label-v3-5-0", { class: "label", htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("textarea", { name: this.name, value: this.value, disabled: this.disabled, placeholder: this.placeholder, rows: this.rows, id: this.name, required: this.required, class: this.textAreaCssClasses(), onInput: this.onInput, ref: inputRef => (this.inputRef = inputRef), part: "textarea", "aria-label": this.ariaProps.label, style: style, title: "" }), (!!this.charactersLimit || !!this.message) && (h("div", { class: this.messageCssClasses(), part: "message-wrapper" }, !!this.message && (h("wpp-inline-message-v3-5-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, part: "message" })), !!this.charactersLimit && (h("div", { class: this.charLimitCssClasses(), "data-testid": "char-entered-label", part: "limit-wrapper" }, h("wpp-typography-v3-5-0", { type: "xs-body", tag: "span", part: "limit-label" }, this._locales.charactersEntered, ":"), h("wpp-typography-v3-5-0", { type: "xs-strong", tag: "span", class: "entered-characters", part: "limit-text" }, this.enteredCharacters, "/", this.charactersLimit)))))));
  }
  static get registryIs() { return "wpp-textarea-input-v3-5-0"; }
  get host() { return this; }
  static get watchers() { return {
    "value": ["onValueChange"],
    "locales": ["onUpdateLocales"]
  }; }
  static get style() { return wppTextareaInputCss; }
}, [1, "wpp-textarea-input", "wpp-textarea-input-v3-5-0", {
    "name": [1],
    "value": [1025],
    "placeholder": [1],
    "required": [516],
    "disabled": [516],
    "autoFocus": [4, "auto-focus"],
    "rows": [514],
    "size": [1],
    "labelConfig": [1040],
    "labelTooltipConfig": [16],
    "message": [1],
    "messageType": [1, "message-type"],
    "maxMessageLength": [2, "max-message-length"],
    "charactersLimit": [2, "characters-limit"],
    "warningThreshold": [2, "warning-threshold"],
    "ariaProps": [16],
    "locales": [16],
    "focusType": [32],
    "enteredCharacters": [32],
    "select": [64],
    "setFocus": [64],
    "setValue": [64],
    "getValue": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-textarea-input-v3-5-0", "wpp-action-button-v3-5-0", "wpp-icon-cross-v3-5-0", "wpp-icon-error-v3-5-0", "wpp-icon-info-message-v3-5-0", "wpp-icon-success-v3-5-0", "wpp-icon-warning-v3-5-0", "wpp-inline-message-v3-5-0", "wpp-internal-label-v3-5-0", "wpp-internal-tooltip-v3-5-0", "wpp-label-v3-5-0", "wpp-spinner-v3-5-0", "wpp-tooltip-v3-5-0", "wpp-typography-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-textarea-input-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTextareaInput$1);
      }
      break;
    case "wpp-action-button-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-cross-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-error-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-info-message-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-warning-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-inline-message-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-label-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-tooltip-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-label-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppTextareaInput = WppTextareaInput$1;
const defineCustomElement = defineCustomElement$1;

export { WppTextareaInput, defineCustomElement };
