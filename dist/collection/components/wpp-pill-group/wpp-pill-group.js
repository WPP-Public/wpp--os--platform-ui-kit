import { h, Host } from '@stencil/core';
import { transformToVersionedTag } from '../../utils/utils';
/**
 * @slot - Can contain only the `wpp-pill` components that are displayed in `pill-group`. It can be only <wpp-pill>. The default slot, without the name attribute.
 *
 * @part label - Label text element
 * @part content - content wrapper element
 * @part inner - Content slot element
 */
export class WppPillGroup {
  constructor() {
    this.setPillsSize = (size) => {
      this.host.querySelectorAll(transformToVersionedTag('wpp-pill')).forEach(pill => {
        pill.setAttribute('size', size);
      });
    };
    this.setActivePill = (initValue) => {
      const value = Array.isArray(initValue) ? initValue : [initValue];
      this.host.querySelectorAll(transformToVersionedTag('wpp-pill')).forEach(pill => {
        pill.setAttribute('checked', value.includes(pill.value) ? 'true' : 'false');
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.hostCssClasses = () => ({
      'wpp-pill-group': true,
    });
    this.name = undefined;
    this.size = 'm';
    this.value = undefined;
    this.type = undefined;
    this.required = false;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  handleClick(event) {
    const isMultiple = this.type === 'multiple';
    if (isMultiple) {
      const currentValue = this.value || [];
      this.value = event.detail.checked
        ? [...currentValue, event.detail.value]
        : currentValue.filter(element => element !== event.detail.value);
    }
    else {
      this.value = event.detail.value;
    }
    this.wppChange.emit({
      value: this.value,
      name: this.name,
    });
  }
  onValueChange(newValue) {
    this.setActivePill(newValue);
  }
  onUpdateSize(newSize) {
    this.setPillsSize(newSize);
  }
  componentDidLoad() {
    this.setPillsSize(this.size);
    if (this.value) {
      this.setActivePill(this.value);
    }
  }
  render() {
    return (h(Host, { "aria-multiselectable": this.type === 'multiple', "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, class: this.hostCssClasses(), exportparts: "label, content, inner" }, this.labelConfig?.text && (h("wpp-label-v3-5-0", { class: "label", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: "pills-wrapper", part: "content" }, h("slot", { part: "inner" }))));
  }
  static get is() { return "wpp-pill-group"; }
  static get registryIs() { return "wpp-pill-group-v3-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-pill-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-pill-group.css"]
    };
  }
  static get properties() {
    return {
      "name": {
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
          "text": "Defines the pill group name."
        },
        "attribute": "name",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "PillSize",
          "resolved": "\"m\"",
          "references": {
            "PillSize": {
              "location": "import",
              "path": "../wpp-pill/types",
              "id": "src/components/wpp-pill/types.ts::PillSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the pill group size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "PillGroupValue",
          "resolved": "PillValue[] | number | string | undefined",
          "references": {
            "PillGroupValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill-group/types.ts::PillGroupValue"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the pill group value."
        },
        "attribute": "value",
        "reflect": false
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "PillType",
          "resolved": "\"display\" | \"draggable\" | \"multiple\" | \"single\"",
          "references": {
            "PillType": {
              "location": "import",
              "path": "../wpp-pill/types",
              "id": "src/components/wpp-pill/types.ts::PillType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the type of the pill"
        },
        "attribute": "type",
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
          "text": "If the pill group is required."
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "PillGroupLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "PillGroupLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill-group/types.ts::PillGroupLabelConfig"
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
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      }
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
          "text": "Emitted when the pill group value changes."
        },
        "complexType": {
          "original": "PillGroupChangeEvent",
          "resolved": "BaseFormControlEventDetail<PillGroupValue> & { name?: string | undefined; }",
          "references": {
            "PillGroupChangeEvent": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill-group/types.ts::PillGroupChangeEvent"
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
          "text": "Emitted when the pill group receives focus"
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
          "text": "Emitted when the pill group loses focus"
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
        "methodName": "onValueChange"
      }, {
        "propName": "size",
        "methodName": "onUpdateSize"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppClick",
        "method": "handleClick",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}
