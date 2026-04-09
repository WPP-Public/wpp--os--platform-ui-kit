import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { s as sticky } from './menuListConfig.js';
import { b as isEventTargetContained, k as transformToVersionedTag } from './utils.js';
import { d as defineCustomElement$j } from './wpp-action-button2.js';
import { d as defineCustomElement$i } from './wpp-icon-cross2.js';
import { d as defineCustomElement$h } from './wpp-icon-done2.js';
import { d as defineCustomElement$g } from './wpp-icon-edit2.js';
import { d as defineCustomElement$f } from './wpp-icon-error2.js';
import { d as defineCustomElement$e } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$d } from './wpp-icon-search2.js';
import { d as defineCustomElement$c } from './wpp-icon-success2.js';
import { d as defineCustomElement$b } from './wpp-icon-warning2.js';
import { d as defineCustomElement$a } from './wpp-inline-message2.js';
import { d as defineCustomElement$9 } from './wpp-input2.js';
import { d as defineCustomElement$8 } from './wpp-internal-label2.js';
import { d as defineCustomElement$7 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$6 } from './wpp-label2.js';
import { d as defineCustomElement$5 } from './wpp-popover2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

var InlineEditModeEnum;
(function (InlineEditModeEnum) {
  InlineEditModeEnum["READ"] = "read";
  InlineEditModeEnum["EDIT"] = "edit";
})(InlineEditModeEnum || (InlineEditModeEnum = {}));

const LOCALES_DEFAULTS = {
  defaultErrorMessage: 'An unexpected error occurred. Please try again.',
};

const wppInlineEditCss = ":host{--inline-edit-content-height:var(--wpp-inline-edit-content-height, 22px);--inline-edit-content-padding:var(--wpp-inline-edit-content-padding, 2px 4px);--inline-edit-content-border-radius:var(--wpp-inline-edit-content-border-radius, 4px);--inline-edit-content-bg-color-hover:var(--wpp-inline-edit-content-bg-color-hover, var(--wpp-grey-color-700));--inline-edit-content-bg-opacity-hover:var(--wpp-inline-edit-content-bg-opacity-hover, 0.12);--inline-edit-content-icon-color-hover:var(--wpp-inline-edit-content-icon-color-hover, var(--wpp-grey-color-800));--inline-edit-content-bg-color-active:var(--wpp-inline-edit-content-bg-color-active, var(--wpp-grey-color-800));--inline-edit-content-bg-opacity-active:var(--wpp-inline-edit-content-bg-opacity-active, 0.18);--inline-edit-content-icon-color-active:var(--wpp-inline-edit-content-icon-color-active, var(--wpp-grey-color-900));--inline-edit-content-icon-margin:var(--wpp-inline-edit-content-icon-margin, 0 0 0 6px);--inline-edit-buttons-height:var(--wpp-inline-edit-buttons-height, 32px);--inline-edit-content-placeholder-color:var(--wpp-inline-edit-content-placeholder-color, var(--wpp-grey-color-700));--inline-edit-content-placeholder-color-hover:var(\n    --wpp-inline-edit-content-placeholder-color-hover,\n    var(--wpp-grey-color-800)\n  );--inline-edit-content-placeholder-color-active:var(\n    --wpp-inline-edit-content-placeholder-color-active,\n    var(--wpp-grey-color-900)\n  )}:host.input .wrapper{height:var(--inline-edit-input-wrapper-height);width:100%}:host.textarea .wrapper{height:var(--inline-edit-textarea-wrapper-height)}:host .popover.full-width,:host .popover.full-width::part(anchor),:host .popover.full-width::part(trigger-element){width:100%}:host .popover .trigger-element .wpp-anchor-toolip{width:100%}:host .popover .trigger-element .wpp-anchor-toolip::part(anchor){width:100%}:host .popover .trigger-element .wpp-anchor-toolip .trigger{width:100%}:host .trigger{cursor:pointer}:host .label{margin:var(--inline-edit-label-margin)}:host .content{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative;padding:var(--inline-edit-content-padding);overflow:hidden}:host .content:hover .content-bg{background-color:var(--inline-edit-content-bg-color-hover);opacity:var(--inline-edit-content-bg-opacity-hover)}:host .content:hover .wpp-icon{color:var(--inline-edit-content-icon-color-hover)}:host .content:hover .placeholder{color:var(--inline-edit-content-placeholder-color-hover)}:host .content:active .content-bg{background-color:var(--inline-edit-content-bg-color-active);opacity:var(--inline-edit-content-bg-opacity-active)}:host .content:active .wpp-icon{color:var(--inline-edit-content-icon-color-active)}:host .content:active .placeholder{color:var(--inline-edit-content-placeholder-color-active)}:host .content .content-bg{position:absolute;right:0;left:0;bottom:0;top:0;border-radius:var(--inline-edit-content-border-radius)}:host .content .wpp-icon{margin:var(--inline-edit-content-icon-margin)}:host .content .placeholder{color:var(--inline-edit-content-placeholder-color)}:host .buttons{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;height:var(--inline-edit-buttons-height)}:host .wpp-menu-context{--mc-list-padding:0}:host(.wpp-inline-edit-error) ::slotted([slot=form-element]){--wpp-input-border-color-active:var(--wpp-danger-color-400);--wpp-text-area-border-color-active:var(--wpp-danger-color-400)}";

