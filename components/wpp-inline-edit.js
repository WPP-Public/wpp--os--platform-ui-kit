import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { s as sticky } from './menuListConfig.js';
import { d as debounce, b as isEventTargetContained, k as transformToVersionedTag, z as mergeLocales } from './utils.js';
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
  confirmButtonLabel: 'Confirm',
  cancelButtonLabel: 'Cancel',
};

const wppInlineEditCss = ":host{--inline-edit-content-height:var(--wpp-inline-edit-content-height, 22px);--inline-edit-content-padding:var(--wpp-inline-edit-content-padding, 2px 4px);--inline-edit-content-border-radius:var(--wpp-inline-edit-content-border-radius, 4px);--inline-edit-content-bg-color-hover:var(--wpp-inline-edit-content-bg-color-hover, var(--wpp-grey-color-700));--inline-edit-content-bg-opacity-hover:var(--wpp-inline-edit-content-bg-opacity-hover, 0.12);--inline-edit-content-icon-color-hover:var(--wpp-inline-edit-content-icon-color-hover, var(--wpp-grey-color-800));--inline-edit-content-bg-color-active:var(--wpp-inline-edit-content-bg-color-active, var(--wpp-grey-color-800));--inline-edit-content-bg-opacity-active:var(--wpp-inline-edit-content-bg-opacity-active, 0.18);--inline-edit-content-icon-color-active:var(--wpp-inline-edit-content-icon-color-active, var(--wpp-grey-color-900));--inline-edit-content-icon-margin:var(--wpp-inline-edit-content-icon-margin, 0 0 0 6px);--inline-edit-buttons-height:var(--wpp-inline-edit-buttons-height, 32px);--inline-edit-content-placeholder-color:var(--wpp-inline-edit-content-placeholder-color, var(--wpp-grey-color-700));--inline-edit-content-placeholder-color-hover:var(\n    --wpp-inline-edit-content-placeholder-color-hover,\n    var(--wpp-grey-color-800)\n  );--inline-edit-content-placeholder-color-active:var(\n    --wpp-inline-edit-content-placeholder-color-active,\n    var(--wpp-grey-color-900)\n  );display:block;max-width:100%}:host.input .wrapper{height:var(--inline-edit-input-wrapper-height);width:100%}:host.textarea .wrapper{height:var(--inline-edit-textarea-wrapper-height)}:host .popover{display:block;max-width:100%}:host .popover::part(anchor){display:block;max-width:100%}:host .popover.full-width,:host .popover.full-width::part(anchor),:host .popover.full-width::part(trigger-element){width:100%}:host .popover .trigger-element{display:block;max-width:100%}:host .popover .trigger-element .wpp-anchor-toolip{width:100%}:host .popover .trigger-element .wpp-anchor-toolip::part(anchor){width:100%}:host .popover .trigger-element .wpp-anchor-toolip .trigger{width:100%}:host .trigger{cursor:pointer;max-width:100%}:host .trigger:focus-visible{border-radius:var(--inline-edit-content-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host .label{margin:var(--inline-edit-label-margin)}:host .content{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;position:relative;padding:var(--inline-edit-content-padding);overflow:hidden;max-width:100%}:host .content:hover .content-bg{background-color:var(--inline-edit-content-bg-color-hover);opacity:var(--inline-edit-content-bg-opacity-hover)}:host .content:hover .wpp-icon{color:var(--inline-edit-content-icon-color-hover)}:host .content:hover .placeholder{color:var(--inline-edit-content-placeholder-color-hover)}:host .content:active .content-bg{background-color:var(--inline-edit-content-bg-color-active);opacity:var(--inline-edit-content-bg-opacity-active)}:host .content:active .wpp-icon{color:var(--inline-edit-content-icon-color-active)}:host .content:active .placeholder{color:var(--inline-edit-content-placeholder-color-active)}:host .content .content-bg{position:absolute;inset:0;border-radius:var(--inline-edit-content-border-radius);pointer-events:none}:host .content .wpp-icon{margin:var(--inline-edit-content-icon-margin);-ms-flex-negative:0;flex-shrink:0}:host .content .placeholder{color:var(--inline-edit-content-placeholder-color)}:host .content .view-text{font-weight:var(--wpp-typography-s-body-font-weight, 400);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);font-family:var(--wpp-font-family, system-ui, sans-serif);color:var(--wpp-grey-color-1000);display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:0;-ms-flex:1;flex:1}:host .view-tooltip{display:block;min-width:0;-ms-flex:1;flex:1;max-width:100%;overflow:hidden}:host .view-tooltip::part(anchor){display:block;width:100%;max-width:100%}:host .wpp-buttons-container{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;height:var(--inline-edit-buttons-height)}:host .wpp-menu-context{--mc-list-padding:0}:host(.wpp-inline-edit-error) ::slotted([slot=form-element]){--wpp-input-border-color-active:var(--wpp-danger-color-400);--wpp-text-area-border-color-active:var(--wpp-danger-color-400)}.sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;-webkit-clip-path:inset(50%) !important;clip-path:inset(50%) !important;border:0 !important;white-space:nowrap !important}";

