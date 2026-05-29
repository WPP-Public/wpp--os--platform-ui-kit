import { Host, h } from '@stencil/core';
import { LOCALES_DEFAULTS } from './consts';
import { transformToVersionedTag } from '../../utils/utils';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @slot body - Contains the main content of the basic node.
 * @slot handles - Should contain custom handle elements for integration with React Flow library.
 */
export class WppBasicNode {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.resizeObserver = undefined;
    this.bodyRef = undefined;
    this.titleRef = undefined;
    this._locales = LOCALES_DEFAULTS;
    this.checkBodyForScroll = () => {
      if (this.bodyRef) {
        this.hasScrollbar = this.bodyRef.clientHeight < this.bodyRef.scrollHeight;
      }
    };
    this.handleActionClick = (action) => {
      this.wppActionClick.emit(action);
    };
    this.getNodeContainerClasses = () => ({
      'node-container': true,
      'loading-node': this.isLoading,
    });
    this.getNodeWrapperClasses = () => ({
      'node-wrapper': true,
      'is-selected': this.isSelected,
    });
    this.hasScrollbar = false;
    this.nodeTitle = 'Title';
    this.isLoading = false;
    this.actions = [];
    this.locales = {};
    this.isSelected = false;
    this.ariaProps = {
      label: 'Open node actions',
    };
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...LOCALES_DEFAULTS, ...newLocales };
  }
  connectedCallback() {
    this.themeSubscription.start();
    this.resizeObserver = new ResizeObserver(() => {
      this.checkBodyForScroll();
    });
    this.resizeObserver.observe(this.host);
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.resizeObserver = undefined;
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
  }
  render() {
    return (h(Host, { class: "wpp-basic-node" }, h("div", { class: this.getNodeContainerClasses() }, h("div", { class: this.getNodeWrapperClasses() }, h("div", { class: "node-header" }, h("wpp-icon-service-v4-1-0", { color: "var(--wpp-grey-color-700)" }), h("wpp-tooltip-v4-1-0", { text: this.nodeTitle, class: "title-tooltip", config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef)
            return false;
          if (this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, h("p", { ref: el => (this.titleRef = el), class: "node-title" }, this.nodeTitle))), h("wpp-divider-v4-1-0", null), h("div", { ref: el => (this.bodyRef = el), class: "node-body" }, h("slot", { name: "body" })), this.hasScrollbar && h("wpp-divider-v4-1-0", null), h("div", { class: "node-actions" }, h("div", { class: "node-left-actions" }, h("wpp-menu-context-v4-1-0", { appendToListWrapper: true }, h("wpp-action-button-v4-1-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this.ariaProps.label } }, h("wpp-icon-plus-v4-1-0", { slot: "icon-start" })), h("div", null, h("wpp-list-item-v4-1-0", { onWppChangeListItem: () => this.handleActionClick({ icon: 'wpp-icon-file', label: this._locales.uploadFileAction }) }, h("wpp-icon-file-v4-1-0", { slot: "left" }), h("span", { slot: "label" }, this._locales.uploadFileAction)), this.actions.map((action) => (h("wpp-list-item-v4-1-0", { key: action.icon, onWppChangeListItem: () => this.handleActionClick(action) }, h(transformToVersionedTag(action.icon), { slot: 'left' }), h("span", { slot: "label" }, action.label)))))), h("wpp-tooltip-v4-1-0", { text: this._locales.filterAction, config: { placement: 'bottom' } }, h("wpp-action-button-v4-1-0", { variant: "secondary", "data-testid": "wpp-settings-btn", ariaProps: { label: this._locales.filterAction }, onClick: () => this.handleActionClick({ icon: 'wpp-icon-gear', label: this._locales.filterAction }) }, h("wpp-icon-gear-v4-1-0", { slot: "icon-start" })))), h("wpp-tooltip-v4-1-0", { text: this.isLoading ? this._locales.stopAction : this._locales.playAction, config: { placement: 'bottom' } }, h("wpp-action-button-v4-1-0", { variant: "secondary", "data-testid": "wpp-play-button", ariaProps: { label: this._locales[this.isLoading ? 'stopAction' : 'playAction'] }, onClick: () => this.handleActionClick({
        icon: `wpp-icon-${this.isLoading ? 'stop' : 'play'}`,
        label: this._locales[this.isLoading ? 'stopAction' : 'playAction'],
      }) }, this.isLoading ? h("wpp-icon-stop-v4-1-0", { slot: "icon-start" }) : h("wpp-icon-play-v4-1-0", { slot: "icon-start" })))))), h("slot", { name: "handles" })));
  }
  static get is() { return "wpp-basic-node"; }
  static get registryIs() { return "wpp-basic-node-v4-1-0"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-basic-node.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-basic-node.css"]
    };
  }
  static get properties() {
    return {
      "nodeTitle": {
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
          "text": "Defines the title of the node, which is displayed in the header section. This prop is required."
        },
        "attribute": "node-title",
        "reflect": false,
        "defaultValue": "'Title'"
      },
      "isLoading": {
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
          "text": "Defines whether the node is in a loading state. If true, the border of the node will be animated."
        },
        "attribute": "is-loading",
        "reflect": false,
        "defaultValue": "false"
      },
      "actions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "BasicNodeAction[]",
          "resolved": "BasicNodeAction[]",
          "references": {
            "BasicNodeAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-basic-node/types.ts::BasicNodeAction"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the additional actions available for the Basic Node. The actions are added to the dropdown menu in the footer section.\nThe `icon` should correspond to a valid icon name in the design system."
        },
        "defaultValue": "[]"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<BasicNodeLocales>",
          "resolved": "{ playAction?: string | undefined; stopAction?: string | undefined; filterAction?: string | undefined; uploadFileAction?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "BasicNodeLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-basic-node/types.ts::BasicNodeLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the locales for the basic-node component"
        },
        "defaultValue": "{}"
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
          "text": "Defines if the WppBasicNode is selected. The value of this property should be available in the `props: NodeProps`, which are handled by React Flow."
        },
        "attribute": "is-selected",
        "reflect": false,
        "defaultValue": "false"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "BasicNodeAriaProps",
          "resolved": "{ label?: string | undefined; }",
          "references": {
            "BasicNodeAriaProps": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-basic-node/types.ts::BasicNodeAriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the ARIA props for the button of the actions menu."
        },
        "defaultValue": "{\n    label: 'Open node actions',\n  }"
      }
    };
  }
  static get states() {
    return {
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
          "text": "Emitted when an action is clicked. The event detail contains the `BasicNodeAction` object corresponding to the clicked action."
        },
        "complexType": {
          "original": "BasicNodeAction",
          "resolved": "BasicNodeAction",
          "references": {
            "BasicNodeAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-basic-node/types.ts::BasicNodeAction"
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
      }];
  }
}
