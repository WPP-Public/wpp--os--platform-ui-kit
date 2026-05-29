'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const types = require('./types-7010056a.js');
const tippy_esm = require('./tippy.esm-9d703cd4.js');
const utils = require('./utils-2231f97a.js');
require('./consts-d8f5ef98.js');

const LOCALES_DEFAULTS = {
  defaultErrorMessage: 'An unexpected error occurred. Please try again.',
};

const wppInlineEditCss = ":host{--inline-edit-content-height:var(--wpp-inline-edit-content-height, 22px);--inline-edit-content-padding:var(--wpp-inline-edit-content-padding, 2px 4px);--inline-edit-content-border-radius:var(--wpp-inline-edit-content-border-radius, 4px);--inline-edit-content-bg-color-hover:var(--wpp-inline-edit-content-bg-color-hover, var(--wpp-grey-color-700));--inline-edit-content-bg-opacity-hover:var(--wpp-inline-edit-content-bg-opacity-hover, 0.12);--inline-edit-content-icon-color-hover:var(--wpp-inline-edit-content-icon-color-hover, var(--wpp-grey-color-800));--inline-edit-content-bg-color-active:var(--wpp-inline-edit-content-bg-color-active, var(--wpp-grey-color-800));--inline-edit-content-bg-opacity-active:var(--wpp-inline-edit-content-bg-opacity-active, 0.18);--inline-edit-content-icon-color-active:var(--wpp-inline-edit-content-icon-color-active, var(--wpp-grey-color-900));--inline-edit-content-icon-margin:var(--wpp-inline-edit-content-icon-margin, 0 0 0 6px);--inline-edit-buttons-height:var(--wpp-inline-edit-buttons-height, 32px);--inline-edit-content-placeholder-color:var(--wpp-inline-edit-content-placeholder-color, var(--wpp-grey-color-700));--inline-edit-content-placeholder-color-hover:var(\n    --wpp-inline-edit-content-placeholder-color-hover,\n    var(--wpp-grey-color-800)\n  );--inline-edit-content-placeholder-color-active:var(\n    --wpp-inline-edit-content-placeholder-color-active,\n    var(--wpp-grey-color-900)\n  );display:block;max-width:100%}:host.input .wrapper{height:var(--inline-edit-input-wrapper-height);width:100%}:host.textarea .wrapper{height:var(--inline-edit-textarea-wrapper-height)}:host .popover{display:block;max-width:100%}:host .popover::part(anchor){display:block;max-width:100%}:host .popover.full-width,:host .popover.full-width::part(anchor),:host .popover.full-width::part(trigger-element){width:100%}:host .popover .trigger-element{display:block;max-width:100%}:host .popover .trigger-element .wpp-anchor-toolip{width:100%}:host .popover .trigger-element .wpp-anchor-toolip::part(anchor){width:100%}:host .popover .trigger-element .wpp-anchor-toolip .trigger{width:100%}:host .trigger{cursor:pointer;max-width:100%}:host .label{margin:var(--inline-edit-label-margin)}:host .content{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;position:relative;padding:var(--inline-edit-content-padding);overflow:hidden;max-width:100%}:host .content:hover .content-bg{background-color:var(--inline-edit-content-bg-color-hover);opacity:var(--inline-edit-content-bg-opacity-hover)}:host .content:hover .wpp-icon{color:var(--inline-edit-content-icon-color-hover)}:host .content:hover .placeholder{color:var(--inline-edit-content-placeholder-color-hover)}:host .content:active .content-bg{background-color:var(--inline-edit-content-bg-color-active);opacity:var(--inline-edit-content-bg-opacity-active)}:host .content:active .wpp-icon{color:var(--inline-edit-content-icon-color-active)}:host .content:active .placeholder{color:var(--inline-edit-content-placeholder-color-active)}:host .content .content-bg{position:absolute;right:0;left:0;bottom:0;top:0;border-radius:var(--inline-edit-content-border-radius);pointer-events:none}:host .content .wpp-icon{margin:var(--inline-edit-content-icon-margin);-ms-flex-negative:0;flex-shrink:0}:host .content .placeholder{color:var(--inline-edit-content-placeholder-color)}:host .content .view-text{font-weight:var(--wpp-typography-s-body-font-weight, 400);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);font-family:var(--wpp-font-family, inherit);color:var(--wpp-grey-color-1000);display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:0;-ms-flex:1;flex:1}:host .view-tooltip{display:block;min-width:0;-ms-flex:1;flex:1;max-width:100%;overflow:hidden}:host .view-tooltip::part(anchor){display:block;width:100%;max-width:100%}:host .wpp-buttons-container{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;height:var(--inline-edit-buttons-height)}:host .wpp-menu-context{--mc-list-padding:0}:host(.wpp-inline-edit-error) ::slotted([slot=form-element]){--wpp-input-border-color-active:var(--wpp-danger-color-400);--wpp-text-area-border-color-active:var(--wpp-danger-color-400)}";

