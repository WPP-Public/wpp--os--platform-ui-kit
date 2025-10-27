import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { I as InlineEditModeEnum } from './types-55e66228.js';
import { b as isEventTargetContained, k as transformToVersionedTag } from './utils-90721dcb.js';
import './consts-5bf9c29f.js';

const LOCALES_DEFAULTS = {
  defaultErrorMessage: 'An unexpected error occurred. Please try again.',
};

const wppInlineEditCss = ":host{--inline-edit-content-height:var(--wpp-inline-edit-content-height, 22px);--inline-edit-content-padding:var(--wpp-inline-edit-content-padding, 2px 4px);--inline-edit-content-border-radius:var(--wpp-inline-edit-content-border-radius, 4px);--inline-edit-content-bg-color-hover:var(--wpp-inline-edit-content-bg-color-hover, var(--wpp-grey-color-700));--inline-edit-content-bg-opacity-hover:var(--wpp-inline-edit-content-bg-opacity-hover, 0.12);--inline-edit-content-icon-color-hover:var(--wpp-inline-edit-content-icon-color-hover, var(--wpp-grey-color-800));--inline-edit-content-bg-color-active:var(--wpp-inline-edit-content-bg-color-active, var(--wpp-grey-color-800));--inline-edit-content-bg-opacity-active:var(--wpp-inline-edit-content-bg-opacity-active, 0.18);--inline-edit-content-icon-color-active:var(--wpp-inline-edit-content-icon-color-active, var(--wpp-grey-color-900));--inline-edit-content-icon-margin:var(--wpp-inline-edit-content-icon-margin, 0 0 0 6px);--inline-edit-buttons-height:var(--wpp-inline-edit-buttons-height, 32px);--inline-edit-content-placeholder-color:var(--wpp-inline-edit-content-placeholder-color, var(--wpp-grey-color-700));--inline-edit-content-placeholder-color-hover:var(\n    --wpp-inline-edit-content-placeholder-color-hover,\n    var(--wpp-grey-color-800)\n  );--inline-edit-content-placeholder-color-active:var(\n    --wpp-inline-edit-content-placeholder-color-active,\n    var(--wpp-grey-color-900)\n  )}:host.input .wrapper{height:var(--inline-edit-input-wrapper-height);width:100%}:host.textarea .wrapper{height:var(--inline-edit-textarea-wrapper-height)}:host .popover.full-width,:host .popover.full-width::part(anchor),:host .popover.full-width::part(trigger-element){width:100%}:host .popover .trigger-element .wpp-anchor-toolip{width:100%}:host .popover .trigger-element .wpp-anchor-toolip::part(anchor){width:100%}:host .popover .trigger-element .wpp-anchor-toolip .trigger{width:100%}:host .trigger{cursor:pointer}:host .label{margin:var(--inline-edit-label-margin)}:host .content{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative;padding:var(--inline-edit-content-padding);overflow:hidden}:host .content:hover .content-bg{background-color:var(--inline-edit-content-bg-color-hover);opacity:var(--inline-edit-content-bg-opacity-hover)}:host .content:hover .wpp-icon{color:var(--inline-edit-content-icon-color-hover)}:host .content:hover .placeholder{color:var(--inline-edit-content-placeholder-color-hover)}:host .content:active .content-bg{background-color:var(--inline-edit-content-bg-color-active);opacity:var(--inline-edit-content-bg-opacity-active)}:host .content:active .wpp-icon{color:var(--inline-edit-content-icon-color-active)}:host .content:active .placeholder{color:var(--inline-edit-content-placeholder-color-active)}:host .content .content-bg{position:absolute;right:0;left:0;bottom:0;top:0;border-radius:var(--inline-edit-content-border-radius)}:host .content .wpp-icon{margin:var(--inline-edit-content-icon-margin)}:host .content .placeholder{color:var(--inline-edit-content-placeholder-color)}:host .buttons{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;height:var(--inline-edit-buttons-height)}:host .wpp-menu-context{--mc-list-padding:0}:host(.wpp-inline-edit-error) ::slotted([slot=form-element]){--wpp-input-border-color-active:var(--wpp-danger-color-400);--wpp-text-area-border-color-active:var(--wpp-danger-color-400)}";

const WppInlineEdit = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppModeChange = createEvent(this, "wppModeChange", 1);
    this.wppConfirm = createEvent(this, "wppConfirm", 7);
    this.lastValueWithError = undefined;
    this._locales = LOCALES_DEFAULTS;
    this.getFormElement = () => this.host?.querySelector('[slot="form-element"]');
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
    this.renderTriggerElement = () => (h("div", { tabIndex: 0, role: "button", class: "trigger" }, this.mode === InlineEditModeEnum.EDIT ? (h("div", { class: "wrapper", part: "wrapper" }, h("div", { class: "form-element", onKeyDown: this.onKeyDownFormEl }, h("slot", { name: "form-element" })))) : (h("div", { class: "content", onClick: () => this.emitModeChange(InlineEditModeEnum.EDIT), part: "content" }, h("div", { class: "content-bg", part: "content-bg" }), h("wpp-typography-v3-3-0", { class: this.placeholderCssClasses(), type: "s-body", part: "inline-edit-typography" }, this.value || this.placeholder), h("wpp-icon-edit-v3-3-0", null)))));
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
  render() {
    const inlineWidth = this.mode === InlineEditModeEnum.EDIT && this.inputWidth !== 'auto' && this.inputWidth !== undefined;
    return (h(Host, { class: this.inlineEditCssClasses(), exportparts: "label, wrapper, input, textarea, buttons, inline-edit-typography, content, content-bg" }, h("wpp-popover-v3-3-0", { ref: ref => (this.popoverRef = ref), externalClass: "inline-edit-popover", exportparts: "content", class: this.inlineEditPopoverCssClasses(), style: { width: inlineWidth ? this.inputWidth : '' }, config: {
        placement: this.formType === 'input' ? 'right-start' : 'bottom-start',
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
        onHidden: () => {
          const formEl = this.getFormElement();
          if (!formEl)
            return;
          this.setErrorState('clear', formEl);
        },
        onClickOutside: (_, e) => this.handleClose(e, 'outsideClick'),
      } }, h("div", { slot: "trigger-element", class: "trigger-element" }, this.errorMessage && this.mode === InlineEditModeEnum.EDIT ? (h("wpp-tooltip-v3-3-0", { class: 'wpp-anchor-toolip', error: true, text: this.errorMessage, config: {
        showOnCreate: true,
        onCreate: instance => {
          this.tooltipInstance = instance;
        },
        onShow: (instance) => {
          setTimeout(() => {
            instance.popperInstance?.update();
          }, 20);
        },
      } }, this.renderTriggerElement())) : (this.renderTriggerElement())), h("div", { class: "buttons", part: "buttons" }, h("wpp-action-button-v3-3-0", { disabled: this.isPendingRequest || this.value === this.lastValueWithError, variant: "inverted", onClick: this.handleAccept }, h("wpp-icon-done-v3-3-0", { slot: "icon-start" })), h("wpp-action-button-v3-3-0", { disabled: this.isPendingRequest, variant: "inverted", onClick: e => this.handleClose(e, 'cancel') }, h("wpp-icon-cross-v3-3-0", { slot: "icon-start" }))))));
  }
  static get registryIs() { return "wpp-inline-edit-v3-3-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "mode": ["editModeChangeHandler"],
    "locales": ["onUpdateLocales"]
  }; }
};
WppInlineEdit.style = wppInlineEditCss;

export { WppInlineEdit as wpp_inline_edit };