const WppInlineEdit$1 = /*@__PURE__*/ proxyCustomElement(class WppInlineEdit extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppModeChange = createEvent(this, "wppModeChange", 1);
    this.wppConfirm = createEvent(this, "wppConfirm", 7);
    // Set when this component closes the popover itself, so `onHidden` can tell that apart from the popover
    // hiding on its own (Tab past the last button, Escape inside it), which must also leave edit mode.
    this.isClosingPopover = false;
    // Set when an edit ends from the keyboard, so focus lands back on the read-mode trigger once `mode` is read.
    this.restoreFocusOnRead = false;
    this.lastValueWithError = undefined;
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
        this.restoreFocusOnRead = true;
        this.emitModeChange('read', 'apply');
        this.isClosingPopover = true;
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
        // The user did not move focus to the field, so draw its focus ring to show where focus went.
        formEl.setFocus(true);
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
      this.isClosingPopover = true;
      this.popoverRef?.closePopover();
      if (!(event?.target).closest('[slot="form-element"]')) {
        if (reason === 'cancel')
          this.restoreFocusOnRead = true;
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
    // Ends the edit without a pointer event, for Escape, Shift+Tab and the popover hiding on its own.
    this.cancelEdit = (reason, restoreFocus) => {
      if (this.isPendingRequest)
        return;
      this.lastValueWithError = undefined;
      this.restoreFocusOnRead = restoreFocus;
      this.isClosingPopover = true;
      this.popoverRef?.closePopover();
      this.getFormElement()?.setValue(this.initialValue);
      this.emitModeChange('read', reason);
    };
    // The field's own tab stops inside its shadow root: the native control and wpp-input's clear button, which it
    // shows while the field has text and focus.
    this.getFieldTabStops = () => Array.from(this.getFormElement()?.shadowRoot?.querySelectorAll('input, textarea, [part="icon-cross"]') ?? []);
    this.onKeyDownFormEl = (event) => {
      const fieldTabStops = this.getFieldTabStops();
      const stopIndex = fieldTabStops.indexOf(event.composedPath()[0]);
      if (event.key === 'Enter') {
        // Enter on the clear button clears the field, it does not confirm it.
        if (stopIndex > 0)
          return;
        this.handleAccept();
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.cancelEdit('cancel', true);
        return;
      }
      if (event.key !== 'Tab')
        return;
      // Shift+Tab from the first stop leaves the field backwards, which is the same as moving focus outside it.
      if (event.shiftKey) {
        if (stopIndex <= 0)
          this.cancelEdit('outsideClick', false);
        return;
      }
      // Tab moves between the field's own stops as usual, so the clear button stays reachable.
      if (stopIndex !== -1 && stopIndex < fieldTabStops.length - 1)
        return;
      // The buttons render in the popover, outside the field's tab order, so Tab has to hand focus to them.
      const nextButton = this.confirmButtonRef?.disabled ? this.cancelButtonRef : this.confirmButtonRef;
      if (nextButton) {
        event.preventDefault();
        void nextButton.setFocus();
      }
    };
    // The popover sends Shift+Tab from its first button to the trigger wrapper, which cannot take focus in edit mode,
    // so focus goes back to the field's last stop instead, the reverse of Tab above. wpp-input only shows its clear
    // button while it is focused or hovered, so that is usually the input itself.
    this.onKeyDownButtons = (event) => {
      const firstButton = this.confirmButtonRef?.disabled ? this.cancelButtonRef : this.confirmButtonRef;
      const lastFieldTabStop = this.getFieldTabStops().pop();
      if (event.key !== 'Tab' || !event.shiftKey || event.target !== firstButton || !lastFieldTabStop)
        return;
      event.preventDefault();
      lastFieldTabStop.focus();
    };
    // The read-mode trigger is a role="button" div, so Enter and Space have to open the editor themselves; they
    // click the same content a pointer does, which also opens the popover.
    this.onKeyDownReadTrigger = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ')
        return;
      event.preventDefault();
      this.contentRef?.click();
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
      return shouldShowTooltip ? (h("wpp-tooltip-v4-7-0", { class: "view-tooltip", text: this.value }, this.renderViewText())) : (this.renderViewText());
    };
    // Read and edit mode render different, keyed elements: the read trigger is a button, while in edit mode the
    // field sits in a group, so a button never contains the textbox and the old button's attributes never linger.
    this.renderTriggerElement = () => this.mode === InlineEditModeEnum.EDIT ? (h("div", { key: "edit", role: "group", class: "trigger" }, h("div", { class: "wrapper", part: "wrapper" }, h("div", { class: "form-element", onKeyDown: this.onKeyDownFormEl }, h("slot", { name: "form-element" }))))) : (h("div", { key: "read", ref: el => (this.readTriggerRef = el), tabIndex: 0, role: "button", class: "trigger", "aria-label": this.value || this.placeholder, onKeyDown: this.onKeyDownReadTrigger }, h("div", { class: "content", ref: el => (this.contentRef = el), onClick: () => this.emitModeChange(InlineEditModeEnum.EDIT), part: "content" }, h("div", { class: "content-bg", part: "content-bg" }), this.renderViewContent(), h("wpp-icon-edit-v4-7-0", { "aria-hidden": "true" }))));
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
  componentWillLoad() {
    this.formType =
      this.getFormElement()?.tagName.toLowerCase() === transformToVersionedTag('wpp-textarea-input')
        ? 'textarea'
        : 'input';
  }
  // The read-mode trigger only exists once the mode change has rendered, so focus is handed back here rather than
  // from the `mode` watcher.
  componentDidRender() {
    if (this.restoreFocusOnRead && this.mode !== InlineEditModeEnum.EDIT && this.readTriggerRef) {
      this.restoreFocusOnRead = false;
      this.readTriggerRef.focus();
    }
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
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    const inlineWidth = this.mode === InlineEditModeEnum.EDIT && this.inputWidth !== 'auto' && this.inputWidth !== undefined;
    return (h(Host, { class: this.inlineEditCssClasses(), exportparts: "label, wrapper, input, textarea, buttons, view-text, content, content-bg" }, h("wpp-popover-v4-7-0", { ref: ref => (this.popoverRef = ref), externalClass: "inline-edit-popover", exportparts: "content", class: this.inlineEditPopoverCssClasses(), style: { width: inlineWidth ? this.inputWidth : '' }, config: {
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
          // Tab past the last button or Escape inside the popover hides it without going through this
          // component, which would leave it in edit mode with no buttons. Treat that like leaving the field.
          if (!this.isClosingPopover && this.mode === InlineEditModeEnum.EDIT) {
            this.cancelEdit('outsideClick', true);
          }
          this.isClosingPopover = false;
          const formEl = this.getFormElement();
          if (!formEl)
            return;
          this.setErrorState('clear', formEl);
          if (this.dropdownConfig?.onHidden) {
            this.dropdownConfig.onHidden(instance);
          }
        },
        onClickOutside: (_, e) => this.handleClose(e, 'outsideClick'),
      } }, h("div", { slot: "trigger-element", role: "group", ref: elRef => (this.triggerContainerRef = elRef), class: "trigger-element" }, this.errorMessage && this.mode === InlineEditModeEnum.EDIT ? (h("wpp-tooltip-v4-7-0", { class: 'wpp-anchor-toolip', error: true, text: this.errorMessage, config: {
        showOnCreate: true,
        onCreate: instance => {
          this.tooltipInstance = instance;
        },
        onShow: (instance) => {
          setTimeout(() => {
            instance.popperInstance?.update();
          }, 20);
        },
      } }, this.renderTriggerElement())) : (this.renderTriggerElement())), h("div", { class: "wpp-buttons-container", part: "buttons", onKeyDown: this.onKeyDownButtons }, h("wpp-action-button-v4-7-0", { ref: el => (this.confirmButtonRef = el), disabled: this.isPendingRequest || this.value === this.lastValueWithError, variant: "inverted", ariaProps: { label: this._locales.confirmButtonLabel }, onClick: this.handleAccept }, h("wpp-icon-done-v4-7-0", { slot: "icon-start" })), h("wpp-action-button-v4-7-0", { ref: el => (this.cancelButtonRef = el), disabled: this.isPendingRequest, variant: "inverted", ariaProps: { label: this._locales.cancelButtonLabel }, onClick: e => this.handleClose(e, 'cancel') }, h("wpp-icon-cross-v4-7-0", { slot: "icon-start" })))), h("span", { class: "sr-only", "aria-live": "polite" }, this.mode === InlineEditModeEnum.EDIT ? this.errorMessage : '')));
  }
  static get registryIs() { return "wpp-inline-edit-v4-7-0"; }
  get host() { return this; }
  static get watchers() { return {
    "mode": ["editModeChangeHandler"],
    "value": ["onValueChange"]
  }; }
  static get style() { return wppInlineEditCss; }
}, [1, "wpp-inline-edit", "wpp-inline-edit-v4-7-0", {
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
    "isViewTextTruncated": [32],
    "closePopover": [64],
    "setFocus": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-inline-edit-v4-7-0", "wpp-action-button-v4-7-0", "wpp-icon-cross-v4-7-0", "wpp-icon-done-v4-7-0", "wpp-icon-edit-v4-7-0", "wpp-icon-error-v4-7-0", "wpp-icon-info-message-v4-7-0", "wpp-icon-search-v4-7-0", "wpp-icon-success-v4-7-0", "wpp-icon-warning-v4-7-0", "wpp-inline-message-v4-7-0", "wpp-input-v4-7-0", "wpp-internal-label-v4-7-0", "wpp-internal-tooltip-v4-7-0", "wpp-label-v4-7-0", "wpp-popover-v4-7-0", "wpp-spinner-v4-7-0", "wpp-tooltip-v4-7-0", "wpp-typography-v4-7-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-inline-edit-v4-7-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppInlineEdit$1);
      }
      break;
    case "wpp-action-button-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-cross-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-done-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-edit-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-error-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-info-message-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-search-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-success-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-warning-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-inline-message-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-input-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-internal-label-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-tooltip-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-label-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-popover-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppInlineEdit = WppInlineEdit$1;
const defineCustomElement = defineCustomElement$1;

export { InlineEditModeEnum as I, WppInlineEdit, defineCustomElement };
