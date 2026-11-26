import { Host, h } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { getAriaProps, getLabelledbyText, mergeLocales } from '../../utils/utils';
import { LOCALES_DEFAULTS } from './const';
export class WppMoreButton {
  constructor() {
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
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.onBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
      this.isPressed = false;
    };
    // The ring is a stateful class rather than `:focus-visible`, and blur clears it. Focus moved here by
    // script after a key press, or handed back by another window, never sees a Tab keyup, so take the
    // ring from what the browser itself decided.
    this.onFocus = () => {
      if (typeof this.buttonRef?.matches === 'function' && this.buttonRef.matches(':focus-visible')) {
        this.focusType = FOCUS_TYPE.TAB;
      }
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    // The name is set as `aria-label` in render, so `label` and `labelledby` are not passed through.
    this.getButtonAriaProps = () => getAriaProps({ ...this.ariaProps, label: undefined, labelledby: undefined });
    this.hostCssClasses = () => ({
      'wpp-more-button': true,
      'wpp-disabled': this.disabled,
    });
    this.buttonCssClasses = () => ({
      button: true,
      disabled: this.disabled,
      loading: this.loading,
      'tab-focus': this.focusType === 'tab-focus',
      [`size-${this.size}`]: true,
      pressed: this.isPressed,
    });
    this.isPressed = false;
    this.focusType = undefined;
    this.validAriaProps = {};
    this.name = undefined;
    this.size = 'm';
    this.disabled = false;
    this.loading = false;
    this.ariaProps = {};
    this.locales = {};
  }
  /**
   * Method that sets focus on the native button.
   */
  async setFocus() {
    setTimeout(() => {
      if (this.buttonRef) {
        this.buttonRef.focus();
        this.focusType = FOCUS_TYPE.TAB;
      }
    }, 0);
  }
  onUpdateAriaProps() {
    this.validAriaProps = this.getButtonAriaProps();
  }
  componentWillLoad() {
    this.validAriaProps = this.getButtonAriaProps();
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onBlur: this.onBlur, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, h("button", { ref: el => (this.buttonRef = el), class: this.buttonCssClasses(), disabled: this.disabled || this.loading, name: this.name, type: "button", "data-testid": "wpp-more-button", "aria-label": getLabelledbyText(this.host, this.ariaProps?.labelledby) || this.ariaProps?.label || this._locales.label, ...this.validAriaProps }, this.loading && !this.disabled ? (h("wpp-spinner-v4-7-0", { size: "s" })) : (h("wpp-icon-more-v4-7-0", { direction: 'horizontal' })))));
  }
  static get is() { return "wpp-more-button"; }
  static get registryIs() { return "wpp-more-button-v4-7-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-more-button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-more-button.css"]
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
          "text": "Defines the button name."
        },
        "attribute": "name",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the size of the button. Different sizes have different paddings."
        },
        "attribute": "size",
        "reflect": true,
        "defaultValue": "'m'"
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
          "text": "If the button is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "If the component is in loading state."
        },
        "attribute": "loading",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "Contains the button `aria-` props.\n\n`labelledby` names elements in your own page: their text becomes the button's name, because the\nnative button lives in this component's shadow root, where your ids cannot be referenced."
        },
        "defaultValue": "{}"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<MoreButtonLocaleInterface>",
          "resolved": "undefined | { label?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "MoreButtonLocaleInterface": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-more-button/types.ts::MoreButtonLocaleInterface"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Localised strings. `label` names the button when `ariaProps` provides no `label` and its `labelledby`\nids name nothing. Precedence: ariaProps > locales > defaults."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "isPressed": {},
      "focusType": {},
      "validAriaProps": {}
    };
  }
  static get methods() {
    return {
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
          "text": "Method that sets focus on the native button.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "ariaProps",
        "methodName": "onUpdateAriaProps"
      }];
  }
}
