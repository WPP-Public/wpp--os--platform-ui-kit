'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-27884b05.js');
const WrappedSlot = require('./WrappedSlot-4a4ef805.js');
const common = require('./common-ee802540.js');
require('./consts-dba6e6dd.js');

const wppCardCss = ":host{--card-border-radius:var(--wpp-card-border-radius, var(--wpp-border-radius-m));--card-padding-s:var(--wpp-card-padding-s, 8px 12px 12px 12px);--card-padding-m:var(--wpp-card-padding-m, 12px 16px 16px 16px);--card-padding-l:var(--wpp-card-padding-l, 20px 24px 24px 24px);--card-padding-xl:var(--wpp-card-padding-xl, 24px 32px 32px 32px);--card-padding-2xl:var(--wpp-card-padding-2xl, 32px 40px 40px 40px);--card-header-margin-s:var(--wpp-header-margin-s, 0 0 8px 0);--card-header-margin-m:var(--wpp-header-margin-m, 0 0 12px 0);--card-header-margin-l:var(--wpp-header-margin-l, 0 0 20px 0);--card-header-margin-xl:var(--wpp-header-margin-xl, 0 0 24px 0);--card-header-margin-2xl:var(--wpp-header-margin-2xl, 0 0 32px 0);--card-actions-wrapper-left-margin:var(--wpp-card-actions-wrapper-left-margin, 10px);--card-actions-first-border-color-focus:var(--wpp-card-actions-first-border-color-focus, var(--wpp-grey-color-000));--card-actions-second-border-color-focus:var(--wpp-card-actions-second-border-color-focus, var(--wpp-brand-color));--card-primary-bg-color:var(--wpp-card-primary-bg-color, var(--wpp-grey-color-000));--card-primary-box-shadow:var(--wpp-card-primary-box-shadow, var(--wpp-box-shadow-s));--card-secondary-bg-color:var(--wpp-card-secondary-bg-color, var(--wpp-grey-color-100));--card-tertiary-bg-color:var(--wpp-card-tertiary-bg-color, var(--wpp-grey-color-200));--card-interactive-bg-color:var(--wpp-card-interactive-bg-color, var(--wpp-grey-color-000));--card-interactive-box-shadow-color:var(--wpp-card-interactive-box-shadow-color, var(--wpp-box-shadow-s));--card-interactive-box-shadow-color-hover:var(\n    --wpp-card-interactive-box-shadow-color-hover,\n    var(--wpp-box-shadow-m)\n  );--card-interactive-box-shadow-color-active:var(\n    --wpp-card-interactive-box-shadow-color-active,\n    0px 8px 32px rgba(52, 58, 63, 0.05)\n  );--card-interactive-first-border-color-focus:var(\n    --wpp-card-interactive-first-border-color-focus,\n    var(--wpp-grey-color-100)\n  );--card-interactive-second-border-color-focus:var(\n    --wpp-card-interactive-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--card-choosable-bg-color:var(--wpp-card-choosable-bg-color, var(--wpp-grey-color-000));--card-choosable-border-width:var(--wpp-card-choosable-border-width, 1px);--card-choosable-border-style:var(--wpp-card-choosable-border-style, solid);--card-choosable-border-color:var(--wpp-card-choosable-border-color, var(--wpp-grey-color-500));--card-choosable-border-color-hover:var(--wpp-card-choosable-border-color-hover, var(--wpp-grey-color-700));--card-choosable-border-color-active:var(--wpp-card-choosable-border-color-active, var(--wpp-grey-color-800));--card-choosable-border-color-disabled:var(--wpp-card-choosable-border-color-disabled, var(--wpp-grey-color-300));--card-choosable-first-border-color-focus:var(\n    --wpp-card-choosable-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--card-choosable-second-border-color-focus:var(\n    --wpp-card-choosable-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--card-choosable-selected-border-width:var(--wpp-card-choosable-selected-border-width, 2px);--card-choosable-selected-border-color:var(--wpp-card-choosable-selected-border-color, var(--wpp-brand-color));--card-choosable-selected-border-color-hover:var(\n    --wpp-card-choosable-selected-border-color-hover,\n    var(--wpp-brand-color-hover)\n  );--card-choosable-selected-border-color-active:var(\n    --wpp-card-choosable-selected-border-color-active,\n    var(--wpp-brand-color-active)\n  );--card-choosable-selected-border-color-disabled:var(\n    --wpp-card-choosable-selected-border-color-disabled,\n    var(--wpp-brand-color-disabled)\n  );--card-choosable-padding-s:var(--wpp-card-choosable-padding-s, 7px 11px 11px 11px);--card-choosable-padding-m:var(--wpp-card-choosable-padding-m, 11px 15px 15px 15px);--card-choosable-padding-l:var(--wpp-card-choosable-padding-l, 19px 23px 23px 23px);--card-choosable-padding-xl:var(--wpp-card-choosable-padding-xl, 23px 31px 31px 31px);--card-choosable-padding-2xl:var(--wpp-card-choosable-padding-2xl, 31px 39px 39px 39px);--card-choosable-selected-padding-s:var(--wpp-card-choosable-selected-padding-s, 6px 10px 10px 10px);--card-choosable-selected-padding-m:var(--wpp-card-choosable-selected-padding-m, 10px 14px 14px 14px);--card-choosable-selected-padding-l:var(--wpp-card-choosable-selected-padding-l, 18px 22px 22px 22px);--card-choosable-selected-padding-xl:var(--wpp-card-choosable-selected-padding-xl, 22px 30px 30px 30px);--card-choosable-selected-padding-2xl:var(--wpp-card-choosable-selected-padding-2xl, 30px 38px 38px 38px);display:block;outline:none}.card{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:inherit;overflow:hidden;border-radius:var(--card-border-radius)}.card.actions ::slotted(.wpp-action-button){top:1px;right:-8px}.card.size-s{padding:var(--card-padding-s)}.card.size-s.choosable{padding:var(--card-choosable-padding-s)}.card.size-s .radio,.card.size-s .checkbox{top:1px}.card.size-s .header{margin:var(--card-header-margin-s)}.card.size-m{padding:var(--card-padding-m)}.card.size-m.choosable{padding:var(--card-choosable-padding-m)}.card.size-m .radio,.card.size-m .checkbox{top:2px}.card.size-m .header{margin:var(--card-header-margin-m)}.card.size-l{padding:var(--card-padding-l)}.card.size-l.choosable{padding:var(--card-choosable-padding-l)}.card.size-l .radio,.card.size-l .checkbox{top:4px}.card.size-l .header{margin:var(--card-header-margin-l)}.card.size-xl{padding:var(--card-padding-xl)}.card.size-xl.choosable{padding:var(--card-choosable-padding-xl)}.card.size-xl .radio,.card.size-xl .checkbox{top:6px}.card.size-xl .header{margin:var(--card-header-margin-xl)}.card.size-2xl{padding:var(--card-padding-2xl)}.card.size-2xl.choosable{padding:var(--card-choosable-padding-2xl)}.card.size-2xl .radio,.card.size-2xl .checkbox{top:6px}.card.size-2xl .header{margin:var(--card-header-margin-2xl)}.card.size-2xl .actions ::slotted(.wpp-action-button){top:1px;right:-8px}.card.primary:not(.choosable){background:var(--card-primary-bg-color);-webkit-box-shadow:var(--card-primary-box-shadow);box-shadow:var(--card-primary-box-shadow)}.card.secondary:not(.choosable){background:var(--card-secondary-bg-color)}.card.tertiary{background:var(--card-tertiary-bg-color)}.card.interactive:not(.choosable){background:var(--card-interactive-bg-color);-webkit-box-shadow:var(--card-interactive-box-shadow-color);box-shadow:var(--card-interactive-box-shadow-color);cursor:pointer}.card.interactive:not(.choosable):hover,.card.interactive:not(.choosable).tab-focus{-webkit-box-shadow:var(--card-interactive-box-shadow-color-hover);box-shadow:var(--card-interactive-box-shadow-color-hover)}.card.interactive:not(.choosable):active,.card.interactive:not(.choosable).pressed{-webkit-box-shadow:var(--card-interactive-box-shadow-color-active);box-shadow:var(--card-interactive-box-shadow-color-active)}.card.choosable{background:var(--card-choosable-bg-color);border:var(--card-choosable-border-width) var(--card-choosable-border-style) var(--card-choosable-border-color);cursor:pointer}.card.choosable:hover,.card.choosable.tab-focus{border-color:var(--card-choosable-border-color-hover)}.card.choosable:active,.card.choosable.pressed{border-color:var(--card-choosable-border-color-active)}.card.choosable.disabled{cursor:not-allowed;border-color:var(--card-choosable-border-color-disabled)}.card.choosable.disabled .header ::slotted([slot=header]){color:var(--wpp-text-color-disabled)}.card.choosable.checked{border-color:var(--card-choosable-selected-border-color);border-width:var(--card-choosable-selected-border-width)}.card.choosable.checked:hover,.card.choosable.checked.tab-focus{border-color:var(--card-choosable-selected-border-color-hover)}.card.choosable.checked:active,.card.choosable.checked.pressed{border-color:var(--card-choosable-selected-border-color-active)}.card.choosable.checked.disabled{cursor:not-allowed;border-color:var(--card-choosable-selected-border-color-disabled)}.card.choosable.checked.size-s{padding:var(--card-choosable-selected-padding-s)}.card.choosable.checked.size-m{padding:var(--card-choosable-selected-padding-m)}.card.choosable.checked.size-l{padding:var(--card-choosable-selected-padding-l)}.card.choosable.checked.size-xl{padding:var(--card-choosable-selected-padding-xl)}.card.choosable.checked.size-2xl{padding:var(--card-choosable-selected-padding-2xl)}.card.choosable .header-wrapper .header ::slotted([slot=header]){width:calc(100% - 20px - var(--card-actions-wrapper-left-margin))}.card .header-wrapper{position:relative}.card .header-wrapper .radio,.card .header-wrapper .checkbox{position:absolute;z-index:1;right:0}.card .header-wrapper .header{display:-ms-flexbox;display:flex;color:var(--wpp-text-color);width:100%}.card .header-wrapper .header ::slotted([slot=header]){overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.card .header-wrapper.with-actions .header ::slotted([slot=header]){padding-right:32px}.card .header-wrapper .actions{position:absolute;top:-4px;right:-8px}.card .header-wrapper .actions.slot-hidden{display:none}.card .header-wrapper .header.slot-hidden{display:none}.card.tab-focus.interactive:not(.choosable):not(:hover),.card.tab-focus.interactive:not(.choosable):not(:active){border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--card-interactive-first-border-color-focus), 0 0 0 3px var(--card-interactive-second-border-color-focus);box-shadow:0 0 0 1px var(--card-interactive-first-border-color-focus), 0 0 0 3px var(--card-interactive-second-border-color-focus)}.card.tab-focus.choosable{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--card-choosable-first-border-color-focus), 0 0 0 3px var(--card-choosable-second-border-color-focus);box-shadow:0 0 0 1px var(--card-choosable-first-border-color-focus), 0 0 0 3px var(--card-choosable-second-border-color-focus)}.card.tab-focus.choosable:not(.checked){border-color:var(--card-choosable-border-color-hover)}.card.tab-focus.choosable .wpp-checkbox{--checkbox-bg-color:var(--checkbox-bg-color-hover);--checkbox-border-color:var(--checkbox-border-color-hover)}.card.tab-focus.choosable .wpp-radio{--radio-bg-color:var(--radio-bg-color-hover);--radio-border-color:var(--radio-border-color-hover)}.card.tab-focus.choosable.checked .wpp-checkbox{--checkbox-bg-color-checked:var(--checkbox-bg-color-checked-hover);--checkbox-border-color-checked:var(--checkbox-border-color-checked-hover)}";

