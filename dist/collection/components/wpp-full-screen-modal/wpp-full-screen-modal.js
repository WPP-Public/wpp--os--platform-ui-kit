import { Host, h } from '@stencil/core';
import { ANIMATION_PROPERTY_NAME, Z_INDEX } from '../../common/consts';
import { applyBodyStylesIfNeeded, getSlotEmptyStates } from '../../utils/utils';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { FullScreenModalCloseReason } from './types';
/**
 * @slot header - Content that is displayed within the `.full-screen-modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.full-screen-modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions - Content that is displayed within the `.full-screen-modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.

 *
 * @part wrapper - component wrapper element
 * @part overlay - overlay element
 * @part content - modal content element
 * @part header - header slot element
 * @part body - Main slot content wrapper
 * @part actions - actions slot element
 */
export class WppFullScreenModal {
  constructor() {
    this.onOverlayClick = () => {
      if (this.disableOutsideClick)
        return;
      this.wppFullScreenModalClose.emit({ reason: FullScreenModalCloseReason.outsideClick });
      this.closeReason = FullScreenModalCloseReason.outsideClick;
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        header: '[slot="header"]',
        body: '[slot="body"]',
        actions: '[slot="actions"]',
      });
      this.hasHeaderSlot = !emptyStates.header;
      this.hasBodySlot = !emptyStates.body;
      this.hasActionsSlot = !emptyStates.actions;
    };
    this.handleTransitionStart = (event) => {
      if (event.propertyName !== ANIMATION_PROPERTY_NAME)
        return;
      if (this.open) {
        this.wppFullScreenModalOpenStart.emit();
      }
      else {
        if (this.closeReason) {
          this.wppFullScreenModalCloseStart.emit({ reason: this.closeReason });
        }
        else {
          this.wppFullScreenModalCloseStart.emit();
        }
      }
    };
    this.handleTransitionEnd = (event) => {
      if (event.propertyName !== ANIMATION_PROPERTY_NAME)
        return;
      if (this.open) {
        this.wppFullScreenModalOpenComplete.emit();
        this.wppFullScreenModalOpen.emit();
        this.focusDialog();
      }
      else {
        if (this.closeReason) {
          this.wppFullScreenModalCloseComplete.emit({ reason: this.closeReason });
        }
        else {
          this.wppFullScreenModalCloseComplete.emit();
        }
      }
      this.closeReason = null;
    };
    this.focusDialog = () => {
      if (!this.dialogRef)
        return;
      this.dialogRef.focus();
    };
    this.handleCloseModal = () => {
      this.wppFullScreenModalClose.emit({ reason: FullScreenModalCloseReason.escapePress });
      this.closeReason = FullScreenModalCloseReason.escapePress;
    };
    this.headerCssClasses = () => ({
      header: true,
      'slot-hidden': !this.hasHeaderSlot,
    });
    this.bodyCssClasses = () => ({
      body: true,
      'slot-hidden': !this.hasBodySlot,
    });
    this.actionsCssClasses = () => ({
      actions: true,
      'slot-hidden': !this.hasActionsSlot,
    });
    this.hostCssClasses = () => ({
      'wpp-full-screen-modal': true,
      'wpp-full-screen-modal-wrapper': true,
      'wpp-visible': this.open,
      'wpp-hide': !this.open,
    });
    this.fullScreenModalCssClasses = () => ({
      'full-screen-modal': true,
      visible: this.open,
      hide: !this.open,
    });
    this.headerContainerCssClasses = () => ({
      'header-container': true,
    });
    this.hasHeaderSlot = false;
    this.hasBodySlot = false;
    this.hasActionsSlot = false;
    this.closeReason = null;
    this.open = false;
    this.withTransparentOverlay = undefined;
    this.disableOutsideClick = false;
    this.formConfig = undefined;
    this.zIndex = Z_INDEX.MODAL;
    this.ariaProps = {
      role: 'dialog',
      labelledby: 'dialog_label',
    };
  }
  handleCloseOnEsc(event) {
    if (event.key === 'Escape' && this.open) {
      this.wppFullScreenModalClose.emit({ reason: FullScreenModalCloseReason.escapePress });
      this.closeReason = FullScreenModalCloseReason.escapePress;
    }
  }
  handleChangeFullScreenModalStatus(openStatus) {
    if (openStatus) {
      this.host.classList.add('component-ready');
    }
    setTimeout(() => {
      applyBodyStylesIfNeeded(this.open ? 'add' : 'remove');
    });
  }
  /**
   * Method for closing the full screen modal.
   */
  async closeFullScreenModal() {
    this.open = false;
  }
  /**
   * Method for opening the full screen modal.
   */
  async openFullScreenModal() {
    this.open = true;
  }
  // TODO: issues with FOUC(Flash Of Unstyled Content), react output does not inherit Stencil configuration,
  //       invisiblePrehydration:true( works for Storybook, but not for react/angular components) there is might
  //       be an option, that we need to provide our own prehydration mechanism. Temporal solution.
  componentDidLoad() {
    setTimeout(() => {
      this.open && this.host.classList.add('component-ready');
    }, 0);
  }
  disconnectedCallback() {
    this.closeFullScreenModal();
  }
  render() {
    const Tag = this.formConfig ? 'form' : 'div';
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, full-screen-modal, header, body, actions, header-wrapper, body-wrapper, actions-wrapper", onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd, style: { zIndex: this.zIndex.toString() }, role: this.ariaProps.role, "aria-labelledby": this.ariaProps.labelledby, "aria-modal": "true" }, h("div", { class: "full-screen-modal-overlay", part: "wrapper" }, h("wpp-overlay-v3-5-0", { ...(this.withTransparentOverlay ? { style: { opacity: '0' } } : {}), isVisible: this.open, onWppClick: this.onOverlayClick, zIndex: 0 }), h("div", { tabindex: "0", class: "focus-sentinel", onFocus: this.focusDialog }), h(Tag, { tabindex: "-1", class: this.fullScreenModalCssClasses(), part: "content", ...this.formConfig, "data-testid": "wpp-fullscreen-modal-content", ref: ref => (this.dialogRef = ref) }, h("div", { class: this.headerContainerCssClasses() }, h(WrappedSlot, { id: this.ariaProps.labelledby, wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData }), h("wpp-action-button-v3-5-0", { variant: "secondary", onClick: this.handleCloseModal, class: "close-button" }, h("wpp-icon-cross-v3-5-0", { slot: "icon-start" }))), h(WrappedSlot, { wrapperClass: this.bodyCssClasses(), name: "body", onSlotchange: this.updateSlotData }), h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData })), h("div", { tabindex: "0", class: "focus-sentinel", onFocus: this.focusDialog }))));
  }
  static get is() { return "wpp-full-screen-modal"; }
  static get registryIs() { return "wpp-full-screen-modal-v3-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-full-screen-modal.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-full-screen-modal.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Indicates is the modal open."
        },
        "attribute": "open",
        "reflect": true,
        "defaultValue": "false"
      },
      "withTransparentOverlay": {
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
          "text": "Makes overlay transparent"
        },
        "attribute": "with-transparent-overlay",
        "reflect": false
      },
      "disableOutsideClick": {
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
          "text": "If the modal can be closed by clicking outside of it."
        },
        "attribute": "disable-outside-click",
        "reflect": false,
        "defaultValue": "false"
      },
      "formConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "FullScreenModalFormConfig",
          "resolved": "FullScreenModalFormConfig | undefined",
          "references": {
            "FullScreenModalFormConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-full-screen-modal/types.ts::FullScreenModalFormConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "If you pass this prop wrapper of dialog will be rendered as form."
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
          "text": "Defines the z-index of the WppFullScreenModal."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.MODAL"
      },
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
          "text": "Contains the modal `aria-` props."
        },
        "defaultValue": "{\n    role: 'dialog',\n    labelledby: 'dialog_label',\n  }"
      }
    };
  }
  static get states() {
    return {
      "hasHeaderSlot": {},
      "hasBodySlot": {},
      "hasActionsSlot": {},
      "closeReason": {}
    };
  }
  static get events() {
    return [{
        "method": "wppFullScreenModalClose",
        "name": "wppFullScreenModalClose",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Handles the modal closing actions."
        },
        "complexType": {
          "original": "FullScreenModalCloseDetails",
          "resolved": "FullScreenModalCloseDetails",
          "references": {
            "FullScreenModalCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-full-screen-modal/types.ts::FullScreenModalCloseDetails"
            }
          }
        }
      }, {
        "method": "wppFullScreenModalOpenStart",
        "name": "wppFullScreenModalOpenStart",
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
        "method": "wppFullScreenModalOpenComplete",
        "name": "wppFullScreenModalOpenComplete",
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
        "method": "wppFullScreenModalCloseStart",
        "name": "wppFullScreenModalCloseStart",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the close animation starts."
        },
        "complexType": {
          "original": "FullScreenModalCloseDetails",
          "resolved": "FullScreenModalCloseDetails",
          "references": {
            "FullScreenModalCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-full-screen-modal/types.ts::FullScreenModalCloseDetails"
            }
          }
        }
      }, {
        "method": "wppFullScreenModalCloseComplete",
        "name": "wppFullScreenModalCloseComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the close animation ends."
        },
        "complexType": {
          "original": "FullScreenModalCloseDetails",
          "resolved": "FullScreenModalCloseDetails",
          "references": {
            "FullScreenModalCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-full-screen-modal/types.ts::FullScreenModalCloseDetails"
            }
          }
        }
      }, {
        "method": "wppFullScreenModalOpen",
        "name": "wppFullScreenModalOpen",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "- this prop will be deleted in version 3.0.0 . Use `wppFullScreenModalOpenStart`/`wppFullScreenModalOpenComplete` instead"
            }],
          "text": "Handles the modal click actions."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "closeFullScreenModal": {
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
          "text": "Method for closing the full screen modal.",
          "tags": []
        }
      },
      "openFullScreenModal": {
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
          "text": "Method for opening the full screen modal.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "open",
        "methodName": "handleChangeFullScreenModalStatus"
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
