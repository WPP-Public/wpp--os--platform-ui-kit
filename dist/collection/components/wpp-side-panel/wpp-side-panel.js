import { h, Host } from '@stencil/core';
import { isEventTargetContained, mergeLocales } from '../../utils/utils';
import { TimeoutManager } from '../../utils/timeout-manager';
import { SidePanelCloseReason, } from './types';
import { LOCALES_DEFAULTS, SIDE_PANEL_KEYBOARD_STEP, SIDE_PANEL_MAX_WIDTH, SIDE_PANEL_MIN_WIDTH } from './const';
import { Z_INDEX } from '../../common/consts';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @slot (default) - Content that is displayed within the body of the side panel. The body container has 16px padding.
 */
export class WppSidePanel {
  constructor() {
    this.timeouts = new TimeoutManager();
    // Resize state kept outside of @State to avoid re-renders on every pointer move.
    this.isResizing = false;
    this.resizeStartX = 0;
    this.pendingWidth = 0;
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.setScrollbarWidth = () => {
      if (!this.bodyRef)
        return;
      const scrollbarWidth = this.bodyRef.offsetWidth - this.bodyRef.clientWidth;
      this.host.style.setProperty('--side-panel-scrollbar-width', `${scrollbarWidth}px`);
    };
    this.clampWidth = (value) => Math.min(SIDE_PANEL_MAX_WIDTH, Math.max(SIDE_PANEL_MIN_WIDTH, Math.round(value)));
    this.applyWidthVar = (width) => {
      this.host.style.setProperty('--wpp-side-panel-current-width', `${width}px`);
    };
    this.handleCloseClick = () => {
      this.wppSidePanelClose.emit({ reason: SidePanelCloseReason.crossClick });
      this.closeReason = SidePanelCloseReason.crossClick;
    };
    this.handleResizeStart = (event) => {
      // Only the primary (left) button starts a resize; ignore right / middle clicks.
      if (event.button !== 0)
        return;
      event.preventDefault();
      this.isResizing = true;
      this.resizeStartX = event.clientX;
      this.pendingWidth = this.currentWidth;
      this.toggleResizeListeners(true);
    };
    this.handleResizeMove = (event) => {
      if (!this.isResizing)
        return;
      this.pendingWidth = this.clampWidth(this.currentWidth + (this.resizeStartX - event.clientX));
      this.applyWidthVar(this.pendingWidth);
    };
    this.handleResizeEnd = () => {
      if (!this.isResizing)
        return;
      const previousWidth = this.currentWidth;
      this.currentWidth = this.pendingWidth;
      this.isResizing = false;
      this.toggleResizeListeners(false);
      if (this.currentWidth !== previousWidth) {
        this.wppSidePanelResize.emit({ width: this.currentWidth });
      }
    };
    this.toggleResizeListeners = (add) => {
      const updateListener = add ? document.addEventListener.bind(document) : document.removeEventListener.bind(document);
      updateListener('pointermove', this.handleResizeMove);
      updateListener('pointerup', this.handleResizeEnd);
      updateListener('pointercancel', this.handleResizeEnd);
    };
    this.handleResizeKeyDown = (event) => {
      let nextWidth;
      switch (event.key) {
        case 'ArrowLeft':
          nextWidth = this.currentWidth + SIDE_PANEL_KEYBOARD_STEP;
          break;
        case 'ArrowRight':
          nextWidth = this.currentWidth - SIDE_PANEL_KEYBOARD_STEP;
          break;
        case 'End':
          nextWidth = SIDE_PANEL_MAX_WIDTH;
          break;
        case 'Home':
          nextWidth = SIDE_PANEL_MIN_WIDTH;
          break;
        default:
          return;
      }
      event.preventDefault();
      const clampedWidth = this.clampWidth(nextWidth);
      if (clampedWidth === this.currentWidth)
        return;
      this.currentWidth = clampedWidth;
      this.applyWidthVar(this.currentWidth);
      this.wppSidePanelResize.emit({ width: this.currentWidth });
    };
    this.handleTransitionStart = (event) => {
      if (event.propertyName !== 'visibility')
        return;
      if (this.open) {
        this.isHidden = false;
        this.wppSidePanelOpenStart.emit();
      }
      else if (this.closeReason) {
        this.wppSidePanelCloseStart.emit({ reason: this.closeReason });
      }
      else {
        this.wppSidePanelCloseStart.emit();
      }
    };
    this.handleTransitionEnd = (event) => {
      if (event.propertyName !== 'visibility')
        return;
      if (this.open) {
        this.wppSidePanelOpenComplete.emit();
        this.focusPanel();
      }
      else {
        this.isHidden = true;
        if (this.closeReason) {
          this.wppSidePanelCloseComplete.emit({ reason: this.closeReason });
        }
        else {
          this.wppSidePanelCloseComplete.emit();
        }
      }
      this.closeReason = null;
    };
    this.focusPanel = () => {
      this.panelRef?.focus();
    };
    this.hostCssClasses = () => ({
      'wpp-side-panel': true,
      'wpp-side-panel-wrapper': true,
      'wpp-visible': this.open,
      'wpp-hidden': this.isHidden,
    });
    this.panelCssClasses = () => ({
      'side-panel': true,
      visible: this.open,
      hide: !this.open,
    });
    this.renderActions = () => {
      if (!this.actionsConfig || this.actionsConfig.length !== 2)
        return null;
      const [secondaryConfig, primaryConfig] = this.actionsConfig;
      const { label: secondaryLabel, ...secondaryRest } = secondaryConfig;
      const { label: primaryLabel, ...primaryRest } = primaryConfig;
      return (h("div", { class: "actions-container" }, h("wpp-divider-v4-3-0", null), h("div", { class: "actions" }, h("wpp-button-v4-3-0", { size: "m", variant: "secondary", ...secondaryRest }, secondaryLabel), h("wpp-button-v4-3-0", { size: "m", variant: "primary", ...primaryRest }, primaryLabel))));
    };
    this.isHidden = true;
    this.closeReason = null;
    this.currentWidth = SIDE_PANEL_MIN_WIDTH;
    this.panelTitle = '';
    this.open = false;
    this.actionsConfig = undefined;
    this.zIndex = Z_INDEX.SIDE_MODAL;
    this.ariaProps = {
      role: 'complementary',
    };
    this.locales = {};
  }
  /**
   * Method for opening the side panel.
   */
  async openPanel() {
    this.open = true;
  }
  /**
   * Method for closing the side panel.
   */
  async closePanel() {
    this.open = false;
  }
  handleChangeOpenStatus(openStatus) {
    if (openStatus) {
      this.host.classList.add('wpp-component-ready');
    }
  }
  handleCloseOnEsc(event) {
    if (event.key === 'Escape' && this.open && isEventTargetContained(this.host, event)) {
      this.wppSidePanelClose.emit({ reason: SidePanelCloseReason.escapePress });
      this.closeReason = SidePanelCloseReason.escapePress;
    }
  }
  componentDidLoad() {
    this.setScrollbarWidth();
    this.timeouts.schedule(() => {
      this.open && this.host.classList.add('wpp-component-ready');
    });
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.timeouts.clearAll();
    this.toggleResizeListeners(false);
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd, style: {
        zIndex: this.zIndex.toString(),
      }, role: this.ariaProps.role, "aria-label": this.ariaProps.label || this.panelTitle || undefined }, h("div", { class: this.panelCssClasses(), tabindex: "-1", ref: ref => (this.panelRef = ref), "data-testid": "wpp-side-panel-content" }, h("div", { class: "resize-handle", role: "separator", tabindex: "0", "aria-orientation": "vertical", "aria-label": this._locales.resizeHandleLabel, "aria-valuenow": this.currentWidth, "aria-valuemin": SIDE_PANEL_MIN_WIDTH, "aria-valuemax": SIDE_PANEL_MAX_WIDTH, "aria-valuetext": `${this.currentWidth}px`, onPointerDown: this.handleResizeStart, onKeyDown: this.handleResizeKeyDown, "data-testid": "wpp-side-panel-resize-handle" }), h("div", { class: "header-container" }, h("wpp-tooltip-v4-3-0", { class: "title-tooltip", text: this.panelTitle, config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef)
            return false;
          if (this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, h("wpp-typography-v4-3-0", { ref: el => (this.titleRef = el), type: "s-strong", class: "title" }, this.panelTitle)), h("wpp-action-button-v4-3-0", { ariaProps: { label: this._locales.closeIconLabel }, variant: "secondary", onClick: this.handleCloseClick, class: "close-button" }, h("wpp-icon-cross-v4-3-0", { slot: "icon-start" }))), h("wpp-divider-v4-3-0", null), h("div", { class: "body", ref: el => (this.bodyRef = el) }, h("slot", null)), this.renderActions())));
  }
  static get is() { return "wpp-side-panel"; }
  static get registryIs() { return "wpp-side-panel-v4-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-side-panel.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-side-panel.css"]
    };
  }
  static get properties() {
    return {
      "panelTitle": {
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
          "text": "The title displayed in the header section of the side panel."
        },
        "attribute": "panel-title",
        "reflect": false,
        "defaultValue": "''"
      },
      "open": {
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
          "text": "If the side panel is open."
        },
        "attribute": "open",
        "reflect": true,
        "defaultValue": "false"
      },
      "actionsConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "SidePanelActionsConfig",
          "resolved": "[BaseActionConfig, BaseActionConfig] | undefined",
          "references": {
            "SidePanelActionsConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-panel/types.ts::SidePanelActionsConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Configuration for the two action buttons rendered at the bottom of the panel.\n\nThe `actionsConfig` is a tuple of exactly 2 items:\n- the first item renders as the secondary (left) button\n- the second item renders as the primary (right) button"
        }
      },
      "zIndex": {
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
          "text": "Defines the z-index of the WppSidePanel."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.SIDE_MODAL"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "SidePanelAriaProps",
          "resolved": "{ role?: string | undefined; label?: string | undefined; }",
          "references": {
            "SidePanelAriaProps": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-panel/types.ts::SidePanelAriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the panel `aria-` props."
        },
        "defaultValue": "{\n    role: 'complementary',\n  }"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<SidePanelLocalesType>",
          "resolved": "{ closeIconLabel?: string | undefined; resizeHandleLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "SidePanelLocalesType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-panel/types.ts::SidePanelLocalesType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the component locale types."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "isHidden": {},
      "closeReason": {},
      "currentWidth": {}
    };
  }
  static get events() {
    return [{
        "method": "wppSidePanelClose",
        "name": "wppSidePanelClose",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Handles the side panel closing actions (cross click / escape press)."
        },
        "complexType": {
          "original": "SidePanelCloseDetails",
          "resolved": "SidePanelCloseDetails",
          "references": {
            "SidePanelCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-panel/types.ts::SidePanelCloseDetails"
            }
          }
        }
      }, {
        "method": "wppSidePanelOpenStart",
        "name": "wppSidePanelOpenStart",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the open animation starts."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppSidePanelOpenComplete",
        "name": "wppSidePanelOpenComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the open animation ends."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppSidePanelCloseStart",
        "name": "wppSidePanelCloseStart",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the close animation starts."
        },
        "complexType": {
          "original": "SidePanelCloseDetails",
          "resolved": "SidePanelCloseDetails",
          "references": {
            "SidePanelCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-panel/types.ts::SidePanelCloseDetails"
            }
          }
        }
      }, {
        "method": "wppSidePanelCloseComplete",
        "name": "wppSidePanelCloseComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the close animation ends."
        },
        "complexType": {
          "original": "SidePanelCloseDetails",
          "resolved": "SidePanelCloseDetails",
          "references": {
            "SidePanelCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-panel/types.ts::SidePanelCloseDetails"
            }
          }
        }
      }, {
        "method": "wppSidePanelResize",
        "name": "wppSidePanelResize",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Event emitted when the panel width changes: once on release for a pointer drag, and on\nevery step for keyboard resizing. The detail contains the new width in pixels."
        },
        "complexType": {
          "original": "SidePanelResizeDetails",
          "resolved": "SidePanelResizeDetails",
          "references": {
            "SidePanelResizeDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-panel/types.ts::SidePanelResizeDetails"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "openPanel": {
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
          "text": "Method for opening the side panel.",
          "tags": []
        }
      },
      "closePanel": {
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
          "text": "Method for closing the side panel.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "open",
        "methodName": "handleChangeOpenStatus"
      }];
  }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "handleCloseOnEsc",
        "target": "document",
        "capture": false,
        "passive": false
      }];
  }
}
