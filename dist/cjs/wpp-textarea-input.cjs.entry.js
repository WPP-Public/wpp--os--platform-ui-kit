'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const common = require('./common-ee802540.js');
const utils = require('./utils-2231f97a.js');
require('./consts-d8f5ef98.js');

const LOCALES_DEFAULTS = {
  charactersEntered: 'Characters',
  exceededByCharacters: 'exceeded by',
};

const wppTextareaInputCss = ":host{--wpp-textarea-height:128px}:host([disabled]:not([disabled=false]):active){pointer-events:none}:host(.wpp-textarea-wrapper){display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0)}:host(.wpp-textarea-wrapper) .label .label-text{color:var(--wpp-text-color-info)}:host(.wpp-textarea-wrapper) .label{margin:0 0 8px 0}:host(.wpp-textarea-wrapper) textarea{-webkit-box-sizing:border-box;box-sizing:border-box;padding:9px 12px;overflow-y:auto;background-color:transparent;border:var(--wpp-border-width-s) solid var(--wpp-grey-color-600);border-radius:var(--wpp-border-radius-m);resize:none;outline:none;height:var(--wpp-textarea-height);word-wrap:break-word;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host(.wpp-textarea-wrapper) textarea.stretch{--wpp-textarea-height:auto;min-height:calc(1 * var(--wpp-font-line-height-s-body, 22px) + 2 * var(--wpp-border-width-s) + 18px);overflow-x:hidden;overflow-y:hidden}:host(.wpp-textarea-wrapper) textarea.is-scrollable{overflow-y:auto}:host(.wpp-textarea-wrapper) textarea.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host(.wpp-textarea-wrapper) textarea::-webkit-scrollbar{width:4px;height:4px}:host(.wpp-textarea-wrapper) textarea::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}:host(.wpp-textarea-wrapper) textarea:hover{background:var(--wpp-grey-color-200);border:var(--wpp-border-width-s) solid var(--wpp-grey-color-700)}:host(.wpp-textarea-wrapper) textarea:active{border:var(--wpp-border-width-s) solid var(--wpp-grey-color-800)}:host(.wpp-textarea-wrapper) textarea::-webkit-input-placeholder{color:var(--wpp-grey-color-700)}:host(.wpp-textarea-wrapper) textarea::-moz-placeholder{color:var(--wpp-grey-color-700)}:host(.wpp-textarea-wrapper) textarea:-ms-input-placeholder{color:var(--wpp-grey-color-700)}:host(.wpp-textarea-wrapper) textarea::-ms-input-placeholder{color:var(--wpp-grey-color-700)}:host(.wpp-textarea-wrapper) textarea::placeholder{color:var(--wpp-grey-color-700)}:host(.wpp-textarea-wrapper) textarea:focus{background:transparent;border:var(--wpp-border-width-s) solid var(--wpp-grey-color-800)}:host(.wpp-textarea-wrapper) textarea:disabled{color:var(--wpp-text-color-disabled);background:var(--wpp-grey-color-100);border:var(--wpp-border-width-s) solid var(--wpp-grey-color-400);cursor:not-allowed}:host(.wpp-textarea-wrapper) textarea:disabled::-webkit-input-placeholder{color:var(--wpp-text-color-disabled);-webkit-transition:0.5s ease-in-out;transition:0.5s ease-in-out}:host(.wpp-textarea-wrapper) textarea:disabled::-moz-placeholder{color:var(--wpp-text-color-disabled);-moz-transition:0.5s ease-in-out;transition:0.5s ease-in-out}:host(.wpp-textarea-wrapper) textarea:disabled:-ms-input-placeholder{color:var(--wpp-text-color-disabled);-ms-transition:0.5s ease-in-out;transition:0.5s ease-in-out}:host(.wpp-textarea-wrapper) textarea:disabled::-ms-input-placeholder{color:var(--wpp-text-color-disabled);-ms-transition:0.5s ease-in-out;transition:0.5s ease-in-out}:host(.wpp-textarea-wrapper) textarea:disabled::placeholder{color:var(--wpp-text-color-disabled);-webkit-transition:0.5s ease-in-out;transition:0.5s ease-in-out}:host(.wpp-textarea-wrapper) textarea.warning,:host(.wpp-textarea-wrapper) textarea.warning:hover{border:var(--wpp-border-width-s) solid var(--wpp-warning-color-400)}:host(.wpp-textarea-wrapper) textarea.error,:host(.wpp-textarea-wrapper) textarea.error:hover{border:var(--wpp-border-width-s) solid var(--wpp-danger-color-400)}:host(.wpp-textarea-wrapper) .characters-limit{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;margin-left:32px}:host(.wpp-textarea-wrapper) .characters-limit.warning .wpp-typography{color:var(--wpp-warning-color-500)}:host(.wpp-textarea-wrapper) .characters-limit.warning .wpp-typography:first-child::part(typography){color:var(--wpp-warning-color-500)}:host(.wpp-textarea-wrapper) .characters-limit.error .wpp-typography{color:var(--wpp-danger-color-500)}:host(.wpp-textarea-wrapper) .characters-limit.error .wpp-typography:first-child::part(typography){color:var(--wpp-danger-color-500)}:host(.wpp-textarea-wrapper) .characters-limit .wpp-typography:first-child{--wpp-typography-color:$labelColor;white-space:nowrap}:host(.wpp-textarea-wrapper) .characters-limit .wpp-typography:first-child::part(typography){color:var(--wpp-grey-color-800);font-weight:400}:host(.wpp-textarea-wrapper) .characters-limit .entered-characters{margin-left:2px;white-space:nowrap}:host(.wpp-textarea-wrapper) .messages-wrapper{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;margin:4px 0 0 0}:host(.wpp-textarea-wrapper) .messages-wrapper.without-text-message{-ms-flex-pack:end;justify-content:flex-end}:host(.wpp-textarea-wrapper) .sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;-webkit-clip-path:inset(50%) !important;clip-path:inset(50%) !important;border:0 !important;white-space:nowrap !important}";

const WppTextareaInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this._locales = LOCALES_DEFAULTS;
    // Autosize variables
    this.previousValue = '';
    this.adjustHeight = () => {
      if (!this.inputRef || this.inputRef.scrollHeight === 0)
        return;
      const computed = window.getComputedStyle(this.inputRef);
      const shouldShrink = this.previousValue !== '' &&
        (this.inputRef.value.length < this.previousValue.length || !this.inputRef.value.startsWith(this.previousValue));
      if (shouldShrink) {
        this.isScrollable = false;
        this.inputRef.style.setProperty('--wpp-textarea-height', 'auto');
      }
      const borderPadding = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
      const newHeight = this.inputRef.scrollHeight - borderPadding;
      if (this.rows === 'stretch' && this.maxHeight && newHeight > this.maxHeight) {
        this.inputRef.style.setProperty('--wpp-textarea-height', `${this.maxHeight}px`);
        this.isScrollable = true;
      }
      else {
        this.inputRef.style.setProperty('--wpp-textarea-height', `${newHeight}px`);
        this.isScrollable = false;
      }
      this.previousValue = this.inputRef.value;
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = common.FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      if (!this.disabled)
        this.focusType = common.FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (this.disabled)
        return;
      if (event.key === 'Tab') {
        this.inputRef?.select();
        this.focusType = common.FOCUS_TYPE.TAB;
      }
    };
    this.onInput = (event) => {
      this.value = event.target.value;
      if (this.rows === 'stretch')
        this.adjustHeight();
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
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
      stretch: this.rows === 'stretch',
      'is-scrollable': this.isScrollable,
      [`${this.messageType}`]: Boolean(this.messageType),
    });
    this.hasWarning = () => {
      if (!this.charactersLimit)
        return false;
      if (this.enteredCharacters < this.warningThreshold)
        return false;
      if (this.enteredCharacters > this.charactersLimit)
        return false;
      return true;
    };
    this.charLimitCssClasses = () => ({
      'characters-limit': true,
      warning: this.hasWarning(),
      error: Boolean(this.charactersLimit && this.enteredCharacters > this.charactersLimit),
    });
    this.messageCssClasses = () => ({
      'messages-wrapper': true,
      'without-text-message': !!this.charactersLimit && !this.message,
    });
    this.focusType = undefined;
    this.validAriaProps = {};
    this.name = undefined;
    this.value = undefined;
    this.placeholder = undefined;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.rows = undefined;
    this.maxHeight = 1000;
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
    this.isScrollable = false;
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
    this.inputId = this.name || 'textarea-input';
    this.labelId = this.labelConfig?.labelId || 'label';
    this.messageId = 'message';
    this.counterId = 'counter';
    this.validAriaProps = utils.getAriaProps(this.ariaProps);
    if (this.charactersLimit) {
      this.updateEnteredCharacters();
    }
  }
  componentDidLoad() {
    utils.autoFocusElement(this.autoFocus, this.inputRef);
    if (this.rows === 'stretch')
      this.initAutosize();
  }
  disconnectedCallback() {
    if (this.rows === 'stretch')
      this.cleanup();
  }
  updateEnteredCharacters() {
    this.enteredCharacters = this.value?.length ?? 0;
  }
  onValueChange() {
    this.updateEnteredCharacters();
  }
  onRowsChange(newValue, oldValue) {
    if (newValue === 'stretch' && oldValue !== 'stretch') {
      this.initAutosize();
    }
    else if (newValue !== 'stretch' && oldValue === 'stretch') {
      this.cleanup();
    }
  }
  handleMaxHeightChange() {
    if (this.rows === 'stretch')
      this.adjustHeight();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  onUpdateAriaProps() {
    this.validAriaProps = utils.getAriaProps(this.ariaProps);
  }
  initAutosize() {
    if (!this.inputRef)
      return;
    this.adjustHeight();
    this.resizeObserver = new ResizeObserver(() => {
      this.adjustHeight();
    });
    this.resizeObserver.observe(this.inputRef);
  }
  cleanup() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (!this.inputRef)
      return;
    this.inputRef.style.removeProperty('--wpp-textarea-height');
    this.isScrollable = false;
  }
  getAriaAttributes() {
    const hasLabel = !!this.labelConfig?.text;
    const overLimit = !!this.charactersLimit && (this.enteredCharacters ?? 0) > (this.charactersLimit ?? 0);
    // aria-labelledby
    const labelledByParts = [];
    if (hasLabel)
      labelledByParts.push(this.labelId);
    if (this.ariaProps?.labelledby)
      labelledByParts.push(this.ariaProps.labelledby);
    // aria-describedby
    const describedByParts = [];
    const providedDescribedBy = this.validAriaProps['aria-describedby'] || this.ariaProps?.describedby;
    if (providedDescribedBy)
      describedByParts.push(providedDescribedBy);
    if (this.message)
      describedByParts.push(this.messageId);
    if (this.charactersLimit)
      describedByParts.push(this.counterId);
    return {
      'aria-labelledby': labelledByParts.join(' ') || undefined,
      'aria-describedby': describedByParts.join(' ') || undefined,
      'aria-invalid': overLimit || this.messageType === 'error' ? 'true' : undefined,
      'aria-errormessage': this.messageType === 'error' ? this.messageId : undefined,
      'aria-required': this.required ? 'true' : undefined,
    };
  }
  get isOverLimit() {
    return !!this.charactersLimit && (this.enteredCharacters ?? 0) > (this.charactersLimit ?? 0);
  }
  render() {
    const style = {
      ...((this.rows === 'stretch' || !!this.rows) && { '--wpp-textarea-height': 'auto' }),
    };
    const ariaAttrs = this.getAriaAttributes();
    const overLimit = this.isOverLimit;
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "label, textarea, message-wrapper, message, limit-wrapper, limit-label, limit-text", style: style }, this.labelConfig?.text && (index.h("wpp-label-v4-1-0", { class: "label", id: this.labelId, htmlFor: this.inputId, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), index.h("textarea", { name: this.name, value: this.value, disabled: this.disabled, placeholder: this.placeholder, rows: this.rows === 'stretch' ? 1 : this.rows ? this.rows : undefined, id: this.inputId, required: this.required, class: this.textAreaCssClasses(), onInput: this.onInput, ref: inputRef => (this.inputRef = inputRef), part: "textarea", onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, ...ariaAttrs, ...this.validAriaProps }), (!!this.charactersLimit || !!this.message) && (index.h("div", { class: this.messageCssClasses(), part: "message-wrapper", "aria-live": "polite", "aria-atomic": "true" }, !!this.message && (index.h("wpp-inline-message-v4-1-0", { id: this.messageId, message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, part: "message" })), !!this.charactersLimit && (index.h("div", { id: this.counterId, class: this.charLimitCssClasses(), "data-testid": "char-entered-label", part: "limit-wrapper" }, index.h("wpp-typography-v4-1-0", { type: "xs-body", tag: "span", part: "limit-label" }, this._locales.charactersEntered, ":"), index.h("wpp-typography-v4-1-0", { type: "xs-strong", tag: "span", class: "entered-characters", part: "limit-text" }, this.enteredCharacters, "/", this.charactersLimit), overLimit && (index.h("wpp-typography-v4-1-0", { type: "xs-body", tag: "span", class: "exceeded-characters sr-only", part: "limit-text" }, this._locales.exceededByCharacters, " ", this.enteredCharacters - (this.charactersLimit || 0)))))))));
  }
  static get registryIs() { return "wpp-textarea-input-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"],
    "rows": ["onRowsChange"],
    "maxHeight": ["handleMaxHeightChange"],
    "locales": ["onUpdateLocales"],
    "ariaProps": ["onUpdateAriaProps"]
  }; }
};
WppTextareaInput.style = wppTextareaInputCss;

exports.wpp_textarea_input = WppTextareaInput;