const WppCard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClick = index.createEvent(this, "wppClick", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.updateSlotData = () => {
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
        actions: '[slot="actions"]',
        header: '[slot="header"]',
      });
      this.hasActionsSlot = !emptyStates.actions;
      this.hasHeaderSlot = !emptyStates.header;
    };
    this.onClick = (event) => {
      if (this.disabled)
        return;
      const actionsContainer = this.host.querySelector('[slot="actions"]');
      if (actionsContainer && utils.isEventTargetContained(actionsContainer, event)) {
        return;
      }
      this.wppClick.emit({
        checked: !this.checked,
        value: this.value,
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = common.FOCUS_TYPE.NONE;
      this.isPressed = false;
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
      this.updateComponentState({ active: true });
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab' && document.activeElement === this.host) {
        this.focusType = common.FOCUS_TYPE.TAB;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.onKeyDown = (event) => {
      if (this.disabled || document.activeElement !== this.host)
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.isPressed = true;
        this.wppClick.emit({
          checked: !this.checked,
          value: this.value,
        });
      }
    };
    this.checkTabIndex = () => {
      if (!!this.type || this.interactive) {
        return 0;
      }
      return null;
    };
    this.updateComponentState = (updateData) => {
      this.componentState = {
        ...this.componentState,
        ...updateData,
      };
    };
    this.cardCssClasses = () => ({
      card: true,
      [`${this.variant}`]: true,
      [`size-${this.size}`]: true,
      choosable: !!this.type,
      disabled: !!this.type && this.disabled,
      checked: this.checked,
      interactive: this.interactive,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
      'with-actions': this.hasActionsSlot,
      pressed: this.isPressed,
    });
    this.headerCssClasses = () => ({
      header: true,
      'slot-hidden': !this.hasHeaderSlot,
    });
    this.actionsCssClasses = () => ({
      actions: true,
      'slot-hidden': !this.hasActionsSlot,
    });
    this.headerWrapperCssClasses = () => ({
      'header-wrapper': true,
      'with-actions': this.hasActionsSlot,
    });
    this.hostCssClasses = () => ({
      'wpp-card': true,
    });
    this.hasHeaderSlot = false;
    this.hasActionsSlot = false;
    this.componentState = {
      hover: false,
      active: false,
    };
    this.isPressed = false;
    this.focusType = undefined;
    this.variant = 'primary';
    this.value = undefined;
    this.size = 'm';
    this.type = undefined;
    this.disabled = false;
    this.checked = false;
    this.nested = false;
    this.index = -1;
    this.withRadioOrCheckbox = undefined;
    this.name = undefined;
    this.interactive = false;
    this.background = undefined;
    this.ariaProps = {};
  }
  /**
   * Method that sets focus on the card element.
   */
  async setFocus() {
    this.host?.focus({ preventScroll: true });
    this.focusType = common.FOCUS_TYPE.TAB;
  }
  componentWillLoad() {
    this.updateSlotData();
  }
  render() {
    const displayState = this.componentState.active ? 'active' : this.componentState.hover ? 'hover' : '';
    const isInteractive = !!this.type || this.interactive;
    const role = this.ariaProps.role ??
      (this.type === 'single'
        ? 'radio'
        : this.type === 'multiple'
          ? 'checkbox'
          : this.interactive
            ? 'button'
            : undefined);
    const tabIndex = this.disabled
      ? -1
      : (this.ariaProps.tabIndex ??
        (this.type === 'single' ? this.index : this.type === 'multiple' ? 0 : this.checkTabIndex()));
    return (index.h(index.Host, { onMouseEnter: () => this.updateComponentState({ hover: true }), onMouseLeave: () => this.updateComponentState({ hover: false }), onMouseUp: () => this.updateComponentState({ active: false }), ...(isInteractive ? { onMouseDown: this.onMouseDown } : {}), ...(isInteractive ? { onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp } : {}), ...(isInteractive ? { onClick: this.onClick } : {}), onFocus: this.onFocus, onBlur: this.onBlur, htmlFor: this.name, exportparts: "card, header-outer-wrapper, header-wrapper radio, checkbox, actions-wrapper", class: this.hostCssClasses(), tabIndex: tabIndex, role: role, "aria-disabled": this.withRadioOrCheckbox && this.disabled ? 'true' : undefined, "aria-labelledby": this.ariaProps?.labelledby, ...((this.interactive || this.type) && role !== 'button'
        ? { ariaChecked: this.checked ? 'true' : 'false' }
        : {}), ...(role === 'button' ? { 'aria-pressed': this.checked ? 'true' : 'false' } : {}) }, index.h("div", { class: this.cardCssClasses(), part: "card", ...(this.background ? { style: { background: this.background } } : {}) }, index.h("div", { class: this.headerWrapperCssClasses(), part: "header-outer-wrapper" }, index.h(WrappedSlot.WrappedSlot, { name: "header", wrapperClass: this.headerCssClasses(), onSlotchange: this.updateSlotData, part: "header" }), this.withRadioOrCheckbox && (index.h(index.Fragment, null, this.type === 'single' && (index.h("wpp-radio-v3-5-0", { class: "radio", internalState: displayState, name: this.name, checked: this.checked, disabled: this.disabled, index: -1, part: "radio", decorative: true })), this.type === 'multiple' && (index.h("wpp-checkbox-v3-5-0", { class: "checkbox", internalState: displayState, name: this.name, checked: this.checked, disabled: this.disabled, index: -1, part: "checkbox", decorative: true })))), index.h(WrappedSlot.WrappedSlot, { name: "actions", part: "actions", wrapperClass: this.actionsCssClasses(), onSlotchange: this.updateSlotData })), index.h("slot", null))));
  }
  static get registryIs() { return "wpp-card-v3-5-0"; }
  get host() { return index.getElement(this); }
};
WppCard.style = wppCardCss;

exports.wpp_card = WppCard;