const WppInlineEdit = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppModeChange = index.createEvent(this, "wppModeChange", 1);
    this.wppConfirm = index.createEvent(this, "wppConfirm", 7);
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
      this.viewResizeObserverCallback = utils.debounce(() => this.checkViewTextOverflow(), 50);
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
      if (this.isPendingRequest || utils.isEventTargetContained(this.host, event))
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
      'wpp-inline-edit-error': !!this.errorMessage && this.mode === types.InlineEditModeEnum.EDIT,
    });
    this.inlineEditPopoverCssClasses = () => ({
      popover: true,
      'full-width': this.mode === types.InlineEditModeEnum.EDIT && this.inputWidth !== 'auto' && this.inputWidth !== undefined,
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
      return (index.h("span", { class: this.viewTextCssClasses(), part: "view-text", ref: this.setViewTextRef }, displayText));
    };
    this.renderViewContent = () => {
      const shouldShowTooltip = this.isViewTextTruncated && this.value;
      return shouldShowTooltip ? (index.h("wpp-tooltip-v4-1-0", { class: "view-tooltip", text: this.value }, this.renderViewText())) : (this.renderViewText());
    };
    this.renderTriggerElement = () => (index.h("div", { tabIndex: 0, role: "button", class: "trigger", "aria-label": this.value || this.placeholder }, this.mode === types.InlineEditModeEnum.EDIT ? (index.h("div", { class: "wrapper", part: "wrapper" }, index.h("div", { class: "form-element", onKeyDown: this.onKeyDownFormEl }, index.h("slot", { name: "form-element" })))) : (index.h("div", { class: "content", onClick: () => this.emitModeChange(types.InlineEditModeEnum.EDIT), part: "content" }, index.h("div", { class: "content-bg", part: "content-bg" }), this.renderViewContent(), index.h("wpp-icon-edit-v4-1-0", { "aria-hidden": "true" })))));
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
      if (this.mode === types.InlineEditModeEnum.EDIT) {
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
      this.getFormElement()?.tagName.toLowerCase() === utils.transformToVersionedTag('wpp-textarea-input')
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
    const inlineWidth = this.mode === types.InlineEditModeEnum.EDIT && this.inputWidth !== 'auto' && this.inputWidth !== undefined;
    return (index.h(index.Host, { class: this.inlineEditCssClasses(), exportparts: "label, wrapper, input, textarea, buttons, view-text, content, content-bg" }, index.h("wpp-popover-v4-1-0", { ref: ref => (this.popoverRef = ref), externalClass: "inline-edit-popover", exportparts: "content", class: this.inlineEditPopoverCssClasses(), style: { width: inlineWidth ? this.inputWidth : '' }, config: {
        placement: this.formType === 'input' ? 'right-start' : 'bottom-start',
        offset: [0, 4],
        hideOnClick: false,
        animation: false,
        ...this.dropdownConfig,
        plugins: [tippy_esm.sticky],
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
      } }, index.h("div", { slot: "trigger-element", ref: elRef => (this.triggerContainerRef = elRef), class: "trigger-element" }, this.errorMessage && this.mode === types.InlineEditModeEnum.EDIT ? (index.h("wpp-tooltip-v4-1-0", { class: 'wpp-anchor-toolip', error: true, text: this.errorMessage, config: {
        showOnCreate: true,
        onCreate: instance => {
          this.tooltipInstance = instance;
        },
        onShow: (instance) => {
          setTimeout(() => {
            instance.popperInstance?.update();
          }, 20);
        },
      } }, this.renderTriggerElement())) : (this.renderTriggerElement())), index.h("div", { class: "wpp-buttons-container", part: "buttons" }, index.h("wpp-action-button-v4-1-0", { disabled: this.isPendingRequest || this.value === this.lastValueWithError, variant: "inverted", onClick: this.handleAccept }, index.h("wpp-icon-done-v4-1-0", { slot: "icon-start" })), index.h("wpp-action-button-v4-1-0", { disabled: this.isPendingRequest, variant: "inverted", onClick: e => this.handleClose(e, 'cancel') }, index.h("wpp-icon-cross-v4-1-0", { slot: "icon-start" }))))));
  }
  static get registryIs() { return "wpp-inline-edit-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "mode": ["editModeChangeHandler"],
    "value": ["onValueChange"],
    "locales": ["onUpdateLocales"]
  }; }
};
WppInlineEdit.style = wppInlineEditCss;

exports.wpp_inline_edit = WppInlineEdit;