const WppInlineEdit$1 = /*@__PURE__*/ proxyCustomElement(class WppInlineEdit extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppModeChange = createEvent(this, "wppModeChange", 1);
    this.wppConfirm = createEvent(this, "wppConfirm", 7);
    this.lastValueWithError = undefined;
    this._locales = LOCALES_DEFAULTS;
    this.handleAnchorResize = (entries) => {
      for (const entry of entries) {
        if (entry.target === this.triggerContainerRef) {
          this.popoverInstance?.popperInstance?.update();
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
    this.placeholderCssClasses = () => ({ placeholder: !this.value });
    this.renderTriggerElement = () => (h("div", { tabIndex: 0, role: "button", class: "trigger" }, this.mode === InlineEditModeEnum.EDIT ? (h("div", { class: "wrapper", part: "wrapper" }, h("div", { class: "form-element", onKeyDown: this.onKeyDownFormEl }, h("slot", { name: "form-element" })))) : (h("div", { class: "content", onClick: () => this.emitModeChange(InlineEditModeEnum.EDIT), part: "content" }, h("div", { class: "content-bg", part: "content-bg" }), h("wpp-typography-v3-6-0", { class: this.placeholderCssClasses(), type: "s-body", part: "inline-edit-typography" }, this.value || this.placeholder), h("wpp-icon-edit-v3-6-0", null)))));
    this.initialValue = undefined;
    this.inputValue = undefined;
    this.formType = 'input';
    this.isPendingRequest = false;
    this.errorMessage = undefined;
    this.mode = 'read';
    this.value = undefined;
    this.placeholder = 'placeholder';
    this.dropdownConfig = {};
    this.inputWidth = 'auto';
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
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    const inlineWidth = this.mode === InlineEditModeEnum.EDIT && this.inputWidth !== 'auto' && this.inputWidth !== undefined;
    return (h(Host, { class: this.inlineEditCssClasses(), exportparts: "label, wrapper, input, textarea, buttons, inline-edit-typography, content, content-bg" }, h("wpp-popover-v3-6-0", { ref: ref => (this.popoverRef = ref), externalClass: "inline-edit-popover", exportparts: "content", class: this.inlineEditPopoverCssClasses(), style: { width: inlineWidth ? this.inputWidth : '' }, config: {
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
      } }, h("div", { slot: "trigger-element", ref: elRef => (this.triggerContainerRef = elRef), class: "trigger-element" }, this.errorMessage && this.mode === InlineEditModeEnum.EDIT ? (h("wpp-tooltip-v3-6-0", { class: 'wpp-anchor-toolip', error: true, text: this.errorMessage, config: {
        showOnCreate: true,
        onCreate: instance => {
          this.tooltipInstance = instance;
        },
        onShow: (instance) => {
          setTimeout(() => {
            instance.popperInstance?.update();
          }, 20);
        },
      } }, this.renderTriggerElement())) : (this.renderTriggerElement())), h("div", { class: "buttons", part: "buttons" }, h("wpp-action-button-v3-6-0", { disabled: this.isPendingRequest || this.value === this.lastValueWithError, variant: "inverted", onClick: this.handleAccept }, h("wpp-icon-done-v3-6-0", { slot: "icon-start" })), h("wpp-action-button-v3-6-0", { disabled: this.isPendingRequest, variant: "inverted", onClick: e => this.handleClose(e, 'cancel') }, h("wpp-icon-cross-v3-6-0", { slot: "icon-start" }))))));
  }
  static get registryIs() { return "wpp-inline-edit-v3-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "mode": ["editModeChangeHandler"],
    "locales": ["onUpdateLocales"]
  }; }
  static get style() { return wppInlineEditCss; }
}, [1, "wpp-inline-edit", "wpp-inline-edit-v3-6-0", {
    "mode": [1],
    "value": [1],
    "placeholder": [1],
    "dropdownConfig": [16],
    "inputWidth": [513, "input-width"],
    "locales": [16],
    "initialValue": [32],
    "inputValue": [32],
    "formType": [32],
    "isPendingRequest": [32],
    "errorMessage": [32],
    "closePopover": [64],
    "setFocus": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-inline-edit-v3-6-0", "wpp-action-button-v3-6-0", "wpp-icon-cross-v3-6-0", "wpp-icon-done-v3-6-0", "wpp-icon-edit-v3-6-0", "wpp-icon-error-v3-6-0", "wpp-icon-info-message-v3-6-0", "wpp-icon-search-v3-6-0", "wpp-icon-success-v3-6-0", "wpp-icon-warning-v3-6-0", "wpp-inline-message-v3-6-0", "wpp-input-v3-6-0", "wpp-internal-label-v3-6-0", "wpp-internal-tooltip-v3-6-0", "wpp-label-v3-6-0", "wpp-popover-v3-6-0", "wpp-spinner-v3-6-0", "wpp-tooltip-v3-6-0", "wpp-typography-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-inline-edit-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppInlineEdit$1);
      }
      break;
    case "wpp-action-button-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-cross-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-done-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-edit-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-error-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-info-message-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-search-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-success-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-warning-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-inline-message-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-input-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-internal-label-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-label-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-popover-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppInlineEdit = WppInlineEdit$1;
const defineCustomElement = defineCustomElement$1;

export { InlineEditModeEnum as I, WppInlineEdit, defineCustomElement };
