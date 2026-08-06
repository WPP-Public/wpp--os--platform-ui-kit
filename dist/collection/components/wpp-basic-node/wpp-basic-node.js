import { Host, h } from '@stencil/core';
import { LOCALES_DEFAULTS } from './consts';
import { mergeLocales, transformToVersionedTag } from '../../utils/utils';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @slot body - Contains the main content of the basic node.
 * @slot handles - Should contain custom handle elements for integration with React Flow library.
 */
export class WppBasicNode {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.resizeObserver = undefined;
    // Watches the slotted `body` content for added/removed nodes. `slotchange` is not an option here:
    // it only fires for real shadow-DOM slots, and this component is `scoped`, so its slots are emulated.
    this.slotObserver = undefined;
    this.bodyRef = undefined;
    this.titleRef = undefined;
    this.checkBodyForScroll = () => {
      if (this.bodyRef) {
        this.hasScrollbar = this.bodyRef.clientHeight < this.bodyRef.scrollHeight;
      }
    };
    this.handleActionClick = (action) => {
      this.wppActionClick.emit(action);
    };
    /**
     * Reflects whether any content is projected into the `body` slot in the `hasContent` state.
     * Runs on load and whenever the slotted content changes (see `slotObserver`).
     */
    this.updateHasContent = () => {
      const body = this.host.querySelector('[slot="body"]');
      this.hasContent = !!body && (body.children.length > 0 || (body.textContent?.trim().length ?? 0) > 0);
    };
    this.getPrimaryAction = () => {
      if (this.isLoading) {
        return {
          icon: 'wpp-icon-stop',
          label: this._locales.stopAction,
          variant: 'secondary',
          testId: 'wpp-pause-button',
        };
      }
      if (this.isReRun) {
        return {
          icon: 'wpp-icon-refresh',
          label: this._locales.reRunAction,
          variant: 'primary',
          testId: 'wpp-rerun-button',
        };
      }
      return { icon: 'wpp-icon-play', label: this._locales.playAction, variant: 'primary', testId: 'wpp-play-button' };
    };
    this.handlePrimaryActionClick = () => {
      const { icon, label } = this.getPrimaryAction();
      this.handleActionClick({ icon, label });
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
    this.hasContent = false;
    this.nodeTitle = 'Title';
    this.isLoading = false;
    this.isReRun = false;
    this.actions = [];
    this.locales = {};
    this.isSelected = false;
    this.ariaProps = {
      label: 'Open node actions',
    };
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
    this.slotObserver?.disconnect();
    this.slotObserver = undefined;
  }
  componentWillLoad() {
    // Determine the initial content state of the `body` slot.
    this.updateHasContent();
  }
  componentDidLoad() {
    if (!this.bodyRef)
      return;
    // Re-evaluate whenever the slotted `body` content changes.
    this.slotObserver = new MutationObserver(() => {
      this.updateHasContent();
    });
    this.slotObserver.observe(this.bodyRef, { childList: true, subtree: true });
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    const primaryAction = this.getPrimaryAction();
    return (h(Host, { class: "wpp-basic-node" }, h("div", { class: this.getNodeContainerClasses() }, h("div", { class: this.getNodeWrapperClasses() }, h("div", { class: "node-header" }, h("wpp-icon-service-v4-3-0", { color: "var(--wpp-grey-color-700)" }), h("wpp-tooltip-v4-3-0", { text: this.nodeTitle, class: "title-tooltip", config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef)
            return false;
          if (this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, h("p", { ref: el => (this.titleRef = el), class: "node-title" }, this.nodeTitle))), h("wpp-divider-v4-3-0", null), h("div", { ref: el => (this.bodyRef = el), class: "node-body" }, h("slot", { name: "body" })), this.hasScrollbar && h("wpp-divider-v4-3-0", null), h("div", { class: "node-actions" }, h("div", { class: "node-left-actions" }, h("wpp-menu-context-v4-3-0", { appendToListWrapper: true }, h("wpp-action-button-v4-3-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this.ariaProps.label } }, h("wpp-icon-plus-v4-3-0", { slot: "icon-start" })), h("div", null, h("wpp-list-item-v4-3-0", { onWppChangeListItem: () => this.handleActionClick({ icon: 'wpp-icon-file', label: this._locales.uploadFileAction }) }, h("wpp-icon-file-v4-3-0", { slot: "left" }), h("span", { slot: "label" }, this._locales.uploadFileAction)), this.actions.map((action) => (h("wpp-list-item-v4-3-0", { key: action.icon, onWppChangeListItem: () => this.handleActionClick(action) }, h(transformToVersionedTag(action.icon), { slot: 'left' }), h("span", { slot: "label" }, action.label)))))), h("wpp-tooltip-v4-3-0", { text: this._locales.filterAction, config: { placement: 'bottom' } }, h("wpp-action-button-v4-3-0", { variant: "secondary", "data-testid": "wpp-settings-btn", ariaProps: { label: this._locales.filterAction }, onClick: () => this.handleActionClick({ icon: 'wpp-icon-gear', label: this._locales.filterAction }) }, h("wpp-icon-gear-v4-3-0", { slot: "icon-start" })))), (this.isSelected || this.isLoading || this.isReRun) && (h("wpp-tooltip-v4-3-0", { text: primaryAction.label, config: { placement: 'bottom' } }, h("wpp-button-v4-3-0", { class: "play-btn", size: "s", disabled: !this.hasContent && !this.isLoading && !this.isReRun, variant: primaryAction.variant, "data-testid": primaryAction.testId, ariaProps: { label: primaryAction.label }, onClick: this.handlePrimaryActionClick }, this.isLoading ? (h("wpp-icon-stop-v4-3-0", { slot: "icon-start" })) : this.isReRun ? (h("wpp-icon-refresh-v4-3-0", { slot: "icon-start" })) : (h("wpp-icon-play-v4-3-0", { slot: "icon-start" })))))))), h("slot", { name: "handles" })));
  }
  static get is() { return "wpp-basic-node"; }
  static get registryIs() { return "wpp-basic-node-v4-3-0"; }
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
      "isReRun": {
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
          "text": "Defines whether the node is in the re-run state. When true (and not loading), the primary action button\nshows a refresh icon instead of the play icon, indicating the node can be run again."
        },
        "attribute": "is-re-run",
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
          "resolved": "{ playAction?: string | undefined; stopAction?: string | undefined; reRunAction?: string | undefined; filterAction?: string | undefined; uploadFileAction?: string | undefined; }",
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
      "hasScrollbar": {},
      "hasContent": {}
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
}
