import { Host, h } from '@stencil/core';
import { InlineEditModeEnum, } from './types';
import { sticky } from 'tippy.js';
import { debounce, isEventTargetContained, transformToVersionedTag } from '../../utils/utils';
import { LOCALES_DEFAULTS } from './const';
export class WppInlineEdit {
  constructor() {
    this.lastValueWithError = undefined;
    this._locales = LOCALES_DEFAULTS;
    this.handleAnchorResize = (entries) => {
      for (const entry of entries) {
        if (entry.target === this.triggerContainerRef) {
          this.popoverInstance?.popperInstance?.update();
        }
      }
    };
    this.checkViewTextOverflow = () => {
      if (!this.viewTextRef) {
        return;
      }
      const el = this.viewTextRef;
      const isTruncated = el.scrollWidth > el.clientWidth;
      if (isTruncated !== this.isViewTextTruncated) {
        this.isViewTextTruncated = isTruncated;
      }
    };
    this.initViewResizeObserver = () => {
      this.viewResizeObserverCallback = debounce(() => this.checkViewTextOverflow(), 50);
      this.viewResizeObserver = new ResizeObserver(() => {
        this.viewResizeObserverCallback?.();
      });
      if (this.viewTextRef) {
        try {
          this.viewResizeObserver.observe(this.viewTextRef);
        }
        catch {
          console.error('Error observing viewTextRef');
        }
      }
    };
    this.setViewTextRef = (el) => {
      if (el === this.viewTextRef)
        return;
      if (this.viewResizeObserver && this.viewTextRef) {
        try {
          this.viewResizeObserver.unobserve(this.viewTextRef);
        }
        catch {
          console.error('Error unobserving viewTextRef');
        }
      }
      this.viewTextRef = el;
      if (el) {
        // Initialize observer if not already done
        if (!this.viewResizeObserver) {
          this.initViewResizeObserver();
        }
        if (this.viewResizeObserver) {
          try {
            this.viewResizeObserver.observe(el);
          }
          catch {
            console.error('Error observing viewTextRef');
          }
        }
      }
    };
    this.getFormElement = () => {
      try {
        return this.host?.querySelector('[slot="form-element"]');
      }
      catch {
        // Host element may not be available during async operations after component disconnection
        return undefined;
      }
    };
    this.emitModeChange = (mode, reason) => {
      this.wppModeChange.emit({ mode, closePopover: () => this.popoverRef?.closePopover(), reason });
    };
    this.handleAccept = async () => {
      const formEl = this.getFormElement();
      if (!formEl)
        return;
      this.isPendingRequest = true;
      const waits = [];
      // Emit the confirm event and collect any promises to wait for.
      // The developers will pass a promise to the waitUntil function, which represents the async operation (e.g., server validation).
      const confirmEvent = this.wppConfirm.emit({
        value: this.value,
        waitUntil: (p) => waits.push(p),
      });
      try {
        if (confirmEvent.defaultPrevented || waits.length > 0) {
          // If the developer does server validations, wait for it to complete and get the result.
          const results = await Promise.allSettled(waits);
          // If the component unmounts before the request finishes, don't process it.
          if (!this.host.isConnected)
            return;
          // Search for any rejected promise and throw error if it exists.
          const rejected = results.find(r => r.status === 'rejected');
          if (rejected) {
            throw rejected.reason ?? new Error(this._locales.defaultErrorMessage);
          }
        }
        // Successful validation, close the popover, clear errors.
        this.setErrorState('clear', formEl);
        this.emitModeChange('read', 'apply');
        this.popoverRef?.closePopover();
        this.lastValueWithError = undefined;
      }
      catch (error) {
        // If the component unmounts before the request finishes, don't process it.
        if (!this.host.isConnected)
          return;
        this.lastValueWithError = this.value;
        // Put input / textarea in error state to display appropiate border-color.
        this.setErrorState('error', formEl, error);
        formEl.setFocus();
        // If error already exists and just the message has changed, display the tooltip again.
        if (this.tooltipInstance) {
          this.tooltipInstance.show();
        }
      }
      finally {
        if (this.host.isConnected) {
          // Validation done. Buttons no longer need to be disabled.
          this.isPendingRequest = false;
        }
      }
    };
    this.setErrorState = (
    // If type === 'error', the `error` should be provided.
    type, formEl, error) => {
      this.errorMessage = type === 'clear' ? undefined : error.message || this._locales.defaultErrorMessage;
      formEl.messageType = type === 'clear' ? undefined : 'error';
    };
    this.handleClose = (event, reason) => {
      if (this.isPendingRequest || isEventTargetContained(this.host, event))
        return;
      this.lastValueWithError = undefined;
      this.popoverRef?.closePopover();
      if (!(event?.target).closest('[slot="form-element"]')) {
        if (reason === 'cancel' || reason === 'outsideClick') {
          this.getFormElement()?.setValue(this.initialValue);
        }
        this.emitModeChange('read', reason);
        return false;
      }
    };
    this.inlineEditCssClasses = () => ({
      'wpp-inline-edit': true,
      'wpp-inline-edit-error': !!this.errorMessage && this.mode === InlineEditModeEnum.EDIT,
    });
    this.inlineEditPopoverCssClasses = () => ({
      popover: true,
      'full-width': this.mode === InlineEditModeEnum.EDIT && this.inputWidth !== 'auto' && this.inputWidth !== undefined,
    });
    this.onKeyDownFormEl = (event) => {
      if (event.key === 'Enter') {
        this.handleAccept();
      }
    };
    this.viewTextCssClasses = () => ({
      'view-text': true,
      placeholder: !this.value,
    });
    this.renderViewText = () => {
      const displayText = this.value || this.placeholder;
      return (h("span", { class: this.viewTextCssClasses(), part: "view-text", ref: this.setViewTextRef }, displayText));
    };
    this.renderViewContent = () => {
      const shouldShowTooltip = this.isViewTextTruncated && this.value;
      return shouldShowTooltip ? (h("wpp-tooltip-v4-1-0", { class: "view-tooltip", text: this.value }, this.renderViewText())) : (this.renderViewText());
    };
    this.renderTriggerElement = () => (h("div", { tabIndex: 0, role: "button", class: "trigger", "aria-label": this.value || this.placeholder }, this.mode === InlineEditModeEnum.EDIT ? (h("div", { class: "wrapper", part: "wrapper" }, h("div", { class: "form-element", onKeyDown: this.onKeyDownFormEl }, h("slot", { name: "form-element" })))) : (h("div", { class: "content", onClick: () => this.emitModeChange(InlineEditModeEnum.EDIT), part: "content" }, h("div", { class: "content-bg", part: "content-bg" }), this.renderViewContent(), h("wpp-icon-edit-v4-1-0", { "aria-hidden": "true" })))));
    this.initialValue = undefined;
    this.inputValue = undefined;
    this.formType = 'input';
    this.isPendingRequest = false;
    this.errorMessage = undefined;
    this.isViewTextTruncated = false;
    this.mode = 'read';
    this.value = undefined;
    this.placeholder = 'placeholder';
    this.dropdownConfig = {};
    this.inputWidth = '200px';
    this.locales = {};
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
      if (this.mode === InlineEditModeEnum.EDIT) {
        const formElement = this.getFormElement();
        if (this.formType === 'input' && formElement) {
          const inputEl = formElement;
          inputEl.truncationTooltipConfig = {
            onShow: () => {
              if (this.errorMessage)
                return false;
            },
          };
        }
      }
    });
  }
  onValueChange() {
    this.checkViewTextOverflow();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this.formType =
      this.getFormElement()?.tagName.toLowerCase() === transformToVersionedTag('wpp-textarea-input')
        ? 'textarea'
        : 'input';
    this._locales = { ...this._locales, ...this.locales };
  }
  componentDidLoad() {
    if (!this.triggerContainerRef)
      return;
    this.resizeObserver = new ResizeObserver(this.handleAnchorResize);
    this.resizeObserver.observe(this.triggerContainerRef);
    this.initViewResizeObserver();
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.viewResizeObserver?.disconnect();
  }
  render() {
    const inlineWidth = this.mode === InlineEditModeEnum.EDIT && this.inputWidth !== 'auto' && this.inputWidth !== undefined;
    return (h(Host, { class: this.inlineEditCssClasses(), exportparts: "label, wrapper, input, textarea, buttons, view-text, content, content-bg" }, h("wpp-popover-v4-1-0", { ref: ref => (this.popoverRef = ref), externalClass: "inline-edit-popover", exportparts: "content", class: this.inlineEditPopoverCssClasses(), style: { width: inlineWidth ? this.inputWidth : '' }, config: {
        placement: this.formType === 'input' ? 'right-start' : 'bottom-start',
        offset: [0, 4],
        hideOnClick: false,
        animation: false,
        ...this.dropdownConfig,
        plugins: [sticky],
        onCreate: (instance) => {
          this.popoverInstance = instance;
          if (this.dropdownConfig?.onCreate) {
            this.dropdownConfig.onCreate(instance);
          }
        },
        onDestroy: (instance) => {
          this.popoverInstance = undefined;
          if (this.dropdownConfig?.onDestroy) {
            this.dropdownConfig.onDestroy(instance);
          }
        },
        onShow: (instance) => {
          this.initialValue = this.value;
          setTimeout(() => {
            this.getFormElement()?.setFocus();
          }, 100);
          if (this.dropdownConfig?.onShow) {
            this.dropdownConfig.onShow(instance);
          }
        },
        onHidden: (instance) => {
          const formEl = this.getFormElement();
          if (!formEl)
            return;
          this.setErrorState('clear', formEl);
          if (this.dropdownConfig?.onHidden) {
            this.dropdownConfig.onHidden(instance);
          }
        },
        onClickOutside: (_, e) => this.handleClose(e, 'outsideClick'),
      } }, h("div", { slot: "trigger-element", ref: elRef => (this.triggerContainerRef = elRef), class: "trigger-element" }, this.errorMessage && this.mode === InlineEditModeEnum.EDIT ? (h("wpp-tooltip-v4-1-0", { class: 'wpp-anchor-toolip', error: true, text: this.errorMessage, config: {
        showOnCreate: true,
        onCreate: instance => {
          this.tooltipInstance = instance;
        },
        onShow: (instance) => {
          setTimeout(() => {
            instance.popperInstance?.update();
          }, 20);
        },
      } }, this.renderTriggerElement())) : (this.renderTriggerElement())), h("div", { class: "wpp-buttons-container", part: "buttons" }, h("wpp-action-button-v4-1-0", { disabled: this.isPendingRequest || this.value === this.lastValueWithError, variant: "inverted", onClick: this.handleAccept }, h("wpp-icon-done-v4-1-0", { slot: "icon-start" })), h("wpp-action-button-v4-1-0", { disabled: this.isPendingRequest, variant: "inverted", onClick: e => this.handleClose(e, 'cancel') }, h("wpp-icon-cross-v4-1-0", { slot: "icon-start" }))))));
  }
  static get is() { return "wpp-inline-edit"; }
  static get registryIs() { return "wpp-inline-edit-v4-1-0"; }
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
        "defaultValue": "'200px'"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<InlineEditLocales>",
          "resolved": "{ defaultErrorMessage?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "InlineEditLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-inline-edit/types.ts::InlineEditLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for the inline-edit component"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "initialValue": {},
      "inputValue": {},
      "formType": {},
      "isPendingRequest": {},
      "errorMessage": {},
      "isViewTextTruncated": {}
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
      }, {
        "method": "wppConfirm",
        "name": "wppConfirm",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when user clicks \"Confirm\" button."
        },
        "complexType": {
          "original": "InlineEditConfirmDetail",
          "resolved": "{ value: string; waitUntil: (p: Promise<unknown>) => void; }",
          "references": {
            "InlineEditConfirmDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-inline-edit/types.ts::InlineEditConfirmDetail"
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
      }, {
        "propName": "value",
        "methodName": "onValueChange"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}
