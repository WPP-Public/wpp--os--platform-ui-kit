import { Host, h } from '@stencil/core';
export class WppInlineEdit {
  constructor() {
    this.getFormElement = () => this.wrapperRef?.querySelector('slot[name="form-element"]')?.assignedNodes()[0];
    this.emitModeChange = (mode, reason) => {
      this.wppModeChange.emit({ mode, closePopover: () => this.popoverRef?.closePopover(), reason });
    };
    this.handleAccept = (reason) => {
      this.emitModeChange('read', reason);
      this.popoverRef?.closePopover();
    };
    this.handleClose = (event, reason) => {
      this.popoverRef?.closePopover();
      if (!(event?.target).closest('[slot="form-element"]')) {
        if (reason === 'cancel') {
          this.getFormElement()?.setValue(this.initialValue);
        }
        this.emitModeChange('read', reason);
        return false;
      }
    };
    this.inlineEditCssClasses = () => ({
      'wpp-inline-edit': true,
    });
    this.inlineEditPopoverCssClasses = () => ({
      popover: true,
      'full-width': this.mode === 'edit' && this.inputWidth !== 'auto' && this.inputWidth !== undefined,
    });
    this.placeholderCssClasses = () => ({ placeholder: !this.value });
    this.initialValue = undefined;
    this.inputValue = undefined;
    this.isEdit = undefined;
    this.mode = 'read';
    this.value = undefined;
    this.placeholder = 'placeholder';
    this.dropdownConfig = {};
    this.inputWidth = 'auto';
  }
  /**
   * Method for closing inline-edit
   */
  async closePopover() {
    this.popoverRef?.closePopover();
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.setFocus();
  }
  editModeChangeHandler() {
    requestAnimationFrame(() => {
      if (this.mode === 'edit')
        this.getFormElement()?.setFocus();
    });
  }
  render() {
    const isEdit = this.mode === 'edit';
    const inlineWidth = isEdit && this.inputWidth !== 'auto' && this.inputWidth !== undefined;
    return (h(Host, { class: this.inlineEditCssClasses(), exportparts: "label, wrapper, input, textarea, buttons, inline-edit-typography, content, content-bg" }, h("wpp-popover-v2-22-0", { ref: ref => (this.popoverRef = ref), externalClass: "inline-edit-popover", exportparts: "content", class: this.inlineEditPopoverCssClasses(), style: { width: inlineWidth ? this.inputWidth : '' }, config: {
        placement: 'right-start',
        offset: [0, 4],
        hideOnClick: false,
        animation: false,
        ...this.dropdownConfig,
        onShow: () => {
          this.initialValue = this.value;
          setTimeout(() => {
            this.getFormElement()?.setFocus();
          }, 50);
        },
        onClickOutside: (_, e) => this.handleClose(e, 'outsideClick'),
      } }, h("div", { slot: "trigger-element", class: "trigger-element" }, h("div", { tabIndex: 0, role: "button", class: "trigger", ref: ref => (this.wrapperRef = ref) }, isEdit ? (h("div", { class: "wrapper", part: "wrapper" }, h("div", { class: "form-element", ref: ref => (this.formElementRef = ref) }, h("slot", { name: "form-element" })))) : (h("div", { class: "content", onClick: () => this.emitModeChange('edit'), part: "content" }, h("div", { class: "content-bg", part: "content-bg" }), h("wpp-typography-v2-22-0", { class: this.placeholderCssClasses(), type: "s-body", part: "inline-edit-typography" }, this.value || this.placeholder), h("wpp-icon-edit-v2-22-0", null))))), h("div", { class: "buttons", part: "buttons" }, h("wpp-action-button-v2-22-0", { variant: "inverted", onClick: () => this.handleAccept('apply') }, h("wpp-icon-done-v2-22-0", { slot: "icon-start" })), h("wpp-action-button-v2-22-0", { variant: "inverted", onClick: e => this.handleClose(e, 'cancel') }, h("wpp-icon-cross-v2-22-0", { slot: "icon-start" }))))));
  }
  static get is() { return "wpp-inline-edit"; }
  static get registryIs() { return "wpp-inline-edit-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-inline-edit.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-inline-edit.css"]
    };
  }
  static get properties() {
    return {
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "InlineEditMode",
          "resolved": "\"edit\" | \"read\"",
          "references": {
            "InlineEditMode": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-inline-edit/types.ts::InlineEditMode"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the inline edit mode."
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "'read'"
      },
      "value": {
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
          "text": "Defines the value of the editing field."
        },
        "attribute": "value",
        "reflect": false
      },
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the placeholder for the input field. It is displayed when the input field is empty.\nThe placeholder is visible only in view mode. In edit mode, the input provided by the user will be displayed."
        },
        "attribute": "placeholder",
        "reflect": false,
        "defaultValue": "'placeholder'"
      },
      "dropdownConfig": {
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
        "defaultValue": "{}"
      },
      "inputWidth": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the width of the input field when in active state.\nAccepts any valid CSS width expression (e.g., \"300px\", \"100%\", \"calc(100% - 68px)\")."
        },
        "attribute": "input-width",
        "reflect": true,
        "defaultValue": "'auto'"
      }
    };
  }
  static get states() {
    return {
      "initialValue": {},
      "inputValue": {},
      "isEdit": {}
    };
  }
  static get events() {
    return [{
        "method": "wppModeChange",
        "name": "wppModeChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the inline edit mode changes"
        },
        "complexType": {
          "original": "InlineEditChangeModeEventDetail",
          "resolved": "{ mode: InlineEditMode; closePopover: () => void; reason?: InlineEditClosePopoverReason | undefined; }",
          "references": {
            "InlineEditChangeModeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-inline-edit/types.ts::InlineEditChangeModeEventDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "closePopover": {
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
          "text": "Method for closing inline-edit",
          "tags": []
        }
      },
      "setFocus": {
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
          "text": "Method that sets focus on the native input.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "mode",
        "methodName": "editModeChangeHandler"
      }];
  }
}
