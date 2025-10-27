import { h, Host } from '@stencil/core';
import { getSlotEmptyStates } from '../../utils/utils';
/**
 * @slot - Content that is placed inside the card. The default slot, without the name attribute.
 * @slot header - Content that is placed inside the header section.
 * @slot actions - Content is placed inside the `.actions` element and add content to actions wrapper
 *
 * @part expandable-card-body - Wrapper around accordion
 * @part accordion - accordion element
 * @part wpp-accordion(*) - you can use all wpp-accordion parts (header,title and others)
 */
export class WppExpandableCard {
  constructor() {
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        actions: '[slot="actions"]',
      });
      this.hasActionsSlot = !emptyStates.actions;
    };
    this.onChange = (event) => {
      this.wppChange.emit(event.detail);
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.hostCssClasses = () => ({
      'wpp-expandable-card': true,
      [`wpp-size-${this.size}`]: true,
      [`wpp-${this.variant}`]: true,
    });
    this.hasActionsSlot = false;
    this.headerMaxWidth = undefined;
    this.expandedByDefault = false;
    this.expanded = false;
    this.isExpanded = false;
    this.size = 's';
    this.header = '';
    this.variant = 'primary';
  }
  onExpandedChange(newValue) {
    // TODO: remove this in version 4.0.0
    this.isExpanded = newValue;
  }
  componentWillLoad() {
    if (this.expandedByDefault)
      this.expanded = true;
    this.updateSlotData();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "expandable-card-body, accordion, section, title, icon, counter, divider, title-wrapper" }, h("div", { class: "body-container", part: "expandable-card-body" }, h("wpp-accordion-v3-3-0", { size: this.size, text: this.header, expanded: this.isExpanded, expandedByDefault: this.expandedByDefault, withDivider: false, onWppChange: this.onChange, part: "accordion" }, h("slot", null), h("slot", { name: "header", slot: "header", class: "header" }), h("slot", { name: "actions", slot: "actions", class: "actions" })))));
  }
  static get is() { return "wpp-expandable-card"; }
  static get registryIs() { return "wpp-expandable-card-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-expandable-card.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-expandable-card.css"]
    };
  }
  static get properties() {
    return {
      "expandedByDefault": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the component is expanded by default. This prop should be used if you are not interested in controlling\nexpanded state, but you need accordion to be opened at first render."
        },
        "attribute": "expanded-by-default",
        "reflect": true,
        "defaultValue": "false"
      },
      "expanded": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "- this prop will be deleted in version 4.0.0. Use \"isExpanded\" prop instead"
            }],
          "text": "If `true`, the component is expanded"
        },
        "attribute": "expanded",
        "reflect": false,
        "defaultValue": "false"
      },
      "isExpanded": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the component is expanded"
        },
        "attribute": "is-expanded",
        "reflect": false,
        "defaultValue": "false"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm' | 'l' | 'xl' | '2xl'",
          "resolved": "\"2xl\" | \"l\" | \"m\" | \"s\" | \"xl\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates expandable card size"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'s'"
      },
      "header": {
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
          "tags": [{
              "name": "deprecated",
              "text": "- this prop will be deleted in version 4.0.0. If you want to use this prop, use \"header\" slot instead"
            }],
          "text": "Indicates accordion header in expandable card"
        },
        "attribute": "header",
        "reflect": false,
        "defaultValue": "''"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'primary' | 'secondary'",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the variant of the card."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'primary'"
      }
    };
  }
  static get states() {
    return {
      "hasActionsSlot": {},
      "headerMaxWidth": {}
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
          "text": "Emitted when the expandable state changes"
        },
        "complexType": {
          "original": "ExpandableCardSectionChangeEventDetail",
          "resolved": "ExpandableCardSectionChangeEventDetail",
          "references": {
            "ExpandableCardSectionChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-expandable-card/types.tsx::ExpandableCardSectionChangeEventDetail"
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
          "text": "Emitted when the section receives focus"
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
          "text": "Emitted when the section loses focus"
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
        "propName": "expanded",
        "methodName": "onExpandedChange"
      }];
  }
}
