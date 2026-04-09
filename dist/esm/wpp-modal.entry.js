import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { A as ANIMATION_PROPERTY_NAME, Z as Z_INDEX } from './consts-9fc0a13a.js';
import { g as getSlotEmptyStates, m as applyBodyStylesIfNeeded, x as getOsBarOffsetHeight } from './utils-45d1949f.js';
import { W as WrappedSlot } from './WrappedSlot-629d3e4f.js';
import { M as ModalCloseReason } from './types-9a70ac4e.js';

// The modal can extend up to 60px from top and bottom => 120px
const TOP_AND_BOTTOM_OFFSET = 120;

const wppModalCss = ":host{--modal-width-s:var(--wpp-modal-width-s, 440px);--modal-width-m:var(--wpp-modal-width-m, 600px);--modal-box-shadow:var(--wpp-modal-box-shadow, var(--wpp-box-shadow-l));--modal-vertical-position-animation-minus-number:var(--wpp-modal-vertical-position-animation-minus-number, 40px);--modal-body-paddings:var(--wpp-modal-body-paddings, 0 24px);--modal-actions-paddings:var(--wpp-modal-actions-paddings, 24px);--modal-header-padding:var(--wpp-modal-header-padding, 20px 24px 16px 24px);--modal-transition:visibility 0.15s linear 0.2s, opacity 0.2s 0.2s;--modal-bg-color:var(--wpp-modal-bg-color, var(--wpp-grey-color-000))}:host(.wpp-modal-wrapper){position:fixed;top:var(--wpp-modal-top-offset, 0);right:0;bottom:0;left:0;display:block;font-family:var(--wpp-font-family);visibility:hidden;opacity:0;overflow:auto}:host(.wpp-component-ready){-webkit-transition:var(--modal-transition);transition:var(--modal-transition)}:host(.wpp-visible.wpp-component-ready){display:block;visibility:visible;opacity:1}:host(.wpp-hide){visibility:hidden !important;opacity:0}:host(.wpp-visible:target){opacity:1}.header.slot-hidden,.body.slot-hidden,.actions.slot-hidden{display:none}.header{font-size:var(--wpp-typography-xl-heading-font-size, 20px);line-height:var(--wpp-typography-xl-heading-line-height, 32px);font-weight:var(--wpp-typography-xl-heading-font-weight, 400);color:var(--wpp-typography-xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xl-heading-letter-spacing, 0);padding:var(--modal-header-padding)}.body{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);padding:var(--modal-body-paddings);overflow-y:auto}.body::-webkit-scrollbar{width:4px;height:4px}.body::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.actions{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);padding:var(--modal-actions-paddings)}.modal-overlay{position:absolute;width:100%;height:100%}.modal{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;top:50%;left:50%;background-color:var(--modal-bg-color);border-radius:var(--wpp-border-radius-l);-webkit-box-shadow:var(--modal-box-shadow);box-shadow:var(--modal-box-shadow);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);max-height:calc(100vh - 120px);max-width:90vh;overflow-y:auto;overflow-x:hidden}.modal.visible{-webkit-animation:modalAppearAboveCenterAnimations 0.2s linear;animation:modalAppearAboveCenterAnimations 0.2s linear;-webkit-animation-delay:0.15s;animation-delay:0.15s}.modal.size-s{width:var(--modal-width-s)}.modal.size-m{width:var(--modal-width-m)}.focus-sentinel{position:fixed;opacity:0;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media (max-height: 800px){.modal{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.modal.visible{-webkit-animation:modalAppearInCenterAnimations 0.2s linear forwards;animation:modalAppearInCenterAnimations 0.2s linear forwards;-webkit-animation-delay:0.15s;animation-delay:0.15s}}@-webkit-keyframes modalAppearInCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@keyframes modalAppearInCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@-webkit-keyframes modalAppearAboveCenterAnimations{0%{-webkit-transform:translate(-50%, calc(-50% - var(--modal-vertical-position-animation-minus-number)));transform:translate(-50%, calc(-50% - var(--modal-vertical-position-animation-minus-number)))}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@keyframes modalAppearAboveCenterAnimations{0%{-webkit-transform:translate(-50%, calc(-50% - var(--modal-vertical-position-animation-minus-number)));transform:translate(-50%, calc(-50% - var(--modal-vertical-position-animation-minus-number)))}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}";

const WppModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppModalClose = createEvent(this, "wppModalClose", 1);
    this.wppModalOpenStart = createEvent(this, "wppModalOpenStart", 7);
    this.wppModalOpenComplete = createEvent(this, "wppModalOpenComplete", 7);
    this.wppModalCloseStart = createEvent(this, "wppModalCloseStart", 7);
    this.wppModalCloseComplete = createEvent(this, "wppModalCloseComplete", 7);
    this.topOffset = 0;
    this.pendingTimeouts = [];
    this.onOverlayClick = () => {
      if (this.disableOutsideClick)
        return;
      this.wppModalClose.emit({ reason: ModalCloseReason.outsideClick });
      this.closeReason = ModalCloseReason.outsideClick;
    };
    this.setupObserver = () => {
      if (!this.dialogRef)
        return;
      this.resizeObserver = new ResizeObserver(() => {
        // If the Dialog is stretched up to the limit, it enters this scrollable mode, where the body is scrollable and dividers are displayed.
        this.isBodyScrollable = window.innerHeight - TOP_AND_BOTTOM_OFFSET <= (this.dialogRef?.clientHeight || 0);
      });
      this.resizeObserver.observe(this.dialogRef);
    };
    this.disconnectObserver = () => {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
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
        this.focusDialog();
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
    this.focusDialog = () => {
      if (!this.dialogRef)
        return;
      this.dialogRef.focus();
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
      'wpp-os-bar-compatible': this.osBarCompatible,
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
    this.isBodyScrollable = false;
    this.open = false;
    this.size = 's';
    this.withTransparentOverlay = undefined;
    this.disableOutsideClick = false;
    this.formConfig = undefined;
    this.zIndex = Z_INDEX.MODAL;
    this.osBarCompatible = false;
    this.ariaProps = {
      role: 'dialog',
      labelledby: 'dialog_label',
    };
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
      this.setupObserver();
    }
    else {
      this.disconnectObserver();
    }
    this.pendingTimeouts.push(setTimeout(() => {
      applyBodyStylesIfNeeded(this.open ? 'add' : 'remove');
    }));
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
    this.pendingTimeouts.push(setTimeout(() => {
      this.open && this.host.classList.add('wpp-component-ready');
    }, 0));
  }
  // TODO: topOffset is calculated once on mount. If the OS bar height becomes dynamic
  //       (e.g., responsive resize), consider recalculating via ResizeObserver or a shared CSS variable on :root.
  componentWillLoad() {
    this.topOffset = this.osBarCompatible ? getOsBarOffsetHeight() : 0;
  }
  disconnectedCallback() {
    this.pendingTimeouts.forEach(id => clearTimeout(id));
    this.pendingTimeouts = [];
    this.closeModal();
    this.disconnectObserver();
  }
  render() {
    const Tag = this.formConfig ? 'form' : 'div';
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, modal, header, body, actions, header-wrapper, body-wrapper, actions-wrapper", onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd, style: { zIndex: this.zIndex.toString(), '--wpp-modal-top-offset': `${this.topOffset}px` }, role: this.ariaProps.role, "aria-labelledby": this.ariaProps.labelledby, "aria-modal": "true" }, h("div", { class: "modal-overlay", part: "wrapper" }, h("wpp-overlay-v4-0-0", { ...(this.withTransparentOverlay ? { style: { opacity: '0' } } : {}), isVisible: this.open, onWppClick: this.onOverlayClick, zIndex: 0 }), h("div", { tabindex: "0", class: "focus-sentinel", onFocus: this.focusDialog }), h(Tag, { tabindex: "-1", class: this.modalCssClasses(), part: "content", ...this.formConfig, ref: ref => (this.dialogRef = ref) }, h(WrappedSlot, { id: this.ariaProps.labelledby, wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData }), this.isBodyScrollable && h("wpp-divider-v4-0-0", null), h(WrappedSlot, { wrapperClass: this.bodyCssClasses(), name: "body", onSlotchange: this.updateSlotData }), this.isBodyScrollable && h("wpp-divider-v4-0-0", null), h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData })), h("div", { tabindex: "0", class: "focus-sentinel", onFocus: this.focusDialog }))));
  }
  static get registryIs() { return "wpp-modal-v4-0-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "open": ["handleChangeModalStatus"]
  }; }
};
WppModal.style = wppModalCss;

export { WppModal as wpp_modal };
