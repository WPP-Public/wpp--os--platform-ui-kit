import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';

const wppInlineEditCss = ":host{--inline-edit-content-height:var(--wpp-inline-edit-content-height, 22px);--inline-edit-content-padding:var(--wpp-inline-edit-content-padding, 2px 4px);--inline-edit-content-border-radius:var(--wpp-inline-edit-content-border-radius, 4px);--inline-edit-content-bg-color-hover:var(--wpp-inline-edit-content-bg-color-hover, var(--wpp-grey-color-700));--inline-edit-content-bg-opacity-hover:var(--wpp-inline-edit-content-bg-opacity-hover, 0.12);--inline-edit-content-icon-color-hover:var(--wpp-inline-edit-content-icon-color-hover, var(--wpp-grey-color-800));--inline-edit-content-bg-color-active:var(--wpp-inline-edit-content-bg-color-active, var(--wpp-grey-color-800));--inline-edit-content-bg-opacity-active:var(--wpp-inline-edit-content-bg-opacity-active, 0.18);--inline-edit-content-icon-color-active:var(--wpp-inline-edit-content-icon-color-active, var(--wpp-grey-color-900));--inline-edit-content-icon-margin:var(--wpp-inline-edit-content-icon-margin, 0 0 0 6px);--inline-edit-buttons-height:var(--wpp-inline-edit-buttons-height, 32px);--inline-edit-content-placeholder-color:var(--wpp-inline-edit-content-placeholder-color, var(--wpp-grey-color-700));--inline-edit-content-placeholder-color-hover:var(\n    --wpp-inline-edit-content-placeholder-color-hover,\n    var(--wpp-grey-color-800)\n  );--inline-edit-content-placeholder-color-active:var(\n    --wpp-inline-edit-content-placeholder-color-active,\n    var(--wpp-grey-color-900)\n  )}:host.input .wrapper{height:var(--inline-edit-input-wrapper-height);width:100%}:host.textarea .wrapper{height:var(--inline-edit-textarea-wrapper-height)}:host .popover.full-width,:host .popover.full-width::part(anchor),:host .popover.full-width::part(trigger-element){width:100%}:host .trigger{cursor:pointer}:host .label{margin:var(--inline-edit-label-margin)}:host .content{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative;padding:var(--inline-edit-content-padding);overflow:hidden}:host .content:hover .content-bg{background-color:var(--inline-edit-content-bg-color-hover);opacity:var(--inline-edit-content-bg-opacity-hover)}:host .content:hover .wpp-icon{color:var(--inline-edit-content-icon-color-hover)}:host .content:hover .placeholder{color:var(--inline-edit-content-placeholder-color-hover)}:host .content:active .content-bg{background-color:var(--inline-edit-content-bg-color-active);opacity:var(--inline-edit-content-bg-opacity-active)}:host .content:active .wpp-icon{color:var(--inline-edit-content-icon-color-active)}:host .content:active .placeholder{color:var(--inline-edit-content-placeholder-color-active)}:host .content .content-bg{position:absolute;right:0;left:0;bottom:0;top:0;border-radius:var(--inline-edit-content-border-radius)}:host .content .wpp-icon{margin:var(--inline-edit-content-icon-margin)}:host .content .placeholder{color:var(--inline-edit-content-placeholder-color)}:host .buttons{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;height:var(--inline-edit-buttons-height)}:host .wpp-menu-context{--mc-list-padding:0}";

const WppInlineEdit = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppModeChange = createEvent(this, "wppModeChange", 1);
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
  static get registryIs() { return "wpp-inline-edit-v2-22-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "mode": ["editModeChangeHandler"]
  }; }
};
WppInlineEdit.style = wppInlineEditCss;

export { WppInlineEdit as wpp_inline_edit };
