'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-2231f97a.js');
const common = require('./common-ee802540.js');
const WrappedSlot = require('./WrappedSlot-4a4ef805.js');
require('./consts-d8f5ef98.js');

const wppPillCss = ":host{--pill-height:var(--wpp-pill-height, 32px);--pill-padding-m:var(--wpp-pill-padding-m, 5px 12px);--pill-padding-icon-m:var(--wpp-pill-padding-icon-m, 4px 12px 4px 4px);--pill-padding-square-icon-m:var(--wpp-pill-padding-square-icon-m, 4px 12px 4px 10px);--pill-display-padding-m:var(--wpp-pill-display-padding-m, 5px 10px 5px 12px);--pill-display-padding-icon-m:var(--wpp-pill-display-padding-icon-m, 4px 10px 4px 4px);--pill-display-padding-square-icon-m:var(--wpp-pill-display-padding-square-icon-m, 4px 10px 4px 10px);--pill-draggable-padding-m:var(--wpp-pill-draggable-padding-m, 5px 10px);--pill-multiple-padding-m:var(--wpp-pill-multiple-padding-m, 5px 12px);--pill-multiple-padding-icon-m:var(--wpp-pill-multiple-padding-icon-m, 4px 12px 4px 4px);--pill-multiple-padding-square-icon-m:var(--wpp-pill-multiple-padding-square-icon-m, 4px 12px 4px 10px);--pill-checked-multiple-padding-m:var(--wpp-checked-pill-multiple-padding-m, 5px 8px 5px 12px);--pill-checked-multiple-padding-icon-m:var(--wpp-checked-pill-multiple-padding-icon-m, 4px 8px 4px 4px);--pill-checked-multiple-padding-square-icon-m:var(\n    --wpp-checked-pill-multiple-padding-square-icon-m,\n    4px 8px 4px 10px\n  );--pill-margin-icon-text-m:var(--wpp-pill-margin-icon-text-m, 0 6px 0 0);--pill-draggable-margin-icon-text-m:var(--wpp-pill-draggable-margin-icon-text-m, 0 4px 0 0);--pill-margin-icon-close:var(--wpp-pill-margin-icon--close, 0 0 0 4px);--pill-bg-color:var(--wpp-pill-bg-color, transparent);--pill-bg-color-hover:var(--wpp-pill-bg-color-hover, var(--wpp-grey-color-200));--pill-bg-color-active:var(--wpp-pill-bg-color-active, var(--wpp-grey-color-300));--pill-checked-bg-color:var(--wpp-pill-checked-bg-color, var(--wpp-grey-color-200));--pill-checked-bg-color-hover:var(--wpp-pill-checked-bg-color-hover, var(--wpp-grey-color-300));--pill-border-radius:var(--wpp-pill-border-radius, var(--wpp-border-radius-round));--pill-border-width:var(--wpp-pill-border-width, var(--wpp-border-width-s));--pill-border-style:var(--wpp-pill-border-style, solid);--pill-border-color:var(--wpp-pill-border-color, var(--wpp-grey-color-500));--pill-border-color-hover:var(--wpp-pill-border-color-hover, var(--wpp-grey-color-700));--pill-border-color-active:var(--wpp-pill-border-color-active, var(--wpp-grey-color-800));--pill-border-color-disabled:var(--wpp-pill-border-color-disabled, var(--wpp-grey-color-400));--pill-checked-single-border-color:var(--wpp-pill-checked-single-border-color, var(--wpp-brand-color));--pill-checked-multiple-border-color:var(--wpp-pill-checked-multiple-border-color, var(--wpp-primary-color-500));--pill-checked-multiple-border-color-hover:var(\n    --wpp-pill-checked-multiple-border-color-hover,\n    var(--wpp-primary-color-600)\n  );--pill-first-border-color-focus:var(--wpp-pill-first-border-color-focus, var(--wpp-grey-color-000));--pill-second-border-color-focus:var(--wpp-pill-second-border-color-focus, var(--wpp-brand-color));--pill-text-color:var(--wpp-pill-text-color, var(--wpp-text-color));--pill-text-color-disabled:var(--wpp-pill-text-color-disabled, var(--wpp-text-color-disabled));--pill-checked-text-color:var(--wpp-pill-checked-text-color, var(--wpp-brand-color-active));--pill-checked-font-weight:var(--wpp-pill-checked-font-weight, 600);--pill-checked-multiple-text-color:var(--wpp-pill-checked-multiple-text-color, var(--wpp-primary-color-600));--pill-active-icon-color:var(--wpp-pill-active-icon-color, var(--wpp-brand-color-active));--pill-active-icon-margin:var(--wpp-pill-active-icon-margin, 0 0 0 2px);--pill-single-icon-color:var(--wpp-pill-single-icon-color, var(--wpp-grey-color-600));--pill-display-icon-color:var(--wpp-pill-display-icon-color, var(--wpp-grey-color-600));--pill-draggable-icon-color:var(--wpp-pill-draggable-icon-color, var(--wpp-grey-color-600));--pill-checked-start-icon-color:var(--wpp-pill-checked-start-icon-color, var(--wpp-primary-color-600));--pill-start-icon-color-hover:var(--wpp-pill-start-icon-color-hover, var(--wpp-icon-color-hover));--pill-start-icon-color-active:var(--wpp-pill-start-icon-color-active, var(--wpp-icon-color-active));--pill-cross-icon-color-hover:var(--wpp-pill-cross-icon-color-hover, var(--wpp-icon-color-hover));--pill-cross-icon-color-active:var(--wpp-pill-cross-icon-color-active, var(--wpp-icon-color-active));--pill-cross-icon-color-disabled:var(--wpp-pill-cross-icon-color-active, var(--wpp-grey-color-400));--pill-drag-icon-color-hover:var(--wpp-pill-drag-icon-color-hover, var(--wpp-icon-color-hover));--pill-drag-icon-color-active:var(--wpp-pill-drag-icon-color-active, var(--wpp-icon-color-active));--pill-drag-icon-color-disabled:var(--wpp-pill-drag-icon-color-active, var(--wpp-grey-color-400));--pill-icon-color-disabled:var(--wpp-pill-icon-color-disabled, var(--wpp-grey-color-400));--pill-checked-multiple-icon-color:var(--wpp-pill-checked-multiple-icon-color, var(--wpp-primary-color-600));--pill-checked-multiple-icon-color-hover:var(\n    --wpp-pill-checked-multiple-icon-color-hover,\n    var(--wpp-primary-color-600)\n  );--pill-draggable-active-box-shadow-color:var(--wpp-pill-draggable-active-box-shadow-color, var(--wpp-box-shadow-m));display:-ms-inline-flexbox;display:inline-flex;outline:none}:host .pill-input{position:absolute;z-index:-1;margin:0;opacity:0}:host .pill-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;height:var(--pill-height);-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--pill-bg-color);border-radius:var(--pill-border-radius);border:var(--pill-border-width) var(--pill-border-style) var(--pill-border-color);max-width:100%}:host .pill-wrapper.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--pill-first-border-color-focus), 0 0 0 3px var(--pill-second-border-color-focus);box-shadow:0 0 0 1px var(--pill-first-border-color-focus), 0 0 0 3px var(--pill-second-border-color-focus);background-color:var(--pill-bg-color-hover);border-color:var(--pill-border-color-hover)}:host .pill-wrapper.tab-focus.checked{background-color:var(--pill-checked-bg-color)}:host .pill-wrapper:not(.display,.draggable,.checked.single){cursor:pointer}:host .pill-wrapper:hover:not(.display,.draggable,.checked){background-color:var(--pill-bg-color-hover);border-color:var(--pill-border-color-hover)}:host .pill-wrapper:hover:not(.display,.draggable,.checked) ::slotted([slot=icon-start]),:host .pill-wrapper:hover:not(.display,.draggable,.checked) .wpp-icon-drag-indicator{color:var(--pill-start-icon-color-hover)}:host .pill-wrapper:active:not(.display,.draggable,.checked){background-color:var(--pill-bg-color-active);border-color:var(--pill-border-color-active)}:host .pill-wrapper:active:not(.display,.draggable,.checked) ::slotted([slot=icon-start]),:host .pill-wrapper:active:not(.display,.draggable,.checked) .wpp-icon-drag-indicator{color:var(--pill-start-icon-color-active)}:host .pill-wrapper .icon-start{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;margin:var(--pill-margin-icon-text-m)}:host .pill-wrapper .icon-start.slot-hidden{display:none}:host .pill-wrapper .label{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--pill-text-color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .pill-wrapper .active-icon{color:var(--pill-active-icon-color);margin:var(--pill-active-icon-margin)}:host .pill-wrapper .wpp-icon-cross{margin:var(--pill-margin-icon-close)}:host .pill-wrapper .wpp-icon-cross,:host .pill-wrapper .wpp-icon-drag-indicator{outline:none}:host .pill-wrapper .wpp-icon-cross.tab-focus,:host .pill-wrapper .wpp-icon-drag-indicator.tab-focus{border-radius:3px;outline:none;-webkit-box-shadow:0 0 0 1px var(--pill-first-border-color-focus), 0 0 0 3px var(--pill-second-border-color-focus);box-shadow:0 0 0 1px var(--pill-first-border-color-focus), 0 0 0 3px var(--pill-second-border-color-focus);color:var(--pill-cross-icon-color-hover)}:host .pill-wrapper.size-m{padding:var(--pill-padding-m)}:host .pill-wrapper.size-m.icon-start{padding:var(--pill-padding-icon-m)}:host .pill-wrapper.size-m.icon-start.square-icon{padding:var(--pill-padding-square-icon-m)}:host .pill-wrapper.multiple.size-m{padding:var(--pill-multiple-padding-m)}:host .pill-wrapper.multiple.size-m.icon-start{padding:var(--pill-multiple-padding-icon-m)}:host .pill-wrapper.multiple.size-m.icon-start.square-icon{padding:var(--pill-multiple-padding-square-icon-m)}:host .pill-wrapper.display.size-m{padding:var(--pill-display-padding-m)}:host .pill-wrapper.display.size-m.icon-start{padding:var(--pill-display-padding-icon-m)}:host .pill-wrapper.display.size-m.icon-start.square-icon{padding:var(--pill-display-padding-square-icon-m)}:host .pill-wrapper.display .wpp-icon-cross{cursor:pointer}:host .pill-wrapper.display .wpp-icon-cross:hover{color:var(--pill-cross-icon-color-hover)}:host .pill-wrapper.display .wpp-icon-cross:active{color:var(--pill-cross-icon-color-active)}:host .pill-wrapper.draggable{cursor:initial}:host .pill-wrapper.draggable.size-m{padding:var(--pill-draggable-padding-m)}:host .pill-wrapper.draggable.size-m .icon-start{margin:var(--pill-draggable-margin-icon-text-m)}:host .pill-wrapper.draggable.hover{background-color:var(--pill-bg-color-hover);border-color:var(--pill-border-color-hover)}:host .pill-wrapper.draggable.active{background-color:var(--pill-bg-color-active);border-color:var(--pill-border-color-active);-webkit-box-shadow:var(--pill-draggable-active-box-shadow-color);box-shadow:var(--pill-draggable-active-box-shadow-color)}:host .pill-wrapper.draggable .drag-wrapper{cursor:pointer}:host .pill-wrapper.draggable .drag-wrapper:hover{color:var(--pill-start-icon-color-hover);cursor:-webkit-grabbing;cursor:grabbing}:host .pill-wrapper.draggable .drag-wrapper:active{color:var(--pill-start-icon-color-active);cursor:-webkit-grabbing;cursor:grabbing}:host .pill-wrapper.draggable .wpp-icon-cross{cursor:pointer}:host .pill-wrapper.draggable .wpp-icon-cross:hover{color:var(--pill-cross-icon-color-hover)}:host .pill-wrapper.draggable .wpp-icon-cross:active{color:var(--pill-cross-icon-color-active)}:host .pill-wrapper.checked{background-color:var(--pill-checked-bg-color)}:host .pill-wrapper.checked .label{color:var(--pill-checked-text-color);font-weight:var(--pill-checked-font-weight)}:host .pill-wrapper.checked.single{border-color:var(--pill-checked-single-border-color);pointer-events:none}:host .pill-wrapper.checked.single ::slotted([slot=icon-start]),:host .pill-wrapper.checked.single .active-icon{color:var(--pill-checked-start-icon-color)}:host .pill-wrapper.checked.multiple{border-color:var(--pill-checked-multiple-border-color)}:host .pill-wrapper.checked.multiple.size-m{padding:var(--pill-checked-multiple-padding-m)}:host .pill-wrapper.checked.multiple.size-m.icon-start{padding:var(--pill-checked-multiple-padding-icon-m)}:host .pill-wrapper.checked.multiple.size-m.icon-start.square-icon{padding:var(--pill-checked-multiple-padding-square-icon-m)}:host .pill-wrapper.checked.multiple .label{color:var(--pill-checked-multiple-text-color)}:host .pill-wrapper.checked.multiple ::slotted([slot=icon-start]),:host .pill-wrapper.checked.multiple .active-icon{color:var(--pill-checked-multiple-icon-color)}:host .pill-wrapper.checked.multiple:hover{background-color:var(--pill-checked-bg-color-hover);border-color:var(--pill-checked-multiple-border-color-hover)}:host .pill-wrapper.disabled:not(.checked){pointer-events:none;border-color:var(--pill-border-color-disabled)}:host .pill-wrapper.disabled:not(.checked) ::slotted([slot=icon-start]){color:var(--pill-text-color-disabled);opacity:0.5}:host .pill-wrapper.disabled:not(.checked) .wpp-icon-cross{color:var(--pill-cross-icon-color-disabled)}:host .pill-wrapper.disabled:not(.checked) .wpp-icon-drag-indicator{color:var(--pill-drag-icon-color-disabled)}:host .pill-wrapper.disabled:not(.checked) .label{color:var(--pill-text-color-disabled)}:host .label-wrapper{overflow:hidden}:host .wpp-tooltip{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host .wpp-tooltip::part(anchor){width:100%}:host([disabled]:not([disabled=false])){cursor:not-allowed}:host(.transparent){opacity:0;pointer-events:none}";

