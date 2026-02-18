import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { A as ANIMATION_PROPERTY_NAME, Z as Z_INDEX } from './consts-9fc0a13a.js';
import { g as getSlotEmptyStates, m as applyBodyStylesIfNeeded } from './utils-cc81a41b.js';
import { W as WrappedSlot } from './WrappedSlot-629d3e4f.js';
import { F as FullScreenModalCloseReason } from './types-b5cf2c7a.js';

const wppFullScreenModalCss = ":host{--full-screen-modal-width:var(--wpp-full-screen-modal-width, 95%);--full-screen-modal-height:var(--wpp-full-screen-modal-height, 90%);--full-screen-modal-box-shadow:var(--wpp-full-screen-modal-box-shadow, var(--wpp-box-shadow-l));--full-screen-modal-body-paddings:var(--wpp-full-screen-modal-body-paddings, 0 32px);--full-screen-modal-actions-paddings:var(--wpp-full-screen-modal-actions-paddings, 32px);--full-screen-modal-header-padding:var(--wpp-full-screen-modal-header-padding, 24px 24px 20px 32px);--full-screen-modal-transition:visibility 0.15s linear 0.2s, opacity 0.2s 0.2s;--full-screen-modal-bg-color:var(--wpp-full-screen-modal-bg-color, var(--wpp-grey-color-000));--full-screen-modal-close-button-margin-left:var(--wpp-full-screen-modal-close-button-margin-left, auto)}:host(.wpp-full-screen-modal-wrapper){position:fixed;top:0;right:0;bottom:0;left:0;display:block;font-family:var(--wpp-font-family);visibility:hidden;opacity:0}:host(.component-ready){-webkit-transition:var(--full-screen-modal-transition);transition:var(--full-screen-modal-transition)}:host(.wpp-visible.component-ready){display:block;visibility:visible;opacity:1}:host(.wpp-hide){visibility:hidden !important;opacity:0}:host(.wpp-visible:target){opacity:1}.header-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--full-screen-modal-header-padding)}.header-container .close-button{margin-left:var(--full-screen-modal-close-button-margin-left)}.header-container .header{width:100%}.header.slot-hidden,.body.slot-hidden,.actions.slot-hidden{display:none}.header{font-size:var(--wpp-typography-2xl-heading-font-size, 24px);line-height:var(--wpp-typography-2xl-heading-line-height, 32px);font-weight:var(--wpp-typography-2xl-heading-font-weight, 400);color:var(--wpp-typography-2xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xl-heading-letter-spacing, 0)}.body{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);height:100%;padding:var(--full-screen-modal-body-paddings);overflow-y:auto}.body::-webkit-scrollbar{width:4px;height:4px}.body::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.actions{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);padding:var(--full-screen-modal-actions-paddings)}.full-screen-modal-overlay{position:absolute;width:100%;height:100%}.full-screen-modal{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:absolute;top:50%;left:50%;background-color:var(--full-screen-modal-bg-color);border-radius:var(--wpp-border-radius-l);-webkit-box-shadow:var(--full-screen-modal-box-shadow);box-shadow:var(--full-screen-modal-box-shadow);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);width:var(--full-screen-modal-width);height:var(--full-screen-modal-height)}.full-screen-modal.visible{-webkit-animation:fullScreenModalAppearAboveCenterAnimations 0.2s linear;animation:fullScreenModalAppearAboveCenterAnimations 0.2s linear;-webkit-animation-delay:0.15s;animation-delay:0.15s}.focus-sentinel{position:fixed;opacity:0;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media (max-height: 800px){.full-screen-modal{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.full-screen-modal.visible{-webkit-animation:fullScreenModalAppearInCenterAnimations 0.2s linear forwards;animation:fullScreenModalAppearInCenterAnimations 0.2s linear forwards;-webkit-animation-delay:0.15s;animation-delay:0.15s}}@-webkit-keyframes fullScreenModalAppearInCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@keyframes fullScreenModalAppearInCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@-webkit-keyframes fullScreenModalAppearAboveCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@keyframes fullScreenModalAppearAboveCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}";

const WppFullScreenModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppFullScreenModalClose = createEvent(this, "wppFullScreenModalClose", 1);
    this.wppFullScreenModalOpenStart = createEvent(this, "wppFullScreenModalOpenStart", 7);
    this.wppFullScreenModalOpenComplete = createEvent(this, "wppFullScreenModalOpenComplete", 7);
    this.wppFullScreenModalCloseStart = createEvent(this, "wppFullScreenModalCloseStart", 7);
    this.wppFullScreenModalCloseComplete = createEvent(this, "wppFullScreenModalCloseComplete", 7);
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, full-screen-modal, header, body, actions, header-wrapper, body-wrapper, actions-wrapper", onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd, style: { zIndex: this.zIndex.toString() }, role: this.ariaProps.role, "aria-labelledby": this.ariaProps.labelledby, "aria-modal": "true" }, h("div", { class: "full-screen-modal-overlay", part: "wrapper" }, h("wpp-overlay-v4-0-0", { ...(this.withTransparentOverlay ? { style: { opacity: '0' } } : {}), isVisible: this.open, onWppClick: this.onOverlayClick, zIndex: 0 }), h("div", { tabindex: "0", class: "focus-sentinel", onFocus: this.focusDialog }), h(Tag, { tabindex: "-1", class: this.fullScreenModalCssClasses(), part: "content", ...this.formConfig, "data-testid": "wpp-fullscreen-modal-content", ref: ref => (this.dialogRef = ref) }, h("div", { class: this.headerContainerCssClasses() }, h(WrappedSlot, { id: this.ariaProps.labelledby, wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData }), h("wpp-action-button-v4-0-0", { variant: "secondary", onClick: this.handleCloseModal, class: "close-button" }, h("wpp-icon-cross-v4-0-0", { slot: "icon-start" }))), h(WrappedSlot, { wrapperClass: this.bodyCssClasses(), name: "body", onSlotchange: this.updateSlotData }), h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData })), h("div", { tabindex: "0", class: "focus-sentinel", onFocus: this.focusDialog }))));
  }
  static get registryIs() { return "wpp-full-screen-modal-v4-0-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "open": ["handleChangeFullScreenModalStatus"]
  }; }
};
WppFullScreenModal.style = wppFullScreenModalCss;

export { WppFullScreenModal as wpp_full_screen_modal };
