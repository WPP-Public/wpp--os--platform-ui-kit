import { h, Host } from '@stencil/core';
import { getAriaProps } from '../../utils/utils';
import { FOCUS_TYPE } from '../../types/common';
/**
 * @part button - Button element
 * @part icon - Icon element
 */
export class WppBackToTopButton {
  constructor() {
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
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
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
    this.ariaProps = {
      label: 'Back to top',
    };
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
    this.validAriaProps = getAriaProps(this.ariaProps);
  }
  componentWillLoad() {
    this.validAriaProps = getAriaProps(this.ariaProps);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "button, icon", onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, h("button", { ref: el => (this.buttonRef = el), onBlur: this.onBlur, class: this.buttonCssClasses(), type: "button", part: "button", "data-testid": "wppBackToTopButton", "aria-pressed": this.isPressed ? 'true' : 'false', ...this.validAriaProps }, h("wpp-icon-arrow-v3-3-0", { direction: "top", class: "icon", part: "icon" }))));
  }
  static get is() { return "wpp-back-to-top-button"; }
  static get registryIs() { return "wpp-back-to-top-button-v3-3-0"; }
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
          "text": "Contains the button `aria-` props."
        },
        "defaultValue": "{\n    label: 'Back to top',\n  }"
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