const getInitFocusInfo = () => ({
  wrapper: common.FOCUS_TYPE.NONE,
  'icon-close': common.FOCUS_TYPE.NONE,
  'icon-draggable': common.FOCUS_TYPE.NONE,
});
const WppPill = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClick = index.createEvent(this, "wppClick", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppClose = index.createEvent(this, "wppClose", 1);
    this.wppDragPress = index.createEvent(this, "wppDragPress", 1);
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.updateSlotData = (ev) => {
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
        start: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.start;
      if (this.hasIconStartSlot) {
        const iconStartSlot = ev.target;
        this.hasSquareIcon = iconStartSlot
          .assignedElements()
          .some(element => element.tagName === utils.transformToVersionedTag('wpp-avatar').toUpperCase() &&
          element.variant === 'square');
      }
    };
    this.onClick = (event) => {
      if (this.disabled || this.type === 'draggable')
        return;
      event.preventDefault();
      this.setFocus();
      this.wppClick.emit({
        checked: !this.checked,
        value: this.value,
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', common.FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('icon-close', common.FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('icon-draggable', common.FOCUS_TYPE.NONE);
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', common.FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('icon-close', common.FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('icon-draggable', common.FOCUS_TYPE.MOUSE);
    };
    this.onKeyUp = (event, type) => {
      if (event.key === 'Tab') {
        if (type === 'icon-draggable') {
          this.focusType = this.getUpdatedFocusInfo('icon-close', common.FOCUS_TYPE.NONE);
        }
        if (type === 'icon-close') {
          this.focusType = this.getUpdatedFocusInfo('icon-draggable', common.FOCUS_TYPE.NONE);
        }
        this.focusType = this.getUpdatedFocusInfo(type, common.FOCUS_TYPE.TAB);
      }
    };
    this.onClose = (event) => {
      if (this.disabled)
        return;
      this.focusType = this.getUpdatedFocusInfo('icon-close', common.FOCUS_TYPE.NONE);
      event.preventDefault();
      event.stopPropagation();
      this.wppClose.emit(event);
    };
    this.onDragPress = (event) => {
      if (this.disabled)
        return;
      event.preventDefault();
      this.wppDragPress.emit(event);
    };
    this.updateComponentState = (updateData) => {
      if (this.disabled)
        return;
      this.componentState = updateData;
    };
    this.checkTabIndex = () => {
      if (this.disabled)
        return -1;
      if (this.type === 'display' || this.type === 'draggable' || this.removable) {
        return null;
      }
      else {
        return 0;
      }
    };
    this.getLabelText = () => {
      if (!this.maxLength || this.maxLength <= 0)
        return this.label;
      return utils.truncate(this.label, this.maxLength);
    };
    this.checkLabelOverflow = () => {
      if (!this.labelRef) {
        const found = this.findLabelEl();
        if (found)
          this.setLabelRef(found);
      }
      if (!this.labelRef)
        return;
      const el = this.labelRef;
      const isTruncated = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
      if (isTruncated !== this.isOverflowTruncated) {
        this.isOverflowTruncated = isTruncated;
      }
    };
    this.initResizeObserver = () => {
      if (!this.showTooltipOnTruncate)
        return;
      if (!this.labelRef) {
        const found = this.findLabelEl();
        if (found)
          this.setLabelRef(found);
      }
      if (!this.labelRef)
        return;
      if (!this.resizeObserverCallback) {
        this.resizeObserverCallback = utils.debounce(() => this.checkLabelOverflow(), 50);
      }
      if (!this.resizeObserver) {
        this.resizeObserver = new ResizeObserver(() => {
          this.resizeObserverCallback?.();
        });
      }
      try {
        this.resizeObserver.observe(this.labelRef);
      }
      catch {
        console.error('Error observing labelRef');
      }
      requestAnimationFrame(() => this.checkLabelOverflow());
    };
    this.renderLabel = () => {
      const originalLabel = this.label;
      const displayed = this.getLabelText();
      if (!originalLabel) {
        return (index.h("div", { class: "label", part: "label", ref: this.setLabelRef }, index.h("slot", { part: "inner" })));
      }
      const wasMaxLengthTruncated = !!this.maxLength && this.maxLength > 0 && displayed !== originalLabel;
      const shouldShowTooltip = this.showTooltipOnTruncate && (this.isOverflowTruncated || wasMaxLengthTruncated);
      const labelNode = (index.h("div", { class: "label", part: "label", ref: this.setLabelRef }, displayed));
      return shouldShowTooltip ? (index.h("wpp-tooltip-v4-1-0", { text: originalLabel, disabled: this.disabled }, labelNode)) : (labelNode);
    };
    this.setLabelRef = (el) => {
      if (el === this.labelRef)
        return;
      if (this.resizeObserver && this.labelRef) {
        try {
          this.resizeObserver.unobserve(this.labelRef);
        }
        catch {
          console.error('Error unobserving labelRef');
        }
      }
      this.labelRef = el;
      if (this.resizeObserver && this.labelRef) {
        try {
          this.resizeObserver.observe(this.labelRef);
        }
        catch {
          console.error('Error observing labelRef');
        }
      }
      requestAnimationFrame(() => this.checkLabelOverflow());
    };
    this.findLabelEl = () => {
      const root = this.host.shadowRoot;
      if (!root)
        return undefined;
      return root.querySelector('[part="label"]');
    };
    this.cssClasses = () => ({
      'pill-wrapper': true,
      'icon-start': this.hasIconStartSlot,
      'square-icon': this.hasSquareIcon,
      [`size-${this.size}`]: true,
      [this.type]: !!this.type,
      checked: this.checked && this.type !== 'draggable' && this.type !== 'display',
      disabled: this.disabled,
      removable: this.removable,
      hover: this.componentState === 'hover',
      active: this.componentState === 'active',
      'tab-focus': this.focusType.wrapper === common.FOCUS_TYPE.TAB &&
        this.focusType['icon-draggable'] !== common.FOCUS_TYPE.TAB &&
        this.focusType['icon-close'] !== common.FOCUS_TYPE.TAB,
    });
    this.slotCssClasses = () => ({
      'icon-start': true,
      [`size-${this.size}`]: true,
      'drag-wrapper': this.type === 'draggable',
      'slot-hidden': !this.hasIconStartSlot && this.type !== 'draggable',
    });
    this.hostCssClasses = () => ({
      'wpp-pill': true,
    });
    this.hasIconStartSlot = false;
    this.hasSquareIcon = false;
    this.componentState = undefined;
    this.focusType = getInitFocusInfo();
    this.isOverflowTruncated = false;
    this.value = undefined;
    this.size = 'm';
    this.type = undefined;
    this.disabled = false;
    this.removable = false;
    this.checked = false;
    this.label = undefined;
    this.ariaProps = {};
    this.name = undefined;
    this.maxLength = undefined;
    this.showTooltipOnTruncate = true;
  }
  componentWillLoad() {
    const pillGroup = this.host.closest(utils.transformToVersionedTag('wpp-pill-group'));
    if (pillGroup) {
      this.type = pillGroup.type;
    }
  }
  componentDidLoad() {
    this.initResizeObserver();
  }
  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }
  setFocus() {
    if (this.inputEl) {
      this.inputEl.focus();
    }
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), "aria-disabled": this.disabled, "aria-checked": this.checked, "aria-hidden": this.disabled ? 'true' : null, onClick: this.onClick, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'wrapper'), role: "checkbox", exportparts: "input, pill-wrapper, drag-wrapper, drag-icon, label, inner, active-icon, remove-icon, icon-start, icon-start-wrapper", tabIndex: this.checkTabIndex() }, index.h("input", { class: "pill-input", type: "checkbox", name: this.name, disabled: this.disabled, ref: focusEl => (this.inputEl = focusEl), "aria-label": this.ariaProps.label, part: "input", title: "", tabIndex: -1 }), index.h("div", { class: this.cssClasses(), part: "pill-wrapper" }, this.type === 'draggable' ? (index.h("div", { class: this.slotCssClasses(), part: "drag-wrapper" }, index.h("wpp-icon-drag-v4-1-0", { class: { [`${this.focusType['icon-draggable']}`]: true }, part: "drag-icon", onMouseEnter: () => this.updateComponentState('hover'), onMouseLeave: () => this.updateComponentState(null), onMouseDown: ev => {
        this.updateComponentState('active');
        this.onDragPress(ev);
        this.onMouseDown();
      }, onMouseUp: () => this.updateComponentState(null), tabIndex: this.disabled ? -1 : 0, onKeyUp: (event) => this.onKeyUp(event, 'icon-draggable') }))) : (index.h(WrappedSlot.WrappedSlot, { name: "icon-start", wrapperClass: this.slotCssClasses(), onSlotchange: this.updateSlotData })), this.renderLabel(), this.checked && this.type === 'multiple' && index.h("wpp-icon-tick-v4-1-0", { class: "active-icon", part: "active-icon" }), this.removable && (this.type === 'display' || this.type === 'draggable') && (index.h("wpp-icon-cross-v4-1-0", { class: { [`${this.focusType['icon-close']}`]: true }, part: "remove-icon", onClick: this.onClose, tabIndex: this.disabled ? -1 : 0, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'icon-close') })))));
  }
  static get registryIs() { return "wpp-pill-v4-1-0"; }
  get host() { return index.getElement(this); }
};
WppPill.style = wppPillCss;

exports.wpp_pill = WppPill;
