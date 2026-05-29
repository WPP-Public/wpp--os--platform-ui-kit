import { h, Host } from '@stencil/core';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
import { FOCUS_TYPE } from '../../../../types/common';
import { themeSubscriptionController } from '../../../../utils/subscribe-to-theme';
let instanceCounter = 0;
/**
 * @slot - Can contain either plain text or an icon depending on the `variant` prop. Use icons provided with the component library or custom **.svg** files that can be styled with the CSS color attribute. The default slot, without the name attribute.
 * @part item - Wrapper that can contain label or icon
 */
export class WppSegmentedControlItem {
  constructor() {
    this.isMouseClicked = false;
    this.uniqueId = `sc-tab-${++instanceCounter}`;
    this.mouseUpHandler = () => {
      this.pressed = false;
    };
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.handleClickSegmentedControl = () => {
      this.focusType = FOCUS_TYPE.NONE;
      if (this.disabled)
        return;
      this.wppChangeSegmentedControlItem.emit({ value: this.value });
    };
    this.onFocus = (event) => {
      this.focusType = this.isMouseClicked ? FOCUS_TYPE.MOUSE : FOCUS_TYPE.TAB;
      this.isMouseClicked = false;
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.pressed = false;
      this.wppBlur.emit(event);
    };
    this.onKeyDown = (e) => {
      if (this.disabled)
        return;
      if (e.key === ' ' || e.key === 'Enter') {
        this.pressed = true;
      }
    };
    this.onKeyUp = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        this.pressed = false;
      }
    };
    this.onMouseDown = () => {
      if (this.focusType === FOCUS_TYPE.TAB) {
        this.focusType = FOCUS_TYPE.MOUSE;
      }
      else {
        this.isMouseClicked = true;
      }
      if (!this.disabled) {
        this.pressed = true;
        window.addEventListener('mouseup', this.mouseUpHandler, { once: true });
      }
    };
    this.cssClasses = () => ({
      'segmented-control-item': true,
      [`size-${this.size}`]: true,
      [`${this.variant}`]: true,
      active: this.active,
      disabled: this.disabled,
    });
    this.hostCssClasses = () => ({
      'wpp-segmented-control-item': true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.focusType = undefined;
    this.pressed = false;
    this.size = 'm';
    this.active = false;
    this.disabled = false;
    this.value = undefined;
    this.counter = 0;
    this.variant = 'text';
    this.hugContentOff = false;
    this.ariaProps = undefined;
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    window.removeEventListener('mouseup', this.mouseUpHandler);
  }
  // Roving tabindex: only the active, enabled item is tabbable
  get tabIndex() {
    if (this.disabled)
      return -1;
    return this.active ? 0 : -1;
  }
  render() {
    return (h(Host, { id: this.uniqueId, role: "tab", "aria-selected": this.active ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : null, "aria-controls": this.ariaProps?.tab?.controls, "aria-label": this.ariaProps?.tab?.label, "aria-describedby": this.ariaProps?.tab?.describedby, "data-pressed": this.pressed ? 'true' : null, tabIndex: this.tabIndex, onClick: this.handleClickSegmentedControl, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onBlur: this.onBlur, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, class: this.hostCssClasses(), exportparts: "item" }, h("div", { class: this.cssClasses(), part: "item" }, h(WrappedSlot, { wrapperClass: "content-wrapper" }), this.variant === 'text' && this.counter > 0 && h("div", { class: "counter" }, `(${this.counter})`))));
  }
  static get is() { return "wpp-segmented-control-item"; }
  static get registryIs() { return "wpp-segmented-control-item-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-segmented-control-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-segmented-control-item.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SegmentedControlItemSize",
          "resolved": "\"m\" | \"s\"",
          "references": {
            "SegmentedControlItemSize": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-segmented-control/types.ts::SegmentedControlItemSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the item size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "active": {
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
          "tags": [{
              "name": "internal",
              "text": "- This prop is controlled by container like Segmented Control, do not set it manually."
            }],
          "text": "If the component is active."
        },
        "attribute": "active",
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
          "text": "If the component is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "value": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "string | number",
          "resolved": "number | string",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates value of item (must be unique)"
        },
        "attribute": "value",
        "reflect": true
      },
      "counter": {
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
          "text": "Defines the number of elements within a specific item.\nThe counter is only displayed when the `variant` is set to 'text'."
        },
        "attribute": "counter",
        "reflect": false,
        "defaultValue": "0"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'text' | 'icon'",
          "resolved": "\"icon\" | \"text\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the item style.\n- 'text': Displays text with an optional counter if provided.\n- 'icon': Displays an icon without a counter."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'text'"
      },
      "hugContentOff": {
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
          "text": "If the item size is relative to the control bar size."
        },
        "attribute": "hug-content-off",
        "reflect": true,
        "defaultValue": "false"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WppSegmentedControlItemAriaProps",
          "resolved": "undefined | { tab?: Pick<AriaProps, \"label\" | \"describedby\" | \"controls\"> | undefined; }",
          "references": {
            "WppSegmentedControlItemAriaProps": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-segmented-control/types.ts::WppSegmentedControlItemAriaProps"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Grouped ARIA props (explicit picks only).\ntab: { label?, describedby?, controls? }"
        }
      }
    };
  }
  static get states() {
    return {
      "focusType": {},
      "pressed": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChangeSegmentedControlItem",
        "name": "wppChangeSegmentedControlItem",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when an item is clicked."
        },
        "complexType": {
          "original": "SegmentedControlItemChangeEventDetail",
          "resolved": "SegmentedControlItemChangeEventDetail",
          "references": {
            "SegmentedControlItemChangeEventDetail": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-segmented-control/types.ts::SegmentedControlItemChangeEventDetail"
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
          "text": "Emitted when an item is in focus."
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
          "text": "Emitted when an item loses focus."
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
  static get elementRef() { return "host"; }
}
