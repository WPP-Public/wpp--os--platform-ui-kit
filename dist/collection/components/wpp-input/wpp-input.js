import { h, Host } from '@stencil/core';
import { Maskito, maskitoInitialCalibrationPlugin, maskitoTransform } from '@maskito/core';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
import { maskitoNumberOptionsGenerator, maskitoPrefixPostprocessorGenerator, maskitoWithPlaceholder, } from '@maskito/kit';
import { FOCUS_TYPE } from '../../types/common';
import { autoFocusElement, getSlotEmptyStates } from '../../utils/utils';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { getRawValueForExtra, getValidAutocomplete } from './utils';
import { INPUT_BORDER_WIDTH, LOCALES_DEFAULTS, SUPPORTED_INPUT_TYPES_FOR_MASK } from './const';
const getInitFocusInfo = () => ({
  input: FOCUS_TYPE.NONE,
  icon: FOCUS_TYPE.NONE,
  inlineMessage: FOCUS_TYPE.NONE,
});
/**
 * @part input - Input element
 * @part label - label text element
 * @part body - Main content element
 * @part icon-search - icon search element
 * @part icon-cross - icon cross element
 * @part message - message
 *
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a search icon.
 * @slot icon-end - Can contain an icon that will be placed after the main content, e.g. a cross icon.
 */
