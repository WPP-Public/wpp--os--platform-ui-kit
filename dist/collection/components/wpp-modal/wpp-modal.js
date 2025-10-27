import { Host, h } from '@stencil/core';
import { ANIMATION_PROPERTY_NAME, Z_INDEX } from '../../common/consts';
import { applyBodyStylesIfNeeded, getSlotEmptyStates } from '../../utils/utils';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { ModalCloseReason } from './types';
/**
 * @slot header - Content that is displayed within the `.modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions - Content that is displayed within the `.modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.

 *
 * @part wrapper - component wrapper element
 * @part overlay - overlay element
 * @part content - modal content element
 * @part header - header slot element
 * @part body - Main slot content wrapper
 * @part actions - actions slot element
 */
export class WppModal {
  constructor() {
    this.onOverlayClick = () => {
      if (this.disableOutsideClick)
        return;
      this.wppModalClose.emit({ reason: ModalCloseReason.outsideClick });
      this.closeReason = ModalCloseReason.outsideClick;
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
        this.wppModalOpenStart.emit();
      }
      else {
        if (this.closeReason) {
          this.wppModalCloseStart.emit({ reason: this.closeReason });
        }
        else {
          this.wppModalCloseStart.emit();
        }
      }
    };
    this.handleTransitionEnd = (event) => {
      if (event.propertyName !== ANIMATION_PROPERTY_NAME)
        return;
      if (this.open) {
        this.wppModalOpenComplete.emit();
        this.wppModalOpen.emit();
      }
      else {
        if (this.closeReason) {
          this.wppModalCloseComplete.emit({ reason: this.closeReason });
        }
        else {
          this.wppModalCloseComplete.emit();
        }
      }
      this.closeReason = null;
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
      'wpp-modal': true,
      'wpp-modal-wrapper': true,
      'wpp-visible': this.open,
      'wpp-hide': !this.open,
    });
    this.modalCssClasses = () => ({
      modal: true,
      visible: this.open,
      hide: !this.open,
      [`size-${this.size}`]: !!this.size,
    });
    this.hasHeaderSlot = false;
    this.hasBodySlot = false;
    this.hasActionsSlot = false;
    this.closeReason = null;
    this.open = false;
    this.size = 's';
    this.withTransparentOverlay = undefined;
    this.disableOutsideClick = false;
    this.formConfig = undefined;
    this.zIndex = Z_INDEX.MODAL;
  }
  handleCloseOnEsc(event) {
    if (event.key === 'Escape' && this.open) {
      this.wppModalClose.emit({ reason: ModalCloseReason.escapePress });
      this.closeReason = ModalCloseReason.escapePress;
    }
  }
  handleChangeModalStatus(openStatus) {
    if (openStatus) {
      this.host.classList.add('wpp-component-ready');
    }
    setTimeout(() => {
      applyBodyStylesIfNeeded(this.open ? 'add' : 'remove');
    });
  }
  /**
   * Method for closing the modal.
   */
  async closeModal() {
    this.open = false;
  }
  /**
   * Method for opening the modal.
   */
  async openModal() {
    this.open = true;
  }
  // TODO: issues with FOUC(Flash Of Unstyled Content), react output does not inherit Stencil configuration,
  //       invisiblePrehydration:true( works for Storybook, but not for react/angular components) there is might
  //       be an option, that we need to provide our own prehydration mechanism. Temporal solution.
  componentDidLoad() {
    setTimeout(() => {
      this.open && this.host.classList.add('wpp-component-ready');
    }, 0);
  }
  disconnectedCallback() {
    this.closeModal();
  }
  render() {
    const Tag = this.formConfig ? 'form' : 'div';
    return (h(Host, { class: this.hostCssClasses(), "aria-modal": "true", exportparts: "wrapper, modal, header, body, actions, header-wrapper, body-wrapper, actions-wrapper", onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd, style: { zIndex: this.zIndex.toString() } }, h("div", { class: "modal-overlay", part: "wrapper" }, h("wpp-overlay-v3-3-0", { ...(this.withTransparentOverlay ? { style: { opacity: '0' } } : {}), isVisible: this.open, onWppClick: this.onOverlayClick, zIndex: 0 }), h(Tag, { role: "dialog", class: this.modalCssClasses(), part: "content", ...this.formConfig, "data-testid": "wpp-modal-content" }, h(WrappedSlot, { wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData }), h(WrappedSlot, { wrapperClass: this.bodyCssClasses(), name: "body", onSlotchange: this.updateSlotData }), h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData })))));
  }
  static get is() { return "wpp-modal"; }
  static get registryIs() { return "wpp-modal-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-modal.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-modal.css"]
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
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the modal size"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'s'"
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
          "original": "ModalFormConfig",
          "resolved": "ModalFormConfig | undefined",
          "references": {
            "ModalFormConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-modal/types.ts::ModalFormConfig"
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
          "text": "Defines the z-index of the WppModal."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.MODAL"
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
        "method": "wppModalClose",
        "name": "wppModalClose",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Handles the modal closing actions."
        },
        "complexType": {
          "original": "ModalCloseDetails",
          "resolved": "ModalCloseDetails",
          "references": {
            "ModalCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-modal/types.ts::ModalCloseDetails"
            }
          }
        }
      }, {
        "method": "wppModalOpenStart",
        "name": "wppModalOpenStart",
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
        "method": "wppModalOpenComplete",
        "name": "wppModalOpenComplete",
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
        "method": "wppModalCloseStart",
        "name": "wppModalCloseStart",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the close animation starts."
        },
        "complexType": {
          "original": "ModalCloseDetails",
          "resolved": "ModalCloseDetails",
          "references": {
            "ModalCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-modal/types.ts::ModalCloseDetails"
            }
          }
        }
      }, {
        "method": "wppModalCloseComplete",
        "name": "wppModalCloseComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the close animation ends."
        },
        "complexType": {
          "original": "ModalCloseDetails",
          "resolved": "ModalCloseDetails",
          "references": {
            "ModalCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-modal/types.ts::ModalCloseDetails"
            }
          }
        }
      }, {
        "method": "wppModalOpen",
        "name": "wppModalOpen",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "- this prop will be deleted in version 4.0.0 . Use `wppModalOpenStart`/`wppModalOpenComplete` instead"
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
      "closeModal": {
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
          "text": "Method for closing the modal.",
          "tags": []
        }
      },
      "openModal": {
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
          "text": "Method for opening the modal.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "open",
        "methodName": "handleChangeModalStatus"
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
