import { h, Host } from '@stencil/core';
import { Maskito } from '@maskito/core';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
import { maskitoPrefixPostprocessorGenerator, maskitoWithPlaceholder, maskitoNumberOptionsGenerator, } from '@maskito/kit';
import { FOCUS_TYPE } from '../../types/common';
import { autoFocusElement, debounce, getSlotEmptyStates } from '../../utils/utils';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { getRawValueForExtra } from './utils';
const getInitFocusInfo = () => ({
  input: FOCUS_TYPE.NONE,
  icon: FOCUS_TYPE.NONE,
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
    this.hadChangesInTooltip = false;
    this.suppressInputEvent = false;
    this.updateInputRef = (inputRef) => {
      if (inputRef)
        this.inputRef = inputRef;
    };
    this.updateInputWithMask = () => {
      // Masks currently work only for these types
      if (this.inputRef && ['decimal', 'text', 'tel'].includes(this.type)) {
        const maskOptions = this.createMaskOptions();
        if (!maskOptions)
          return;
        this.maskedElement = new Maskito(this.inputRef, { overwriteMode: 'shift', ...maskOptions });
      }
    };
    this.checkForEllipsis = () => {
      // This requestAnimationFrame is needed here because Maskito applies validations directly in the input
      // and the text you type might change after first render.
      requestAnimationFrame(() => {
        if (!this.inputRef)
          return;
        if (this.value && this.value.length > 0) {
          const inputComputedStyles = window.getComputedStyle(this.inputRef);
          let inputContentWidth = this.inputRef.clientWidth;
          let inputScrollWidth = this.inputRef.scrollWidth;
          const paddingLeft = inputComputedStyles.paddingLeft;
          const paddingRight = inputComputedStyles.paddingRight;
          if (paddingLeft?.endsWith('px') && paddingRight?.endsWith('px')) {
            inputContentWidth -= parseFloat(paddingLeft) + parseFloat(paddingRight);
            inputScrollWidth -= parseFloat(paddingLeft) + parseFloat(paddingRight);
          }
          const hasScroll = inputContentWidth < inputScrollWidth;
          this.hadChangesInTooltip = this.hasActiveEllipses !== hasScroll;
          this.hasActiveEllipses = hasScroll;
        }
        else {
          this.hadChangesInTooltip = this.hasActiveEllipses !== false;
          this.hasActiveEllipses = false;
        }
      });
    };
    this.createMaskOptions = () => {
      if (this.maskOptions?.customPatternOptions) {
        if (this.type === 'text') {
          return {
            ...(this.maskOptions?.maskPlaceholder ? maskitoWithPlaceholder(this.maskOptions.maskPlaceholder) : {}),
            ...this.maskOptions?.customPatternOptions,
          };
        }
        return this.maskOptions?.customPatternOptions;
      }
      if (this.type === 'tel') {
        return this.createTelPatternOptions();
      }
      if (this.type === 'decimal') {
        return this.maskOptions?.decimalPatternOptions
          ? maskitoNumberOptionsGenerator(this.maskOptions.decimalPatternOptions)
          : { mask: /^-?\d*(?:[.,]\d*)?$/ }; // Apply default
      }
      return undefined;
    };
    this.createTelPatternOptions = () => {
      if (!this.maskOptions?.telPatternOptions) {
        // Apply default
        return {
          mask: /^[()+\-\s\d]+$/,
        };
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
      if (this.maxLength && this.value.length > this.maxLength) {
        this.lengthValidationError = this.locales.maxLengthErrorMessage(this.maxLength);
      }
      else if (this.minLength && this.value.length < this.minLength) {
        this.lengthValidationError = this.locales.minLengthErrorMessage(this.minLength);
      }
      else {
        this.lengthValidationError = undefined;
      }
    };
    this.onInput = (event) => {
      if (this.suppressInputEvent) {
        this.suppressInputEvent = false;
        return;
      }
      const eventValue = event.target.value;
      const rawValue = getRawValueForExtra(eventValue, this.type, this.maskOptions);
      this.value = eventValue;
      if (!rawValue) {
        this.hadChangesInTooltip = this.hasActiveEllipses !== false;
        this.hasActiveEllipses = false;
        requestAnimationFrame(() => this.setFocus());
      }
      if (this.type === 'number' || this.type === 'decimal')
        this.validateInputLength();
      this.wppChange.emit({
        value: this.value,
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
      this.value = '';
      this.hasActiveEllipses = false;
      requestAnimationFrame(() => this.setFocus());
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
      this.wppChangeExtra.emit({
        raw: '',
        formatted: '',
        name: this.name,
      });
    };
    this.onFocus = (event) => {
      if (this.type === 'search') {
        this.inputRef?.select();
      }
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.checkForEllipsis();
      this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('icon', FOCUS_TYPE.NONE);
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('icon', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.MOUSE);
    };
    this.onKeyUp = (event, type) => {
      if (event.key === 'Tab') {
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
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
      [`size-${this.size}`]: true,
      [`${this.messageType}`]: !!this.messageType,
      [`with-icon-start`]: this.hasIconStartSlot || (this.type === 'search' && this.loading && !this.disabled) || this.type === 'search',
      [`with-icon-end`]: this.hasIconEndSlot || this.type === 'search',
      'tab-focus': this.focusType.input === FOCUS_TYPE.TAB && this.focusType.icon !== FOCUS_TYPE.TAB,
      'with-validation-error': !!this.lengthValidationError,
    });
    this.wrapperCssClasses = () => ({
      'wpp-input': true,
      'with-value': !!this.value?.length,
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
    this.iconEndCssClasses = () => ({
      'icon-end': true,
      'disabled-icon': this.disabled,
      'slot-hidden': !this.hasIconEndSlot && !(this.type === 'search' && this.loading && !this.disabled),
    });
    this.renderInput = () => (h("input", { id: this.name, class: this.inputCssClasses(), name: this.name, type: this.type, value: this.value, required: this.required, disabled: this.disabled, onInput: this.onInput, onKeyPress: this.onKeyPress, readOnly: this.readOnly, ref: inputRef => this.updateInputRef(inputRef), "aria-label": this.ariaProps.label, part: "input", title: "", placeholder: this.placeholder, autocomplete: this.autocomplete }));
    this.renderSearchIconOrSpinner = () => {
      if (this.type !== 'search')
        return null;
      if (this.loading && !this.disabled) {
        return h("wpp-spinner-v2-22-0", { class: this.iconStartCssClasses(), slot: "left", "aria-label": "Loading" });
      }
      return h("wpp-icon-search-v2-22-0", { class: this.iconStartCssClasses(), "aria-label": "Search icon", part: "icon-search" });
    };
    this.hasActiveEllipses = false;
    this.hasIconStartSlot = false;
    this.hasIconEndSlot = false;
    this.focusType = getInitFocusInfo();
    this.initialProcessed = false;
    this.name = undefined;
    this.type = 'text';
    this.value = undefined;
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
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.maskOptions = undefined;
    this.labelConfig = undefined;
    this.maxLength = undefined;
    this.minLength = undefined;
    this.locales = {
      minLengthErrorMessage: minLength => `The input must have at least ${minLength} characters`,
      maxLengthErrorMessage: maxLength => `The input can have a maximum of ${maxLength} characters`,
    };
    this.loading = false;
    this.autocomplete = 'off';
  }
  /**
   * Method that listens to the window resize event.
   */
  onResize() {
    if (this.debouncedCheckForEllipsis) {
      this.debouncedCheckForEllipsis();
    }
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
   * Method that sets the input value programmatically.
   */
  async setValue(value) {
    this.value = value;
    if (this.inputRef) {
      this.inputRef.value = value;
      this.updateInputWithMask();
      this.suppressInputEvent = true;
      const inputEvent = new InputEvent('input', { bubbles: true, composed: true });
      this.inputRef.dispatchEvent(inputEvent);
    }
    setTimeout(() => {
      const formattedValue = this.inputRef ? this.inputRef.value : value;
      this.value = formattedValue;
      const rawValue = getRawValueForExtra(formattedValue, this.type, this.maskOptions);
      if (this.suppressInputEvent) {
        this.suppressInputEvent = false;
        this.wppChangeExtra.emit({
          raw: rawValue,
          formatted: formattedValue,
          name: this.name,
        });
        this.wppChange.emit({
          value: formattedValue,
          name: this.name,
        });
      }
    }, 100);
  }
  /**
   * Method that returns current input value.
   */
  async getValue() {
    return this.value;
  }
  onUpdateValue() {
    if (this.focusType.input === FOCUS_TYPE.NONE && this.debouncedCheckForEllipsis) {
      // This will be called when the value changes when moving the slider's thumbs.
      this.debouncedCheckForEllipsis();
    }
  }
  componentWillLoad() {
    this.updateSlotData();
    this.debouncedCheckForEllipsis = debounce(() => {
      this.checkForEllipsis();
    }, 50);
  }
  componentDidRender() {
    if (this.hadChangesInTooltip && this.inputRef) {
      this.updateInputWithMask();
      this.hadChangesInTooltip = false;
    }
  }
  async componentDidLoad() {
    autoFocusElement(this.autoFocus, this.inputRef);
    // Need to wait on fonts load and after that measure the size of text and input available space for the content
    try {
      await document.fonts.ready;
      requestAnimationFrame(() => {
        this.checkForEllipsis();
      });
    }
    catch (_) {
      setTimeout(() => {
        this.checkForEllipsis();
      }, 100);
    }
    this.updateInputWithMask();
    if (this.value && this.maskOptions && this.inputRef && !this.initialProcessed) {
      this.suppressInputEvent = true;
      const inputEvent = new InputEvent('input', { bubbles: true, composed: true });
      this.inputRef.dispatchEvent(inputEvent);
      const newFormatted = this.inputRef ? this.inputRef.value : this.value;
      if (newFormatted !== this.value) {
        this.setValue(newFormatted);
      }
      this.initialProcessed = true;
      this.suppressInputEvent = false;
    }
  }
  disconnectedCallback() {
    if (this.maskedElement) {
      this.maskedElement.destroy();
    }
  }
  render() {
    return (h(Host, { class: this.wrapperCssClasses(), "aria-disabled": this.disabled, "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'input'), exportparts: "label, body, icon-search, input, icon-cross, message, icon-start, icon-start-wrapper, icon-end, icon-end-wrapper" }, this.labelConfig?.text && (h("wpp-label-v2-22-0", { class: "label", htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: this.inputWithIconsCssClasses(), part: "body" }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), this.renderSearchIconOrSpinner(), h("wpp-tooltip-v2-22-0", { part: "anchor", text: this.value, class: "with-tooltip", disabled: !this.hasActiveEllipses }, this.renderInput()), (this.type === 'search' || this.loading) && !!this.value && (h("wpp-icon-cross-v2-22-0", { class: this.iconEndCssClasses(), "aria-label": "Erase input text", tabIndex: 0, part: "icon-cross", onClick: event => this.onClear(event), onBlur: this.onBlur, onKeyUp: (event) => this.onKeyUp(event, 'icon') })), h(WrappedSlot, { wrapperClass: this.iconEndCssClasses(), name: "icon-end", onSlotchange: this.updateSlotData })), this.lengthValidationError && (h("wpp-inline-message-v2-22-0", { message: this.lengthValidationError, type: 'error', showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" })), this.message && (h("wpp-inline-message-v2-22-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" }))));
  }
  static get is() { return "wpp-input"; }
  static get registryIs() { return "wpp-input-v2-22-0"; }
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
          "resolved": "undefined | { decimalPatternOptions?: DecimalMaskOptions | undefined; maskPlaceholder?: string | undefined; customPatternOptions?: MaskitoOptions | undefined; telPatternOptions?: { mask?: MaskitoMask | undefined; countryCode?: CountryCode | undefined; countryPhoneCode?: string | undefined; } | undefined; }",
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
          "text": "Defines the custom mask options. Currently, it can be used with the following types: 'decimal', 'text', 'tel'"
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
          "original": "InputLocaleInterface",
          "resolved": "{ minLengthErrorMessage: (minLength: number) => string; maxLengthErrorMessage: (maxLength: number) => string; }",
          "references": {
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
        "defaultValue": "{\n    minLengthErrorMessage: minLength => `The input must have at least ${minLength} characters`,\n    maxLengthErrorMessage: maxLength => `The input can have a maximum of ${maxLength} characters`,\n  }"
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
      }
    };
  }
  static get states() {
    return {
      "hasActiveEllipses": {},
      "hasIconStartSlot": {},
      "hasIconEndSlot": {},
      "focusType": {},
      "initialProcessed": {}
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
          "text": "Emitted when the input value changes."
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
          "tags": [],
          "text": "New optional event that emits both raw and formatted values of the input.\n- `raw`: The unformatted input value, typically representing the actual data entered by the user.\n- `formatted`: The processed or masked value displayed in the input field, based on the applied mask or formatting rules.\n\nThis event can be useful in cases where both raw and formatted values are needed,\nsuch as when handling currency, phone numbers, or other masked inputs.\n\nUnlike `wppChange`, which emits only the formatted value, `wppChangeExtra` provides\nboth representations, allowing better control over data handling."
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
        "propName": "value",
        "methodName": "onUpdateValue"
      }];
  }
  static get listeners() {
    return [{
        "name": "resize",
        "method": "onResize",
        "target": "window",
        "capture": false,
        "passive": true
      }];
  }
}