export class WppInput {
  constructor() {
    this._locales = LOCALES_DEFAULTS;
    // We need to track the generated mask in order to transform the value when it is set programmatically
    this.generatedMask = undefined;
    // This function is needed in order to check the rendered value in the input and validate the layout (check for truncation, cross icon visibility)
    this.checkInputAfterRender = () => {
      // Very similar to Watch('value'), but we need to ensure the component actually rendered the new value to avoid setTimeout() in watcher.
      // Also performs a dirty check to avoid infinite loops.
      if (this.previouslyRenderedValue !== this.renderedValue) {
        if (this.focusType.input === FOCUS_TYPE.NONE) {
          // This covers cases when the value is changed programatically while the input is not focused (e.g: in the slider, when moving the thumbs).
          // The other cases are handled by onBlur method & resize observer.
          this.checkForEllipsis();
        }
        if (this.withCrossIcon &&
          // The only cases when we need to check for the cross icon is either when the value becomes empty or the previous value was empty.
          ((!this.renderedValue && this.previouslyRenderedValue) || (this.renderedValue && !this.previouslyRenderedValue))) {
          this.updateCrossIcon();
        }
        this.previouslyRenderedValue = this.renderedValue;
      }
    };
    // We need to setup a resize observer so we can check when to render the cross icon (based on the input width)
    // and check for truncation.
    this.setupResizeObserver = () => {
      if (!this.inputRef)
        return;
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.host);
    };
    this.handleResize = (entries) => {
      for (const entry of entries) {
        if (entry.target === this.host) {
          if (this.withCrossIcon) {
            this.updateCrossIcon();
          }
          this.checkForEllipsis();
        }
      }
    };
    this.updateCrossIcon = () => {
      if (!this.withCrossIcon)
        return;
      const isActive = this.isInputFocused || this.isHovered;
      if (!isActive) {
        this.shouldRenderCrossIcon = false;
        return;
      }
      if (!this.renderedValue && !this.internalDefaultValue) {
        this.shouldRenderCrossIcon = false;
        // Cross icon is displayed on inputs with min-width >= 200px.
      }
      else if (!this.inputRef || this.inputRef.offsetWidth < 200) {
        this.shouldRenderCrossIcon = false;
      }
      else {
        this.shouldRenderCrossIcon = true;
      }
    };
    this.updateInputRef = (inputRef) => {
      if (inputRef)
        this.inputRef = inputRef;
    };
    this.createMaskForInput = () => {
      if (this.inputRef) {
        if (this.type === 'decimal') {
          // When type is decimal and no mask is provided, we provide a default mask to support decimal numbers only.
          // The type="decimal" input is actually a text input with a mask that supports decimal numbers only.
          this.generatedMask = this.maskOptions?.decimalPatternOptions
            ? maskitoNumberOptionsGenerator(this.maskOptions.decimalPatternOptions)
            : { mask: /^-?\d*(?:[.,]\d*)?$/ };
        }
        else if (SUPPORTED_INPUT_TYPES_FOR_MASK.includes(this.type)) {
          // Generate the mask options based on the provided `maskOptions` prop
          this.generatedMask = this.getMaskOptions();
        }
        else {
          this.generatedMask = undefined;
        }
        if (!this.generatedMask)
          return;
        this.maskedElement = new Maskito(this.inputRef, {
          overwriteMode: 'shift',
          ...this.generatedMask,
          // The `maskitoInitialCalibrationPlugin` is used to ensure the initial value is properly formatted
          plugins: [maskitoInitialCalibrationPlugin(), ...(this.generatedMask?.plugins || [])],
        });
      }
    };
    this.destroyMask = () => {
      if (this.maskedElement) {
        this.maskedElement.destroy();
      }
      if (this.generatedMask) {
        this.generatedMask = undefined;
      }
    };
    this.checkForEllipsis = () => {
      if (!this.inputRef)
        return;
      if (this.renderedValue && this.renderedValue.length > 0) {
        /**
         * For some reason, when the width of the input is not an integer, E.g: 328.85px,
         * the `clientWidth` is always smaller than the `scrollWidth` by "1px".
         * This logic seems to cover all cases:
         * - The width is an integer: `clientWidth` and `scrollWidth` are computed as expected
         * - The width is a float: `clientWidth` will always be by "1px" smaller than the `scrollWidth`, so we compensate.
         */
        if (this.inputRef.getBoundingClientRect().width - 2 * INPUT_BORDER_WIDTH === this.inputRef.clientWidth) {
          this.hasActiveEllipses = this.inputRef.clientWidth < this.inputRef.scrollWidth;
        }
        else {
          this.hasActiveEllipses = this.inputRef.clientWidth + 1 < this.inputRef.scrollWidth;
        }
      }
      else {
        this.hasActiveEllipses = false;
      }
    };
    this.getMaskOptions = () => {
      if (this.type === 'tel') {
        // We should apply the telephone mask when type is 'tel'
        return this.createTelPatternOptions();
      }
      if (this.maskOptions?.decimalPatternOptions) {
        return maskitoNumberOptionsGenerator(this.maskOptions.decimalPatternOptions);
      }
      if (this.maskOptions?.customPatternOptions) {
        if (this.maskOptions.maskPlaceholder) {
          return {
            ...maskitoWithPlaceholder(this.maskOptions.maskPlaceholder),
            ...this.maskOptions.customPatternOptions,
          };
        }
        return this.maskOptions.customPatternOptions;
      }
      return undefined;
    };
    this.createTelPatternOptions = () => {
      if (!this.maskOptions?.telPatternOptions) {
        // If no mask options for telephone are provided, return undefined
        return undefined;
      }
      if (this.maskOptions.telPatternOptions.mask && this.maskOptions.telPatternOptions.countryPhoneCode) {
        if (this.maskOptions.maskPlaceholder) {
          const { removePlaceholder, plugins, ...placeholderOptions } = maskitoWithPlaceholder(this.maskOptions.maskPlaceholder);
          return {
            preprocessors: placeholderOptions.preprocessors,
            postprocessors: [
              maskitoPrefixPostprocessorGenerator(this.maskOptions.telPatternOptions.countryPhoneCode),
              ...placeholderOptions.postprocessors,
            ],
            plugins,
            mask: this.maskOptions.telPatternOptions.mask,
          };
        }
        return {
          postprocessors: [maskitoPrefixPostprocessorGenerator(this.maskOptions.telPatternOptions.countryPhoneCode)],
          mask: this.maskOptions.telPatternOptions.mask,
        };
      }
      return maskitoPhoneOptionsGenerator({
        countryIsoCode: this.maskOptions?.telPatternOptions?.countryCode || 'US',
        metadata,
      });
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        start: '[slot="icon-start"]',
        end: '[slot="icon-end"]',
      });
      this.hasIconStartSlot = !emptyStates.start;
      this.hasIconEndSlot = !emptyStates.end;
    };
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.validateInputLength = () => {
      if (!this.maxLength && !this.minLength)
        return;
      if (this.maxLength && this.renderedValue.length > this.maxLength) {
        this.lengthValidationError = this._locales.maxLengthErrorMessage(this.maxLength);
      }
      else if (this.minLength && this.renderedValue.length < this.minLength) {
        this.lengthValidationError = this._locales.minLengthErrorMessage(this.minLength);
      }
      else {
        this.lengthValidationError = undefined;
      }
    };
    this.onInput = (event) => {
      this.internalDefaultValue = undefined;
      const eventValue = event.target.value;
      const rawValue = getRawValueForExtra(eventValue, this.type, this.maskOptions);
      this.value = eventValue;
      if (this.type === 'number' || this.type === 'decimal')
        this.validateInputLength();
      this.wppChange.emit({
        value: this.renderedValue,
        ...(this.generatedMask ? { rawValue } : {}),
        name: this.name,
      });
      this.wppChangeExtra.emit({
        raw: rawValue,
        formatted: eventValue,
        name: this.name,
      });
    };
    this.onClear = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.internalDefaultValue = undefined;
      this.renderedValue = '';
      this.hasActiveEllipses = false;
      this.setFocus();
      this.wppChange.emit({
        value: '',
        ...(this.generatedMask ? { rawValue: '' } : {}),
        name: this.name,
      });
      this.wppChangeExtra.emit({
        raw: '',
        formatted: '',
        name: this.name,
      });
    };
    this.onFocus = (event) => {
      this.isInputFocused = true;
      if (this.withCrossIcon) {
        this.updateCrossIcon(); // ✅ mandatory
      }
      if (this.type === 'search') {
        this.inputRef?.select();
      }
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.isInputFocused = false;
      this.shouldRenderCrossIcon = false;
      this.checkForEllipsis();
      this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('icon', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('inlineMessage', FOCUS_TYPE.NONE);
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('icon', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('inlineMessage', FOCUS_TYPE.MOUSE);
    };
    this.onKeyUp = (event, type) => {
      if (event.key === 'Tab') {
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
      }
    };
    this.onKeyDown = (event, type) => {
      if (type === 'icon') {
        if (event.key === 'Enter' || event.key === ' ') {
          this.onClear(event);
        }
      }
    };
    this.onKeyPress = (event) => {
      if (this.type !== 'number')
        return;
      if (!event.key.match(/^[0-9]+$/))
        event.preventDefault();
    };
    this.inputCssClasses = () => ({
      'input-element': true,
      'with-cross-icon': this.shouldRenderCrossIcon,
      [`size-${this.size}`]: true,
      [`${this.messageType}`]: !!this.messageType,
      [`with-icon-start`]: this.hasIconStartSlot || (this.type === 'search' && this.loading && !this.disabled) || this.type === 'search',
      'with-double-icon-end': this.hasIconEndSlot && this.shouldRenderCrossIcon,
      'tab-focus': this.focusType.input === FOCUS_TYPE.TAB &&
        this.focusType.icon !== FOCUS_TYPE.TAB &&
        this.focusType.inlineMessage !== FOCUS_TYPE.TAB,
      'with-validation-error': !!this.lengthValidationError,
    });
    this.wrapperCssClasses = () => ({
      'wpp-input': true,
      'with-value': !!this.renderedValue?.length,
      [`wpp-size-${this.size}`]: true,
    });
    this.inputWithIconsCssClasses = () => ({
      'input-with-icons': true,
    });
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'disabled-icon': this.disabled,
      'slot-hidden': !this.hasIconStartSlot && !(this.type === 'search' && this.loading && !this.disabled),
    });
    this.iconEndCssClasses = (iconType) => ({
      'icon-end': true,
      'disabled-icon': this.disabled,
      'slot-hidden': !this.hasIconEndSlot && !(this.type === 'search' && this.loading && !this.disabled),
      ...(iconType === 'native' && this.shouldRenderCrossIcon && this.hasIconEndSlot ? { 'double-icon-end': true } : {}),
    });
    this.inputId = this.name || 'wpp-input';
    this.labelId = `${this.inputId}-label`;
    this.getInputType = () => {
      if (this.maskOptions) {
        // When mask options are provided, we need to ensure the input type is supported for masking
        return SUPPORTED_INPUT_TYPES_FOR_MASK.includes(this.type) ? this.type : 'text';
      }
      return this.type === 'decimal' ? 'text' : this.type;
    };
    this.renderInput = () => (h("input", { id: this.inputId, class: this.inputCssClasses(), name: this.name, type: this.getInputType(), value: this.renderedValue, required: this.required, disabled: this.disabled, onInput: this.onInput, onKeyPress: this.onKeyPress, readOnly: this.readOnly, ref: inputRef => this.updateInputRef(inputRef), "aria-label": this.ariaProps.label, defaultValue: this.defaultValue, part: "input", title: "", placeholder: this.placeholder, autocomplete: getValidAutocomplete(this.autocomplete), "aria-disabled": this.disabled || this.loading ? 'true' : 'false', "aria-required": this.required ? 'true' : undefined, "aria-labelledby": this.labelConfig?.text ? this.labelId : undefined, "aria-invalid": this.lengthValidationError || this.messageType === 'error' ? 'true' : undefined, "aria-activedescendant": this.ariaProps.activedescendant ?? undefined, "data-testid": "input" }));
    this.renderSearchIconOrSpinner = () => {
      if (this.type !== 'search')
        return null;
      if (this.loading && !this.disabled) {
        return h("wpp-spinner-v4-0-0", { class: this.iconStartCssClasses(), slot: "left", "aria-label": "Loading" });
      }
      return h("wpp-icon-search-v4-0-0", { class: this.iconStartCssClasses(), part: "icon-search" });
    };
    this.shouldRenderCrossIcon = false;
    this.hasActiveEllipses = false;
    this.hasIconStartSlot = false;
    this.hasIconEndSlot = false;
    this.isInputFocused = false;
    this.isHovered = false;
    this.focusType = getInitFocusInfo();
    this.renderedValue = '';
    this.name = undefined;
    this.type = 'text';
    this.value = undefined;
    this.defaultValue = undefined;
    this.placeholder = undefined;
    this.required = false;
    this.readOnly = false;
    this.disabled = false;
    this.autoFocus = false;
    this.size = 'm';
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.ariaProps = {};
    this.tooltipConfig = {};
    this.truncationTooltipConfig = {};
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.maskOptions = undefined;
    this.labelConfig = undefined;
    this.maxLength = undefined;
    this.minLength = undefined;
    this.locales = {};
    this.loading = false;
    this.autocomplete = 'off';
    this.withCrossIcon = true;
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
  async setFocus(isOutlined) {
    requestAnimationFrame(() => {
      this.inputRef?.focus();
      if (isOutlined)
        this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.TAB);
    });
  }
  /**
   * Method that sets the input value programmatically.
   */
  async setValue(value) {
    if (value === this.renderedValue)
      return;
    let rawValue = undefined;
    if (this.generatedMask) {
      // In case the input has a generated mask internally, we align the value with the mask
      this.renderedValue = maskitoTransform(value, this.generatedMask);
      // We need to compute the raw values as well because this function can be called with formatted values.
      rawValue = getRawValueForExtra(this.renderedValue, this.type, this.maskOptions);
    }
    else {
      this.renderedValue = value;
    }
    if (this.inputRef) {
      this.inputRef.value = value;
    }
    this.wppChange.emit({
      value: this.renderedValue,
      ...(rawValue !== undefined ? { rawValue } : {}),
      name: this.name,
    });
  }
  /**
   * Method that returns current input value.
   */
  async getValue() {
    return this.renderedValue;
  }
  onUpdateMaskOptions(newMaskOptions, prevMaskOptions) {
    if (JSON.stringify(newMaskOptions) === JSON.stringify(prevMaskOptions))
      return;
    const rawNumericValue = getRawValueForExtra(this.renderedValue, this.type, prevMaskOptions);
    this.destroyMask();
    /**
     * Need to initialize a new value (if exists) before creating a new mask
     * This is needed because createMaskForInput create a new Maskito instance with actual input value
     */
    if (this.inputRef && rawNumericValue !== null) {
      this.inputRef.value = String(rawNumericValue);
    }
    this.createMaskForInput();
    if (this.generatedMask && rawNumericValue !== null) {
      this.renderedValue = maskitoTransform(String(rawNumericValue), this.generatedMask);
      if (this.inputRef)
        this.inputRef.value = this.renderedValue;
    }
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  onUpdateValue(newValue) {
    if (this.maskOptions) {
      if (!this.generatedMask)
        return;
      this.renderedValue = maskitoTransform(newValue, this.generatedMask);
    }
    else {
      this.renderedValue = newValue;
    }
  }
  connectedCallback() {
    if (this.withCrossIcon) {
      this.updateCrossIcon();
    }
    this.checkForEllipsis();
    this.internalDefaultValue = this.defaultValue;
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    this.updateSlotData();
    this.renderedValue = this.value || this.internalDefaultValue || '';
  }
  componentDidRender() {
    this.checkInputAfterRender();
  }
  componentDidLoad() {
    autoFocusElement(this.autoFocus, this.inputRef);
    this.createMaskForInput();
    this.setupResizeObserver();
  }
  disconnectedCallback() {
    this.destroyMask();
    if (this.resizeObserver && this.inputRef) {
      this.resizeObserver.unobserve(this.inputRef);
      this.resizeObserver.disconnect();
    }
  }
  render() {
    return (h(Host, { class: this.wrapperCssClasses(), onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onMouseEnter: () => {
        this.isHovered = true;
        this.updateCrossIcon();
      }, onMouseLeave: () => {
        this.isHovered = false;
        this.updateCrossIcon();
      }, onKeyUp: (event) => this.onKeyUp(event, 'input'), exportparts: "label, body, icon-search, input, icon-cross, message, icon-start, icon-start-wrapper, icon-end, icon-end-wrapper" }, this.labelConfig?.text && (h("wpp-label-v4-0-0", { class: "label", id: this.labelId, htmlFor: this.inputId, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: this.inputWithIconsCssClasses(), part: "body" }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), this.renderSearchIconOrSpinner(), h("wpp-tooltip-v4-0-0", { part: "anchor", text: this.renderedValue, class: "with-tooltip", anchorTabIndex: -1, config: {
        ...this.truncationTooltipConfig,
        onShow: (instance) => {
          if (!this.hasActiveEllipses || this.type === 'password')
            return false;
          if (this.truncationTooltipConfig.onShow) {
            return this.truncationTooltipConfig?.onShow(instance);
          }
        },
      } }, this.renderInput()), this.shouldRenderCrossIcon && this.withCrossIcon && (h("wpp-icon-cross-v4-0-0", { class: this.iconEndCssClasses('native'), "aria-label": "Erase input text", role: "button", "aria-disabled": this.disabled ? 'true' : 'false', tabIndex: 0, part: "icon-cross", onMouseDown: event => event.preventDefault(), onClick: event => this.onClear(event), onKeyUp: (event) => this.onKeyUp(event, 'icon'), onKeyDown: (event) => this.onKeyDown(event, 'icon') })), h(WrappedSlot, { wrapperClass: this.iconEndCssClasses('slot'), name: "icon-end", onSlotchange: this.updateSlotData, tabIndex: this.hasIconEndSlot ? 0 : -1, "aria-label": "Clear input", role: "button" })), this.lengthValidationError && (h("wpp-inline-message-v4-0-0", { message: this.lengthValidationError, type: 'error', showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message", onKeyUp: (event) => this.onKeyUp(event, 'inlineMessage') })), this.message && (h("wpp-inline-message-v4-0-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message", onKeyUp: (event) => this.onKeyUp(event, 'inlineMessage') }))));
  }
  static get is() { return "wpp-input"; }
  static get registryIs() { return "wpp-input-v4-0-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-input.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-input.css"]
    };
  }
  static get properties() {
    return {
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input name."
        },
        "attribute": "name",
        "reflect": false
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "InputTypes",
          "resolved": "\"decimal\" | \"email\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"url\"",
          "references": {
            "InputTypes": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-input/types.ts::InputTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the input type."
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'text'"
      },
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "InputValue",
          "resolved": "string",
          "references": {
            "InputValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-input/types.ts::InputValue"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the input value."
        },
        "attribute": "value",
        "reflect": false
      },
      "defaultValue": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "InputValue",
          "resolved": "string | undefined",
          "references": {
            "InputValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-input/types.ts::InputValue"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the default value of the input.\nNote: This value is used only when the component is uncontrolled."
        },
        "attribute": "default-value",
        "reflect": false
      },
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input placeholder."
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "required": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the input is required."
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "readOnly": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the input is readonly."
        },
        "attribute": "read-only",
        "reflect": true,
        "defaultValue": "false"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the input is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "autoFocus": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the input should be focused on page load"
        },
        "attribute": "auto-focus",
        "reflect": false,
        "defaultValue": "false"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'m' | 's'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the input size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "message": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input message."
        },
        "attribute": "message",
        "reflect": false
      },
      "messageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "InputMessageTypes",
          "resolved": "\"error\" | \"warning\" | undefined",
          "references": {
            "InputMessageTypes": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::InputMessageTypes"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input message type."
        },
        "attribute": "message-type",
        "reflect": false
      },
      "maxMessageLength": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "number | 'auto'",
          "resolved": "\"auto\" | number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input message maximum length."
        },
        "attribute": "max-message-length",
        "reflect": false
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the input `aria-` props."
        },
        "defaultValue": "{}"
      },
      "tooltipConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "truncationTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- this property is used internally. Controlled by the inline-edit. When the inline edit enters error state, the tooltip for truncation should not display."
            }],
          "text": "The configuration for the tooltip displayed when the input is truncated."
        },
        "defaultValue": "{}"
      },
      "labelTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      },
      "maskOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "MaskOptions",
          "resolved": "undefined | { decimalPatternOptions?: MaskitoNumberParams | undefined; maskPlaceholder?: string | undefined; customPatternOptions?: MaskitoOptions | undefined; telPatternOptions?: MaskitoTelephoneParams | undefined; }",
          "references": {
            "MaskOptions": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-input/types.ts::MaskOptions"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the custom mask options. Under the hood, the masking is done using maskito library. Provides various options, such as: custom patterns, telephone and number patterns.\nDevelopers can also enable the placeholder for the mask by providing the `maskPlaceholder` property.\nIt can be used with the following types: 'text', 'tel', 'search', 'url', 'password'."
        }
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "InputLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "InputLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-input/types.ts::InputLabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates label config"
        }
      },
      "maxLength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates the maximum number of characters the input can accept.\nIf the user introduces more characters, the input will display an error."
        },
        "attribute": "max-length",
        "reflect": false
      },
      "minLength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates the minimum number of characters the input can accept.\nIf the user introduces less characters, the input will display an error."
        },
        "attribute": "min-length",
        "reflect": false
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<InputLocaleInterface>",
          "resolved": "{ minLengthErrorMessage?: ((minLength: number) => string) | undefined; maxLengthErrorMessage?: ((maxLength: number) => string) | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "InputLocaleInterface": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-input/types.ts::InputLocaleInterface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the component locale types."
        },
        "defaultValue": "{}"
      },
      "loading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the component is loading."
        },
        "attribute": "loading",
        "reflect": true,
        "defaultValue": "false"
      },
      "autocomplete": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the autocomplete behavior for the input.\nPossible values:\n- \"on\": Enables autocomplete for the input.\n- \"off\": Disables autocomplete for the input.\n- Additional valid values: See HTML specifications (e.g., \"name\", \"email\", \"username\").\nDefault: \"off\""
        },
        "attribute": "autocomplete",
        "reflect": false,
        "defaultValue": "'off'"
      },
      "withCrossIcon": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the input displays a cross icon on the right side. Clicking the icon will reset the value of the input.\nNote: The cross icon will appear only on inputs that have a min-width of 160px."
        },
        "attribute": "with-cross-icon",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "shouldRenderCrossIcon": {},
      "hasActiveEllipses": {},
      "hasIconStartSlot": {},
      "hasIconEndSlot": {},
      "isInputFocused": {},
      "isHovered": {},
      "focusType": {},
      "renderedValue": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input value changes. If the input has a mask, the rawValue will also be provided.\n- `value`: The processed or masked value of the input (in case a mask is applied).\n- `rawValue`: The unformatted input value, typically representing the actual data entered by the user (provided only when the input has a mask)."
        },
        "complexType": {
          "original": "InputChangeEventDetail",
          "resolved": "InputChangeEventDetail",
          "references": {
            "InputChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-input/types.ts::InputChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input is in focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input loses focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppChangeExtra",
        "name": "wppChangeExtra",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "Use `wppChange` instead.\nNew optional event that emits both raw and formatted values of the input.\n- `raw`: The unformatted input value, typically representing the actual data entered by the user.\n- `formatted`: The processed or masked value displayed in the input field, based on the applied mask or formatting rules.\n\nThis event can be useful in cases where both raw and formatted values are needed,\nsuch as when handling currency, phone numbers, or other masked inputs.\n\nUnlike `wppChange`, which emits only the formatted value, `wppChangeExtra` provides\nboth representations, allowing better control over data handling."
            }],
          "text": ""
        },
        "complexType": {
          "original": "WppChangeExtraEventDetail",
          "resolved": "{ raw: string; formatted: string; name?: string | undefined; }",
          "references": {
            "WppChangeExtraEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-input/types.ts::WppChangeExtraEventDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "select": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method that selects all the text in an element",
          "tags": []
        }
      },
      "setFocus": {
        "complexType": {
          "signature": "(isOutlined?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method that sets focus on the native input.",
          "tags": []
        }
      },
      "setValue": {
        "complexType": {
          "signature": "(value: InputValue) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "InputValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-input/types.ts::InputValue"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method that sets the input value programmatically.",
          "tags": []
        }
      },
      "getValue": {
        "complexType": {
          "signature": "() => Promise<InputValue>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "InputValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-input/types.ts::InputValue"
            }
          },
          "return": "Promise<string>"
        },
        "docs": {
          "text": "Method that returns current input value.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "maskOptions",
        "methodName": "onUpdateMaskOptions"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }, {
        "propName": "value",
        "methodName": "onUpdateValue"
      }];
  }
}
