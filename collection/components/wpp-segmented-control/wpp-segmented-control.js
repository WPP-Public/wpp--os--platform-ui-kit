import { Host, h } from '@stencil/core';
import { transformToVersionedTag } from '../../utils/utils';
/**
 * @slot - Should contain only the `segmented-control-item` elements. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part label - Label text element
 */
export class WppSegmentedControl {
  constructor() {
    this.setSegmentedControlItemsSize = (size) => {
      this.host
        .querySelectorAll(transformToVersionedTag('wpp-segmented-control-item'))
        .forEach(item => {
        item.setAttribute('size', size);
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.cssClasses = () => ({
      'wpp-bar-wrapper': true,
      [`size-${this.size}`]: true,
      'hug-content-off': this.hugContentOff,
    });
    this.hostCssClasses = () => ({
      'wpp-segmented-control': true,
    });
    this.previousActiveElement = undefined;
    this.size = 'm';
    this.hugContentOff = false;
    this.width = 'auto';
    this.variant = 'text';
    this.required = false;
    this.value = undefined;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  handleChangeSegmentedControlItemClick(event) {
    this.value = event.detail.value;
  }
  valueChanged(newValue) {
    this.previousActiveElement?.setAttribute('active', 'false');
    const activeElement = Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-segmented-control-item'))).find(item => item.value === newValue);
    activeElement?.setAttribute('active', 'true');
    this.previousActiveElement = activeElement;
    this.wppChange.emit({ value: newValue, reason: 'valueChanged' });
  }
  widthChange(newValue) {
    this.host.style.setProperty('--wpp-bar-width', newValue);
  }
  onUpdateSize(newSize) {
    this.setSegmentedControlItemsSize(newSize);
  }
  componentWillLoad() {
    this.widthChange(this.width);
    this.setSegmentedControlItemsSize(this.size);
  }
  componentDidLoad() {
    this.host
      .querySelectorAll(transformToVersionedTag('wpp-segmented-control-item'))
      .forEach(item => {
      if (item.value === this.value) {
        item.setAttribute('active', 'true');
        this.previousActiveElement = item;
      }
    });
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner, label", onFocus: this.onFocus, onBlur: this.onBlur }, this.labelConfig?.text && (h("wpp-label-v3-3-0", { class: "label", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: this.cssClasses(), role: "listbox", "aria-multiselectable": "false", "aria-required": this.required, part: "wrapper" }, h("slot", { part: "inner" }))));
  }
  static get is() { return "wpp-segmented-control"; }
  static get registryIs() { return "wpp-segmented-control-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-segmented-control.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-segmented-control.css"]
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
              "path": "./types",
              "id": "src/components/wpp-segmented-control/types.ts::SegmentedControlItemSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the segmented control size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
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
      "width": {
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
          "text": "Defines the control bar width, with the leftover space distributed evenly between the items. Must be in pixels, e.g. **800px**."
        },
        "attribute": "width",
        "reflect": false,
        "defaultValue": "'auto'"
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
          "text": "Defines the component style."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'text'"
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
          "text": "If `true`, the segmented control is required"
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "SegmentedControlValue",
          "resolved": "number | string",
          "references": {
            "SegmentedControlValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-segmented-control/types.ts::SegmentedControlValue"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates selected value"
        },
        "attribute": "value",
        "reflect": true
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "SegmentedControlLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "SegmentedControlLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-segmented-control/types.ts::SegmentedControlLabelConfig"
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
          "text": "Defines the dropdown configuration for the label tooltip."
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      }
    };
  }
  static get states() {
    return {
      "previousActiveElement": {}
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
          "text": "Emitted when the active item has changed, emits value of the active item"
        },
        "complexType": {
          "original": "SegmentedControlChangeEventDetail",
          "resolved": "BaseFormControlEventDetail<SegmentedControlValue> | { value: SegmentedControlValue; reason: string; }",
          "references": {
            "SegmentedControlChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-segmented-control/types.ts::SegmentedControlChangeEventDetail"
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
          "text": "Emitted when the segmented control receives focus"
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
          "text": "Emitted when the segmented control loses focus"
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
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "valueChanged"
      }, {
        "propName": "width",
        "methodName": "widthChange"
      }, {
        "propName": "size",
        "methodName": "onUpdateSize"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppChangeSegmentedControlItem",
        "method": "handleChangeSegmentedControlItemClick",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}
