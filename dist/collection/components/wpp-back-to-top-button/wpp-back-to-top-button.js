import { h, Host } from '@stencil/core';
import { getAriaProps, getLabelledbyText, mergeLocales } from '../../utils/utils';
import { FOCUS_TYPE } from '../../types/common';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
import { LOCALES_DEFAULTS } from './const';
/**
 * @part button - Button element
 * @part icon - Icon element
 */
export class WppBackToTopButton {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.onKeyDown = (event) => {
      if (this.focusType === FOCUS_TYPE.NONE)
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
      'wpp-back-to-top-button': true,
    });
    this.buttonCssClasses = () => ({
      'tab-focus': this.focusType === 'tab-focus',
      pressed: this.isPressed,
    });
    this.focusType = undefined;
    this.isPressed = false;
    this.validAriaProps = {};
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
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "button, icon", onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, h("button", { ref: el => (this.buttonRef = el), onBlur: this.onBlur, onFocus: this.onFocus, class: this.buttonCssClasses(), type: "button", part: "button", "data-testid": "wppBackToTopButton", "aria-label": getLabelledbyText(this.host, this.ariaProps?.labelledby) || this.ariaProps?.label || this._locales.label, ...this.validAriaProps }, h("wpp-icon-arrow-v4-7-0", { direction: "up", class: "icon", part: "icon" }))));
  }
  static get is() { return "wpp-back-to-top-button"; }
  static get registryIs() { return "wpp-back-to-top-button-v4-7-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-back-to-top-button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-back-to-top-button.css"]
    };
  }
  static get properties() {
    return {
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
          "original": "Partial<BackToTopButtonLocaleInterface>",
          "resolved": "undefined | { label?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "BackToTopButtonLocaleInterface": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-back-to-top-button/types.ts::BackToTopButtonLocaleInterface"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Localised strings. `label` names the button when `ariaProps` provides no `label` and its `labelledby`\nids name nothing, so passing other `aria-` props no longer drops the name. Precedence: ariaProps >\nlocales > defaults."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "focusType": {},
      "isPressed": {},
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
