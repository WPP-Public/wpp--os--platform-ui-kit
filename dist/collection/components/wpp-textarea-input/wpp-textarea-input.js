import { h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { autoFocusElement, getAriaProps } from '../../utils/utils';
import { LOCALES_DEFAULTS } from './const';
/**
 * @part textarea - Textarea input element
 * @part label - Label text element
 * @part message-wrapper - message wrapper element
 * @part message - message element
 * @part limit-wrapper - limit block wrapper element
 * @part limit-label - limit label text element
 * @part limit-text - limit value text element
 */
export class WppTextareaInput {
  constructor() {
    this._locales = LOCALES_DEFAULTS;
    // Autosize variables
    this.previousValue = '';
    this.adjustHeight = () => {
      if (!this.inputRef || this.inputRef.scrollHeight === 0)
        return;
      const computed = window.getComputedStyle(this.inputRef);
      const shouldShrink = this.previousValue === '' || !this.inputRef.value.startsWith(this.previousValue);
      if (shouldShrink) {
        this.isScrollable = false;
        this.inputRef.style.setProperty('--wpp-textarea-height', 'auto');
      }
      const newHeight = this.inputRef.scrollHeight - (parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth));
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
      this.focusType = FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      if (!this.disabled)
        this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (this.disabled)
        return;
      if (event.key === 'Tab') {
        this.inputRef?.select();
        this.focusType = FOCUS_TYPE.TAB;
      }
    };
    this.onInput = (event) => {
      // this.focusType = FOCUS_TYPE.NONE
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
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
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
    this.validAriaProps = getAriaProps(this.ariaProps);
    if (this.charactersLimit) {
      this.updateEnteredCharacters();
    }
  }
  componentDidLoad() {
    autoFocusElement(this.autoFocus, this.inputRef);
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
    this.validAriaProps = getAriaProps(this.ariaProps);
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
      '--wpp-textarea-height': this.rows ? 'auto' : '',
    };
    const ariaAttrs = this.getAriaAttributes();
    const overLimit = this.isOverLimit;
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, textarea, message-wrapper, message, limit-wrapper, limit-label, limit-text" }, this.labelConfig?.text && (h("wpp-label-v4-0-0", { class: "label", id: this.labelId, htmlFor: this.inputId, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("textarea", { name: this.name, value: this.value, disabled: this.disabled, placeholder: this.placeholder, rows: this.rows === 'stretch' ? 1 : this.rows ? Number(this.rows) : undefined, id: this.inputId, required: this.required, class: this.textAreaCssClasses(), onInput: this.onInput, ref: inputRef => (this.inputRef = inputRef), part: "textarea", style: style, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, ...ariaAttrs, ...this.validAriaProps }), (!!this.charactersLimit || !!this.message) && (h("div", { class: this.messageCssClasses(), part: "message-wrapper", "aria-live": "polite", "aria-atomic": "true" }, !!this.message && (h("wpp-inline-message-v4-0-0", { id: this.messageId, message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, part: "message" })), !!this.charactersLimit && (h("div", { id: this.counterId, class: this.charLimitCssClasses(), "data-testid": "char-entered-label", part: "limit-wrapper" }, h("wpp-typography-v4-0-0", { type: "xs-body", tag: "span", part: "limit-label" }, this._locales.charactersEntered, ":"), h("wpp-typography-v4-0-0", { type: "xs-strong", tag: "span", class: "entered-characters", part: "limit-text" }, this.enteredCharacters, "/", this.charactersLimit), overLimit && (h("wpp-typography-v4-0-0", { type: "xs-body", tag: "span", class: "exceeded-characters sr-only", part: "limit-text" }, this._locales.exceededByCharacters, " ", this.enteredCharacters - (this.charactersLimit || 0)))))))));
  }
  static get is() { return "wpp-textarea-input"; }
  static get registryIs() { return "wpp-textarea-input-v4-0-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-textarea-input.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-textarea-input.css"]
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
          "text": "Defines the textarea name."
        },
        "attribute": "name",
        "reflect": false
      },
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "TextareaInputValue",
          "resolved": "string",
          "references": {
            "TextareaInputValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-textarea-input/types.ts::TextareaInputValue"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the textarea value."
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
          "text": "Defines the textarea placeholder."
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
          "text": "If the textarea is required."
        },
        "attribute": "required",
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
          "text": "If the textarea is disabled."
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
      "rows": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "number | 'stretch'",
          "resolved": "\"stretch\" | number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the textarea height in rows.\n`stretch` - textarea height will be stretched to fit content"
        },
        "attribute": "rows",
        "reflect": true
      },
      "maxHeight": {
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
          "text": "Defines the maximum height of the textarea. Accept only the number in pixels\nNote: working only with `rows=\"stretch\"`"
        },
        "attribute": "max-height",
        "reflect": false,
        "defaultValue": "1000"
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
          "text": "Defines the textarea size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "TextareaLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "TextareaLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-textarea-input/types.ts::TextareaLabelConfig"
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
          "text": "Tooltip config for label, under the hood tooltip using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
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
          "text": "Defines the textarea message."
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
          "text": "Defines the textarea message type."
        },
        "attribute": "message-type",
        "reflect": false
      },
      "maxMessageLength": {
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
          "text": "Defines a maximum length for the textarea threshold warning/error messages. Once a message exceeds `maxMessageLength`, it will be truncated, with the full message shown in a tooltip."
        },
        "attribute": "max-message-length",
        "reflect": false
      },
      "charactersLimit": {
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
          "text": "Defines the textarea character limit."
        },
        "attribute": "characters-limit",
        "reflect": false
      },
      "warningThreshold": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines a char threshold after which users are notified that they are about to exceed `charactersLimit`."
        },
        "attribute": "warning-threshold",
        "reflect": false,
        "defaultValue": "20"
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
          "text": "Contains the textarea `aria-` props."
        },
        "defaultValue": "{}"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<TextareaInputLocales>",
          "resolved": "{ charactersEntered?: string | undefined; exceededByCharacters?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "TextareaInputLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-textarea-input/types.ts::TextareaInputLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for textarea component"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "focusType": {},
      "validAriaProps": {},
      "isScrollable": {},
      "enteredCharacters": {}
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
          "text": "Emitted when the textarea value changes."
        },
        "complexType": {
          "original": "TextareaInputChangeEventDetail",
          "resolved": "BaseFormControlEventDetail<string> & { name?: string | undefined; }",
          "references": {
            "TextareaInputChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-textarea-input/types.ts::TextareaInputChangeEventDetail"
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
          "text": "Emitted when the textarea is in focus."
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
          "text": "Emitted when the textarea loses focus."
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
          "signature": "(value: TextareaInputValue) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "TextareaInputValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-textarea-input/types.ts::TextareaInputValue"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method that sets input value.",
          "tags": []
        }
      },
      "getValue": {
        "complexType": {
          "signature": "() => Promise<TextareaInputValue>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "TextareaInputValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-textarea-input/types.ts::TextareaInputValue"
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
        "methodName": "onValueChange"
      }, {
        "propName": "rows",
        "methodName": "onRowsChange"
      }, {
        "propName": "maxHeight",
        "methodName": "handleMaxHeightChange"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }, {
        "propName": "ariaProps",
        "methodName": "onUpdateAriaProps"
      }];
  }
}
