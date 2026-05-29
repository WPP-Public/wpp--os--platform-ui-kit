import { Host, h } from '@stencil/core';
import { getArtefactActions, LOCALES_DEFAULTS, MAXIMUM_ARTEFACT_HEIGHT } from './consts';
import { transformToVersionedTag } from '../../utils/utils';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @slot body - Contains the main content of the artefact.
 * @slot handles - Should contain custom handle elements for integration with React Flow library.
 */
export class WppArtefact {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.resizeObserver = undefined;
    this.titleRef = undefined;
    this._locales = LOCALES_DEFAULTS;
    this.updateDropdownActions = () => {
      if (this.withPinAction) {
        const pinIndex = Math.min(Math.max(this.pinActionPosition, 0), this.actions.length);
        this.dropdownActions = [
          ...this.actions.slice(0, pinIndex),
          { icon: 'wpp-icon-unpinned', label: this._locales.pinAction },
          ...this.actions.slice(pinIndex),
        ];
      }
      else {
        this.dropdownActions = [...this.actions];
      }
    };
    this.handleActionClick = (action) => {
      this.wppActionClick.emit(action);
    };
    this.getArtefactWrapperClasses = () => ({
      'artefact-wrapper': true,
      [`size-${this.size}`]: true,
      'is-selected': this.isSelected,
    });
    this.defaultActions = [];
    this.dropdownActions = [];
    this.hasScrollbar = false;
    this.size = 'xs';
    this.artefactTitle = 'Title';
    this.actions = [];
    this.withPinAction = true;
    this.pinActionPosition = 0;
    this.locales = {};
    this.titleIcon = undefined;
    this.isSelected = false;
    this.ariaProps = {
      label: 'Open node actions',
    };
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...LOCALES_DEFAULTS, ...newLocales };
    this.defaultActions = getArtefactActions(this._locales);
    this.updateDropdownActions();
  }
  onUpdatePinAction() {
    this.updateDropdownActions();
  }
  connectedCallback() {
    this.themeSubscription.start();
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // We subtract 1 pixel from the maximum height of the artefact to account for the divider which has a height of 1 pixel. This way, when
        // the scrollbar appears, a divider will be added and the total height of the artefact will not exceed the maximum height defined in the design system.
        this.hasScrollbar = entry.contentRect.height >= MAXIMUM_ARTEFACT_HEIGHT - 1;
      }
    });
    this.resizeObserver.observe(this.host);
  }
  componentWillLoad() {
    this._locales = { ...LOCALES_DEFAULTS, ...this.locales };
    this.defaultActions = getArtefactActions({ ...LOCALES_DEFAULTS, ...this._locales });
    this.updateDropdownActions();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.resizeObserver = undefined;
  }
  render() {
    return (h(Host, { class: "wpp-artefact" }, h("div", { class: this.getArtefactWrapperClasses() }, h("div", { class: "artefact-header" }, this.titleIcon && h("div", { class: "artefact-icon-container" }, h(transformToVersionedTag(this.titleIcon))), h("wpp-tooltip-v4-1-0", { text: this.artefactTitle, class: "title-tooltip", config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef)
            return false;
          if (this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, h("p", { ref: el => (this.titleRef = el), class: "artefact-title" }, this.artefactTitle))), h("wpp-divider-v4-1-0", null), h("div", { class: "artefact-body" }, h("slot", { name: "body" })), this.hasScrollbar && h("wpp-divider-v4-1-0", null), h("div", { class: "artefact-actions" }, this.defaultActions.map((action) => (h("wpp-tooltip-v4-1-0", { text: action.label, key: action.label, config: { placement: 'bottom' } }, h("wpp-action-button-v4-1-0", { variant: "secondary", onClick: () => this.handleActionClick(action), ariaProps: { label: action.label } }, h(transformToVersionedTag(action.icon), { slot: 'icon-start' }))))), this.dropdownActions.length > 0 && (h("wpp-menu-context-v4-1-0", { appendToListWrapper: true }, h("wpp-action-button-v4-1-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this.ariaProps.label } }, h("wpp-icon-more-v4-1-0", { slot: "icon-start" })), h("div", null, this.dropdownActions.map((action) => (h("wpp-list-item-v4-1-0", { key: action.label, onWppChangeListItem: () => this.handleActionClick(action) }, h(transformToVersionedTag(action.icon), { slot: 'left' }), h("span", { slot: "label" }, action.label)))))))), h("slot", { name: "handles" }))));
  }
  static get is() { return "wpp-artefact"; }
  static get registryIs() { return "wpp-artefact-v4-1-0"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-artefact.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-artefact.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ArtefactSize",
          "resolved": "\"l\" | \"m\" | \"s\" | \"xl\" | \"xs\"",
          "references": {
            "ArtefactSize": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-artefact/types.ts::ArtefactSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the artefact size. Setting this attribute changes the width of the artefact."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'xs'"
      },
      "artefactTitle": {
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
          "text": "Defines the title of the artefact, which is displayed in the header section. This prop is required."
        },
        "attribute": "artefact-title",
        "reflect": false,
        "defaultValue": "'Title'"
      },
      "actions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ArtefactAction[]",
          "resolved": "ArtefactAction[]",
          "references": {
            "ArtefactAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-artefact/types.ts::ArtefactAction"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the additional actions available for the artefact. The actions are added to the dropdown menu in the footer section.\nThe `icon` should correspond to a valid icon name in the design system."
        },
        "defaultValue": "[]"
      },
      "withPinAction": {
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
          "text": "Allows removing the Pin action from the dropdown list, which is rendered by default."
        },
        "attribute": "with-pin-action",
        "reflect": false,
        "defaultValue": "true"
      },
      "pinActionPosition": {
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
          "text": "Allows specifing the position in the dropdown list of the Pin action. By default, it will be rendered at the top of the list."
        },
        "attribute": "pin-action-position",
        "reflect": false,
        "defaultValue": "0"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<ArtefactLocales>",
          "resolved": "{ duplicateAction?: string | undefined; downloadAction?: string | undefined; deleteAction?: string | undefined; pinAction?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "ArtefactLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-artefact/types.ts::ArtefactLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the locales for the artefact component"
        },
        "defaultValue": "{}"
      },
      "titleIcon": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "`wpp-icon-${string}`",
          "resolved": "`wpp-icon-${string}` | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the icon that will be rendered on the left of the title. Should contain the name of a valid icon from the library."
        },
        "attribute": "title-icon",
        "reflect": false
      },
      "isSelected": {
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
          "text": "Defines if the WppArtefact is selected. The value of this property should be available in the `props: NodeProps`, which are handled by React Flow."
        },
        "attribute": "is-selected",
        "reflect": false,
        "defaultValue": "false"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ArtefactAriaProps",
          "resolved": "{ label?: string | undefined; }",
          "references": {
            "ArtefactAriaProps": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-artefact/types.ts::ArtefactAriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the ARIA-label for the button of the actions menu."
        },
        "defaultValue": "{\n    label: 'Open node actions',\n  }"
      }
    };
  }
  static get states() {
    return {
      "defaultActions": {},
      "dropdownActions": {},
      "hasScrollbar": {}
    };
  }
  static get events() {
    return [{
        "method": "wppActionClick",
        "name": "wppActionClick",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when an action is clicked. The event detail contains the `ArtefactAction` object corresponding to the clicked action.\nThis event is emitted for both default actions (copy, download, delete) and additional actions provided via the `actions` prop."
        },
        "complexType": {
          "original": "ArtefactAction",
          "resolved": "ArtefactAction",
          "references": {
            "ArtefactAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-artefact/types.ts::ArtefactAction"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }, {
        "propName": "withPinAction",
        "methodName": "onUpdatePinAction"
      }, {
        "propName": "pinActionPosition",
        "methodName": "onUpdatePinAction"
      }, {
        "propName": "actions",
        "methodName": "onUpdatePinAction"
      }];
  }
}
